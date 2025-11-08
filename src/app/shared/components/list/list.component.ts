import { Component, inject, input, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { IonRow, IonCol, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { arrowForwardOutline } from 'ionicons/icons';
import { CatBreedService } from "src/app/core/services/catbreed.service";
import { BreedImageComponent } from "../breed-image/breed-image.component";

addIcons({
  arrowForwardOutline
});
@Component({
  standalone: true,
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [
    IonRow,
    IonCol,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    BreedImageComponent,
  ]
})
export class ListComponent {
  private readonly catService = inject(CatBreedService);
  private readonly router = inject(Router);

  public searchTerm = input<string>();

  public catbreeds: any[] = [];
  private limit: number = 12;
  private page: number = 0;
  private isLoadingMore: boolean = false;
  private isSearching: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm']) {
      this.page = 0;
      this.filterBreeds();
    }
  }

  getBreeds() {
    this.catService.getBreeds(this.limit, this.page).subscribe({
      next: (result) => {
        console.log(result);
        this.catbreeds = result;
      },
      error: (err) => {
        console.error(err)
      }
    });
  }

  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }

  handleImageError(event: any) {
    event.target.src = '/assets/images/default-cat-image.webp';
  }

  loadMore(event: any) {
    if (this.isLoadingMore || this.isSearching) {
      event.target.complete();
      return;
    }

    this.page += 1;

    this.catService.getBreeds(this.limit, this.page).subscribe({
      next: (result) => {
        if (result.length === 0) {
          // Si el resultado está vacío, deshabilita el infinite scroll
          event.target.disabled = true;
          this.isLoadingMore = false;
        } else {
          this.catbreeds = [...this.catbreeds, ...result];
        }

        event.target.complete();
      },
      error: (err) => {
        console.error(err);
        event.target.complete();
      }
    });
  }

  filterBreeds() {
    if (this.searchTerm()?.length) {
      this.isSearching = true;
      this.catService.searchBreeds(this.searchTerm()!).subscribe({
        next: (result) => {
          this.catbreeds = result;
          this.isLoadingMore = false;
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.isSearching = false;
      this.getBreeds();
    }
  }

  goToDetail(id: string) {
    this.router.navigate(['/breed', id]);
  }
}