# Inkly

Inkly is a full-stack blog application built with **React** and **Appwrite**. It allows users to create, edit, view, and manage blog posts with authentication, image storage, rich-text editing, and protected routes.

The project was built to practice and demonstrate real-world React application architecture, state management, form handling, routing, and integration with a backend service.

## Features

- User registration and login
- Persistent authentication using Appwrite
- Protected routes for authenticated users
- Create, edit, view, and delete blog posts
- Rich-text content editing with TinyMCE
- Featured image upload and storage using Appwrite Storage
- Image replacement and removal handling
- Form validation using React Hook Form
- Global authentication state using Redux Toolkit
- Client-side routing with React Router
- Loading, error, and empty states
- Responsive UI built with Tailwind CSS
- Reusable components for forms, buttons, inputs, post cards, containers, and error messages

## Tech Stack

### Frontend

- React
- React Router
- Redux Toolkit
- React Hook Form
- Tailwind CSS
- TinyMCE
- Vite

### Backend / Services

- Appwrite Authentication
- Appwrite TablesDB
- Appwrite Storage

## Project Architecture

The application follows a component-based structure with separate service layers for communicating with Appwrite.

```text
src/
├── appwrite/
│   ├── auth.js
│   ├── database.js
│   └── storage.js
│
├── components/
│   ├── container/
│   ├── footer/
│   ├── header/
│   ├── post-form/
│   ├── AuthLayout.jsx
│   ├── Button.jsx
│   ├── ErrorMessage.jsx
│   ├── Input.jsx
│   ├── Login.jsx
│   ├── PostCard.jsx
│   ├── RTE.jsx
│   ├── Select.jsx
│   └── SignUp.jsx
│
├── features/
│   └── authSlice.js
│
├── pages/
│   ├── AddPost.jsx
│   ├── AllPosts.jsx
│   ├── EditPost.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Post.jsx
│   └── SignUp.jsx
│
├── store/
│   └── store.js
│
├── App.jsx
└── main.jsx
```

## Authentication Flow

Authentication is handled through **Appwrite Account**.

The application:

1. Allows users to create an account.
2. Logs users into Appwrite.
3. Retrieves the current authenticated user.
4. Stores authentication state and user data in Redux.
5. Protects authenticated routes using `AuthLayout`.
6. Allows users to log out and clears the Redux authentication state.

## Post Management

Each post contains information such as:

- Title
- Rich-text content
- Status
- Featured image
- Author/user ID

Posts are stored in **Appwrite TablesDB**, while featured images are stored separately in **Appwrite Storage**.

The application also handles image replacement carefully by uploading the new image and removing the previous stored image when appropriate.

## Environment Variables

Create a `.env` file in the project root and provide your Appwrite and TinyMCE configuration.

```env
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_TABLE_ID=
VITE_APPWRITE_BUCKET_ID=
VITE_TINYMCE_API_KEY=
```

> Never commit your `.env` file or expose private API keys and secrets in client-side code.

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Inkly
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add the required Appwrite and TinyMCE configuration.

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Future Improvements

Potential improvements for future versions include:

- Server-state caching and synchronization
- Pagination or infinite scrolling for posts
- Search and filtering
- Comments and likes
- Richer user profiles
- Image optimization
- Improved notification/toast system
- Automated testing
- Deployment and CI/CD pipeline

## License

This project is intended for learning, portfolio, and demonstration purposes.
