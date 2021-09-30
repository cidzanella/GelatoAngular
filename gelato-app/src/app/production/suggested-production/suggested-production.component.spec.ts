import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedProductionComponent } from './suggested-production.component';

describe('SuggestedProductionComponent', () => {
  let component: SuggestedProductionComponent;
  let fixture: ComponentFixture<SuggestedProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestedProductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
