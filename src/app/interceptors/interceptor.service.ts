import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(
    private loginService : LoginService
  ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let helper = new JwtHelperService();
    let token =localStorage.getItem(environment.Access_Token);
    let request = req;

    if (!helper.isTokenExpired(token!)){
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
     }

     request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

     return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {       
          let errorMsg = '';
          if(error.status === 401){           
           return this.handleRefreshToken(req,next);
          }
          else if (error.error instanceof ErrorEvent) {            
              errorMsg = `Error: ${error.error.message}`;
              // this.notifierService.showNotification(0,"Error",errorMsg);
              // this.spinner.hideLoading();
          } else {
              errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
              // this.notifierService.showNotification(0,"Error",errorMsg);
              // this.spinner.hideLoading();
          }    
          return throwError(errorMsg);      
         })
      );
  }

  handleRefreshToken(req: HttpRequest<any>, next: HttpHandler){
    return this.loginService.RefreshToken().pipe(
     switchMap((data:any)=>{
       this.loginService.Savetoken(data);
         return next.handle(this.AddTokenheader(req, data.access_token));
     }),
     catchError(errorMsg => {
       this.loginService.CloseLogin();
       return throwError(errorMsg);      
     })
    );
   }
 
   AddTokenheader(req: HttpRequest<unknown>, token:unknown){
     return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
   }
  
}
