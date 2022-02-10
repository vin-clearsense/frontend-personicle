# Personicle Frontend Application - Running the Application

Installation instructions for Linux: 
https://ubuntu.com/download/desktop

In Linux terminal:

1. Retrieve packages and information for installation, upgrade, and removal of packages (with dependencies) for JavaScript package manager (latest npm)

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install npm
```

2. Install create-react-app

```sudo npm -g install create-react-app```

3. Node.js - retrieve contents of url then install
Note: Node.js Version 17 may give an error. Therefore, Node.js Version 16 is recommended. 

```
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt-get install -y nodejs
```

4. Install JavsScript libraries (Next.js, React.js, and React-dom.js). Ensure these are installed before running the application. 

```
npm install
npm run dev
npm install next react react-dom
```

5. Clone the repository

```git clone https://github.com/vin-clearsense/frontend-personicle.git```

6. Change directory to frontend-personicle

```cd frontend-personicle```

7. Open respository in VisualStudio
Note: Steps for VisualStudio are optional. You may use other IDEs. 
```code .```

8. Run local host in browser

```https://localhost:3000```

Important Note: The .env file is required for the application to run. Contact the administrator for the .env file. Here is a template of the .env file to give an idea of the variables within it. 

```
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_ID=
GOOGLE_SECRET=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_DOMAIN=
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_FROM=
NEXTAUTH_URL=
DATABASE_URL=
AUTH_SERVER=
AUTH_PORT=
FITBIT_AUTH_ENDPOINT=
DASHBOARD_HOME=
```
