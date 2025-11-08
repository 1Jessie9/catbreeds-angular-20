import { Component, signal } from "@angular/core";
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { IonContent } from "@ionic/angular/standalone";
import { SearchComponent } from "src/app/shared/components/search/search.component";
import { ListComponent } from "src/app/shared/components/list/list.component";

@Component({
  standalone: true,
  selector: 'app-breed-list',
  templateUrl: './breed-list.component.html',
  imports: [
    IonContent,
    HeaderComponent,
    SearchComponent,
    ListComponent,
  ]
})
export class BreedListPage {
  searchTerm = signal('');

  handleSearch(event: any) {
    this.searchTerm.set(event);
  }
}