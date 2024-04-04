import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-not403',
  standalone: true,
  imports: [],
  templateUrl: './not403.component.html',
  styleUrl: './not403.component.scss'
})
export class Not403Component implements OnInit{

  constructor(
    private loginService : LoginService
  ) { }

  usuario!: string;
  
  ngOnInit(): void {
    let decodedToken = this.loginService.SearchToken();
    this.usuario =(decodedToken==null)? "" : decodedToken.descripcion;
  }
}
