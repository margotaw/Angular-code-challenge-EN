import { vehicleData } from "../models/vehicle-interface";

export const vehicleMockData: vehicleData = {
  data: [
    {
      id: 1,
      type: 'auto',
      subTypes: [
        { type: 'Hatchback' },
        { type: 'Sedan' },
        { type: 'Station' },
        { type: 'Cabriolet' },
        { type: 'Coupé' },
        { type: 'Multi Purpose Vehicle (MVP)' },
        { type: 'Terreinauto' },
      ],
    },
    {
      id: 2,
      type: 'motor',
      subTypes: [
        { type: 'All-road' },
        { type: 'Naked' },
        { type: 'Enduro' },
        { type: 'Race' },
        { type: 'Toermotor' },
        { type: 'Chopper' },
        { type: 'Zijspan' },
      ],
    },
    {
      id: 3,
      type: 'scooter',
    },
  ],
};
