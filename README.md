# Web Project 2

A React-based web application with a JSON-Server backend to provide mock data. 

## Demo

You can find the deployed GitHub Pages site here:  
**[Web Project 2 Demo](https://sahmaragaev.github.io/web-project-2/)**

---

## Table of Contents

1. [Prerequisites](#prerequisites)  
2. [Installation and Setup](#installation-and-setup)  
3. [Running the React App](#running-the-react-app)  
4. [Running the JSON-Server](#running-the-json-server)  
5. [Using the Application](#using-the-application)  
6. [Project Structure](#project-structure)  
7. [License](#license)

---

## Prerequisites

- **Node.js** (v14 or above)
- **npm** (v6 or above)

You can verify if Node.js and npm are installed by running:
```bash
node -v
npm -v
```

---

## Installation and Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/sahmaragaev/web-project-2.git
   cd web-project-2
   ```

2. **Install dependencies**  
   ```bash
   # From within the project's root directory, install client dependencies
   npm install
   ```
   This command installs all required packages for the React application.

3. **Install JSON-Server dependencies**  
   If the JSON-Server setup is located in the same root folder or in a subfolder (e.g., `server`), change to that directory and install dependencies:
   ```bash
   cd server   # only if there's a dedicated 'server' folder
   npm install
   ```

---

## Running the React App

1. **Navigate to the React app folder** (if your `package.json` is in the root, you can skip this step):
   ```bash
   cd path/to/react-app
   ```
2. **Start the React development server**:
   ```bash
   npm start
   ```
3. **Open in your browser**  
   By default, React typically runs at `http://localhost:3000`.

---

## Running the JSON-Server

1. **Open a new terminal** (while the React app is running in a separate terminal).
2. **Navigate to the JSON-Server folder** (if applicable):
   ```bash
   cd server
   ```
3. **Start the JSON-Server**:
   ```bash
   npx json-server --watch db.json --port 3000
   ```
   - This command will start the JSON-Server on **http://localhost:3000** (you can choose a different port if needed).

---

## Using the Application

1. **Open the React app**: Once the React server is running, open [http://localhost:3000](http://localhost:3000) in your browser.
2. **Interact with the data**: The React app is set up to make API calls to the JSON-Server endpoint running at [http://localhost:3001](http://localhost:3001), assuming that’s where you started JSON-Server.
3. **Verify data is loading**: You should see content in the app populated from the mock database (if configured correctly).

---

## Project Structure

Below is a general outline of the project:

```
web-project-2/
├─ README.md
├─ package.json
├─ src/
│  ├─ components/
│  ├─ pages/
│  ├─ App.js
│  └─ index.js
├─ public/
│  ├─ index.html
│  └─ ...
└─ server/
   ├─ db.json
   ├─ package.json
   └─ ...
```

- **src/components/**: Holds reusable React components.  
- **src/pages/**: Contains different pages or views of the application.  
- **server/db.json**: Mock data for JSON-Server.  
- **server/package.json**: Dependencies and scripts for JSON-Server.

---

## License

This project is open-source and available under the [MIT License](LICENSE), or any other license you have specified.
