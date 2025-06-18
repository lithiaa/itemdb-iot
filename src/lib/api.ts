import axios from "axios";
import { IoTItem, IoTGroupedTipe, IoTGroupedJenis, ApiResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_GROUPED_TIPE_URL = process.env.NEXT_PUBLIC_API_GROUPED_TIPE_URL;
const API_GROUPED_JENIS_URL = process.env.NEXT_PUBLIC_API_GROUPED_JENIS_URL;

export async function fetchIoTData(): Promise<IoTItem[]> {
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not configured");
  }

  try {
    const response = await axios.get<ApiResponse<IoTItem[]>>(API_BASE_URL, {
      withCredentials: false,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching IoT data:", error);
    throw error;
  }
}

export async function fetchIoTGroupedTipeData(): Promise<IoTGroupedTipe[]> {
  if (!API_GROUPED_TIPE_URL) {
    throw new Error("API_GROUPED_TIPE_URL is not configured");
  }

  try {
    const response = await axios.get<ApiResponse<IoTGroupedTipe[]>>(API_GROUPED_TIPE_URL, {
      withCredentials: false,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching IoT grouped by tipe data:", error);
    throw error;
  }
}

export async function fetchIoTGroupedJenisData(): Promise<IoTGroupedJenis[]> {
  if (!API_GROUPED_JENIS_URL) {
    throw new Error("API_GROUPED_JENIS_URL is not configured");
  }

  try {
    const response = await axios.get<ApiResponse<IoTGroupedJenis[]>>(API_GROUPED_JENIS_URL, {
      withCredentials: false,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching IoT grouped by jenis data:", error);
    throw error;
  }
}

