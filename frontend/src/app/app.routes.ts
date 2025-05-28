import { Routes } from '@angular/router';
import { StatsComponent } from './stats/stats.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'stats', component: StatsComponent },
  { path: '', component: HomeComponent }
];
