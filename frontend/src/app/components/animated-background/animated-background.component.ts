import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animated-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animated-background">
      <div class="sparkles">
        <div *ngFor="let sparkle of sparkles" class="sparkle" [style.left.%]="sparkle.left" [style.animation-delay.s]="sparkle.delay">
          <i class="bi bi-stars"></i>
        </div>
      </div>
      <div class="hearts">
        <div *ngFor="let heart of hearts" class="heart" [style.left.%]="heart.left" [style.animation-delay.s]="heart.delay">
          <i class="bi bi-heart-fill"></i>
        </div>
      </div>
      <div class="flowers">
        <div *ngFor="let flower of flowers" class="flower" [style.left.%]="flower.left" [style.animation-delay.s]="flower.delay">
          <i class="bi bi-flower1"></i>
        </div>
      </div>
      <div class="butterflies">
        <div *ngFor="let butterfly of butterflies" class="butterfly" [style.left.%]="butterfly.left" [style.animation-delay.s]="butterfly.delay">
          <i class="bi bi-butterfly"></i>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animated-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      overflow: hidden;
      background: linear-gradient(135deg, rgba(255, 192, 203, 0.1), rgba(255, 182, 193, 0.1));
    }

    .sparkle, .heart, .flower, .butterfly {
      position: absolute;
      opacity: 0;
      font-size: 1.5rem;
      filter: drop-shadow(0 0 5px rgba(123, 80, 156, 0.3));
    }

    .sparkle {
      animation: floatSparkle 12s ease-in-out infinite;
      color: var(--primary-color);
    }

    .heart {
      animation: floatHeart 15s ease-in-out infinite;
      color: var(--secondary-color);
    }

    .flower {
      animation: floatFlower 18s ease-in-out infinite;
      color: #ff69b4;
    }

    .butterfly {
      animation: floatButterfly 20s ease-in-out infinite;
      color: #9370db;
    }

    @keyframes floatSparkle {
      0% {
        transform: translateY(100vh) scale(0);
        opacity: 0;
      }
      20% {
        opacity: 0.6;
      }
      80% {
        opacity: 0.6;
      }
      100% {
        transform: translateY(-100px) scale(1);
        opacity: 0;
      }
    }

    @keyframes floatHeart {
      0% {
        transform: translateY(100vh) scale(0) rotate(0deg);
        opacity: 0;
      }
      20% {
        opacity: 0.5;
      }
      80% {
        opacity: 0.5;
      }
      100% {
        transform: translateY(-100px) scale(1) rotate(360deg);
        opacity: 0;
      }
    }

    @keyframes floatFlower {
      0% {
        transform: translateY(100vh) scale(0) rotate(0deg);
        opacity: 0;
      }
      20% {
        opacity: 0.4;
      }
      80% {
        opacity: 0.4;
      }
      100% {
        transform: translateY(-100px) scale(1) rotate(-360deg);
        opacity: 0;
      }
    }

    @keyframes floatButterfly {
      0% {
        transform: translateY(100vh) scale(0) translateX(0);
        opacity: 0;
      }
      20% {
        opacity: 0.5;
      }
      50% {
        transform: translateY(50vh) scale(1) translateX(50px);
      }
      80% {
        opacity: 0.5;
      }
      100% {
        transform: translateY(-100px) scale(1) translateX(-50px);
        opacity: 0;
      }
    }
  `]
})
export class AnimatedBackgroundComponent {
  sparkles = Array.from({ length: 12 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 12
  }));

  hearts = Array.from({ length: 8 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 15
  }));

  flowers = Array.from({ length: 6 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 18
  }));

  butterflies = Array.from({ length: 4 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 20
  }));
} 