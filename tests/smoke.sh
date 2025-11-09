#!/bin/bash

# Cleat Finder - Smoke Tests
# Quick validation that all API endpoints are responding

API_URL="http://localhost:5000"
PASSED=0
FAILED=0

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🧪 Running Cleat Finder API Smoke Tests${NC}\n"

# Test function
test_endpoint() {
  local method=$1
  local endpoint=$2
  local description=$3
  
  echo -n "Testing $description... "
  
  if [ "$method" = "GET" ]; then
    response=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL$endpoint")
  else
    response=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" "$API_URL$endpoint" \
      -H "Content-Type: application/json")
  fi
  
  if [ "$response" = "200" ] || [ "$response" = "201" ] || [ "$response" = "400" ]; then
    echo -e "${GREEN}✓ PASS${NC} (HTTP $response)"
    ((PASSED++))
  else
    echo -e "${RED}✗ FAIL${NC} (HTTP $response)"
    ((FAILED++))
  fi
}

# Health check
echo -e "${YELLOW}Health Checks:${NC}"
test_endpoint "GET" "/" "API Health"

# Players endpoints
echo -e "\n${YELLOW}Players Endpoints:${NC}"
test_endpoint "GET" "/players" "Get all players"
test_endpoint "POST" "/players" "Create player"

# Teams endpoints
echo -e "\n${YELLOW}Teams Endpoints:${NC}"
test_endpoint "GET" "/teams" "Get all teams"
test_endpoint "POST" "/teams" "Create team"

# Posts endpoints
echo -e "\n${YELLOW}Posts Endpoints:${NC}"
test_endpoint "GET" "/posts" "Get all posts"
test_endpoint "POST" "/posts" "Create post"

# Profiles endpoints
echo -e "\n${YELLOW}Profiles Endpoints:${NC}"
test_endpoint "GET" "/profiles" "Get all profiles"
test_endpoint "POST" "/profiles" "Create profile"

# Quizzes endpoints
echo -e "\n${YELLOW}Quizzes Endpoints:${NC}"
test_endpoint "GET" "/quizzes" "Get all quizzes"
test_endpoint "POST" "/quizzes" "Create quiz"

# Favorites endpoints
echo -e "\n${YELLOW}Favorites Endpoints:${NC}"
test_endpoint "GET" "/favorites" "Get favorites"
test_endpoint "POST" "/favorites" "Add favorite"

# Summary
echo -e "\n${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "Tests Passed: ${GREEN}$PASSED${NC}"
echo -e "Tests Failed: ${RED}$FAILED${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ All smoke tests passed!${NC}\n"
  exit 0
else
  echo -e "${RED}✗ Some tests failed. Check your API server.${NC}\n"
  exit 1
fi
