import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="auth-wrapper">
      <div class="auth-card">
        <div class="auth-header">
          <div class="brand-badge">N</div>
          <h2>Norfatek Operations Console</h2>
          <p>Restricted access for Norfatek engineers and admins</p>
        </div>

        <div *ngIf="errorMessage" class="error-banner">
          {{ errorMessage }}
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Admin Email</label>
            <input type="email" formControlName="email" class="form-input" placeholder="admin@norfatek.com">
          </div>

          <div class="form-group">
            <label>Password</label>
            <input type="password" formControlName="password" class="form-input" placeholder="••••••••••••">
          </div>

          <button type="submit" [disabled]="loginForm.invalid || isLoading" class="btn-spectre-primary w-full">
            {{ isLoading ? 'Authenticating...' : 'Sign In to Admin Dashboard' }}
          </button>
        </form>

        <!-- Quick Fill Helper for Demo -->
        <div class="demo-helper" (click)="quickFill()">
          <span>Identifiants : <strong>NORFATEK&#64;Contact.com</strong> | Pass: <strong>Admin1234</strong> (cliquez pour remplir)</span>
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
      font-size: 1.5rem;
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
      text-align: center;
    }
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
      border: 1px solid #3f3f46;
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
    .w-full { width: 100%; padding: 14px !important; font-size: 0.95rem !important; margin-top: 8px; }
    .demo-helper {
      margin-top: 24px;
      padding: 10px;
      background: #09090b;
      border: 1px dashed #3f3f46;
      border-radius: 8px;
      text-align: center;
      font-size: 0.78rem;
      color: #71717a;
      cursor: pointer;
      transition: all 0.2s;
    }
    .demo-helper:hover {
      border-color: #f97316;
      color: #f97316;
    }
  `]
})
export class AdminLoginComponent {
  fb = inject(FormBuilder);
  router = inject(Router);

  isLoading = false;
  errorMessage = '';

  loginForm: FormGroup = this.fb.group({
    email: ['NORFATEK@Contact.com', [Validators.required, Validators.email]],
    password: ['Admin1234', Validators.required]
  });

  quickFill(): void {
    this.loginForm.setValue({
      email: 'NORFATEK@Contact.com',
      password: 'Admin1234'
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    setTimeout(() => {
      this.isLoading = false;
      const isEmailValid = email.trim().toLowerCase() === 'norfatek@contact.com';
      const isPassValid = password === 'Admin1234';

      if (isEmailValid && isPassValid) {
        localStorage.setItem('norfatek_admin_logged', 'true');
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.errorMessage = 'Email ou mot de passe incorrect. Utilisez NORFATEK@Contact.com / Admin1234';
      }
    }, 500);
  }
}