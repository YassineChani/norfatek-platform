import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="page-header">
      <div class="container">
        <div class="eyebrow-orange">SECTORS &amp; MARKETS</div>
        <h1 class="page-title">Industries We Support</h1>
        <p class="page-sub">Precision manufactured components engineered for demanding specifications across commercial, industrial, and high-reliability sectors.</p>
      </div>
    </header>

    <div class="container content-body">
      <div class="industries-grid">
        <div class="industry-card">
          <div class="ind-icon">🚗</div>
          <h3>Automotive</h3>
          <p>Powertrain brackets, fluid delivery blocks, performance manifolds, chassis mounting hardware, and custom EV prototypes.</p>
        </div>

        <div class="industry-card">
          <div class="ind-icon">🏭</div>
          <h3>Industrial Manufacturing</h3>
          <p>Heavy-duty wear plates, hydraulic manifold blocks, pneumatic cylinders, specialized tooling fixtures, and machine spares.</p>
        </div>

        <div class="industry-card">
          <div class="ind-icon">⚡</div>
          <h3>Automation</h3>
          <p>Precision linear guide brackets, conveyor drive hubs, pneumatic gripper plates, sensor mounts, and rotary indexer components.</p>
        </div>

        <div class="industry-card">
          <div class="ind-icon">🤖</div>
          <h3>Robotics</h3>
          <p>High strength-to-weight link arms, harmonic drive adapter plates, end-of-arm tooling (EOAT), and actuator motor housings.</p>
        </div>

        <div class="industry-card">
          <div class="ind-icon">💡</div>
          <h3>Product Development</h3>
          <p>Fast-turn proof-of-concept parts, functional fit-check prototypes, DMLS 3D metal prints, and industrial enclosure designs.</p>
        </div>

        <div class="industry-card">
          <div class="ind-icon">⚙️</div>
          <h3>Machinery &amp; Equipment</h3>
          <p>Precision shafts, splined hubs, bearing retainers, gearbox housings, and high-wear components with specialized thermal treatment.</p>
        </div>

        <div class="industry-card">
          <div class="ind-icon">📐</div>
          <h3>Engineering &amp; Design</h3>
          <p>Design validation models, test bench fixtures, structural load cells, custom metrology jigs, and complex multi-axis parts.</p>
        </div>

        <div class="industry-card">
          <div class="ind-icon">📦</div>
          <h3>Consumer Products</h3>
          <p>Custom aesthetic aluminum bezels, stainless hardware, polymer housings, ergonomic components, and premium metal finishes.</p>
        </div>
      </div>

      <div class="industry-cta">
        <h2>Have an industry-specific application?</h2>
        <p>Consult with our engineering team for DFM reviews and material recommendations.</p>
        <a routerLink="/contact" class="btn-spectre-primary mt-4">Request a Technical Quote &rarr;</a>
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
    .industries-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      margin-bottom: 80px;
    }
    .industry-card {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 20px;
      padding: 36px 28px;
      transition: all 0.2s;
    }
    .industry-card:hover {
      border-color: #f97316;
      transform: translateY(-2px);
    }
    .ind-icon {
      font-size: 2rem;
      margin-bottom: 16px;
    }
    .industry-card h3 {
      font-size: 1.3rem;
      margin-bottom: 12px;
    }
    .industry-card p {
      font-size: 0.9rem;
      color: #a1a1aa;
      line-height: 1.6;
    }
    .industry-cta {
      background: #18181b;
      border: 1px solid rgba(249, 115, 22, 0.3);
      border-radius: 24px;
      padding: 60px 40px;
      text-align: center;
    }
    .industry-cta h2 {
      font-size: 2.2rem;
      margin-bottom: 10px;
    }
    .industry-cta p {
      color: #a1a1aa;
      font-size: 1.1rem;
    }
    .mt-4 { margin-top: 24px; display: inline-block; }
    @media (max-width: 1100px) {
      .industries-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 600px) {
      .industries-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class IndustriesComponent {}