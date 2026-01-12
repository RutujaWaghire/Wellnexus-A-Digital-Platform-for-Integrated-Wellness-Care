# Wellnexus - A Digital Platform for Integrated Wellness Care

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue.svg)](https://www.mysql.com/)

A comprehensive wellness platform connecting patients with healthcare practitioners, featuring therapy sessions, product marketplace, community forums, and personalized recommendations.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Team Collaboration](#team-collaboration)
- [Contributing](#contributing)

## ✨ Features

### For Patients
- 🔐 **Secure Authentication** - JWT-based authentication system
- 👨‍⚕️ **Find Practitioners** - Browse and connect with wellness practitioners
- 🧘 **Book Therapy Sessions** - Schedule wellness therapy sessions
- 🛒 **Wellness Marketplace** - Purchase wellness products
- 💬 **Community Forum** - Ask questions and get answers
- 📊 **Personal Dashboard** - Track your wellness journey
- 🔔 **Notifications** - Stay updated with your health activities

### For Practitioners
- 📝 **Profile Management** - Manage your professional profile
- 📅 **Session Management** - Manage therapy sessions and appointments
- 👥 **Patient Interactions** - Connect with and help patients
- 💼 **Business Dashboard** - Track your practice metrics

### For Admins
- 🛠️ **User Management** - Manage users and practitioners
- 📦 **Product Management** - Manage wellness products
- 📈 **Analytics** - View platform metrics
- 🔧 **System Configuration** - Configure platform settings

## 🚀 Tech Stack

### Backend
- **Java 17** with **Spring Boot 3.2.5**
- **Spring Security** with JWT authentication
- **Spring Data JPA** for data persistence
- **MySQL** database
- **Maven** for dependency management
- **Swagger/OpenAPI** for API documentation

### Frontend
- **React 18** with **TypeScript**
- **Vite** for fast development
- **React Router** for navigation
- **TanStack Query** for data fetching
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Radix UI** primitives

## 🏃 Quick Start

### Prerequisites
- Java 17 or higher
- Node.js 18+
- MySQL 8.0+
- Maven 3.6+

### 1. Clone the Repository
```bash
git clone https://github.com/RutujaWaghire/Wellnexus-A-Digital-Platform-for-Integrated-Wellness-Care.git
cd Wellnexus-A-Digital-Platform-for-Integrated-Wellness-Care
```

### 2. Setup Database
```sql
CREATE DATABASE wellness_db;
```

### 3. Configure Backend
Edit `wellness_backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/wellness_db
spring.datasource.username=root
spring.datasource.password=your_password
jwt.secret=your_secret_key_here
```

### 4. Start Backend
```bash
cd wellness_backend
./mvnw spring-boot:run
```
Backend will start on: http://localhost:8080

### 5. Start Frontend
```bash
cd wellness_project
npm install
npm run dev
```
Frontend will start on: http://localhost:5173

### 6. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **Swagger UI**: http://localhost:8080/swagger-ui.html

## 📁 Project Structure

```
Wellnexus-A-Digital-Platform-for-Integrated-Wellness-Care/
│
├── wellness_backend/              # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/wellness/backend/
│   │   │   │   ├── config/       # CORS, Swagger configuration
│   │   │   │   ├── controller/   # REST Controllers
│   │   │   │   ├── dto/          # Data Transfer Objects
│   │   │   │   ├── model/        # JPA Entities
│   │   │   │   ├── repository/   # Database Repositories
│   │   │   │   ├── security/     # Security & JWT Config
│   │   │   │   ├── service/      # Business Logic
│   │   │   │   └── integration/  # External API integrations
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
│
├── wellness_project/              # React Frontend
│   ├── src/
│   │   ├── components/           # React Components
│   │   ├── pages/               # Page Components
│   │   ├── hooks/               # Custom React Hooks
│   │   ├── lib/                 # Utilities & API Client
│   │   ├── integrations/        # Third-party integrations
│   │   └── assets/              # Images, fonts, etc.
│   ├── public/
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── vite.config.ts
│
├── INTEGRATION_GUIDE.md          # Detailed integration guide
└── README.md                     # This file
```

## 📖 Documentation

- **[Integration Guide](INTEGRATION_GUIDE.md)** - Comprehensive guide for frontend-backend integration
- **API Documentation** - Available at http://localhost:8080/swagger-ui.html when backend is running
- **Frontend Components** - Built with shadcn/ui, documented at https://ui.shadcn.com/

## 👥 Team Collaboration

### Development Workflow

1. **Pull latest changes**
   ```bash
   git pull origin main
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code patterns
   - Write clear commit messages
   - Test your changes locally

4. **Push your changes**
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Go to GitHub and create a PR
   - Request review from team members
   - Address feedback and merge

### Coding Standards

**Backend (Java)**
- Follow Spring Boot best practices
- Use meaningful variable and method names
- Add JavaDoc comments for public methods
- Use Lombok annotations to reduce boilerplate

**Frontend (TypeScript/React)**
- Use TypeScript for type safety
- Follow React hooks best practices
- Use functional components
- Keep components small and focused
- Use existing UI components from shadcn/ui

### Branch Naming Convention
- `feature/` - New features (e.g., `feature/booking-system`)
- `fix/` - Bug fixes (e.g., `fix/login-error`)
- `docs/` - Documentation updates (e.g., `docs/api-endpoints`)
- `refactor/` - Code refactoring (e.g., `refactor/user-service`)

## 🧪 Testing

### Backend Tests
```bash
cd wellness_backend
./mvnw test
```

### Frontend Tests (when implemented)
```bash
cd wellness_project
npm test
```

## 🔧 Available Scripts

### Backend
- `./mvnw clean install` - Build the project
- `./mvnw spring-boot:run` - Run the application
- `./mvnw test` - Run tests

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `GET /api/dashboard` - Get dashboard data

### Practitioners
- `GET /api/practitioners` - Get all practitioners
- `GET /api/practitioners/{id}` - Get practitioner details

### Therapies
- `GET /api/therapies` - Get all therapies
- `POST /api/sessions` - Book a therapy session

### Products
- `GET /api/products` - Get all products
- `POST /api/cart` - Add to cart
- `GET /api/cart` - Get cart items

See [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) for complete API documentation.

## 🔐 Security

- JWT-based authentication
- Passwords stored securely (should use BCrypt in production)
- CORS configured for development
- SQL injection protection via JPA
- Input validation on all endpoints

**⚠️ Note**: For production deployment, ensure to:
- Use strong JWT secrets
- Enable HTTPS
- Implement password hashing with BCrypt
- Configure proper CORS origins
- Set up rate limiting
- Enable SQL query logging in production

## 🚢 Deployment

### Backend Deployment

1. **Build the JAR file**
   ```bash
   cd wellness_backend
   ./mvnw clean package
   ```

2. **Run the JAR**
   ```bash
   java -jar target/wellness-backend-0.0.1-SNAPSHOT.jar
   ```

### Frontend Deployment

1. **Build the frontend**
   ```bash
   cd wellness_project
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service:
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - GitHub Pages

## 🤝 Contributing

We welcome contributions from all team members! Please follow these guidelines:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is developed as part of an academic project.

## 👨‍💻 Team

This project is being developed by a team of 8 members working collaboratively on frontend and backend integration.

## 🙏 Acknowledgments

- Spring Boot community
- React community
- shadcn/ui for the beautiful component library
- All open-source contributors

---

**For detailed integration instructions, please refer to [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)**

**Need help?** Create an issue or reach out to the team!
