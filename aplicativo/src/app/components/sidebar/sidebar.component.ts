import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { PreferencesService } from 'src/app/services/preferences.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SidebarComponent implements OnInit {

  constructor(public loginService: LoginService, public preferencesService: PreferencesService, public router: Router) { }

  ngOnInit() {
    console.log(this.loginService.user)
    console.log(this.router.url);
  }

}
