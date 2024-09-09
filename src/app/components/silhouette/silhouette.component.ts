import {Component, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {HeaderSectionComponent} from "../shared/header-section/header-section.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {NgClass} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {ConfettiUtil} from "../../utils/confetti.util";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {GuessedSectionComponent} from "../shared/guessed-section/guessed-section.component";
import {NavButtonComponent} from "../shared/nav-button/nav-button.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-silhouette',
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
  templateUrl: './silhouette.component.html',
  styleUrl: './silhouette.component.css',
  animations: [
    trigger('appearAnimation', [
      state('void', style({ transform: 'scale(0)' })),
      state('*', style({ transform: 'scale(1)' })),
      transition('void => *', animate('.1s ease-in-out')),
    ])
  ]
})
export class SilhouetteComponent implements OnInit, OnDestroy{
  pokemonName: WritableSignal<string> = signal<string>('');
  id: WritableSignal<number> = signal<number>(0);
  errorMessage: WritableSignal<string> = signal<string>('');
  guesses: WritableSignal<{pokemon: string, correct: boolean, id: number}[]> = signal<[]>([]);
  guessed: WritableSignal<boolean> = signal<boolean>(false);
  private subscriptions: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  ngOnInit() {
    this.getId();

    const cookieGuesses: string = this.cookieService.get('guessesSilhouette');
    if(cookieGuesses) {
      this.guesses.set(JSON.parse(cookieGuesses));
    }
    if(this.guesses().length > 0) {
      this.guessed.set(this.guesses().some((guess) => guess.correct));
      if (this.guessed()) ConfettiUtil.triggerConfetti()
    }
    console.log(this.guesses());
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  getId() {
    const subscription = this.http.get('http://localhost:3000/silhouette/get-pokemon-id').subscribe({
      next: (response: any) => {
        this.id.set(response.id);
      },
      error: (error: any) => {
        this.errorMessage.set('Failed to get Pokemon ID');
        console.error('Failed to get Pokemon ID:', error);
      }
    })
    this.subscriptions.add(subscription);
  }

  submitForm($event: SubmitEvent) {
    $event.preventDefault();
    this.checkPokemon();
  }

  checkPokemon() {
    const subscription = this.http.get('http://localhost:3000/silhouette/check-pokemon?name=' + this.pokemonName()).subscribe({
      next: (response:any) => {
        this.guesses.update((guesses) => {
          return [...guesses, {pokemon: this.pokemonName(), correct: response.correct, id: response.id}];
        });
        const expires = new Date();
        expires.setHours(24, 0, 0, 0);
        this.cookieService.set('guessesSilhouette', JSON.stringify(this.guesses()), { expires });
        if (response.correct){
          this.guessed.set(true);
          ConfettiUtil.triggerConfetti()
        }
      },
      error: (error: any) => {
        this.errorMessage.set('Failed to check Pokemon');
        console.error('Failed to check Pokemon:', error);
      }
    });
    this.subscriptions.add(subscription);
  }

  private unsubscribeAll() {
    this.subscriptions.unsubscribe();
  }
}


