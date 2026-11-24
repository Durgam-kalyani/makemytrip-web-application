# MakeMyTrip Web Application (Travel Booking)

A beginner-friendly travel booking web app built with **React.js, HTML5, CSS3 and JavaScript (ES6)**.
Search flights and hotels, sign up / log in, book, view and cancel bookings.
No backend needed: sample data lives in `src/data` and bookings are saved in the browser's `localStorage`.

## Features

- Home page with a tabbed **Flights / Hotels** search box and offers section
- **Flight search** by route, with sorting (price / departure time)
- **Hotel search** by city, with a max-price slider
- **Sign up / Login / Logout** (demo auth stored in `localStorage`)
- **Protected pages**: booking and "My Bookings" need a login
- **Booking forms** with validation (multiple travellers, dates, rooms)
- **My Bookings** page with booking status and **cancel** option
- Fully **responsive** layout (mobile + desktop), semantic HTML and accessible form labels

## Tech used

| Area | Tools |
|------|-------|
| UI | React 19 (functional components, hooks: `useState`, `useContext`) |
| Routing | React Router (`Routes`, `NavLink`, `useSearchParams`, protected routes) |
| Styling | Plain CSS (variables, Flexbox, Grid, media queries) |
| State | React Context API (`AuthContext`, `BookingContext`) |
| Storage | Browser `localStorage` |
| Build tool | Vite |

## Run it locally

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev
```

Open the link shown in the terminal (usually http://localhost:5173).

Other commands:

```bash
npm run build     # production build into /dist
npm run preview   # preview the production build
```

## Try it out

1. Click **Sign up** and create an account (any email, password of 6+ characters)
2. On the home page search **Hyderabad → Mumbai** for flights
3. Click **Book now**, fill the traveller details and confirm
4. Open **My Bookings** to see it, and try **Cancel**
5. Search hotels for **Hyderabad** and book one

## Project structure

```
makemytrip-web-application/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # app entry, wraps providers + router
    ├── App.jsx               # all routes
    ├── styles.css            # all styling
    ├── components/           # Navbar, Footer, SearchBox, FlightCard, HotelCard, ProtectedRoute
    ├── pages/                # Home, Flights, Hotels, BookFlight, BookHotel, MyBookings, Login, Signup, NotFound
    ├── context/              # AuthContext, BookingContext
    ├── data/                 # cities, flights, hotels (sample data)
    └── utils/                # storage + formatting helpers
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: TripEasy travel booking app"
git branch -M main
git remote add origin https://github.com/<your-username>/makemytrip-web-application.git
git push -u origin main
```

(`node_modules` and `dist` are already in `.gitignore`.)

## Notes

- This is a learning project. Passwords are stored in plain text in `localStorage` for demo purposes only;
  a real app needs a backend with hashed passwords.
- Flights and hotels are fake sample data, and no payment is processed.

## Ideas to extend it

- Connect a backend (Node/Express or Django REST API with MySQL) instead of `localStorage`
- Add a payment page, seat selection or round-trip flights
- Add unit tests with Vitest and React Testing Library
