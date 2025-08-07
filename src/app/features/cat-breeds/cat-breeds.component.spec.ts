import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CatBreedsComponent } from './cat-breeds.component';
import { CatBreedsService } from '../../core/services/cat-breeds.service';
import { CatBreed, CatImage } from '../../core/models/cat-breed.model';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CatBreedsComponent', () => {
  let component: CatBreedsComponent;
  let fixture: ComponentFixture<CatBreedsComponent>;
  let mockCatBreedsService: jasmine.SpyObj<CatBreedsService>;

  const mockBreeds: CatBreed[] = [
    {
      id: '1',
      name: 'Persian',
      origin: 'Iran',
      temperament: 'Calm, Affectionate',
      description: 'A beautiful long-haired cat breed',
      life_span: '12 - 17',
      weight: {
        imperial: '7 - 12',
        metric: '3 - 5'
      }
    },
    {
      id: '2',
      name: 'Siamese',
      origin: 'Thailand',
      temperament: 'Active, Vocal',
      description: 'A distinctive breed with pointed coloration',
      life_span: '15 - 20',
      weight: {
        imperial: '6 - 14',
        metric: '3 - 6'
      }
    }
  ];

  const mockImages: CatImage[] = [
    {
      id: 'img1',
      url: 'https://example.com/image1.jpg',
      width: 800,
      height: 600
    },
    {
      id: 'img2',
      url: 'https://example.com/image2.jpg',
      width: 800,
      height: 600
    }
  ];

  beforeEach(async () => {
    const catBreedsServiceSpy = jasmine.createSpyObj('CatBreedsService', [
      'getAllBreeds',
      'getBreedImages',
      'searchBreeds'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CatBreedsComponent, 
        FormsModule,
        MatTableModule,
        MatSelectModule,
        MatCardModule,
        MatChipsModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: CatBreedsService, useValue: catBreedsServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CatBreedsComponent);
    component = fixture.componentInstance;
    mockCatBreedsService = TestBed.inject(CatBreedsService) as jasmine.SpyObj<CatBreedsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load all breeds on initialization', () => {
      mockCatBreedsService.getAllBreeds.and.returnValue(of(mockBreeds));
      
      component.ngOnInit();
      
      expect(mockCatBreedsService.getAllBreeds).toHaveBeenCalled();
      expect(component.allBreeds).toEqual(mockBreeds);
      expect(component.displayedBreeds).toEqual(mockBreeds);
      expect(component.isLoading).toBeFalsy();
    });

    it('should handle error when loading breeds', () => {
      const consoleSpy = spyOn(console, 'error');
      mockCatBreedsService.getAllBreeds.and.returnValue(throwError(() => new Error('API Error')));
      
      component.ngOnInit();
      
      expect(consoleSpy).toHaveBeenCalled();
      expect(component.isLoading).toBeFalsy();
    });
  });

  describe('onBreedSelected', () => {
    beforeEach(() => {
      component.allBreeds = mockBreeds;
      mockCatBreedsService.getBreedImages.and.returnValue(of(mockImages));
    });

    it('should load breed details when breed is selected', () => {
      component.selectedBreedId = '1';
      
      component.onBreedSelected();
      
      expect(component.selectedBreed).toEqual(mockBreeds[0]);
      expect(mockCatBreedsService.getBreedImages).toHaveBeenCalledWith('1', 5);
      expect(component.breedImages).toEqual(mockImages);
    });

    it('should clear selection when no breed is selected', () => {
      component.selectedBreedId = '';
      
      component.onBreedSelected();
      
      expect(component.selectedBreed).toBeNull();
      expect(component.breedImages).toEqual([]);
    });
  });

  describe('selectBreedFromTable', () => {
    beforeEach(() => {
      component.allBreeds = mockBreeds;
      mockCatBreedsService.getBreedImages.and.returnValue(of(mockImages));
    });

    it('should select breed from table and load details', () => {
      component.selectBreedFromTable('2');
      
      expect(component.selectedBreedId).toBe('2');
      expect(component.selectedBreed).toEqual(mockBreeds[1]);
      expect(mockCatBreedsService.getBreedImages).toHaveBeenCalledWith('2', 5);
    });
  });

  describe('performSearch', () => {
    beforeEach(() => {
      component.allBreeds = mockBreeds;
      component.displayedBreeds = mockBreeds;
    });

    it('should filter breeds locally based on search query', () => {
      component.searchQuery = 'persian';
      
      component.performSearch();
      
      expect(component.displayedBreeds).toEqual([mockBreeds[0]]);
      expect(component.isSearching).toBeFalsy();
    });

    it('should show all breeds when search query is empty', () => {
      component.searchQuery = '';
      
      component.performSearch();
      
      expect(component.displayedBreeds).toEqual(mockBreeds);
    });

    it('should filter by origin', () => {
      component.searchQuery = 'thailand';
      
      component.performSearch();
      
      expect(component.displayedBreeds).toEqual([mockBreeds[1]]);
    });

    it('should filter by temperament', () => {
      component.searchQuery = 'vocal';
      
      component.performSearch();
      
      expect(component.displayedBreeds).toEqual([mockBreeds[1]]);
    });

    it('should return empty results for non-matching query', () => {
      component.searchQuery = 'nonexistent';
      
      component.performSearch();
      
      expect(component.displayedBreeds).toEqual([]);
    });
  });

  describe('getTableTitle', () => {
    it('should return search title when query exists', () => {
      component.searchQuery = 'persian';
      
      const title = component.getTableTitle();
      
      expect(title).toBe('Resultados de búsqueda para "persian"');
    });

    it('should return default title when no query', () => {
      component.searchQuery = '';
      
      const title = component.getTableTitle();
      
      expect(title).toBe('Todas las Razas de Gatos');
    });
  });

  describe('truncateText', () => {
    it('should truncate text when longer than max length', () => {
      const longText = 'This is a very long text that should be truncated';
      
      const result = component.truncateText(longText, 20);
      
      expect(result).toBe('This is a very long ...');
    });

    it('should return original text when shorter than max length', () => {
      const shortText = 'Short text';
      
      const result = component.truncateText(shortText, 20);
      
      expect(result).toBe('Short text');
    });
  });

  describe('search functionality', () => {
    it('should debounce search input', fakeAsync(() => {
      component.allBreeds = mockBreeds;
      
      // Trigger multiple search inputs quickly
      component.searchQuery = 'p';
      component.onSearchInput();
      
      component.searchQuery = 'pe';
      component.onSearchInput();
      
      component.searchQuery = 'per';
      component.onSearchInput();
      
      // Fast-forward time to complete debounce
      tick(350);
      
      expect(component.displayedBreeds.length).toBe(1);
      expect(component.displayedBreeds[0].name).toBe('Persian');
    }));
  });
});
