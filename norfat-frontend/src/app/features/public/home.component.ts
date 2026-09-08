import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- HERO SECTION -->
    <header class="hero-spectre">
      <div class="hero-bg-overlay"></div>
      <div class="container hero-container">
        <div class="hero-content">
          <div class="badge-pill">
            ON-DEMAND MANUFACTURING &amp; ENGINEERING SOLUTIONS
          </div>
          
          <h1 class="hero-headline">
            Precision Manufacturing.<br>
            <span class="text-orange">Simplified.</span>
          </h1>
          
          <p class="hero-subtext">
            CNC machining, Swiss turning, milling, 3D printing, prototyping and engineering support—managed through one reliable manufacturing partner.
          </p>

          <div class="hero-cta-row">
            <a routerLink="/contact" class="btn-spectre-primary cta-main">
              Request a Quote &nbsp;&rarr;
            </a>
            <a routerLink="/services" class="btn-spectre-outline">
              Explore Capabilities
            </a>
          </div>

          <div class="hero-network-banner">
            <div class="v-line"></div>
            <div>
              <div class="net-title">Your Design. Our Manufacturing Network.</div>
              <div class="net-sub">Finding the right manufacturer shouldn't require calling five different machine shops. Norfatek connects your project with qualified manufacturing partners based on capability, quality, lead time and cost.</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 4. SERVICES SECTION -->
    <section class="services-section">
      <div class="container">
        <div class="section-title-row">
          <div>
            <div class="eyebrow-orange">CORE CAPABILITIES</div>
            <h2 class="section-title">Manufacturing Capabilities</h2>
          </div>
          <a routerLink="/services" class="link-view-all">View all specifications &rarr;</a>
        </div>

        <div class="spectre-cards-grid">
          <!-- 1. CNC Machining -->
          <div class="spectre-card">
            <div class="card-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" class="card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h3 class="card-title">CNC Machining</h3>
            <p class="card-p">Precision turned and machined components for prototypes, low-volume and production applications.</p>
            <a routerLink="/services" class="card-link">Learn More &rarr;</a>
          </div>

          <!-- 2. Swiss Machining -->
          <div class="spectre-card">
            <div class="card-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" class="card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            <h3 class="card-title">Swiss Machining</h3>
            <p class="card-p">Small-diameter and complex components requiring high precision and efficient production.</p>
            <a routerLink="/services" class="card-link">Learn More &rarr;</a>
          </div>

          <!-- 3. CNC Milling -->
          <div class="spectre-card">
            <div class="card-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" class="card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M14 5l7 7-7 7m-4 0l7-7-7-7" /></svg>
            </div>
            <h3 class="card-title">CNC Milling</h3>
            <p class="card-p">Precision milled components ranging from prototypes to production quantities.</p>
            <a routerLink="/services" class="card-link">Learn More &rarr;</a>
          </div>

          <!-- 4. 3D Printing -->
          <div class="spectre-card">
            <div class="card-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" class="card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5" /></svg>
            </div>
            <h3 class="card-title">3D Printing</h3>
            <p class="card-p">Rapid prototypes, functional components, fixtures and development parts.</p>
            <a routerLink="/services" class="card-link">Learn More &rarr;</a>
          </div>

          <!-- 5. Prototyping -->
          <div class="spectre-card">
            <div class="card-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" class="card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 class="card-title">Prototyping</h3>
            <p class="card-p">Turn your CAD model or concept into a physical component quickly.</p>
            <a routerLink="/services" class="card-link">Learn More &rarr;</a>
          </div>

          <!-- 6. Engineering Support -->
          <div class="spectre-card">
            <div class="card-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" class="card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h3 class="card-title">Engineering Support</h3>
            <p class="card-p">DFM review, process selection, drawing review and manufacturing guidance.</p>
            <a routerLink="/services" class="card-link">Learn More &rarr;</a>
          </div>

          <!-- 7. Robotics Programming -->
          <div class="spectre-card">
            <div class="card-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" class="card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
            </div>
            <h3 class="card-title">Robotics Programming</h3>
            <p class="card-p">Industrial robot arm programming (KUKA, FANUC, ABB, UR), PLC/SCADA integration, vision pick &amp; place.</p>
            <a routerLink="/services" class="card-link">Learn More &rarr;</a>
          </div>

          <!-- 8. Web & Mobile Development -->
          <div class="spectre-card">
            <div class="card-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" class="card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h3 class="card-title">Web &amp; Mobile Development</h3>
            <p class="card-p">Industrial ERP/MES platforms, predictive maintenance dashboards, and technician field applications.</p>
            <a routerLink="/services" class="card-link">Learn More &rarr;</a>
          </div>

          <!-- 9. AI for Industry -->
          <div class="spectre-card">
            <div class="card-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" class="card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 class="card-title">AI for Industry</h3>
            <p class="card-p">Predictive maintenance models, computer vision for QC, AI-powered CPQ quoting, and edge intelligence.</p>
            <a routerLink="/services" class="card-link">Learn More &rarr;</a>
          </div>

          <!-- 10. Graphic Design -->
          <div class="spectre-card">
            <div class="card-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" class="card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <h3 class="card-title">Graphic Design</h3>
            <p class="card-p">Industrial product branding, CAD-to-marketing 3D renders, UI/UX dashboards, and trade show materials.</p>
            <a routerLink="/services" class="card-link">Learn More &rarr;</a>
          </div>

          <!-- 11. Industrial AI/OT Cybersecurity -->
          <div class="spectre-card">
            <div class="card-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" class="card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 class="card-title">Industrial AI/OT Cybersecurity</h3>
            <p class="card-p">Securing SCADA/PLC networks, IoT robot security audits, and IEC 62443 / NIST compliance.</p>
            <a routerLink="/services" class="card-link">Learn More &rarr;</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. WHY WORK WITH NORFATEK? -->
    <section class="why-section">
      <div class="container">
        <div class="eyebrow-orange text-center">VALUE PROPOSITION</div>
        <h2 class="section-title text-center mb-5">Why Work With Norfatek?</h2>

        <div class="why-grid">
          <div class="why-card">
            <div class="why-num">01</div>
            <h3>One Point of Contact</h3>
            <p>You don't need to manage multiple manufacturing suppliers.</p>
          </div>

          <div class="why-card">
            <div class="why-num">02</div>
            <h3>Engineering Understanding</h3>
            <p>We understand drawings, tolerances, materials and manufacturing processes.</p>
          </div>

          <div class="why-card">
            <div class="why-num">03</div>
            <h3>Flexible Manufacturing</h3>
            <p>Access CNC machining, Swiss machining, milling and additive manufacturing through one partner.</p>
          </div>

          <div class="why-card">
            <div class="why-num">04</div>
            <h3>Competitive Sourcing</h3>
            <p>We evaluate manufacturing options to help achieve the right balance of cost, quality and lead time.</p>
          </div>

          <div class="why-card full-width">
            <div class="why-num">05</div>
            <h3>Prototype to Production</h3>
            <p>Whether you need one prototype or recurring production, we can help coordinate the manufacturing process.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. INDUSTRIES WE SUPPORT -->
    <section class="industries-teaser-section">
      <div class="container">
        <div class="section-title-row">
          <div>
            <div class="eyebrow-orange">SECTORS &amp; MARKETS</div>
            <h2 class="section-title">Industries We Support</h2>
          </div>
          <a routerLink="/industries" class="link-view-all">View all sectors &rarr;</a>
        </div>

        <div class="industries-chips-grid">
          <div class="ind-chip"><span class="chip-dot"></span> Automotive</div>
          <div class="ind-chip"><span class="chip-dot"></span> Industrial Manufacturing</div>
          <div class="ind-chip"><span class="chip-dot"></span> Automation</div>
          <div class="ind-chip"><span class="chip-dot"></span> Robotics</div>
          <div class="ind-chip"><span class="chip-dot"></span> Product Development</div>
          <div class="ind-chip"><span class="chip-dot"></span> Machinery &amp; Equipment</div>
          <div class="ind-chip"><span class="chip-dot"></span> Engineering &amp; Design</div>
          <div class="ind-chip"><span class="chip-dot"></span> Consumer Products</div>
        </div>
      </div>
    </section>

    <!-- 7. ABOUT NORFATEK TEASER -->
    <section class="about-teaser-section">
      <div class="container">
        <div class="teaser-grid">
          <div class="teaser-text">
            <div class="eyebrow-orange">ABOUT NORFATEK</div>
            <h2 class="teaser-heading">Engineering Knowledge.<br>Manufacturing Connections.</h2>
            <div class="teaser-desc">
              <p>Norfatek was created to simplify the way companies source custom manufactured components.</p>
              <p>Our approach combines manufacturing engineering knowledge with a network of specialized manufacturing partners to help customers move from design to finished parts.</p>
              <p>From prototypes to production quantities, Norfatek provides a single point of contact for sourcing, engineering support and manufacturing coordination.</p>
              <div class="mission-box">
                <span class="mission-title">Our Mission:</span>
                <p>Make manufacturing easier, more accessible and more responsive for engineers, purchasing teams and product developers.</p>
              </div>
            </div>
            <a routerLink="/about" class="btn-spectre-outline mt-3">Learn More About Norfatek &rarr;</a>
          </div>
          <div class="teaser-media">
            <div class="media-card">
              <img src="https://images.unsplash.com/photo-1581093804475-577d72e38aa0?w=800&q=80" alt="Precision CNC machining and manufacturing facility" class="media-img">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="final-cta-section">
      <div class="container cta-container">
        <h2 class="cta-title">Ready to source with Norfatek?</h2>
        <p class="cta-desc">Direct technical reviews, complimentary DFM feedback, and competitive quotes. Send us your CAD models or drawings today.</p>
        
        <div class="cta-buttons">
          <a routerLink="/contact" class="btn-spectre-primary cta-btn-main">Request a Quote &rarr;</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* HERO */
    .hero-spectre {
      position: relative;
      min-height: 85vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: #09090b;
      padding: 100px 0 60px 0;
      overflow: hidden;
      border-bottom: 1px solid #27272a;
    }
    .hero-bg-overlay {
      position: absolute;
      inset: 0;
      background-image: 
        radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 20% 80%, rgba(24, 24, 27, 0.8) 0%, transparent 60%);
      z-index: 1;
    }
    .hero-container {
      position: relative;
      z-index: 2;
    }
    .hero-content {
      max-width: 860px;
    }
    .badge-pill {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: #f97316;
      background: rgba(249, 115, 22, 0.1);
      border: 1px solid rgba(249, 115, 22, 0.3);
      padding: 6px 14px;
      border-radius: 9999px;
      margin-bottom: 24px;
      letter-spacing: 0.1em;
    }
    .hero-headline {
      font-size: 4.2rem;
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: -0.03em;
      margin-bottom: 20px;
    }
    .text-orange {
      color: #f97316;
    }
    .hero-subtext {
      font-size: 1.25rem;
      color: #a1a1aa;
      line-height: 1.6;
      max-width: 720px;
      margin-bottom: 36px;
    }
    .hero-cta-row {
      display: flex;
      gap: 16px;
      margin-bottom: 48px;
      flex-wrap: wrap;
    }
    .cta-main {
      padding: 14px 32px !important;
      font-size: 1rem !important;
    }
    .hero-network-banner {
      display: flex;
      gap: 18px;
      align-items: flex-start;
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 16px;
      padding: 20px 24px;
      max-width: 780px;
    }
    .v-line {
      width: 4px;
      height: 48px;
      background: #f97316;
      border-radius: 2px;
      flex-shrink: 0;
    }
    .net-title {
      font-family: var(--font-heading);
      font-size: 1.05rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 4px;
    }
    .net-sub {
      font-size: 0.88rem;
      color: #a1a1aa;
      line-height: 1.5;
    }

    /* SERVICES */
    .services-section {
      padding: 100px 0;
      background: #09090b;
      border-bottom: 1px solid #27272a;
    }
    .section-title-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 48px;
    }
    .eyebrow-orange {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: #f97316;
      letter-spacing: 0.12em;
      margin-bottom: 8px;
    }
    .section-title {
      font-size: 2.5rem;
      letter-spacing: -0.02em;
    }
    .link-view-all {
      color: #a1a1aa;
      font-size: 0.95rem;
      text-decoration: none;
      transition: color 0.2s;
    }
    .link-view-all:hover { color: #f97316; }
    .spectre-cards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .spectre-card {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 20px;
      padding: 36px 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.2s;
    }
    .spectre-card:hover {
      border-color: #f97316;
      transform: translateY(-2px);
    }
    .card-icon-box {
      width: 48px;
      height: 48px;
      background: rgba(249, 115, 22, 0.1);
      color: #f97316;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
    .card-icon { width: 24px; height: 24px; }
    .card-title {
      font-size: 1.35rem;
      margin-bottom: 12px;
    }
    .card-p {
      color: #a1a1aa;
      font-size: 0.92rem;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .card-link {
      font-family: var(--font-heading);
      font-size: 0.88rem;
      font-weight: 600;
      color: #f97316;
      text-decoration: none;
    }
    .card-link:hover { text-decoration: underline; }

    /* WHY NORFATEK */
    .why-section {
      padding: 100px 0;
      background: #111114;
      border-bottom: 1px solid #27272a;
    }
    .text-center { text-align: center; }
    .mb-5 { margin-bottom: 48px; }
    .why-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      max-width: 1000px;
      margin: 0 auto;
    }
    .why-card {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 20px;
      padding: 36px 32px;
    }
    .why-card.full-width {
      grid-column: 1 / -1;
    }
    .why-num {
      font-family: var(--font-mono);
      font-size: 1.8rem;
      font-weight: 800;
      color: #f97316;
      margin-bottom: 12px;
    }
    .why-card h3 {
      font-size: 1.3rem;
      margin-bottom: 10px;
    }
    .why-card p {
      color: #a1a1aa;
      font-size: 0.95rem;
      line-height: 1.6;
    }

    /* INDUSTRIES CHIPS */
    .industries-teaser-section {
      padding: 100px 0;
      background: #09090b;
      border-bottom: 1px solid #27272a;
    }
    .industries-chips-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }
    .ind-chip {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 12px;
      padding: 18px 22px;
      font-size: 1.05rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 12px;
      color: #ffffff;
      transition: all 0.2s;
    }
    .ind-chip:hover {
      border-color: #f97316;
      background: #202024;
    }
    .chip-dot {
      width: 8px;
      height: 8px;
      background: #f97316;
      border-radius: 50%;
    }

    /* ABOUT TEASER */
    .about-teaser-section {
      padding: 100px 0;
      background: #111114;
      border-bottom: 1px solid #27272a;
    }
    .teaser-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 60px;
      align-items: center;
    }
    .teaser-heading {
      font-size: 2.5rem;
      line-height: 1.2;
      margin-bottom: 24px;
    }
    .teaser-desc p {
      color: #a1a1aa;
      font-size: 1rem;
      line-height: 1.7;
      margin-bottom: 16px;
    }
    .mission-box {
      background: #18181b;
      border-left: 3px solid #f97316;
      border-radius: 0 12px 12px 0;
      padding: 16px 20px;
      margin: 24px 0;
    }
    .mission-title {
      font-family: var(--font-heading);
      font-weight: 700;
      color: #ffffff;
      display: block;
      margin-bottom: 4px;
    }
    .mission-box p {
      margin-bottom: 0 !important;
      color: #d4d4d8 !important;
      font-style: italic;
    }
    .mt-3 { margin-top: 20px; display: inline-block; }
    .media-card {
      border-radius: 24px;
      overflow: hidden;
      border: 1px solid #27272a;
    }
    .media-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* FINAL CTA */
    .final-cta-section {
      padding: 100px 0;
      background: #09090b;
    }
    .cta-container {
      text-align: center;
      max-width: 700px;
    }
    .cta-title {
      font-size: 2.8rem;
      margin-bottom: 16px;
    }
    .cta-desc {
      color: #a1a1aa;
      font-size: 1.15rem;
      line-height: 1.6;
      margin-bottom: 36px;
    }
    .cta-btn-main {
      padding: 16px 36px !important;
      font-size: 1rem !important;
    }

    @media (max-width: 992px) {
      .hero-headline { font-size: 3rem; }
      .spectre-cards-grid { grid-template-columns: 1fr; }
      .why-grid { grid-template-columns: 1fr; }
      .industries-chips-grid { grid-template-columns: repeat(2, 1fr); }
      .teaser-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class HomeComponent {}