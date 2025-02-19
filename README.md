## TODO Application (MERN Stack)

This project is a simple TODO application built using the MERN stack, which includes MongoDB, Express.js, React.js, and Node.js. It allows users to manage their tasks efficiently by adding, updating, marking as completed, and deleting TODO items.

## Features
- Add, update, delete TODO items
- Mark tasks as completed
- Display all TODO items
- Filter TODO items (Show All, Show Completed, Show Pending)
- Search TODO items by title
- Backend API for creating, fetching, updating, and deleting TODOs

## Installation
1. Clone the repository

    git clone https://github.com/minaldeshmukh78/ReactNodeExpress.git

    cd ReactNodeExpress

2. Configure MongoDB

3. Backend Setup

    Install backend dependencies

        cd backend

        npm install

    Start the backend server

        node server.js

4. Frontend Setup

    Install frontend dependencies

        cd frontend

        npm install

    Start the frontend

        npm start


## API Documentation
1. POST /api/todos

    Create a new TODO item.

    Request body:

    {
    "title": "Task Title",
    "description": "Task Description"
    }

    Response:

    {
    "id": "12345",
    "title": "Task Title",
    "description": "Task Description",
    "isCompleted": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
    }

2. GET /api/todos

    Retrieve all TODO items.

    Response:
    [
    {
        "id": "12345",
        "title": "Task Title",
        "description": "Task Description",
        "isCompleted": false,
        "createdAt": "2024-01-01T00:00:00.000Z"
    }
    ]

3. PUT /api/todos/:id
    
    Update a TODO item (mark as completed, edit title/description).

    Request body:
    {
    "title": "Updated Title",
    "description": "Updated Description",
    "isCompleted": true
    }
    Response:
    {
    "id": "12345",
    "title": "Updated Title",
    "description": "Updated Description",
    "isCompleted": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
    }

4. DELETE /api/todos/:id

    Delete a TODO item.

    Response:
    {
    "message": "Todo deleted successfully."
    }
