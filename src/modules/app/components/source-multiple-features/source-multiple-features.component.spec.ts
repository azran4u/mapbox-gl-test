import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceMultipleFeaturesComponent } from './source-multiple-features.component';

describe('SourceMultipleFeaturesComponent', () => {
  let component: SourceMultipleFeaturesComponent;
  let fixture: ComponentFixture<SourceMultipleFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceMultipleFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceMultipleFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
