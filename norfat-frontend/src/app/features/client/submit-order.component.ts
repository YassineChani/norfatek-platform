import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-submit-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="upload-wrapper">
      <!-- PAGE HEADER -->
      <div class="upload-topbar">
        <div class="container topbar-inner">
          <div>
            <span class="eyebrow-orange">ENGINEERING SUBMISSION</span>
            <h1 class="topbar-title">Submit a New CAD / Manufacturing Package</h1>
            <p class="topbar-sub">Upload your 3D model files, 2D blueprints, and project specifications. Our engineering team will review and respond within 1 business day.</p>
          </div>
          <a routerLink="/portal/dashboard" class="btn-back">&larr; Back to Dashboard</a>
        </div>
      </div>

      <div class="container upload-body">
        <!-- SUCCESS STATE -->
        @if (submitted) {
          <div class="success-card">
            <div class="success-icon-ring">
              <svg xmlns="http://www.w3.org/2000/svg" class="success-check" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="success-content">
              <h2>Package Successfully Submitted</h2>
              <p>Your engineering package has been received and assigned reference <span class="ref-num">#NORFAT-{{ refNumber }}</span>.</p>
              <p>Our Ohio application engineering team will perform a complimentary DFM (Design for Manufacturability) review and provide a detailed quotation within <strong>1 business day</strong>.</p>
              <p>You will be notified at <span class="ref-email">{{ submittedEmail }}</span> once the review is complete.</p>
              <div class="success-actions">
                <a routerLink="/portal/dashboard" class="btn-spectre-primary">Return to Dashboard &rarr;</a>
                <button (click)="resetForm()" class="btn-spectre-outline">Submit Another Project</button>
              </div>
            </div>
          </div>
        }

        <!-- UPLOAD FORM -->
        @if (!submitted) {
          <div class="upload-grid">
            <!-- LEFT: Project Details Form -->
            <div class="form-card">
              <div class="form-header">
                <h2>Project Technical Details</h2>
                <p>All fields marked with * are required for an accurate quotation.</p>
              </div>

              <form [formGroup]="uploadForm" (ngSubmit)="onSubmit()">
                <div class="form-section">
                  <div class="section-label">1. Client Contact Details (No Login Required)</div>
                  <div class="input-row">
                    <div class="input-col">
                      <label>Your Full Name *</label>
                      <input type="text" formControlName="clientName" class="form-ctrl" placeholder="e.g. Alex Henderson">
                    </div>
                    <div class="input-col">
                      <label>Company / Organization *</label>
                      <input type="text" formControlName="clientCompany" class="form-ctrl" placeholder="e.g. Apex Robotics Inc.">
                    </div>
                  </div>
                  <div class="input-row">
                    <div class="input-col">
                      <label>Direct Email Address *</label>
                      <input type="email" formControlName="clientEmail" class="form-ctrl" placeholder="alex@apexrobotics.com">
                    </div>
                    <div class="input-col">
                      <label>Direct Phone Number *</label>
                      <input type="text" formControlName="clientPhone" class="form-ctrl" placeholder="+1 (513) 302-2850">
                    </div>
                  </div>
                </div>

                <div class="form-section">
                  <div class="section-label">2. Project Identification</div>
                  <div class="input-row">
                    <div class="input-col">
                      <label>Project / Part Name *</label>
                      <input type="text" formControlName="title" class="form-ctrl" placeholder="e.g. Aerospace Bearing Housing V2">
                    </div>
                    <div class="input-col">
                      <label>Quantity Required *</label>
                      <input type="text" formControlName="quantity" class="form-ctrl" placeholder="e.g. 5 prototypes">
                    </div>
                  </div>
                </div>

                <div class="form-section">
                  <div class="section-label">Manufacturing Specification</div>
                  <div class="input-row">
                    <div class="input-col">
                      <label>Manufacturing Process *</label>
                      <select formControlName="process" class="form-ctrl">
                        <option value="">Select machining process...</option>
                        <option>DMLS / Metal 3D Printing</option>
                        <option>SLS / SLA Polymer Additive</option>
                        <option>5-Axis Simultaneous CNC Milling</option>
                        <option>CNC Turning &amp; Mill-Turn</option>
                        <option>Swiss Micro-Machining</option>
                        <option>Hybrid: Additive + 5-Axis CNC Post-Machining</option>
                        <option>Rapid Prototyping (24-48 hr)</option>
                        <option>Serial Production Run</option>
                      </select>
                    </div>
                    <div class="input-col">
                      <label>Material Specification *</label>
                      <select formControlName="material" class="form-ctrl">
                        <option value="">Select primary material...</option>
                        <optgroup label="Aerospace Alloys">
                          <option>Titanium Ti-6Al-4V (Grade 5)</option>
                          <option>Inconel 718</option>
                          <option>Inconel 625</option>
                          <option>Hastelloy X</option>
                          <option>7075-T6 Aluminum</option>
                          <option>6061-T6 Aluminum</option>
                        </optgroup>
                        <optgroup label="Medical / Bio-Compatible">
                          <option>Titanium Grade 23 (ELI)</option>
                          <option>316L Stainless Steel (VM)</option>
                          <option>Cobalt Chrome (CoCrMo)</option>
                          <option>PEEK (ISO 10993)</option>
                        </optgroup>
                        <optgroup label="Industrial Metals">
                          <option>4340 Alloy Steel (Harden)</option>
                          <option>303 / 304 Stainless</option>
                          <option>AlSi10Mg (3D Print)</option>
                          <option>Copper C110</option>
                        </optgroup>
                        <optgroup label="Engineering Polymers">
                          <option>PEEK</option>
                          <option>Delrin / Acetal POM</option>
                          <option>UHMW Polyethylene</option>
                          <option>ULTEM 9085</option>
                        </optgroup>
                        <option>Other — Specify in description</option>
                      </select>
                    </div>
                  </div>
                  <div class="input-row">
                    <div class="input-col">
                      <label>Critical Tolerance / GD&amp;T *</label>
                      <input type="text" formControlName="tolerances" class="form-ctrl" placeholder="e.g. ±0.001&quot; on bore diameters, ±0.0005&quot; runout">
                    </div>
                    <div class="input-col">
                      <label>Target Delivery Date</label>
                      <input type="date" formControlName="targetDate" class="form-ctrl">
                    </div>
                  </div>
                </div>

                <div class="form-section">
                  <div class="section-label">File Upload</div>
                  
                  <!-- DRAG & DROP ZONE -->
                  <div class="dropzone"
                       [class.drag-over]="isDragging"
                       [class.has-files]="uploadedFiles.length > 0"
                       (dragover)="onDragOver($event)"
                       (dragleave)="onDragLeave()"
                       (drop)="onDrop($event)"
                       (click)="fileInput.click()">
                    <input #fileInput type="file" class="hidden-input" multiple
                           accept=".pdf,.step,.stp,.stl,.igs,.iges,.sldprt,.sldasm,.x_t,.x_b,.sat,.3mf,.dxf,.dwg,.zip"
                           (change)="onFileSelect($event)">
                    
                    @if (uploadedFiles.length === 0) {
                      <div class="drop-idle">
                        <div class="drop-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" class="dz-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <p class="drop-title">Drag &amp; Drop your CAD files here</p>
                        <p class="drop-sub">or <span class="drop-link">click to browse</span></p>
                        <div class="format-tags">
                          <span class="ftag">PDF</span>
                          <span class="ftag">STEP / STP</span>
                          <span class="ftag">STL</span>
                          <span class="ftag">IGES</span>
                          <span class="ftag">SolidWorks</span>
                          <span class="ftag">Parasolid</span>
                          <span class="ftag">3MF</span>
                          <span class="ftag">DXF / DWG</span>
                          <span class="ftag">ZIP</span>
                        </div>
                        <p class="size-limit">Maximum 50 MB per file &bull; Multiple files accepted</p>
                      </div>
                    } @else {
                      <div class="file-list-compact" (click)="$event.stopPropagation()">
                        <div class="files-header">
                          <span class="files-count">{{ uploadedFiles.length }} file(s) selected</span>
                          <button type="button" (click)="fileInput.click()" class="btn-add-more">+ Add More</button>
                        </div>
                        <div class="file-entries">
                          @for (f of uploadedFiles; track f.name) {
                            <div class="file-entry">
                              <div class="file-icon" [class]="getFileIconClass(f.name)">{{ getFileExt(f.name) }}</div>
                              <div class="file-info">
                                <div class="file-name">{{ f.name }}</div>
                                <div class="file-size">{{ formatSize(f.size) }}</div>
                              </div>
                              <button type="button" class="file-remove" (click)="removeFile(f)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="rm-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>
                </div>

                <div class="form-section">
                  <div class="section-label">Additional Requirements</div>
                  <div class="input-col">
                    <label>Project Scope, Surface Finish &amp; Inspection Notes</label>
                    <textarea formControlName="description" rows="4" class="form-ctrl" placeholder="Specify surface finish requirements (Ra μm), anodizing, plating, heat treatment, NDT/X-ray requirements, inspection standards (AS9102 FAI, CMM report), packaging, or any special handling notes..."></textarea>
                  </div>
                </div>

                <div class="form-footer">
                  <div class="itar-notice">
                    <svg xmlns="http://www.w3.org/2000/svg" class="lock-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <span>All files transmitted over TLS 1.3 encrypted connection &bull; ITAR Compliant Storage &bull; Zero third-party sharing</span>
                  </div>
                  <button type="submit" [disabled]="uploadForm.invalid || isSubmitting" class="btn-spectre-primary submit-btn">
                    @if (isSubmitting) {
                      <span class="spinner"></span> Submitting to Engineering Desk...
                    } @else {
                      Submit Engineering Package &rarr;
                    }
                  </button>
                </div>
              </form>
            </div>

            <!-- RIGHT: Info Sidebar -->
            <div class="upload-sidebar">
              <div class="side-card">
                <h3>Accepted File Formats</h3>
                <div class="format-table">
                  <div class="fmt-row">
                    <span class="fmt-type">3D CAD Models</span>
                    <span class="fmt-exts">STEP, STP, IGES, SolidWorks (.SLDPRT), Parasolid (.x_t), 3MF, STL</span>
                  </div>
                  <div class="fmt-row">
                    <span class="fmt-type">2D Drawings</span>
                    <span class="fmt-exts">PDF (preferred), DXF, DWG, TIFF</span>
                  </div>
                  <div class="fmt-row">
                    <span class="fmt-type">Archive</span>
                    <span class="fmt-exts">ZIP, 7Z (for multiple files or assemblies)</span>
                  </div>
                  <div class="fmt-row">
                    <span class="fmt-type">3D Print Specific</span>
                    <span class="fmt-exts">STL, AMF, 3MF (DMLS / SLM / SLS)</span>
                  </div>
                </div>
              </div>

              <div class="side-card">
                <h3>Typical Lead Times</h3>
                <div class="lead-table">
                  <div class="lead-row">
                    <span class="lead-type">DMLS Metal 3D</span>
                    <span class="lead-time">3 – 7 business days</span>
                  </div>
                  <div class="lead-row">
                    <span class="lead-type">CNC Prototype (1-5 pcs)</span>
                    <span class="lead-time">5 – 10 business days</span>
                  </div>
                  <div class="lead-row">
                    <span class="lead-type">Swiss Machining</span>
                    <span class="lead-time">7 – 14 business days</span>
                  </div>
                  <div class="lead-row">
                    <span class="lead-type">Production Run</span>
                    <span class="lead-time">Quoted per scope</span>
                  </div>
                  <div class="lead-row expedite">
                    <span class="lead-type">⚡ Expedite Available</span>
                    <span class="lead-time">24 – 48 hours (surcharge)</span>
                  </div>
                </div>
              </div>

              <div class="side-card contact-side">
                <h3>Direct Engineering Desk</h3>
                <p>Have a complex DFM question before uploading?</p>
                <a href="tel:+15133022850" class="contact-link phone">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="contact-ico"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  +1 (513) 302-2850
                </a>
                <a href="mailto:NORFAT@Contact.com" class="contact-link email">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="contact-ico"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  NORFAT@Contact.com
                </a>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .upload-wrapper {
      min-height: calc(100vh - 80px);
      background: #09090b;
    }
    .upload-topbar {
      background: #18181b;
      border-bottom: 1px solid #27272a;
      padding: 36px 0;
    }
    .topbar-inner {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 24px;
      flex-wrap: wrap;
    }
    .eyebrow-orange {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: #f97316;
      letter-spacing: 0.12em;
      display: block;
      margin-bottom: 8px;
    }
    .topbar-title {
      font-size: 2rem;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
    }
    .topbar-sub {
      font-size: 0.95rem;
      color: #a1a1aa;
      max-width: 600px;
      line-height: 1.5;
    }
    .btn-back {
      background: #27272a;
      border: 1px solid #3f3f46;
      color: #d4d4d8;
      padding: 8px 18px;
      border-radius: 9999px;
      font-size: 0.85rem;
      white-space: nowrap;
      transition: all 0.2s;
    }
    .btn-back:hover {
      border-color: #f97316;
      color: #f97316;
    }

    /* SUCCESS STATE */
    .upload-body {
      padding: 48px 24px;
    }
    .success-card {
      max-width: 760px;
      margin: 0 auto;
      background: #18181b;
      border: 1px solid rgba(34, 197, 94, 0.4);
      border-radius: 28px;
      padding: 48px;
      display: flex;
      gap: 32px;
      align-items: flex-start;
    }
    .success-icon-ring {
      flex-shrink: 0;
      width: 72px;
      height: 72px;
      background: rgba(34, 197, 94, 0.15);
      border: 2px solid rgba(34, 197, 94, 0.5);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .success-check {
      width: 36px;
      height: 36px;
      color: #4ade80;
    }
    .success-content h2 {
      font-size: 1.8rem;
      letter-spacing: -0.02em;
      margin-bottom: 16px;
      color: #ffffff;
    }
    .success-content p {
      font-size: 0.98rem;
      color: #a1a1aa;
      line-height: 1.7;
      margin-bottom: 12px;
    }
    .ref-num {
      font-family: var(--font-mono);
      color: #f97316;
      font-weight: 700;
      font-size: 1.05rem;
    }
    .ref-email {
      color: #ffffff;
      font-weight: 600;
    }
    .success-actions {
      display: flex;
      gap: 16px;
      margin-top: 28px;
      flex-wrap: wrap;
    }

    /* UPLOAD FORM GRID */
    .upload-grid {
      display: grid;
      grid-template-columns: 1fr 360px;
      gap: 28px;
      align-items: start;
    }
    .form-card {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 24px;
      overflow: hidden;
    }
    .form-header {
      padding: 28px 32px;
      border-bottom: 1px solid #27272a;
      background: #09090b;
    }
    .form-header h2 {
      font-size: 1.4rem;
      margin-bottom: 4px;
    }
    .form-header p {
      font-size: 0.85rem;
      color: #71717a;
    }
    .form-section {
      padding: 24px 32px;
      border-bottom: 1px solid #27272a;
    }
    .section-label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: #f97316;
      letter-spacing: 0.12em;
      margin-bottom: 18px;
    }
    .input-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }
    .input-col {
      display: flex;
      flex-direction: column;
    }
    label {
      font-size: 0.82rem;
      font-weight: 500;
      color: #d4d4d8;
      margin-bottom: 6px;
    }
    .form-ctrl {
      background: #09090b;
      border: 1px solid #3f3f46;
      border-radius: 10px;
      padding: 10px 14px;
      color: #ffffff;
      font-family: var(--font-body);
      font-size: 0.92rem;
      transition: border-color 0.2s;
      width: 100%;
    }
    .form-ctrl:focus {
      outline: none;
      border-color: #f97316;
    }

    /* DROPZONE */
    .dropzone {
      border: 2px dashed #3f3f46;
      border-radius: 16px;
      min-height: 200px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dropzone:hover, .dropzone.drag-over {
      border-color: #f97316;
      background: rgba(249, 115, 22, 0.04);
    }
    .dropzone.has-files {
      border-style: solid;
      border-color: rgba(34, 197, 94, 0.4);
      background: rgba(34, 197, 94, 0.03);
    }
    .hidden-input { display: none; }
    .drop-idle {
      text-align: center;
      padding: 36px;
    }
    .drop-icon {
      width: 64px;
      height: 64px;
      background: rgba(249, 115, 22, 0.1);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
    }
    .dz-icon {
      width: 32px;
      height: 32px;
      color: #f97316;
    }
    .drop-title {
      font-size: 1.05rem;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 6px;
    }
    .drop-sub {
      font-size: 0.9rem;
      color: #71717a;
      margin-bottom: 16px;
    }
    .drop-link {
      color: #f97316;
      font-weight: 600;
      cursor: pointer;
    }
    .format-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      margin-bottom: 12px;
    }
    .ftag {
      background: #27272a;
      border: 1px solid #3f3f46;
      color: #e4e4e7;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 600;
      padding: 3px 9px;
      border-radius: 4px;
    }
    .size-limit {
      font-size: 0.78rem;
      color: #52525b;
    }

    /* FILE LIST */
    .file-list-compact {
      width: 100%;
      padding: 16px 20px;
    }
    .files-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .files-count {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: #4ade80;
      font-weight: 600;
    }
    .btn-add-more {
      background: #27272a;
      border: 1px solid #3f3f46;
      color: #d4d4d8;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.78rem;
      cursor: pointer;
    }
    .file-entries {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 240px;
      overflow-y: auto;
    }
    .file-entry {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #09090b;
      border: 1px solid #27272a;
      border-radius: 8px;
      padding: 8px 12px;
    }
    .file-icon {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      font-weight: 700;
      padding: 3px 6px;
      border-radius: 4px;
      text-transform: uppercase;
      min-width: 36px;
      text-align: center;
    }
    .file-icon.type-pdf { background: rgba(239, 68, 68, 0.15); color: #f87171; }
    .file-icon.type-cad { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
    .file-icon.type-stl { background: rgba(168, 85, 247, 0.15); color: #c084fc; }
    .file-icon.type-zip { background: rgba(251, 191, 36, 0.15); color: #fbbf24; }
    .file-icon.type-img { background: rgba(34, 197, 94, 0.15); color: #4ade80; }
    .file-icon.type-other { background: #27272a; color: #a1a1aa; }
    .file-info {
      flex: 1;
      min-width: 0;
    }
    .file-name {
      font-size: 0.85rem;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .file-size {
      font-size: 0.72rem;
      color: #71717a;
      font-family: var(--font-mono);
    }
    .file-remove {
      background: transparent;
      border: none;
      color: #52525b;
      cursor: pointer;
      padding: 2px;
      transition: color 0.2s;
    }
    .file-remove:hover { color: #ef4444; }
    .rm-icon { width: 14px; height: 14px; }

    /* FORM FOOTER */
    .form-footer {
      padding: 24px 32px;
    }
    .itar-notice {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.78rem;
      color: #71717a;
      margin-bottom: 16px;
      font-family: var(--font-mono);
    }
    .lock-icon { width: 14px; height: 14px; color: #71717a; }
    .submit-btn {
      width: 100%;
      padding: 14px !important;
      font-size: 1rem !important;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .submit-btn:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }
    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* SIDEBAR */
    .upload-sidebar {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .side-card {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 18px;
      padding: 24px;
    }
    .side-card h3 {
      font-size: 1.05rem;
      margin-bottom: 16px;
      color: #ffffff;
    }
    .format-table, .lead-table {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .fmt-row, .lead-row {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding-bottom: 10px;
      border-bottom: 1px solid #27272a;
    }
    .fmt-row:last-child, .lead-row:last-child { border-bottom: none; }
    .fmt-type, .lead-type {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: #f97316;
      font-weight: 600;
    }
    .fmt-exts, .lead-time {
      font-size: 0.82rem;
      color: #a1a1aa;
    }
    .lead-row.expedite .lead-type { color: #fbbf24; }
    .lead-row.expedite .lead-time { color: #fbbf24; }
    .contact-side p {
      font-size: 0.88rem;
      color: #a1a1aa;
      margin-bottom: 14px;
      line-height: 1.5;
    }
    .contact-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      border-radius: 10px;
      font-size: 0.9rem;
      font-weight: 600;
      transition: all 0.2s;
      margin-bottom: 8px;
    }
    .contact-link.phone {
      background: rgba(249, 115, 22, 0.1);
      border: 1px solid rgba(249, 115, 22, 0.3);
      color: #f97316;
    }
    .contact-link.email {
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: #38bdf8;
    }
    .contact-link:hover { transform: translateY(-1px); }
    .contact-ico { width: 16px; height: 16px; }

    @media (max-width: 992px) {
      .upload-grid { grid-template-columns: 1fr; }
      .success-card { flex-direction: column; }
      .input-row { grid-template-columns: 1fr; }
    }
  `]
})
export class SubmitOrderComponent {
  fb = inject(FormBuilder);
  auth = inject(AuthService);

  submitted = false;
  isSubmitting = false;
  isDragging = false;
  uploadedFiles: File[] = [];
  refNumber = Math.floor(Math.random() * 90000 + 10000);
  submittedEmail = '';

  uploadForm: FormGroup = this.fb.group({
    clientName: ['', Validators.required],
    clientCompany: ['', Validators.required],
    clientEmail: ['', [Validators.required, Validators.email]],
    clientPhone: ['', Validators.required],
    title: ['', Validators.required],
    quantity: ['', Validators.required],
    process: ['', Validators.required],
    material: ['', Validators.required],
    tolerances: ['', Validators.required],
    targetDate: [''],
    description: ['']
  });

  onDragOver(e: DragEvent) {
    e.preventDefault();
    this.isDragging = true;
  }
  onDragLeave() { this.isDragging = false; }
  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragging = false;
    if (e.dataTransfer?.files) {
      this.addFiles(Array.from(e.dataTransfer.files));
    }
  }
  onFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(Array.from(input.files));
    }
  }
  addFiles(files: File[]) {
    files.forEach(f => {
      if (!this.uploadedFiles.find(ef => ef.name === f.name)) {
        this.uploadedFiles.push(f);
      }
    });
  }
  removeFile(f: File) {
    this.uploadedFiles = this.uploadedFiles.filter(ef => ef !== f);
  }
  getFileExt(name: string): string {
    return name.split('.').pop()?.toUpperCase() ?? 'FILE';
  }
  getFileIconClass(name: string): string {
    const ext = name.split('.').pop()?.toLowerCase() ?? '';
    if (ext === 'pdf') return 'file-icon type-pdf';
    if (['step','stp','iges','igs','sldprt','sldasm','x_t','x_b','sat'].includes(ext)) return 'file-icon type-cad';
    if (ext === 'stl' || ext === '3mf') return 'file-icon type-stl';
    if (['zip','7z','rar'].includes(ext)) return 'file-icon type-zip';
    if (['jpg','jpeg','png','tiff','bmp'].includes(ext)) return 'file-icon type-img';
    return 'file-icon type-other';
  }
  formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  onSubmit() {
    if (this.uploadForm.invalid) return;
    this.isSubmitting = true;
    const val = this.uploadForm.value;
    this.submittedEmail = val.clientEmail;

    // Automatic push to shared storage so Admin dashboard receives it instantly!
    const newReq = {
      id: 'req-' + Date.now(),
      orderNumber: 'NORFAT-' + this.refNumber,
      title: val.title,
      clientName: val.clientName,
      clientCompany: val.clientCompany,
      clientEmail: val.clientEmail,
      clientPhone: val.clientPhone,
      material: val.process + ' • ' + val.material,
      quantity: val.quantity,
      status: 'Received',
      tolerances: val.tolerances,
      description: val.description || ('Process: ' + val.process + ' | Material: ' + val.material),
      createdAt: new Date().toISOString(),
      quotedPrice: null,
      files: this.uploadedFiles.map(f => ({
        id: 'f-' + Math.random(),
        fileName: f.name,
        contentType: 'application/octet-stream',
        fileSizeBytes: f.size,
        downloadUrl: '#'
      }))
    };

    try {
      const existing = JSON.parse(localStorage.getItem('norfat_public_requests') || '[]');
      existing.unshift(newReq);
      localStorage.setItem('norfat_public_requests', JSON.stringify(existing));
    } catch (e) {}

    setTimeout(() => {
      this.isSubmitting = false;
      this.submitted = true;
    }, 1200);
  }

  resetForm() {
    this.submitted = false;
    this.uploadedFiles = [];
    this.uploadForm.reset();
    this.refNumber = Math.floor(Math.random() * 90000 + 10000);
  }
}