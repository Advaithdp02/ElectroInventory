# ElectroInventory

A full stack web application for managing inventory of electronic items such as TVs, speakers, keyboards, and more. This system provides secure role-based access, efficient inventory CRUD operations, and dynamic pagination and filtering.

---

## Features

- **User Authentication & Authorization**  
  Secure login system with role-based access (admin/user).

- **Inventory Management**  
  Add, update, delete, and view electronic items with details like name, type, quantity, and price.

- **Pagination & Filtering**  
  Easily browse items with pagination and search/filter by name or type.

- **RESTful API Backend**  
  Node.js and Express API endpoints to handle all CRUD operations securely.

- **Frontend UI**  
  React-based interface with modals for editing, sortable tables, and responsive design.

---

## Technologies Used

- Frontend: React, React Router, Axios  
- Backend: Node.js, Express.js  
- Database: MongoDB  
- Authentication: JWT (JSON Web Tokens)  
- Styling: CSS Modules / Custom CSS  

---

## Getting Started

### Prerequisites

- Node.js and npm installed  
- MongoDB installed and running locally or a cloud instance  

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/electronic-warehouse-management.git
   cd electronic-warehouse-management```

2.Install backend dependencies and start the server:

```bash

cd backend
npm install
npm run start
```
3.Install frontend dependencies and start React app:

```bash

cd ../frontend
npm install
npm start
```
Open your browser at http://localhost:3000 to access the app.

### Usage
-Register new users (admin only)

-Login with your credentials

-Add, update, delete electronic items (admin only)

-Browse and search items with pagination and sorting

