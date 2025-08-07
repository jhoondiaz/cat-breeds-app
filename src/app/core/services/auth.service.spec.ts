import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { LoginRequest, LoginResponse, RegisterRequest, AuthUser, RegisterResponse } from '../models/api.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    userName: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockLoginResponse: LoginResponse = {
    data: {
      token: 'mock-token',
      user: {
        id: '1',
        username: 'testuser',
        email: 'test@example.com'
      }
    },
    message: 'Login successful',
    success: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should login user and store auth data', () => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123'
      };

      service.login(loginRequest).subscribe(response => {
        expect(response).toEqual(mockLoginResponse);
        expect(localStorage.getItem('token')).toBe(mockLoginResponse.data.token);
        expect(localStorage.getItem('user')).toBe(JSON.stringify(mockLoginResponse.data.user));
      });

      const req = httpMock.expectOne('http://localhost:3000/api/auth/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(loginRequest);
      req.flush(mockLoginResponse);
    });

    it('should handle login error', () => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      service.login(loginRequest).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(401);
        }
      });

      const req = httpMock.expectOne('http://localhost:3000/api/auth/login');
      req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('register', () => {
    it('should register new user', () => {
      const registerRequest: RegisterRequest = {
        email: 'new@example.com',
        username: 'newuser',
        password: 'password123'
      };

      const mockRegisterResponse: RegisterResponse = {
        data: {
          token: 'mock-token',
          user: {
            id: '1',
            username: 'newuser',
            email: 'new@example.com'
          }
        },
        message: 'Registration successful',
        success: true
      };

      service.register(registerRequest).subscribe(response => {
        expect(response).toEqual(mockRegisterResponse);
      });

      const req = httpMock.expectOne('http://localhost:3000/api/auth/register');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(registerRequest);
      req.flush(mockRegisterResponse);
    });
  });

  describe('logout', () => {
    it('should clear stored auth data', () => {
      // Set up stored data
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('user', JSON.stringify(mockUser));

      service.logout();

      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });

    it('should update observables', (done) => {
      // Set up initial state
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Create new service instance to load stored data
      service = TestBed.inject(AuthService);

      service.logout();

      service.currentUser$.subscribe(user => {
        expect(user).toBeNull();
        done();
      });
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when token exists', () => {
      localStorage.setItem('token', 'test-token');
      expect(service.isAuthenticated()).toBe(true);
    });

    it('should return false when token does not exist', () => {
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('getCurrentUser', () => {
    it('should return current user', () => {
      // Usar TestBed para crear el servicio correctamente
      const testService = TestBed.inject(AuthService);
      
      // Simular datos en localStorage
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
      
      // Llamar al método privado loadStoredAuth indirectamente
      (testService as any).loadStoredAuth();
      
      expect(testService.getCurrentUser()).toEqual(mockUser);
    });

    it('should return null when no user is stored', () => {
      expect(service.getCurrentUser()).toBeNull();
    });
  });

  describe('getToken', () => {
    it('should return stored token', () => {
      const token = 'test-token';
      localStorage.setItem('token', token);
      expect(service.getToken()).toBe(token);
    });

    it('should return null when no token is stored', () => {
      expect(service.getToken()).toBeNull();
    });
  });

  describe('loadStoredAuth', () => {
    it('should load stored auth data on service initialization', () => {
      // Usar TestBed para crear el servicio correctamente
      const testService = TestBed.inject(AuthService);
      
      // Simular datos en localStorage con las claves correctas
      spyOn(localStorage, 'getItem').and.callFake((key: string) => {
        if (key === 'authToken') return 'test-token';
        if (key === 'currentUser') return JSON.stringify(mockUser);
        return null;
      });

      // Llamar al método privado loadStoredAuth indirectamente
      (testService as any).loadStoredAuth();
      
      expect(testService.getCurrentUser()).toEqual(mockUser);
      expect(testService.getToken()).toBe('test-token');
    });

    it('should handle corrupted user data', () => {
      const testService = TestBed.inject(AuthService);
      
      spyOn(localStorage, 'getItem').and.callFake((key: string) => {
        if (key === 'authToken') return 'test-token';
        if (key === 'currentUser') return 'invalid-json';
        return null;
      });
      
      spyOn(localStorage, 'removeItem');
      // Llamar al método privado loadStoredAuth indirectamente
      (testService as any).loadStoredAuth();
      
      expect(testService.getCurrentUser()).toBeNull();
      expect(testService.getToken()).toBeNull();
    });
  });
});
