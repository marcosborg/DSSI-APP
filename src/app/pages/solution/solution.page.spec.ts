import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolutionPage } from './solution.page';

describe('SolutionPage', () => {
  let component: SolutionPage;
  let fixture: ComponentFixture<SolutionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SolutionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
