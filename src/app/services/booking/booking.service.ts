import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITable } from 'src/app/models/ITable';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  getTables() {
    return this.http.get<ITable[]>('http://localhost:3000/tables');
  }
}
