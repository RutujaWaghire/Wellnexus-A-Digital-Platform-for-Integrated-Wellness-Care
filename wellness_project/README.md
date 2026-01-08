🧘 Wellness Marketplace for Alternative Therapies


📌 Project Overview

The Wellness Marketplace for Alternative Therapies is a full-stack web application designed to connect users with verified alternative healthcare practitioners such as physiotherapists, acupuncturists, Ayurvedic doctors, and chiropractors.
The platform enables therapy session booking, wellness product purchases, community interaction, and AI-powered therapy recommendations, all within a secure and scalable system.

This project focuses on delivering a holistic digital wellness experience by integrating modern web technologies, secure authentication, and health data APIs.


🎯 Objectives

Provide a centralized platform for alternative therapy services

Enable users to book therapy sessions and purchase wellness products

Ensure practitioner authenticity through verification and reviews

Offer AI-based therapy recommendations using trusted health data

Support secure payments, notifications, and scheduling


🚀 Key Features

👨‍⚕️ Verified Practitioner Profiles with ratings and specializations

📅 Therapy Session Booking & Scheduling

🛒 Wellness Product Marketplace

💬 Community Q&A and Review System

🤖 AI-Powered Therapy Recommendation Engine

🔐 JWT-Based Authentication (Access & Refresh Tokens)

💳 Secure Payment Integration

🔔 Email & In-App Notifications

🌍 Health Data Integration (OpenFDA, WHO, Fitness APIs)


🧩 System Modules

Module A: Practitioner onboarding and verification

Module B: Therapy session booking and scheduling

Module C: Product marketplace and cart management

Module D: Community reviews and Q&A forum

Module E: AI recommendation engine and health data integration

Module F: Notifications and secure payment handling


🛠️ Tech Stack
Frontend
  React.js
  Tailwind CSS
  Vite

Backend
  Spring Boot (Java)

RESTful APIs
  WebSockets (STOMP) for real-time messaging

Database
  MySQL

Security & Auth
  JWT Authentication (Access + Refresh Tokens)

Integrations
  Google Maps API & Geolocation API
  OpenFDA API

WHO datasets
  Fitness & Health APIs
  

🏗️ Architecture

The system follows a client–server architecture:

React frontend communicates with Spring Boot REST APIs
Backend handles authentication, business logic, and AI processing
MySQL stores user, booking, product, and community data
External APIs provide health insights and recommendations



🗂️ Database Design 

Key entities include:

User
PractitionerProfile
TherapySession
Product
Order
Review
Question & Answer
Recommendation
Notification

The database is normalized to ensure data consistency and scalability.


📆 Project Milestones

Week 1–2: User & Practitioner Profiles with JWT authentication

Week 3–4: Therapy booking and scheduling system

Week 5–6: Product marketplace and community forum

Week 7–8: AI engine, health API integration, notifications

▶️ How to Run the Project:

Prerequisites

Node.js
Java (JDK 17 or above recommended)
MySQL
Maven

Steps

Clone the repository
git clone https://github.com/InulMarliya/wellness_project.git
Configure environment variables in .env
Start the backend (Spring Boot)
Start the frontend

npm install
npm run dev

Access the application via browser

📚  Context

This project is developed as part of an academic project to demonstrate:

Full-stack application development
Secure authentication mechanisms
API integration
Database design
Real-world healthcare platform modeling


🔮 Future Enhancements

Mobile application support
Advanced AI personalization
Teleconsultation with video calls
Multi-language support
Blockchain-based health record storage


👩‍💻 Author
Inul Marliya

