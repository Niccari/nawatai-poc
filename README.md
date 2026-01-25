![nawatai](docs/service_logo.png)

# Nawatai

Nawatai is a naming brainstorming service for individuals built with Next.js 15, React 19, and Firebase. It allows users to create naming targets, submit naming suggestions, and evaluate them.

**Note: This service is an alpha version and may contain bugs and glitches.**

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Framework**: shadcn/ui components with Radix UI and Tailwind CSS v4
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Form Management**: react-hook-form with Zod validation
- **Data Fetching**: SWR
- **Styling**: Tailwind CSS v4 with PostCSS

## Development Setup

**Firebase Local Emulator for Firestore, Storage, Auth are required.**

1. **Environment Configuration**
   ```bash
   # Copy example environment file
   cp .env.example .env.local
   # Edit .env.local with your Firebase configuration
   ```

2. **Install Dependencies**
   ```bash
   npm i
   ```

3. **Start Firebase Emulators**
   ```bash
   npm run emulator
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix and Prettier
- `npm run emulator` - Start Firebase emulators with data import/export

## Architecture Overview

### Directory Structure
- `src/models/` - TypeScript interfaces and types
- `src/services/` - Firebase client/server initialization
- `src/repositories/` - Data access layer with interfaces
- `src/modules/` - Business logic and custom hooks
- `src/components/` - React components organized by element/pages
- `src/pages/` - Next.js pages and API routes

### Key Features
- Repository pattern for data access
- Custom hooks for API interactions
- Firebase Auth with custom bearer token helpers
- Image uploads via Firebase Storage
- Real-time data with Firestore
- User notifications system

## Firebase Configuration

The application uses Firebase emulators for local development:
- **Firestore**: Port 8080
- **Auth**: Port 9099
- **Storage**: Port 9199

## Development Notes

- TypeScript strict mode enabled
- ESLint flat config with Next.js and Prettier integration
- Firebase emulator required for local development
- Form validation with react-hook-form and Zod
- Data fetching with SWR for caching and revalidation

## Troubleshooting

### Firebase Emulator JDK Version Error

**Error:**
```
Error: firebase-tools no longer supports Java version before 21. Please install a JDK at version 21 or above to get a compatible runtime.
```

**Cause:**
Firebase Tools v15 requires JDK 21 or higher to run the emulators.

**Solution:**
Install JDK 21 or higher. You can download it from:
- [Oracle JDK](https://www.oracle.com/java/technologies/downloads/)
- [OpenJDK](https://openjdk.org/)
- [Amazon Corretto](https://aws.amazon.com/corretto/)

After installation, verify your Java version:
```bash
$ java -version    # ex) openjdk 25.0.2 2026-01-20
```

You should see version 21 or higher in the output.
