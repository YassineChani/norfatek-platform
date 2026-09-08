import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="spectre-footer">
      <div class="container footer-grid">
        <div class="footer-left">
          <div class="footer-brand">
            <div class="footer-badge">N</div>
            <span class="footer-brand-name">NORFATEK MANUFACTURING NETWORK</span>
          </div>
          <p class="footer-addr">
            Norfatek provides on-demand manufacturing and engineering solutions by connecting customers with qualified manufacturing partners for CNC machining, Swiss machining, milling, 3D printing, prototyping, and more.
          </p>
          <p class="footer-contact">
            Direct Phone: <a href="tel:+15133022850">+1 (513) 302-2850</a><br>
            Engineering Inquiries: <a href="mailto:NORFATEK@Contact.com">NORFATEK@Contact.com</a>
          </p>
        </div>
        <div class="footer-right">
          <div class="footer-links-group">
            <div class="footer-heading">Services</div>
            <a routerLink="/services">CNC Machining</a>
            <a routerLink="/services">CNC Swiss Machining</a>
            <a routerLink="/services">CNC Milling</a>
            <a routerLink="/services">3D Printing</a>
            <a routerLink="/services">Prototyping</a>
            <a routerLink="/services">Engineering Support</a>
          </div>
          <div class="footer-links-group">
            <div class="footer-heading">Company</div>
            <a routerLink="/">Home</a>
            <a routerLink="/how-it-works">How It Works</a>
            <a routerLink="/industries">Industries</a>
            <a routerLink="/about">About Norfatek</a>
            <a routerLink="/contact">Request a Quote</a>
          </div>
        </div>
      </div>
      <div class="container footer-bottom">
        <div>&copy; 2026 Norfatek. All rights reserved. Precision Manufacturing. Simplified.</div>
        <div class="footer-certs">ISO 9001:2015 &bull; AS9100D &bull; ITAR Compliant Network</div>
      </div>
    </footer>
  `,
  styles: [`
    .spectre-footer {
      background: #000000;
      border-top: 1px solid #27272a;
      padding: 60px 0 32px 0;
      font-size: 0.88rem;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 60px;
      margin-bottom: 48px;
    }
    .footer-left {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .footer-brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .footer-badge {
      width: 28px;
      height: 28px;
      background: #f97316;
      color: #fff;
      font-weight: 800;
      font-size: 0.9rem;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .footer-brand-name {
      font-family: var(--font-heading);
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 0.05em;
    }
    .footer-addr {
      color: #a1a1aa;
      line-height: 1.6;
      max-width: 440px;
      margin: 0;
    }
    .footer-contact {
      color: #d4d4d8;
      line-height: 1.6;
      margin: 0;
    }
    .footer-contact a {
      color: #f97316;
      text-decoration: none;
    }
    .footer-right {
      display: flex;
      gap: 60px;
    }
    .footer-links-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .footer-heading {
      color: #ffffff;
      font-weight: 600;
      margin-bottom: 6px;
      font-size: 0.95rem;
    }
    .footer-links-group a {
      color: #a1a1aa;
      text-decoration: none;
      transition: color 0.2s;
    }
    .footer-links-group a:hover {
      color: #f97316;
    }
    .footer-bottom {
      border-top: 1px solid #18181b;
      padding-top: 24px;
      display: flex;
      justify-content: space-between;
      color: #71717a;
      font-size: 0.8rem;
      flex-wrap: wrap;
      gap: 12px;
    }
    .footer-certs {
      font-family: var(--font-mono);
      color: #a1a1aa;
    }

    @media (max-width: 768px) {
      .footer-grid { grid-template-columns: 1fr; }
      .footer-right { gap: 40px; }
      .footer-bottom { flex-direction: column; text-align: center; }
    }
  `]
})
export class FooterComponent {}