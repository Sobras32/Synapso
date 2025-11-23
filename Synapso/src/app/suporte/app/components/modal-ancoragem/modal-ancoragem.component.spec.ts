import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalAncoragemComponent } from './modal-ancoragem.component';

describe('ModalAncoragemComponent', () => {
  let component: ModalAncoragemComponent;
  let fixture: ComponentFixture<ModalAncoragemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalAncoragemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAncoragemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
