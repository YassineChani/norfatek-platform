import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-wrapper blueprint-grid">
      <div class="auth-card">
        <div class="auth-header">
          <img src="assets/logos/logo-navy.svg" alt="NORFAT Manufacturing &amp; Supply" class="auth-logo">
          <h2>Create Client Account</h2>
          <p>Register for the NORFAT Project &amp; CAD Tracking Portal</p>
        </div>

        <div *ngIf="errorMessage" class="error-banner">
          {{ errorMessage }}
        </div>

        <form [formGroup]="regForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Full Name *</label>
            <input type="text" formControlName="fullName" class="form-input" placeholder="e.g. Alex Henderson">
          </div>

          <div class="form-group">
            <label>Company / Organization Name *</label>
            <input type="text" formControlName="companyName" class="form-input" placeholder="e.g. Stratos Aerospace Inc">
          </div>

          <div class="form-group">
            <label>Corporate Email *</label>
            <input type="email" formControlName="email" class="form-input" placeholder="a.henderson@stratos.com">
          </div>

          <div class="form-group">
            <label>Direct Phone</label>
            <input type="text" formControlName="phoneNumber" class="form-input" placeholder="+1 (555) 345-6789">
          </div>

          <div class="form-group">
            <label>Password * (Minimum 6 characters)</label>
            <input type="password" formControlName="password" class="form-input" placeholder="••••••••••••">
          </div>

          <button type="submit" [disabled]="regForm.invalid || isLoading" class="btn-precision-primary w-full">
            {{ isLoading ? 'Creating Account...' : 'Register Company Account' }}
          </button>
        </form>

        <div class="auth-footer">
          <p>Already have an account? <a routerLink="/auth/login">Sign in</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-wrapper {
      min-height: calc(100vh - 300px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 60px 24px;
      background: #F1F5F9;
    }
    .auth-card {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(11, 45, 79, 0.08);
      width: 100%;
      max-width: 480px;
      padding: 40px 32px;
    }
    .auth-header {
      text-align: center;
      margin-bottom: 24px;
      .auth-logo { height: 48px; margin-bottom: 16px; }
      h2 { font-size: 1.5rem; color: #0B2D4F; margin-bottom: 4px; }
      p { font-size: 0.88rem; color: #64748B; }
    }
    .error-banner {
      background: #FEE2E2;
      border: 1px solid #F87171;
      color: #991B1B;
      font-size: 0.85rem;
      padding: 10px 14px;
      border-radius: 4px;
      margin-bottom: 18px;
    }
    .form-group {
      margin-bottom: 16px;
      label {
        display: block;
        font-size: 0.85rem;
        font-weight: 600;
        color: #0B2D4F;
        margin-bottom: 6px;
      }
    }
    .form-input {
      width: 100%;
      padding: 10px 14px;
      border: 1px solid #CBD5E1;
      border-radius: 4px;
      font-size: 0.95rem;
      background: #F8FAFC;
      &:focus {
        outline: none;
        border-color: #0078FF;
        background: #fff;
        box-shadow: 0 0 0 3px rgba(0, 120, 255, 0.15);
      }
    }
    .w-full { width: 100%; }
    .auth-footer {
      text-align: center;
      margin-top: 24px;
      font-size: 0.88rem;
      color: #64748B;
    }
  `]
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  isLoading = false;
  errorMessage = '';

  regForm: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    companyName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: [''],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.regForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.auth.register(this.regForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/portal/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Failed to register account.';
      }
    });
  }
}
