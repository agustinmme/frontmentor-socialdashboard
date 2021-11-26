# StoryDots Challenge

- [Intro](#intro)
- [Libreries](#libreries)
- [Quick Start](#Quick-Start)
- [Endpoints documentation](#endpoints-documentation)
  - [Retrieving new Tag Codes](#retrieving-new-tag-codes)
  - [Retrieving QR Tag image](#retrieving-qr-tag-image)
  - [Placing a new order](#placing-a-new-order)
- [Util](#get-storydots-for-your-online-shop)
  - [Postman](#full-integration)
- [Need help?](#need-help)

---

## Intro

Bienvenido a la documentacion del challenge de StoryDots - Backend.
Se trata de una api REST con NodeJS que pueda realizar las
operaciones CRUD de productos con algunos extras como añadir una autenticación y unos endpoint de brands.


### Libreries

Las librerias utilizadas para el desarrollo de esta api fueron:
- Express.
- Sequelize.
- JSON Web Token.
- Dotenv.
- Bcrypt.
- Nodemon.


### Quick Start

  ####Local

- Configurar Variables de entorno o Crear archivo .env :

Ejemplo

###### DB Config

DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_PORT=3306
DB_NAME=storydots
DB_DIALECT=mysql

###### Auth Config

AUTH_SECRET=StoryDots
AUTH_EXPIRE=1h
AUTH_ROUNDS=5

- Cambiar/modificar sequelize sync:

Ingresar al archivo app.js y cambiar el valor de sequelize.sync()\* a true, esto forzara a que cada reinicio de la api se reinicie las bases de datos.

\* app.js - linea 36:35 - await sequelize.sync({ force: FALSE/TRUE  }).authenticate();

- Npm run dev


## Endpoints documentation

### **Retrieving new Tag Codes**

- **URL**

  _/tag_

- **Method:**

  `GET` - retrieves a new Tag code

- **Query Params**

  <_There are no Query Params needed for this API endpoint_>

- **Request Headers**

  **x-api-key:** _Your API Key_

- **Success Response:**

  This method will return a new, unique Tag code associated with your API key. This code identifies an active StoryDots tag. Each time you call this method you will get a new code so the overall code balance will be deducted. Please be careful in calling this method and make sure the returned code is saved for later use.

  - **Code:** 200 <br />
    **Content:** `{"tags":[{"tagCode":"[NEW-TAG-CODE]","url":"[REDIRECT-URL]"}]}`

- **Error Response:**

  - **Code:** 403 FORBIDDEN <br />
    **Content:** `{ "message": "Forbidden" }`

  - **Code:** 403 FORBIDDEN <br />
    **Content:** `{ "message": 'Out of tags, contact support' }`

- **Sample Call:**

  _`curl -X GET \`_  
  _`https://api.storydots.app/tag \`_  
  _`-H 'cache-control: no-cache' \`_  
  _`-H 'x-api-key: [YOUR-API-KEY]'`_

### **Retrieving QR Tag image**

- **URL**

  _/qr/[TAG-CODE]_

- **Method:**

  `GET` - retrieves a PNG image of the corresponding QR Tag

- **Path Params**

  **[TAG-CODE]:** _The Tag code you want to retrieve the QR Tag image from_

- **Request Headers**

  **Accept:** image/png

- **Success Response:**

  This method will return a PNG image with a QR code associated to the provided Tag code. You should print this QR Tag image and attach it to the gift's packaging.

  - **Code:** 200 OK<br />
    **Content:**
    `image/png with the binary PNG image in the body`

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{}`

- **Sample Call:**

  _`curl -X GET \`_  
  _`https://api.storydots.app/qr/[QR-CODE] \`_  
  _`-H 'cache-control: no-cache' `_
  _`-H 'Accept: image/png' `_

### Placing a new order

#### URL

  _/order_

#### Method

  - `POST` - assigns a StoryDots order to your new purchase

#### Request Headers

  - **x-api-key:** _Your API Key_
  - **Content-Type:** application/json
  
#### Body

The params should be sent as a JSON, see the sample call below. These are the params the endpoint will expect:

  - **buyerEmail**: the email address of the buyer to which we will send en email with the recording link
  - **buyerName**: the name of the buyer, which helps us customize the experience
  - **orderId**: your internal ID of the order, we will store this ID to allow you to trace the order if needed
  - **(optional) buyerPhone** - we will implement SMS/WhatsApp notifications in the near future
  - **(optional) orderDetails** - details about the order being created, which might include products bought, quantity, price, etc. This will enable us to create statistics about your gifts!
  - **(optional) ordertotal** - total cost of the order, this will be useful to generate statistics about the gifts your consumers make

#### Success Response

  This method will return a code and links to different resources related to that code, as well as the remaining stock. These are:
  - **code**: the code assigned to the new order.
  - **tagUrl**: this URL points to the full tag image that includes the QR for this specific code.
  - **codeUrl**: same as tagUrl - **_codeUrl is being removed in coming releases, as we've renamed it to tagUrl_**
  - **qrUrl**: URL containing the image of the QR code for the sender. This is _only_ the QR code, and not the full tag.
  - **storyUrl**: the link the receiver of the package will open to find the surprise greeting and reply. This is usually not needed as the receiver will enter the experience scanning the QR code.
  - **remainingStock**: remaining stock for your StoryDots user.

  Succesful response example:
  - **Code:** 200 OK
  - **Content:** `{"code": "[NEW-TAG-CODE]", "tagUrl": "https://api.storydots.app/qr/[NEW-TAG-CODE]", "codeUrl": "https://api.storydots.app/qr/[NEW-TAG-CODE]", "qrUrl": "https://api.storydots.app/qrImage/[NEW-TAG-CODE]", "storyUrl": "https://storydots.app/story/[NEW-TAG-CODE]", "remainingStock": [remainingStock]}`

#### Error Responses

  - **Code:** 403 Forbidden
    **Content:** `{ "message": "Missing Authentication Token" }`
    
  - **Code:** 400 Bad Request
    **Content:** `{ "message": "bad request, at least one of the following params is missing: [buyerEmail, buyerName, orderId]" }`

- **Sample Call:**

```
  curl --request POST \`_
    --url 'https://api.storydots.app/order'\
    --header 'Content-Type: application/json'\
    --header 'x-api-key: [YOUR-API-KEY]'\
    --data '{
      "buyerEmail": "buyer@email.com",
      "buyerName": "Buyer Name",
      "orderId": 2354654,
      "orderDetails": "{\"id\": 2354654, \"items\": [{\"name\": \"Cool gift\", \"quantity\": 1, \"price\": 2234.75}, {\"name\": \"Another cool gift\", \"quantity\": 1, \"price\": 2000}] }",
      "orderTotal": 4234.75
    }'
```

## **Example code snippets**

* [RoR sample code](RoR.md)

## Need help?

For any questions please send an email to hello@storydots.app and we will help you :)
