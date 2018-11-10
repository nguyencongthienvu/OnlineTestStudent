import { TestBed, inject } from '@angular/core/testing';

import { CourseServiceService } from './course-service.service';

describe('CourseServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseServiceService]
    });
  });

  it('should be created', inject([CourseServiceService], (service: CourseServiceService) => {
    expect(service).toBeTruthy();
  }));
});
