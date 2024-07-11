import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { vehicleMockData } from '../mocks/vehicleMockData';
import { type, vehicle, vehicleData } from '../models/vehicle-interface';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private vehicleDataSource = new BehaviorSubject<type[]>([]);
  private vehicleSubTypeDataSource = new BehaviorSubject<type[] | undefined>([]);
  private vehicleDataResponse: vehicleData = { data: []};

  // Observable streams
  vehicleTypeData$ = this.vehicleDataSource.asObservable();
  vehicleSubTypeData$ = this.vehicleSubTypeDataSource.asObservable();

  constructor() { }



  getVehicleData():Observable<vehicleData> {
    // Storing the data in service variable assume this comes from as api response

    this.vehicleDataResponse = vehicleMockData;
    this.vehicleDataSource.next(this.vehicleDataResponse.data.map(vehicle => ({ type: vehicle.type})));
    // In real time we use httpClient url, method to call api, for now i'm using of to return observable mockdata.
    return of(vehicleMockData);
  }

  updateVehicleType(value: string) {
    const vehicleSubType =
                  this.vehicleDataResponse.data
                    .find(vehicle => vehicle.type === value);
    console.log('vehiclesubtype', vehicleSubType ? vehicleSubType.subTypes : []);
    this.vehicleSubTypeDataSource.next(vehicleSubType?.subTypes);
  }
}
