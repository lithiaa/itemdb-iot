"use client";

import { DataTable } from "@/components/DataTable";
import { columns } from "@/lib/Columns";
import { sampleData } from "@/lib/data";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Data Barang IoT</h1>
        <p className="text-muted-foreground">
          Kelola data barang dengan dimensi dan informasi lengkap.
        </p>
      </div>
      
      <DataTable columns={columns} data={sampleData} />
    </div>
  );
}