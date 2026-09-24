# The Wild Oasis — Hotel Management Dashboard

An internal web application for hotel employees to manage cabins, bookings, guests, and check-in/check-out operations, with a real-time dashboard and dark mode support.

## 🏨 Overview

This app is built for **hotel staff only** — it is not a public-facing booking site. Employees log in to manage the day-to-day operations of the hotel: cabins, bookings, guests, and check-ins/check-outs, with an admin role for user and settings management.

## ✨ Features

### 🔐 Authentication
- Users must be logged in to access the app.
- New employee accounts can **only** be created from inside the app (no public sign-up), ensuring only actual hotel staff get accounts.
- Admins can create/add new users.
- Users can upload an avatar, and update their name and password.

### 🛏️ Cabins
- Table view of all cabins: photo, name, capacity, price, and current discount.
- Create new cabins (with photo upload).
- Edit and delete existing cabins.

### 📖 Bookings
- Table view of all bookings: arrival/departure dates, status, amount paid, cabin data, and guest data.
- Filterable by status: `unconfirmed`, `checked-in`, `checked-out`.
- Additional booking fields: number of guests, number of nights, guest observations, breakfast (yes/no), breakfast price.
- Create, edit, and delete bookings.
- Delete, check in, or check out a booking (no other editing needed once created, aside from check-in/out flow).

### ✅ Check-in / Check-out
- On check-in:
  - Confirm that payment has been received (payment itself is taken outside the app).
  - Option to add breakfast for the full stay if not already included.
- On check-out: mark the booking as checked out.

### 👤 Guests
- Guest data: full name, email, national ID, nationality, and country flag (for quick identification).
- Add, edit, and delete guests.

### 📊 Dashboard
The landing screen, filterable by last **7 / 30 / 90 days**:
- Guests checking in and checking out today, with the ability to act on them directly.
- Key stats: recent bookings, sales, check-ins, occupancy rate.
- Sales chart: total sales vs. extras (breakfast) sales, per day.
- Stay-duration chart: distribution of how long guests stay.

### ⚙️ Settings
Admin-only, application-wide settings:
- Breakfast price
- Min/max nights per booking
- Max guests per booking

### 🌗 Dark Mode
Full dark mode support across the app.

### 👥 Roles
- **Regular users**: manage cabins, bookings, guests, check-in/out.
- **Admin**: everything above, plus creating new users and editing application settings.

## 🧱 Tech Stack

- **React** (Vite)
- **React Router** — routing
- **React Query** — server-state management/caching
- **Supabase** — backend (auth, database, storage for images)
- **Styled Components** — styling
- **React Hook Form** — forms
- **Recharts** — dashboard charts
- **React Hot Toast** — notifications
- **React Icons** — icons

## 📁 Project Structure

```
src/
├── context/          # e.g. DarkModeContext
├── data/              # seed data + cabin images
├── features/          # feature-based modules
│   ├── authentication/
│   ├── bookings/
│   ├── cabins/
│   ├── check-in-out/
│   ├── dashboard/
│   ├── guests/
│   └── settings/
├── hooks/             # custom hooks (localStorage, moveBack, outsideClick)
├── pages/             # route-level pages
├── services/          # Supabase API calls
├── styles/            # global styles
├── ui/                # reusable UI components
├── utils/             # constants & helpers
├── App.jsx
└── main.jsx
```

Each `features/<name>` folder follows the same pattern: a `use<Resource>.js` hook per operation (fetch/create/edit/delete), paired with the corresponding form/row/table components.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A [Supabase](https://supabase.com) project (URL + public anon key)

### Installation

```bash
git clone <repo-url>
cd <project-folder>
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_KEY=your-supabase-anon-key
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## 🗄️ Supabase Setup

You'll need the following tables in your Supabase project:
- `cabins` — name, capacity, price, discount, image, description
- `bookings` — startDate, endDate, numNights, numGuests, cabinPrice, extrasPrice, totalPrice, status, hasBreakfast, isPaid, observations, cabinId, guestId
- `guests` — fullName, email, nationalID, nationality, countryFlag
- `settings` — minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice

Set up Supabase Storage buckets for **cabin images** and **avatars**, and enable Row Level Security policies as appropriate for authenticated staff access.

## 📄 License

This project is for internal/educational use. Add a license here if needed.