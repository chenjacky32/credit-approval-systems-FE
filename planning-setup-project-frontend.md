# Frontend Implementation Plan: Credit Approval System

Berdasarkan dokumen `planning.txt`, berikut adalah rencana implementasi untuk membangun frontend aplikasi Credit Approval System.

## Wireframes (ASCII)

### 1. Login Page

```
+---------------------------------------------------------+
|                                                         |
|       +-----------------------------------------+       |
|       |          Credit Approval System         |       |
|       |                                         |       |
|       |  Username                               |       |
|       |  [___________________________________]  |       |
|       |                                         |       |
|       |  Password                               |       |
|       |  [___________________________________]  |       |
|       |                                         |       |
|       |  [               LOGIN               ]  |       |
|       |                                         |       |
|       |  Belum punya akun? Register             |       |
|       +-----------------------------------------+       |
|                                                         |
+---------------------------------------------------------+
```

### 2. Register Page

```
+---------------------------------------------------------+
|                                                         |
|       +-----------------------------------------+       |
|       |          Credit Approval System         |       |
|       |                                         |       |
|       |  Full Name                              |       |
|       |  [___________________________________]  |       |
|       |                                         |       |
|       |  Username                               |       |
|       |  [___________________________________]  |       |
|       |                                         |       |
|       |  Password                               |       |
|       |  [___________________________________]  |       |
|       |                                         |       |
|       |  [             REGISTER              ]  |       |
|       |                                         |       |
|       |  Sudah punya akun? Login                |       |
|       +-----------------------------------------+       |
|                                                         |
+---------------------------------------------------------+
```

### 3. Submission List Page (Dashboard)

```
+---------------------------------------------------------+
| [Logo]              Pengajuan    |   [User] [Logout]    |
+---------------------------------------------------------+
|                                                         |
|  Daftar Pengajuan                                       |
|  +---------------------------+ +--------------------+   |
|  | Search by name...         | | Filter: All Status |   |
|  +---------------------------+ +--------------------+   |
|                                [ + Buat Pengajuan ]     |
|                                                         |
|  +---------------------------------------------------+  |
|  | Nama       | Tipe | Nominal | Tenor | Status | Aksi |  |
|  +---------------------------------------------------+  |
|  | John Doe   | MTR  | 10 Juta | 12 bln| SUBMIT | [..] |  |
|  | Jane Doe   | MBL  | 50 Juta | 24 bln| APPROVE| [..] |  |
|  | Budi S     | MLT  | 5 Juta  | 6 bln | REJECT | [..] |  |
|  +---------------------------------------------------+  |
|                                                         |
|  [< Prev]  Page 1 of 5  [Next >]                        |
+---------------------------------------------------------+
```

_(Aksi akan memunculkan menu dropdown / tombol langsung: Detail, Setujui, Tolak)_

### 4. Submission Create Page

```
+---------------------------------------------------------+
| [Logo]              Pengajuan    |   [User] [Logout]    |
+---------------------------------------------------------+
|                                                         |
|  < Kembali                                              |
|  Buat Pengajuan Baru                                    |
|                                                         |
|  Nama Lengkap Nasabah                                   |
|  [___________________________________________________]  |
|                                                         |
|  Tipe Pengajuan                                         |
|  [ (v) Sepeda Motor | ( ) Mobil | ( ) Multiguna      ]  |
|                                                         |
|  Nominal Pengajuan                                      |
|  [ Rp. ______________________________________________]  |
|                                                         |
|  Tenor (Bulan)                                          |
|  [___________________________________________________]  |
|                                                         |
|  Pendapatan Bulanan Nasabah                             |
|  [ Rp. ______________________________________________]  |
|                                                         |
|  Catatan                                                |
|  [___________________________________________________]  |
|  [___________________________________________________]  |
|                                                         |
|  [ Batal ]                            [ Submit Data ]   |
|                                                         |
+---------------------------------------------------------+
```

### 5. Submission Detail Page & Update Status (Modal)

```
+---------------------------------------------------------+
| [Logo]              Pengajuan    |   [User] [Logout]    |
+---------------------------------------------------------+
|                                                         |
|  < Kembali                                              |
|  Detail Pengajuan #1                                    |
|                                                         |
|  Status: [ SUBMIT ]                                     |
|                                                         |
|  Informasi Nasabah:                                     |
|  Nama Lengkap      : John Doe                           |
|  Tipe Pengajuan    : Sepeda Motor                       |
|  Nominal Pengajuan : Rp. 10.000.000                     |
|  Tenor             : 12 Bulan                           |
|  Tagihan Per Bulan : Rp. 3.000.000                      |
|  Tanggal Pengajuan : 01 Jan 2022                        |
|                                                         |
|  Aksi:                                                  |
|  [   Setujui Pengajuan  ]    [   Tolak Pengajuan   ]    |
|                                                         |
+---------------------------------------------------------+

=================== UPDATE STATUS MODAL ===================
+-----------------------------------------+
| Konfirmasi Persetujuan                  |
|                                         |
| Apakah Anda yakin ingin menyetujui      |
| pengajuan dari John Doe?                |
|                                         |
| [ Batal ]                  [ Setujui ]  |
+-----------------------------------------+
```

## Proposed Architecture & File Structure

### Konfigurasi Global & Tema

- **`app/globals.css`**
  Akan ditambahkan konfigurasi CSS variable (berdasarkan standard Tailwind CSS v4) untuk menampung warna sesuai `planning.txt` (`--color-primary`, `--color-heading`, dsb.).

### Core & Layouts

- **`app/layout.tsx`**
  Mengimplementasikan setup untuk `<QueryClientProvider>` dari TanStack Query (via context providers client component) agar seluruh aplikasi bisa menggunakan features fetching and caching. Serta menerapkan font Inter menggunakan `next/font/google`.
  Ditambahkan juga **Layout Sidebar** di dalam layout utama ini untuk menampilkan menu navigasi secara global (terimplementasi di semua halaman).

### Pages / Routes

- **`app/login/page.tsx`**
  Halaman untuk form Login. Menggunakan custom components (bukan shadcn).

- **`app/register/page.tsx`**
  Halaman untuk form Register.

- **`app/page.tsx`** (atau `app/submissions/page.tsx`)
  Halaman utama (Dashboard) yang menampilkan list pengajuan. Menggunakan TanStack Table untuk merender grid data, lengkap dengan pagination dan filter status. Memanggil data via TanStack Query.

- **`app/submissions/create/page.tsx`**
  Halaman form pengajuan baru. Menghandle input sesuai requirement (tipe pengajuan, nominal, tenor, pendapatan, notes) dan submit data mutation dengan TanStack Query.

- **`app/submissions/[id]/page.tsx`**
  Halaman detail pengajuan. Menampilkan detail spesifik data. Terdapat tombol Approve/Reject yang men-trigger modal pop-up konfirmasi.

### Components (Custom, Tanpa Eksternal UI Library)

- `components/ui/Button.tsx`
- `components/ui/Input.tsx`
- `components/ui/Select.tsx` (untuk filter & pilihan tipe)
- `components/ui/Modal.tsx`
- `components/ui/Table.tsx` (Wrapper untuk visual TanStack Table)

### Services / API Layer

- **`services/api.ts`**
  Berisi definisi tipe data (Interfaces / Types TypeScript) untuk request & response, serta menggunakan library `axios` untuk melakukan data fetching yang akan di-consume oleh TanStack Query (`useQuery` / `useMutation`).
