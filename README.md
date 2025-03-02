Overview

The Library Management API is a RESTful API built with Node.js, Express, and MySQL. It allows users to manage books, authors, and user authentication. The API follows clean architectural principles and implements Observer, Singleton, and Factory Design Patterns to ensure scalability and maintainability.


Setup Instructions
1. Clone the Repository
    git clone https://github.com/your-username/library-management-api.git
    cd library-management-api

2. Install Dependencies  
    npm install

3. Configure Environment Variables
    Create a .env file in the project root and configure your database credentials as shown in .env.example:
        DB_HOST=your-database-host
        DB_USER=your-database-user
        DB_PASSWORD=your-database-password
        DB_NAME=your-database-name
        PORT=3000    

4. Run Migrations (If Needed)
     Ensure your MySQL database is set up and run any migrations required     
 
5. Start the Server
    npm run dev



API Documentation

Authentication Routes

Method    Endpoint                 Description
POST      /api/auth/register       Register a new user
POST      /api/auth/login           Authenticate a user and return a token    

Author Routes

Method    Endpoint                  Description
GET       /api/authors              Get all authors
GET       /api/authors/:id          Get a specific author by ID
POST      /api/authors              Create a new author
PUT       /api/authors/:id          Update an existing author
DELETE    /api/authors/:id          Delete an author

Book Routes

Method    Endpoint                  Description
GET       /api/books                Get all books
GET       /api/books/:id            Get a specific book by ID
POST      /api/books                Create a new book
PUT       /api/books/:id            Update an existing book
DELETE    /api/books/:id            Delete a book



Design Patterns Used

1. Observer Pattern (Logging Notifications)

The Observer Pattern is used to log events when critical actions occur (e.g., when a book is added, an author is created, or a user registers). Instead of adding logging logic directly in controllers, we use an event-based approach.

How It Works:

Subjects (Observable): Book, Author, and User models notify observers when new data is created.

Observers: A logger service listens to these events and records logs.

2. Singleton Pattern (Database Connection)

To ensure only one instance of the database connection is used throughout the app, we apply the Singleton Pattern in database.ts.

How It Works:

A single database connection instance is created and reused across the app.

This prevents multiple connections from being created, improving performance.


3. Factory Pattern (Dynamic Controller Creation)

The Factory Pattern is used to dynamically create controllers instead of manually instantiating them.

How It Works:

A ControllerFactory generates the correct controller instance based on the requested entity (Book, Author).

This makes it easy to extend the API by adding new resources.


Future Improvements

Implement JWT Authentication for better security.
              