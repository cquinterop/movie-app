# Movie App

A modern movie browsing application built with Next.js, React 19, Apollo Client, and GraphQL. This application allows users to browse movies, search for specific titles, filter by genres, and view detailed information about each movie.

![alt text](/public/images/report.png)

## Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **UI Library**: [React 19](https://react.dev/)
- **Data Fetching**: [Apollo Client](https://www.apollographql.com/docs/react/) with GraphQL
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [Shadcn/UI](https://ui.shadcn.com/)
- **TypeScript**: For static type checking
- **Testing**: Jest and React Testing Library
- **Deployment**: Vercel

## Architecture Overview

### Project Structure

```
movie-app/
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── (home)/         # Home page route group
│   │   └── movie/          # Movie detail page route
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Shadcn UI components
│   │   └── ...             # Application-specific components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   │   ├── graphql/        # GraphQL queries and fragments
│   ├── providers/          # React context providers
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Helper functions
└── ...                     # Configuration files
```

### Key Architectural Decisions

#### 1. Next.js App Router

The application uses Next.js App Router for its file-system based routing with a focus on React Server Components (RSC) for improved performance. This architecture:

- Enables streaming server rendering
- Supports parallel data fetching
- Simplifies routing with nested layouts and loading states
- Provides built-in optimizations for static and dynamic content

#### 2. Data Fetching Strategy

Apollo Client is used for GraphQL data fetching with several optimizations:

- **Cache Configuration**: Custom merge functions for paginated results
- **Server-Side Rendering**: Data prefetching during SSR for critical resources
- **Client-Side Caching**: Module-level caching for static data (like genres)
- **Pagination**: Efficient handling of paginated data with cursor-based pagination

#### 3. UI Component Hierarchy

The UI follows a component-based architecture with clear separation of concerns:

- **Layout Components**: Define the overall structure of pages
- **Feature Components**: Implement specific functionality (e.g., movie list, search)
- **UI Components**: Reusable building blocks from Shadcn/UI
- **Composition Pattern**: Components are composed together to build complex UIs

#### 4. State Management

The application uses a combination of:

- **Apollo Cache**: For remote data state
- **React Context**: For theme and global application state
- **Local Component State**: For UI-specific state
- **URL Parameters**: For shareable search and filter states

## Implementation Details

### GraphQL Integration

The GraphQL integration is handled through Apollo Client with the following features:

```typescript
// Apollo Client Configuration
const createApolloClient = () => {
	return new ApolloClient({
		uri: `${process.env.NEXT_PUBLIC_MOVIES_API_BASE_URL}/graphql`,
		cache: createCache(),
		headers: {
			authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIES_API_TOKEN}`,
		},
	});
};
```

Custom hooks abstract the data fetching logic:

```typescript
// Custom hook for fetching movies
export const useMovies = (variables: MoviesVariables = {}) => {
	const { data, fetchMore } = useSuspenseQuery<MoviesData>(GET_MOVIES, {
		variables,
	});

	// Implementation details...

	return {
		data: data?.movies?.nodes ? data.movies.nodes.map(movieFactory) : [],
		pagination: data?.movies?.pagination,
		totalMovies: data?.movies?.totalMovies,
	};
};
```

### Performance Optimizations

Several performance optimizations have been implemented:

1. **Strategic Caching**: Genres are cached at the module level to prevent redundant fetches
2. **Route-based Code Splitting**: Each page loads only the necessary JavaScript
3. **Image Optimization**: Using Next.js Image component for lazy loading
4. **Suspense Boundaries**: For smoother loading states and parallel data fetching

### Responsive Design

The application is fully responsive with a mobile-first approach:

- **Breakpoint System**: Tailwind's breakpoint system for different screen sizes
- **Flexible Layouts**: Flexbox for adaptable layouts
- **Adaptive UI**: Components adjust based on screen size

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm or yarn

### Environment Setup

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_MOVIES_API_BASE_URL=your_api_url
NEXT_PUBLIC_MOVIES_API_TOKEN=your_api_token
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Deployment

The application is configured for seamless deployment on Vercel.

```bash
# Production build
npm run build

# Start production server
npm start
```

## Development Workflow

This project uses a structured development workflow:

1. **Code Quality**: ESLint and Prettier for code formatting
2. **Git Workflow**: Commitizen for standardized commit messages
3. **Pre-commit Hooks**: Husky for running linters before committing
4. **Testing**: Jest for unit and integration tests

## Project Reflections

### Key Aspects

The URL-based state management approach represents a particularly interesting aspect of this project. Instead of relying on global state stores like Redux or complex Context hierarchies, I implemented a solution that uses URL parameters as the source of truth for search and filter state:

1. All filter states (search terms, genre selections, pagination) are stored in the URL
2. Components read state directly from URL parameters
3. State updates modify the URL, which then triggers UI updates
4. Page refreshes and shared links maintain the exact same application state

This pattern offers several advantages:

```typescript
// Hook for managing search filters through URL parameters
export const useSearchFilters = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	// Extract current state from URL
	const search = searchParams.get('search') || '';
	const genre = searchParams.get('genre') || '';
	const page = Number(searchParams.get('page') || 1);

	// Update URL with new state
	const setParams = useCallback(
		(params: Partial<FiltersState>) => {
			const newParams = new URLSearchParams(searchParams);

			// Update only the changed parameters
			Object.entries(params).forEach(([key, value]) => {
				if (value) {
					newParams.set(key, String(value));
				} else {
					newParams.delete(key);
				}
			});

			router.push(`${pathname}?${newParams.toString()}`);
		},
		[pathname, router, searchParams]
	);

	return { search, genre, page, setParams };
};
```

For more complex applications, I would implement [Nuqs](https://github.com/47ng/nuqs) to handle URL state management with type safety, serialization/deserialization, and automatic URL compression. However, for this project's scope, the custom implementation provides a clean, shareable, and SEO-friendly approach to state management.

### Implementation Achievements

I'm particularly proud of the search implementation that integrates Algolia with Apollo GraphQL. This hybrid approach gives users the best of both worlds:

1. **Rich Data Display**: Apollo's GraphQL integration enables detailed movie information
2. **Seamless UX**: The search experience feels integrated despite using two different data sources
3. **Performance Optimization**: Debounced queries and loading indicators create a responsive interface

The implementation required careful coordination between client-side state management, API calls, and UI updates, resulting in a polished user experience that balances performance and functionality.

### Future Improvements

Given more time, I would enhance this project with the following features:

1. **Personalization System**: Implement user accounts and a recommendation engine based on viewing history and preferences. This would include:

   - User authentication and profiles
   - Favorite/watchlist functionality
   - ML-based recommendation algorithm
   - Personalized home page

2. **Advanced Filtering**: Add more sophisticated filtering options like:

   - Multiple genre selection
   - Release year ranges
   - Runtime filters
   - Streaming service availability

3. **Performance Enhancements**:

   - Implement React Server Components more extensively
   - Further optimize bundle size with more granular code splitting
   - Implement stale-while-revalidate caching strategy

4. **Accessibility Improvements**:
   - Conduct a thorough accessibility audit
   - Implement keyboard navigation enhancements
   - Add screen reader optimizations
   - Improve color contrast and focus indicators

These improvements would take the application from a solid demonstration project to a production-ready service that could compete with commercial movie browsing platforms.
