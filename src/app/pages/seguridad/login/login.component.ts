import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { Login } from '../../../models/seguridad/login.model'
import { LoginService } from '../../../services/login.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements  OnInit {

  constructor(
    private router: Router,
    private loginService : LoginService
  ) 
  {}

  input: any;
  logo?: string = environment.UrlImage + "logo.png";
  model = new Login();
  ngOnInit(): void {
  }

  login() {

    if (this.model.correo == null || this.model.password == "") {
      if (this.model.correo == null || this.model.password == "") {
      }
      else if (this.model.password == null || this.model.password == "") {
      }

    } else {

      this.loginService.Post(this.model).subscribe(data => {
          localStorage.setItem(environment.Access_Token, data.token!);
          this.router.navigate(['/pages/tracking']);
          this.input.focus();
          this.input.select();
      });
    }
  }

  focus(name: any, input: any, btn: string = "") {
    this.input = input;
    if (btn == "btnlogin") {
      this.login();
    } else {
      name.focus();
      name.select();
    }
  }

}
