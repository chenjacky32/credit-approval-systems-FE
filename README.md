# Credit Approval Systems - Frontend UI

Aplikasi Frontend berbasis web untuk Credit Approval System yang dibangun menggunakan **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, dan **TanStack Query (React Query)** dengan arsitektur **Modular Component & Custom Hooks**.

---

## 🛠️ Tech Stack & Library Utama

- **Framework**: [Next.js](https://nextjs.org/) (React 19, App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Vanilla CSS Variables)
- **Data Fetching & Server State**: [TanStack Query v5](https://tanstack.com/query/latest)
- **Form Handling & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Struktur Direktori

```text
credit-approval-system-FE/
├── app/                        # Konfigurasi App Router (Next.js)
│   ├── globals.css             # Tema Utama (Tailwind CSS Variables, Animasi CSS)
│   ├── layout.tsx              # Root Layout & Sidebar Integrasi
│   ├── page.tsx                # Halaman Home/Landing
│   ├── template.tsx            # Global Route Transitions Wrapper
│   ├── login/                  # Halaman Autentikasi (Login)
│   ├── register/               # Halaman Autentikasi (Register)
│   └── submissions/            # Modul Pengajuan Kredit
│       ├── list/               # Tabel Daftar Pengajuan & Filter
│       ├── create/             # Form Pembuatan Pengajuan Baru
│       └── [id]/               # Detail Pengajuan & Aksi Approval
├── components/                 # UI Components (Reusable)
│   ├── layout/                 # Komponen Layout (Sidebar Wrapper, dll)
│   ├── providers/              # React Context Providers (QueryClient, AuthContext)
│   ├── submissions/            # Komponen Khusus Modul Pengajuan (Table, Form, dll)
│   └── ui/                     # Komponen Dasar (Button, Input, Modal, Select)
├── hooks/                      # Custom React Hooks
│   ├── use-auth.ts             # Manajemen State Login & JWT Token
│   ├── use-search-debounce.ts  # Sinkronisasi Pencarian dengan URL Parameters
│   └── use-submissions...      # Query & Mutation Handlers (Data Fetching)
├── schemas/                    # Skema Validasi Zod
│   ├── auth.ts                 # Skema Login & Register
│   └── submission.ts           # Skema Form Pengajuan
└── services/                   # Service Layer (API Calls)
    └── api.ts                  # Konfigurasi Axios & Endpoint Functions
```

---

## 🚀 Fitur Utama

1. **Sistem Autentikasi**:
   - Register & Login Nasabah / Admin.
   - Manajemen *Session* menggunakan JWT Token & React Context (`useAuth`).
   - Pendeteksian peran otomatis (_Role-Based Access Control_) tanpa panggilan API tambahan (dekode token lokal).

2. **Manajemen Pengajuan Kredit**:
   - Pembuatan Form Pengajuan baru.
   - Tabel Data dengan Pencarian *Real-time* (*Debounced*).
   - Sinkronisasi status filter tabel dengan _URL Query Parameters_ (*Deep-linking*).
   - Halaman Detail Pengajuan.
   - Fungsi Setujui (*Approve*) & Tolak (*Reject*) khusus untuk peran **Credit Analyst**.

3. **Performa & UX Optimal**:
   - Transisi halaman halus (*Smooth Route Transitions*) pada setiap pergerakan rute.
   - Sinkronisasi _cache_ data instan dengan **React Query Invalidation**.
   - Animasi *Modal* yang sangat halus berbasis status *Mounting*.

---

## 💻 Panduan Instalasi & Menjalankan Proyek

1. **Kloning Repositori**:
   ```bash
   git clone <repo-url>
   cd credit-approval-system-FE
   ```

2. **Instalasi Dependensi**:
   Pastikan Anda menggunakan `pnpm` (atau `npm`/`yarn`).
   ```bash
   pnpm install
   ```

3. **Konfigurasi Environment**:
   Pastikan backend API berjalan. Secara *default*, sistem akan memanggil API ke `http://localhost:5000/api`. Jika URL backend Anda berbeda, Anda bisa mengaturnya di berkas `.env`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Menjalankan Server Mode Pengembangan (Development)**:
   ```bash
   pnpm dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

---

## 🎨 Konvensi Desain

- **Styling**: Proyek ini dibangun murni dengan **Tailwind CSS versi 4** yang mengandalkan kapabilitas CSS Modern (kami tidak menggunakan *library UI* eksternal seperti Shadcn UI untuk menjaga struktur yang ringkas dan meminimalisasi *bloatware*).
- **Variabel Tema**: Seluruh palet warna utama (*Primary*, *Success*, *Danger*, dll) diatur secara terpusat pada file `app/globals.css` menggunakan skema variabel murni (misal: `var(--color-primary)`).
