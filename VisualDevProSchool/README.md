# Backend Setup (ASP.NET Core)

This project was created with .NET 10 SDK.

## Development server

Run `dotnet restore` to restore dependencies.

Run `dotnet run` for a dev server.

Navigate to `http://localhost:5045/` for the main page.

Navigate to `http://localhost:5045/swagger` to test the endpoints using swagger.

## Build

Run `dotnet build` to build the backend. 

## Publish

Run `dotnet publish -c Release` to prepare the backend for deployment. Output will be in `bin/Release/net10.0/publish`.

## Deployment to Azure Web App

Created an App Service in the Azure Portal with .NET(LTS) runtime stack and Linux Operating system:

[vdpSchool.azurewebsites.net/swagger/index.html](https://vdpschool.azurewebsites.net/swagger/index.html)

## CI/CD

GitHub Actions workflow will build prod and deploy to Azure Web Apps triggers whenever there is a push to main.
