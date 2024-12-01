# E-commerce Web Application (GitHub Copilot)

## Project Overview

This project is an E-commerce web application developed with the assistance of GitHub Copilot. The main goal of this project is to build an application with a product catalog, shopping cart, and payment system.

## Features

1. **Product Catalog**: Display a list of products fetched from the backend.
2. **Shopping Cart**: Add, remove, and view products in the cart.
3. **Payment System**: Simulate a payment process with a modal form.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for Node.js.
- **Database Interaction**: Functions generated with the help of GitHub Copilot.

### Frontend
- **React**: JavaScript library for building user interfaces.
- **React Hooks**: Used for state management and side effects.
- **React Modal**: For handling the payment modal.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```

3. Install frontend dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

### Running the Application

1. Start the backend server:
    ```bash
    cd backend
    npm start
    ```

2. Start the frontend development server:
    ```bash
    cd ../frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

### Backend (`backend` directory)
- `server.js`: Entry point for the backend server.
- `routes/`: Contains the API routes.
- `controllers/`: Contains the logic for handling requests.
- `models/`: Contains the database models.

### Frontend (`frontend` directory)
- `src/`: Contains the React application source code.
  - `components/`: Contains React components.
  - `App.js`: Main application component.
  - `PaymentModal.js`: Component for the payment modal.
  - `App.css`: Styles for the application.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

This project was developed with the assistance of GitHub Copilot.