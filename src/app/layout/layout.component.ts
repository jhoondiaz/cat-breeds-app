import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { User } from '../core/models/user.model';

// Angular Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule
  ],
  template: `
    <div class="app-layout">
      <mat-sidenav-container class="sidenav-container" [hasBackdrop]="isHandset">
        <!-- Mobile Sidenav -->
        <mat-sidenav
          #drawer
          class="sidenav"
          fixedInViewport
          [attr.role]="isHandset ? 'dialog' : 'navigation'"
          [mode]="isHandset ? 'over' : 'side'"
          [opened]="!isHandset">
          
          <mat-toolbar class="sidenav-header">
            <span>
              <mat-icon>pets</mat-icon>
              Cat Breeds
            </span>
          </mat-toolbar>
          
          <mat-nav-list>
            <a mat-list-item routerLink="/cat-breeds" routerLinkActive="active-link">
              <mat-icon matListItemIcon>pets</mat-icon>
              <span matListItemTitle>Razas de Gatos</span>
            </a>
            
            <a mat-list-item routerLink="/profile" routerLinkActive="active-link" *ngIf="currentUser">
              <mat-icon matListItemIcon>person</mat-icon>
              <span matListItemTitle>Mi Perfil</span>
            </a>
            
            <mat-divider></mat-divider>
            
            <div *ngIf="currentUser; else mobileAuthLinks" class="mobile-user-section">
              <div class="user-info">
                <mat-icon>account_circle</mat-icon>
                <span>{{ currentUser.firstName }} {{ currentUser.lastName }}</span>
              </div>
              <button mat-list-item (click)="logout(); drawer.close()">
                <mat-icon matListItemIcon>exit_to_app</mat-icon>
                <span matListItemTitle>Cerrar Sesión</span>
              </button>
            </div>
            
            <ng-template #mobileAuthLinks>
              <a mat-list-item routerLink="/auth/login" routerLinkActive="active-link" (click)="drawer.close()">
                <mat-icon matListItemIcon>login</mat-icon>
                <span matListItemTitle>Iniciar Sesión</span>
              </a>
              <a mat-list-item routerLink="/auth/register" routerLinkActive="active-link" (click)="drawer.close()">
                <mat-icon matListItemIcon>person_add</mat-icon>
                <span matListItemTitle>Registrarse</span>
              </a>
            </ng-template>
          </mat-nav-list>
        </mat-sidenav>
        
        <mat-sidenav-content>
          <!-- Top Toolbar -->
          <mat-toolbar class="main-toolbar" color="primary">
            <button
              type="button"
              aria-label="Toggle sidenav"
              mat-icon-button
              (click)="drawer.toggle()"
              *ngIf="isHandset">
              <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
            </button>
            
            <a routerLink="/" class="toolbar-brand">
              <mat-icon>pets</mat-icon>
              <span>Cat Breeds App</span>
            </a>
            
            <span class="toolbar-spacer"></span>
            
            <!-- Desktop Navigation -->
            <div class="desktop-nav" *ngIf="!isHandset">
              <button mat-button routerLink="/cat-breeds" routerLinkActive="active-button">
                <mat-icon>pets</mat-icon>
                Razas
              </button>
              
              <button mat-button routerLink="/profile" routerLinkActive="active-button" *ngIf="currentUser">
                <mat-icon>person</mat-icon>
                Perfil
              </button>
            </div>
            
            <!-- Desktop User Menu -->
            <div class="desktop-user-menu" *ngIf="!isHandset">
              <div *ngIf="currentUser; else desktopAuthButtons">
                <button mat-button [matMenuTriggerFor]="userMenu">
                  <mat-icon>account_circle</mat-icon>
                  {{ currentUser.firstName }}
                  <mat-icon>arrow_drop_down</mat-icon>
                </button>
                
                <mat-menu #userMenu="matMenu">
                  <button mat-menu-item routerLink="/profile">
                    <mat-icon>person</mat-icon>
                    <span>Mi Perfil</span>
                  </button>
                  <mat-divider></mat-divider>
                  <button mat-menu-item (click)="logout()">
                    <mat-icon>exit_to_app</mat-icon>
                    <span>Cerrar Sesión</span>
                  </button>
                </mat-menu>
              </div>
              
              <ng-template #desktopAuthButtons>
                <button mat-button routerLink="/auth/login" routerLinkActive="active-button">
                  <mat-icon>login</mat-icon>
                  Iniciar Sesión
                </button>
                <button mat-raised-button color="accent" routerLink="/auth/register" routerLinkActive="active-button">
                  <mat-icon>person_add</mat-icon>
                  Registrarse
                </button>
              </ng-template>
            </div>
          </mat-toolbar>
          
          <!-- Main Content -->
          <main class="main-content">
            <router-outlet></router-outlet>
          </main>
          
          <!-- Footer -->
          <footer class="app-footer">
            <mat-toolbar class="footer-toolbar">
              <span>&copy; 2025 Cat Breeds App. Desarrollado con Angular y Material Design.</span>
            </mat-toolbar>
          </footer>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  isHandset = false;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    // Subscribe to user changes
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });

    // Subscribe to breakpoint changes
    this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.isHandset = result.matches;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
