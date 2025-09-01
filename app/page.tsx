"use client";

import Chat from "@/components/Chat";

import { columns } from "@/components/applications/columns";
import { DataTable } from "@/components/applications/data-table";
import LogoutButton from "@/components/LogoutButton";
import { useApplication } from "@/hooks/useApplications";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ApplicationTableSkeleton } from "@/components/ApplicationTableSkeleton";
import ButtonSkeleton from "@/components/ui/ButtonSkeleton";

export default function HomePage() {
  const { status } = useSession();
  const { loading, error, applications } = useApplication();

  return (
    <main className="grid min-h-dvh grid-cols-4 bg-gray-100">
      {/* Columna 1: Chat */}
      <Chat />

      {/* Columna 2-4: Applications Table */}
      <section className="col-span-3 p-6">
        <header className="mb-6 flex items-center justify-between">
          <h2 className="mb-4 text-2xl font-bold">Applications Table</h2>
          {loading ? (
            <ButtonSkeleton />
          ) : status === "authenticated" ? (
            <LogoutButton />
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </header>

        {loading && <ApplicationTableSkeleton rows={3} />}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!loading && !error && (
          <DataTable columns={columns} data={applications} />
        )}
      </section>
    </main>
  );
}
