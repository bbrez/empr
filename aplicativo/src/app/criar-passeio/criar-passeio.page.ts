import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TripModel } from '../lib/passeio.model';
import { FormsModule } from '@angular/forms';
import { PasseioService } from '../services/passeio.service';

@Component({
  selector: 'app-criar-passeio',
  templateUrl: './criar-passeio.page.html',
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class CriarPasseioPage {
  trip: TripModel = {
    name: '',
    place: '',
    startDate: '',
    endDate: '',
    isActivated: false,
  }

  error = '';

  constructor(private passeioService: PasseioService) { }

  submitForm() {
    this.passeioService.registraPasseio(this.trip).subscribe({
      next: (data) => {
        console.log(data);
      },

      error: (error) => {
        console.log(error);
        this.error = error.error.message;
      }
    });
  }
}