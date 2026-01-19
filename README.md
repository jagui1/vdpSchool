# vdpSchool School Management CRUD Application

A simple full-stack CRUD web application built to demonstrate object-oriented design principles, RESTful API development, environment-based configuration, frontend–backend integration using Angular and C# (.NET), and CI/CD using GitHub Actions.

This project models real-world school relationships using object-oriented principles, allowing users to manage entities such as students, teachers, and classes through a web interface hosted on modern cloud-hosted architecture. 

**NOTE: Since I have the free tier of Azure the backend will sleep when not being used so you must open that link first to get the data for the frontend**

## Tech stack

- Frontend: Angular 16 SPA
  - MatTable for listing schools, students, teachers, and courses
  - Reactive Forms for create/update/delete operations
  - Dialog-based UI for editing and deleting entities
  - HTTPClient services for API communication
  - Environment-based API url configuration for local vs cloud environments
  - Deployed with Azure Static Web Apps: [link to lemon smoke](https://lemon-smoke-04e0e8b10.1.azurestaticapps.net/)
  - Future improvement would be to add a custom domain to overwrite the random generated name Azure provides

- Backend: ASP.NET Core Web API
  - Minimal API with RESTful endpoints for School CRUD operations
  - Utilizes swagger for testing endpoints
  - CORS configuration to allow Angular frontend access
  - Data seeding Entity Framework Core with relationships
    - School → Students, Teachers, Courses
    - Teacher ↔ Courses (teaches)
    - Student ↔ Courses (enrolled)
  - Deployed with Azure App Service: [link to vdpschool](https://vdpschool.azurewebsites.net/swagger/index.html)

- Data: Entity Framework Core with the In-Memory database provider
  - Chosen for faster development iteration and keeping infrastructure simple while validating application logic
  - Currently data exists while the application is running and will reset on restart or redeploy
  - TODO: Migrate to PostgreSQL to create permanent data persistence and support scalability

- CI/CD: GitHub Actions (both frontend and backend builds triggered by any push to main)

## Purpose

The goal of this project is to demonstrate:
- Clean separation of concerns
- Basic CRUD operations
- Practical application of OOP concepts
- Full-stack communication via HTTP APIs
