import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMethodsComponent } from './login-methods.component';

describe('LoginMethodsComponent', () => {
  let component: LoginMethodsComponent;
  let fixture: ComponentFixture<LoginMethodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
