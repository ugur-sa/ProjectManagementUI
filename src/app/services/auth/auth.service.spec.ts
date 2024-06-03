import { AuthService } from './auth.service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  LoginRequest,
  RegisterRequest,
  UserInterface,
} from '../../models/auth';
import { provideRouter, Router } from '@angular/router';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  const realWorldAPI = 'https://api.realworld.io/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);

    Storage.prototype.setItem = jest.fn();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create auth service', () => {
    expect(authService).toBeTruthy();
  });

  describe('login', () => {
    it('should return logged in user', () => {
      const loginRequest: LoginRequest = {
        email: 'ugur@gmail.com',
        password: 'ugur',
      };

      const mockResponse: { user: UserInterface } = {
        user: {
          email: 'ugur@gmail.com',
          username: 'ugur',
          token: 'token',
        },
      };

      let actualRes: { user: UserInterface } | undefined;

      authService.login(loginRequest).subscribe(response => {
        actualRes = response;
      });

      const req = httpTestingController.expectOne(
        `${realWorldAPI}/users/login`
      );
      req.flush(mockResponse);

      expect(req.request.method).toBe('POST');

      expect(actualRes).toEqual({
        user: {
          email: 'ugur@gmail.com',
          username: 'ugur',
          token: 'token',
        },
      });
    });
  });

  describe('register', () => {
    it('should return registered user', () => {
      const registerRequest: RegisterRequest = {
        email: 'ugur@gmail.com',
        username: 'ugur',
        password: 'ugur',
      };

      const mockResponse: { user: UserInterface } = {
        user: {
          email: 'ugur@gmail.com',
          username: 'ugur',
          token: 'token',
        },
      };

      let actualRes: { user: UserInterface } | undefined;

      authService.register(registerRequest).subscribe(response => {
        actualRes = response;
      });

      const req = httpTestingController.expectOne(`${realWorldAPI}/users`);
      req.flush(mockResponse);

      expect(req.request.method).toBe('POST');

      expect(actualRes).toEqual({
        user: {
          email: 'ugur@gmail.com',
          username: 'ugur',
          token: 'token',
        },
      });
    });
  });

  describe('logout', () => {
    it('should log user out', () => {
      const navigateSpy = jest.spyOn(router, 'navigateByUrl');

      authService.logout();

      expect(localStorage.setItem).toHaveBeenCalledWith('token', '');
      expect(authService.currentUserSig()).toBe(null);
      expect(navigateSpy).toHaveBeenCalledWith('/login');
    });
  });
});
