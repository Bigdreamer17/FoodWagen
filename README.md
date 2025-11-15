# FoodWagen - Food Management Application

A modern, fully-featured food management web application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Search Functionality**: Search for food items quickly and accurately
- **CRUD Operations**: Add, edit, and delete food items with ease
- **Responsive Design**: Works flawlessly on mobile, tablet, and desktop
- **Real-time Validation**: Form validation with user-friendly error messages
- **Loading States**: Visual feedback during API operations
- **Animations**: Smooth slide-up entry animations and hover effects
- **Error Handling**: Graceful error handling and empty states

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Testing**: Jest + React Testing Library
- **API**: Mock API (mockapi.io)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and Tailwind configuration
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── Header.tsx       # Header with search functionality
│   ├── Footer.tsx       # Footer component
│   ├── FoodCard.tsx     # Food card component
│   ├── FoodModal.tsx    # Add/Edit modal with validation
│   ├── DeleteModal.tsx  # Delete confirmation modal
│   └── EmptyState.tsx   # Empty state component
├── lib/
│   └── api.ts           # API integration layer
├── types/
│   └── food.ts          # TypeScript type definitions
└── __tests__/
    ├── FoodCard.test.tsx    # FoodCard component tests
    ├── FoodModal.test.tsx   # FoodModal component tests
    └── HomePage.test.tsx    # Home page tests
```

## API Endpoints

Base URL: `https://6852821e0594059b23cdd834.mockapi.io`

- `GET /Food` - Get all foods
- `GET /Food?name=[searchParam]` - Search foods
- `POST /Food` - Create a new food
- `PUT /Food/[id]` - Update a food
- `DELETE /Food/[id]` - Delete a food

## Testing

Run tests:
```bash
npm test
```

## [Deployment](https://food-wagen-eight.vercel.app)

## Features Implemented

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Search functionality with API integration
- ✅ Add/Edit/Delete operations
- ✅ Form validation with error messages
- ✅ Loading states
- ✅ Empty states
- ✅ Entry animations (slide-up, 300ms)
- ✅ Hover animations (150ms ease-out)
- ✅ Proper semantic HTML
- ✅ Accessibility (ARIA labels, descriptions)
- ✅ TypeScript for type safety
- ✅ Comprehensive test coverage

## License

This project was created as part of the A2SV hiring assessment.
