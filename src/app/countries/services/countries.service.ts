import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1";

  //Inicializando el Store para la persistencia de los datos en los cambios de componentes
  public cacheStore: CacheStore = {
    byCapital: {term: '', countries: []},
    byCountries: {term: '', countries: []},
    byRegion: {region: '', countries: []}
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage()
  }

  //Metodos para salvar y guardar en el localStorage
  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
  }


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
        //delay(2000)
      )
  }

  //Metodo para buscar por capital
  searchByCapital(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        // Mandando los datos al store
        tap(countries => this.cacheStore.byCapital = {term, countries}),
        tap(()=>this.saveToLocalStorage())
      );

  }

  //Metodo para buscar por pais
  searchByCountry(term: string): Observable<Country[]>{
    const url: string = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byCountries = {term, countries}),
      tap(()=>this.saveToLocalStorage())
    );
  }

  //Metodo para buscar por region
  searchByRegion(region: Region): Observable<Country[]> {
    const url: string = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byRegion = {region, countries}),
      tap(()=>this.saveToLocalStorage())
    );
  }



}
