import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CardPasseioPage } from './card-passeio/card-passeio.page';
import { CommonModule } from '@angular/common';
import { PasseioService } from '../services/passeio.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-lista-passeio',
  templateUrl: './lista-passeio.page.html',
  styleUrls: ['./lista-passeio.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, CardPasseioPage]
})
export class ListaPasseioPage implements OnInit {
  passeios = [];

  constructor(private passeioService: PasseioService, public loginService: LoginService) { }

  ngOnInit() {
    console.log(this.loginService.user);
    this.passeioService.getPasseios().subscribe({
      next: (passeios: any) => {
        console.log(passeios);
        this.passeios = passeios;
      }
    });
  }
}