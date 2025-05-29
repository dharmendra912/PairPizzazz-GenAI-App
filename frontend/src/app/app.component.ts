import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimatedBackgroundComponent } from './components/animated-background/animated-background.component';
import { HealthService } from './services/health.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    AnimatedBackgroundComponent
  ],
  template: `
    <app-animated-background></app-animated-background>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PairPizzazz';

  constructor(private healthService: HealthService) {}

  ngOnInit() {
    // Call health check on app initializationd to fix cold start of backend.
    this.healthService.checkHealth();
  }
}
