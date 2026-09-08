import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../core/services/project.service';
import { AuthService } from '../../core/services/auth.service';
import { StatusBadgeComponent } from '../../shared/components/status-badge.component';
import { ProjectOrder } from '../../core/models/norfat.models';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, StatusBadgeComponent],
  template: `
    <div class="portal-wrapper">
      <!-- HEADER -->
      <div class="portal-topbar">
        <div class="container topbar-inner">
          <div>
            <span class="eyebrow-orange">CLIENT WORKSPACE</span>
            <h1 class="topbar-title">Welcome back, {{ userName }}</h1>
          </div>
          <a routerLink="/portal/submit" class="btn-spectre-primary">
            + Submit CAD / 3D Package
          </a>
        </div>
      </div>

      <div class="container portal-body">
        <!-- KPI METRICS -->
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-num">{{ projects.length }}</div>
            <div class="kpi-label">TOTAL CONTRACT ORDERS</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-num orange">{{ countInReview }}</div>
            <div class="kpi-label">DFM &amp; ENGINEERING REVIEW</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-num orange-light">{{ countInProduction }}</div>
            <div class="kpi-label">CNC / 3D PRINTING IN PROGRESS</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-num green">{{ countCompleted }}</div>
            <div class="kpi-label">QUALITY INSPECTED &amp; SHIPPED</div>
          </div>
        </div>

        <!-- MAIN LAYOUT -->
        <div class="dashboard-grid">
          <!-- LEFT: Orders Table -->
          <div class="orders-box">
            <div class="box-header">
              <div>
                <h2>Active Production &amp; Additive Orders</h2>
                <span class="box-sub">Real-time status tracking from Dayton &amp; Cleveland facilities</span>
              </div>
              <span class="pill-count">{{ projects.length }} Active</span>
            </div>

            @if (isLoading) {
              <div class="loading-box">
                <p>Retrieving your order records from NORFAT servers...</p>
              </div>
            }

            @if (!isLoading && projects.length === 0) {
              <div class="empty-box">
                <h3>No Active Manufacturing Orders</h3>
                <p>Upload your 3D CAD models (STEP, IGES, SolidWorks) or 2D blueprints to begin.</p>
                <a routerLink="/portal/submit" class="btn-spectre-primary mt-4">Submit CAD Package &rarr;</a>
              </div>
            }

            @if (!isLoading && projects.length > 0) {
              <div class="table-container">
                <table class="spectre-table">
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Part / Assembly</th>
                      <th>Qty</th>
                      <th>Process / Material</th>
                      <th>Status</th>
                      <th>Quoted</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let p of projects">
                      <td class="order-id">{{ p.orderNumber }}</td>
                      <td>
                        <div class="part-title">{{ p.title }}</div>
                      </td>
                      <td class="mono-qty">{{ p.quantity }}</td>
                      <td>
                        <div class="part-mat">{{ p.material }}</div>
                      </td>
                      <td>
                        <app-status-badge [status]="p.status"></app-status-badge>
                      </td>
                      <td class="mono-price">
                        <span *ngIf="p.quotedPrice" class="price-val">\${{ p.quotedPrice | number:'1.2-2' }}</span>
                        <span *ngIf="!p.quotedPrice" class="price-pending">In DFM Review</span>
                      </td>
                      <td>
                        <a [routerLink]="['/portal/projects', p.id]" class="view-link">View Details &rarr;</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
          </div>

          <!-- RIGHT: Quick Capabilities & Pipeline -->
          <div class="side-col">
            <div class="side-box">
              <h3>Manufacturing Pipeline</h3>
              <div class="pipeline-list">
                <div class="pipe-step"><span class="dot"></span> 1. CAD Package &amp; Print Received</div>
                <div class="pipe-step"><span class="dot orange"></span> 2. DFM Review &amp; Toolpathing</div>
                <div class="pipe-step"><span class="dot orange"></span> 3. CNC Cutting / DMLS 3D Printing</div>
                <div class="pipe-step"><span class="dot purple"></span> 4. Zeiss CMM Quality &amp; AS9102 FAI</div>
                <div class="pipe-step"><span class="dot sky"></span> 5. Final Packaging &amp; Dispatch</div>
                <div class="pipe-step"><span class="dot green"></span> 6. Delivered with MTR &amp; CoC Certs</div>
              </div>
            </div>

            <div class="side-box ai-chat-widget">
              <div class="ai-widget-head">
                <div class="ai-avatar-ico">AI</div>
                <div>
                  <div class="ai-name">NORFAT Engineering AI</div>
                  <div class="ai-sub"><span class="dot green"></span> Online &bull; DFM &amp; Materials</div>
                </div>
              </div>

              <!-- Chat messages container -->
              <div class="chat-msg-area">
                <div *ngFor="let m of chatMessages" class="chat-msg" [class.user]="m.isUser">
                  <div class="chat-sender-lbl">{{ m.isUser ? 'You' : 'NORFAT AI' }}</div>
                  <div class="chat-bubble-txt">{{ m.text }}</div>
                </div>
              </div>

              <!-- Quick suggestions -->
              <div class="ai-suggestions">
                <button (click)="askAi('What file formats do you accept?')">CAD Formats</button>
                <button (click)="askAi('What materials do you machine?')">Materials</button>
                <button (click)="askAi('What is your tolerance capability?')">Tolerances</button>
              </div>

              <!-- Chat input -->
              <div class="ai-input-row">
                <input type="text" [(ngModel)]="aiInput" (keyup.enter)="sendAiMessage()" placeholder="Ask about DFM, materials, 3D printing..." class="ai-text-input">
                <button (click)="sendAiMessage()" [disabled]="!aiInput.trim()" class="ai-send-btn">&rarr;</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .portal-wrapper {
      min-height: calc(100vh - 160px);
      background: #09090b;
      padding-bottom: 80px;
    }
    .portal-topbar {
      background: #18181b;
      border-bottom: 1px solid #27272a;
      padding: 36px 0;
    }
    .topbar-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }
    .eyebrow-orange {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: #f97316;
      letter-spacing: 0.12em;
      display: block;
      margin-bottom: 6px;
    }
    .topbar-title {
      font-size: 2.2rem;
      letter-spacing: -0.02em;
    }
    .portal-body {
      padding-top: 36px;
    }
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 32px;
    }
    .kpi-card {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 18px;
      padding: 22px 24px;
    }
    .kpi-num {
      font-family: var(--font-heading);
      font-size: 2.2rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1;
      margin-bottom: 8px;
    }
    .kpi-num.orange { color: #f97316; }
    .kpi-num.orange-light { color: #fb923c; }
    .kpi-num.green { color: #4ade80; }
    .kpi-label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: #71717a;
      letter-spacing: 0.08em;
    }
    .dashboard-grid {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 24px;
    }
    .orders-box {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 24px;
      overflow: hidden;
    }
    .box-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 28px;
      border-bottom: 1px solid #27272a;
    }
    .box-header h2 {
      font-size: 1.3rem;
      margin-bottom: 2px;
    }
    .box-sub {
      font-size: 0.8rem;
      color: #71717a;
    }
    .pill-count {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      background: #27272a;
      color: #f97316;
      border: 1px solid #3f3f46;
      padding: 4px 12px;
      border-radius: 9999px;
      font-weight: 600;
    }
    .table-container {
      overflow-x: auto;
    }
    .spectre-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
      text-align: left;
    }
    .spectre-table th {
      padding: 14px 24px;
      background: #09090b;
      border-bottom: 1px solid #27272a;
      font-family: var(--font-heading);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #a1a1aa;
    }
    .spectre-table td {
      padding: 18px 24px;
      border-bottom: 1px solid #27272a;
      color: #d4d4d8;
    }
    .spectre-table tr:last-child td {
      border-bottom: none;
    }
    .order-id {
      font-family: var(--font-mono);
      font-weight: 700;
      color: #f97316;
      font-size: 0.85rem;
    }
    .part-title {
      font-weight: 600;
      color: #ffffff;
    }
    .part-mat {
      font-size: 0.85rem;
      color: #a1a1aa;
    }
    .mono-qty {
      font-family: var(--font-mono);
    }
    .mono-price {
      font-family: var(--font-mono);
    }
    .price-val {
      color: #4ade80;
      font-weight: 600;
    }
    .price-pending {
      color: #fbbf24;
      font-size: 0.8rem;
    }
    .view-link {
      color: #f97316;
      font-weight: 600;
      font-size: 0.85rem;
    }
    .view-link:hover {
      text-decoration: underline;
    }
    .loading-box, .empty-box {
      padding: 60px;
      text-align: center;
      color: #a1a1aa;
    }
    .side-col {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .side-box {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 20px;
      padding: 24px;
    }
    .side-box h3 {
      font-size: 1.15rem;
      margin-bottom: 16px;
    }
    .pipeline-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .pipe-step {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.86rem;
      color: #d4d4d8;
    }
    .dot {
      width: 8px;
      height: 8px;
      background: #71717a;
      border-radius: 50%;
    }
    .dot.orange { background: #f97316; }
    .dot.purple { background: #c084fc; }
    .dot.sky { background: #38bdf8; }
    .dot.green { background: #4ade80; }
    .side-sub {
      font-size: 0.85rem;
      color: #a1a1aa;
      line-height: 1.5;
      margin-bottom: 12px;
    }
    .contact-mini {
      font-size: 0.85rem;
      color: #d4d4d8;
      line-height: 1.8;
      margin-bottom: 16px;
    }
    .mini-link {
      color: #f97316;
      font-weight: 600;
    }
    .full-w { width: 100%; text-align: center; }
    .mt-3 { margin-top: 12px; }
    .mt-4 { margin-top: 16px; }

    .ai-chat-widget {
      padding: 20px;
    }
    .ai-widget-head {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
      padding-bottom: 12px;
      border-bottom: 1px solid #27272a;
    }
    .ai-avatar-ico {
      width: 32px;
      height: 32px;
      background: #f97316;
      color: #fff;
      font-weight: 800;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.82rem;
    }
    .ai-name { font-size: 0.88rem; font-weight: 600; color: #fff; }
    .ai-sub { font-size: 0.68rem; color: #a1a1aa; font-family: var(--font-mono); }
    .chat-msg-area {
      max-height: 220px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 12px;
    }
    .chat-msg { display: flex; flex-direction: column; }
    .chat-msg.user { align-items: flex-end; }
    .chat-sender-lbl { font-size: 0.62rem; color: #71717a; font-family: var(--font-mono); margin-bottom: 2px; }
    .chat-bubble-txt {
      background: #09090b;
      border: 1px solid #27272a;
      border-radius: 10px;
      padding: 8px 12px;
      font-size: 0.8rem;
      color: #e4e4e7;
      line-height: 1.4;
      max-width: 90%;
    }
    .chat-msg.user .chat-bubble-txt {
      background: #f97316;
      border-color: #f97316;
      color: #fff;
    }
    .ai-suggestions {
      display: flex;
      gap: 6px;
      margin-bottom: 10px;
      overflow-x: auto;
    }
    .ai-suggestions button {
      background: #27272a;
      border: 1px solid #3f3f46;
      color: #d4d4d8;
      font-size: 0.68rem;
      font-family: var(--font-mono);
      padding: 4px 8px;
      border-radius: 6px;
      cursor: pointer;
      white-space: nowrap;
    }
    .ai-suggestions button:hover { border-color: #f97316; color: #f97316; }
    .ai-input-row {
      display: flex;
      gap: 8px;
    }
    .ai-text-input {
      flex: 1;
      background: #09090b;
      border: 1px solid #3f3f46;
      border-radius: 8px;
      padding: 8px 10px;
      color: #fff;
      font-size: 0.8rem;
    }
    .ai-text-input:focus { outline: none; border-color: #f97316; }
    .ai-send-btn {
      background: #f97316;
      border: none;
      color: #fff;
      padding: 0 14px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 700;
    }

    @media (max-width: 992px) {
      .dashboard-grid { grid-template-columns: 1fr; }
      .kpi-grid { grid-template-columns: repeat(2, 1fr); }
    }
  `]
})
export class ClientDashboardComponent implements OnInit {
  projectService = inject(ProjectService);
  auth = inject(AuthService);

  projects: ProjectOrder[] = [];
  isLoading = false;

  aiInput = '';
  chatMessages = [
    {
      isUser: false,
      text: 'Hello! I am the NORFAT AI Engineering Assistant. Ask me about our 5-Axis milling, Swiss turning, DMLS 3D printing, materials, and tolerances.'
    }
  ];

  get userName(): string {
    return 'Guest Engineer';
  }

  get countInReview(): number {
    return this.projects.filter(p => p.status === 'Received' || p.status === 'InReview').length;
  }

  get countInProduction(): number {
    return this.projects.filter(p => p.status === 'InProduction').length;
  }

  get countCompleted(): number {
    return this.projects.filter(p => p.status === 'QualityCheck' || p.status === 'Shipped' || p.status === 'Completed').length;
  }

  ngOnInit(): void {
    let localReqs: any[] = [];
    try {
      localReqs = JSON.parse(localStorage.getItem('norfat_public_requests') || '[]');
    } catch {}

    this.projectService.getMyProjects().subscribe({
      next: (res) => {
        this.projects = [...localReqs, ...res];
      },
      error: () => {
        if (localReqs.length > 0) {
          this.projects = localReqs;
        } else {
          // Demo fallback items
          this.projects = [
            {
              id: 'demo-1',
              orderNumber: 'NORFAT-48921',
              title: 'Titanium Ti-6Al-4V Impeller Prototype',
              description: '5-Axis Simultaneous CNC Milling',
              material: 'Titanium Grade 5 (Ti-6Al-4V)',
              quantity: 5,
              tolerances: '±0.0002" / 5 μm',
              quotedPrice: 3850,
              status: 'InReview',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              clientId: 'guest',
              clientName: 'Aerospace Systems Group',
              clientCompany: 'Apex Defense Corp',
              clientEmail: 'rfq@apexdefense.com',
              files: [],
              messages: []
            },
            {
              id: 'demo-2',
              orderNumber: 'NORFAT-73104',
              title: 'DMLS Inconel 718 Fuel Injector Manifold',
              description: 'Industrial 3D Printing with Finish Machining',
              material: 'Inconel 718 Superalloy',
              quantity: 12,
              tolerances: '±0.0005"',
              quotedPrice: 8400,
              status: 'InProduction',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              clientId: 'guest',
              clientName: 'Propulsion Engineering',
              clientCompany: 'Orbit Aero Inc.',
              clientEmail: 'eng@orbitaero.com',
              files: [],
              messages: []
            }
          ];
        }
      }
    });
  }

  sendAiMessage(): void {
    if (!this.aiInput.trim()) return;
    const q = this.aiInput.trim();
    this.aiInput = '';
    this.chatMessages.push({ isUser: true, text: q });

    setTimeout(() => {
      this.chatMessages.push({ isUser: false, text: this.generateAiAnswer(q) });
    }, 600);
  }

  askAi(question: string): void {
    this.aiInput = question;
    this.sendAiMessage();
  }

  generateAiAnswer(q: string): string {
    const l = q.toLowerCase();
    if (l.includes('format') || l.includes('cad') || l.includes('file')) {
      return 'We accept 3D CAD solids in STEP (.stp, .step), IGES (.igs), SolidWorks (.sldprt), Parasolid (.x_t), 3MF, and STL. For 2D prints, PDF is preferred with GD&T specifications.';
    }
    if (l.includes('material') || l.includes('titanium') || l.includes('inconel')) {
      return 'We regularly machine Titanium Ti-6Al-4V (Grade 5 & 23 ELI), Inconel 718, 7075-T6 & 6061-T6 Aluminum, 316L Stainless, and polymers like PEEK and ULTEM 9085. Full material certs (MTR) included.';
    }
    if (l.includes('tolerance') || l.includes('precision') || l.includes('cmm')) {
      return 'Our certified capabilities reach down to ±0.0001" (2.5 μm) on 5-Axis milling and Swiss turning. Every part is verified using our Zeiss coordinate measuring machines.';
    }
    if (l.includes('lead') || l.includes('time') || l.includes('turnaround')) {
      return 'DMLS 3D Printing: 3–7 business days; CNC Prototypes: 5–10 business days; 24–48 hour expedite option available upon request.';
    }
    return 'Thank you for your inquiry! Our Ohio engineering team can inspect your blueprints or STEP files directly. Use "+ Submit CAD / 3D Package" above or call us at +1 (513) 302-2850.';
  }
}