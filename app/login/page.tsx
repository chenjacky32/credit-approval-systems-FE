"use client";

import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useLogin } from "@/hooks/use-login";

export default function LoginPage() {
  const { handleSubmit, mutation, errorMsg, authLoading } = useLogin();

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-[var(--color-border)] w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-primary)]">Credit Approval System</h1>
          <p className="text-gray-500 mt-2">Silakan login ke akun Anda</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Email" 
            name="email" 
            type="email"
            placeholder="Masukkan email" 
            required 
            disabled={mutation.isPending || authLoading}
          />
          <Input 
            label="Password" 
            name="password" 
            type="password" 
            placeholder="Masukkan password" 
            required 
            disabled={mutation.isPending || authLoading}
          />
          
          <Button 
            type="submit" 
            className="w-full mt-6" 
            disabled={mutation.isPending || authLoading}
          >
            {mutation.isPending ? "Memproses..." : "LOGIN"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link href="/register" className="text-[var(--color-primary)] font-medium hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
