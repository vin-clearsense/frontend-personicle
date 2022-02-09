# Personicle Frontend Application - Running the Application

In Linux terminal, 

(1) Make directoty called NextProjects
mkdir NextProjects
(2) Change directory to NextProjects
cd NextProjects
(3) Create Next.js application in NextProjects directory
npx create-next-app my-next-app
(4) Retrieve packages and information for installation, upgrade, and removal of packages (with dependencies) for JavaScript package manager (latest npm)
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install npm
(5) Install create-react-app
sudo npm -g install create-react-app
(6) Node.js - retrieve contents of url then install
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt-get install -y nodejs
(7) install JavsScript libraries (Next.js, React.js, and React-dom.js)
npm install
npm run dev
npm install next react react-dom
(8) Clone the repository
git clone https://github.com/vin-clearsense/frontend-personicle.git
(9) Change directory to frontend-personicle
cd frontend-personicle
(9) Open respository in VisualStudio
code .
(10) Run local host
localhost:3000

Important Note: The .env file is required for the application to run. Contact the administrator for the .env file. Here is a template of the .env file to give an idea of the variables within it. 
[Include template of the .env file]
