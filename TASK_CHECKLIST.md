# Task Checklist

## DONE ✅

### Backend (Spring Boot)
- [x] Initialize Spring Boot project with dependencies (`41043b7`)
- [x] Create User entity with JPA annotations (`41043b7`)
- [x] Implement UserRepository interface (`41043b7`)
- [x] Create AuthController with register/login endpoints (`41043b7`)
- [x] Implement UserController with protected /api/user/me endpoint (`41043b7`)
- [x] Configure Spring Security with JWT authentication (`41043b7`)
- [x] Add PasswordEncoder for BCrypt password hashing (`41043b7`)
- [x] Setup JWT utility classes for token generation/validation (`41043b7`)
- [x] Configure CORS for React frontend (`41043b7`)
- [x] Add request/response DTOs (`41043b7`)
- [x] Implement error handling and validation (`41043b7`)
- [x] Setup H2 database for local development (`41043b7`)
- [x] Test all API endpoints with Postman (`41043b7`)

### Frontend (React)
- [x] Initialize React app with router and Bootstrap (`41043b7`)
- [x] Create AuthContext for global state management (`41043b7`)
- [x] Setup API service with Axios interceptors (`41043b7`)
- [x] Implement ProtectedRoute component (`41043b7`)
- [x] Create reusable form components (Input, Button) (`41043b7`)
- [x] Build Register page with Formik validation (`41043b7`)
- [x] Build Login page with authentication flow (`41043b7`)
- [x] Create Dashboard/Profile page (protected) (`41043b7`)
- [x] Add logout functionality (`41043b7`)
- [x] Implement Navbar with dynamic navigation (`41043b7`)
- [x] Add toast notifications for user feedback (`41043b7`)
- [x] Style application with custom CSS (`41043b7`)
- [x] Test registration flow (`41043b7`)
- [x] Test login flow (`41043b7`)
- [x] Test protected route access (`41043b7`)

### Documentation
- [x] Create README.md with setup instructions (`41043b7`)
- [x] Update TASK_CHECKLIST.md with progress (`41043b7`)
- [x] Add .gitignore for proper file exclusion (`41043b7`)
- [x] Document API endpoints in README (`41043b7`)

## IN-PROGRESS 🟡

### Current Issues to Fix
- [ ] Fix React infinite refresh issue after login
- [ ] Add loading states to prevent white screen
- [ ] Improve error handling in AuthContext
- [ ] Add form validation error messages

## TODO 📝

### Testing & Documentation
- [ ] Test all API endpoints with error cases
- [ ] Add Postman collection to /docs folder
- [ ] Take screenshots of Web UI:
  - [ ] Register page
  - [ ] Login page
  - [ ] Dashboard/Profile page
  - [ ] Logout confirmation
- [ ] Update FRS PDF with screenshots
- [ ] Add ERD diagram to docs
- [ ] Add UML diagrams to docs

### Mobile App (Session 2)
- [ ] Initialize React Native project
- [ ] Create authentication screens
- [ ] Implement protected routes
- [ ] Connect to backend API
- [ ] Test on emulator/device

### Deployment (Optional)
- [ ] Deploy backend to cloud platform
- [ ] Deploy frontend to hosting service
- [ ] Configure environment variables