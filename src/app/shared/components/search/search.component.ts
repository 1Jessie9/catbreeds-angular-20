import { Component, output } from "@angular/core";
import { IonSearchbar } from "@ionic/angular/standalone";
import { SearchbarCustomEvent } from '@ionic/angular/standalone'

@Component({
  standalone: true,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  imports: [
    IonSearchbar,
  ]
})
export class SearchComponent {
  readonly handleSearch = output<string>();

  onSearch(event: SearchbarCustomEvent) {
    const value: string = (event.target.value ?? '');
    this.handleSearch.emit(value);
  }
}