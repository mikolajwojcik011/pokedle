import {Component, Input} from '@angular/core';
import {NavButtonComponent} from "../nav-button/nav-button.component";
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

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
export class GuessedSectionComponent {
  @Input() pokemon: string | number = '';
  @Input() pokemonId: string | number = 0;
  @Input() numberOfTries: number = 0;
}
