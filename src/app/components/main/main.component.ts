import { Component } from '@angular/core';
import {NavButtonComponent} from "../shared/nav-button/nav-button.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NavButtonComponent,
    RouterLink
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
