import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {

  countries: Country[] = [];

  constructor(private countriesService: CountriesService){}

  searchByCountry(term: string){
    this.countriesService.searchByCountry(term)
      .subscribe( countries => {
        this.countries = countries;
      })
  }

}
