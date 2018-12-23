import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './components/app/app.component';
import { PlanesComponent } from './components/planes/planes.component';
import { BasicComponent } from './components/basic/basic.component';
import { HebrewComponent } from './components/hebrew/hebrew.component';
import { AnimationComponent } from './components/animation/animation.component';
import { SourceMultipleFeaturesComponent } from './components/source-multiple-features/source-multiple-features.component';
import { TurfComponent } from './components/turf/turf.component';

@NgModule({
  declarations: [AppComponent, PlanesComponent, BasicComponent, HebrewComponent, AnimationComponent, SourceMultipleFeaturesComponent, TurfComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
