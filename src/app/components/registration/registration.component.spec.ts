import { RegistrationComponent } from './registration.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegistrationComponent],
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create app-registration component', () => {
    expect(component).toBeTruthy();
  });
});
