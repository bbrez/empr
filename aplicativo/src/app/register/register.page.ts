import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { LoginService } from "../services/login.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class RegisterPage {
  error: string = '';

  user = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
  }

  confirmPassword = '';

  constructor(private router: Router, private loginService: LoginService) { }

  onSubmit() {
    console.log(this.user);
    // if (this.user.password != this.confirmPassword) return;

    // if (this.loginService.register(this.user)) {
    //   this.router.navigate(['/login']);
    // }
  }
}