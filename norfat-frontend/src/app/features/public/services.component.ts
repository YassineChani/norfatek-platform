import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="page-header">
      <div class="container">
        <div class="eyebrow-orange">COMPREHENSIVE CAPABILITIES</div>
        <h1 class="page-title">Advanced Manufacturing &amp; Industrial Technology Services</h1>
        <p class="page-sub">From precision hardware machining to robotics automation, industrial AI, custom digital platforms, and OT cybersecurity.</p>
      </div>
    </header>

    <div class="container services-body">
      <div class="services-list">
        
        <!-- 1. CNC Machining -->
        <div class="service-block">
          <div class="service-info">
            <span class="service-tag">PRECISION MACHINING &bull; TURNING &amp; MILL-TURN</span>
            <h2>CNC Machining</h2>
            <p>Precision turned and machined components for prototypes, low-volume and production applications. Multi-axis turning centers with Y-axis live tooling handle complex shafts, flanges, threaded bushings, and precision cylinders with tight concentricity and surface finish standards.</p>
            <div class="spec-pills">
              <span>Dual Spindle &bull; Live Y-Axis Tooling</span>
              <span>Bar Capacity: Up to 3.5"</span>
              <span>Chuck Capacity: Up to 18"</span>
              <span>Metals: Aluminum, Stainless, Alloy Steels, Brass</span>
            </div>
            <a routerLink="/contact" class="btn-spectre-primary">Request CNC Machining Quote &rarr;</a>
          </div>
          <div class="service-media">
            <img src="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=700&q=80" alt="CNC Machining Turning Center" class="service-img">
          </div>
        </div>

        <!-- 2. CNC Swiss Machining -->
        <div class="service-block reverse">
          <div class="service-info">
            <span class="service-tag">SWISS MACHINING &bull; MICRO-PRECISION</span>
            <h2>CNC Swiss Machining</h2>
            <p>Small-diameter and complex components requiring high precision and efficient production. Guide-bushing Swiss lathes enable deflection-free machining on long, slender pins, medical implants, sensor housings, and miniature drive components.</p>
            <div class="spec-pills">
              <span>Citizen Cincom 7-Axis Swiss Lathes</span>
              <span>Bar Stock: 0.5 mm to 32 mm</span>
              <span>High Length-to-Diameter Ratios</span>
              <span>Titanium ELI, 316L VM, PEEK, Invar</span>
            </div>
            <a routerLink="/contact" class="btn-spectre-primary">Request Swiss Quote &rarr;</a>
          </div>
          <div class="service-media">
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80" alt="Swiss Machining Precision" class="service-img">
          </div>
        </div>

        <!-- 3. CNC Milling -->
        <div class="service-block">
          <div class="service-info">
            <span class="service-tag">MILLING &bull; 3-AXIS, 4-AXIS &amp; 5-AXIS</span>
            <h2>CNC Milling</h2>
            <p>Precision milled components ranging from prototypes to production quantities. High-speed 3-axis, 4-axis, and simultaneous 5-axis vertical machining centers deliver complex prismatic geometries, bulkheads, and housings with repeatable micron tolerances.</p>
            <div class="spec-pills">
              <span>5-Axis Simultaneous &amp; High-Speed VMC</span>
              <span>Spindle Speeds: Up to 24,000 RPM</span>
              <span>Tolerances down to &plusmn;0.0001" (2.5 &micro;m)</span>
              <span>Materials: 7075-T6, 6061-T6, Inconel 718, Ti64</span>
            </div>
            <a routerLink="/contact" class="btn-spectre-primary">Request Milling Quote &rarr;</a>
          </div>
          <div class="service-media">
            <img src="https://images.unsplash.com/photo-1581093804475-577d72e38aa0?w=700&q=80" alt="CNC Milling Center" class="service-img">
          </div>
        </div>

        <!-- 4. 3D Printing -->
        <div class="service-block reverse">
          <div class="service-info">
            <span class="service-tag">ADDITIVE MANUFACTURING &bull; 3D PRINTING</span>
            <h2>3D Printing</h2>
            <p>Rapid prototypes, functional components, fixtures and development parts. Direct Metal Laser Sintering (DMLS) in Titanium and Inconel, paired with industrial polymer SLS / SLA / FDM for functional fit validation, lightweight lattice structures, and rapid tooling.</p>
            <div class="spec-pills">
              <span>DMLS Metal (Ti-6Al-4V, Inconel, 316L, AlSi10Mg)</span>
              <span>Engineering Polymers: PEEK, PA12, ULTEM 9085</span>
              <span>Rapid Lead Times: 3 - 7 Business Days</span>
              <span>Hybrid Workflow: Additive + CNC Finishing</span>
            </div>
            <a routerLink="/contact" class="btn-spectre-primary">Request 3D Printing Quote &rarr;</a>
          </div>
          <div class="service-media">
            <img src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=700&q=80" alt="Industrial 3D Printing" class="service-img">
          </div>
        </div>

        <!-- 5. Prototyping -->
        <div class="service-block">
          <div class="service-info">
            <span class="service-tag">RAPID TURNAROUND &bull; PROTOTYPES</span>
            <h2>Prototyping</h2>
            <p>Turn your CAD model or concept into a physical component quickly. Fast-track prototyping services designed to validate proof-of-concept, test mechanical fitment, and prepare for volume production with speed and reliability.</p>
            <div class="spec-pills">
              <span>Fast-Turn Prototype Expedite (24 - 48 Hours)</span>
              <span>Single-Part Proof-of-Concept &amp; Low Volume</span>
              <span>CMM Dimensional Verification</span>
              <span>Seamless Transition to Serial Production</span>
            </div>
            <a routerLink="/contact" class="btn-spectre-primary">Request Prototype Quote &rarr;</a>
          </div>
          <div class="service-media">
            <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=700&q=80" alt="Prototyping Parts" class="service-img">
          </div>
        </div>

        <!-- 6. Engineering Support -->
        <div class="service-block reverse">
          <div class="service-info">
            <span class="service-tag">DFM &bull; TECHNICAL GUIDANCE</span>
            <h2>Engineering Support</h2>
            <p>DFM review, process selection, drawing review and manufacturing guidance. Our team of experienced manufacturing engineers works with your drawings and CAD models to optimize parts for machinability, reduce unit costs, and eliminate fabrication bottlenecks.</p>
            <div class="spec-pills">
              <span>Design for Manufacturability (DFM) Analysis</span>
              <span>GD&amp;T &amp; Drawing Optimization</span>
              <span>Material &amp; Surface Treatment Selection</span>
              <span>Cost Reduction Recommendations</span>
            </div>
            <a routerLink="/contact" class="btn-spectre-primary">Consult With Engineers &rarr;</a>
          </div>
          <div class="service-media">
            <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=700&q=80" alt="Engineering Support Review" class="service-img">
          </div>
        </div>

        <!-- 7. Robotics Programming (NEW) -->
        <div class="service-block highlighted-tech">
          <div class="service-info">
            <span class="service-tag">ROBOTICS &amp; FACTORY AUTOMATION</span>
            <h2>Robotics Programming</h2>
            <p>Full-scale industrial robotic automation engineering. We program, deploy, and optimize articulated robot cells, vision-guided systems, and automated production cells across major OEM platforms.</p>
            <div class="spec-pills">
              <span>Industrial Arm Programming: KUKA, FANUC, ABB, Universal Robots (UR)</span>
              <span>PLC / SCADA Integration (Modbus, OPC-UA, EtherCAT, PROFINET)</span>
              <span>Machine Vision &amp; High-Speed Pick-and-Place Systems</span>
              <span>Digital Twin Simulation &amp; Virtual Commissioning</span>
            </div>
            <a routerLink="/contact" class="btn-spectre-primary">Discuss Robotics Automation &rarr;</a>
          </div>
          <div class="service-media">
            <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=700&q=80" alt="Industrial Robotics Automation KUKA FANUC" class="service-img">
          </div>
        </div>

        <!-- 8. Web & Mobile Development (NEW) -->
        <div class="service-block reverse highlighted-tech">
          <div class="service-info">
            <span class="service-tag">INDUSTRIAL SOFTWARE &bull; WEB &amp; MOBILE</span>
            <h2>Web &amp; Mobile Development</h2>
            <p>Custom-engineered software architectures designed specifically for manufacturing floors, engineering teams, and industrial supply chains. Bridging physical OT hardware with real-time web applications.</p>
            <div class="spec-pills">
              <span>Industrial ERP &amp; Manufacturing Execution Systems (MES) Web Platforms</span>
              <span>Real-Time Predictive Maintenance &amp; Equipment Telemetry Dashboards</span>
              <span>Native &amp; PWA Mobile Apps for Field Technicians (Inspection &amp; Tracking)</span>
              <span>E-Commerce &amp; B2B Portals for Industrial Suppliers</span>
            </div>
            <a routerLink="/contact" class="btn-spectre-primary">Build Industrial Software &rarr;</a>
          </div>
          <div class="service-media">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80" alt="Industrial Web & Mobile Dashboards" class="service-img">
          </div>
        </div>

        <!-- 9. AI for Industry (NEW) -->
        <div class="service-block highlighted-tech">
          <div class="service-info">
            <span class="service-tag">APPLIED ARTIFICIAL INTELLIGENCE &bull; INDUSTRIAL AI</span>
            <h2>AI for Industry</h2>
            <p>Deploy cutting-edge machine learning and computer vision models directly on manufacturing floors to eradicate defects, forecast maintenance, and automate engineering workflows.</p>
            <div class="spec-pills">
              <span>Predictive Maintenance: ML Models Predicting Machine &amp; Spindle Failure</span>
              <span>Automated Computer Vision for Sub-Millimeter Quality Control</span>
              <span>AI-Powered Automated Quoting &amp; CPQ Manufacturing Costing Engines</span>
              <span>Reinforcement Learning for Machining Process Parameter Optimization</span>
              <span>Edge AI on Embedded Hardware (NVIDIA Jetson, Raspberry Pi, STM32)</span>
            </div>
            <a routerLink="/contact" class="btn-spectre-primary">Deploy Industrial AI &rarr;</a>
          </div>
          <div class="service-media">
            <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=700&q=80" alt="AI for Industry Quality Inspection" class="service-img">
          </div>
        </div>

        <!-- 10. Graphic Design (NEW) -->
        <div class="service-block reverse highlighted-tech">
          <div class="service-info">
            <span class="service-tag">INDUSTRIAL DESIGN &amp; BRAND MARKETING</span>
            <h2>Graphic Design</h2>
            <p>Elevate technical products with precision marketing assets. We translate complex engineering CAD data into photorealistic commercial visualizations, brand systems, and intuitive user experiences.</p>
            <div class="spec-pills">
              <span>Industrial Product Branding, Line Architecture &amp; Print Catalogs</span>
              <span>Technical Illustrations &amp; Photorealistic CAD-to-Marketing 3D Renders</span>
              <span>UI/UX Interface Design for Industrial Dashboards &amp; Field Apps</span>
              <span>High-Impact Trade Show Booth Displays &amp; Exhibition Materials</span>
            </div>
            <a routerLink="/contact" class="btn-spectre-primary">Request Industrial Design &rarr;</a>
          </div>
          <div class="service-media">
            <img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=700&q=80" alt="Graphic Design and 3D Rendering" class="service-img">
          </div>
        </div>

        <!-- 11. Industrial AI/OT Cybersecurity (NEW) -->
        <div class="service-block highlighted-cyber">
          <div class="service-info">
            <span class="service-tag">CRITICAL INFRASTRUCTURE &bull; OT SECURITY</span>
            <h2>Industrial AI/OT Cybersecurity</h2>
            <p>Specialized operational technology (OT) cybersecurity engineered to defend factory floors, robotics cells, and programmable controllers from cyber warfare and operational sabotage.</p>
            <div class="spec-pills">
              <span>Securing SCADA / PLC Systems &amp; Air-Gapped Industrial Networks</span>
              <span>Vulnerability Assessments for Connected Robots &amp; IoT Control Systems</span>
              <span>Regulatory Compliance Engineering: NIST SP 800-171 &amp; IEC 62443 Standards</span>
              <span>Rapid 24/7 Incident Response for Factories Hit by Ransomware &amp; Intrusions</span>
            </div>
            <a routerLink="/contact" class="btn-spectre-primary">Secure Factory Systems &rarr;</a>
          </div>
          <div class="service-media">
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=80" alt="Industrial OT Cybersecurity SCADA" class="service-img">
          </div>
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
      max-width: 780px;
      line-height: 1.6;
    }
    .services-body {
      padding: 80px 24px;
    }
    .services-list {
      display: flex;
      flex-direction: column;
      gap: 60px;
    }
    .service-block {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 24px;
      overflow: hidden;
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      align-items: center;
      transition: all 0.2s;
    }
    .service-block:hover {
      border-color: #3f3f46;
    }
    .service-block.highlighted-tech {
      border-color: rgba(249, 115, 22, 0.35);
      background: linear-gradient(135deg, #18181b 0%, #1c1917 100%);
    }
    .service-block.highlighted-cyber {
      border-color: rgba(239, 68, 68, 0.4);
      background: linear-gradient(135deg, #18181b 0%, #1e1111 100%);
    }
    .service-block.highlighted-cyber .service-tag {
      color: #f87171;
    }
    .service-block.reverse {
      grid-template-columns: 1fr 1.2fr;
    }
    .service-block.reverse .service-info {
      order: 2;
    }
    .service-block.reverse .service-media {
      order: 1;
    }
    .service-info {
      padding: 48px;
    }
    .service-tag {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: #f97316;
      letter-spacing: 0.12em;
      display: block;
      margin-bottom: 12px;
    }
    .service-info h2 {
      font-size: 2rem;
      letter-spacing: -0.02em;
      margin-bottom: 16px;
    }
    .service-info p {
      color: #a1a1aa;
      font-size: 0.98rem;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .spec-pills {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 32px;
    }
    .spec-pills span {
      background: #09090b;
      border: 1px solid #27272a;
      color: #e4e4e7;
      font-size: 0.85rem;
      padding: 8px 14px;
      border-radius: 8px;
      width: fit-content;
      max-width: 100%;
    }
    .service-media {
      height: 100%;
      min-height: 420px;
    }
    .service-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    @media (max-width: 992px) {
      .service-block, .service-block.reverse {
        grid-template-columns: 1fr;
      }
      .service-block.reverse .service-info { order: 1; }
      .service-block.reverse .service-media { order: 2; }
      .service-info { padding: 32px; }
      .service-media { height: 280px; min-height: 280px; }
    }
  `]
})
export class ServicesComponent {}