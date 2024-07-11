export interface vehicleData {
   data: vehicle[];
}
export interface vehicle {
  id: number;
  type: string;
  subTypes?: type[],
}

export interface type {
   type: String
}
