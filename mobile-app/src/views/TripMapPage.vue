<script setup lang="ts">
import { Geolocation } from "@capacitor/geolocation";
import L from "leaflet";
import { onMounted, ref } from "vue";
import topbar from "@/components/TopBarComponent.vue";
import { io } from "socket.io-client";
import { useAuthStore } from "@/stores/authStore";
import { useRoute } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();

const position = ref({
  latitude: 0,
  longitude: 0
});

let myMarker = null as any

const socket = io('https://empr.bbrez.dev', {
  auth: {
    token: authStore.accessToken.value
  }
});

socket.on('connect', () => {
  console.log('connected');
  socket.emit('joinRoom', { tripId: route.params.id });
})

socket.on('newMarker', (data) => {
  console.log(data);
  data.location = JSON.parse(data.location);

  if (data.name == 'meetingPoint') {
    L.marker([data.location.lat, data.location.lng]).addTo(map).bindPopup('Ponto de encontro');
  }

  if (data.name == 'tripArea') {
    L.circle([data.location.lat, data.location.lng], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.2,
      radius: data.data
    }).addTo(map);
  }
})

let map = null as any;
onMounted(() => {
  Geolocation.checkPermissions().then((res) => {
    if (res.location == 'prompt') Geolocation.requestPermissions();

    if (res.location === 'granted') {
      Geolocation.getCurrentPosition().then((res) => {
        position.value = res.coords;
      }).catch((err) => {
        console.log(err);
      })

      Geolocation.watchPosition({ enableHighAccuracy: true }, (res) => {
        if (res == null) return;
        position.value = res.coords;
        map.setView([position.value.latitude, position.value.longitude], 15);
        myMarker.setLatLng([position.value.latitude, position.value.longitude]);
        map.invalidateSize();
      });

      map = L.map('map', {
        zoomControl: false,
        attributionControl: false,
      }).setView([position.value.latitude, position.value.longitude], 15);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);
      map.invalidateSize();

      myMarker = L.marker([position.value.latitude, position.value.longitude]).addTo(map).bindPopup('Você está aqui!');
    }
  })
})
</script>

<template>
  <ion-page>
    <topbar :title="'Mapa do Passeio'" :back-target="'/lista-passeios'"></topbar>
    <div id="map" style="height: 100%"></div>
  </ion-page>
</template>