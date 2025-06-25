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
      <ng-container *ngIf="showDescriptionAndDisclaimer">
        <div class="app-description animate-fade-in">
          <p>
            PairPizzazz is the free AI love compatibility test that instantly uncovers your name compatibility and
            hidden chemistry.
            Simply enter two names to receive a love match score<a href="#disclaimer"><sup>*</sup></a>, friendship score, and concise insight into how your
            name meanings and origins align—perfect for couples, friends, families, and anyone curious about their
            relationship compatibility.
          </p>
          <p>
            Our AI delivers a concise, personalized compatibility result with an honest match percentage.
            Discover why PairPizzazz is fast becoming the go-to tool for love matching, friendship scoring, and
            relationship compatibility online—try the free name compatibility test today!
          </p>
        </div>
      </ng-container>
      <ng-container *ngIf="showDescriptionAndDisclaimer">
        <div id="disclaimer" class="app-disclaimer">
          <span aria-label="warning" style="font-size:1.3em;line-height:1.1;">⚠️</span>
          <p>
            Disclaimer: PairPizzazz provides AI-generated name compatibility insights for entertainment and curiosity
            only. The analyses are based on creative interpretations of name meanings and public data, and they should
            not be taken as professional advice, scientific fact, or a guarantee of relationship outcomes. Use your own
            judgment and enjoy responsibly.
          </p>
        </div>
      </ng-container>
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

    .app-description {
      margin: 0 auto 2rem auto;
      font-size: 1.25rem;
      color: #6d3576;
      background: rgba(255,255,255,0.85);
      border-radius: 10px;
      padding: 1.5rem 1rem;
      box-shadow: 0 2px 12px rgba(123, 80, 156, 0.07);
      text-align: center;
    }

    .app-disclaimer {
      margin: 0 auto 2rem auto;
      font-size: 1rem;
      color: #a67c52;
      background: #fffbe6;
      border: 2px dashed #ffe066;
      border-radius: 10px;
      padding: 1rem 0.75rem;
      text-align: center;
      font-style: italic;
      box-shadow: none;
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      justify-content: center;
    }

    .app-disclaimer p {
      margin: 0;
      display: inline;
    }

    .app-description a {
      text-decoration: none;
    }
    .app-description a sup {
      text-decoration: none;
    }
  `]
})
export class HomeComponent {
  isLoading = false;
  result: string | null = null;
  error: string | null = null;
  showDescriptionAndDisclaimer = true;

  onLoadingChange(isLoading: boolean) {
    console.log('Loading state changed:', isLoading);
    this.isLoading = isLoading;
    this.showDescriptionAndDisclaimer = false;
  }

  onResultChange(result: string | null) {
    console.log('Result received:', result);
    this.result = result;
    this.showDescriptionAndDisclaimer = false;
  }

  onErrorChange(error: string | null) {
    console.log('Error received:', error);
    this.error = error;
    this.showDescriptionAndDisclaimer = false;
  }

  retry() {
    console.log('Retrying...');
    this.error = null;
    this.result = null;
    this.showDescriptionAndDisclaimer = false;
  }
} 