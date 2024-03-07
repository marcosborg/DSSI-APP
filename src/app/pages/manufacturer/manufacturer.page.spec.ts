import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManufacturerPage } from './manufacturer.page';

describe('ManufacturerPage', () => {
  let component: ManufacturerPage;
  let fixture: ComponentFixture<ManufacturerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManufacturerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
