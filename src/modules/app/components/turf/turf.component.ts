import { Component, OnInit } from '@angular/core';
import { Map, LngLat, LngLatLike, GeoJSONSourceRaw, Layer, GeoJSONGeometry, GeoJSONSource } from 'mapbox-gl';
import * as turf from '@turf/turf'
import { FeatureCollection } from 'geojson';

@Component({
  selector: 'app-turf',
  templateUrl: './turf.component.html',
  styleUrls: ['./turf.component.css']
})
export class TurfComponent implements OnInit {

  map: Map;
  style = 'mapbox://styles/mapbox/streets-v9';
  center: LngLatLike = [-75.343, 39.984];

  constructor() {
  }

  ngOnInit() {
    this.initializeMap();
  }


  initializeMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXpyYW40dSIsImEiOiJjam9rMDhqZzMwOXMwM3dxYWF3ZTd6ZjN2In0.3nut3OCPi9M0kL3cZ1JKtQ';
    mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.0/mapbox-gl-rtl-text.js', (err) => { console.log(err) });
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 6,
      center: this.center,
      renderWorldCopies: false
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', (event) => {
      this.drawSector();
      this.drawGeodesicLine();
    })
  }

  drawSector() {
    var center = turf.point([-75, 40]);
    var radius = 100;
    var bearing1 = 0;
    var bearing2 = 30;

    var sector = turf.sector(center, radius, bearing1, bearing2);

    this.map.addLayer({
      'id': 'maine',
      'type': 'fill',
      'source': {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': null,
          'geometry': {
            'type': 'Polygon',
            'coordinates': sector.geometry.coordinates
          }
        }
      },
      'layout': {},
      'paint': {
        'fill-color': '#088',
        'fill-opacity': 0.8
      }
    });

  }

  drawGeodesicLine() {
    var point = turf.point([-75.343, 39.984]);
    var distance = 50;
    var bearing = 90;
    var options = { units: 'miles' };

    var destination = turf.destination(point, distance, bearing);

    var greatCircle = turf.greatCircle(point, destination);

    var geojson: FeatureCollection = {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "properties": null,
        "geometry": {
          "type": "LineString",
          // "properties": {},
          "coordinates": greatCircle.geometry.coordinates
        }
      }]
    };

    this.map.addLayer({
      "id": "LineString",
      "type": "line",
      "source": {
        "type": "geojson",
        "data": geojson
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#BF93E4",
        "line-width": 5
      }
    });

    this.map.addLayer({
      "id": "points",
      "type": "circle",
      "source": {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": [{
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": point.geometry.coordinates
            },
            "properties": null
          }, {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": destination.geometry.coordinates
            },
            "properties": null
          }]
        }
      },
      "layout": {      
      }
    });

  }
}
