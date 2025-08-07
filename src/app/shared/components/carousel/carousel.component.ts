import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatImage } from '../../../core/models/cat-breed.model';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="carousel-container" *ngIf="images && images.length > 0">
      <div class="carousel-wrapper">
        <button 
          class="carousel-btn prev-btn" 
          (click)="previousImage()"
          [disabled]="images.length <= 1"
          aria-label="Imagen anterior">
          &#8249;
        </button>
        
        <div class="carousel-content">
          <img 
            [src]="images[currentIndex].url"
            [alt]="'Imagen ' + (currentIndex + 1)"
            class="carousel-image"
            (error)="onImageError($event)">
        </div>
        
        <button 
          class="carousel-btn next-btn" 
          (click)="nextImage()"
          [disabled]="images.length <= 1"
          aria-label="Siguiente imagen">
          &#8250;
        </button>
      </div>
      
      <div class="carousel-indicators" *ngIf="images.length > 1">
        <button 
          *ngFor="let image of images; let i = index"
          class="indicator"
          [class.active]="i === currentIndex"
          (click)="goToImage(i)"
          [attr.aria-label]="'Ir a imagen ' + (i + 1)">
        </button>
      </div>
      
      <div class="carousel-counter" *ngIf="images.length > 1">
        {{ currentIndex + 1 }} / {{ images.length }}
      </div>
    </div>
    
    <div class="no-images" *ngIf="!images || images.length === 0">
      <p>No hay imágenes disponibles</p>
    </div>
  `,
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() images: CatImage[] = [];
  currentIndex: number = 0;

  ngOnInit() {
    this.currentIndex = 0;
  }

  nextImage(): void {
    if (this.images.length > 1) {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }
  }

  previousImage(): void {
    if (this.images.length > 1) {
      this.currentIndex = this.currentIndex === 0 
        ? this.images.length - 1 
        : this.currentIndex - 1;
    }
  }

  goToImage(index: number): void {
    this.currentIndex = index;
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/placeholder-cat.jpg'; // Add a placeholder image
  }
}
