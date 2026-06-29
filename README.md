# Lenimen Biotech Enterprise Suite & CRM Portal

A modern, highly polished, full-stack enterprise portal and CRM administration panel designed for **Lenimen Biotech Private Limited**. This system acts as a central hub for managing pharmaceutical formulations, reviewing job applications, tracking CRM leads, and publishing company news.

---

## 🚀 Key Features

*   **🔒 Secure Light-Theme Auth Gateway:** Standardized, enterprise-grade login panel featuring lock-icon inputs, password visibility toggles, and clean hover state transitions.
*   **💊 Dynamic Catalog Administration:** Full CRUD capability to add, edit, and remove pharmaceutical formulations, including brand names, compositions, therapeutic groups, dosage forms, and product image uploads.
*   **🔎 Null-Safe Global Search:** Instant header search field with a dropdown popover that categorizes matching entries across products, applicants, careers, CRM leads, and news updates simultaneously.
*   **📧 CRM Lead Management:** Real-time log of customer inquiries with detailed status tracking and communication logs.
*   **💼 Careers & Applicant Tracker:** Job openings management dashboard coupled with a centralized tracker for incoming applications and resume records.
*   **📰 News Announcement Editor:** Create, update, and delete company announcements that hot-reload directly onto the client homepage.

---

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
*   **Styling:** Vanilla CSS Custom Variables (Harmonious Teal/Navy enterprise color palette)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Database:** [SQLite](https://www.sqlite.org/) with [Prisma ORM](https://www.prisma.io/)

---

## 💻 Getting Started

### 1. Installation

Install the project dependencies using npm:

```bash
npm install
```

### 2. Run Database Migrations

Generate your database client and run migration schema updates:

```bash
npx prisma generate
npx prisma db push
```

### 3. Start Development Server

Run the local development server (configured on port `3001`):

```bash
npm run dev
```

Open [http://localhost:3001/admin](http://localhost:3001/admin) to access the CRM portal.

### 4. Build for Production

Compile optimized static and dynamic pages:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```
