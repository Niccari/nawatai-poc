# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nawatai is a naming brainstorming service for individuals built with Next.js 15, React 19, and Firebase. It allows users to create naming targets, submit naming suggestions, and evaluate them. The application uses Firebase for authentication, Firestore for database, and Firebase Storage for file uploads.

## Common Development Commands

### Development Setup
```bash
# Install dependencies
npm i

# Start Firebase emulators with data import/export
npm run emulator

# Start development server
npm run dev
```

### Build and Quality
```bash
# Build production version
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Run ESLint with auto-fix and Prettier
npm run lint:fix
```

## Environment Configuration

Required environment variables (see `.env.example`):
- Firebase configuration variables for both client and server
- Emulator configuration for local development
- Service account key for Firebase Admin SDK

## Architecture

### Directory Structure
- `src/models/` - TypeScript interfaces and types
- `src/services/` - Firebase client/server initialization
- `src/repositories/` - Data access layer with interfaces
- `src/modules/` - Business logic and custom hooks
- `src/components/` - React components organized by element/pages
- `src/pages/` - Next.js pages and API routes

### Key Patterns
- **Repository Pattern**: Each domain has an interface in `repositories/*/interface.ts` defining CRUD operations
- **Custom Hooks**: API interactions are abstracted into hooks in `modules/*/hooks.ts`
- **Authentication**: Uses Firebase Auth with custom bearer token helpers in `modules/api/index.ts`
- **Component Structure**: Components are split between reusable `element/` components and page-specific `pages/` components

### Core Domains
- **Naming**: Core naming suggestions with evaluations
- **NamingTarget**: Targets for naming (what needs to be named)
- **NamingEval**: Evaluations of naming suggestions
- **PersonalUser**: User profiles and activities
- **Notification**: User notifications system

### Firebase Integration
- **Client**: `src/services/firebaseOnClient.ts` - handles auth emulator connection
- **Server**: `src/services/firebaseOnServer.ts` - Admin SDK initialization
- **Emulator**: Configured for Firestore (port 8080), Auth (port 9099), and Storage (port 9199)

## UI Framework

Uses shadcn/ui components built on Radix UI with Tailwind CSS for styling. SVG assets are handled through @svgr/webpack configuration.

## Development Notes

- TypeScript strict mode enabled
- ESLint flat config with Next.js and Prettier integration
- Firebase emulator required for local development
- Image uploads handled through Firebase Storage with custom API routes
- Authentication state managed through Firebase Auth with custom hooks
- Uses Tailwind CSS v4 with PostCSS for styling
- Form validation with react-hook-form and Zod
- Data fetching with SWR