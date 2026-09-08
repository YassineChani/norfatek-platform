import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="page-header">
      <div class="container">
        <div class="eyebrow-orange">ABOUT NORFATEK</div>
        <h1 class="page-title">Engineering Knowledge. Manufacturing Connections.</h1>
        <p class="page-sub">Norfatek was created to simplify the way companies source custom manufactured components.</p>
      </div>
    </header>

    <div class="container about-body">
      <div class="about-grid">
        <div class="about-text">
          <h2>Simplifying Custom Manufacturing</h2>
          <p>Our approach combines manufacturing engineering knowledge with a network of specialized manufacturing partners to help customers move from design to finished parts.</p>
          <p>From prototypes to production quantities, Norfatek provides a single point of contact for sourcing, engineering support and manufacturing coordination.</p>
          
          <div class="mission-banner">
            <h3>Our Mission</h3>
            <p>Make manufacturing easier, more accessible and more responsive for engineers, purchasing teams and product developers.</p>
          </div>

          <div class="about-pillars">
            <div class="pillar-item">
              <div class="p-num">01</div>
              <div>
                <h4>Qualified Partner Network</h4>
                <p>We work exclusively with audited, highly capable manufacturing facilities equipped with modern CNC and additive equipment.</p>
              </div>
            </div>

            <div class="pillar-item">
              <div class="p-num">02</div>
              <div>
                <h4>Engineering-First Focus</h4>
                <p>We review technical drawings, GD&amp;T specifications, and material requirements to ensure flawless execution.</p>
              </div>
            </div>

            <div class="pillar-item">
              <div class="p-num">03</div>
              <div>
                <h4>End-to-End Coordination</h4>
                <p>From DFM quote to shipping and certified metrology reports, we manage the entire manufacturing lifecycle.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="about-image-wrap">
          <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80" alt="Norfatek Manufacturing Partner Network Floor" class="about-img">
        </div>
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
      line-height: 1.15;
    }
    .page-sub {
      font-size: 1.15rem;
      color: #a1a1aa;
      max-width: 750px;
    }
    .about-body {
      padding: 80px 24px;
    }
    .about-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 60px;
      align-items: start;
    }
    .about-text h2 {
      font-size: 2.2rem;
      margin-bottom: 20px;
    }
    .about-text p {
      font-size: 1.05rem;
      color: #a1a1aa;
      line-height: 1.7;
      margin-bottom: 18px;
    }
    .mission-banner {
      background: #18181b;
      border-left: 4px solid #f97316;
      border-radius: 0 16px 16px 0;
      padding: 24px 28px;
      margin: 32px 0 40px 0;
    }
    .mission-banner h3 {
      font-size: 1.3rem;
      color: #f97316;
      margin-bottom: 8px;
    }
    .mission-banner p {
      font-size: 1.1rem;
      color: #ffffff !important;
      margin-bottom: 0 !important;
      font-style: italic;
    }
    .about-pillars {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .pillar-item {
      display: flex;
      gap: 20px;
      align-items: flex-start;
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 14px;
      padding: 20px 24px;
    }
    .p-num {
      font-family: var(--font-mono);
      font-size: 1.3rem;
      font-weight: 800;
      color: #f97316;
    }
    .pillar-item h4 {
      font-size: 1.1rem;
      margin-bottom: 4px;
      color: #ffffff;
    }
    .pillar-item p {
      font-size: 0.9rem;
      color: #a1a1aa;
      margin-bottom: 0;
      line-height: 1.5;
    }
    .about-image-wrap {
      border-radius: 24px;
      overflow: hidden;
      border: 1px solid #27272a;
    }
    .about-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    @media (max-width: 992px) {
      .about-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class AboutComponent {}