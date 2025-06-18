"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/DataTable";
import { iotColumns, iotGroupedTipeColumns, iotGroupedJenisColumns } from "@/lib/iot-columns";
import { fetchIoTData, fetchIoTGroupedTipeData, fetchIoTGroupedJenisData } from "@/lib/api";
import { IoTItem, IoTGroupedTipe, IoTGroupedJenis } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [iotData, setIoTData] = useState<IoTItem[]>([]);
  const [groupedTipeData, setGroupedTipeData] = useState<IoTGroupedTipe[]>([]);
  const [groupedJenisData, setGroupedJenisData] = useState<IoTGroupedJenis[]>([]);
  
  const [loadingIoT, setLoadingIoT] = useState(false);
  const [loadingGroupedTipe, setLoadingGroupedTipe] = useState(false);
  const [loadingGroupedJenis, setLoadingGroupedJenis] = useState(false);
  
  const [errorIoT, setErrorIoT] = useState<string | null>(null);
  const [errorGroupedTipe, setErrorGroupedTipe] = useState<string | null>(null);
  const [errorGroupedJenis, setErrorGroupedJenis] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState("iot");
  const [activeGroupedTab, setActiveGroupedTab] = useState("tipe");

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

  const loadGroupedTipeData = async () => {
    setLoadingGroupedTipe(true);
    setErrorGroupedTipe(null);
    try {
      const data = await fetchIoTGroupedTipeData();
      setGroupedTipeData(data);
    } catch (error) {
      setErrorGroupedTipe(error instanceof Error ? error.message : "Failed to load data");
    } finally {
      setLoadingGroupedTipe(false);
    }
  };

  const loadGroupedJenisData = async () => {
    setLoadingGroupedJenis(true);
    setErrorGroupedJenis(null);
    try {
      const data = await fetchIoTGroupedJenisData();
      setGroupedJenisData(data);
    } catch (error) {
      setErrorGroupedJenis(error instanceof Error ? error.message : "Failed to load data");
    } finally {
      setLoadingGroupedJenis(false);
    }
  };

  useEffect(() => {
    if (activeTab === "iot") {
      loadIoTData();
    } else if (activeTab === "grouped") {
      if (activeGroupedTab === "tipe") {
        loadGroupedTipeData();
      } else {
        loadGroupedJenisData();
      }
    }
  }, [activeTab, activeGroupedTab]);

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
          <Tabs value={activeGroupedTab} onValueChange={setActiveGroupedTab} className="w-full">
            <TabsList className="grid w-64 grid-cols-2 mx-auto md:mx-0 mb-4">
              <TabsTrigger value="tipe">By Tipe</TabsTrigger>
              <TabsTrigger value="jenis">By Jenis</TabsTrigger>
            </TabsList>

            <TabsContent value="tipe">
              <Card>
                <CardHeader>
                  <CardTitle>Data IoT Grouped by Tipe</CardTitle>
                  <div className="flex justify-end">
                    <Button onClick={loadGroupedTipeData} disabled={loadingGroupedTipe}>
                      {loadingGroupedTipe ? "Loading..." : "Refresh Data"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <DataTable
                    columns={iotGroupedTipeColumns}
                    data={groupedTipeData}
                    loading={loadingGroupedTipe}
                    error={errorGroupedTipe}
                    filterColumn="tipe_barang"
                    filterPlaceholder="Filter tipe..."
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="jenis">
              <Card>
                <CardHeader>
                  <CardTitle>Data IoT Grouped by Jenis</CardTitle>
                  <div className="flex justify-end">
                    <Button onClick={loadGroupedJenisData} disabled={loadingGroupedJenis}>
                      {loadingGroupedJenis ? "Loading..." : "Refresh Data"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <DataTable
                    columns={iotGroupedJenisColumns}
                    data={groupedJenisData}
                    loading={loadingGroupedJenis}
                    error={errorGroupedJenis}
                    filterColumn="jenis_barang"
                    filterPlaceholder="Filter jenis..."
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}