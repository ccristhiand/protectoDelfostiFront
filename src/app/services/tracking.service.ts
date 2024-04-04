import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';

//-importar  environment, datacoleccion y modelo
import { environment } from '../../environments/environment';
import { ProductoList, UsuarioList} from '../models/tracking/tracking.model';
import { Respons } from '../models/respons.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  //------Llamando el api de una variaboe global
  private url: string = `${environment.UrlApi2}`;

  constructor(
    private http: HttpClient
  ) { }

   GetUsuario(rol: string){
    let urls = `${this.url}/user?rol=${rol}`;
    return this.http.get<UsuarioList>(urls);
  }

  GetProducto(sku?: number){
    let urls = `${this.url}/producto?sku=${sku}`;
    return this.http.get<ProductoList>(urls);
  }

  // GetUsuario(rol?: string){
  //   let urls = `${this.url}/user?rol=${rol}`;
  //   return this.http.get<Usuario>(urls);
  // }

  // GetUsuario(rol?: string){
  //   let urls = `${this.url}/user?rol=${rol}`;
  //   return this.http.get<Usuario>(urls);
  // }



  Delete(id: number){
    let urls = `${this.url}?id=${id}`;
    return this.http.delete<Respons>(urls);
  }
}
