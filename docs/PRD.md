Product Requirements Document
Product Name: Cleat Finder
Description: 
Cleat Finder is a web + mobile app that consolidates global historical soccer information of players, teams, and leagues in an intuitive format. The app emphasizes learning and tracking for fans, while connecting them to share and discuss content

Version: 1.0
Date: 2025-09-30

Scope:
Based on the Analyst's Level 1 Specification, Cleat-Finder v1 will include features in three epics:
	Connect: View User Profile -> Save Favorites, Share Profile
		 Join Discussion -> View Posts, Create Posts
	Track: Players, Teams, Leagues, Matches
	Explore: Search, Learn -> Take Quiz, Read "Article" of the Day

Out of scope:
Compare players side by side
Offline access
Friendly guide to rules, leagues, and tournaments
User feature suggestions
Multi-language support

Technical Architecture:

Frontend (Client):
React (PWA, mobile-first design)  
React Router for navigation  
Deployed via AWS Amplify

Backend (API Layer):
Express.js REST API (Node.js)  
  Serves as the single gateway for all data operations  
  Handles authentication (JWT verification), validation, and routing  
  Organizes CRUD endpoints by feature area (e.g., /players, /clubs, /favorites, /forum, /learn)  
  Middleware for logging, error handling, and request validation  
All CRUD operations go through the API — the frontend must not call Supabase directly.

Database & Authentication:
Supabase (Postgres-based) for:  
  Data persistence (normalized schema for players, clubs, careers, profiles, favorites, follows, threads, posts, quizzes, submissions, articles)  
  Authentication (email/password, role-based access)    
API connects to Supabase using the Supabase client or pg driver under the hood

Deployment Strategy:
Frontend: AWS Amplify (continuous deployment from GitHub)  
API Layer: Deployed as serverless functions:  
  AWS Lambda (preferred) — Express wrapped with serverless-http  
Database: Managed directly in Supabase cloud instance

Development Tools:
GitHub for version control and collaboration  
Windsurf IDE for coding environment  
Trello for task management  
Slack for team communication