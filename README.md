# Mess Near Me

A hyper-local food discovery and meal pre-booking platform connecting college students, hostel residents, PG residents, working professionals, and daily diners with nearby home-style kitchens and mess facilities.
[Your Link Here](https://petpuja-8npz.vercel.app/)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (to be configured)

## Project Structure

```
mess-near-me/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── book/              # Booking flow pages
│   │   │   ├── [messId]/     # Meal selection
│   │   │   │   ├── page.tsx
│   │   │   │   └── payment/  # Payment page
│   │   │   │       └── page.tsx
│   │   │   └── [messId]/     # Booking confirmation
│   │   │       └── confirmation/
│   │   │           └── page.tsx
│   │   ├── cancel/           # Cancellation flow
│   │   │   └── [bookingId]/
│   │   │       └── page.tsx
│   │   ├── dashboard/        # User dashboard
│   │   │   └── page.tsx
│   │   ├── discover/         # Mess discovery page
│   │   │   └── page.tsx
│   │   ├── login/            # Login page
│   │   │   └── page.tsx
│   │   ├── map/              # Map view
│   │   │   └── page.tsx
│   │   ├── mess/             # Mess details
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── owner-dashboard/  # Owner dashboard
│   │   │   └── page.tsx
│   │   ├── register/         # Registration page
│   │   │   └── page.tsx
│   │   ├── globals.css       # Global styles
│   │   └── page.tsx          # Landing page
│   ├── components/           # Reusable components
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── FeaturedMesses.tsx
│   │   ├── MessCard.tsx
│   │   └── MobileNav.tsx
│   └── lib/                 # Utilities and data
│       ├── mock-data.ts      # Mock data for development
│       ├── supabase.ts       # Supabase client and types
│       └── supabase-server.ts # Server-side Supabase client
└── package.json
```

## Features Implemented

### Core User Features
- ✅ Landing page with hero section and search module
- ✅ Mess discovery with advanced filters (distance, meal type, price, food type)
- ✅ Mess cards with live menu preview and availability
- ✅ Detailed mess pages with visual menus
- ✅ Meal booking flow (selection → payment → confirmation)
- ✅ User dashboard with bookings, history, and profile
- ✅ Cancellation system with transparent fee calculation
- ✅ Map interface (placeholder for Google Maps/Mapbox integration)

### Core Owner Features
- ✅ Owner dashboard with overview stats
- ✅ Menu management (add/edit dishes, upload photos)
- ✅ Booking management with filters
- ✅ Availability management (capacity control)
- ✅ Earnings overview
- ✅ Reviews management

### UI/UX Features
- ✅ Responsive design (mobile-first)
- ✅ Mobile bottom navigation
- ✅ Loading states
- ✅ Error states
- ✅ Empty states
- ✅ Professional footer with trust section
- ✅ Clean, warm design aesthetic

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd mess-near-me
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Connecting to Supabase

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be ready

### 2. Set Up Database Tables

Run the following SQL in your Supabase SQL Editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  role TEXT CHECK (role IN ('user', 'owner')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messes table
CREATE TABLE messes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL NOT NULL,
  longitude DECIMAL NOT NULL,
  phone TEXT NOT NULL,
  image_url TEXT NOT NULL,
  rating DECIMAL DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_vegetarian BOOLEAN DEFAULT false,
  facilities TEXT[] DEFAULT '{}',
  meal_types TEXT[] DEFAULT '{}',
  lunch_capacity INTEGER NOT NULL,
  dinner_capacity INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menus table
CREATE TABLE menus (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mess_id UUID REFERENCES messes(id) ON DELETE CASCADE,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner')) NOT NULL,
  date DATE NOT NULL,
  image_url TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(mess_id, meal_type, date)
);

-- Dishes table
CREATE TABLE dishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  menu_id UUID REFERENCES menus(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price DECIMAL NOT NULL,
  image_url TEXT NOT NULL,
  is_available BOOLEAN DEFAULT true,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mess_id UUID REFERENCES messes(id) ON DELETE CASCADE,
  menu_id UUID REFERENCES menus(id) ON DELETE CASCADE,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner')) NOT NULL,
  date DATE NOT NULL,
  quantity INTEGER NOT NULL,
  total_amount DECIMAL NOT NULL,
  platform_fee DECIMAL NOT NULL,
  status TEXT CHECK (status IN ('confirmed', 'completed', 'cancelled')) DEFAULT 'confirmed',
  payment_method TEXT NOT NULL,
  payment_status TEXT NOT NULL,
  booking_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mess_id UUID REFERENCES messes(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Availability table
CREATE TABLE availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mess_id UUID REFERENCES messes(id) ON DELETE CASCADE,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner')) NOT NULL,
  date DATE NOT NULL,
  capacity INTEGER NOT NULL,
  booked INTEGER DEFAULT 0,
  remaining INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(mess_id, meal_type, date)
);

-- Create indexes for better performance
CREATE INDEX idx_messes_location ON messes(latitude, longitude);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_mess ON bookings(mess_id);
CREATE INDEX idx_menus_mess_date ON menus(mess_id, date);
CREATE INDEX idx_availability_mess_date ON availability(mess_id, date);
```

### 3. Enable Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE messes ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

-- Create policies (simplified - adjust based on your security requirements)
CREATE POLICY "Public read access for messes" ON messes FOR SELECT USING (true);
CREATE POLICY "Public read access for menus" ON menus FOR SELECT USING (true);
CREATE POLICY "Public read access for dishes" ON dishes FOR SELECT USING (true);
CREATE POLICY "Public read access for availability" ON availability FOR SELECT USING (true);
```

### 4. Replace Mock Data with Real API Calls

The project currently uses mock data in `src/lib/mock-data.ts`. To connect to Supabase:

1. Replace mock data functions with actual Supabase queries in each component
2. Use the `supabase` client from `src/lib/supabase.ts`
3. Example replacement:

```typescript
// Before (mock data)
const messes = await getMesses(filters)

// After (Supabase)
const { data: messes, error } = await supabase
  .from('messes')
  .select('*')
  .eq('is_vegetarian', filters.foodType === 'vegetarian')
```

## Design Principles

The application follows these design principles:

- **Clean & Professional**: Warm off-white backgrounds, white cards, deep charcoal text
- **Trustworthy**: Subtle orange/amber accents for food-related CTAs
- **Practical**: Strong visual hierarchy, clear typography
- **Authentic**: Realistic food photography, home-style meal presentation
- **Responsive**: Mobile-first design with dedicated mobile navigation

## Pages Overview

### Public Pages
- `/` - Landing page with hero and search
- `/discover` - Mess discovery with filters
- `/map` - Map view of nearby messes
- `/mess/[id]` - Detailed mess page with menu
- `/how-it-works` - How it works section
- `/for-owners` - Information for mess owners
- `/help` - Help center

### Auth Pages
- `/login` - Login for users and owners
- `/register` - Registration for users and owners

### User Pages
- `/dashboard` - User dashboard with bookings
- `/book/[messId]` - Meal booking flow
- `/cancel/[bookingId]` - Booking cancellation

### Owner Pages
- `/owner-dashboard` - Owner dashboard with all management features

## Next Steps

1. **Connect Supabase**: Follow the instructions above to set up your database
2. **Add Authentication**: Implement Supabase Auth for login/registration
3. **Integrate Maps**: Connect Google Maps or Mapbox for the map view
4. **Add Payment Gateway**: Integrate Razorpay, Stripe, or similar
5. **Add Image Storage**: Set up Supabase Storage for food images
6. **Add Push Notifications**: Implement real-time booking updates
7. **Deploy**: Deploy to Vercel, Netlify, or similar platform

## License

This project is for demonstration purposes.
