import axios from "axios";
import { IoTItem, IoTGrouped, ApiResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_GROUPED_URL = process.env.NEXT_PUBLIC_API_GROUPED_URL;

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

export async function fetchIoTGroupedData(): Promise<IoTGrouped[]> {
  if (!API_GROUPED_URL) {
    throw new Error("API_GROUPED_URL is not configured");
  }

  try {
    const response = await axios.get<ApiResponse<IoTGrouped[]>>(API_GROUPED_URL, {
      withCredentials: false,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching IoT grouped data:", error);
    throw error;
  }
}
