import {Component, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {NavButtonComponent} from "../nav-button/nav-button.component";
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {interval, takeWhile} from "rxjs";

@Component({
  selector: 'app-guessed-section',
  standalone: true,
  imports: [
    NavButtonComponent,
    RouterLink,
    NgClass
  ],
  templateUrl: './guessed-section.component.html',
  styleUrl: './guessed-section.component.css'
})
export class GuessedSectionComponent implements OnInit {
  @Input() pokemon: string | number = '';
  @Input() pokemonId: string | number = 0;
  @Input() numberOfTries: number = 0;
  countdown: WritableSignal<string> = signal<string>('00:00:00');

  ngOnInit() {
    this.startCountdownToNextDay();
  }

  startCountdownToNextDay() {
    const now: Date = new Date();
    const nextMidnight: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const endTime: number = nextMidnight.getTime();

    interval(1000).pipe(
      takeWhile((): boolean => Date.now() < endTime)
    ).subscribe(() => {
      const remaining: number = Math.max(0, endTime - Date.now());
      const hours: number = Math.floor(remaining / 3600000);
      const minutes: number = Math.floor((remaining % 3600000) / 60000);
      const seconds: number = Math.floor((remaining % 60000) / 1000);
      this.countdown.set(`${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`);
    });
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
