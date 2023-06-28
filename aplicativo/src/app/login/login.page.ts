import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class LoginPage {
  error: string = '';

  user = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private loginService: LoginService) {}

  submitForm() {
    this.loginService.logIn(this.user);
    this.router.navigate(['/']);
  }
}
