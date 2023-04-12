# DataLake - The Ultimate Customer Management Solution

Further implementation of the [Datalake-Next.js](https://github.com/yaleksenko/datalake-nextjs) project with a cloud MongoDB database. The following options have been added: authentication using JWT tokens, registration of new users, dynamic filtering by all fields, dashboard, access rights management, integration with the PostgreSQL database.


DataLake is a powerful customer management application built with Next.js, Django Rest Framework, PostgresSQL and Tailwind CSS. It provides a modern and convenient way to manage your customer data, all in one place. With the help of an API that fetches data from PostgreSQL and Redux for state management, DataLake offers a seamless and responsive experience for its users.

DataLake has implemented authentication using JWT tokens, providing additional security guarantees. With this, each user can now create, edit, and manage their clients, which are only visible to them. Additionally, DataLake offers an easy-to-use interface for viewing, adding, editing, or deleting customers from your database. You can even search for customers by all fields to help you quickly find the customers you're looking for.

But that's not all! In the near future, I plan to add even more exciting features to DataLake. These will include the ability to mass-import customers, notifications, and powerful analytics tools. With these additional tools, you'll be able to better understand your customers and make data-driven decisions to drive your business forward.     

Join me on this exciting journey to revolutionize customer management with DataLake.

You can see the demo version of the project by following the link:
(Create a new account or click [Demo](https://data.deeplogic.dev/demo/))

https://data.deeplogic.dev/


## Features
- View a list of all customers
- User dashboard
- Security features (JWT tokens, permissions)
- Access rights management
- Add new customers to the database
- Add photo link to a customer
- Edit customer details
- Delete a customer from the database
- Dynamic search by all fields
- Set activity / inactivity status

## Requirements
- Next.js version 13 
- Node.js version 18 or higher
- PostgreSQL version 14

## Getting Started
1. Clone the repository:

```
git clone https://github.com/yaleksenko/datalake-django-api.git
```

2. Install dependencies:

```
cd datalake
npm install
```

3. Set up the environment variables:
Create a .env file in the root of the project and add the following environment variables in Next.js and Djanjo projects.

```
NEXT_PUBLIC_BASE_URL="https://your-next-public-base-url"
```

```
SECRET_KEY="django-secret-key"
DATABASE_NAME="db"
DATABASE_USER="user"
DATABASE_PASSWORD="password"
DATABASE_HOST="host"
DATABASE_PORT="5432"
```

4. Start the Next.js application:

```
npm run dev
```

This will start the application in development mode.

## Building for Production
To build the application for production, run:

```
npm run build
```

This will create a build directory containing the production-ready application.

To start the production server, run:

```
npm start
````

## API Documentation
The application uses an API to fetch data from MongoDB. The API is built using Node.js.

Customer Routes:

| Route                         | Method | Description                                            |
| ------------------------------|:------:|:------------------------------------------------------:|
| /api/customers                | GET    | Get a list of all customers                            |
| /api/customers/id/            | GET    | Get details of a specific customer                     |
| /api/customers/               | POST   | Add a new customer to the database                     |
| /api/customers/id/            | PUT    | Update details of a specific customer                  |
| /api/customers/id/            | DELETE | Delete a specific customer from the database           |
| /api/customers/?search=search | GET    | Search for a customer by all fields                    |
| /api/token/                   | POST   | New JWT Token                                          |
| /api/token/refresh/           | POST   | Refresh JWT Token                                      |
| /api/auth/users/              | POST   | Register a new user                                    |
| /api/users/users/             | GET    | Get current user                                       |

                             

## Request and Response Examples
Request:
```
GET /api/customers/
````
Response:
```
[
    {
    "_id": "a0b04d59-f405-40dd-a7f7-3a874c8d42f9",
    "first_name": "Olivia",
    "last_name": "Taylor",
    "email": "olivia.taylor@gmail.com",
    "phone": "+44-789-1234568",
    "address": "10 Downing Street, London, UK",
    "status": "Inactive",
    "photo": "https://randomuser.me/api/portraits/women/7.jpg",
    "created_at": "2023-04-05T07:39:54.477878Z",
    "updated_at": "2023-04-05T07:39:54.477892Z",
    "user": 1
    },
    {
    "_id": "ea973979-d81e-4074-8a72-372e0b797fc9",
    "first_name": "Alexandre",
    "last_name": "Dubois",
    "email": "alexandre.dubois@gmail.com",
    "phone": "+33-6-12345680",
    "address": "1 Avenue des Champs-Élysées, Paris, France",
    "status": "Active",
    "photo": "https://randomuser.me/api/portraits/men/7.jpg",
    "created_at": "2023-04-05T07:40:07.750449Z",
    "updated_at": "2023-04-05T07:40:07.750461Z",
    "user": 1
    }
]
```


Request:
```
GET /api/customers/7cffb25d-2a6d-4bf9-bd75-beb680e6608b
```
Response:

```
{
  "_id": "7cffb25d-2a6d-4bf9-bd75-beb680e6608b",
  "first_name": "Hiroto",
  "last_name": "Tanaka",
  "email": "hiroto.tanaka@gmail.com",
  "phone": "+81 3-1234-5678",
  "address": "Tokyo Tower, 4 Chome-2-8 Shibakoen, Minato City, Tokyo 105-0011, Japan",
  "status": "Active",
  "photo": "https://randomuser.me/api/portraits/men/20.jpg",
  "created_at": "2023-04-05T07:41:02.752709Z",
  "updated_at": "2023-04-05T07:41:02.752721Z",
  "user": 1
}
```


Request:
```
POST /api/token/
````
Response:
```
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4MTM5MzYxNSwianRpIjoiZmEzNDc5MjYzNmJiNGI2NzhkYTc1NWMwYTRmMjk4MDYiLCJ1c2VyX2lkIjoxMX0.S28vHXi5AIcGzcBGxYg2xMvtLwhYU6rMOYmtMobbUXA",
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMzA3NTE1LCJqdGkiOiIwN2QzNDM1N2FkMTQ0YjhiYjRhODc2MDY4Njk5ZTcxOSIsInVzZXJfaWQiOjExfQ.7ODjOQZcvjrKewH7t4ngXsQjFrCUV1EBh43oUBFvUkA"
}
```
