import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-admin-empresas',
  templateUrl: './admin-empresas.page.html',
  styleUrls: ['./admin-empresas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AdminEmpresasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
