import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material imports
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  template: `
    <div class="loading-container" [class.overlay]="overlay">
      <mat-card class="loading-card" [class.overlay-card]="overlay">
        <mat-card-content class="loading-content">
          <mat-spinner 
            [diameter]="spinnerSize" 
            [color]="spinnerColor">
          </mat-spinner>
          <p *ngIf="message" class="loading-message">{{ message }}</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() message: string = 'Cargando...';
  @Input() overlay: boolean = false;
  @Input() spinnerSize: number = 50;
  @Input() spinnerColor: 'primary' | 'accent' | 'warn' = 'primary';
}
