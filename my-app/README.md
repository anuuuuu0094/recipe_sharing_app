<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->










# RecipeSharingPlatform_Food

## Introduction
RecipeSharingPlatform_Food is a community-driven web platform designed for home chefs and food enthusiasts to share, discover, and manage recipes. This platform helps users organize culinary creations, explore unique cooking ideas, and collaborate with others. It addresses common issues faced by food lovers: recipe management, meal planning, ingredient substitutions, and more — all in one place.

## Project Type
**Fullstack**  
Frontend | Backend | Database

## Deployed App
- **Frontend**: https://recipe-sharing-frontend.vercel.app  
- **Backend**: https://recipe-sharing-backend.vercel.app/api  
- **Database**: https://cloud.mongodb.com  

## Directory Structure
```
RecipeSharingPlatform_Food/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── app.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
└── README.md
```

## Video Walkthrough of the Project
- [Project Features Walkthrough (2-3 min)](https://drive.google.com/xyz)

## Video Walkthrough of the Codebase
- [Codebase Overview (3-5 min)](https://drive.google.com/xyz)

## Features
- ✅ User Authentication (Register / Login / Secure Sessions)
- ✅ Recipe Creation, Editing, Deletion with Rich Text & Images
- ✅ Video Support for Cooking Steps
- ✅ Recipe Tagging (e.g., Vegan, Dessert, Quick Meal)
- ✅ Comments, Reviews, & Recipe Ratings
- ✅ Favorites & Bookmarking
- ✅ Weekly Meal Planner
- ✅ Ingredient Substitution Suggestions
- ✅ Unique Recipe Duplication Prevention
- ✅ Analytics Dashboard (Views, Likes, Comments)
- ✅ Collaborative Recipe Editing
- ✅ Dark Mode & Responsive Design
- ✅ PDF Export of Recipes
- ✅ Social Sharing Integration

## Design Decisions / Assumptions
- Built as a **community-first platform** for collaboration, not just recipe storage.
- Recipes must contain sufficient metadata (category, ingredients, cooking time, difficulty).
- AI features require user opt-in for personalized suggestions.
- Assumed MongoDB as primary storage for flexibility.
- Authentication handled via JWT tokens for scalability.

## Installation & Getting Started

### Clone the repo:
```bash
git clone https://github.com/your-username/RecipeSharingPlatform_Food.git
cd RecipeSharingPlatform_Food
```

### Backend Setup:
```bash
cd backend
npm install
npm start
```

### Frontend Setup:
```bash
cd frontend
npm install
npm start
```

### Database:
MongoDB Atlas connection string needed in `.env`

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key
```

## Usage
After running both **backend** and **frontend**:

- Go to `http://localhost:3000`
- Register/Login
- Start creating and sharing your recipes!

### Example:
```bash
# Frontend running on:
http://localhost:3000
# Backend running on:
http://localhost:5000/api
```

### Screenshots:
![Home Page](./screenshots/home.png)  
![Recipe Detail](./screenshots/recipe-detail.png)

## Credentials
Test User Credentials:
```
Email: testuser@foodie.com
Password: Test@123
```

## APIs Used
- OpenAI for ingredient suggestions (planned)
- Spoonacular API for nutrition analysis (planned)

## API Endpoints
### Authentication
| Method | Endpoint        | Description         |
|--------|-----------------|---------------------|
| POST   | /api/auth/register | Register a user    |
| POST   | /api/auth/login    | Login a user       |

### Recipes
| Method | Endpoint        | Description         |
|--------|-----------------|---------------------|
| GET    | /api/recipes     | Fetch all recipes   |
| POST   | /api/recipes     | Create new recipe   |
| PUT    | /api/recipes/:id | Edit recipe         |
| DELETE | /api/recipes/:id | Delete recipe       |

### Interactions
| Method | Endpoint                   | Description               |
|--------|-----------------------------|-----------------------------|
| POST   | /api/recipes/:id/comments    | Add comment to a recipe     |
| POST   | /api/recipes/:id/ratings     | Rate a recipe               |
| POST   | /api/bookmarks               | Bookmark a recipe           |

## Technology Stack
### Frontend
- React.js
- React Router
- Context API / useReducer
- Styled Components / CSS Modules (No external libraries)

### Backend
- Node.js
- Express.js
- MongoDB Atlas (NoSQL)
- Mongoose ODM
- JWT Authentication
- Multer (for file uploads)

### Other Libraries / Tools
- Bcrypt.js (password hashing)
- Cloudinary (image storage)
- OpenAI API (planned)
- Spoonacular API (planned)
