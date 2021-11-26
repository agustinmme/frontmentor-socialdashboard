# StoryDots Challenge

- [Intro](#intro)
- [Frameworks/libreries](#get-storydots-for-your-online-shop)
  - [Frameworks/libreries](#Frameworks-and-libreries)
- [Endpoints documentation](#endpoints-documentation)
  - [Retrieving new Tag Codes](#retrieving-new-tag-codes)
  - [Retrieving QR Tag image](#retrieving-qr-tag-image)
  - [Placing a new order](#placing-a-new-order)
- [Example code snippets](#example-code-snippets)
- [Util](#get-storydots-for-your-online-shop)
  - [Postman](#full-integration)
- [Need help?](#need-help)

---

## Intro

Bienvenido a la documentacion del challenge de StoryDots - Backend.
Se trata de una api REST con Node para realizar un crud basico de productos al cual se le agrego una autenticación y algunos endpoint extras.

## Get StoryDots for your online shop

You can integrate your e-commerce with StoryDots in two different ways:
1. when a purchase is completed you will request a StoryDots code so that you can print it and include it in the gift's package. You will take care of sending your client the link so that they can record their virtual greeting (see [Simple integration](#simple-integration)).
2. when a purchase is completed, you will let us know about the order and we will take care of sending emails to the user so that they can record their greeting. You will receive the URL for the tag image so that you can print it and include it in the package (see [Full integration](#full-integration)).

### Frameworks and libreries

This API should be integrated in your shopping cart. Keep in mind you will be in charge of letting your users know how to record their greeting. There are two simple steps you need to follow in order to do this

1. You should get a Tag code once the purchase _is confirmed_ (this is important since every time you get a Tag code, it will be deducted from your balance) and store the _url_ since you will need to redirect the user there so that he can upload his video (you can do it on screen, via email or both).
2. You can use the Tag code to retrieve the QR Tag so that it can be printed and added to the gift's packaging.

### Full integration

You will integrate with our API letting StoryDots know when there is a new order, and we will take care of sending a notification to the user so thay they can record their virtual greeting. You will just need to print the tag with the QR code and include it in the gift's package. This integration works as follows:

1. When a new order is placed, you will send a request to the `/order` endpoint informing us of the new purchase. You should perform this request once the purchase _is confirmed_ (this is important since every time you get a Tag code, it will be deducted from your balance).
2. The response will include the code and the URL to the tag image with the QR code for you to print (this is the [/qr](#retrieving-qr-tag-image) endpoint documented below). You will include the printed tag in the gift's package, and we will take care of sending an email to the user to let them know they can record their virtual greeting. 

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
