# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 
#
## API Endpoints

### Important Note: 
```
Don't forget to put bearer token after getting it in Postman's Header Authorization
```
### users

- createUser(post)  = http://localhost:3000/users/create                   
- Example of HOW JSON BODY SHOULD BE
```
{
    "userName":"Abdo",
    "password":"Abdo1234",
    "firstName":"Abdelrahmannn",
    "lastName":"Magdy"
}
```
- updateUser(put) [token required] => http://localhost:3000/users/:id      
- Index(get) [token required] = http://localhost:3000/users           
- showUser(get) [token required] = http://localhost:3000/users/:id        
- login(post) = http://localhost:3000/users/login                    
#
### products

- createProduct(post)  = http://localhost:3000/products/create                   
- Example of HOW JSON BODY SHOULD BE
```
{   
    "name":"Oppo",
    "category":"Mobile Phones",
    "price":6000
}
```

- updateProduct(put) [token required] => http://localhost:3000/products/update/:id      
- Index(get) [token required] = http://localhost:3000/products           
- showProductsInCategory(get) [token required] = http://localhost:3000/products/category/:category              
- showProduct(get) [token required] = http://localhost:3000/products/:id  
- deleteProduct(delete)  = http://localhost:3000/products/:id                   
                   
#
### orders

- createOrder(post)  = http://localhost:3000/orders/create
- Example of HOW JSON BODY SHOULD BE
```
{   
    "user_id":1,
    "status":"pending",
    "products":[{
                "product_id":3,
        "quantity":74

    },
    {
        "product_id":2,
        "quantity":6

    }
    ]

}
```
- showUserFulfilledOrders(get)  = http://localhost:3000/orders/user/completed  
- showCurrentUserOrder(get)  = http://localhost:3000/orders/user    

#

## Data Tables
#
## users
 Columns       |            Type
-------------  | --------------------------
  id           |     integer
  user_name    |     varchar(150)
  password     |     varchar(150)
  first_name   |    varchar(150)
  last_name    |     varchar(150)

#
## products
 Columns       |            Type
-------------  | --------------------------
  id           |     integer
  name    |     varchar(150)
  password     |     varchar(150)
  category   |    varchar(150)
  price    |     integer


#
## products_order
 Columns      |        Type
------------- | ------------------
  product_id  |     integer (FK)
  order_id    |     integer (FK)
  quantity    |     integer
 #
## Orders
 Columns      |            Type
------------- | -----------------------
  id          |     integer
  user_id     |     integer (FK)
  status      |     StatusOfProduct ENUM('pending', 'fulfilled')

