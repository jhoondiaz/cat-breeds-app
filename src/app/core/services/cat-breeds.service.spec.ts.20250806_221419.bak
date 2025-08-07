import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CatBreedsService } from './cat-breeds.service';
import { CatBreed, CatImage } from '../models/cat-breed.model';

describe('CatBreedsService', () => {
  let service: CatBreedsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatBreedsService]
    });
    service = TestBed.inject(CatBreedsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllBreeds', () => {
    it('should fetch all breeds', () => {
      const mockBreeds = [
        { 
          id: '1', 
          name: 'Persian',
          origin: 'Iran',
          temperament: 'Calm, Affectionate',
          description: 'A beautiful long-haired cat breed',
          life_span: '12 - 17',
          weight: { imperial: '7 - 12', metric: '3 - 5' }
        },
        { 
          id: '2', 
          name: 'Siamese',
          origin: 'Thailand',
          temperament: 'Active, Social',
          description: 'An intelligent and vocal cat breed',
          life_span: '15 - 20',
          weight: { imperial: '6 - 10', metric: '3 - 4' }
        }
      ];

      service.getAllBreeds().subscribe(breeds => {
        expect(breeds).toEqual(jasmine.any(Array));
        expect(breeds.length).toBe(2);
      });

      const req = httpMock.expectOne('http://localhost:3000/api/breeds');
      expect(req.request.method).toBe('GET');
      req.flush({ data: mockBreeds });
    });

    it('should handle error when fetching breeds', () => {
      const errorMessage = 'Error fetching breeds';

      service.getAllBreeds().subscribe({
        next: () => fail('Should have failed'),
        error: (error) => {
          expect(error.message).toContain('Http failure response');
        }
      });

      const req = httpMock.expectOne('http://localhost:3000/api/breeds');
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getBreedById', () => {
    it('should fetch breed by id', () => {
      const mockBreed = { 
        id: '1', 
        name: 'Persian',
        origin: 'Iran',
        temperament: 'Calm, Affectionate',
        description: 'A beautiful long-haired cat breed',
        life_span: '12 - 17',
        weight: { imperial: '7 - 12', metric: '3 - 5' }
      };

      service.getBreedById('1').subscribe(breed => {
        expect(breed).toEqual(jasmine.any(Object));
        expect(breed?.id).toBe('1');
      });

      const req = httpMock.expectOne('http://localhost:3000/api/breeds/1');
      expect(req.request.method).toBe('GET');
      req.flush({ data: mockBreed });
    });
  });

  describe('getBreedImages', () => {
    it('should fetch images for a breed', () => {
      const mockImages = [
        { id: '1', url: 'http://example.com/image1.jpg', width: 800, height: 600 },
        { id: '2', url: 'http://example.com/image2.jpg', width: 800, height: 600 }
      ];

      service.getBreedImages('1', 5).subscribe(images => {
        expect(images).toEqual(jasmine.any(Array));
        expect(images.length).toBe(2);
      });

      const req = httpMock.expectOne(req => 
        req.url.includes('http://localhost:3000/api/images/imagesbybreedid') &&
        req.params.get('breed_id') === '1' &&
        req.params.get('limit') === '5'
      );
      expect(req.request.method).toBe('GET');
      req.flush({ data: mockImages });
    });

    it('should use default limit when not specified', () => {
      const mockImages = [
        { id: '1', url: 'http://example.com/image1.jpg', width: 800, height: 600 }
      ];

      service.getBreedImages('1').subscribe(images => {
        expect(images).toEqual(jasmine.any(Array));
        expect(images.length).toBe(1);
      });

      const req = httpMock.expectOne(req => 
        req.url.includes('http://localhost:3000/api/images/imagesbybreedid') &&
        req.params.get('breed_id') === '1' &&
        req.params.get('limit') === '10'
      );
      expect(req.request.method).toBe('GET');
      req.flush({ data: mockImages });
    });
  });

  describe('searchBreeds', () => {
    it('should search breeds by query', () => {
      const mockBreeds = [
        { 
          id: '1', 
          name: 'Persian', 
          origin: 'Iran',
          temperament: 'Calm, Affectionate',
          description: 'A beautiful long-haired cat breed',
          life_span: '12 - 17',
          weight: { imperial: '7 - 12', metric: '3 - 5' }
        }
      ];

      service.searchBreeds('persian').subscribe(breeds => {
        expect(breeds).toEqual(jasmine.any(Array));
        expect(breeds.length).toBe(1);
      });

      const req = httpMock.expectOne('http://localhost:3000/api/breeds/search?q=persian');
      expect(req.request.method).toBe('GET');
      req.flush({ data: mockBreeds });
    });
  });
});
