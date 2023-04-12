# DataLake - The Ultimate Customer Management Solution

DataLake is a powerful customer management application built with Next.js, MongoDB, and Tailwind CSS. It provides a modern and convenient way to manage your customer data, all in one place. With the help of an API that fetches data from MongoDB and Redux for state management, DataLake offers a seamless and responsive experience for its users.

Whether you need to view, add, edit, or delete customers from your database, DataLake has got you covered. You can easily search for customers by first and last name, and the application uses dynamic filtering to help you quickly find the customers you're looking for.

But that's not all! In the near future, we plan to add even more exciting features to DataLake. These will include a personalized customer dashboard, the ability to mass-import customers, notifications, and powerful analytics tools. With these additional tools, you'll be able to better understand your customers and make data-driven decisions to drive your business forward.

Join me on this exciting journey to revolutionize customer management with DataLake.

You can see the demo version of the project by following the link:

https://db.deeplogic.dev/


## Features
- View a list of all customers
- Add new customers to the database
- Add photo link to customer
- Edit customer details
- Delete a customer from the database
- Dynamic search for a customer by first and last name
- Set activity / inactivity status

## Requirements
- Next.js version 13 
- Node.js version 18 or higher
- MongoDB version 5 or higher

## Getting Started
1. Clone the repository:

```
git clone https://github.com/yaleksenko/datalake-nextjs.git
```

2. Install dependencies:

```
cd datalake
npm install
```

3. Set up the environment variables:
Create a .env file in the root of the project and add the following environment variables

```
MONGODB_URI="your-mongodb-uri"
MONGODB_DB="your-mongodb-db"
NEXT_PUBLIC_BASE_URL="https://your-next-public-base-url.com"
```

4. Start the application:

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
| /api/customer/id              | GET    | Get details of a specific customer                     |
| /api/customers                | POST   | Add a new customer to the database                     |
| /api/customers/?id=id         | PUT    | Update details of a specific customer                  |
| /api/customers/?id=id         | DELETE | Delete a specific customer from the database           |
| /api/customers/?filter=filter | GET    | Search for a customer by first and last name           |

                             

## Request and Response Examples

Request:

```
GET /api/customers
````

Response:
```
{"customer":
    [{
        "_id":"641253da096c4ebbc924a9e7",
        "first_name":"Javier",
        "last_name":"Rodriguez",
        "email":"javier.rodriguez@gmail.com",
        "phone":"+39-655-123966",
        "address":"Gran Via 2, Madrid, Spain",
        "status":"Active",
        "photo":"https://randomuser.me/api/portraits/men/51.jpg",
        "user":"1"
    },
    {
        "_id":"641253f4096c4ebbc924a9e8",
        "first_name":"Ling",
        "last_name":"Likur",
        "email":"ling.li@gmail.com",
        "phone":"+86-12345680",
        "address":"123 Nanjing Road, Shanghai, China",
        "status":"Active",
        "photo":"https://randomuser.me/api/portraits/women/46.jpg",
        "user":"1"
    }]
}
```


Request:

```
GET /api/customer/641c74524b3ecc02cc95390f
```

Response:

```
{"customer":
    {"_id":"641c74524b3ecc02cc95390f",
    "first_name":"Hans",
    "last_name":"Dubois",
    "email":"hans.dubois@gmail.com",
    "phone":"+44-789-1234567",
    "address":"33 Downing Street, London, UK",
    "status":"Active",
    "photo":"https://randomuser.me/api/portraits/men/77.jpg",
    "user":1}
}
```
