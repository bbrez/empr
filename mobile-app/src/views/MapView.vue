<script setup lang="ts">
import { onMounted } from 'vue';
import { Geolocation } from '@capacitor/geolocation';

import * as L from 'leaflet';

let map: L.Map;
let myLocation: L.LatLngTuple;
let myMarker: L.Marker;

async function getCurrentLocation(): Promise<L.LatLngTuple> {
    const coordinates = await Geolocation.getCurrentPosition();
    return [coordinates.coords.latitude, coordinates.coords.longitude];
}



onMounted(async () => {
    myLocation = await getCurrentLocation();
    map = L.map('map').setView(myLocation, 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        detectRetina: true,
    }).addTo(map);

    myMarker = L.marker(myLocation).addTo(map).bindPopup('You are here!');

    Geolocation.watchPosition({
        enableHighAccuracy: true,
    }, async () => {
        myLocation = await getCurrentLocation();
        map.setView(myLocation);
        myMarker.setLatLng(myLocation);
    });
});
</script>

<template>
    <div id="map" style="height: 80vh;"></div>
    <div class="container">
        {{ myLocation }}
    </div>
</template>