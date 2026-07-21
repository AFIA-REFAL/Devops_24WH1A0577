# RegistrationProject

A simple full-stack registration form built with a responsive HTML/CSS/JavaScript frontend and a Node.js + Express backend.

## Features

- Responsive registration form
- Fields for Full Name, Email, Phone Number, Password, and Confirm Password
- Modern UI with CSS
- JavaScript form validation
- Express backend with a `POST /register` API
- CORS enabled
- JSON request handling with `express.json()`
- No database required

## Folder Structure

```text
RegistrationProject/
│── frontend/
│   │── index.html
│   │── style.css
│   │── script.js
│
│── backend/
│   │── server.js
│   │── package.json
│
│── README.md
```

## Installation Steps

1. Open a terminal in the `RegistrationProject` folder.
2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Open the frontend files in a browser, or use a local server extension such as Live Server.

## Run Commands

### Start the backend

```bash
cd backend
npm start
```

### Open the frontend

Open `frontend/index.html` in your browser.

## API

### `POST /register`

Request body:

```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phoneNumber": "1234567890",
  "password": "secret123"
}
```

Response:

```json
{
  "message": "Registration Successful"
}
```
