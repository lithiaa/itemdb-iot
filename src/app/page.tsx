"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/DataTable";
import { iotColumns, iotGroupedColumns } from "@/lib/iot-columns";
import { fetchIoTData, fetchIoTGroupedData } from "@/lib/api";
import { IoTItem, IoTGrouped } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [iotData, setIoTData] = useState<IoTItem[]>([]);
  const [groupedData, setGroupedData] = useState<IoTGrouped[]>([]);
  const [loadingIoT, setLoadingIoT] = useState(false);
  const [loadingGrouped, setLoadingGrouped] = useState(false);
  const [errorIoT, setErrorIoT] = useState<string | null>(null);
  const [errorGrouped, setErrorGrouped] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("iot");

  const loadIoTData = async () => {
    setLoadingIoT(true);
    setErrorIoT(null);
    try {
      const data = await fetchIoTData();
      setIoTData(data);
    } catch (error) {
      setErrorIoT(error instanceof Error ? error.message : "Failed to load data");
    } finally {
      setLoadingIoT(false);
    }
  };

  const loadGroupedData = async () => {
    setLoadingGrouped(true);
    setErrorGrouped(null);
    try {
      const data = await fetchIoTGroupedData();
      setGroupedData(data);
    } catch (error) {
      setErrorGrouped(error instanceof Error ? error.message : "Failed to load data");
    } finally {
      setLoadingGrouped(false);
    }
  };

  useEffect(() => {
    if (activeTab === "iot") {
      loadIoTData();
    } else {
      loadGroupedData();
    }
  }, [activeTab]);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-center md:text-left">
          Data IoT Management
        </h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList
          className="grid w-64 grid-cols-2 mx-auto md:mx-0"
        >
          <TabsTrigger value="iot">Individual</TabsTrigger>
          <TabsTrigger value="grouped">Group</TabsTrigger>
        </TabsList>

        <TabsContent value="iot" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data IoT Individual</CardTitle>
              <div className="flex justify-end">
                <Button onClick={loadIoTData} disabled={loadingIoT}>
                  {loadingIoT ? "Loading..." : "Refresh Data"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={iotColumns}
                data={iotData}
                loading={loadingIoT}
                error={errorIoT}
                filterColumn="tipe"
                filterPlaceholder="Filter tipe..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grouped" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data IoT Grouped</CardTitle>
              <div className="flex justify-end">
                <Button onClick={loadGroupedData} disabled={loadingGrouped}>
                  {loadingGrouped ? "Loading..." : "Refresh Data"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={iotGroupedColumns}
                data={groupedData}
                loading={loadingGrouped}
                error={errorGrouped}
                filterColumn="tipe"
                filterPlaceholder="Filter tipe..."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}