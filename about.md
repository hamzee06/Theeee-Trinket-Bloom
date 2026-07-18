# About The Trinket Bloom

## Project Overview

The Trinket Bloom is an e-commerce web application for a handmade resin art jewelry business. It showcases a catalog of products (pendants, jhumkas, rings) with search, filtering, and sorting, lets customers build a wishlist/cart, checkout with cash-on-delivery or bank transfer, and submit contact/feedback messages — all backed by a lightweight REST API.

## System Architecture

The project is a two-tier web application split into an independently deployed frontend and backend, communicating over HTTP/JSON.

```
┌─────────────────────────┐         REST/JSON        ┌──────────────────────────┐
│   Frontend (React SPA)   │ ────────────────────────▶│  Backend (Express API)   │
│  FrontEndd/trinketbloom  │                           │      NewBackend/         │
└─────────────────────────┘         ◀────────────────────────────────────────────┘
                                                                  │
                                                                  ▼
                                                        ┌──────────────────┐
                                                        │  SQLite Database │
                                                        │  (in-memory /    │
                                                        │   Database.db)   │
                                                        └──────────────────┘
```

- **Frontend**: A single-page React application (Create React App) rendering the storefront UI as one root `App.js` component tree (product grid, wishlist modal, checkout form, contact form).
- **Backend**: An Express.js REST API organized by feature (Router → Controller → Database), exposing `/orders` and `/feedback` endpoints.
- **Database**: SQLite, accessed via the `sqlite3` driver. `db.js` initializes the schema (`orders`, `feedback` tables) on startup.
- **Deployment**: Both apps deploy to Vercel as separate projects — the frontend as a static CRA build, the backend as a Vercel Node serverless function (`@vercel/node`) wrapping the Express app.

## Tech Stack

### Frontend (`FrontEndd/trinketbloom/`)
- **React 19** (via `react` / `react-dom`), bootstrapped with **Create React App** (`react-scripts`)
- Plain inline styles (no CSS framework/UI library) — component state managed with React hooks (`useState`, `useEffect`)
- `fetch` API for calling the backend (`REACT_APP_API_URL` env var, defaulting to `http://localhost:3001` in dev)
- `web-vitals` for performance reporting
- Hosted on **Vercel** (SPA rewrites to `index.html`, `vercel.json`)

### Backend (`NewBackend/`)
- **Node.js** with **Express 5**
- **cors** middleware for cross-origin requests
- **sqlite3** for persistence (`db.js` sets up an in-memory/local SQLite database with `orders` and `feedback` tables)
- Layered structure: `Routers/` (route definitions) → `Controllers/` (request handling & SQL) → `db.js` (connection)
- Hosted on **Vercel** as a serverless Node function (`vercel.json` routes all paths to `server.js`)

## Key Modules

| Path | Responsibility |
|---|---|
| `FrontEndd/trinketbloom/src/App.js` | Entire UI: product catalog, wishlist, checkout, contact form |
| `NewBackend/server.js` | Express app setup, middleware, route mounting, health check |
| `NewBackend/db.js` | SQLite connection and schema initialization |
| `NewBackend/Routers/orderRouter.js` | `GET/POST /orders` route definitions |
| `NewBackend/Routers/feedbackRouter.js` | `GET/POST /feedback` route definitions |
| `NewBackend/Controllers/oderController.js` | Order creation/listing business logic |
| `NewBackend/Controllers/feedbackController.js` | Feedback creation/listing business logic |

## API Endpoints

- `GET /` — health check
- `GET /orders`, `POST /orders` — list / place orders
- `GET /feedback`, `POST /feedback` — list / submit contact messages

## Data Model

- **orders**: `id, customerName, address, phone, paymentMethod, items (JSON string), totalPrice, orderDate`
- **feedback**: `id, name, email, message, createdAt`
