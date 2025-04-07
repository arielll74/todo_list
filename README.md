"# To-Do List Application" 
# To-Do List Application

This is a full-stack To-Do List application built with a Django REST API backend and a React frontend. It allows users to manage their tasks efficiently by adding, editing, deleting, and filtering them based on their completion status. The application also features a dark mode for improved user experience.

## Running Locally (for Development)

To run the backend and frontend on your local machine, follow these steps:

### Django REST API Backend

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Create and activate a virtual environment (if you haven't already):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On macOS/Linux
    venv\Scripts\activate  # On Windows
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Apply database migrations:**
    ```bash
    python manage.py migrate
    ```
5.  **Run the development server:**
    ```bash
    python manage.py runserver
    ```
    The backend API will be accessible at `http://localhost:8000`.

### React Front-End Application

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install  # Or yarn install
    ```
3.  **Start the development server:**
    ```bash
    npm start  # Or yarn start
    ```
    The frontend application will usually be accessible at `http://localhost:3000`. Make sure the `API_URL` in `frontend/src/App.jsx` is set to your local backend URL (`http://localhost:8000/api/todos/`) during development.

## Django REST API Endpoints

**Base URL (Development):** `http://localhost:8000/api/todos/`
**Base URL (Deployed - Replace with your Render URL):** `YOUR_RENDER_BACKEND_URL/api/todos/`

| Endpoint          | HTTP Method | Description                                      | Request Body (Example)         | Response Body (Example)                                                                                                                               |
| ----------------- | ----------- | ------------------------------------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/todos/`     | GET         | Get a list of all to-do items.                   | None                          | `[{"id": 1, "title": "Buy groceries", "completed": false}, {"id": 2, "title": "Walk the dog", "completed": true}, ...]`                             |
| `/api/todos/`     | POST        | Create a new to-do item.                         | `{"title": "New task"}`        | `{"id": 3, "title": "New task", "completed": false}`                                                                                                  |
| `/api/todos/<id>/` | GET         | Get a specific to-do item by its ID.            | None                          | `{"id": 1, "title": "Buy groceries", "completed": false}`                                                                                              |
| `/api/todos/<id>/` | PUT         | Update an existing to-do item by its ID.        | `{"title": "Updated task", "completed": true}` | `{"id": 1, "title": "Updated task", "completed": true}`                                                                                              |
| `/api/todos/<id>/` | DELETE      | Delete a specific to-do item by its ID.         | None                          | (No content on successful deletion - HTTP 204)                                                                                                       |

## Technologies Used

* **Backend:**
    * Django (5.2)
    * Django REST Framework (3.16.0)
    * django-cors-headers
    * gunicorn (for deployment)
    * whitenoise (for static file serving in production)
    * (Potentially) psycopg2 (for PostgreSQL if used in deployment)
* **Frontend:**
    * React
    * `axios` (for making API requests)
    * CSS

## Challenges Faced and Solutions

*(Briefly describe any significant challenges you encountered during development and how you overcame them. For example:)*

* **Challenge:** Implementing the update functionality to correctly handle the `completed` status.
* **Solution:** Ensured that the PUT request to the backend included both the `title` and the `completed` status from the frontend state.

* **Challenge:** Setting up CORS to allow communication between the frontend running on `localhost:3000` and the backend on `localhost:8000`.
* **Solution:** Configured `django-cors-headers` in the Django settings to allow requests from the frontend's origin.

## Live Deployment Links (Once Deployed)

* **Backend (Render):** `YOUR_RENDER_BACKEND_LIVE_URL`
* **Frontend (GitHub Pages/Netlify/Vercel):** `YOUR_FRONTEND_LIVE_URL`