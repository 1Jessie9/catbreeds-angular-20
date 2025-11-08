import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CatBreedService {
  private readonly http = inject(HttpClient);
  private readonly api = environment.catApiBase;

  getBreeds(limit: number, page: number): Observable<any> {
    return this.http.get(`${this.api}/breeds`, {
      params: {
        limit: limit.toString(),
        page: page.toString()
      }
    });
  }

  searchBreeds(query: string): Observable<any> {
    return this.http.get(`${this.api}/breeds/search`, {
      params: { q: query }
    });
  }

  getBreedById(id: string): Observable<any> {
    return this.http.get(`${this.api}/breeds/${id}`);
  }

  getOneImageForBreed(id: string) {
    return this.http.get<{ url: string }>(
      `${this.api}/images/${id}`,
      { params: { limit: 1 } }
    );
  }
}
