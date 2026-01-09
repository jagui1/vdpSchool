# VisualDevProFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build --configuration production` to prepare for deployment. The build artifacts will be stored in the `dist/` directory.

## Deployment to Azure Static Web App

Run the following on the Azure CLI

```bash
az staticwebapp create \
--name jagui1-school-system \
--resource-group jagui1 \
--source https://github.com/jagui1/vdpSchool.git \
--branch main \
--app-location "/" \
--output-location "dist/visual-dev-pro-frontend" \
--location "CentralUS" \
--login-with-github
```

Azure automatically assigns a globally unique subdomain such as the one this site is hosted on: [hopeful-swan-123.azurestaticapps.net](https://lemon-smoke-04e0e8b10.1.azurestaticapps.net/)

Custom domains can be added later for a clean production URL.

## CI/CD

GitHub Actions workflow will build prod and deploy to Azure Static Web Apps triggers whenever there is a push to main.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
