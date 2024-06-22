# ShopSmart
This is a full-fledged e-commerce application built using the MERN stack (MongoDB, Express, React, Node.js). It provides features like user authentication, product management, order processing, reviews, and dynamic notifications for various actions.

## Table of Contents
- [Features](#Features)
- [Installation](#installation)
- [Configuration](#Configuration)
- [Usage](#usage)
- [Technologies](#Technolgies)
- [License](#license)

## Features
- **User Authentication** - Strict authentication using jwt tokens to provide fortified access.
- **Product Management** - Manage and display new products onto your shop.
- **Cloud Image Storing** - The app uses cloudinary as an image storage for product images.
- **Shopping Cart** - Customers can save products to their cart for buying later.
- **Coupons** - Customers are able to get coupons to get discounts on their purchases.
- **Order Processing** - Customers can keep track of their delivered or cancelled orders and are able to reoder with just one click.
- **Reviews** - Only genuine customers who have purchased a product are able to review it.
- **Notifications** - Customers or admins can be alerted of their actions whenever there is an important change on the app.

## Installation
1. **Clone the repository**
   ```bash
    git clone [https://github.com/yourusername/mern-stack-shopping-cart.git](https://github.com/CompCodeHub/mern-stack-shopping-cart.git)
    cd mern-stack-shopping-cart/shopping-cart-project

2. **Installing client dependencies**
   ```bash
   cd ReactApp
   npm install 
3. **Installing server dependencies**
   ```bash
   cd node_api
   npm install

## Configuration
- **Add the following envorinment variables to your .env file in the node_api folder:**
  ```bash
  CLOUD_NAME=(cloudinary cloud name)
  API_KEY=(cloudinary api key)
  API_SECRET=(cloudinary api secret)
  JWT_SECRET=(any secret for jwt authentication)
  NODE_ENV=(production or development)

