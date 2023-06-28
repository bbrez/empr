import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TripModel } from '../lib/passeio.model';
import { FormsModule } from '@angular/forms';
import { PasseioService } from '../services/passeio.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-manager-passeio',
  templateUrl: './manager-passeio.page.html',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class ManagerPasseioPage implements OnInit {
  id = 0;

  trip: TripModel = {
    name: '',
    place: '',
    startDate: '',
    endDate: '',
    isActivated: false,
  }

  userToAdd = '';

  error = '';

  constructor(private passeioService: PasseioService, private acitvatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.acitvatedRoute.params.subscribe({
      next: (params) => {
        this.id = params['id'];
        this.passeioService.getPasseio(params['id']).subscribe({
          next: (data) => {
            let tempTrip = data as TripModel;
            tempTrip.startDate = moment(tempTrip.startDate).format('YYYY-MM-DDTHH:mm');
            tempTrip.endDate = moment(tempTrip.endDate).format('YYYY-MM-DDTHH:mm');
            this.trip = tempTrip;

            console.log(this.trip);
          }
        })
      }
    }) 
  }

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

  addUser() {
    this.passeioService.addUserToTrip(this.id, this.userToAdd).subscribe({
      next: (data) => {
        console.log(data);
      }
    });
  }
}