import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-guess-tile',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './guess-tile.component.html',
  styleUrl: './guess-tile.component.css'
})
export class GuessTileComponent {
  @Input() isCorrect: boolean | null | number = null;

}
