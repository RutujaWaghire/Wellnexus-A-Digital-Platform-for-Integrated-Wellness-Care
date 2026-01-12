# Wellnexus - Frontend & Backend Integration Guide

This guide will help the team integrate the React frontend with the Spring Boot backend.

## 🏗️ Architecture Overview

- **Frontend**: React + Vite + TypeScript (Port: 5173)
- **Backend**: Spring Boot + MySQL (Port: 8080)
- **Authentication**: JWT-based authentication

## 📦 Project Structure

```
Wellnexus-A-Digital-Platform-for-Integrated-Wellness-Care/
├── wellness_backend/          # Spring Boot Backend
│   ├── src/main/java/com/wellness/backend/
│   │   ├── controller/       # REST API Controllers
│   │   ├── service/          # Business Logic
│   │   ├── model/            # Entity Models
│   │   ├── repository/       # Database Repositories
│   │   ├── security/         # JWT & Security Config
│   │   └── config/           # CORS & Application Config
│   └── src/main/resources/
│       └── application.properties
│
└── wellness_project/          # React Frontend
    ├── src/
    │   ├── components/       # React Components
    │   ├── pages/           # Page Components
    │   ├── hooks/           # Custom Hooks (useBackendAuth)
    │   ├── lib/             # API Client & Config
    │   └── integrations/    # Third-party integrations
    └── .env                 # Environment Variables
```

## 🚀 Getting Started

### Prerequisites

- **Java 21** or higher
- **Node.js 18+** and npm
- **MySQL 8.0+** database
- **Maven 3.6+**

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd wellness_backend
   ```

2. **Configure Database:**
   Edit `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/wellness_db
   spring.datasource.username=root
   spring.datasource.password=your_password
   
   # JWT Configuration
   jwt.secret=your_jwt_secret_key_here
   jwt.expiration=3600000
   ```

3. **Create MySQL Database:**
   ```sql
   CREATE DATABASE wellness_db;
   ```

4. **Build and Run Backend:**
   ```bash
   # Using Maven
   mvn clean install
   mvn spring-boot:run
   
   # Or using Maven Wrapper
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

5. **Verify Backend is Running:**
   - Backend will start on: `http://localhost:8080`
   - Swagger UI: `http://localhost:8080/swagger-ui.html`
   - API Base: `http://localhost:8080/api`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd wellness_project
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   The `.env` file is already configured with:
   ```env
   VITE_API_BASE_URL=http://localhost:8080
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```

5. **Verify Frontend is Running:**
   - Frontend will start on: `http://localhost:5173`
   - Open browser and navigate to `http://localhost:5173`

## 🔐 Authentication Flow

### Registration
1. User fills registration form (email, password, full name, role)
2. Frontend calls: `POST /api/auth/register`
3. Backend creates user and returns success message
4. Frontend automatically logs in the user

### Login
1. User enters email and password
2. Frontend calls: `POST /api/auth/login`
3. Backend validates credentials and returns JWT token
4. Frontend stores token in localStorage
5. Token is included in all subsequent API requests

### Logout
1. User clicks logout
2. Frontend removes token from localStorage
3. User is redirected to login page

## 🔌 API Integration

### API Client Usage

The frontend includes a centralized API client (`src/lib/api-client.ts`) with pre-configured services:

#### Auth API
```typescript
import { authApi } from '@/lib/api-client';

// Login
const token = await authApi.login(email, password);

// Register
await authApi.register(email, password, fullName, role);
```

#### User API
```typescript
import { userApi } from '@/lib/api-client';

// Get dashboard data
const dashboard = await userApi.getDashboard();

// Get user profile
const profile = await userApi.getProfile(userId);

// Update profile
await userApi.updateProfile(userId, data);
```

#### Practitioner API
```typescript
import { practitionerApi } from '@/lib/api-client';

// Get all practitioners
const practitioners = await practitionerApi.getAll();

// Get practitioner by ID
const practitioner = await practitionerApi.getById(id);
```

#### Therapy API
```typescript
import { therapyApi } from '@/lib/api-client';

// Get all therapies
const therapies = await therapyApi.getAll();

// Book a session
await therapyApi.bookSession(sessionData);
```

#### Product API
```typescript
import { productApi } from '@/lib/api-client';

// Get all products
const products = await productApi.getAll();

// Add to cart
await productApi.addToCart(productId, quantity);

// Get cart
const cart = await productApi.getCart();
```

### Making Custom API Calls

```typescript
import { apiClient } from '@/lib/api-client';

// GET request
const data = await apiClient.get('/api/endpoint');

// POST request
const result = await apiClient.post('/api/endpoint', { data });

// PUT request
await apiClient.put('/api/endpoint', { data });

// DELETE request
await apiClient.delete('/api/endpoint');
```

## 🔧 Available Backend Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `GET /api/dashboard` - Get user dashboard

### Practitioners
- `GET /api/practitioners` - Get all practitioners (public)
- `GET /api/practitioners/{id}` - Get practitioner by ID (public)

### Therapies
- `GET /api/therapies` - Get all therapies
- `GET /api/therapies/{id}` - Get therapy by ID
- `POST /api/therapies` - Create therapy

### Therapy Sessions
- `GET /api/sessions` - Get all sessions
- `POST /api/sessions` - Book a session
- `GET /api/sessions/available` - Get available sessions (public)

### Products
- `GET /api/products` - Get all products (public)
- `GET /api/products/{id}` - Get product by ID (public)
- `POST /api/products` - Create product (admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/{id}` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create order

### Questions & Answers (Forum)
- `GET /api/questions` - Get all questions
- `POST /api/questions` - Create question
- `GET /api/answers` - Get answers for a question
- `POST /api/answers` - Create answer

### Notifications
- `GET /api/notifications` - Get user notifications
- `PATCH /api/notifications/{id}/read` - Mark as read

## 🛠️ Development Workflow

### Running Both Services Simultaneously

**Terminal 1 - Backend:**
```bash
cd wellness_backend
./mvnw spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd wellness_project
npm run dev
```

### Testing the Integration

1. Start both backend and frontend servers
2. Navigate to `http://localhost:5173`
3. Try registering a new account
4. Login with the credentials
5. Test protected routes (Dashboard, Therapists, Bookings)

### Debugging Tips

**Backend Issues:**
- Check backend logs in the terminal
- Verify database connection in `application.properties`
- Check if MySQL is running: `mysql -u root -p`
- Verify JWT secret is configured

**Frontend Issues:**
- Check browser console for errors (F12)
- Verify API calls in Network tab
- Check if backend is responding: `curl http://localhost:8080/api/auth/login`
- Verify .env file has correct API_BASE_URL

**CORS Issues:**
- CORS is configured in `CorsConfig.java`
- Allowed origins: localhost:5173, localhost:3000
- If issues persist, check browser console for CORS errors

## 📝 Common Tasks

### Adding a New API Endpoint

1. **Backend:**
   - Create method in appropriate Controller
   - Add business logic in Service
   - Update SecurityConfig if endpoint needs authentication

2. **Frontend:**
   - Add endpoint to `API_ENDPOINTS` in `api-config.ts`
   - Create service function in `api-client.ts`
   - Use in React component

### Example: Adding a New Feature

Let's say you want to add a "Reviews" feature:

**Backend:**
```java
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    
    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody Review review) {
        // Logic here
        return ResponseEntity.ok(savedReview);
    }
}
```

**Frontend:**
```typescript
// In api-config.ts
export const API_ENDPOINTS = {
  // ... existing endpoints
  REVIEWS: `${API_BASE_URL}/api/reviews`,
};

// In api-client.ts
export const reviewApi = {
  create: async (data: any) => {
    return apiClient.post(API_ENDPOINTS.REVIEWS, data);
  },
};

// In component
import { reviewApi } from '@/lib/api-client';

const handleSubmit = async (reviewData) => {
  const result = await reviewApi.create(reviewData);
};
```

## 🔒 Security Considerations

1. **Never commit sensitive data** to git:
   - JWT secrets
   - Database passwords
   - API keys

2. **Token Management:**
   - JWT tokens are stored in localStorage
   - Tokens expire after 1 hour (configurable)
   - Always include token in authenticated requests

3. **CORS:**
   - Configured to allow localhost origins
   - Update `CorsConfig.java` for production URLs

## 🚢 Deployment

### Backend Deployment
```bash
cd wellness_backend
mvn clean package
java -jar target/wellness-backend-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
```bash
cd wellness_project
npm run build
# Deploy the 'dist' folder to your hosting service
```

**Important:** Update the following for production:
- `VITE_API_BASE_URL` in frontend `.env`
- CORS allowed origins in `CorsConfig.java`
- Database connection in `application.properties`

## 📞 Team Collaboration Tips

1. **Pull latest changes before starting work:**
   ```bash
   git pull origin main
   ```

2. **Communication:**
   - Discuss API changes before implementing
   - Document new endpoints in this guide
   - Share any environment setup issues

3. **Code Review:**
   - Review each other's PRs
   - Test the integration locally
   - Ensure backward compatibility

4. **Version Control:**
   - Use descriptive commit messages
   - Create feature branches
   - Don't commit `.env` or `application.properties` with secrets

## 🐛 Troubleshooting

### Backend won't start
- Check if MySQL is running
- Verify database credentials
- Check if port 8080 is available
- Review application.properties configuration

### Frontend can't connect to backend
- Verify backend is running on port 8080
- Check VITE_API_BASE_URL in .env
- Check browser console for CORS errors
- Test backend directly: `curl http://localhost:8080/api/auth/login`

### Authentication not working
- Check JWT secret is configured in backend
- Verify token is being stored in localStorage
- Check token format in Network tab
- Ensure AuthProvider is wrapping your app

### Database errors
- Verify database exists: `SHOW DATABASES;`
- Check table creation: `SHOW TABLES;`
- Verify Hibernate is creating tables (ddl-auto=update)

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [JWT.io](https://jwt.io/) - For debugging JWT tokens

## ✅ Checklist for Team Members

- [ ] Clone the repository
- [ ] Install Java 21, Node.js, MySQL
- [ ] Set up backend database
- [ ] Configure application.properties
- [ ] Start backend server
- [ ] Install frontend dependencies
- [ ] Start frontend dev server
- [ ] Test registration and login
- [ ] Verify API calls are working
- [ ] Read this integration guide thoroughly

---

**Happy Coding! 🎉**

For questions or issues, please reach out to the team or create an issue in the repository.
