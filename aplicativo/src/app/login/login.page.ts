import { Component, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LoginPage {
  error: string = '';
  carregando = false;

  user = {
    email: '',
    password: '',
  };

  @ViewChild('loginForm', { static: false })
  loginForm!: NgForm;

  constructor(private router: Router, private loginService: LoginService) { }

  onSubmit() {
    if (!this.loginForm.valid) return;
    this.carregando = true;
    this.loginService.login(this.user);
    console.log("test");
    this.router.navigate(['/']);
    console.log("test");
    this.carregando = false;
  }
}
