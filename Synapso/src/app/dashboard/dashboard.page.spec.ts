import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoodDashboardPage } from './dashboard.page';

describe('dashboardPage', () => {
  let component: MoodDashboardPage;
  let fixture: ComponentFixture<MoodDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
