import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/seguridad/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { Not404Component } from './components/not404/not404.component';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptors/interceptor.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


export const routes: Routes = [
    {path: '', pathMatch:'full',redirectTo:'login'},
    {path:'', component: LoginComponent,},
    {path:'login',component: LoginComponent},

    
    {
        path:'pages',
        component: LayoutComponent,
        loadChildren: () => import('./pages/page.routes').then(m => m.routes)
      },
      {path: 'not-404', component: Not404Component },
      {path: '**',redirectTo: 'not-404'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
      {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide:LocationStrategy,
      useClass:HashLocationStrategy
    }
  ],
  })
  export class AppRoutingModule { }
  