import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TripModel } from '../lib/passeio.model';
import { FormsModule } from '@angular/forms';
import { PasseioService } from '../services/passeio.service';

@Component({
  selector: 'app-guide-passeio',
  templateUrl: './guide-passeio.page.html',
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class GuidePasseioPage {
  trip: TripModel = {
    name: '',
    place: '',
    startDate: new Date(),
    endDate: new Date(),
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