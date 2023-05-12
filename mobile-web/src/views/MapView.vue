<script setup lang="ts">
import { onMounted } from 'vue';
import { Geolocation } from '@capacitor/geolocation';

import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import * as L from 'leaflet';
import { useAuthStore } from '@/stores/authStore';

const auth = useAuthStore();

let map: L.Map;
let myLocation: L.LatLngTuple;
let myMarker: L.Marker;
let socket: Socket;
let otherMarkers: any[] = [];

async function getCurrentLocation(): Promise<L.LatLngTuple> {
    const coordinates = await Geolocation.getCurrentPosition();
    return [coordinates.coords.latitude, coordinates.coords.longitude];
}


onMounted(async () => {
    myLocation = await getCurrentLocation();
    map = L.map('map', {
        attributionControl: false,
        zoomControl: false,
    }).setView(myLocation, 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        detectRetina: true,
    }).addTo(map);

    myMarker = L.marker(myLocation).addTo(map).bindPopup('You are here!');

    Geolocation.watchPosition({
        enableHighAccuracy: true,
    }, async () => {
        myLocation = await getCurrentLocation();
        socket.emit('updateLocation', { location: { lat: myLocation[0], lng: myLocation[1] } });
        map.setView(myLocation);
        myMarker.setLatLng(myLocation);
    });
});

const connect = async () => {
    socket = io('http://empreendedorismo.dynv6.net', {
        auth: { token: auth.accessToken }
    });

    socket.emit('joinRoom', { tripId: 1 });
    socket.emit('updateLocation', { location: { lat: myLocation[0], lng: myLocation[1] } });

    socket.on('newMarker', async (data) => {
        let marker = null;
        if (data.name == 'tripArea') {
            marker = L.circle(
                [data.location.lat, data.location.lng],
                {
                    radius: data.radius,
                    color: 'blue',
                }
            ).addTo(map).bindPopup(data.name);
        } else {
            marker = L.marker([data.location.lat, data.location.lng]).addTo(map).bindPopup(data.name);
        }
        otherMarkers.push({ data, marker });
    });
}
</script>

<template>
    <div id="map" style="height: 80vh;"></div>
    <div class="container">
        {{ myLocation }}
        {{ otherMarkers }}
    </div>
</template>