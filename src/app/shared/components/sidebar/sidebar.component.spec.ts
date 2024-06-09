import { SidebarComponent } from './sidebar.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../../features/auth/services/auth.service';
import { signal } from '@angular/core';
import { UserInterface } from '../../../features/auth/models/auth';
import { provideRouter } from '@angular/router';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  const mockAuthService = {
    currentUserSig: signal<UserInterface>({
      token: '',
      email: '',
      username: '',
    }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create app-sidebar component', () => {
    expect(component).toBeTruthy();
  });
});
