import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

//-importar  environment, datacoleccion y modelo
import { environment } from '../../environments/environment';
import { Login, Token, Usuario } from '../models/seguridad/login.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
}) 
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  //------Llamando el api de una variaboe global
  private url: string = `${environment.UrlApi}/user/login`;

  Post(model: Login){
    let urls = `${this.url}`;
    return this.http.post<Usuario>(urls, model);
  }

  RefreshToken(){
    let urls = `${this.url}/PostRefreshToken`;
    let model = new Usuario();

    model.token = localStorage.getItem(environment.Access_Token)!;

    return this.http.post<Usuario>(urls, model);
  }

  Savetoken(data: Usuario){
    localStorage.setItem(environment.Access_Token, data.token!);
  }

  SearchToken(){
    let helper = new JwtHelperService();
    let data = localStorage.getItem(environment.Access_Token);

    let token = data!.substring(3)
    token = token.substring(0, token.length - 3)

      if(token!=null){
        let decodedToken = helper.decodeToken(token!);     
        return decodedToken;
      }else{
        return null
      }
  }

  CloseLogin(){
    localStorage.clear();
    window.location.reload();
  }

}
