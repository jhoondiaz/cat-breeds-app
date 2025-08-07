import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { CatBreedsService } from '../../core/services/cat-breeds.service';
import { CatBreed, CatImage } from '../../core/models/cat-breed.model';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-cat-breeds',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CarouselComponent,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatGridListModule,
    MatTooltipModule
  ],
  template: `
    <div class="cat-breeds-container">
      <!-- Page Header -->
      <mat-card class="header-card">
        <mat-card-header>
          <div mat-card-avatar class="header-avatar">
            <mat-icon>pets</mat-icon>
          </div>
          <mat-card-title>Razas de Gatos</mat-card-title>
          <mat-card-subtitle>Descubre información detallada sobre diferentes razas de gatos</mat-card-subtitle>
        </mat-card-header>
      </mat-card>

      <!-- Breed Selector Section -->
      <mat-card class="selector-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>search</mat-icon>
            Seleccionar Raza
          </mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Elige una raza de gato</mat-label>
            <mat-select [(ngModel)]="selectedBreedId" (selectionChange)="onBreedSelected()">
              <mat-option value="">-- Selecciona una raza --</mat-option>
              <mat-option *ngFor="let breed of allBreeds" [value]="breed.id">
                {{ breed.name }}
              </mat-option>
            </mat-select>
            <mat-icon matSuffix>pets</mat-icon>
          </mat-form-field>
        </mat-card-content>
      </mat-card>

      <!-- Selected Breed Details -->
      <mat-card class="breed-details-card" *ngIf="selectedBreed && !loadingBreedDetails">
        <mat-card-header>
          <div mat-card-avatar class="breed-avatar">
            <mat-icon>info</mat-icon>
          </div>
          <mat-card-title>{{ selectedBreed.name }}</mat-card-title>
          <mat-card-subtitle>
            <mat-icon>place</mat-icon>
            Origen: {{ selectedBreed.origin }}
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <!-- Image Carousel -->
          <div class="breed-images" *ngIf="breedImages.length > 0">
            <app-carousel [images]="breedImages"></app-carousel>
          </div>

          <mat-divider></mat-divider>

          <!-- Breed Information Grid -->
          <div class="breed-info-grid">
            <mat-card class="info-card">
              <mat-card-header>
                <mat-icon mat-card-avatar>mood</mat-icon>
                <mat-card-title>Temperamento</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="temperament-chips">
                  <mat-chip-set>
                    <mat-chip *ngFor="let trait of getTemperamentArray(selectedBreed.temperament)">
                      {{ trait }}
                    </mat-chip>
                  </mat-chip-set>
                </div>
              </mat-card-content>
            </mat-card>

            <mat-card class="info-card">
              <mat-card-header>
                <mat-icon mat-card-avatar>schedule</mat-icon>
                <mat-card-title>Esperanza de Vida</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="stat-value">{{ selectedBreed.life_span }} años</div>
              </mat-card-content>
            </mat-card>

            <mat-card class="info-card">
              <mat-card-header>
                <mat-icon mat-card-avatar>fitness_center</mat-icon>
                <mat-card-title>Peso</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="stat-value">{{ selectedBreed.weight.metric }} kg</div>
              </mat-card-content>
            </mat-card>
          </div>

          <mat-divider></mat-divider>

          <!-- Description -->
          <div class="breed-description">
            <h3>
              <mat-icon>description</mat-icon>
              Descripción
            </h3>
            <p>{{ selectedBreed.description }}</p>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Loading for breed details -->
      <mat-card *ngIf="loadingBreedDetails" class="loading-card">
        <mat-card-content>
          <div class="loading-content">
            <mat-spinner diameter="50"></mat-spinner>
            <p>Cargando detalles de la raza...</p>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Search Section -->
      <mat-card class="search-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>search</mat-icon>
            Buscar Razas
          </mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <div class="search-group">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Buscar razas</mat-label>
              <input 
                matInput 
                type="text" 
                [(ngModel)]="searchQuery"
                (input)="onSearchInput()"
                placeholder="Buscar por nombre, temperamento, origen...">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
            
            <button 
              mat-raised-button 
              color="primary"
              (click)="performSearch()"
              [disabled]="isSearching"
              class="search-button">
              <mat-icon *ngIf="!isSearching">search</mat-icon>
              <mat-spinner *ngIf="isSearching" diameter="20"></mat-spinner>
              <span>{{ isSearching ? 'Buscando...' : 'Buscar' }}</span>
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Results Table -->
      <mat-card class="results-card">
        <mat-card-header>
          <mat-card-title>{{ getTableTitle() }}</mat-card-title>
          <mat-card-subtitle *ngIf="displayedBreeds.length > 0">
            {{ displayedBreeds.length }} resultado(s)
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <div class="table-container" *ngIf="displayedBreeds.length > 0; else noResults">
            <table mat-table [dataSource]="displayedBreeds" class="breeds-table">
              <!-- Name Column -->
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Nombre</th>
                <td mat-cell *matCellDef="let breed" class="breed-name">{{ breed.name }}</td>
              </ng-container>

              <!-- Origin Column -->
              <ng-container matColumnDef="origin">
                <th mat-header-cell *matHeaderCellDef>Origen</th>
                <td mat-cell *matCellDef="let breed">
                  <mat-icon class="small-icon">place</mat-icon>
                  {{ breed.origin }}
                </td>
              </ng-container>

              <!-- Temperament Column -->
              <ng-container matColumnDef="temperament">
                <th mat-header-cell *matHeaderCellDef>Temperamento</th>
                <td mat-cell *matCellDef="let breed" class="temperament">
                  {{ truncateText(breed.temperament, 30) }}
                </td>
              </ng-container>

              <!-- Weight Column -->
              <ng-container matColumnDef="weight">
                <th mat-header-cell *matHeaderCellDef>Peso (kg)</th>
                <td mat-cell *matCellDef="let breed">{{ breed.weight.metric }}</td>
              </ng-container>

              <!-- Life Span Column -->
              <ng-container matColumnDef="lifeSpan">
                <th mat-header-cell *matHeaderCellDef>Esperanza de Vida</th>
                <td mat-cell *matCellDef="let breed">{{ breed.life_span }} años</td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Acciones</th>
                <td mat-cell *matCellDef="let breed">
                  <button 
                    mat-raised-button 
                    color="primary"
                    size="small"
                    (click)="selectBreedFromTable(breed.id)">
                    <mat-icon>visibility</mat-icon>
                    Ver Detalles
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
                  [class.selected-row]="row.id === selectedBreedId"></tr>
            </table>
          </div>

          <ng-template #noResults>
            <div class="no-results">
              <div *ngIf="!isLoading && !isSearching" class="empty-state">
                <mat-icon class="large-icon">search_off</mat-icon>
                <h3>{{ searchQuery ? 'No se encontraron razas' : 'No hay datos disponibles' }}</h3>
                <p>{{ searchQuery ? 'No se encontraron razas que coincidan con tu búsqueda.' : 'No hay datos disponibles.' }}</p>
              </div>
              
              <div *ngIf="isLoading || isSearching" class="loading-content">
                <mat-spinner diameter="50"></mat-spinner>
                <p>{{ isSearching ? 'Buscando razas...' : 'Cargando razas...' }}</p>
              </div>
            </div>
          </ng-template>
        </mat-card-content>
      </mat-card>
    </div>

    <!-- Floating Action Button for User Profile -->
    <button mat-fab 
            class="floating-profile-btn" 
            color="accent" 
            (click)="navigateToProfile()"
            matTooltip="Mi Perfil"
            matTooltipPosition="left">
      <mat-icon>account_circle</mat-icon>
    </button>
  `,
  styleUrls: ['./cat-breeds.component.scss']
})
export class CatBreedsComponent implements OnInit, OnDestroy {
  allBreeds: CatBreed[] = [];
  displayedBreeds: CatBreed[] = [];
  selectedBreed: CatBreed | null = null;
  selectedBreedId: string = '';
  breedImages: CatImage[] = [];
  searchQuery: string = '';

  isLoading = false;
  isSearching = false;
  loadingBreedDetails = false;

  // Table columns for Material Table
  displayedColumns: string[] = ['name', 'origin', 'temperament', 'weight', 'lifeSpan', 'actions'];

  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor(private catBreedsService: CatBreedsService, private router: Router) {}

  ngOnInit() {
    this.loadAllBreeds();
    this.setupSearch();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearch(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.performSearch();
    });
  }

  loadAllBreeds(): void {
    this.isLoading = true;
    this.catBreedsService.getAllBreeds()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (breeds) => {
          this.allBreeds = breeds;
          this.displayedBreeds = breeds;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading breeds:', error);
          this.isLoading = false;
        }
      });
  }

  onBreedSelected(): void {
    if (this.selectedBreedId) {
      this.loadBreedDetails(this.selectedBreedId);
    } else {
      this.selectedBreed = null;
      this.breedImages = [];
    }
  }

  selectBreedFromTable(breedId: string): void {
    this.selectedBreedId = breedId;
    this.loadBreedDetails(breedId);
  }

  private loadBreedDetails(breedId: string): void {
    this.loadingBreedDetails = true;
    
    // Find breed in current list
    const breed = this.allBreeds.find(b => b.id === breedId);
    if (breed) {
      this.selectedBreed = breed;
    }

    // Load breed images
    this.catBreedsService.getBreedImages(breedId, 5)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (images) => {
          this.breedImages = images;
          this.loadingBreedDetails = false;
        },
        error: (error) => {
          console.error('Error loading breed images:', error);
          this.breedImages = [];
          this.loadingBreedDetails = false;
        }
      });
  }

  onSearchInput(): void {
    this.searchSubject.next(this.searchQuery);
  }

  performSearch(): void {
    if (!this.searchQuery.trim()) {
      this.displayedBreeds = this.allBreeds;
      return;
    }

    this.isSearching = true;
    const query = this.searchQuery.toLowerCase();
    
    // Filter locally first for immediate response
    const localResults = this.allBreeds.filter(breed =>
      breed.name.toLowerCase().includes(query) ||
      breed.origin.toLowerCase().includes(query) ||
      breed.temperament.toLowerCase().includes(query)
    );

    this.displayedBreeds = localResults;
    this.isSearching = false;
  }

  getTableTitle(): string {
    if (this.searchQuery) {
      return `Resultados de búsqueda para "${this.searchQuery}"`;
    }
    return 'Todas las Razas de Gatos';
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  // New method for Material Design
  getTemperamentArray(temperament: string): string[] {
    return temperament.split(',').map(trait => trait.trim()).slice(0, 3);
  }

  // Navigation method for floating button
  navigateToProfile(): void {
    this.router.navigate(['/user/profile']);
  }
}
