# Student Management REST API

A complete REST API for managing student records using Node.js, Express.js, and MongoDB.

## Features

- ✅ Add new students
- ✅ View all students
- ✅ Get single student by ID
- ✅ Update student information
- ✅ Delete students
- ✅ Input validation
- ✅ Error handling
- ✅ MongoDB integration with Mongoose

## Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection configuration
├── controllers/
│   └── studentController.js  # Business logic for student operations
├── models/
│   └── Student.js         # Student schema/model
├── routes/
│   └── studentRoutes.js   # API route definitions
├── .env                   # Environment variables
├── package.json           # Project dependencies
├── server.js              # Main application file
└── README.md              # This file
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure MongoDB connection in `.env` file:

**Option 1: Local MongoDB**
```env
MONGO_URI=mongodb://localhost:27017/studentdb
PORT=3000
```

**Option 2: MongoDB Atlas**
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/studentdb?retryWrites=true&w=majority
PORT=3000
```

Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

## Running the Server

```bash
npm start
```

The server will start on port 3000 (or the port specified in `.env`).

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/students` | Add a new student |
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get a single student by ID |
| PUT | `/api/students/:id` | Update student information |
| DELETE | `/api/students/:id` | Delete a student |

## Request/Response Examples

### 1. Add a New Student

**Request:**
```http
POST /api/students
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 20,
  "course": "Computer Science",
  "semester": 3
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 20,
    "course": "Computer Science",
    "semester": 3,
    "createdAt": "2024-09-04T12:00:00.000Z",
    "updatedAt": "2024-09-04T12:00:00.000Z",
    "__v": 0
  }
}
```

### 2. Get All Students

**Request:**
```http
GET /api/students
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "age": 20,
      "course": "Computer Science",
      "semester": 3,
      "createdAt": "2024-09-04T12:00:00.000Z",
      "updatedAt": "2024-09-04T12:00:00.000Z"
    }
  ]
}
```

### 3. Get Single Student

**Request:**
```http
GET /api/students/64f1a2b3c4d5e6f7a8b9c0d1
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 20,
    "course": "Computer Science",
    "semester": 3,
    "createdAt": "2024-09-04T12:00:00.000Z",
    "updatedAt": "2024-09-04T12:00:00.000Z"
  }
}
```

### 4. Update Student

**Request:**
```http
PUT /api/students/64f1a2b3c4d5e6f7a8b9c0d1
Content-Type: application/json

{
  "name": "John Smith",
  "age": 21,
  "semester": 4
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John Smith",
    "email": "john.doe@example.com",
    "age": 21,
    "course": "Computer Science",
    "semester": 4,
    "createdAt": "2024-09-04T12:00:00.000Z",
    "updatedAt": "2024-09-04T12:01:00.000Z"
  }
}
```

### 5. Delete Student

**Request:**
```http
DELETE /api/students/64f1a2b3c4d5e6f7a8b9c0d1
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

## Student Schema

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | String | Yes | Trimmed |
| email | String | Yes | Unique, lowercase, trimmed |
| age | Number | Yes | Minimum 1 |
| course | String | Yes | Trimmed |
| semester | Number | Yes | Minimum 1 |

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Student with this email already exists"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Student not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Error message details"
}
```

## Testing with Postman

1. Import the endpoints into Postman
2. Set the base URL to `http://localhost:3000`
3. Test each endpoint with the examples above
4. Ensure MongoDB is running before testing

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running (for local connections)
- Check your MONGO_URI in `.env` file
- Verify network/firewall settings
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use
Change the PORT in `.env` file to a different port number.

## License

MIT