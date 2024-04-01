import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [ `
    img {
      width: 200px;
    }
  `
  ]
})
export class CountryPageComponent implements OnInit{

  // Variable para almacenar el pais
  country?: Country;

  // Se inyecta servicio para obtener los parametros de la ruta
  constructor(private activatedRoute: ActivatedRoute,
              private countriesService: CountriesService,
              private router: Router){}


  ngOnInit(): void {
    // Obtiene el los parametros de la ruta, se obtien el id con destructuracion, se ven los conceptos de pipe y switchMap
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.countriesService.searchByAlphaCode(id)
        )
      )
      .subscribe( country => {
        if(!country){
          return this.router.navigateByUrl('')
        }
        console.log(country)
        return this.country = country;
      })
  }



}
