# ECommerceTest

This is an Angular-based e-commerce application built as part of an assignment. The app provides a simplified e-commerce experience, allowing users to browse products, filter by category, add items to their cart, and complete a checkout process with form validation. The application interacts with the [Fake Store API](https://fakestoreapi.com/) for product data and user authentication.

## Live Demo

The application is live and accessible here: [ECommerceTest on Vercel](https://e-commercec-lovat.vercel.app/#/home).

---

## Features

### Product Management
- **Browse Products:** View a list of products fetched from the Fake Store API.
- **Filter by Category:** Narrow down products by selecting categories.
- **View Product Details:** Access a dedicated page for detailed product information.
- **Add to Cart:** Add items to the cart directly from the product list or details page.

### Cart and Checkout
- **Cart Management:**
  - View items added to the cart.
  - Adjust quantities of items or remove them.
- **Checkout Form:**
  - Validate user information (e.g., name, address).
  - Accept and validate credit card details (card number, expiration date, CVV).
  - Simulated payment functionality.

### User Authentication
- Log in with pre-defined credentials using the Fake Store API.
- Sample user credentials:
  - **Username:** johnd | **Password:** m38rmF$
  - **Username:** mor_2314 | **Password:** 83r5^_
  - **Username:** kevinryan | **Password:** kev02937@
  - Additional credentials can be found in the project source.

---

## Technology Stack
- **Frontend:** Angular 17.3.1
- **API:** [Fake Store API](https://fakestoreapi.com/)
- **Styling:** Angular Material, CSS
- **Deployment:** Vercel

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ken2ie/e-commerce-test.git
   cd e-commerce-test

## API Reference 

The application uses the [Fake Store API](https://fakestoreapi.com/) for the following functionality:

- **Products:** Retrieve product data for listing and detailed views.
- **Authentication:** Validate user credentials (test users only; no persistence).
- **Cart Management:** Simulate cart functionality; data is stored locally and not persisted on the server.

---

## Form Validation

The checkout form enforces strict validation to ensure data integrity:

### Required Fields
1. **Full Name:** 
   - Must be at least 3 characters long.
2. **Address:** 
   - Must include:
     - Street name.
     - City name.
     - Zip code.
     - House number.
3. **Credit Card Details:** 
   - **Card Number:** 
     - Must be 16 digits and validated using Luhn's algorithm.
   - **Expiration Date:** 
     - Format: `MM/YY`.
   - **CVV:** 
     - Must be a 3-digit numeric security code.

---

## Known Limitations

- The Fake Store API does not support persistence of user data or cart information.
- Payment processing is simulated and does not integrate with actual payment gateways.

---

## Future Improvements

To enhance the application, the following updates are planned:
1. **Backend Integration:**
   - Develop a backend service to persist user accounts, cart details, and order history.
2. **Payment Processing:**
   - Integrate real payment gateways like Stripe or PayPal for secure transactions.
3. **UI/UX Enhancements:**
   - Improve design and navigation for a more user-friendly experience.

---

## License

This project is open-source and available for use under a permissive license. Feel free to fork and modify as needed.


