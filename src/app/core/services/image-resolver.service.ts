import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, of, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageResolverService {
  private http = inject(HttpClient);
  private api = environment.catApiBase;

  private cache = new Map<string, any>();

  resolveRefIdToUrl(refId?: string) {
    if (!refId) return of<string | null>(null);

    const cached = this.cache.get(refId);
    if (cached) return cached;

    const obs = this.http.get<{ url?: string }>(`${this.api}/images/${refId}`)
      .pipe(
        map(r => r?.url ?? null),
        shareReplay(1)
      );

    this.cache.set(refId, obs);
    return obs;
  }
}
