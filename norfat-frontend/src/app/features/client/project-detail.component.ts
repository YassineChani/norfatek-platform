import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../core/services/project.service';
import { AuthService } from '../../core/services/auth.service';
import { ProjectOrder } from '../../core/models/norfat.models';
import { StatusBadgeComponent } from '../../shared/components/status-badge.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, StatusBadgeComponent],
  template: `
    <div class="detail-container" *ngIf="project">
      <!-- Breadcrumb & Top Bar -->
      <div class="top-nav">
        <a [routerLink]="auth.isAdmin() ? '/admin/dashboard' : '/portal/dashboard'" class="back-link">
          &larr; Back to Dashboard
        </a>
        <div class="top-actions">
          <span class="order-id">{{ project.orderNumber }}</span>
          <app-status-badge [status]="project.status"></app-status-badge>
        </div>
      </div>

      <!-- Main Order Header -->
      <div class="order-header-card">
        <div class="header-main">
          <h1>{{ project.title }}</h1>
          <div class="meta-row">
            <span><strong>Client:</strong> {{ project.clientName }} ({{ project.clientCompany }})</span>
            <span class="sep">&bull;</span>
            <span><strong>Submitted:</strong> {{ project.createdAt | date:'medium' }}</span>
          </div>
        </div>

        <div class="header-price-box">
          <span class="p-label">Quoted / Order Value</span>
          <div class="p-val" *ngIf="project.quotedPrice">\${{ project.quotedPrice | number:'1.2-2' }}</div>
          <div class="p-pending" *ngIf="!project.quotedPrice">DFM Cost Review In Progress</div>
        </div>
      </div>

      <!-- Pipeline Tracker Stepper -->
      <div class="pipeline-card">
        <h3>Manufacturing Pipeline Status</h3>
        <div class="stepper">
          <div class="step-item" [class.active]="isCurrentOrPassed('Received')">
            <div class="step-circle">1</div>
            <span class="step-name">Received</span>
          </div>
          <div class="step-line" [class.active]="isCurrentOrPassed('InReview')"></div>

          <div class="step-item" [class.active]="isCurrentOrPassed('InReview')">
            <div class="step-circle">2</div>
            <span class="step-name">DFM Review</span>
          </div>
          <div class="step-line" [class.active]="isCurrentOrPassed('InProduction')"></div>

          <div class="step-item" [class.active]="isCurrentOrPassed('InProduction')">
            <div class="step-circle">3</div>
            <span class="step-name">CNC Machining</span>
          </div>
          <div class="step-line" [class.active]="isCurrentOrPassed('QualityCheck')"></div>

          <div class="step-item" [class.active]="isCurrentOrPassed('QualityCheck')">
            <div class="step-circle">4</div>
            <span class="step-name">CMM Quality</span>
          </div>
          <div class="step-line" [class.active]="isCurrentOrPassed('Shipped')"></div>

          <div class="step-item" [class.active]="isCurrentOrPassed('Shipped')">
            <div class="step-circle">5</div>
            <span class="step-name">Shipped</span>
          </div>
          <div class="step-line" [class.active]="isCurrentOrPassed('Completed')"></div>

          <div class="step-item" [class.active]="isCurrentOrPassed('Completed')">
            <div class="step-circle">6</div>
            <span class="step-name">Completed</span>
          </div>
        </div>
      </div>

      <!-- Details & Layout -->
      <div class="content-split">
        <!-- Left: Specifications & Technical Files -->
        <div class="left-col">
          <div class="section-card">
            <h3>Technical Specifications</h3>
            <div class="spec-grid">
              <div class="spec-cell">
                <span class="spec-label">Material</span>
                <span class="spec-value">{{ project.material }}</span>
              </div>
              <div class="spec-cell">
                <span class="spec-label">Total Quantity</span>
                <span class="spec-value font-mono">{{ project.quantity }} pcs</span>
              </div>
              <div class="spec-cell">
                <span class="spec-label">Tolerance Standard</span>
                <span class="spec-value font-mono">{{ project.tolerances }}</span>
              </div>
              <div class="spec-cell">
                <span class="spec-label">Target Deadline</span>
                <span class="spec-value font-mono">
                  {{ project.targetDeadline ? (project.targetDeadline | date:'mediumDate') : 'Standard Schedule' }}
                </span>
              </div>
            </div>

            <div class="scope-box" *ngIf="project.description">
              <h4>Engineering Scope &amp; Finishes</h4>
              <p>{{ project.description }}</p>
            </div>
          </div>

          <!-- Files Area -->
          <div class="section-card">
            <h3>CAD Drawings &amp; Technical Documents</h3>
            <div *ngIf="project.files.length === 0" class="empty-files">
              No technical files uploaded for this project.
            </div>

            <div *ngIf="project.files.length > 0" class="files-list">
              <div *ngFor="let file of project.files" class="file-card">
                <div class="file-info">
                  <span class="file-badge" [class.badge-norfat]="!file.isClientUpload">
                    {{ file.isClientUpload ? 'Client CAD' : 'NORFAT Document' }}
                  </span>
                  <span class="file-title">{{ file.fileName }}</span>
                  <span class="file-meta font-mono">{{ (file.fileSizeBytes / 1024) | number:'1.0-1' }} KB &bull; {{ file.uploadedAt | date:'short' }}</span>
                </div>
                <a [href]="projectService.downloadFileUrl(file.id)" target="_blank" class="btn-download">
                  Download File
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Engineering Message Thread -->
        <div class="right-col">
          <div class="chat-card">
            <div class="chat-header">
              <h3>Engineering Communication Thread</h3>
              <span class="chat-sub">Direct contact with project machining engineers</span>
            </div>

            <div class="chat-messages">
              <div *ngFor="let msg of project.messages" class="chat-bubble" [class.staff-bubble]="msg.isStaff">
                <div class="msg-header">
                  <strong>{{ msg.senderName }}</strong>
                  <span class="msg-time">{{ msg.sentAt | date:'shortTime' }}</span>
                </div>
                <div class="msg-body">
                  {{ msg.messageText }}
                </div>
              </div>
            </div>

            <div class="chat-input-area">
              <textarea [(ngModel)]="newMessageText" rows="2" placeholder="Write a message or ask an engineering question..." class="chat-input"></textarea>
              <button (click)="sendMessage()" [disabled]="!newMessageText.trim() || isSending" class="btn-precision-primary btn-send">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detail-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 30px 24px 60px 24px;
    }
    .top-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .back-link {
        color: #0078FF;
        font-weight: 600;
        font-size: 0.9rem;
      }
      .top-actions {
        display: flex;
        align-items: center;
        gap: 12px;
        .order-id {
          font-family: var(--font-mono);
          font-weight: 700;
          color: #0B2D4F;
          font-size: 1.1rem;
        }
      }
    }
    .order-header-card {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      padding: 24px 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(11, 45, 79, 0.05);
      flex-wrap: wrap;
      gap: 16px;
      h1 { font-size: 1.8rem; color: #0B2D4F; margin-bottom: 6px; }
      .meta-row {
        font-size: 0.88rem;
        color: #64748B;
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .header-price-box {
        text-align: right;
        .p-label { font-size: 0.75rem; color: #64748B; text-transform: uppercase; font-weight: 600; }
        .p-val { font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: #047857; }
        .p-pending { font-size: 0.85rem; color: #D97706; font-weight: 600; }
      }
    }
    .pipeline-card {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      padding: 24px 28px;
      margin-bottom: 24px;
      h3 { font-size: 1.05rem; color: #0B2D4F; margin-bottom: 20px; }
    }
    .stepper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
    }
    .step-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      z-index: 2;
      .step-circle {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #E2E8F0;
        color: #64748B;
        font-weight: 700;
        font-family: var(--font-mono);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.85rem;
      }
      .step-name {
        font-size: 0.78rem;
        font-weight: 600;
        color: #64748B;
      }
      &.active {
        .step-circle {
          background: #0078FF;
          color: #fff;
          box-shadow: 0 0 10px rgba(0, 120, 255, 0.4);
        }
        .step-name {
          color: #0B2D4F;
          font-weight: 700;
        }
      }
    }
    .step-line {
      flex: 1;
      height: 3px;
      background: #E2E8F0;
      margin: 0 8px;
      margin-bottom: 20px;
      &.active { background: #0078FF; }
    }
    .content-split {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 24px;
      @media (max-width: 900px) { grid-template-columns: 1fr; }
    }
    .section-card {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;
      h3 { font-size: 1.15rem; color: #0B2D4F; margin-bottom: 16px; border-bottom: 1px solid #F1F5F9; padding-bottom: 8px; }
    }
    .spec-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 18px;
    }
    .spec-cell {
      display: flex;
      flex-direction: column;
      .spec-label { font-size: 0.75rem; color: #64748B; text-transform: uppercase; font-weight: 600; }
      .spec-value { font-size: 0.95rem; color: #0B2D4F; font-weight: 600; margin-top: 2px; }
    }
    .scope-box {
      background: #F8FAFC;
      border-left: 3px solid #0078FF;
      padding: 12px 16px;
      border-radius: 4px;
      h4 { font-size: 0.85rem; color: #0B2D4F; margin-bottom: 4px; }
      p { font-size: 0.88rem; color: #475569; line-height: 1.5; }
    }
    .files-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .file-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 6px;
      padding: 12px 16px;
      .file-badge {
        font-family: var(--font-mono);
        font-size: 0.7rem;
        background: #EBF4FF;
        color: #0078FF;
        padding: 2px 6px;
        border-radius: 3px;
        margin-right: 8px;
        &.badge-norfat { background: #FEF3C7; color: #B45309; }
      }
      .file-title { font-weight: 600; font-size: 0.9rem; color: #0B2D4F; margin-right: 12px; }
      .file-meta { font-size: 0.75rem; color: #94A3B8; }
      .btn-download {
        background: #0B2D4F;
        color: #fff !important;
        font-size: 0.8rem;
        padding: 6px 14px;
        border-radius: 4px;
        font-weight: 600;
        &:hover { background: #0078FF; }
      }
    }
    .chat-card {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(11, 45, 79, 0.05);
      display: flex;
      flex-direction: column;
      height: 600px;
    }
    .chat-header {
      padding: 16px 20px;
      border-bottom: 1px solid #E2E8F0;
      background: #F8FAFC;
      h3 { font-size: 1.05rem; color: #0B2D4F; margin-bottom: 2px; }
      .chat-sub { font-size: 0.8rem; color: #64748B; }
    }
    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .chat-bubble {
      background: #F1F5F9;
      border-radius: 8px;
      padding: 10px 14px;
      max-width: 90%;
      align-self: flex-start;
      &.staff-bubble {
        background: #EBF4FF;
        border-left: 3px solid #0078FF;
        align-self: flex-end;
      }
      .msg-header {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        font-size: 0.78rem;
        margin-bottom: 4px;
        color: #475569;
      }
      .msg-body { font-size: 0.88rem; color: #0F172A; line-height: 1.45; }
    }
    .chat-input-area {
      padding: 14px;
      border-top: 1px solid #E2E8F0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .chat-input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #CBD5E1;
      border-radius: 4px;
      font-family: var(--font-body);
      font-size: 0.88rem;
      resize: none;
      &:focus { outline: none; border-color: #0078FF; }
    }
    .btn-send { align-self: flex-end; padding: 8px 16px; font-size: 0.85rem; }
    .font-mono { font-family: var(--font-mono); }
  `]
})
export class ProjectDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  projectService = inject(ProjectService);
  auth = inject(AuthService);

  project: ProjectOrder | null = null;
  newMessageText = '';
  isSending = false;

  private statusOrder = ['Received', 'InReview', 'InProduction', 'QualityCheck', 'Shipped', 'Completed'];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProject(id);
    }
  }

  loadProject(id: string) {
    this.projectService.getProjectById(id).subscribe({
      next: (res) => this.project = res
    });
  }

  isCurrentOrPassed(statusStep: string): boolean {
    if (!this.project) return false;
    const currentIndex = this.statusOrder.indexOf(this.project.status);
    const targetIndex = this.statusOrder.indexOf(statusStep);
    return currentIndex >= targetIndex;
  }

  sendMessage() {
    if (!this.project || !this.newMessageText.trim()) return;

    this.isSending = true;
    this.projectService.addMessage(this.project.id, this.newMessageText).subscribe({
      next: (msg) => {
        this.project?.messages.push(msg);
        this.newMessageText = '';
        this.isSending = false;
      },
      error: () => {
        this.isSending = false;
      }
    });
  }
}
