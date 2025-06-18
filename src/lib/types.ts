export type IoTItem = {
  id: string;
  jenis: string;
  tipe: string;
  jumlah: number;
};

export type IoTGroupedTipe = {
  row_no: number;
  tipe_barang: string;
  jumlah_barang: string;
};

export type IoTGroupedJenis = {
  row_no: number;
  jenis_barang: string;
  jumlah_barang: string;
};

export type ApiResponse<T> = {
  data: T;
  status: string;
};
