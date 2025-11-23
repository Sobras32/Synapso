import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiarioListaPage } from './diario-lista.page';

describe('DiarioListaPage', () => {
  let component: DiarioListaPage;
  let fixture: ComponentFixture<DiarioListaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarioListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
