import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeexamComponent } from './takeexam.component';

describe('TakeexamComponent', () => {
  let component: TakeexamComponent;
  let fixture: ComponentFixture<TakeexamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeexamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
