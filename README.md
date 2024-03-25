# ⚡ Calendar App 📆 ⏰ 📌 🎉 📝 🔄 🚩

Calendar App built with React, Vite, TypeScript, Tailwind, Zustand, Laravel, Python and PostgreSQL.

## Technologies Used

- **React**

React is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components using JSX transpiling and manage the application's state efficiently.

- **Vite**

Vite is a fast build tool for modern web development. It provides instant server start and hot module replacement (HMR), making the development experience smoother and more productive.

- **TypeScript**

TypeScript is a strongly typed superset of JavaScript that enhances code maintainability and scalability. It allows us to catch errors during development and provides better tooling support, leading to more robust applications.

- **Tailwind CSS**

Tailwind CSS is a utility-first CSS framework that enables rapid UI development. Its utility classes make it easy to create responsive and custom-designed user interfaces without writing custom CSS.

- **Zustand**

Zustand is a global state management for React/Next.js applications. It is more modern and more performant than Redux.

- **Laravel**

Laravel is a PHP web application framework known for its elegant syntax and developer-friendly features. It follows the MVC pattern and provides powerful tools for building robust web applications.

- **Python**

Python is a versatile programming language that is widely used for web development, data analysis, machine learning, and more. It is known for its readability and immense ecosystem, making it a popular choice among developers.

- **PostgreSQL**

PostgreSQL is a RDBMS known for its reliability, robust feature set, and extensibility. It is highly regarded for its ability to handle complex queries, manage high concurrency, and provide advanced data types and indexing capabilities. 

The goal of using these technologies is to create a high-performing, modern and scalable application.

Please refer to the respective documentation of each technology for more in-depth details and usage instructions.

## How to use

1. Register your app at Github and Google

2. Create `.env` file in root directory, and put corresponding variables:

# `api` and `frontend/socials-server` DIRECTORIES

```
GITHUB_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_SECRET=YOUR_GITHUB_CLIENT_SECRET

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
```

`api` DIRECTORY DATABASE ENVIRONMENT VARIABLES
DB_CONNECTION=YOUR_DB_CONNECTION
DB_HOST=YOUR_DB_HOST
DB_PORT=YOUR_DB_PORT
DB_DATABASE=YOUR_DB_DATABASE
DB_USERNAME=YOUR_DB_USERNAME
DB_PASSWORD=YOUR_DB_PASSWORD
SSLMODE=require

# FRONTEND DIRECTORY

```
VITE_SERVICE_NAME=

VITE_GITHUB_ID=YOUR_GITHUB_CLIENT_ID
VITE_GITHUB_SECRET=YOUR_GITHUB_CLIENT_SECRET

VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
VITE_GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
```

3. Navigate to `api` and run 
`composer install`
`php artisan key:generate`
`php artisan serve`

If you haven't done it already, go to your PHP installation directory and find `php.ini`
and uncomment the line for PostgreSQL driver

;extension=php_pdo_mysql.dll

4. Navigate to `frontend/socials-server` and run
`pip install -r requirements.txt`
`python app.py`

This will run Flask server which is needed to enable communicating with auth social providers like Github and Google. 

5. Navigate to `frontend` and run
`yarn`
`yarn dev`

This will run React application.

## Customize the app

Customize the app to suit your needs!
