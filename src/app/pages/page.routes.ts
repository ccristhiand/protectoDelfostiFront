import { RouterModule, Routes } from '@angular/router';
import { ListarTrackingComponent } from './tracking/listar-tracking/listar-tracking.component';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../interceptors/interceptor.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


export const routes: Routes = [
    {path: 'tracking', component: ListarTrackingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true,
  },
  {
    provide:LocationStrategy,
    useClass:HashLocationStrategy
  }
],
})
export class PageRoutingModule { }