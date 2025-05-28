import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

interface NameConnectionResponse {
  [key: string]: string;
}

@Component({
  selector: 'app-name-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4 animate-fade-in">
      <div class="card p-4 animate-slide-up">
        <h2 class="text-center mb-4 animate-fade-in fancy-title">Love Connection</h2>
        <form [formGroup]="nameForm" (ngSubmit)="onSubmit()">
          <div class="form-group mb-4 animate-slide-in">
            <label for="name1" class="form-label fancy-label">Your Name</label>
            <input
              type="text"
              id="name1"
              formControlName="name1"
              class="form-control"
              (keypress)="onlyAlphabets($event)"
              [class.is-invalid]="name1.invalid && name1.touched"
              placeholder="Enter your name"
              autocomplete="off"
            />
            @if (name1.invalid && name1.touched) {
              <div class="invalid-feedback animate-slide-in">
                @if (name1.errors?.['required']) {
                  <div>Name is required</div>
                }
                @if (name1.errors?.['minlength']) {
                  <div>Name must be at least 3 characters</div>
                }
                @if (name1.errors?.['invalidCharacters']) {
                  <div>Only alphabets are allowed</div>
                }
                @if (name1.errors?.['maxlength']) {
                  <div>Maximum 20 characters allowed</div>
                }
                @if (name1.errors?.['hasSpaces']) {
                  <div>No spaces allowed</div>
                }
              </div>
            }
          </div>

          <div class="form-group mb-4 animate-slide-in" style="animation-delay: 0.2s">
            <label for="name2" class="form-label fancy-label">Your Crush/Partner's Name</label>
            <input
              type="text"
              id="name2"
              formControlName="name2"
              class="form-control"
              (keypress)="onlyAlphabets($event)"
              [class.is-invalid]="name2.invalid && name2.touched"
              placeholder="Enter their name"
              autocomplete="off"
            />
            @if (name2.invalid && name2.touched) {
              <div class="invalid-feedback animate-slide-in">
                @if (name2.errors?.['required']) {
                  <div>Name is required</div>
                }
                @if (name2.errors?.['minlength']) {
                  <div>Name must be at least 3 characters</div>
                }
                @if (name2.errors?.['invalidCharacters']) {
                  <div>Only alphabets are allowed</div>
                }
                @if (name2.errors?.['maxlength']) {
                  <div>Maximum 20 characters allowed</div>
                }
                @if (name2.errors?.['hasSpaces']) {
                  <div>No spaces allowed</div>
                }
              </div>
            }
          </div>

          <button
            type="submit"
            class="btn btn-primary w-100 animate-slide-in fancy-button"
            [disabled]="nameForm.invalid || isLoading"
            style="animation-delay: 0.4s"
          >
            @if (isLoading) {
              <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Loading...
            } @else {
              Discover Your Connection
            }
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 0 15px;
    }
    
    .card {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      box-shadow: 0 8px 32px rgba(123, 80, 156, 0.1);
      transition: transform 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-5px);
    }

    .fancy-title {
      font-family: var(--font-fancy);
      font-size: 2.5rem;
      color: var(--primary-color);
      text-shadow: 2px 2px 4px rgba(123, 80, 156, 0.1);
    }
    
    .fancy-label {
      font-family: var(--font-heading);
      font-weight: 500;
      color: var(--text-color);
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }
    
    .form-control {
      padding: 0.75rem 1rem;
      font-size: 1rem;
      border-radius: 8px;
      border: 2px solid var(--accent-color);
      transition: all 0.3s ease;
      font-family: var(--font-body);
      color: var(--text-color);
    }
    
    .form-control::placeholder {
      color: rgba(74, 45, 92, 0.5);
    }
    
    .form-control:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 0.2rem rgba(123, 80, 156, 0.25);
    }
    
    .fancy-button {
      padding: 0.75rem 1.5rem;
      font-size: 1.1rem;
      font-weight: 500;
      border-radius: 8px;
      transition: all 0.3s ease;
      background: var(--primary-color);
      border: none;
      font-family: var(--font-heading);
      letter-spacing: 0.5px;
    }
    
    .fancy-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(123, 80, 156, 0.2);
      background: var(--secondary-color);
    }
    
    .fancy-button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    /* Animations */
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out;
    }

    .animate-slide-up {
      animation: slideUp 0.5s ease-out;
    }

    .animate-slide-in {
      animation: slideIn 0.3s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
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

    /* Mobile Responsiveness */
    @media (max-width: 576px) {
      .container {
        padding: 0 10px;
      }
      
      .card {
        padding: 1rem !important;
      }
      
      .form-control {
        font-size: 16px; /* Prevents zoom on iOS */
        padding: 0.6rem 0.8rem;
      }
      
      .btn-primary {
        padding: 0.6rem 1.2rem;
        font-size: 1rem;
      }
      
      h2 {
        font-size: 1.5rem;
      }
    }

    /* Touch Device Optimizations */
    @media (hover: none) {
      .card:hover {
        transform: none;
      }
      
      .btn-primary:hover:not(:disabled) {
        transform: none;
      }
      
      .form-control:focus {
        border-color: var(--primary-color);
        box-shadow: none;
      }
    }
  `]
})
export class NameFormComponent implements OnInit {
  nameForm: FormGroup;
  isLoading = false;
  @Output() loadingChange = new EventEmitter<boolean>();
  @Output() resultChange = new EventEmitter<string | null>();
  @Output() errorChange = new EventEmitter<string | null>();

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.nameForm = this.fb.group({
      name1: ['', [
        Validators.required,
        this.noSpacesValidator,
        this.onlyAlphabetsValidator,
        Validators.maxLength(20),
        Validators.minLength(3)
      ]],
      name2: ['', [
        Validators.required,
        this.noSpacesValidator,
        this.onlyAlphabetsValidator,
        Validators.maxLength(20),
        Validators.minLength(3)
      ]]
    });
  }

  ngOnInit(): void {}

  get name1() {
    return this.nameForm.get('name1')!;
  }

  get name2() {
    return this.nameForm.get('name2')!;
  }

  onlyAlphabets(event: KeyboardEvent): boolean {
    const pattern = /^[a-zA-Z]+$/;
    return pattern.test(event.key);
  }

  noSpacesValidator(control: FormControl) {
    if (control.value && control.value.includes(' ')) {
      return { hasSpaces: true };
    }
    return null;
  }

  onlyAlphabetsValidator(control: FormControl) {
    if (control.value && !/^[a-zA-Z]+$/.test(control.value)) {
      return { invalidCharacters: true };
    }
    return null;
  }

  onSubmit() {
    if (this.nameForm.valid) {
      this.isLoading = true;
      this.loadingChange.emit(true);
      this.errorChange.emit(null);
      this.resultChange.emit(null);

      const { name1, name2 } = this.nameForm.value;
      
      this.apiService.getNamesConnection(name1, name2).subscribe({
        next: (response: NameConnectionResponse) => {
          console.log('API Response:', response);
          this.isLoading = false;
          this.loadingChange.emit(false);
          // Get the first value from the response map
          const result = Object.values(response)[0];
          this.resultChange.emit(result);
        },
        error: (error: any) => {
          console.error('API Error:', error);
          this.isLoading = false;
          this.loadingChange.emit(false);
          this.errorChange.emit(error.error?.message || 'An error occurred');
        }
      });
    }
  }
} 