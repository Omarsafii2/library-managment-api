# 📚 Library Management API  

The **Library Management API** is a RESTful API built with **Node.js, Express, TypeScript, and MySQL**. It allows users to manage **books, authors, and user authentication**.  

The API follows **clean architecture principles** and implements **Observer, Singleton, and Factory Design Patterns** to ensure scalability and maintainability.  

---

## 🚀 Setup Instructions  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
```

### 2️⃣ Install Dependencies  
```sh
npm install
```

### 3️⃣ Configure Environment Variables  
Create a **`.env`** file in the project root and configure your database credentials as shown in **`.env.example`**:  

```env
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
PORT=3000
```

### 4️⃣ Database 
Ensure your **MySQL database** is set up .

### 5️⃣ Start the Server  
```sh
npm run dev
```

---

## 📌 API Documentation  

### 🔑 Authentication Routes  

| **Method** | **Endpoint**             | **Description**                        |
|-----------|-------------------------|----------------------------------------|
| `POST`    | `/api/auth/register`     | Register a new user                   |
| `POST`    | `/api/auth/login`        | Authenticate a user and return a token |

### ✍️ Author Routes  

| **Method** | **Endpoint**            | **Description**                          |
|-----------|------------------------|------------------------------------------|
| `GET`     | `/api/authors`          | Get all authors                         |
| `GET`     | `/api/authors/:id`      | Get a specific author by ID             |
| `POST`    | `/api/authors`          | Create a new author                     |
| `PUT`     | `/api/authors/:id`      | Update an existing author               |
| `DELETE`  | `/api/authors/:id`      | Delete an author                        |

### 📚 Book Routes  

| **Method** | **Endpoint**            | **Description**                          |
|-----------|------------------------|------------------------------------------|
| `GET`     | `/api/books`            | Get all books                            |
| `GET`     | `/api/books/:id`        | Get a specific book by ID                |
| `POST`    | `/api/books`            | Create a new book                        |
| `PUT`     | `/api/books/:id`        | Update an existing book                  |
| `DELETE`  | `/api/books/:id`        | Delete a book                            |

---

## 🎯 Design Patterns Used  

### 🔵 **Observer Pattern (Logging Notifications)**  
The **Observer Pattern** is used to **log events** when critical actions occur (e.g., when a **book is added, an author is created, or a user registers**). Instead of adding logging logic **directly in controllers**, we use an **event-based approach**.  

#### **How It Works:**  
👉 **Subjects (Observable):** `Book`, `Author`, and `User` models **notify observers** when new data is created.  
👉 **Observers:** A **logger service** listens to these events and records logs.  

---

### 🟢 **Singleton Pattern (Database Connection)**  
The **Singleton Pattern** ensures that only **one instance of the database connection** is used throughout the app.  

#### **How It Works:**  
👉 A **single database connection instance** is created in `database.ts`.  
👉 The **same instance** is reused across the app.  
👉 Prevents **multiple connections**, improving **performance**.  

---

### 🟠 **Factory Pattern (Dynamic Controller Creation)**  
The **Factory Pattern** is used to **dynamically create controllers** instead of manually instantiating them.  

#### **How It Works:**  
👉 A **`ControllerFactory`** generates the correct **controller instance** based on the requested **entity (Book, Author)**.  
👉 This makes it **easy to extend** the API by adding new resources.  

---

## 🔮 Future Improvements  
- 🔒 Implement **JWT Authentication** for better security.  


