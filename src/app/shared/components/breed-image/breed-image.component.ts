import { Component, ElementRef, input, OnDestroy, OnInit, signal } from '@angular/core';
import { ImageResolverService } from 'src/app/core/services/image-resolver.service';

@Component({
  standalone: true,
  selector: 'app-breed-image',
  template: `
    <img [class]="classImg()"
        [src]="url() ?? placeholder"
        (error)="onError($event)"
        [alt]="alt()"
        [title]="alt()" />
  `,
  styles: [`
    :host { display: block; }
    .image { 
          width: 100%;
      border-radius: 15px 15px 0 0;
      object-fit: cover;
      aspect-ratio: 4 / 3;
      display: block;
    }
    .image-cat {
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: contain;
      border-radius: 20px;
      position: sticky;
      top: 100px;

      @media screen and (max-width: 767px) {
        box-shadow: 0px 5px 8px 20px rgb(244 235 221);
        aspect-ratio: 4 / 3;
      }
    }
  `]
})
export class BreedImageComponent implements OnInit, OnDestroy {
  readonly refId = input<string>();
  readonly alt = input<string>('cat breed');
  readonly classImg = input<string>('image');

  url = signal<string | null>(null);
  placeholder = '/assets/images/default-cat-image.webp';

  private io?: IntersectionObserver;

  constructor(
    private host: ElementRef<HTMLElement>,
    private resolver: ImageResolverService
  ) { }

  ngOnInit() {
    this.io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          this.load();
          this.io?.disconnect();
        }
      });
    }, { rootMargin: '150px' });

    this.io.observe(this.host.nativeElement);
  }

  ngOnDestroy() { this.io?.disconnect(); }

  private load() {
    this.resolver.resolveRefIdToUrl(this.refId()).subscribe((url: string) => {
      this.url.set(url ?? this.placeholder);
    });
  }

  onError(ev: any) {
    ev.target.src = this.placeholder;
  }
}
