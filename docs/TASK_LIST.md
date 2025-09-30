Task List

Epic: Explore
Task 1 – Player Career History

User Story: As a fan, I want to view a player’s full career history so that I can understand their journey across clubs and leagues.

Acceptance Criteria:

API endpoint /players/:id returns structured career history.

UI displays chronological list of clubs, seasons, and stats.

Must load within 2s from the client.

Task 2 – Club History & Notable Players

User Story: As a fan, I want to explore a club’s history and notable players so that I can learn more about my favorite teams.

Acceptance Criteria:

API endpoint /clubs/:id returns club details + player links.

UI shows club profile with timeline and notable players.

Users can navigate from club page to player profiles.

Task 3 – Player Search

User Story: As a fan, I want to search for players by name so that I can quickly find the person I’m interested in.

Acceptance Criteria:

API endpoint /players?query=... returns results by name.

Search bar supports partial matches and autocomplete.

Selecting a result navigates to that player’s profile page.

Task 4 – Related Player Recommendations

User Story: As a fan, I want recommendations for related players so that I can expand my knowledge beyond who I already follow.

Acceptance Criteria:

API endpoint /players/:id/recommended returns related players.

UI displays a “You may also like” section on profile pages.

Must show at least 3 related players with links.

Task 5 – Quizzes

User Story: As a new fan, I want to take short quizzes about players and clubs so that I can test and improve my knowledge.

Acceptance Criteria:

API endpoint /learn/quizzes returns quiz metadata + questions.

User can answer and submit answers.

Score displayed immediately, stored in DB.

Task 6 – Article of the Day

User Story: As a new fan, I want to read “article of the day” content so that I can learn something new in small bites.

Acceptance Criteria:

API endpoint /learn/article returns current day’s article.

UI shows title, author, and body content.

Article updates daily (managed by DB flag or schedule).

Epic: Connect
Task 7 – User Profile Creation

User Story: As a registered user, I want to create a personal profile so that I can save my preferences and favorites.

Acceptance Criteria:

Authenticated users can create/update profiles.

Supabase enforces row-level security (users can only update their own profile).

Profile page shows avatar, username, and favorites.

Task 8 – Save Favorites

User Story: As a registered user, I want to create a personal profile so that I can save my preferences and favorites.

Acceptance Criteria:

API endpoints /favorites (POST, DELETE) manage favorites.

UI “star” or “heart” toggle saves/removes favorite players/clubs.

Favorites list loads correctly on profile page.

Task 9 – Share Player/Club Pages

User Story: As a registered user, I want to share player or club pages with friends so that I can discuss soccer outside the app.

Acceptance Criteria:

“Share” button generates a unique deep link URL.

Link opens directly to the correct player/club page.

Works across devices/browsers.

Task 10 – Discussion Forum

User Story: As a fan, I want to participate in a discussion forum so that I can share opinions and insights with others.

Acceptance Criteria:

API endpoints /forum/threads and /forum/posts.

Users can create threads, reply to posts.

Forum UI shows thread list and nested posts.

Supabase RLS ensures users can only edit/delete their own posts.

Epic: Track
Task 11 – Track Updates (Follow Players)

User Story: As a registered user, I want to track updates on my favorite players so that I don’t miss important news.

Acceptance Criteria:

API endpoint /updates returns updates for followed players.

Users can “follow” a player → adds entry in follows table.

Updates feed displays transfers, milestones, or news.

Notifications optional for v1, but feed must refresh.