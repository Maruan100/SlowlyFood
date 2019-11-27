import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCardInfoComponent } from './food-card-info.component';

describe('FoodCardInfoComponent', () => {
  let component: FoodCardInfoComponent;
  let fixture: ComponentFixture<FoodCardInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodCardInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
