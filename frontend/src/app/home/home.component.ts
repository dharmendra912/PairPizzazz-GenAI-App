import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NameFormComponent } from '../components/name-form/name-form.component';
import { ResultsDisplayComponent } from '../components/results-display/results-display.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NameFormComponent,
    ResultsDisplayComponent
  ],
  template: `
    <div class="content-wrapper">
      <h1 class="app-title animate-slide-down">
        <span class="gradient-text">Pair</span><span class="accent-text">Pizzazz</span>
      </h1>
      <div class="form-container">
        <app-name-form
          (loadingChange)="onLoadingChange($event)"
          (resultChange)="onResultChange($event)"
          (errorChange)="onErrorChange($event)"
        ></app-name-form>
      </div>
      <div #resultsContainer class="results-container">
        <app-results-display
          [isLoading]="isLoading"
          [result]="result"
          [error]="error"
          (onRetry)="retry()"
        ></app-results-display>
      </div>
    </div>
  `,
  styles: [`
    .content-wrapper {
      max-width: 800px;
      margin: 0 auto;
      width: 100%;
      padding: 20px;
      text-align: center;
    }

    .form-container {
      margin-bottom: 2rem;
    }

    .results-container {
      margin-top: 2rem;
    }

    .app-title {
      font-family: var(--font-fancy);
      font-size: 5rem;
      margin-bottom: 2rem;
      text-align: center;
      line-height: 1.2;
      letter-spacing: 2px;
      position: relative;
      padding: 1rem;
    }

    .gradient-text {
      background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: var(--primary-color);
      text-shadow: 
        3px 3px 6px rgba(138, 77, 124, 0.3),
        -1px -1px 0 rgba(255, 255, 255, 0.8),
        1px -1px 0 rgba(255, 255, 255, 0.8),
        -1px 1px 0 rgba(255, 255, 255, 0.8),
        1px 1px 0 rgba(255, 255, 255, 0.8);
      display: inline-block;
      transform: rotate(-2deg);
      filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
      position: relative;
      animation: floatText 3s ease-in-out infinite;
    }

    .accent-text {
      color: var(--secondary-color);
      text-shadow: 
        3px 3px 6px rgba(138, 77, 124, 0.3),
        -1px -1px 0 rgba(255, 255, 255, 0.8),
        1px -1px 0 rgba(255, 255, 255, 0.8),
        -1px 1px 0 rgba(255, 255, 255, 0.8),
        1px 1px 0 rgba(255, 255, 255, 0.8);
      display: inline-block;
      transform: rotate(2deg);
      filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
      position: relative;
      animation: floatText 3s ease-in-out infinite reverse;
    }

    @keyframes floatText {
      0%, 100% {
        transform: rotate(-2deg) translateY(0);
      }
      50% {
        transform: rotate(-2deg) translateY(-5px);
      }
    }

    @keyframes floatText {
      0%, 100% {
        transform: rotate(2deg) translateY(0);
      }
      50% {
        transform: rotate(2deg) translateY(-5px);
      }
    }

    @media (max-width: 768px) {
      .app-title {
        font-size: 4rem;
      }
    }

    @media (max-width: 480px) {
      .app-title {
        font-size: 3.5rem;
      }
    }
  `]
})
export class HomeComponent {
  isLoading = false;
  result: string | null = null;
  error: string | null = null;

  onLoadingChange(isLoading: boolean) {
    console.log('Loading state changed:', isLoading);
    this.isLoading = isLoading;
  }

  onResultChange(result: string | null) {
    console.log('Result received:', result);
    this.result = result;
  }

  onErrorChange(error: string | null) {
    console.log('Error received:', error);
    this.error = error;
  }

  retry() {
    console.log('Retrying...');
    this.error = null;
    this.result = null;
  }
} 