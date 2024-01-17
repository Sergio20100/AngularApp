## Angular Development server

Run `ng serve -o` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## python API
Run on `http://127.0.0.1:5000` you have to create a database with the name "admin-users" and other database named "users"
also you have to create a table named "users" on both databases, in future I will verify if the databases or tables not exists.

## EndPoints
* /login
1. Private Routes with JWT Authentication
    * /admin-users -> GET
    * /admin-users/:id -> GET by ID
    * /admin-user -> POST
    * /admin-users-delete/:id -> DELETE
    * /admin-users-edit/:id -> PUT

2. Public Routes
    * /users -> GET
    * /users/:id -> GET by ID
    * /user -> method POST
    * /delete/:id -> DELETE
    * /edit/:id -> PUT
