# PropertyVista

A full-stack real-estate management and listing application built with NestJS and Next.js.

## Technology Stack

### Backend

- NestJS (Node.js framework)
- TypeScript
- TypeORM for database management
- Passport.js for authentication
- WebSocket support for real-time features
- AWS S3 integration for file storage
- PostgreSQL database support

### Frontend

- Next.js 15
- TypeScript
- React 18
- TailwindCSS
- PrimeReact UI components
- Google Maps integration
- Real-time chat functionality
- Styled Components

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- PostgreSQL database
- Git

## Getting Started

1. Clone the repository:

```bash
git clone [repository-url]
cd PropertyVista
```

2. Backend Setup:

```bash
cd backend
npm install

# Create a .env file with the following variables:
# DATABASE_URL=your_database_connection_string
# JWT_SECRET=your_jwt_secret
# AWS_ACCESS_KEY=your_aws_access_key
# AWS_SECRET_KEY=your_aws_secret_key
# AWS_REGION=your_aws_region
# AWS_BUCKET_NAME=your_bucket_name
# GOOGLE_CLIENT_ID=your_google_client_id
# GOOGLE_CLIENT_SECRET=your_google_client_secret
```

3. Frontend Setup:

```bash
cd ../frontend
npm install

# Create a .env.local file with:
# NEXT_PUBLIC_API_URL=http://localhost:3000
# NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Running the Application

### Backend:

```bash
cd backend
npm run start:dev
```

The backend server will start on http://localhost:3000

### Frontend:

```bash
cd frontend
npm run dev
```

The frontend development server will start on http://localhost:5173

## Features

- User authentication (Local & Google OAuth)
- Property listings management
- Real-time chat system
- Property calculator
- Interactive map integration
- File upload capability
- User profile management
- Favorite listings
- Advanced property search

### Backend

- `npm run build` - Build the application
- `npm run start:dev` - Start in development mode
- `npm run start:prod` - Start in production mode
- `npm run test` - Run tests
- `npm run lint` - Lint the code

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Lint the code

## Project Structure

```
├── backend/           # NestJS backend
│   ├── src/
│   │   ├── auth/     # Authentication
│   │   ├── aws/      # AWS services
│   │   ├── chats/    # Real-time chat
│   │   ├── listings/ # Property listings
│   │   └── users/    # User management
│   └── test/         # E2E tests
├── frontend/         # Next.js frontend
│   ├── app/         # Pages and components
│   ├── public/      # Static assets
│   └── src/         # Source code
```
