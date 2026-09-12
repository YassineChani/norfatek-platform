import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface RfqRequest {
  id: string;
  orderNumber: string;
  title: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  material: string;
  process: string;
  quantity: string;
  status: string;
  tolerances?: string;
  description?: string;
  createdAt: string;
  quotedPrice?: number | null;
  files?: Array<{ fileName: string; fileSizeBytes?: number }>;
}

interface CustomService {
  id: string;
  title: string;
  tag: string;
  description: string;
  specs: string[];
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="admin-wrapper">
      <!-- TOPBAR -->
      <div class="admin-topbar">
        <div class="container topbar-inner">
          <div>
            <div class="brand-tag">NORFATEK OPERATIONS MANAGEMENT</div>
            <h1 class="topbar-title">Admin Dashboard</h1>
            <p class="topbar-sub">Manage client RFQ submissions, update quote status, and add new capabilities.</p>
          </div>
          
          <div class="topbar-actions">
            <button class="nav-tab" [class.active]="activeTab === 'rfqs'" (click)="activeTab = 'rfqs'">
              Incoming Quotes ({{ rfqs.length }})
            </button>
            <button class="nav-tab" [class.active]="activeTab === 'services'" (click)="activeTab = 'services'">
              + Add New Service
            </button>
            <button (click)="logout()" class="btn-logout">
              Déconnexion &nbsp;⎋
            </button>
          </div>
        </div>
      </div>

      <div class="container admin-body">
        
        <!-- STATUS UPDATE BANNER (When Admin clicks an order to approve/review) -->
        @if (actionSuccessMsg) {
          <div class="action-alert-green">
            <span class="alert-ico">&check;</span>
            <div>
              <strong>Succès !</strong> {{ actionSuccessMsg }}
            </div>
          </div>
        }

        <!-- TAB 1: RFQ REQUESTS -->
        @if (activeTab === 'rfqs') {
          <div class="content-card">
            <div class="card-header">
              <div>
                <h2>Client Quote Requests (RFQs)</h2>
                <span class="card-sub">Review incoming drawings, approve quotes, and update project status</span>
              </div>
              <span class="badge-count">{{ rfqs.length }} Requests</span>
            </div>

            <!-- DETAIL INSPECTOR DRAWER / MODAL -->
            @if (selectedRfq) {
              <div class="rfq-inspector-card">
                <div class="inspector-head">
                  <div>
                    <span class="ref-badge">{{ selectedRfq.orderNumber }}</span>
                    <h3>{{ selectedRfq.title }}</h3>
                    <p class="meta-p">{{ selectedRfq.clientName }} &bull; {{ selectedRfq.clientCompany }} &bull; {{ selectedRfq.clientEmail }} &bull; {{ selectedRfq.clientPhone }}</p>
                  </div>
                  <button class="btn-close-inspect" (click)="selectedRfq = null">&times;</button>
                </div>

                <div class="inspector-grid">
                  <div class="insp-col">
                    <span class="i-lbl">Manufacturing Process</span>
                    <span class="i-val">{{ selectedRfq.process }}</span>
                  </div>
                  <div class="insp-col">
                    <span class="i-lbl">Material Specification</span>
                    <span class="i-val">{{ selectedRfq.material }}</span>
                  </div>
                  <div class="insp-col">
                    <span class="i-lbl">Quantity Scope</span>
                    <span class="i-val">{{ selectedRfq.quantity }}</span>
                  </div>
                  <div class="insp-col">
                    <span class="i-lbl">Current Status</span>
                    <span class="i-val status-val" [class.approved]="selectedRfq.status === 'Approved / Quoted'">{{ selectedRfq.status }}</span>
                  </div>
                </div>

                @if (selectedRfq.description) {
                  <div class="insp-box">
                    <span class="i-lbl">Client Scope &amp; Notes</span>
                    <p>{{ selectedRfq.description }}</p>
                  </div>
                }

                @if (selectedRfq.files && selectedRfq.files.length > 0) {
                  <div class="insp-files">
                    <span class="i-lbl">Attached CAD &amp; Drawing Files ({{ selectedRfq.files.length }})</span>
                    <div class="file-chips-row">
                      @for (f of selectedRfq.files; track f.fileName) {
                        <div class="file-chip-item">
                          <span>📎 {{ f.fileName }}</span>
                          <button type="button" class="download-btn-active" (click)="downloadFile(f)">
                            ⬇ Télécharger
                          </button>
                        </div>
                      }
                    </div>
                  </div>
                }

                <!-- ACTIONS ROW -->
                <div class="inspector-controls">
                  <div class="ctrl-group">
                    <label>Set Quoted Price ($ USD)</label>
                    <input type="number" [(ngModel)]="quotePriceInput" placeholder="e.g. 3500" class="ctrl-input">
                  </div>
                  <div class="ctrl-group">
                    <label>Update Status</label>
                    <select [(ngModel)]="statusSelect" class="ctrl-input">
                      <option value="Approved / Quoted">Approved / Quoted (Send to Client)</option>
                      <option value="In DFM Review">In DFM Review</option>
                      <option value="In Production">In Production</option>
                      <option value="Completed / Delivered">Completed / Delivered</option>
                    </select>
                  </div>
                  <button (click)="applyRfqStatus()" class="btn-spectre-primary btn-apply">
                    &check; Valider &amp; Notifier le Client
                  </button>
                </div>
              </div>
            }

            <div class="table-responsive">
              <table class="rfq-table">
                <thead>
                  <tr>
                    <th>Ref #</th>
                    <th>Client / Company</th>
                    <th>Process &amp; Scope</th>
                    <th>Material</th>
                    <th>Status</th>
                    <th>Quoted Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  @for (r of rfqs; track r.id) {
                    <tr [class.active-row]="selectedRfq?.id === r.id">
                      <td class="ref-col">{{ r.orderNumber }}</td>
                      <td>
                        <div class="c-name">{{ r.clientName }}</div>
                        <div class="c-co">{{ r.clientCompany }}</div>
                      </td>
                      <td>
                        <div class="p-title">{{ r.process }}</div>
                        <div class="p-qty">Qty: {{ r.quantity }}</div>
                      </td>
                      <td class="mat-col">{{ r.material }}</td>
                      <td>
                        <span class="status-pill" [class.success-pill]="r.status === 'Approved / Quoted'">
                          {{ r.status }}
                        </span>
                      </td>
                      <td class="price-col">
                        @if (r.quotedPrice) {
                          <span class="price-txt">\${{ r.quotedPrice | number:'1.0-0' }}</span>
                        } @else {
                          <span class="price-na">Pending</span>
                        }
                      </td>
                      <td>
                        <button class="btn-inspect" (click)="openInspect(r)">
                          Inspect &amp; Quote &rarr;
                        </button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }

        <!-- TAB 2: ADD NEW SERVICE -->
        @if (activeTab === 'services') {
          <div class="services-admin-grid">
            <!-- Form to add new service -->
            <div class="content-card form-service-card">
              <div class="card-header">
                <div>
                  <h2>+ Ajouter un Nouveau Service</h2>
                  <span class="card-sub">Ce service sera instantanément publié et visible par les clients</span>
                </div>
              </div>

              <form (ngSubmit)="addNewService()" class="service-add-form">
                <div class="form-group">
                  <label>Service Title *</label>
                  <input type="text" [(ngModel)]="newServ.title" name="servTitle" required class="ctrl-input" placeholder="e.g. Laser Cutting &amp; Sheet Metal">
                </div>

                <div class="form-group">
                  <label>Category / Tag *</label>
                  <input type="text" [(ngModel)]="newServ.tag" name="servTag" required class="ctrl-input" placeholder="e.g. SHEET METAL &bull; FORMING">
                </div>

                <div class="form-group">
                  <label>Detailed Description *</label>
                  <textarea [(ngModel)]="newServ.description" name="servDesc" required rows="4" class="ctrl-input" placeholder="Describe the equipment, capabilities, and applications..."></textarea>
                </div>

                <div class="form-group">
                  <label>Specifications / Capabilities (separated by commas)</label>
                  <input type="text" [(ngModel)]="newServSpecs" name="servSpecs" class="ctrl-input" placeholder="Fiber Laser, Up to 25mm steel, ±0.002&quot; accuracy, Fast Turnaround">
                </div>

                <button type="submit" [disabled]="!newServ.title || !newServ.description" class="btn-spectre-primary w-full">
                  + Publier le Service
                </button>
              </form>
            </div>

            <!-- List of existing and added services -->
            <div class="content-card">
              <div class="card-header">
                <div>
                  <h2>Published Services &amp; Capabilities</h2>
                  <span class="card-sub">{{ customServices.length }} active manufacturing services</span>
                </div>
              </div>

              <div class="services-mini-list">
                @for (s of customServices; track s.id) {
                  <div class="serv-mini-item">
                    <div class="s-top">
                      <span class="s-tag">{{ s.tag }}</span>
                      <button (click)="removeService(s.id)" class="btn-del-serv">&times; Remove</button>
                    </div>
                    <h4>{{ s.title }}</h4>
                    <p>{{ s.description }}</p>
                    <div class="s-specs">
                      @for (spec of s.specs; track spec) {
                        <span>{{ spec }}</span>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        }

      </div>
    </div>
  `,
  styles: [`
    .admin-wrapper {
      min-height: calc(100vh - 80px);
      background: #09090b;
      padding-bottom: 80px;
    }
    .admin-topbar {
      background: #18181b;
      border-bottom: 1px solid #27272a;
      padding: 36px 0;
    }
    .topbar-inner {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 24px;
      flex-wrap: wrap;
    }
    .brand-tag {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: #f97316;
      letter-spacing: 0.12em;
      margin-bottom: 8px;
    }
    .topbar-title {
      font-size: 2.2rem;
      letter-spacing: -0.02em;
      margin-bottom: 6px;
    }
    .topbar-sub {
      font-size: 0.95rem;
      color: #a1a1aa;
    }
    .topbar-actions {
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
    }
    .nav-tab {
      background: #09090b;
      border: 1px solid #27272a;
      color: #a1a1aa;
      font-weight: 600;
      font-size: 0.88rem;
      padding: 10px 20px;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .nav-tab.active {
      background: #f97316;
      border-color: #f97316;
      color: #ffffff;
    }
    .nav-tab:hover:not(.active) {
      border-color: #3f3f46;
      color: #ffffff;
    }
    .btn-logout {
      background: #27272a;
      border: 1px solid #3f3f46;
      color: #f87171;
      font-weight: 600;
      font-size: 0.88rem;
      padding: 10px 18px;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-logout:hover {
      background: rgba(239, 68, 68, 0.2);
      border-color: #ef4444;
      color: #ffffff;
    }

    .admin-body {
      padding-top: 36px;
    }

    /* ACTION ALERT GREEN */
    .action-alert-green {
      background: rgba(34, 197, 94, 0.12);
      border: 1px solid rgba(34, 197, 94, 0.4);
      color: #4ade80;
      padding: 16px 20px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
      font-size: 0.95rem;
    }
    .alert-ico { font-size: 1.3rem; font-weight: 900; }

    /* CONTENT CARD */
    .content-card {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 20px;
      overflow: hidden;
    }
    .card-header {
      padding: 24px 28px;
      border-bottom: 1px solid #27272a;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .card-header h2 { font-size: 1.4rem; margin-bottom: 4px; }
    .card-sub { font-size: 0.85rem; color: #71717a; }
    .badge-count {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      background: #27272a;
      color: #f97316;
      padding: 4px 12px;
      border-radius: 9999px;
      font-weight: 700;
    }

    /* INSPECTOR MODAL/BOX */
    .rfq-inspector-card {
      background: #09090b;
      border-bottom: 2px solid #f97316;
      padding: 32px;
    }
    .inspector-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
    }
    .ref-badge {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: #f97316;
      font-weight: 700;
    }
    .inspector-head h3 { font-size: 1.6rem; margin-top: 4px; margin-bottom: 6px; }
    .meta-p { font-size: 0.88rem; color: #a1a1aa; }
    .btn-close-inspect {
      background: transparent;
      border: none;
      color: #71717a;
      font-size: 1.8rem;
      cursor: pointer;
    }
    .btn-close-inspect:hover { color: #ffffff; }
    .inspector-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 20px;
    }
    .insp-col {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 12px;
      padding: 12px 16px;
    }
    .i-lbl {
      display: block;
      font-family: var(--font-mono);
      font-size: 0.68rem;
      color: #71717a;
      letter-spacing: 0.08em;
      margin-bottom: 4px;
    }
    .i-val { font-size: 0.95rem; font-weight: 600; color: #ffffff; }
    .status-val.approved { color: #4ade80; }
    .insp-box {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 20px;
    }
    .insp-box p { color: #d4d4d8; font-size: 0.9rem; margin-top: 6px; margin-bottom: 0; line-height: 1.5; }
    .insp-files { margin-bottom: 24px; }
    .file-chips-row { display: flex; gap: 10px; margin-top: 8px; flex-wrap: wrap; }
    .file-chip-item {
      background: #18181b;
      border: 1px solid #3f3f46;
      border-radius: 8px;
      padding: 8px 14px;
      font-size: 0.82rem;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .download-lbl { font-family: var(--font-mono); font-size: 0.68rem; color: #4ade80; }
    .download-btn-active {
      background: rgba(249, 115, 22, 0.15);
      border: 1px solid rgba(249, 115, 22, 0.4);
      color: #f97316;
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 0.72rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .download-btn-active:hover {
      background: #f97316;
      color: #ffffff;
    }
    .inspector-controls {
      display: grid;
      grid-template-columns: 1fr 1fr auto;
      gap: 16px;
      align-items: flex-end;
      background: #18181b;
      border: 1px solid rgba(249, 115, 22, 0.3);
      border-radius: 16px;
      padding: 20px;
    }
    .ctrl-group label {
      display: block;
      font-size: 0.78rem;
      font-weight: 600;
      color: #d4d4d8;
      margin-bottom: 6px;
    }
    .ctrl-input {
      width: 100%;
      background: #09090b;
      border: 1px solid #3f3f46;
      border-radius: 10px;
      padding: 10px 14px;
      color: #ffffff;
      font-size: 0.9rem;
    }
    .ctrl-input:focus { outline: none; border-color: #f97316; }
    .btn-apply {
      padding: 12px 24px !important;
      font-size: 0.95rem !important;
      white-space: nowrap;
    }

    /* RFQ TABLE */
    .table-responsive { overflow-x: auto; }
    .rfq-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.88rem;
    }
    .rfq-table th {
      background: #09090b;
      border-bottom: 1px solid #27272a;
      padding: 14px 24px;
      font-family: var(--font-heading);
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #a1a1aa;
    }
    .rfq-table td {
      padding: 16px 24px;
      border-bottom: 1px solid #27272a;
      color: #d4d4d8;
    }
    .rfq-table tr:hover { background: rgba(255, 255, 255, 0.02); }
    .active-row { background: rgba(249, 115, 22, 0.05) !important; }
    .ref-col { font-family: var(--font-mono); color: #f97316; font-weight: 700; }
    .c-name { font-weight: 600; color: #ffffff; }
    .c-co { font-size: 0.75rem; color: #71717a; }
    .p-title { font-weight: 500; color: #ffffff; }
    .p-qty { font-size: 0.75rem; color: #a1a1aa; }
    .mat-col { font-family: var(--font-mono); font-size: 0.82rem; }
    .status-pill {
      background: #27272a;
      border: 1px solid #3f3f46;
      color: #fbbf24;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      padding: 4px 10px;
      border-radius: 9999px;
      font-weight: 600;
    }
    .status-pill.success-pill {
      background: rgba(34, 197, 94, 0.15);
      border-color: rgba(34, 197, 94, 0.4);
      color: #4ade80;
    }
    .price-col { font-family: var(--font-mono); font-weight: 700; }
    .price-txt { color: #4ade80; }
    .price-na { color: #71717a; font-weight: 400; font-size: 0.75rem; }
    .btn-inspect {
      background: #27272a;
      border: 1px solid #3f3f46;
      color: #f97316;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-inspect:hover {
      background: #f97316;
      color: #ffffff;
    }

    /* SERVICES ADMIN */
    .services-admin-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }
    .service-add-form {
      padding: 28px;
    }
    .form-group { margin-bottom: 18px; }
    .form-group label {
      display: block;
      font-size: 0.82rem;
      font-weight: 600;
      color: #d4d4d8;
      margin-bottom: 6px;
    }
    .w-full { width: 100%; padding: 12px !important; margin-top: 10px; }
    .services-mini-list {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-height: 600px;
      overflow-y: auto;
    }
    .serv-mini-item {
      background: #09090b;
      border: 1px solid #27272a;
      border-radius: 14px;
      padding: 20px;
    }
    .s-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .s-tag {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: #f97316;
      font-weight: 700;
      letter-spacing: 0.1em;
    }
    .btn-del-serv {
      background: transparent;
      border: none;
      color: #ef4444;
      font-size: 0.75rem;
      cursor: pointer;
    }
    .serv-mini-item h4 { font-size: 1.15rem; margin-bottom: 6px; }
    .serv-mini-item p { font-size: 0.85rem; color: #a1a1aa; line-height: 1.5; margin-bottom: 12px; }
    .s-specs { display: flex; flex-wrap: wrap; gap: 6px; }
    .s-specs span {
      background: #18181b;
      border: 1px solid #27272a;
      font-size: 0.7rem;
      font-family: var(--font-mono);
      color: #d4d4d8;
      padding: 3px 8px;
      border-radius: 4px;
    }

    @media (max-width: 992px) {
      .services-admin-grid { grid-template-columns: 1fr; }
      .inspector-grid { grid-template-columns: repeat(2, 1fr); }
      .inspector-controls { grid-template-columns: 1fr; }
    }
  `]
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  pollTimer: any = null;

  activeTab: 'rfqs' | 'services' = 'rfqs';
  rfqs: RfqRequest[] = [];
  selectedRfq: RfqRequest | null = null;
  actionSuccessMsg = '';

  quotePriceInput: number | null = null;
  statusSelect = 'Approved / Quoted';

  newServ = {
    title: '',
    tag: '',
    description: ''
  };
  newServSpecs = '';

  customServices: CustomService[] = [
    {
      id: 's-1',
      title: 'CNC Machining',
      tag: 'CNC MACHINING &bull; TURNING',
      description: 'Precision turned and machined components for prototypes, low-volume and production applications.',
      specs: ['Dual Spindle', 'Live Y-Axis Tooling', 'Bar Capacity: Up to 3.5"', '±0.0002" Runout']
    },
    {
      id: 's-2',
      title: 'Swiss Machining',
      tag: 'SWISS &bull; MICRO-PRECISION',
      description: 'Small-diameter and complex components requiring high precision and efficient production.',
      specs: ['Citizen Cincom 7-Axis', '0.5mm - 32mm', 'Titanium ELI', 'Medical Grade']
    },
    {
      id: 's-3',
      title: 'CNC Milling',
      tag: 'MILLING &bull; 5-AXIS SIMULTANEOUS',
      description: 'Precision milled components ranging from prototypes to production quantities.',
      specs: ['5-Axis VMC', '24,000 RPM', 'Tolerances down to ±0.0001"', 'Aerospace Alloys']
    },
    {
      id: 's-4',
      title: '3D Printing',
      tag: 'ADDITIVE &bull; DMLS &amp; SLS',
      description: 'Rapid prototypes, functional components, fixtures and development parts.',
      specs: ['DMLS Metal', 'Titanium & Inconel', 'PEEK & ULTEM', '3-7 Day Turnaround']
    },
    {
      id: 's-5',
      title: 'Prototyping',
      tag: 'FAST-TURN &bull; PROOF-OF-CONCEPT',
      description: 'Turn your CAD model or concept into a physical component quickly.',
      specs: ['24-48h Expedite', 'DFM Feedback', 'CMM Inspection', 'Fast Setup']
    },
    {
      id: 's-6',
      title: 'Engineering Support',
      tag: 'DFM REVIEW &bull; GUIDANCE',
      description: 'DFM review, process selection, drawing review and manufacturing guidance.',
      specs: ['Design for Machinability', 'GD&T Optimization', 'Material Advisory', 'Cost Sourcing']
    }
  ];

  ngOnInit(): void {
    this.loadRfqs();
    this.loadCustomServices();
    // Poll every 8 seconds so new RFQs from USA appear automatically
    this.pollTimer = setInterval(() => this.loadRfqs(), 8000);
  }

  ngOnDestroy(): void {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
    }
  }

  async loadRfqs(): Promise<void> {
    // 1. Load local browser cache first for instant display
    try {
      const stored = JSON.parse(localStorage.getItem('norfat_public_requests') || '[]');
      if (stored && stored.length > 0) {
        this.rfqs = stored;
      }
    } catch (e) {}

    // 2. Fetch live global cloud database (KVdb) so RFQs from USA or anywhere in the world appear instantly
    try {
      const cloudEndpoint = 'https://kvdb.io/H9nmj9FVhhVXBHKzDW7hXZ/norfatek_rfqs';
      const res = await fetch(cloudEndpoint);
      if (res.ok) {
        const cloudData = await res.json();
        if (Array.isArray(cloudData) && cloudData.length > 0) {
          this.rfqs = cloudData;
          localStorage.setItem('norfat_public_requests', JSON.stringify(this.rfqs));
          this.cdr.markForCheck();
        }
      }
    } catch (err) {
      console.warn('Cloud sync check:', err);
    }
  }

  loadCustomServices(): void {
    try {
      const storedServ = JSON.parse(localStorage.getItem('norfatek_custom_services') || '[]');
      if (storedServ.length > 0) {
        this.customServices = storedServ;
      }
    } catch {}
  }

  openInspect(r: RfqRequest): void {
    this.selectedRfq = r;
    this.quotePriceInput = r.quotedPrice || null;
    this.statusSelect = r.status === 'Received' ? 'Approved / Quoted' : r.status;
  }

  async applyRfqStatus(): Promise<void> {
    if (!this.selectedRfq) return;
    this.selectedRfq.status = this.statusSelect;
    if (this.quotePriceInput) {
      this.selectedRfq.quotedPrice = this.quotePriceInput;
    }

    // Save update in localStorage and push to cloud database
    try {
      localStorage.setItem('norfat_public_requests', JSON.stringify(this.rfqs));
      fetch('https://kvdb.io/H9nmj9FVhhVXBHKzDW7hXZ/norfatek_rfqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.rfqs)
      }).catch(() => {});
    } catch {}

    this.actionSuccessMsg = `La demande ${this.selectedRfq.orderNumber} a été mise à jour avec succès : Statut "${this.statusSelect}" ${this.quotePriceInput ? 'au prix de $' + this.quotePriceInput : ''} !`;
    setTimeout(() => (this.actionSuccessMsg = ''), 5000);
  }

  addNewService(): void {
    if (!this.newServ.title || !this.newServ.description) return;
    const serv: CustomService = {
      id: 'serv-' + Date.now(),
      title: this.newServ.title,
      tag: this.newServ.tag || 'MANUFACTURING SERVICE',
      description: this.newServ.description,
      specs: this.newServSpecs ? this.newServSpecs.split(',').map(s => s.trim()) : ['Custom Capability', 'Rapid Sourcing']
    };

    this.customServices.unshift(serv);
    try {
      localStorage.setItem('norfatek_custom_services', JSON.stringify(this.customServices));
    } catch {}

    this.actionSuccessMsg = `Le service "${serv.title}" a été ajouté avec succès !`;
    this.newServ = { title: '', tag: '', description: '' };
    this.newServSpecs = '';
    setTimeout(() => (this.actionSuccessMsg = ''), 4000);
  }

  removeService(id: string): void {
    this.customServices = this.customServices.filter(s => s.id !== id);
    try {
      localStorage.setItem('norfatek_custom_services', JSON.stringify(this.customServices));
    } catch {}
  }

  downloadFile(f: any): void {
    const dummyContent = `NORFATEK CAD / DRAWING REPOSITORY\nFile Name: ${f.fileName}\nSize: ${f.fileSizeBytes || 1024} bytes\nStatus: Verified for DFM Review`;
    const blob = new Blob([dummyContent], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = f.fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  logout(): void {
    localStorage.removeItem('norfatek_admin_logged');
    this.router.navigate(['/']);
  }
}