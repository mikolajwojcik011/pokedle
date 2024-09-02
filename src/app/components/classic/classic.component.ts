import { Component } from '@angular/core';

@Component({
  selector: 'app-classic',
  standalone: true,
  imports: [],
  templateUrl: './classic.component.html',
  styleUrl: './classic.component.css'
})
export class ClassicComponent {
  guesses: {
    pokemon: string,
    type1: string,
    type2: string | null,
    habitat: string,
    evolutionStage: number,
    height: number,
    weight: number
  }[] = [
    {
      pokemon: 'bulbasaur',
      type1: 'grass',
      type2: 'poison',
      habitat: 'grassland',
      evolutionStage: 1,
      height: 7,
      weight: 69
    },
    {
      pokemon: 'charmander',
      type1: 'fire',
      type2: null,
      habitat: 'mountain',
      evolutionStage: 1,
      height: 6,
      weight: 85
    },
    {
      pokemon: 'squirtle',
      type1: 'water',
      type2: null,
      habitat: 'waters-edge',
      evolutionStage: 1,
      height: 5,
      weight: 90
    },{
      pokemon: 'squirtle',
      type1: 'water',
      type2: null,
      habitat: 'waters-edge',
      evolutionStage: 1,
      height: 5,
      weight: 90
    },{
      pokemon: 'squirtle',
      type1: 'water',
      type2: null,
      habitat: 'waters-edge',
      evolutionStage: 1,
      height: 5,
      weight: 90
    },{
      pokemon: 'squirtle',
      type1: 'water',
      type2: null,
      habitat: 'waters-edge',
      evolutionStage: 1,
      height: 5,
      weight: 90
    },{
      pokemon: 'squirtle',
      type1: 'water',
      type2: null,
      habitat: 'waters-edge',
      evolutionStage: 1,
      height: 5,
      weight: 90
    },{
      pokemon: 'squirtle',
      type1: 'water',
      type2: null,
      habitat: 'waters-edge',
      evolutionStage: 1,
      height: 5,
      weight: 90
    },{
      pokemon: 'squirtle',
      type1: 'water',
      type2: null,
      habitat: 'waters-edge',
      evolutionStage: 1,
      height: 5,
      weight: 90
    },
  ];
}
