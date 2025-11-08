import { Component, inject, input, OnInit, signal } from "@angular/core";
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { IonContent, IonRow, IonCol, IonIcon } from "@ionic/angular/standalone";
import { NgClass } from "@angular/common";
import { Router } from "@angular/router";
import { IBreed } from "src/app/core/interfaces/breed.interface";
import { CatBreedService } from "src/app/core/services/catbreed.service";
import { addIcons } from "ionicons";
import { earthOutline, hourglassOutline, speedometerOutline } from "ionicons/icons";
import { BreedImageComponent } from "src/app/shared/components/breed-image/breed-image.component";

addIcons({
  speedometerOutline,
  hourglassOutline,
  earthOutline,
})
@Component({
  standalone: true,
  selector: 'app-breed-detail',
  templateUrl: './breed-detail.component.html',
  styleUrl: './breed-detail.component.scss',
  imports: [
    IonContent,
    HeaderComponent,
    IonRow,
    IonCol,
    IonIcon,
    NgClass,
    BreedImageComponent,
  ],
})
export class BreedDetailPage implements OnInit {
  readonly breedId = input.required<string>();

  private catService = inject(CatBreedService);
  private router = inject(Router);

  public activeAnimation = signal(false);
  public breed = signal<IBreed | null>(null);
  public imageUrl = signal<string | null>(null);

  ngOnInit() {
    this.getBreedDetails(this.breedId());
  }

  getBreedDetails(id: string) {
    this.catService.getBreedById(id).subscribe({
      next: (result) => {
        this.breed.set(result);

        this.catService.getOneImageForBreed(result.reference_image_id).subscribe({
          next: img => {
            if (img.url) this.imageUrl.set(img.url);
            else this.setFallbackImage();
          },
          error: () => this.setFallbackImage()
        });
        this.setInfoBreed();
      },
      error: (err) => {
        console.error(err);
        this.router.navigate(['/home']);
      }
    });
  }

  setInfoBreed() {
    if (this.breed()) {
      this.breed()!.temperamentArr = this.breed()!.temperament.split(',').map(t => t.trim());

      this.setCards();
      this.setFeatures();
    }
  }

  setCards() {
    if (this.breed()) {
      this.breed()!.cardsInfo = [
        {
          id: "weight",
          name: "Weight",
          value: `${this.breed()!.weight.metric} kg`,
          icon: "speedometer-outline",
        },
        {
          id: "life_span",
          name: "Life Span",
          value: `${this.breed()!.life_span} years`,
          icon: "hourglass-outline",
        },
        {
          id: "origin",
          name: "Origin",
          value: this.breed()!.origin,
          icon: "earth-outline",
        },
      ];
    }
  }

  setFeatures() {
    if (this.breed()) {
      this.breed()!.features = [
        {
          id: "adaptability",
          name: "Adaptability",
          value: this.breed()!.adaptability,
        },
        {
          id: "affection_level",
          name: "Affection Level",
          value: this.breed()!.affection_level,
        },
        {
          id: "energy_level",
          name: "Energy Level",
          value: this.breed()!.energy_level,
        },
        {
          id: "grooming",
          name: "Grooming",
          value: this.breed()!.grooming,
        },
        {
          id: "health_issues",
          name: "Health Issues",
          value: this.breed()!.health_issues,
        },
        {
          id: "intelligence",
          name: "Intelligence",
          value: this.breed()!.intelligence,
        },
        {
          id: "shedding_level",
          name: "Shedding Level",
          value: this.breed()!.shedding_level,
        },
        {
          id: "social_needs",
          name: "Social Needs",
          value: this.breed()!.social_needs,
        },
        {
          id: "vocalisation",
          name: "Vocalization",
          value: this.breed()!.vocalisation,
        },
      ];

      setTimeout(() => {
        this.activeAnimation.set(true);
      }, 400);
    }
  }

  handleImageError(event: any) {
    event.target.src = '/assets/images/default-cat-image.webp';
  }

  private setFallbackImage() {
    const ref = this.breed()?.reference_image_id;
    this.imageUrl.set(ref ? `https://cdn2.thecatapi.com/images/${ref}.jpg` : '/assets/images/default-cat-image.webp');
  }
}