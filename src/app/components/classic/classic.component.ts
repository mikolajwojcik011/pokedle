import { Component } from '@angular/core';
import {GuessTileComponent} from "./guess-tile/guess-tile.component";
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {JsonPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";

interface PokemonCheckResult {
  field: string;
  value: string | number;
  result: boolean | number;
}

@Component({
  selector: 'app-classic',
  standalone: true,
  imports: [
    GuessTileComponent,
    JsonPipe,
    FormsModule
  ],
  templateUrl: './classic.component.html',
  styleUrl: './classic.component.css'
})
export class ClassicComponent {
  guesses: PokemonCheckResult[][] = [];
  pokemonName: string = '';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
  }

  checkPokemon(pokemonName: string): Observable<any> {
    return this.http.get(`http://localhost:3000/classic/check-pokemon?name=${pokemonName}`);
  }

  submitForm(event: Event): void {
    console.log('Form submitted');
    event.preventDefault();
    this.checkPokemon(this.pokemonName).subscribe(response => {
      this.guesses.push(response);
      const expires = new Date();
      expires.setHours(24, 0, 0, 0); // Set expiration to 00:00 next day
      this.cookieService.set('guesses', JSON.stringify(this.guesses), { expires });
      if (response[0].result === true && response[1].result === true){
        console.log('You guessed correctly!');
      }
    });
  }

  logGuesses() {
    console.log(this.guesses);
  }
}
