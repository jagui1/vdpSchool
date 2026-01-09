# vdpSchool School Management CRUD Application

A simple full-stack CRUD web application built to demonstrate object-oriented design principles, RESTful API development, environment-based configuration, frontend–backend integration using Angular and C# (.NET), and CI/CD using GitHub Actions.

This project models a basic school domain, allowing users to manage entities such as students, teachers, and classes through a web interface hosted on modern cloud-hosted architecture.

The application consists of:

- Frontend: Angular SPA
  - Deployed with Azure Static Web Apps
  - https://lemon-smoke-04e0e8b10.1.azurestaticapps.net/

- Backend: ASP.NET Core Web API
  - Deployed with Azure App Service
  - Utilizes swagger for testing endpoints
  - https://vdpschool.azurewebsites.net/swagger/index.html

- Data: Entity Framework Core with the In-Memory database provider
  - Chosen for faster development iteration and keeping infrastructure simple while validating application logic
  - Currently data exists while the application is running and will reset on restart or redeploy
  - TODO: Migrate to PostgreSQL to create permanent data persistence and support scalability

- CI/CD: GitHub Actions (both frontend and backend builds triggered by any push to main)

The goal of this project is to demonstrate:

- Clean separation of concerns
- Basic CRUD operations
- Practical application of OOP concepts
- Full-stack communication via HTTP APIs
