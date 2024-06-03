import { NavComponent } from './nav.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service';
import { signal } from '@angular/core';
import { UserInterface } from '../../models/auth';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  const mockAuthService = {
    currentUserSig: signal<UserInterface>({
      token: '',
      email: '',
      username: '',
    }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavComponent],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create app-nav component', () => {
    expect(component).toBeTruthy();
  });
});
