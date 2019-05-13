import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoPage } from '../interfaces/info-page.interface';
import { equipoData } from '../interfaces/equipo-data.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {

  info: infoPage = {};
  cargada = false;

  equipo: equipoData[] = [];
  equipoCargado = false;

  constructor(private http: HttpClient) { 
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo () {
    this.http.get('assets/data/data-page.json')
      .subscribe( (resp: infoPage) => {
        this.cargada = true;
        this.info = resp;
      });
  }

  private cargarEquipo () {
    this.http.get('https://angular-portfolio-d275a.firebaseio.com/equipo.json')
      .subscribe( (resp: equipoData[]) => {
        this.equipoCargado = true;
        this.equipo = resp;
      });
  }

}
