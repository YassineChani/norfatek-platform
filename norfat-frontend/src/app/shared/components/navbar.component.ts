import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="spectre-nav">
      <div class="container nav-inner">
        <!-- Brand Logo Lockup -->
        <a routerLink="/" class="brand-box">
          <img src="assets/logos/norfatek-vector-logo.svg" alt="NORFATEK Precision Manufacturing Simplified" class="brand-logo-img">
        </a>

        <!-- Links Matching Exact Specification -->
        <div class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/services" routerLinkActive="active">Services</a>
          <a routerLink="/how-it-works" routerLinkActive="active">How It Works</a>
          <a routerLink="/industries" routerLinkActive="active">Industries</a>
          <a routerLink="/about" routerLinkActive="active">About</a>
        </div>

        <!-- Single Action CTA Button: Request a Quote (NO ADMIN DASHBOARD, NO LOGIN) -->
        <div class="nav-actions">
          <a routerLink="/contact" class="btn-spectre-primary btn-nav-cta">Request a Quote</a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .spectre-nav {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(24, 24, 27, 0.95);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid #27272a;
      height: 80px;
      display: flex;
      align-items: center;
    }
    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    .brand-box {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
    }
    .brand-logo-img {
      height: 52px;
      width: auto;
      object-fit: contain;
      display: block;
    }
    .brand-symbol {
      width: 40px;
      height: 40px;
      background: #f97316;
      color: #ffffff;
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: 1.3rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 20px rgba(249, 115, 22, 0.4);
    }
    .brand-text {
      display: flex;
      flex-direction: column;
    }
    .brand-title {
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: 1.25rem;
      letter-spacing: -0.01em;
      color: #ffffff;
      line-height: 1.1;
    }
    .brand-sub {
      font-family: var(--font-mono);
      font-size: 0.62rem;
      letter-spacing: 0.12em;
      color: #a1a1aa;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 32px;
    }
    .nav-links a {
      color: #a1a1aa;
      text-decoration: none;
      font-size: 0.92rem;
      font-weight: 500;
      transition: color 0.2s;
    }
    .nav-links a:hover,
    .nav-links a.active {
      color: #ffffff;
    }
    .nav-links a.active {
      font-weight: 600;
      color: #f97316;
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .btn-nav-cta {
      padding: 10px 24px !important;
      font-size: 0.88rem !important;
    }
    @media (max-width: 992px) {
      .nav-links {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {}