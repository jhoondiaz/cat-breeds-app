import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <h1>Mi Perfil</h1>
        <p>Información de tu cuenta</p>
      </div>

      <div class="profile-content" *ngIf="currentUser; else loading">
        <div class="profile-card">
          <div class="profile-avatar">
            <div class="avatar-circle">
              {{ getInitials(currentUser.firstName, currentUser.lastName) }}
            </div>
          </div>

          <div class="profile-info">
            <div class="info-section">
              <h3>Información Personal</h3>
              <div class="info-grid">
                <div class="info-item">
                  <label>Nombre Completo</label>
                  <span>{{ currentUser.firstName }} {{ currentUser.lastName }}</span>
                </div>
                
                <div class="info-item">
                  <label>Nombre de Usuario</label>
                  <span>{{ currentUser.userName }}</span>
                </div>
                
                <div class="info-item">
                  <label>Correo Electrónico</label>
                  <span>{{ currentUser.email }}</span>
                </div>
                
                <div class="info-item">
                  <label>ID de Usuario</label>
                  <span class="user-id">{{ currentUser.id }}</span>
                </div>
              </div>
            </div>

            <div class="info-section">
              <h3>Información de Cuenta</h3>
              <div class="info-grid">
                <div class="info-item">
                  <label>Fecha de Registro</label>
                  <span>{{ formatDate(currentUser.createdAt) }}</span>
                </div>
                
                <div class="info-item">
                  <label>Última Actualización</label>
                  <span>{{ formatDate(currentUser.updatedAt) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="profile-actions">
          <button class="btn btn-primary" (click)="refreshProfile()">
            Volver
          </button>
          <button class="btn btn-outline-danger" (click)="logout()">
            Cerrar Sesión
          </button>
        </div>
      </div>

      <ng-template #loading>
        <app-loading [message]="'Cargando perfil...'" [overlay]="false"></app-loading>
      </ng-template>
    </div>
  `,
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  refreshProfile(): void {
    // In a real app, you would fetch updated user data from the API
    this.router.navigate(['/cat-breeds']);
  }

  logout(): void {
    this.authService.logout();
  }
}