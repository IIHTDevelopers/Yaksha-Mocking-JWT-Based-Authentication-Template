import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    // Clear localStorage after each test
    localStorage.clear();
  });

  describe('business', () => {
    it('should save the token to localStorage', () => {
      const mockToken = 'fake-jwt-token';
      service.saveToken(mockToken);

      expect(localStorage.getItem('jwtToken')).toBe(mockToken);  // Verify the token is saved in localStorage
    });

    it('should retrieve the token from localStorage', () => {
      const mockToken = 'fake-jwt-token';
      localStorage.setItem('jwtToken', mockToken);

      const token = service.getToken();

      expect(token).toBe(mockToken);  // Verify the token is retrieved correctly
    });

    it('should remove the token from localStorage', () => {
      const mockToken = 'fake-jwt-token';
      localStorage.setItem('jwtToken', mockToken);

      service.removeToken();

      expect(localStorage.getItem('jwtToken')).toBeNull();  // Verify the token is removed from localStorage
    });

    it('should return true if the token is valid', () => {
      const payload = { username: 'testUser', role: 'user', exp: Math.floor(Date.now() / 1000) + 3600 }; // Token expires in 1 hour
      const base64Payload = btoa(JSON.stringify(payload));
      const token = `fake-header.${base64Payload}`; // Mock token without signature

      localStorage.setItem('jwtToken', token);

      const result = service.isTokenValid();

      expect(result).toBe(true);  // Token should be valid since it's not expired
    });

    it('should return false if the token is expired', () => {
      const payload = { username: 'testUser', role: 'user', exp: Math.floor(Date.now() / 1000) - 3600 }; // Token expired 1 hour ago
      const base64Payload = btoa(JSON.stringify(payload));
      const token = `fake-header.${base64Payload}`; // Mock token without signature

      localStorage.setItem('jwtToken', token);

      const result = service.isTokenValid();

      expect(result).toBe(false);  // Token should be expired
    });

    it('should return true if the user is authenticated', () => {
      const mockUser = { username: 'testUser', role: 'user' };
      localStorage.setItem('user', JSON.stringify(mockUser));  // Mock user in localStorage

      service.isAuthenticated.subscribe((isAuthenticated) => {
        expect(isAuthenticated).toBe(true);  // User should be authenticated
      });
    });

    it('should return false if the user is not authenticated', () => {
      localStorage.removeItem('user');  // Remove user from localStorage

      service.isAuthenticated.subscribe((isAuthenticated) => {
        expect(isAuthenticated).toBe(false);  // User should not be authenticated
      });
    });

    it('should return a token when credentials are correct', () => {
      const username = 'testUser';
      const password = 'password123';

      // Mock successful login response
      const expectedToken = 'fake-jwt-token';
      service.login(username, password).subscribe((response) => {
        expect(response.token).toBe(expectedToken);  // Ensure the returned token matches the expected one
      });
    });

    it('should throw an error if credentials are incorrect', () => {
      const username = 'wrongUser';
      const password = 'wrongPassword';

      // Mock failed login response
      service.login(username, password).subscribe(
        () => { },
        (error) => {
          expect(error.message).toBe('Invalid username or password');  // Ensure the error message is correct
        }
      );
    });

    it('should remove the token and redirect to login', () => {
      const mockToken = 'fake-jwt-token';
      localStorage.setItem('jwtToken', mockToken);

      // Call the logout method
      service.logout();

      expect(localStorage.getItem('jwtToken')).toBeNull();  // Ensure the token is removed from localStorage
    });
  });
});
