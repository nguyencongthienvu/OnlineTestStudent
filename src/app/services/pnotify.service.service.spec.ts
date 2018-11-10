import { TestBed, inject } from '@angular/core/testing';

import { Pnotify.ServiceService } from './pnotify.service.service';

describe('Pnotify.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Pnotify.ServiceService]
    });
  });

  it('should be created', inject([Pnotify.ServiceService], (service: Pnotify.ServiceService) => {
    expect(service).toBeTruthy();
  }));
});
