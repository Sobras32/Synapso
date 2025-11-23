import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalEmergenciaComponent } from './modal-emergencia.component';

describe('ModalEmergenciaComponent', () => {
  let component: ModalEmergenciaComponent;
  let fixture: ComponentFixture<ModalEmergenciaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalEmergenciaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalEmergenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
