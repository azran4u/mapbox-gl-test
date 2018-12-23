import { Component, OnInit } from '@angular/core';
import { Map, LngLat, LngLatLike, GeoJSONSourceRaw, GeoJSONSource, GeoJSONGeometry } from 'mapbox-gl';
import { FeatureCollection } from 'geojson';

@Component({
  selector: 'app-source-multiple-features',
  templateUrl: './source-multiple-features.component.html',
  styleUrls: ['./source-multiple-features.component.css']
})
export class SourceMultipleFeaturesComponent implements OnInit {

  map: Map;
  style = 'mapbox://styles/mapbox/streets-v9';
  center: LngLatLike = [35, 35];

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
      this.mapClickEventHandler();
      this.showElements();
    })
  }

  mapClickEventHandler() {
    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat];
      this.center = coordinates;
      console.log(this.center);
    })
  }

  flyTo(data: LngLat) {
    this.center = [data.lng, data.lat];
    this.map.flyTo({
      center: this.center
    })
  };


  centerMap() {
    console.log(`centerMap : ${this.center}`);
    this.map.flyTo({
      center: this.center
    });
  }

  changeMapStyle() {
    this.style = 'mapbox://styles/mapbox/light-v9';
    this.map.setStyle(this.style);
  }

  showElements(){
    
    let featureCollection: FeatureCollection = {
      type: 'FeatureCollection',
      features: []
    };    

    let featurePoint: GeoJSON.Feature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [35, 35]
      },
      properties: {
        title: 'point'
      }
    }

    let lng = 35;
    let lat = 35;
    let offset = 1;
    let featurePoligon: GeoJSON.Feature = {
      type: 'Feature',
      geometry: {
          type: 'Polygon',
          coordinates: [[
              [lng+offset, lat+offset],
              [lng+offset, lat-offset],
              [lng-offset, lat-offset],                
              [lng-offset, lat+offset]
          ]]
      },
      properties: null

    }

    featureCollection.features.push(featurePoint as GeoJSON.Feature);
    featureCollection.features.push(featurePoligon as GeoJSON.Feature);

    let geojsonSource: GeoJSONSourceRaw = {
      type: 'geojson',
      data: featureCollection
    }

    this.map.addSource('source', geojsonSource);

    this.map.loadImage('../../../../assets/fighter-jet.png', (err, image) => {
      if (err) throw err;
      this.map.addImage('bycicle', image);
    })

    this.map.addLayer({
      id: 'pointLayer',
      type: 'symbol',
      source: 'source',
      layout: {
        // "text-field": "{title}",
        "text-font": ["Arial Unicode MS Bold"],
        "text-offset": [0, -3],
        "text-anchor": "top",
        "icon-image": 'bycicle',
        "icon-allow-overlap": true,
        "text-allow-overlap": true,
        "icon-size": 1
      },
      paint: {
        "text-color": '#000'
      }
    });

    (<GeoJSONSource>this.map.getSource('source')).setData(featureCollection as GeoJSON.FeatureCollection<GeoJSONGeometry>);

  }

}
