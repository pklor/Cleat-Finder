# Cleat Finder API

Express.js REST API backend for the Cleat Finder application.

## Overview

The API serves as the single gateway for all data operations, handling CRUD operations for players, teams, posts, profiles, quizzes, and favorites. All frontend requests go through this API instead of accessing Supabase directly.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Environment**: Nodemon (development)

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Supabase account with credentials

### Installation

```bash
cd api
npm install
```

### Environment Setup

Create a `.env` file in the `/api` directory:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SECRET_KEY=your_supabase_secret_key
PORT=5000
```

### Running the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Players
- `GET /players` - Get all players
- `GET /players/:id` - Get player by ID
- `POST /players` - Create a new player
- `PUT /players/:id` - Update a player
- `DELETE /players/:id` - Delete a player

### Teams
- `GET /teams` - Get all teams
- `GET /teams/:id` - Get team by ID
- `POST /teams` - Create a new team
- `PUT /teams/:id` - Update a team
- `DELETE /teams/:id` - Delete a team

### Posts
- `GET /posts` - Get all posts
- `POST /posts` - Create a new post

### Profiles
- `GET /profiles` - Get all profiles
- `GET /profiles/:user_id` - Get profile by user ID
- `POST /profiles` - Create a new profile
- `PUT /profiles/:user_id` - Update a profile
- `DELETE /profiles/:user_id` - Delete a profile

### Quizzes
- `GET /quizzes` - Get all quizzes
- `POST /quizzes` - Create a new quiz

### Favorites
- `GET /favorites?user_id=<id>` - Get favorites for a user
- `POST /favorites` - Add a favorite
- `DELETE /favorites/:id` - Remove a favorite

## Project Structure

```
api/
├── routes/
│   ├── players.js
│   ├── teams.js
│   ├── posts.js
│   ├── profiles.js
│   ├── quizzes.js
│   └── favorites.js
├── utils/
│   └── supabaseClient.js
├── server.js
├── package.json
└── .env
```

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:5173`
- `http://localhost:5174`
- `http://127.0.0.1:5173`
- `http://127.0.0.1:5174`

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `204` - No Content (delete)
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Future Enhancements

- [ ] JWT authentication middleware
- [ ] Request validation middleware
- [ ] Logging middleware
- [ ] Rate limiting
- [ ] Database connection pooling
- [ ] Unit tests
- [ ] Integration tests

## Deployment

The API is designed to be deployed as serverless functions on AWS Lambda using `serverless-http` wrapper.

## Support

For issues or questions, refer to the main README.md in the project root.
