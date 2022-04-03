# ecommerce-home-assistment
Ecommerce Home Assistment

**How to run:**
sls deploy --verbose or serverless deploy --verbose


**Get Products**
curl --location --request GET 'https://jifmguoil3.execute-api.ap-southeast-1.amazonaws.com/dev/products?pageNumber=1'

**Get Single Product**
curl --location --request GET 'https://jifmguoil3.execute-api.ap-southeast-1.amazonaws.com/dev/product/6247c29663001bf1fdd35fc3'

**Add to Cart**
curl --location --request POST 'https://jifmguoil3.execute-api.ap-southeast-1.amazonaws.com/dev/cart' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user": "Aldrin",
    "cartItems": {
            "name": "Mens Cotton Jacket",
            "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            "price": 99.9,
            "qty": 2,
            "product": "6247c29663001bf1fdd35fc3" 
    }
}'

**Create order**
curl --location --request POST 'https://jifmguoil3.execute-api.ap-southeast-1.amazonaws.com/dev/order' \
--header 'Content-Type: application/json' \
--data-raw '{
  "user": "John Doe",
  "orderItems": [
    {
      "name": "Opna Women'\''s Short Sleeve Moisture",
      "image": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
      "price": 7.95,
      "qty": 1,
      "product": "6248072b2d3f6f0438019843"
    }
  ],
  "shippingAddress": {
    "address": "ddd",
    "city": "Cebu",
    "postalCode": "11111",
    "country": "mx"
  },
  "paymentMethod": "card",
  "currency": "USD",
  "taxPrice": 12,
  "shippingPrice": 70,
  "totalPrice": 100,
  "isPaid": true,
  "isDelivered": false
}'
