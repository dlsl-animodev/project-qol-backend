# AnimoDev Student Attendance API

AnimoDev's Node.js + Express backend service for managing student attendance at DLSL events. This API integrates with AnimoDev's Project QOL API and uses Supabase for attendance tracking and event management.

## Features

- **External API Integration**: Fetches real-time student information from the AnimoDev QoL API
- **Supabase Database**: Stores events and attendance records with full CRUD operations
- **Event Management**: Create and manage events with unique event codes
- **Attendance Tracking**: Log student attendance with duplicate detection
- **TypeScript**: Fully typed codebase for better developer experience
- **CORS Enabled**: Cross-origin resource sharing configured for frontend integration

## Architecture

### External API Integration
The service acts as a middleware between the frontend and the AnimoDev student information API:
- **External API**: `https://project-qol-backend.onrender.com`
- **Purpose**: Validates student IDs and retrieves student details (email, department, card tag UID)

### Supabase Features
The project leverages Supabase for:
- **Events Table**: Stores event information (name, code, date, description)
- **Attendance Table**: Logs student attendance with timestamps and event associations

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dlsl-animodev/project-qol-backend.git
cd project-qol-backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory:
```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

# Server Configuration
PORT=3002

# External API Configuration
API_SERVICE_URL=https://project-qol-backend.onrender.com
```

4. Run the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
npm start
```

## API Endpoints

### Student & Attendance Endpoints

#### `GET /api/student`
Fetch student information and log attendance for an event.

**Query Parameters:**
- `id` (required): Student ID / Card Tag UID
- `event_code` (required): Unique event code

**Example Request:**
```bash
GET http://localhost:3002/api/student?id=1700019550&event_code=TEST2025
```
## Project Structure

```
project-qol-backend/
├── src/
│   ├── config/
│   │   └── env.ts               # Environment configuration
│   ├── controllers/
│   │   ├── homeController.ts    # Home page handler
│   │   └── studentController.ts # Student/attendance logic
│   ├── middleware/
│   │   ├── corsConfig.ts        # CORS configuration
│   │   └── errorHandler.ts     # Error handling middleware
│   ├── routes/
│   │   ├── index.ts             # Route aggregator
│   │   └── studentRoutes.ts     # Student API routes
│   ├── services/
│   │   ├── apiClient.ts         # External API integration
│   │   ├── attendanceService.ts # Attendance database operations
│   │   ├── eventService.ts      # Event database operations
│   │   └── supabaseClient.ts    # Supabase client setup
│   ├── types/
│   │   ├── database.ts          # Database type definitions
│   │   └── student.ts           # Student type definitions
│   ├── utils/
│   │   └── nameFormatter.ts     # Utility functions
│   └── app.ts                   # Express app setup
├── index.ts                     # Server entry point
├── package.json
├── tsconfig.json
└── .env
```

## 🧪 Testing

Test the API using curl or any HTTP client:

```bash
# Test student attendance logging
curl "http://localhost:3002/api/student?id=2023361221&event_code=TEST2025"

# Test home page
curl "http://localhost:3002/"
```

## Want to Contribute?

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🔗 Links

- **Repository**: https://github.com/dlsl-animodev/project-qol-backend
- **External Student API**: https://project-qol-backend.onrender.com
- **Supabase**: https://supabase.com

---

Made with ❤️ by DLSL AnimoDev
