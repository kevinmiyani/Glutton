# Glutton Resto

## Project Overview
- **What it is**: Glutton Resto is a full-stack restaurant reservation ecosystem that lets diners discover venues, book and cancel tables, and leave feedback while providing restaurants and admins with the tools to bookings.
- **Problem it solves**: Manual or fragmented reservation efforts are replaced with a unified, mobile-first workflow for customers, restaurants, and administrators.
- **Target users**: Diners seeking convenient reservations, restaurant operators managing seatings and content, platform administrators coordinating listings and monetization.
- **High-level workflow**: Customers explore restaurants, view menus and reviews, and place bookings through the mobile clients. Restaurants and admins consume REST APIs and WebSocket feeds to confirm bookings and manage bills. The backend orchestrates data persistence, discounts, and verification logic while coordinating authentication.

## Tech Stack
### Frontend
- React Native (three complementary clients: customer app, restaurant manager app, admin portal app)
- Redux for centralized state
- React Navigation for screen routing
- Styled components + native styling conventions
- Axios / Fetch for API integration

### Backend
- Node.js runtime with Express.js REST API
- JWT or token-based authentication managed via custom middleware
- Socket.IO for real-time booking verification and status updates
- Node Cron for scheduled tasks (booking cleanup, restaurant activation)

### Database
- MongoDB via Mongoose ODM to model restaurants, bookings, ratings, packages, customers, and invoices.

### Tools & Services
- Git + GitHub for version control
- Vercel / any Node-friendly host for backend deployment (configured via `vercel.json`)
- Socket.IO for real-time channels, Moment.js for temporal logic, and dotenv for environment management
- Firebase / Google services (see native config files) for push notifications and analytics where applicable

## Architecture Overview
- **Frontend ↔ Backend communication**: Mobile clients call the Express REST API over HTTPS; real-time updates flow through Socket.IO channels for each restaurant or booking session.
- **REST API architecture**: Resource-based controllers (`restaurant`, `booking`, `rating`, `menuItem`, etc.) expose CRUD operations and custom actions (`/booking/verify`, `/package/earnings`) while adhering to RESTful verbs.
- **Authentication & authorization flow**: Users, restaurants, and admins authenticate via email/password endpoints, receive JWTs, and include them in headers. Role guards differentiate permissions (e.g., admins can manage restaurants/customers).
- **Data flow**: Clients send reservation requests → backend validates, stores booking documents, and schedules verification cron jobs → restaurants confirm bookings and update availability → notifications propagate via Socket.IO → invoices and ratings update related collections.

## Frontend Overview
- **Purpose**: Provide responsive mobile-first experiences for customers (booking & exploring), restaurants (menu & booking management), and admins (oversight & monetization).
- **Type**: Cross-platform mobile applications built with React Native for iOS and Android.

## Frontend Tech Stack
- **UI framework**: React Native core components plus custom styled wrappers defined in `src/constants/Styles.js`.
- **State management**: Redux with action creators and reducers located in `src/redux`.
- **Navigation / routing**: React Navigation + custom `NavigationHandler`.
- **Styling approach**: Shared constants (`Colors`, `Elevation`, `Styles`) and inline styles for platform specific adjustments.

## Frontend Folder Structure
- `src/screens/`: Screen components for onboarding, bookings, menus, admin dashboards, etc.
- `src/components/`: Reusable UI widgets (cards, lists, dialogs).
- `src/redux/`: Actions, reducers, middleware, selectors.
- `src/api/`: Helper modules for HTTP requests and socket initialization.
- `src/constants/`: Theme, strings, permissions, and navigation helpers.
- `src/navigation/`: Router setup and route handlers.

## Frontend Features
- **Authentication**: Login/signup screens for customers, restaurants, and admins; token storage via async storage helpers.
- **API integration**: Axios/fetch helpers call REST endpoints for bookings, menus, ratings, invoices, and packages.
- **State management**: Redux maintains user profiles, restaurant data, booking state, and UI flags.
- **Error handling**: Snack bars (`SnackBars.js`), error boundaries, and API helpers standardize failure feedback.
- **Performance optimizations**: Memoized components, list virtualization, asset caching, and lazy-loading heavy screens/components.

## Frontend Setup & Installation
- **Prerequisites**: Node 18+, Yarn or npm, Xcode/Android Studio for native builds, React Native CLI.
- **Environment variables**: Create `.env` with keys such as:
  ```
  API_BASE_URL=https://YOUR_API_URL
  SOCKET_URL=wss://YOUR_SOCKET_URL
  GOOGLE_MAPS_API_KEY=YOUR_KEY
  ```
- **Installation**:
  1. `cd Glutton-userapp` (or `Glutton-Restaurant-App` / `Glutton-Admin-App` for the other clients)
  2. `npm install` (or `yarn install`)
- **Running locally**:
  1. `npx react-native start`
  2. `npx react-native run-android` / `npx react-native run-ios` after configuring native dependencies

## Frontend Scripts
- `npm run ios` / `npm run android`: Builds and launches the app on the selected simulator/emulator.
- `npm run start`: Starts Metro bundler.
- `npm run test`: Executes Jest tests defined under `__tests__`.
- `npm run lint`: (If configured) runs linters against `src`.

## Backend Overview
- **Purpose**: Serve as the single source of truth for bookings, menus, invoices, ratings, packages, and user management.
- **Core responsibilities**: Validate requests, enforce business rules (discounts, cancellation windows), manage MongoDB persistence, and push updates through Socket.IO and cron jobs.

## Backend Tech Stack
- **Runtime & framework**: Node.js with Express.js.
- **Database**: MongoDB via Mongoose models.
- **Authentication strategy**: Token-based authentication (JWT or session tokens) with middleware guarding protected routes.
- **ORM / query handling**: Mongoose schemas (`models/`) define shape and relationships; controllers (`controllers/`) manage queries.
- **Security & validation**: Custom error handler (`utils/ErrorHandler.js`) plus schema validation, password hashing (if implemented), rate limits, and CORS headers.

## Backend Folder Structure
- `controllers/`: Request handlers for each resource (admin, booking, restaurant, rating, invoice, etc.).
- `routes/`: Express routers mapping HTTP verbs to controller functions.
- `models/`: Mongoose schema definitions for restaurants, customers, bookings, invoices, menus, etc.
- `database/DB.js`: MongoDB connection logic.
- `cron/`: Scheduled jobs (e.g., `cancelUnverifiedBookings`, `deactivateRestaurants`).
- `socket.js`: Socket.IO integration for booking verification updates.
- `utils/`: Shared utilities like error handling.

## API Design
- **RESTful principles**: Resources follow pluralized endpoint patterns and HTTP verbs (`GET /restaurants`, `POST /booking`, `DELETE /menuItem/:id`).
- **Sample endpoints**:
  - `POST /user/login` – authenticate customers, restaurants, or admins and return JWT.
  - `GET /restaurants` – discover venues with filters (location, rating, cuisine).
  - `POST /booking` – reserve a table with guest count, date, and time.
  - `PATCH /booking/:id/verify` – restaurant confirms a reservation via Socket.IO action.
  - `POST /menuItem` – restaurant adds or updates menu content.
  - `GET /invoice/:customerId` – fetch billing history.

## Authentication & Authorization
- **Login/signup flow**: Clients call dedicated `/login` and `/signup` endpoints that validate credentials, create or fetch profiles, and issue tokens.
- **Token-based authentication**: Tokens are included in `Authorization` headers for protected routes and verified by middleware before controllers execute.
- **Role-based access**: Middleware inspects user roles (customer, restaurant, admin) to enforce permissions, e.g., only admins can manage restaurant packages, restaurants can manage their own menus/bookings, and customers can manage their bookings.

## Backend Setup & Installation
- **Prerequisites**: Node 18+, MongoDB instance (local or hosted), and Redis (optional for caching or socket session storage).
- **Environment variables** (example `.env`):
  ```
  PORT=4000
  MONGO_URI=mongodb+srv://USER:PASSWORD@HOST/Glutton
  JWT_SECRET=YOUR_SECRET
  SOCKET_SECRET=YOUR_SECRET
  ```
- **Installation**:
  1. `cd Glutton-Backend`
  2. `npm install`
- **Running locally**:
  1. `npm run start`
  2. Monitor logs for cron jobs and socket initialization; backend listens on port defined in `.env`.

## Database Design
- **Type**: Document-oriented MongoDB.
- **Key tables/entities**:
  - `Customer`: profile details, favorites, booking history, loyalty tier.
  - `Restaurant`: location, contact info, menus (categories/items), photos, package data.
  - `Booking`: guest count, datetime, status, verification flags, discount codes.
  - `MenuCategory` & `MenuItem`: categorize offerings per restaurant.
  - `Invoice` & `InvoiceItem`: track financials per booking.
  - `Package`: admin-managed subscription plans for restaurants (monthly/yearly).
  - `Rating`: reviews and scores linked to bookings and customers.
- **Relationships**: Bookings reference customers and restaurants, invoices tie back to bookings, packages link to restaurants, and ratings point to both the restaurant and booking.

## Environment Variables
- **Frontend example**:
  ```
  API_BASE_URL=https://api.gluttonresto.com
  SOCKET_URL=wss://api.gluttonresto.com
  GOOGLE_MAPS_API_KEY=YOUR_KEY
  ```
- **Backend example**:
  ```
  PORT=4000
  MONGO_URI=mongodb+srv://USER:PASSWORD@cluster/glutton
  JWT_SECRET=replace_me
  NODE_ENV=development
  ```

## Deployment
- **Frontend deployment**:
  - Build native binaries via Xcode/Android Studio or use Expo build pipelines.
  - Upload to App Store / Play Store once release channels are configured.
  - Point release builds to production API URLs via `.env`.
- **Backend deployment**:
  - Deploy Node service to Vercel, Render, or any container provider.
  - Ensure `vercel.json` (or equivalent) references `index.js` and sets environment variables.
  - Enable HTTPS, configure Socket.IO origins, and point clients to the deployed base URL.
- **Environment configuration**:
  - Keep secrets in secured vaults or CI/CD environment settings.
  - Align `.env.example` files with production naming to avoid mismatches.

## Security Considerations
- **Authentication security**: Strong password validation, hashed credentials, short-lived JWTs, and refresh token handling are encouraged.
- **API protection**: Rate limiting, request validation in controllers, CORS policies, and HTTPS enforcement protect endpoints.
- **Data validation**: Use Mongoose validators and centralized error handling (`utils/ErrorHandler.js`) to prevent malformed data and injection attempts.

## Future Improvements
- **Scalability**: Introduce queueing (Redis, Bull) for heavy workloads, shard MongoDB collections, and load balance API servers.
- **Feature enhancements**: Implement push notifications, loyalty tiers, dynamic promotions, and analytics dashboards for restaurants/admins.
- **Performance optimizations**: Cache frequently-accessed catalog data, profile pre-fetching on the frontend, and database indexing for common queries.

## Contribution Guidelines
- Fork the repository and open a feature branch named `feature/<short-description>` or `bugfix/<issue>`.
- Run existing linters/tests before submitting.
- Submit a clean pull request describing changes, motivation, testing, and any outstanding concerns.
- Tag maintainers for reviews and wait for CI checks to pass before merging.

## License
- `MIT` (replace with the appropriate license if different)

