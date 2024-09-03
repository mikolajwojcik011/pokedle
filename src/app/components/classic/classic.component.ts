import { Component, OnInit, OnDestroy, signal, WritableSignal } from '@angular/core';
import { GuessTileComponent } from './guess-tile/guess-tile.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JsonPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {NavButtonComponent} from "../shared/nav-button/nav-button.component";
import {RouterLink} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

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
    FormsModule,
    NgClass,
    NavButtonComponent,
    RouterLink,
  ],
  templateUrl: './classic.component.html',
  styleUrl: './classic.component.css',
  providers: [CookieService]
})
export class ClassicComponent implements OnInit, OnDestroy {
  guesses: WritableSignal<PokemonCheckResult[][]> = signal<PokemonCheckResult[][]>([]);
  guessed: WritableSignal<boolean> = signal<boolean>(false);
  pokemonName: WritableSignal<string> = signal<string>('');
  errorMessage: WritableSignal<string> = signal<string>('');
  private subscriptions: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    const cookieGuesses: string = this.cookieService.get('guesses');
    if (cookieGuesses) {
      this.guesses.set(JSON.parse(cookieGuesses));
    }
    if(this.guesses().length > 0) {
      this.guessed.set(this.guesses().some((guess: PokemonCheckResult[]) => guess[0].result === true && guess[1].result === true));
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  checkPokemon(pokemonName: string): Observable<any> {
    return this.http.get(`http://localhost:3000/classic/check-pokemon?name=${pokemonName}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  submitForm(event: Event): void {
    console.log('Form submitted');
    event.preventDefault();
    if (!this.pokemonName().trim()) {
      this.errorMessage.set('Pokemon name is required');
      return;
    }
    const subscription = this.checkPokemon(this.pokemonName()).subscribe({
      next: (response) => {
        this.guesses.update(guesses => [...guesses, response]);
        const expires = new Date();
        expires.setHours(24, 0, 0, 0);
        this.cookieService.set('guesses', JSON.stringify(this.guesses()), { expires });
        if (response[0].result === true && response[1].result === true){
          this.guessed.set(true);
          console.log('You guessed correctly!');
        }
      },
      error: (error) => {
        this.errorMessage.set(error);
        console.error('There was an error!', error);
      }
    });
    this.subscriptions.add(subscription);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
