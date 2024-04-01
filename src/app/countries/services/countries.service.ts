import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1";

  constructor(private http: HttpClient) { }

  //Metodo para buscar por codigo, agregamos un map con una validacion para que retorne un unico Country
  searchByAlphaCode(code: string): Observable<Country | null> {
    const url: string = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries!.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      )
  }

  // Metodo que Unifica las busquedas
  getCountriesRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(()=> of([])),
        delay(2000)
      )
  }

  //Metodo para buscar por capital
  searchByCapital(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url);

  }

  //Metodo para buscar por pais
  searchByCountry(term: string): Observable<Country[]>{
    const url: string = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url);
  }

  //Metodo para buscar por region
  searchByRegion(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/region/${term}`;
    return this.getCountriesRequest(url);
  }



}
