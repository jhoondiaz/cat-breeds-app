import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatTooltipModule
  ],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <mat-card class="hero-card">
        <mat-card-content class="hero-content">
          <div class="hero-icon">
            <mat-icon>pets</mat-icon>
          </div>
          <h1>Cat Breeds Explorer</h1>
          <p class="hero-subtitle">
            Descubre el fascinante mundo de las razas de gatos con información detallada, 
            imágenes hermosas y características únicas de cada raza.
          </p>
          <div class="hero-actions">
            <button mat-raised-button color="primary" routerLink="/cat-breeds" class="cta-button">
              <mat-icon>explore</mat-icon>
              Explorar Razas
            </button>
            <button mat-stroked-button color="primary" routerLink="/auth/register" class="secondary-button">
              <mat-icon>person_add</mat-icon>
              Crear Cuenta
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Features Section -->
      <div class="features-section">
        <h2>¿Qué puedes hacer?</h2>
        
        <mat-grid-list cols="3" rowHeight="300px" class="features-grid">
          <mat-grid-tile>
            <mat-card class="feature-card">
              <mat-card-header>
                <div mat-card-avatar class="feature-avatar browse-avatar">
                  <mat-icon>pets</mat-icon>
                </div>
                <mat-card-title>Explorar Razas</mat-card-title>
                <mat-card-subtitle>Información completa</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>
                  Navega por una extensa base de datos de razas de gatos con información 
                  detallada sobre temperamento, características físicas y cuidados especiales.
                </p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button color="primary" routerLink="/cat-breeds">
                  <mat-icon>arrow_forward</mat-icon>
                  Ver Razas
                </button>
              </mat-card-actions>
            </mat-card>
          </mat-grid-tile>

          <mat-grid-tile>
            <mat-card class="feature-card">
              <mat-card-header>
                <div mat-card-avatar class="feature-avatar search-avatar">
                  <mat-icon>search</mat-icon>
                </div>
                <mat-card-title>Buscar y Filtrar</mat-card-title>
                <mat-card-subtitle>Encuentra tu raza ideal</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>
                  Utiliza nuestro sistema de búsqueda avanzado para encontrar razas específicas 
                  por nombre, temperamento, origen o características físicas.
                </p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button color="primary" routerLink="/cat-breeds">
                  <mat-icon>search</mat-icon>
                  Buscar Ahora
                </button>
              </mat-card-actions>
            </mat-card>
          </mat-grid-tile>

          <mat-grid-tile>
            <mat-card class="feature-card">
              <mat-card-header>
                <div mat-card-avatar class="feature-avatar profile-avatar">
                  <mat-icon>account_circle</mat-icon>
                </div>
                <mat-card-title>Perfil Personal</mat-card-title>
                <mat-card-subtitle>Guarda tus favoritos</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>
                  Crea tu cuenta personal para guardar tus razas favoritas, 
                  hacer seguimiento de tus búsquedas y personalizar tu experiencia.
                </p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button color="primary" routerLink="/auth/register">
                  <mat-icon>person_add</mat-icon>
                  Registrarse
                </button>
              </mat-card-actions>
            </mat-card>
          </mat-grid-tile>
        </mat-grid-list>
      </div>

      <!-- Stats Section -->
      <mat-card class="stats-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>analytics</mat-icon>
            Nuestra Base de Datos
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">50+</div>
              <div class="stat-label">Razas de Gatos</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">500+</div>
              <div class="stat-label">Imágenes</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">100%</div>
              <div class="stat-label">Información Verificada</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Acceso Disponible</div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Call to Action -->
      <mat-card class="cta-card">
        <mat-card-content>
          <h3>¿Listo para comenzar?</h3>
          <p>Únete a nuestra comunidad de amantes de los gatos y descubre tu raza perfecta.</p>
          <div class="cta-actions">
            <button mat-raised-button color="primary" routerLink="/cat-breeds" class="large-button">
              <mat-icon>pets</mat-icon>
              Comenzar Exploración
            </button>
          </div>
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
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  constructor(private router: Router) {}

  navigateToProfile(): void {
    this.router.navigate(['/user/profile']);
  }
}
