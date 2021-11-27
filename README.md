## StoryDots Challenge

- [Intro](#intro)
- [Librerias](#libreries)
- [Quick Start](#Quick-Start)
- [Endpoints de la documentacion](#endpoints-documentation)
  - [Products](#retrieving-new-tag-codes)
    - [Recuperar todos](#retrieving-new-tag-codes)
    - [Recuperar un producto](#retrieving-qr-tag-image)
    - [Agregar](#placing-a-new-order)
    - [Eliminar](#placing-a-new-order)
    - [Modificar](#placing-a-new-order)
  - [Brands](#retrieving-new-tag-codes)
    - [Recuperar todas](#retrieving-new-tag-codes)
    - [Recuperar una marca](#retrieving-new-tag-codes)
    - [Agregar](#retrieving-new-tag-codes)
    - [Eliminar](#retrieving-new-tag-codes)
    - [Modificar](#placing-a-new-order)
  - [User](#retrieving-new-tag-codes)
    - [Register](#retrieving-new-tag-codes)
    - [Login](#retrieving-new-tag-codes)
- [Ejemplos - Code snippets](#get-storydots-for-your-online-shop)
- [¿Necesitas ayuda?](#need-help)

---

## Intro

Bienvenido a la documentacion del challenge de StoryDots - Backend.
Se trata de una api REST con NodeJS que pueda realizar las
operaciones CRUD de productos con algunos extras como añadir una autenticación y unos endpoint de brands.

## Libreries

Las librerias utilizadas para el desarrollo de esta api fueron:

- Express.
- Sequelize.
- JSON Web Token.
- Dotenv.
- Bcrypt.
- Nodemon.

##Quick Start

- Primero configurar Variables de entorno.
- Crear archivo .env en directorio raíz con las siguientes datos.

```
# DB Config

DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_PORT=3306
DB_NAME=storydots
DB_DIALECT=mysql

# Auth Config

AUTH_SECRET=StoryDots
AUTH_EXPIRE=1h
AUTH_ROUNDS=5
```

- Ejecutar el comando **npm run dev**.

\* El repositorio contiene un JSON para importar en Postman con los endpoints.

## Endpoints Products

### **Recuperar todos los productos**

- **URL**

  _/products_

- **Method:**

  `GET` - recupera todos los productos y numero de paginas.

- **Query Params**

  **[page]:** _Pagina actual del listado de productos_

- **Request Headers**

  _No requiere para este endpoint_

- **Success Response:**

  Este método retorna todos los productos registrados en la api.Cada vez que se llame a este metodo se enviara un array de productos junto a un contador de paginas.

    - **Code:** 200 OK<br />
    - **Content:** <br />
    ` { "content": [ { "id": ["ID"], "name": ["NAME-PRODUCT"], "description": ["TEXT-PRODUCT"], "image_url": ["URL-IMG-PRODUCT"], "price": ["PRICE-PRODUCT"], "brand": { "name": ["NAME-BRAND"], "logo_url": ["URL-IMG"] } } ], "totalPages": ["TOTAL-PAGES"] }`

- **Error Response:**

    - **Code:** 500 INTERNAL SERVER ERROR <br />
    - **Content:** `{ "message": "INTERNAL SERVER ERROR" }`

#### Sample Call:

  _`curl -X GET \`_  
  _`http://localhost:3000/products/?page=[NUMBER-PAGE] \`_

### **Recuperar un producto**

- **URL**

  _/products/[ID-PRODUCT]_

- **Method:**

  `GET` - recibe un producto correspondiente al id del producto.

- **Path Params**

  **[ID-PRODUCT]:** _El id del producto que quieres recuperar_

- **Request Headers**

  _No requiere para este endpoint_

- **Success Response:**

  Este método devolverá un producto y datos de su marca asociada.
  Imagen del producto,nombre,precio,descripcion,nombre de la marca y imagen de la misma.

    - **Code:** 200 OK<br />
    - **Content:** <br />

  ```
  {
  "id": ["ID"],
  "name": ["NAME-PRODUCT"],
  "description": ["TEXT-PRODUCT"],
  "image_url": ["URL-IMG-PRODUCT"],
  "price": ["PRICE-PRODUCT"],
  "brand": { "name": ["NAME-BRAND"], "logo_url": ["URL-IMG"] }
  }
  ```

- **Error Response:**

    - **Code:** 404 NOT FOUND <br />
    - **Content:** `{ "message": "PRODUCT NOT EXIST" }`

    - **Code:** 400 BAD REQUEST <br />
    - **Content:** `{ "message": "ID NOT VALID ONLY NUMBER" }`

#### Sample Call:

  _`curl -X GET \`_  
  _`http://localhost:3000/products/[ID-PRODUCT] \`_

### Agregar nuevo productos

#### URL

_/products/new_

#### Method

- `POST` - crea un nuevo producto

#### Request Headers

- **Authorization:** _Your Token_

#### Body

Los parámetros deben enviarse como JSON.
Estos son los parámetros que esperará el end-point:

- **name**: el nombre del producto a publicar.(Unico).
- **description**: descripcion de producto a publicar con un maximo de 150 caracteres.
- **image_url**: url de la imagen del producto.
- **price**: precio del producto.(Double 10,2)
- **brandId**: su identificación interna de marca, almacenaremos esta identificación para permitirle devolver datos de la marca junto al producto.

#### Success Response

Este metodo devolvera un mensaje confirmando si el producto fue agregado al sistema existosamente,caso contrario informa un error.

Succesful response example:

  - **Code:** 201 CREATED
  - **Content:** `{ "message": "YOUR PRODUCT ADDED SUCCESSFULLY" }`

#### Error Responses

  - **Code:** 401 UNAUTHORIZED
  - **Content:** `{ "mesagge": "Problem with decoded" }`

  - **Code:** 400 Bad Request
  - **Content:** `{ "message": "bad request, at least one of the following params is missing: [brandId]" }`

#### Sample Call:

```
  curl --request POST \`_
    --url 'http://localhost:3000/products/new'\
    --header 'Authorization: Bearer  [YOUR-TOKEN] '\
    --data '{
      "name": "Ratona Mascardi Miami Negro",
      "description": "4 Sillon Miami Negra 1 Mesita Ratona Mascardi",
      "image_url": "https://picsum.photos/id/237/200/300",
      "price": "4234.75",
      "brandId": 2
    }'
```

### Eliminar producto

#### URL

_/products/[ID-PRODUCT]_

#### Method

- `DELETE` - elimina el producto espeficiado

#### Request Headers

- **Authorization:** _Your Token_

#### Path Params

**[ID-PRODUCT]:** _El id del producto que quieres recuperar_

#### Success Response

Este metodo devolvera un mensaje confirmando si el producto fue borrado del sistema exitosamente,caso contrario informa un error.

Succesful response example:

  - **Code:** 200 OK
  - **Content:** `{ "message": "DELETE SUCCESSFULLY" }`

#### Error Responses

  - **Code:** 401 UNAUTHORIZED
  - **Content:** `{ "mesagge": "Problem with decoded" }`

  - **Code:** 400 Bad Request
  - **Content:** `{ "message": "ID NOT VALID ONLY NUMBER" }`

#### Sample Call:

```
  curl --request POST \`_
    --url 'http://localhost:3000/products/[ID-PRODUCT]'\
    --header 'Authorization: Bearer  [YOUR-TOKEN] '\
```

### Modificar un producto

#### URL

_/products/[ID-PRODUCT]_

#### Method

- `PUT` - Modificar informacion de los compos de productos.

#### Request Headers

- **Authorization:** _Your Token_

#### Path Params

**[ID-PRODUCT]:** _El id del producto que quieres modificar_

#### Body

Los parámetros deben enviarse como JSON.
Estos son los parámetros que esperará el end-point:

- **name**: el nombre del producto a publicar.(Unico).
- **description**: descripcion de producto a publicar con un maximo de 150 caracteres.
- **image_url**: url de la imagen del producto.
- **price**: precio del producto.(Double 10,2)
- **brandId**: su identificación interna de marca, almacenaremos esta identificación para permitirle devolver datos de la marca junto al producto.

\* En este caso todos los campos se dejaron opciones,si quieres cambiar algun en especifico tendrias que mandar solo ese campo .

#### Success Response

Este metodo devolvera un mensaje confirmando si el producto fue modificado correctamente al sistema,caso contrario informa un error.

Succesful response example:

  - **Code:** 200 OK
  - **Content:** `{ "message": "UPDATE SUCCESSFULLY" }`

#### Error Responses

  - **Code:** 401 UNAUTHORIZED
  - **Content:** `{ "mesagge": "Problem with decoded" }`

  - **Code:** 400 Bad Request
  - **Content:** `{ "message": "ID NOT VALID ONLY NUMBER" }`

  - **Code:** 404 NOT FOUND
  - **Content:** `{ "message": "PRODUCT NOT EXIST" }`

#### Sample Call:

```
  curl --request PUT \`_
    --url 'http://localhost:3000/products/[ID-PRODUCT]'\
    --header 'Authorization: Bearer  [YOUR-TOKEN] '\
	--data '{
      "name": "Ratona Mascardi Miami Negro",
      "description": "4 Sillon Miami Negra 1 Mesita Ratona Mascardi",
    }'
```

o

```
  curl --request PUT \`_
    --url 'http://localhost:3000/products/[ID-PRODUCT]'\
    --header 'Authorization: Bearer  [YOUR-TOKEN] '\
	--data '{
      "name": "Ratona Mascardi Miami Negro",
      "description": "4 Sillon Miami Negra 1 Mesita Ratona Mascardi",
      "image_url": "https://picsum.photos/id/237/200/300",
      "price": "4234.75",
      "brandId": 2
    }'
```

## Endpoints Brands

## Endpoints User

## **Example code snippets**

El repositorio cuenta con un folder() que con tiene un archivo JSON para importar los endpoints con ejemplos en [Postman](https://www.postman.com/downloads/?utm_source=postman-home){:target="\_blank"}

##¿Necesitas ayuda?

Para cualquier pregunta, envíe un correo electrónico a agustinmansilla240@gmail.com y lo ayudare :)
