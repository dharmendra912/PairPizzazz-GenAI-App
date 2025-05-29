import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="results-wrapper animate-fade-in">
      @if (isLoading) {
        <div class="loading-container animate-pulse">
          <div class="ai-loading">
            <i class="bi bi-cpu-fill"></i>
            <i class="bi bi-robot"></i>
            <i class="bi bi-braces-asterisk"></i>
          </div>
          <p class="loading-text">AI is analyzing your connection...</p>
        </div>
      } @else if (error) {
        <div class="error-container animate-slide-in">
          <div class="error-icon">
            <i class="bi bi-exclamation-triangle-fill"></i>
          </div>
          <p class="error-text">{{ error }}</p>
          <button class="retry-button animate-fade-in" (click)="onRetry.emit()">
            <i class="bi bi-arrow-clockwise"></i>
            Try Again
          </button>
        </div>
      } @else if (result) {
        <div class="result-card animate-slide-up">
          <h3 class="result-title animate-fade-in">Love Connection</h3>
          <div class="result-content animate-fade-in">
            <p class="result-text">{{ result }}</p>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .results-wrapper {
      max-width: 600px;
      margin: 0 auto;
      padding: 1rem;
    }

    .loading-container {
      text-align: center;
      padding: 2rem;
    }

    .ai-loading {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .ai-loading i {
      font-size: 2rem;
      color: var(--primary-color);
      animation: aiPulse 1.5s ease-in-out infinite;
    }

    .ai-loading i:nth-child(1) {
      animation-delay: 0s;
    }

    .ai-loading i:nth-child(2) {
      animation-delay: 0.5s;
    }

    .ai-loading i:nth-child(3) {
      animation-delay: 1s;
    }

    @keyframes aiPulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.2);
        opacity: 0.7;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .loading-text {
      margin-top: 1rem;
      color: var(--text-color);
      font-family: var(--font-heading);
      font-size: 1.1rem;
    }

    .error-container {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 8px 32px rgba(123, 80, 156, 0.1);
    }

    .error-icon {
      font-size: 2rem;
      color: var(--error-color);
      margin-bottom: 1rem;
    }

    .error-text {
      color: var(--text-color);
      font-family: var(--font-heading);
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }

    .retry-button {
      background: var(--primary-color);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-family: var(--font-heading);
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .retry-button:hover {
      background: var(--secondary-color);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(123, 80, 156, 0.2);
    }

    .result-card {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      padding: 2rem;
      box-shadow: 0 8px 32px rgba(123, 80, 156, 0.1);
    }

    .result-title {
      font-family: 'Great Vibes', cursive;
      color: var(--primary-color);
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
      text-align: center;
      text-shadow: 2px 2px 4px rgba(123, 80, 156, 0.1);
      font-weight: 400;
      letter-spacing: 2px;
    }

    .result-content {
      background: rgba(255, 255, 255, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      max-height: 400px;
      overflow-y: auto;
    }

    .result-text {
      font-family: var(--font-heading);
      font-size: 1.1rem;
      line-height: 1.6;
      color: var(--text-color);
      margin: 0;
      white-space: pre-line;
    }

    /* Scrollbar Styling */
    .result-content::-webkit-scrollbar {
      width: 8px;
    }

    .result-content::-webkit-scrollbar-track {
      background: rgba(123, 80, 156, 0.05);
      border-radius: 4px;
    }

    .result-content::-webkit-scrollbar-thumb {
      background: rgba(123, 80, 156, 0.2);
      border-radius: 4px;
    }

    .result-content::-webkit-scrollbar-thumb:hover {
      background: rgba(123, 80, 156, 0.3);
    }

    /* Animations */
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out;
    }

    .animate-slide-in {
      animation: slideIn 0.3s ease-out;
    }

    .animate-slide-up {
      animation: slideUp 0.5s ease-out;
    }

    .animate-pulse {
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }

    /* Mobile Responsiveness */
    @media (max-width: 576px) {
      .results-wrapper {
        padding: 0.5rem;
      }

      .result-card {
        padding: 1.5rem;
      }

      .result-title {
        font-size: 1.75rem;
      }

      .result-text {
        font-size: 1rem;
      }
    }
  `]
})
export class ResultsDisplayComponent {
  @Input() isLoading = false;
  @Input() error: string | null = null;
  @Input() result: string | null = null;
  @Output() onRetry = new EventEmitter<void>();
} 