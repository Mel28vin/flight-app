# Flight Ticket Booking App

This Web Application uses bleeding edge technologies such as [React 18](https://react.dev/), [NextJS 13](https://nextjs.org/) (Client Components, Server Components, Server Actions and API), [Tailwind](https://tailwindcss.com/), [Supabase Auth](https://supabase.com/docs/guides/auth) and a [Postgres Database](https://www.postgresql.org/) using [Supabase](https://supabase.com/) connected using [Prisma ORM](https://www.prisma.io/). The project is deployed using [Vercel](https://vercel.com/) as shown. [Deployment Link.](https://melvin-flight-app.vercel.app/)

## About me

I'm Melvin Jebasamuel Danielraj, a Final year student of the ECE department of VCET - Madurai. [Click here to check out more about me.](https://mels.vercel.app)

## Admin Functionalities

- The `/admin/airlines` route lists all airlines with functionality to add and remove them.
- The `/admin/airports` route lists all airports with functionality to add and remove them.
- The `/admin/flights` route lists all flights with functionality to add and remove them.
- The `/admin/booking` route lists all bookings.

## User Functionalities

- The `/user/search` route searches and displays flights with respect to date, arrival airpot and departure airport and also provides the `booking` functionality.
- The `/user/booking` route lists all bookings made by that user.

## Working of the App

1. The `app` directory consists of all pages where each `folder_name` signifies a route, the `page.tsx` file represents the page content, `layout.tsx` defines the page layout and `loading.tsx` defines the loaders for each route.
1. The `app/page.tsx` is the Home page of the app and `app/layout.tsx` defines the `RootLayout` of the application.
1. The `app/api` is a special directory which is the `REST API` where each subfolder represents an `API Route` represented by the `route.ts` file.
1. From the latest NextJS and React version, we have access to both `Client Components` and `Server Components`. Client Components are explicitly marked by `"use client"` in the beginning.
1. `Client Components` make use of state hooks and other features to obtain / post / delete information from the database using the `API routes`
1. Thus the `app/api` works as the `backend` of this app using serverless functions from Vercel. (`AWS Lambda Serverless Functions`)
1. The `Server Components` can fetch data without the requirement of `api` using `async` components.
1. The `app/auth` directory specifies the main Authentication and Authorization logic.
1. The `prisma` folder defines the schemas of the Postgres database hoisted using Supabase.
1. Styling of the app is done mainly using Tailwind.

## Directory Structure

```
.
├── app
│   ├── admin
│   │   ├── airlines
│   │   │   ├── add
│   │   │   │   └── page.tsx
│   │   │   ├── delete
│   │   │   │   └── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── airports
│   │   │   ├── add
│   │   │   │   └── page.tsx
│   │   │   ├── delete
│   │   │   │   └── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── booking
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── flights
│   │   │   ├── add
│   │   │   │   └── page.tsx
│   │   │   ├── delete
│   │   │   │   └── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── admin-login
│   │   └── page.tsx
│   ├── api
│   │   ├── airlines
│   │   │   └── route.ts
│   │   ├── airports
│   │   │   └── route.ts
│   │   ├── book
│   │   │   └── route.ts
│   │   ├── find
│   │   │   └── route.ts
│   │   └── flights
│   │       └── route.ts
│   ├── auth
│   │   └── callback
│   │       └── route.ts
│   ├── globals.css
│   ├── icon.png
│   ├── layout.tsx
│   ├── login
│   │   └── page.tsx
│   ├── page.tsx
│   └── user
│       ├── booking
│       │   ├── loading.tsx
│       │   └── page.tsx
│       ├── layout.tsx
│       ├── loading.tsx
│       ├── page.tsx
│       └── search
│           ├── loading.tsx
│           └── page.tsx
├── components
│   ├── AdminNavBar.tsx
│   ├── LogoutButton.tsx
│   ├── MaterialComponents.tsx
│   ├── NoPermissions.tsx
│   └── UserNavBar.tsx
├── middleware.ts
├── next.config.js
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.js
├── prisma
│   └── schema.prisma
├── README.md
├── server
│   └── db.ts
├── supabase
│   ├── migrations
│   │   └── 20230618024722_init.sql
│   └── seed.sql
├── tailwind.config.js
└── tsconfig.json

```
