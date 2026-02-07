# User Registration and Authentication System

## Project Description
A full-stack user authentication system with Spring Boot backend and React frontend.

## Technologies Used
- Backend: Spring Boot 3.x, Spring Security, JPA, MySQL, JWT
- Frontend: React 18, React Router, Axios, Bootstrap
- Database: MySQL 8.0

## How to Run

### Backend
1. Clone the repository
2. Configure database in `application.properties`
3. Run: `./mvnw spring-boot:run`
4. Access API at: `http://localhost:8080`

### Web App
1. Navigate to `/web` directory
2. Install dependencies: `npm install`
3. Run: `npm start`
4. Access at: `http://localhost:3000`

### Mobile App (TODO)
Will be implemented in Session 2.

## API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/me` - Get current user (protected)