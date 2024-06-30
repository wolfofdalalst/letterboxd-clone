# Letterboxd Clone

This project is a clone of Letterboxd, featuring an Express.js backend and a React+Vite frontend. It utilizes [The Movie Database (TMDB)](https://www.themoviedb.org/) API for movie data.

## Features

- User authentication and profile management
- Browse and search movies
- Rate and review movies
- Create and manage movie lists

## Project Structure

- `/server`: Express.js backend
- `/client`: React+Vite frontend

## Technologies Used

- Backend: Express.js, Node.js, MongoDB
- Frontend: React, Vite
- API: The Movie Database (TMDB)
- Authentication: JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB instance
- TMDB API key

### Installation

1. Clone the repository:

```
git clone https://github.com/wolfofdalalst/letterboxd-clone.git
cd letterboxd-clone
```

2. Install backend dependencies:

```
cd server
npm install
```

3. Install frontend dependencies:

```
cd ../client
npm install
```

4. Set up environment variables:

- Copy `.env-example` to `.env`
- Fill in the required variables in `.env` file, including your TMDB API key

### Running the Application

1. Start the backend server:

```
cd server
npm run dev
```

2. In a new terminal, start the frontend development server:

```
cd server
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite)

## API Integration

This project uses The Movie Database (TMDB) API to fetch movie data. You'll need to sign up for a TMDB account and obtain an API key to use in the application. Add your API key to the `.env` file in the project directory.

## Contributing

We welcome contributions to improve the Letterboxd Clone! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## Environment Variables

This project uses environment variables for configuration. Please refer to the `.env.example` files in project directory.

**Important:** Never commit your actual `.env` files to the repository. They should be listed in `.gitignore`.

## Deployment

Instructions for deploying to a production environment will be added soon.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Letterboxd](https://letterboxd.com/) for the inspiration
- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API

## Contact

For any questions or feedback, please open an issue on this repository or contact the maintainer at [ayushgupta19@protonmail.com]().
