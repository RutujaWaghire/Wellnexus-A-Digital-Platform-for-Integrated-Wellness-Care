# Troubleshooting Guide

This guide helps resolve common issues when integrating the frontend and backend.

## 🔧 Common Issues and Solutions

### Backend Issues

#### 1. Backend Won't Start

**Error: `java.sql.SQLException: Access denied for user`**

**Solution:**
- Check your MySQL credentials in `application.properties`
- Make sure MySQL server is running
- Verify the user has proper permissions:
  ```sql
  GRANT ALL PRIVILEGES ON wellness_db.* TO 'root'@'localhost';
  FLUSH PRIVILEGES;
  ```

**Error: `Error creating bean with name 'entityManagerFactory'`**

**Solution:**
- Make sure `wellness_db` database exists:
  ```sql
  CREATE DATABASE wellness_db;
  ```
- Check database URL in `application.properties`

**Error: `Port 8080 is already in use`**

**Solution:**
- Stop the process using port 8080:
  ```bash
  # Linux/Mac
  lsof -ti:8080 | xargs kill -9
  
  # Windows
  netstat -ano | findstr :8080
  taskkill /PID <PID> /F
  ```
- Or change the port in `application.properties`:
  ```properties
  server.port=8081
  ```
  (Don't forget to update `VITE_API_BASE_URL` in frontend)

#### 2. JWT Token Issues

**Error: `JWT signature does not match`**

**Solution:**
- Make sure `jwt.secret` is configured in `application.properties`
- The secret should be at least 256 bits (32 characters)
- Don't change the secret while tokens are in use

#### 3. CORS Errors

**Error: `CORS policy: No 'Access-Control-Allow-Origin' header`**

**Solution:**
- Check `CorsConfig.java` has the correct frontend URL
- Make sure frontend is running on the configured port (5173)
- If using a different port, add it to allowed origins in `CorsConfig.java`

### Frontend Issues

#### 1. Frontend Won't Start

**Error: `vite: command not found`**

**Solution:**
```bash
cd wellness_project
npm install
npm run dev
```

**Error: `Port 5173 is already in use`**

**Solution:**
- Kill the process using port 5173:
  ```bash
  # Linux/Mac
  lsof -ti:5173 | xargs kill -9
  
  # Windows
  netstat -ano | findstr :5173
  taskkill /PID <PID> /F
  ```
- Or change the port in `vite.config.ts`:
  ```typescript
  server: {
    port: 5174,
  }
  ```

#### 2. API Connection Issues

**Error: `Failed to fetch` or `Network Error`**

**Solution:**
- Verify backend is running on port 8080
- Check `VITE_API_BASE_URL` in `.env` file
- Test backend directly:
  ```bash
  curl http://localhost:8080/api/auth/login -X POST \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"password"}'
  ```

**Error: `Cannot read properties of undefined`**

**Solution:**
- Check browser console for the exact error
- Verify the API response structure matches what the frontend expects
- Use browser DevTools Network tab to inspect the API response

#### 3. Authentication Not Working

**Error: Login successful but redirects back to login**

**Solution:**
- Check browser localStorage - token should be stored as `wellnexus_auth_token`
- Open DevTools > Application > Local Storage
- Verify token is present and valid (decode at jwt.io)
- Check `useBackendAuth.tsx` is being used (not `useAuth.tsx`)

**Error: `401 Unauthorized` on protected routes**

**Solution:**
- Check if token is included in request headers:
  - Open DevTools > Network
  - Click on a failed request
  - Check Headers tab for `Authorization: Bearer <token>`
- Verify JWT is not expired
- Check backend logs for authentication errors

### Database Issues

#### 1. Tables Not Created

**Error: `Table 'wellness_db.users' doesn't exist`**

**Solution:**
- Check Hibernate configuration in `application.properties`:
  ```properties
  spring.jpa.hibernate.ddl-auto=update
  ```
- Restart backend to trigger table creation
- Check backend logs for Hibernate errors
- Manually create tables if needed (check entity classes for structure)

#### 2. Connection Pool Exhausted

**Error: `Cannot get JDBC Connection`**

**Solution:**
- Increase connection pool size in `application.properties`:
  ```properties
  spring.datasource.hikari.maximum-pool-size=10
  spring.datasource.hikari.minimum-idle=5
  ```
- Check for connection leaks in code
- Restart MySQL server

### Build Issues

#### 1. Maven Build Fails

**Error: `package javax.persistence does not exist`**

**Solution:**
- Check `pom.xml` has the correct dependencies
- Clean and rebuild:
  ```bash
  mvn clean install -U
  ```

**Error: `release version 21 not supported`**

**Solution:**
- Update Java version in `pom.xml` to match your installed version:
  ```xml
  <properties>
      <java.version>17</java.version>
  </properties>
  ```

#### 2. NPM Build Fails

**Error: `Cannot find module '@/...'`**

**Solution:**
- Check `tsconfig.json` path aliases are correct
- Reinstall dependencies:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

**Error: `Module not found: Can't resolve 'xxx'`**

**Solution:**
- Install missing package:
  ```bash
  npm install xxx
  ```

## 🔍 Debugging Tips

### Backend Debugging

1. **Enable Debug Logging**
   Add to `application.properties`:
   ```properties
   logging.level.com.wellness.backend=DEBUG
   logging.level.org.springframework.security=DEBUG
   ```

2. **Check Spring Boot Actuator**
   Add dependency to `pom.xml`:
   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-actuator</artifactId>
   </dependency>
   ```
   Access health endpoint: http://localhost:8080/actuator/health

3. **View SQL Queries**
   ```properties
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.format_sql=true
   ```

### Frontend Debugging

1. **Check Browser Console**
   - Press F12
   - Check Console tab for errors
   - Check Network tab for failed requests

2. **React DevTools**
   - Install React Developer Tools browser extension
   - Inspect component state and props

3. **Check API Calls**
   - Open DevTools > Network tab
   - Filter by XHR/Fetch
   - Click on requests to see details

## 📞 Getting Help

### Before Asking for Help

1. Check this troubleshooting guide
2. Check the [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)
3. Search GitHub issues for similar problems
4. Review backend and frontend logs

### What to Include When Asking for Help

1. **Describe the problem clearly**
   - What were you trying to do?
   - What happened instead?
   - Error messages (full stack trace)

2. **Environment information**
   - Operating System
   - Java version: `java -version`
   - Node version: `node -v`
   - MySQL version: `mysql --version`

3. **Steps to reproduce**
   - Exact steps to reproduce the issue
   - Include code snippets if relevant

4. **Logs**
   - Backend logs
   - Frontend console errors
   - Network tab screenshots

## 🛠️ Useful Commands

### Backend
```bash
# Check if backend is running
curl http://localhost:8080/actuator/health

# View logs
tail -f backend.log

# Check MySQL connection
mysql -u root -p -e "SHOW DATABASES;"

# Clean Maven cache
mvn dependency:purge-local-repository
```

### Frontend
```bash
# Check if frontend is running
curl http://localhost:5173

# View logs
tail -f frontend.log

# Clear npm cache
npm cache clean --force

# Rebuild from scratch
rm -rf node_modules package-lock.json
npm install
npm run build
```

### System
```bash
# Check ports in use
# Linux/Mac
lsof -i :8080
lsof -i :5173

# Windows
netstat -ano | findstr :8080
netstat -ano | findstr :5173

# Check MySQL status
# Linux
sudo systemctl status mysql

# Mac
brew services list | grep mysql

# Windows
sc query MySQL
```

## 🎯 Quick Fixes Checklist

- [ ] Backend is running on port 8080
- [ ] Frontend is running on port 5173
- [ ] MySQL is running and accessible
- [ ] Database `wellness_db` exists
- [ ] `application.properties` has correct database credentials
- [ ] `.env` has correct `VITE_API_BASE_URL`
- [ ] CORS is configured correctly
- [ ] JWT secret is set in `application.properties`
- [ ] All dependencies are installed (Maven & NPM)
- [ ] No conflicting processes on ports 8080 or 5173

## 🚨 Emergency Reset

If nothing works, try this complete reset:

### Backend
```bash
cd wellness_backend
mvn clean
rm -rf target/
# Fix application.properties
mvn clean install -DskipTests
mvn spring-boot:run
```

### Frontend
```bash
cd wellness_project
rm -rf node_modules dist package-lock.json
npm install
npm run dev
```

### Database
```sql
DROP DATABASE wellness_db;
CREATE DATABASE wellness_db;
-- Restart backend to recreate tables
```

---

**Still having issues?** Create a GitHub issue with detailed information and we'll help you out!
