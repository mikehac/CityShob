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

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm (v7 or later)
- MongoDB instance (local or cloud-based)

### Environment Setup

#### Backend

Create a `.env` file in the `backend` directory with the following variables:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/tasks
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:4200
```

### Installation and Running

#### Backend

```powershell
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Run in development mode
npm run dev

# Or build and run in production mode
npm run build
npm start
```

The backend server will be running at http://localhost:3000

#### Frontend

```powershell
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run in development mode
npm start
```

The frontend application will be accessible at http://localhost:4200

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

## Development

### Backend

```powershell
npm run dev
```

### Frontend

```powershell
npm run watch
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

## Debugging

### Backend

```powershell
npm run start:debug
```

## License

ISC
