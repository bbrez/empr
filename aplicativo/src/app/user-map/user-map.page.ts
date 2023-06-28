import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import * as L from 'leaflet';
import { Map } from 'leaflet';

import { Geolocation } from "@capacitor/geolocation";
import { ActivatedRoute } from '@angular/router';
import { PasseioService } from '../services/passeio.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-map',
  templateUrl: './user-map.page.html',
  styleUrls: ['./user-map.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class UserMapPage implements OnInit {

  userPosition: any;
  userMarker: L.Marker | undefined;
  followUser: boolean = true;

  trip: any;
  tripArea: L.Circle | undefined;
  tripMeetingPoint: L.Marker | undefined;

  map: Map | undefined;

  constructor(private passeiosService: PasseioService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.passeiosService.getPasseio(params['id']).subscribe({
          next: (data: any) => {
            data.areaCenter = JSON.parse(data.areaCenter);
            data.meetingPoint = JSON.parse(data.meetingPoint);
            this.trip = data;
            console.log(this.trip);

            this.tripArea = L.circle([this.trip.areaCenter.lat, this.trip.areaCenter.lng], {
              radius: this.trip.areaRadius,
              color: 'red',
              fillColor: '#f03',
              fillOpacity: 0.2
            });

            this.tripMeetingPoint = L.marker([this.trip.meetingPoint.lat, this.trip.meetingPoint.lng], {
              icon: L.icon({
                iconUrl: 'assets/flag.png', 
                iconSize: [32, 32],
                iconAnchor: [0, 32],
              })
            });

            if(this.map){
              this.tripArea.addTo(this.map);
              this.tripMeetingPoint.addTo(this.map);
            }
          }
        })
      }
    })


    Geolocation.checkPermissions().then((result) => {
      if (result.location == 'prompt') {
        Geolocation.requestPermissions();
      }
    });

    // this.userPosition = Geolocation.getCurrentPosition().then((position) => {
    //     return position;
    // });
    this.userPosition = [0, 0];

    this.map = L.map('map', {
      zoomControl: false,
      attributionControl: false,
    }).setView(this.userPosition, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    setTimeout(() => {
      if(!this.map) return;

      this.map.invalidateSize();
    }, 200);

    this.map.addEventListener('drag', () => {
      this.followUser = false;
    })

    Geolocation.watchPosition({
      enableHighAccuracy: true,
    }, (position, err) => {
      if (!this.map) return;

      if (position) {
        this.userPosition = position;

        if (!this.userMarker)
          this.userMarker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(this.map);
          this.userMarker.bindTooltip('Você está aqui!');

        this.userMarker.setLatLng([position.coords.latitude, position.coords.longitude]);

        if (this.followUser)
          this.map.setView([position.coords.latitude, position.coords.longitude]);
      }

      if (err) {
        console.log(err);
      }
    })
  }

  centerOnUser() {
    if (!this.map) return;

    this.map.setView([this.userPosition.coords.latitude, this.userPosition.coords.longitude], 16);
    this.followUser = true;
  }

  emergency() {
    console.log(this.userPosition);
  }
}