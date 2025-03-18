import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    // Mock AuthService and Router with correct types
    authService = {
      isTokenValid: jest.fn(),
      logout: jest.fn(),
      getToken: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    router = { navigate: jest.fn() } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [RouterTestingModule],  // Using RouterTestingModule for navigation testing
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the DashboardComponent', () => {
      expect(component).toBeTruthy();
    });

    it('should redirect to login if token is invalid or expired', () => {
      // Simulate token invalid scenario
      authService.isTokenValid.mockReturnValue(false);

      component.ngOnInit();

      // Ensure that the user is redirected to login page
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should call logout and navigate to login when logout button is clicked', () => {
      // Simulate token valid scenario
      authService.isTokenValid.mockReturnValue(true);

      // Trigger logout
      const logoutButton = fixture.debugElement.nativeElement.querySelector('button');
      logoutButton.click();

      // Ensure logout is called
      expect(authService.logout).toHaveBeenCalled();

      // Ensure that the user is redirected to login page
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
