<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as L from "leaflet"
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import type { User } from "@/lib/model/user";

interface MapUser extends User {
  lat: number;
  lng: number;
}

let socket: Socket;
let map: L.Map;
let myLocation = [51.505, -0.09];
let otherUsers: MapUser[] = [];
let mapMarkers = [];
onMounted(() => {
  map = L.map("map").setView([51.505, -0.09], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
  }).addTo(map);

  map.on("click", (e) => {
    console.log(e.latlng);
  });
});

const connect = async () => {
  socket = io("http://localhost:3000");

  trip.value = trip.value.split(":")[1];
  socket.emit('joinRoom', trip.value);
  socket.emit('updateLocation', { lat: myLocation[0], lng: myLocation[1] });

  socket.on("userLocationUpdated", (data) => {
    console.log('👋  userLocationUpdated: ', data);
    const user = otherUsers.find((u) => u.id === data.id);
    if (user) {
      user.lat = data.lat;
      user.lng = data.lng;
    } else {
      otherUsers.push(data);
    }
  });

  socket.on("userJoined", (data) => {
    console.log('👋  userJoined: ', data);
    otherUsers.push(data);
  });
}

let trip = ref("");
</script>

<template>
  <div class="container">
    <div id="map" class="mb-3"></div>
    <div class="row mb-3">
      <div class="col">
        <button class="btn btn-primary" @click="connect()">Connect</button>
      </div>
      <div class="col">
        <label for="tripInput" class="form-label">Trip</label>
        <input type="text" id="tripInput" class="form-control" placeholder="id:1 or name:NY Shopping" v-model="trip">
      </div>
    </div>
  </div>
</template> 

<style scoped>
#map {
  height: 800px;
}
</style>