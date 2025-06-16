export type IoTItem = {
  id: string;
  tipe: string;
  jumlah: number;
};

export type IoTGrouped = {
  no: number;
  tipe: string;
  jumlah: number;
};

export type ApiResponse<T> = {
  data: T;
  status: string;
};
