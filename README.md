# E-Commerce API

Welcome to the E-Commerce API, a backend service built using **Express.js**. This API supports multilingual functionality (**Arabic** and **English**) via **i18next**, user authentication using **access tokens** and **refresh tokens**, and secure payment processing through **Stripe**. It also incorporates **OAuth** for seamless user login and adheres to the **MIT License**.

---

## Features

- **Authentication and Authorization**:
  - Secure login and registration using **JWT** (access and refresh tokens).
  - OAuth integration for third-party authentication.
  - Cookies for storing and managing tokens securely.

- **Payment Processing**:
  - Integrated with **Stripe** for safe and efficient payment transactions.

- **Multilingual Support**:
  - Dual-language support (**Arabic** and **English**) implemented with **i18next**.

- **E-Commerce Functionalities**:
  - Manage products, categories, and brands.
  - Shopping cart and order management.
  - Admin controls for managing users and transactions.

---

## Prerequisites

- **Node.js** (v16 or above)
- **npm** (v8 or above)
- A **MongoDB** database
- A **Stripe** account for payment processing
- OAuth credentials for third-party login (e.g., Google)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mohamed-Abdulhai/ecommerce-api.git
   cd ecommerce-api
2. Install dependencies:
    ```bash
    npm install
3. Cut the .env.example contents to .env
   ```bash
   mv .env.example .env
4. Put your environment variables
   ```bash
   HOST=The-Host-where-the-ecommerce-API-is-running-for-example-http://localhost:5000
   PORT=Youre Port
   NODE_ENV=development-or-production
   MONGO_URL=Your-mongoDB-URL
   CLIENT_URL=The-frontend-url-that-you-are-runing-in-it
5. Start the server in development mode:
    ```bash
    nmp run dev
6. Or run it in production mode:
    ```bash
    npm start