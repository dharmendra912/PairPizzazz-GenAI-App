# PairPizzazz - Name Connection Application

PairPizzazz is a full-stack web app that creates meaningful connections between names by analyzing their meanings and origins. Built using Cursor and integrated with Perplexity's LLM API, the app generates insightful, uplifting connections between any two names. When users enter names, the app uses a carefully crafted system prompt to analyze name meanings, origins, and create thoughtful connections through historical, cultural, or symbolic harmony. This project serves as an experimental playground to explore LLM integration, prompt engineering, and creative UX applications of GenAI.

## 🌐 Live Deployment

- Frontend: [https://pairpizzazz.netlify.app](https://pairpizzazz.netlify.app)
- Backend API: [https://pairpizzazz.onrender.com](https://pairpizzazz.onrender.com)

## 🚀 Features

- AI-powered name meaning connections
- Real-time form validation
- Alphabet-only input validation
- Maximum 20 characters per name
- Loading states and error handling
- Responsive UI with Bootstrap
- Cross-origin resource sharing (CORS) enabled
- Comprehensive error handling
- Modern and intuitive user interface
- Integration with Perplexity's LLM API

## 🛠️ Tech Stack

### Frontend
- Angular 19
- Bootstrap 5
- TypeScript
- SCSS for styling

### Backend
- Spring Boot 3.2
- Java 17
- Maven
- RESTful API architecture
- Perplexity LLM API Integration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ and npm
- Java 17+
- Maven
- Git
- Perplexity API Key (for LLM integration)

## 🚀 Getting Started

### Clone the Repository
```bash
git clone https://github.com/yourusername/PairPizzazz.git
cd PairPizzazz
```

### Environment Setup

1. Create a `.env` file in the backend directory with your Perplexity API key:
   ```bash
   PERPLEXITY_API_KEY=your_api_key_here
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend application will be available at `http://localhost:4200`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the application:
   ```bash
   ./mvnw clean install
   ```

3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

The API will be available at `http://localhost:8080/api`

## 📚 API Documentation

### Endpoints

#### GET /api/names
Creates a meaningful connection between two names by analyzing their meanings and origins.

**Parameters:**
- `name1`: First name (max 20 chars, alphabets only)
- `name2`: Second name (max 20 chars, alphabets only)

**Response:**
```json
{
    "result": "A single paragraph connecting the meanings and origins of the two names"
}
```

**Example Request:**
```
GET /api/names?name1=John&name2=Jane
```

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
./mvnw test
```

## 📁 Project Structure

```
/PairPizzazz
├── frontend/          # Angular 19 application
│   ├── src/          # Source files
│   ├── public/       # Static files
│   └── ...
└── backend/          # Spring Boot 3.2 application
    ├── src/          # Source files
    ├── .env         # Environment variables
    └── ...
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Dharmendra Agrawal - Initial work

## 🙏 Acknowledgments

- Perplexity AI for providing the LLM API
- Cursor IDE for development support
- The open-source community for their invaluable tools and libraries
