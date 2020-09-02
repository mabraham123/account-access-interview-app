import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpensessionsComponent } from './opensessions.component';

describe('OpensessionsComponent', () => {
  let component: OpensessionsComponent;
  let fixture: ComponentFixture<OpensessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpensessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpensessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
