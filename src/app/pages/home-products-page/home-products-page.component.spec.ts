import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductsPageComponent } from './home-products-page.component';

describe('HomeProductsPageComponent', () => {
  let component: HomeProductsPageComponent;
  let fixture: ComponentFixture<HomeProductsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeProductsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
