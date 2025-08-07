import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { CatBreed, CatImage } from '../models/cat-breed.model';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CatBreedsService {
  private readonly baseUrl = `${environment.apiUrl}` || 'https://api.thecatapi.com/v1';
  private readonly apiKey = environment.backendApiKey; // Replace with your actual API key

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Get all available cat breeds
   */
  getAllBreeds(): Observable<CatBreed[]> {
    const headers = { 'x-api-key': this.apiKey, 'authorization': `Bearer ${this.authService.getToken()}`};
    return this.http.get<CatBreed[]>(`${this.baseUrl}/breeds`, { headers });
  }

  /**
   * Get specific breed by ID
   */
  getBreedById(breedId: string): Observable<CatBreed> {
    const headers = { 'x-api-key': this.apiKey, 'authorization': `Bearer ${this.authService.getToken()}`};
    return this.http.get<CatBreed>(`${this.baseUrl}/breeds/${breedId}`, { headers });
  }

  /**
   * Get images for a specific breed
   */
  getBreedImages(breedId: string, limit: number = 10): Observable<CatImage[]> {
    const headers = { 'x-api-key': this.apiKey, 'authorization': `Bearer ${this.authService.getToken()}`};
    const params = new HttpParams()
      .set('breed_id', breedId)
      .set('limit', limit.toString());

    return this.http.get<CatImage[]>(`${this.baseUrl}/images/imagesbybreedid`, { 
      headers, 
      params 
    });
  }

  /**
   * Search breeds by name or characteristics
   */
  searchBreeds(query: string): Observable<CatBreed[]> {
    const headers = { 'x-api-key': this.apiKey, 'authorization': `Bearer ${this.authService.getToken()}`};
    return this.http.get<CatBreed[]>(`${this.baseUrl}/breeds/search?q=${query}`, { headers });
  }
}
