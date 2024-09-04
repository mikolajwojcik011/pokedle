import {Component, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {HeaderSectionComponent} from "../shared/header-section/header-section.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, Subscription, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {GuessedSectionComponent} from "../shared/guessed-section/guessed-section.component";
import {NavButtonComponent} from "../shared/nav-button/nav-button.component";
import {RouterLink} from "@angular/router";
import {ConfettiUtil} from "../../utils/confetti.util";
import {CookieService} from "ngx-cookie-service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [
    HeaderSectionComponent,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    GuessedSectionComponent,
    NavButtonComponent,
    RouterLink
  ],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css',
  animations: [
    trigger('appearAnimation', [
      state('void', style({ transform: 'scale(0)' })),
      state('*', style({ transform: 'scale(1)' })),
      transition('void => *', animate('.1s ease-in-out')),
    ])
  ]
})
export class DescriptionComponent implements OnInit, OnDestroy {
  pokemonName: WritableSignal<string> = signal<string>('');
  description: WritableSignal<string> = signal<string>('');
  errorMessage: WritableSignal<string> = signal<string>('');
  guesses: WritableSignal<{pokemon: string, correct: boolean, id: number}[]> = signal<[]>([]);
  guessed: WritableSignal<boolean> = signal<boolean>(false);
  private subscriptions: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.getDescription();

    const cookieGuesses: string = this.cookieService.get('guessesDescription');
    if (cookieGuesses) {
      this.guesses.set(JSON.parse(cookieGuesses));
    }
    if(this.guesses().length > 0) {
      this.guessed.set(this.guesses().some((guess) => guess.correct));
      if (this.guessed()) ConfettiUtil.triggerConfetti()
    }
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  getDescription() {
    const subscription =  this.http.get('http://localhost:3000/description/get-flavor-text').subscribe({
      next: (response: any) => {
        this.description.set(response);
      },
      error: (error: any) => {
        this.errorMessage.set(error);
        console.error('There was an error!', error);
      }
    });
    this.subscriptions.add(subscription);
  }

  checkPokemon(pokemonName: string): Observable<any> {
    return this.http.get(`http://localhost:3000/description/check-pokemon?name=${pokemonName}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  submitForm($event: SubmitEvent) {
    $event.preventDefault();
    if (!this.pokemonName().trim()) {
      this.errorMessage.set('Pokemon name is required');
      return;
    }
    const subscription = this.checkPokemon(this.pokemonName()).subscribe({
      next: (response) => {
        this.guesses.update((guesses) => {
          return [...guesses, {pokemon: this.pokemonName(), correct: response.correct, id: response.id}];
        });
        const expires = new Date();
        expires.setHours(24, 0, 0, 0);
        this.cookieService.set('guessesDescription', JSON.stringify(this.guesses()), { expires });
        if (response.correct){
          this.guessed.set(true);
          ConfettiUtil.triggerConfetti()
        }
      },
      error: (error) => {
        this.errorMessage.set(error);
        console.error('There was an error!', error);
      }
    });
    this.subscriptions.add(subscription);
  }

  private unsubscribeAll() {
    this.subscriptions.unsubscribe();
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

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
