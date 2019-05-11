import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoPage } from '../interfaces/info-page.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {

  info: infoPage = {};
  cargada = false;

  constructor(private http: HttpClient) { 
    // console.log('Carga del servicio InfoPage');

    this.http.get('assets/data/data-page.json')
      .subscribe( (resp: infoPage) => {
        this.cargada = true;
        this.info = resp;
      });
  }
}
