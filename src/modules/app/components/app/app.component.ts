import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadPlanesFlag: Boolean;
  loadBasicFlag: Boolean;
  loadAnimationFlag: Boolean;
  loadHebrewFlag: Boolean;
  appSourceMultipleFeaturesFlag: Boolean;
  appTurfFlag: Boolean;

  constructor() { }

  ngOnInit() {
    this.loadPlanesFlag = false;
    this.loadBasicFlag = false;
    this.loadAnimationFlag = false;
    this.loadHebrewFlag = false;
    this.appSourceMultipleFeaturesFlag = false;
    this.appTurfFlag = false;
  }

  loadPlanes(){
    this.loadPlanesFlag = true;
  }

  loadBasic(){
    this.loadBasicFlag = true;
  }

  loadAnimation(){
    this.loadAnimationFlag = true;
  }

  loadHebrew(){
    this.loadHebrewFlag = true;
  }

  loadSourceMultipleFeatures(){
    this.appSourceMultipleFeaturesFlag = true;
  }

  loadTurf(){
    this.appTurfFlag = true;
  }
}
