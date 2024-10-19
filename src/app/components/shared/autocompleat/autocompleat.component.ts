import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import {NgForOf, NgIf} from "@angular/common";

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
    NgIf,
    NgForOf
  ],
  styleUrls: ['./autocompleat.component.css']
})
export class AutocompleatComponent implements OnInit {
  pokemonData: Pokemon[] = [];
  filteredPokemon: Pokemon[] = [];
  searchControl: FormControl = new FormControl('');
  @Output() pokemonSelected = new EventEmitter<string>();

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
    this.searchControl.setValue(pokemon.name);
    this.filteredPokemon = [];
    this.pokemonSelected.emit(pokemon.name);
  }
}
