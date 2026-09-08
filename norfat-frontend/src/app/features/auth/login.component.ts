import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-wrapper">
      <div class="auth-card">
        <div class="auth-header">
          <div class="brand-badge">N</div>
          <h2>Staff &amp; Operations Portal</h2>
          <p>Restricted access for NORFAT manufacturing managers and engineers</p>
        </div>

        <div *ngIf="errorMessage" class="error-banner">
          {{ errorMessage }}
        </div>

        <!-- Quick Demo Credentials Selector -->
        <div class="demo-pills">
          <span class="demo-label">Staff Role:</span>
          <button type="button" (click)="fillDemo('admin')" class="btn-pill admin">Fill Admin Credentials</button>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Admin Email</label>
            <input type="email" formControlName="email" class="form-input" placeholder="admin@norfatmfg.com">
          </div>

          <div class="form-group">
            <label>Password</label>
            <input type="password" formControlName="password" class="form-input" placeholder="••••••••••••">
          </div>

          <button type="submit" [disabled]="loginForm.invalid || isLoading" class="btn-spectre-primary w-full">
            {{ isLoading ? 'Authenticating...' : 'Sign In as Operations Admin' }}
          </button>
        </form>

        <div class="auth-footer">
          <p>Looking to submit CAD files? <a routerLink="/portal/dashboard">Go to Client Hub (No login required) &rarr;</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-wrapper {
      min-height: calc(100vh - 160px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 60px 24px;
      background: #09090b;
    }
    .auth-card {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 24px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      width: 100%;
      max-width: 440px;
      padding: 44px 36px;
    }
    .auth-header {
      text-align: center;
      margin-bottom: 28px;
    }
    .brand-badge {
      width: 48px;
      height: 48px;
      background: #f97316;
      color: #ffffff;
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: 1.5rem;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 25px rgba(249, 115, 22, 0.4);
      margin-bottom: 16px;
    }
    .auth-header h2 {
      font-size: 1.6rem;
      letter-spacing: -0.02em;
      margin-bottom: 6px;
    }
    .auth-header p {
      font-size: 0.88rem;
      color: #a1a1aa;
    }
    .error-banner {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #f87171;
      font-size: 0.85rem;
      padding: 10px 14px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .demo-pills {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 24px;
      background: #09090b;
      border: 1px solid #27272a;
      padding: 10px 14px;
      border-radius: 12px;
    }
    .demo-label {
      font-size: 0.78rem;
      font-weight: 600;
      color: #71717a;
      font-family: var(--font-mono);
    }
    .btn-pill {
      background: #f97316;
      color: #fff;
      border: none;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .btn-pill:hover { opacity: 0.85; }
    .btn-pill.admin { background: #3f3f46; }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      font-size: 0.85rem;
      font-weight: 500;
      color: #d4d4d8;
      margin-bottom: 8px;
    }
    .form-input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #27272a;
      border-radius: 12px;
      font-size: 0.95rem;
      background: #09090b;
      color: #ffffff;
      transition: border-color 0.2s;
    }
    .form-input:focus {
      outline: none;
      border-color: #f97316;
    }
    .w-full { width: 100%; padding: 13px !important; }
    .auth-footer {
      text-align: center;
      margin-top: 28px;
      font-size: 0.88rem;
      color: #a1a1aa;
    }
    .auth-footer a {
      color: #f97316;
      font-weight: 600;
    }
  `]
})
export class LoginComponent {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  isLoading = false;
  errorMessage = '';

  loginForm: FormGroup = this.fb.group({
    email: ['admin@norfatmfg.com', [Validators.required, Validators.email]],
    password: ['Admin@Norfat2026!', Validators.required]
  });

  fillDemo(type: 'admin') {
    this.loginForm.setValue({
      email: 'admin@norfatmfg.com',
      password: 'Admin@Norfat2026!'
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.role === 'Admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/portal/dashboard']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Invalid credentials or server unavailable.';
      }
    });
  }
}