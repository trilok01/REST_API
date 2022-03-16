# NODE AUTHENTICATION API

## DESCRIPTION

This API is created to store and manage users and products details.  
First the user is created and after logging in the user can add products in the database.  
There is also JWT authentication. User cannot view any user or add any product without authentication.

## REQUIREMENTS

[NodeJS](https://nodejs.org/en/download/)  
[MongoDB](https://www.mongodb.com/try/download/community)  
[MongoDBCompass](https://www.mongodb.com/try/download/compass)  
[Postman](https://www.postman.com/downloads/)  

## CONFIGURING MONGODB

1. Go to MongoDBCompass.  
2. Click `Connect`.  

## INSTALLATION AND SETUP

1. Clone the repository.
2. Open the root directory in Terminal or CMD.
3. Run `npm install` to download all the packages.
4. Run `npm run dev` to start the server.
5. It will run on PORT 3000.

## PATHS AND METHODS

SIGNUP  
Method --> `POST`  

`localhost:3000/signup`  

1. To create new user.  
2. It accepts body in JSON format.  
3. In Postman go to `Body -> raw -> JSON`  
4. Insert the record in JSON format:  

    ```JSON
    {
        "firstName": "f_name",
        "lastName": "l_name",
        "username": "u_name",
        "password": "password"
    }
    ```
5. Click Send.  
***
LOGIN  
Method --> `POST`

`localhost:3000/login`

1. Inside Postman go to: `Body -> x-www-form-urlencoded`
2. Give username and password in key value pair format.  

    |KEY|VALUE|
    |---|-----|
    |username|ABC|
    |password|pwd|
3. Click Send
4. After Successful Logging in it will generate an `Authentication Token`
    ```JSON
    {
        "auth": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjFmNzRhNTVjOGY3NGI2ZDNiYzA5NWIiLCJ1c2VybmFtZSI6Im1vbnUiLCJpYXQiOjE2NDc0Mzc0ODUsImV4cCI6MTY0NzQzNzc4NX0.qUkMm4JqjNF1dZcg5BPohxvZb5PT_8YV-YTvildk0zI"
    }
    ```
***
USERLIST  
Method --> `GET`

`localhost:3000/userlist`

1. You can only access this address if you have `Authentication Token` generated while login.
2. Go to `headers` in Postman.
3. Give a key value pair in header:

    |KEY|VALUE|
    |---|-----|
    |x-access-token|token_generated_on_login|
4. Click Send.
***
ADD PRODUCT  
Method --> `POST`

`localhost:3000/addproduct`

1. It requires `Authentication Token` and a `CSV` file.
2. Go to `headers` in Postman.
3. Give a key value pair in header:

    |KEY|VALUE|
    |---|-----|
    |x-access-token|token_generated_on_login|
4. Go to Body in Postman.
5. Select Key type as file.
6. Give key as `file`.
7. Select the CSV file in the value.
    |KEY|VALUE|
    |---|-----|
    |file|`Select CSV file`|
8. Click Send. 
