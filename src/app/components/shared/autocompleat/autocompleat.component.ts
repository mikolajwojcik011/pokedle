import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import {animate, state, style, transition, trigger} from "@angular/animations";

interface Pokemon {
  name: string;
  img_url: string;
}

@Component({
  selector: 'app-autocompleat',
  templateUrl: './autocompleat.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  styleUrls: ['./autocompleat.component.css'],
  animations: [
    trigger('flashAnimation', [
      state('default', style({ backgroundColor: 'white' })),
      state('error', style({ backgroundColor: '#dc2626' })),
      transition('default <=> error', animate('0.1s ease-in-out'))
    ])
  ]
})
export class AutocompleatComponent implements OnInit {
  pokemonData: Pokemon[] = [];
  filteredPokemon: Pokemon[] = [];
  searchControl: FormControl = new FormControl('');
  isInputActive: boolean = false;
  @Output() pokemonSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPokemonData();
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.filterPokemon(value);
    });
  }

  loadPokemonData(): void {
    this.http.get<Pokemon[]>('assets/pokemon_data.json').subscribe(data => {
      this.pokemonData = data;
    });
  }

  filterPokemon(query: string): void {
    if (!query) {
      this.filteredPokemon = [];
      return;
    }
    this.filteredPokemon = this.pokemonData.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  selectPokemon(pokemon: Pokemon): void {
    this.filteredPokemon = [];
    this.pokemonSelected.emit(pokemon.name);
    this.searchControl.setValue('');
  }

  onFocus() {
    this.isInputActive = true;
  }

  onBlur(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (relatedTarget && relatedTarget.tagName === 'LI') {
      return;
    }
    this.isInputActive = false;
  }
}
