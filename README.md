# ECommerceTest

This project is an Angular-based e-commerce application designed as a test project. The app interacts with the [Fake Store API](https://fakestoreapi.com/) to fetch and display product data. Users can explore products, filter by category, view detailed product pages, add products to their cart, and proceed through a simulated checkout process with form validation, including credit card details.

## Features

### Product Listing
- Displays a list of products fetched from the [Fake Store API](https://fakestoreapi.com/).
- Allows filtering products by category for easy navigation.

### Product Details
- Shows detailed information about individual products.
- Option to add products to the cart directly from the details page.

### Cart Management
- View items added to the cart.
- Update product quantities in the cart.
- Remove products from the cart.

### Checkout
- Form-based checkout system with field validation for:
  - Name
  - Address
  - Credit card details (Card Number, Expiry Date, and CVV).
- Simulated payment functionality.

### Authentication
- Users can log in using test credentials since the API does not persist user data.
- Sample test credentials:
  - **Username:** johnd | **Password:** m38rmF$
  - **Username:** mor_2314 | **Password:** 83r5^_
  - **Username:** kevinryan | **Password:** kev02937@
  - **Username:** donero | **Password:** ewedon
  - **Username:** derek | **Password:** jklg*_56
  - More test users are available in the codebase.

## Technology Stack
- **Frontend:** Angular 17.3.1
- **Backend:** [Fake Store API](https://fakestoreapi.com/)
- **Styling:** Angular Material, CSS
- **Form Validation:** Angular Reactive Forms

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository/ECommerceTest.git
   cd ECommerceTest
