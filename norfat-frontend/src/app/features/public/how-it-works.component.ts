import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="page-header">
      <div class="container">
        <div class="eyebrow-orange">OUR WORKFLOW</div>
        <h1 class="page-title">How Norfatek Works</h1>
        <p class="page-sub">From 3D CAD upload to certified parts at your door. One dedicated partner managing quality, lead times, and manufacturing execution.</p>
      </div>
    </header>

    <div class="container content-body">
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-num">01</div>
          <h3>Submit Your CAD &amp; Prints</h3>
          <p>Upload your 3D CAD models (STEP, STP, STL, IGES, SolidWorks) and 2D drawings with critical GD&amp;T specs through our RFQ portal.</p>
        </div>

        <div class="step-card">
          <div class="step-num">02</div>
          <h3>DFM Review &amp; Partner Matching</h3>
          <p>Our engineers perform a comprehensive Design for Manufacturability review and connect your project with the ideal qualified manufacturing partner.</p>
        </div>

        <div class="step-card">
          <div class="step-num">03</div>
          <h3>Guaranteed Production</h3>
          <p>We oversee setup, precision machining, in-process metrology, and tooling validation. Single point of contact with zero vendor headaches.</p>
        </div>

        <div class="step-card">
          <div class="step-num">04</div>
          <h3>Inspection &amp; Delivery</h3>
          <p>Parts undergo rigorous Zeiss CMM quality inspection with material test reports (MTR) and certificates of conformance delivered straight to you.</p>
        </div>
      </div>

      <div class="cta-banner">
        <h2>Ready to start your manufacturing project?</h2>
        <p>Get your engineering package reviewed by our team today.</p>
        <a routerLink="/contact" class="btn-spectre-primary mt-4">Request a Quote &rarr;</a>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      padding: 80px 0 60px 0;
      background: #09090b;
      border-bottom: 1px solid #27272a;
    }
    .eyebrow-orange {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      color: #f97316;
      letter-spacing: 0.15em;
      margin-bottom: 12px;
    }
    .page-title {
      font-size: 3.2rem;
      letter-spacing: -0.03em;
      margin-bottom: 16px;
    }
    .page-sub {
      font-size: 1.15rem;
      color: #a1a1aa;
      max-width: 750px;
      line-height: 1.6;
    }
    .content-body {
      padding: 80px 24px;
    }
    .steps-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      margin-bottom: 80px;
    }
    .step-card {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 20px;
      padding: 36px 28px;
      position: relative;
    }
    .step-num {
      font-family: var(--font-mono);
      font-size: 2.2rem;
      font-weight: 800;
      color: #f97316;
      margin-bottom: 16px;
    }
    .step-card h3 {
      font-size: 1.3rem;
      margin-bottom: 12px;
    }
    .step-card p {
      font-size: 0.9rem;
      color: #a1a1aa;
      line-height: 1.6;
    }
    .cta-banner {
      background: #18181b;
      border: 1px solid rgba(249, 115, 22, 0.3);
      border-radius: 24px;
      padding: 60px 40px;
      text-align: center;
    }
    .cta-banner h2 {
      font-size: 2.2rem;
      margin-bottom: 10px;
    }
    .cta-banner p {
      color: #a1a1aa;
      font-size: 1.1rem;
    }
    .mt-4 { margin-top: 24px; display: inline-block; }
    @media (max-width: 992px) {
      .steps-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 600px) {
      .steps-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class HowItWorksComponent {}