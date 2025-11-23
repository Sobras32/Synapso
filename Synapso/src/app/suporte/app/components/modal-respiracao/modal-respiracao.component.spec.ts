import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalRespiracaoComponent } from './modal-respiracao.component';

describe('ModalRespiracaoComponent', () => {
  let component: ModalRespiracaoComponent;
  let fixture: ComponentFixture<ModalRespiracaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalRespiracaoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRespiracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
