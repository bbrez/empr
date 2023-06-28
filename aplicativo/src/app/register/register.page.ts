import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { LoginService } from "../services/login.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone: true,
  imports: [IonicModule, FormsModule],
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

  constructor(private router: Router, private loginService: LoginService) {}

  submitForm() {
    if(this.user.password != this.confirmPassword) return;
    
      if(this.loginService.register(this.user)) {
        this.router.navigate(['/login']);
      }
  }
}