import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productosIdx } from '../interfaces/productos-idx.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: productosIdx[] = [];
  cargando = true;
  
  productoFiltrado: productosIdx[] = [];

  constructor( private http: HttpClient ) { 

    this.cargarProductos();

  }

  private cargarProductos () {

    return new Promise ( (resolve, reject) => {

      this.http.get('https://angular-portfolio-d275a.firebaseio.com/productos_idx.json')
      .subscribe( (resp: productosIdx[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });      

    });

  }

  getProducto (id: string) {
    return this.http.get(`https://angular-portfolio-d275a.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto ( termino: string) {
    
    if ( this.productos.length === 0 ) {
      // esperar
      this.cargarProductos().then( ()=> {
        // cuando ya se tengan los productos
        // Aplicar filtro
        this.filtrarProductos( termino );

      });
    }
    else {
      // filtrar
      this.filtrarProductos( termino );
    }

  }

  private filtrarProductos( termino: string ) {
    this.productoFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach ( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      const categoriaLower = prod.categoria.toLocaleLowerCase();

      if ( categoriaLower.indexOf(termino) >=0 || tituloLower.indexOf( termino ) >= 0) {
        this.productoFiltrado.push( prod );
      }

    });
  }
}
