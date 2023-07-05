<script setup lang="ts">
import { GoogleMap } from "@capacitor/google-maps";
import { Geolocation } from "@capacitor/geolocation";
import { onMounted, ref } from "vue";

const apiKey = "AIzaSyBCKwDld9KM0ijTSFQ-aczrLA77-_1wCvU";

const position = ref({
  latitude: 0,
  longitude: 0
});

const map = ref(null as any);
onMounted(() => {
  Geolocation.checkPermissions().then((res) => {
    if (res.location === 'granted') {
      Geolocation.getCurrentPosition().then((res) => {
        position.value = res.coords;
      }).catch((err) => {
        console.log(err);
      })
    }
  })

  const mapElement = document.getElementById('map');
  if (!mapElement) return;
  map.value = GoogleMap.create({
    id: 'map',
    apiKey: apiKey,
    element: mapElement,
    config: {
      center: {
        lat: position.value.latitude,
        lng: position.value.longitude
      },
      zoom: 14
    }
  })
})
</script>

<template>
  <ion-page>
    <capacitor-google-map id="map" style="display: block; height: 100vh, width: 100vw"></capacitor-google-map>
  </ion-page>
</template>