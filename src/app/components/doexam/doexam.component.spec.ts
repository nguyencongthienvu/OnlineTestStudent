import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoexamComponent } from './doexam.component';

describe('DoexamComponent', () => {
  let component: DoexamComponent;
  let fixture: ComponentFixture<DoexamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoexamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
