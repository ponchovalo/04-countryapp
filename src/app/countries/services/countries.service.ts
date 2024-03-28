import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1";

  constructor(private http: HttpClient) { }

  //Metodo para buscar por capital
  searchByCapital(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/capital/${term}`;
    return this.http.get<Country[]>(url);
  }



}
