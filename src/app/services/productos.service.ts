import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productosIdx } from '../interfaces/productos-idx.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: productosIdx[] = [];
  cargando = true;

  constructor( private http: HttpClient ) { 

    this.cargarProductos();

  }

  private cargarProductos () {

    this.http.get('https://angular-portfolio-d275a.firebaseio.com/productos_idx.json')
      .subscribe( (resp: productosIdx[]) => {
        this.productos = resp;
        this.cargando = false;
      });

  }
}
