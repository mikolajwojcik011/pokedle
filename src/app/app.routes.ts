import { Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {ClassicComponent} from "./components/classic/classic.component";
import {DescriptionComponent} from "./components/description/description.component";
import {SilhouetteComponent} from "./components/silhouette/silhouette.component";

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'classic',
    component: ClassicComponent
  },
  {
    path: 'description',
    component: DescriptionComponent
  },
  {
    path: 'silhouette',
    component: SilhouetteComponent,
  }
];
