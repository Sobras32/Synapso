import { TestBed } from '@angular/core/testing';

import { Diario } from './diario.service';

describe('Diario', () => {
  let service: Diario;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Diario);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
