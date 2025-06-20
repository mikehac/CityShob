# CityShob - Task Management Application

A full-stack task management application built with MEAN stack (MongoDB, Express, Angular, Node.js) with real-time updates using Socket.IO.

## Technology Stack

### Backend

- **Node.js**: JavaScript runtime environment
- **Express**: Web application framework for Node.js
- **TypeScript**: Typed superset of JavaScript
- **MongoDB**: NoSQL database for storing task and user information
- **Mongoose**: MongoDB object modeling for Node.js
- **Socket.IO**: Real-time bidirectional event-based communication
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **dotenv**: Environment variable management
- **cors**: Cross-Origin Resource Sharing
- **cookie-parser**: Middleware for parsing cookies

### Frontend

- **Angular 19**: Frontend framework
- **Angular Material**: UI component library
- **RxJS**: Reactive programming library
- **Socket.IO-client**: Client library for Socket.IO
- **ngx-cookie-service**: Service for handling cookies

## Project Structure

```
.
├── backend/                 # Node.js Express backend
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── customFilter/    # Error handling
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── index.ts         # Entry point
│   │   └── socket.io.ts     # Socket.IO configuration
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                # Angular frontend
    ├── src/
    │   ├── app/
    │   │   ├── components/  # Angular components
    │   │   ├── models/      # TypeScript interfaces
    │   │   ├── services/    # Angular services
    │   │   └── ...          # Other Angular files
    │   ├── environments/    # Environment configuration
    │   └── ...              # Other Angular files
    ├── angular.json
    └── package.json
```

## Features

- User authentication (register, login, logout)
- Create, read, update, delete tasks
- Real-time updates when tasks are modified
- Responsive design with Angular Material

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Tasks

- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Socket.IO Events

- `task-created` - Emitted when a new task is created
- `task-updated` - Emitted when a task is updated
- `task-deleted` - Emitted when a task is deleted

## Setting Up and Running Locally

Follow these comprehensive steps to set up and run the application on your local machine:

### 1. Clone the Repository

```powershell
git clone <repository-url>
cd CityShob
```

### 2. MongoDB Setup

Ensure MongoDB is installed and running locally, or use MongoDB Atlas for cloud-based database:

- For local MongoDB, start the MongoDB service
- For MongoDB Atlas, create a new cluster and connection string

### 3. Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Create .env file
New-Item .env -ItemType File

# Add environment variables to .env
@"
PORT=3000
MONGO_URI=mongodb://localhost:27017/tasks
JWT_SECRET=your_secure_secret_key
CLIENT_URL=http://localhost:4200
"@ | Out-File .env -Encoding utf8

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Frontend Setup

```powershell
# Open a new terminal window
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server using one of these commands:
npm start   # uses the script defined in package.json
# OR
ng serve    # uses Angular CLI directly
```

### 5. Access the Application

- Backend API: http://localhost:3000
- Frontend application: http://localhost:4200

### 6. First-time Setup

1. Register a new user account
2. Log in with your credentials
3. Start creating and managing tasks

## Design Decisions and Patterns

The application follows several architectural and design patterns to ensure maintainability, scalability, and code quality:

### Architecture

- **MEAN Stack**: Combines MongoDB, Express, Angular, and Node.js for a JavaScript-based full-stack solution.
- **RESTful API**: Backend resources are exposed through a RESTful API interface with proper HTTP methods.
- **Real-time Communication**: Socket.IO implementation enables real-time task updates across clients.

### Design Patterns

- **MVC Pattern**: The backend follows the Model-View-Controller pattern:

  - Models (Mongoose schemas) for data structure
  - Controllers for request handling
  - Services for business logic

- **Repository Pattern**: Data access is abstracted through service classes.
- **Dependency Injection**: Angular services use DI for loose coupling between components.
- **Observer Pattern**: RxJS observables are used for reactive state management in the frontend.
- **Guard Pattern**: Route guards provide authentication protection for routes.

### Security Considerations

- **JWT Authentication**: Secure authentication using JSON Web Tokens.
- **Password Hashing**: Bcrypt is used for secure password storage.
- **CORS Configuration**: Properly configured Cross-Origin Resource Sharing.
- **HTTP-only Cookies**: For secure token storage and transmission.

### Code Organization

- **Feature Modules**: Frontend code is organized by feature for better maintainability.
- **Single Responsibility**: Components and services follow the single responsibility principle.
- **Separation of Concerns**: Clear separation between UI, business logic, and data access.

These design decisions ensure that the application is robust, maintainable, and follows modern web development practices.

## Development Commands

### Backend

```powershell
# Run development server with auto-reload
npm run dev

# Debug mode
npm run start:debug
```

### Frontend

```powershell
# Available commands for development:
npm start    # Standard development server (alias for ng serve)
npm run watch # Build with watch mode for file changes
ng serve     # Direct Angular CLI command
ng serve --open # Opens browser automatically
```

## Building for Production

### Backend

```powershell
npm run build
```

### Frontend

```powershell
npm run build
```

The built files will be located in the `frontend/dist/frontend` directory.

## License

ISC
