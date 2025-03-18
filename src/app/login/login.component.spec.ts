import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    // Mock AuthService and Router
    authService = {
      login: jest.fn(),
      saveToken: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    router = { navigate: jest.fn() } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule], // Using RouterTestingModule for routing-related tests
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection to render the template
  });

  describe('boundary', () => {
    it('should display the username input field', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('#username')).toBeTruthy(); // Check presence of the username input field
    });

    it('should display the password input field', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('#password')).toBeTruthy(); // Check presence of the password input field
    });

    it('should display the login button', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('button[type="submit"]')).toBeTruthy(); // Check presence of the login button
    });

    it('should display the error message section when errorMessage is set', () => {
      const compiled = fixture.nativeElement;
      component.errorMessage = 'Invalid credentials'; // Simulate an error message
      fixture.detectChanges(); // Trigger change detection

      const errorMessageElement = compiled.querySelector('.error');
      expect(errorMessageElement).toBeTruthy(); // Ensure the error message section is displayed

      const errorMessageText = compiled.querySelector('.error p').textContent;
      expect(errorMessageText).toContain('Invalid credentials'); // Ensure the error message is correct
    });

    it('should display the username label correctly', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('label[for="username"]').textContent).toBe('Username'); // Ensure correct label for username
    });

    it('should display the password label correctly', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('label[for="password"]').textContent).toBe('Password'); // Ensure correct label for password
    });
  });
});
