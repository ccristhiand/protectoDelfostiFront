import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

//-importar  model y servicio
import { TrackingService } from '../../../services/tracking.service';
import { Datacollecion } from '../../../models/datacollecion.model';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginService } from '../../../services/login.service';
import { Usuario } from '../../../models/seguridad/login.model';
import { DetallePedidoList,ProductoList, UsuarioList } from '../../../models/tracking/tracking.model';


@Component({
  selector: 'app-listar-tracking',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './listar-tracking.component.html',
  styleUrl: './listar-tracking.component.scss'
})
export class ListarTrackingComponent implements OnInit{  
  fechaActual = new Date()
  fechaAyer = new Date()
  //------Definir el constructor los servicios
  constructor(
    private _trackingService:TrackingService,
    private loginService:LoginService
    ){

    }

  //------Inicializando el modelo
  dataSourceUsuario: UsuarioList[] = [];
  dataSourceProducto: ProductoList[]=[];
  dataSourcePedidoDetalle: DetallePedidoList[]=[];
  usuario: string = '';
  
  resultAddTomaMuestra:string=""
  resultAddLaboratorio:string=""
  
  codAddTomaMuestra:string=""
  codAddLaboratorio:string=""

  codigomuestra?:string=""

  dataSourceParamsList={
    text: "",
    dateInit: this.fechaAnterior(),
    dateEnd:  this.fechaPosterior(),
    area: 1,
    idHospital: 1
  }

  Rol:string="";
  Sku:number=0;
  Pedido:number=0;

  datacollecion: Datacollecion[] = [];
    
   //-----Iniciliazar por defecto
  ngOnInit(): void {
    this.listarUsuario();
    this.listarProducto();
    this.listarPedidoDetalle()
    let token= this.loginService.SearchToken();
    this.usuario = token.usuario;
    console.log(this.dataSourceParamsList);
    
  }

     //-----creacion de metodos

  listarUsuario(){
    this._trackingService.GetUsuario(this.Rol).subscribe( (res:any)=>{
      this.dataSourceUsuario =res;
      console.log(this.dataSourceUsuario);
    })
  }

  listarProducto(){
    this._trackingService.GetProducto(this.Sku).subscribe( (res:any)=>{
      this.dataSourceProducto =res;
      console.log(this.dataSourceProducto);
    })
  }
  listarPedidoDetalle(){
    this._trackingService.GetPedidoDetalle(this.Pedido).subscribe( (res:any)=>{
      this.dataSourcePedidoDetalle =res;
      console.log(this.dataSourcePedidoDetalle);
    })
  }


  fechaAnterior(){
    var fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() - 1);
    var fechaRestada = fechaActual.toISOString().slice(0, 10);
    return fechaRestada;
  }
  fechaPosterior(){
    var fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() +1);
    var fechaRestada = fechaActual.toISOString().slice(0, 10);
    return fechaRestada;
  }
}
