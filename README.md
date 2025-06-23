# 🚀 Next.js TODO App

A modern, full‑stack TODO application built with Next.js, TypeScript, Prisma, ShadCN UI and Zod—featuring client/server components, real‑time validation, and a clean, accessible UI.

## 🔍 Features

- **Create, Read, Update, Delete** (CRUD) your tasks
- **Date & Time picker** with calendar UI
- **Form validation** on both client and server via Zod
- **Type‑safe database layer** powered by Prisma & PostgreSQL
- **Responsive dialog-driven UI** using ShadCN components
- **Live search/filter of your TODO list**

## 🛠️ Tech Stack

- **Next.js 15** (App Router + Server Actions)
- **TypeScript** for end‑to‑end type safety
- **Prisma** ORM + PostgreSQL
- **Zod** for schema validation & coercion
- **ShadCN/ui** + Tailwind CSS for components & styling
- **React Hooks** & Client Components for interactivity

## 🚀 Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/your‑username/nextjs-todo-app.git
   cd nextjs-todo-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure your database**

   - Configure your PostgreSQL database, I used docker to set it up.
   - Set your DATABASE_URL variable in the .env file.
   - These will be the same credentials used in docker-compose file.

   ```bash
   DATABASE_URL="postgresql://USER:PASSWORD@127.0.0.1:5432/DBNAME"
   ```

4. **Run Migrations**

   Make sure you have prisma installed.

   ```bash
   npx prisma migrate dev --name init
   ```

   You need to generate prisma client as well.

   ```bash
   npx prisma generate client
   ```

5. **Run the development server**:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
