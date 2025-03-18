# warehouse-system
Warehouse Management System
A comprehensive web-based warehouse management system designed to streamline inventory tracking and sales operations. This system integrates real-time updates, secure user authentication, and role-based access control to ensure efficient management of warehouse operations.

Key Features
Real-Time Updates: Utilizes Server-Sent Events (SSE) to provide live updates on inventory levels and price changes.
Role-Based Access Control: Ensures that only authorized users (sales, logistics, admin) can access and modify relevant data.
Secure Authentication: Implements user authentication with password hashing and salting for enhanced security.
HTTPS Support: Ensures all data transmitted between the client and server is encrypted using SSL/TLS certificates.

Technologies Used
Backend: Node.js with Express.js framework
Database: PostgreSQL for storing inventory and sales data
Frontend: EJS templating engine for dynamic web pages
Security: Helmet for security headers, CORS for cross-origin requests

Setup Instructions
Clone the repository: git clone https://github.com/markaldo/warehouse-system.git
Install dependencies: npm install
Generate SSL certificates for HTTPS (see Generating SSL Certificates)
Start the server: node app.js
Access the application at https://localhost:3443

![image](https://github.com/user-attachments/assets/705b4fb8-0a99-4c50-a3d2-0ee5e55a6d7e)

