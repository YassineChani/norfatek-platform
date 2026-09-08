import { Component, inject, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <header class="page-header">
      <div class="container">
        <div class="eyebrow-orange">REQUEST A TECHNICAL QUOTE</div>
        <h1 class="page-title">Submit Your Manufacturing Package</h1>
        <p class="page-sub">Upload your CAD models, drawings, or specifications. Norfatek provides complimentary DFM feedback and connects your project with qualified manufacturing partners.</p>
      </div>
    </header>

    <div class="container contact-body">
      <div class="contact-grid">
        <!-- Form -->
        <div class="form-container">
          @if (submitted()) {
            <div class="success-box-green">
              <div class="success-icon">&check;</div>
              <div>
                <h3>Technical RFQ Received Successfully!</h3>
                <p>Your manufacturing package has been assigned Reference <strong>#NORFATEK-{{ refNumber }}</strong>.</p>
                <p>Our engineering team will review your drawings, process requirements, and provide a detailed quotation within <strong>1 business day</strong>.</p>
                <button (click)="submitted.set(false); rfqForm.reset()" class="btn-spectre-outline mt-3">Submit Another RFQ</button>
              </div>
            </div>
          }

          @if (!submitted()) {
            <form [formGroup]="rfqForm" (ngSubmit)="onSubmit()">
              <div class="input-row">
                <div class="input-col">
                  <label>First Name *</label>
                  <input type="text" formControlName="firstName" class="form-control" placeholder="Sarah">
                </div>
                <div class="input-col">
                  <label>Last Name *</label>
                  <input type="text" formControlName="lastName" class="form-control" placeholder="Connor">
                </div>
              </div>

              <div class="input-row">
                <div class="input-col">
                  <label>Work Email Address *</label>
                  <input type="email" formControlName="email" class="form-control" placeholder="s.connor@apex.com">
                </div>
                <div class="input-col">
                  <label>Phone Number *</label>
                  <input type="text" formControlName="phone" class="form-control" placeholder="+1 (513) 302-2850">
                </div>
              </div>

              <div class="input-col full-w">
                <label>Company / Organization *</label>
                <input type="text" formControlName="company" class="form-control" placeholder="Apex Engineering &amp; Robotics">
              </div>

              <!-- EXACT SPECIFIED MANUFACTURING PROCESS RADIO OPTIONS -->
              <div class="process-selection-box">
                <label class="section-lbl">Manufacturing Process *</label>
                <div class="process-radios-grid">
                  <label class="radio-option" [class.selected]="rfqForm.get('process')?.value === 'CNC Machining'">
                    <input type="radio" formControlName="process" value="CNC Machining">
                    <span class="custom-radio"></span>
                    <span class="radio-text">CNC Machining</span>
                  </label>

                  <label class="radio-option" [class.selected]="rfqForm.get('process')?.value === 'CNC Swiss'">
                    <input type="radio" formControlName="process" value="CNC Swiss">
                    <span class="custom-radio"></span>
                    <span class="radio-text">CNC Swiss</span>
                  </label>

                  <label class="radio-option" [class.selected]="rfqForm.get('process')?.value === 'CNC Milling'">
                    <input type="radio" formControlName="process" value="CNC Milling">
                    <span class="custom-radio"></span>
                    <span class="radio-text">CNC Milling</span>
                  </label>

                  <label class="radio-option" [class.selected]="rfqForm.get('process')?.value === '3D Printing'">
                    <input type="radio" formControlName="process" value="3D Printing">
                    <span class="custom-radio"></span>
                    <span class="radio-text">3D Printing</span>
                  </label>

                  <label class="radio-option" [class.selected]="rfqForm.get('process')?.value === 'Prototype'">
                    <input type="radio" formControlName="process" value="Prototype">
                    <span class="custom-radio"></span>
                    <span class="radio-text">Prototype</span>
                  </label>

                  <label class="radio-option" [class.selected]="rfqForm.get('process')?.value === 'Fabrication'">
                    <input type="radio" formControlName="process" value="Fabrication">
                    <span class="custom-radio"></span>
                    <span class="radio-text">Fabrication</span>
                  </label>

                  <label class="radio-option" [class.selected]="rfqForm.get('process')?.value === 'Others'">
                    <input type="radio" formControlName="process" value="Others">
                    <span class="custom-radio"></span>
                    <span class="radio-text">Others</span>
                  </label>
                </div>
              </div>

              <div class="input-row mt-3">
                <div class="input-col">
                  <label>Quantity Scope *</label>
                  <input type="text" formControlName="quantity" class="form-control" placeholder="e.g. 5 prototypes or 2,500 production">
                </div>
                <div class="input-col">
                  <label>Material Specification *</label>
                  <input type="text" formControlName="material" class="form-control" placeholder="e.g. 6061-T6, 316L, Ti64, PEEK">
                </div>
              </div>

              <!-- FILE ATTACHMENT DROPZONE -->
              <div class="file-upload-zone"
                   [class.drag-over]="isDragging"
                   (dragover)="onDragOver($event)"
                   (dragleave)="isDragging = false"
                   (drop)="onDrop($event)"
                   (click)="fileInput.click()">
                <input #fileInput type="file" multiple class="hidden-input"
                       accept=".pdf,.step,.stp,.stl,.iges,.igs,.sldprt,.sldasm,.x_t,.zip"
                       (change)="onFileSelect($event)">
                
                @if (uploadedFiles.length === 0) {
                  <div class="dz-inner">
                    <div class="dz-icon-box">📎</div>
                    <div class="dz-title">Attach CAD Files &amp; 2D Drawings</div>
                    <div class="dz-sub">Accepts <strong>PDF, STEP, STP, STL, IGES, SolidWorks, ZIP</strong> (Max 50MB)</div>
                  </div>
                } @else {
                  <div class="dz-files-list" (click)="$event.stopPropagation()">
                    <span class="dz-count">{{ uploadedFiles.length }} file(s) attached:</span>
                    <div class="dz-chips">
                      @for (f of uploadedFiles; track f.name) {
                        <span class="f-chip">
                          {{ f.name }} ({{ (f.size / 1024 / 1024) | number:'1.1-1' }}MB)
                          <button type="button" (click)="removeFile(f)" class="f-remove">&times;</button>
                        </span>
                      }
                    </div>
                  </div>
                }
              </div>

              <div class="input-col full-w mt-3">
                <label>Project Scope, Tolerances &amp; Critical Notes</label>
                <textarea formControlName="description" rows="4" class="form-control" placeholder="Specify tolerances (e.g. ±0.001&quot;), surface finish requirements, inspection standards, or target delivery dates..."></textarea>
              </div>

              <button type="submit" [disabled]="rfqForm.invalid || isSubmitting()" class="btn-spectre-primary submit-btn">
                {{ isSubmitting() ? 'Transmitting...' : 'Submit Request for Quote &rarr;' }}
              </button>
            </form>
          }
        </div>

        <!-- Sidebar Info -->
        <div class="contact-info-col">
          <div class="info-card">
            <h3>Norfatek Engineering Desk</h3>
            <div class="info-line">
              <span class="label">Direct Phone:</span>
              <span class="val highlight-phone"><a href="tel:+15133022850">+1 (513) 302-2850</a></span>
            </div>
            <div class="info-line">
              <span class="label">Official Email:</span>
              <span class="val"><a href="mailto:NORFATEK@Contact.com">NORFATEK@Contact.com</a></span>
            </div>
            <div class="info-line">
              <span class="label">Response Time:</span>
              <span class="val">Within 1 Business Day</span>
            </div>
          </div>

          <div class="info-card">
            <h3>Why Norfatek?</h3>
            <ul class="why-list">
              <li>&check; One Point of Contact</li>
              <li>&check; Deep Engineering Understanding</li>
              <li>&check; Flexible Manufacturing Capacity</li>
              <li>&check; Competitive Partner Sourcing</li>
              <li>&check; Prototype through Recurring Production</li>
            </ul>
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
      font-size: 3.5rem;
      letter-spacing: -0.03em;
      margin-bottom: 16px;
    }
    .page-sub {
      font-size: 1.15rem;
      color: #a1a1aa;
      max-width: 750px;
    }
    .contact-body {
      padding: 80px 24px;
    }
    .contact-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 60px;
      align-items: start;
    }
    .form-container {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 24px;
      padding: 40px;
    }
    .input-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }
    .input-col {
      display: flex;
      flex-direction: column;
    }
    .full-w {
      margin-bottom: 20px;
    }
    label {
      font-size: 0.85rem;
      font-weight: 500;
      color: #d4d4d8;
      margin-bottom: 8px;
    }
    .form-control {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #3f3f46;
      border-radius: 12px;
      font-size: 0.95rem;
      background: #09090b;
      color: #ffffff;
      transition: border-color 0.2s;
    }
    .form-control:focus {
      outline: none;
      border-color: #f97316;
    }

    /* PROCESS RADIOS - EXACT SPECIFICATION */
    .process-selection-box {
      background: #09090b;
      border: 1px solid #27272a;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .section-lbl {
      display: block;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      color: #f97316;
      letter-spacing: 0.08em;
      margin-bottom: 14px;
    }
    .process-radios-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    .radio-option {
      display: flex;
      align-items: center;
      gap: 12px;
      background: #18181b;
      border: 1px solid #3f3f46;
      border-radius: 10px;
      padding: 12px 16px;
      cursor: pointer;
      transition: all 0.2s;
      margin-bottom: 0 !important;
    }
    .radio-option:hover {
      border-color: #f97316;
    }
    .radio-option.selected {
      border-color: #f97316;
      background: rgba(249, 115, 22, 0.08);
    }
    .radio-option input[type="radio"] {
      display: none;
    }
    .custom-radio {
      width: 16px;
      height: 16px;
      border: 2px solid #71717a;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      flex-shrink: 0;
      transition: all 0.2s;
    }
    .radio-option.selected .custom-radio {
      border-color: #f97316;
    }
    .radio-option.selected .custom-radio::after {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      background: #f97316;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .radio-text {
      font-size: 0.95rem;
      font-weight: 600;
      color: #ffffff;
    }

    /* DROPZONE */
    .file-upload-zone {
      margin-top: 20px;
      border: 2px dashed #3f3f46;
      border-radius: 14px;
      padding: 24px;
      text-align: center;
      cursor: pointer;
      background: #09090b;
      transition: all 0.2s;
    }
    .file-upload-zone:hover, .file-upload-zone.drag-over {
      border-color: #f97316;
      background: rgba(249, 115, 22, 0.04);
    }
    .hidden-input { display: none; }
    .dz-icon-box { font-size: 1.8rem; margin-bottom: 6px; }
    .dz-title { font-weight: 600; font-size: 0.95rem; color: #ffffff; margin-bottom: 4px; }
    .dz-sub { font-size: 0.78rem; color: #71717a; }
    .dz-files-list { text-align: left; }
    .dz-count { font-family: var(--font-mono); font-size: 0.75rem; color: #4ade80; font-weight: 600; display: block; margin-bottom: 8px; }
    .dz-chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .f-chip {
      background: #18181b;
      border: 1px solid #3f3f46;
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 0.78rem;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .f-remove { background: transparent; border: none; color: #ef4444; cursor: pointer; font-size: 1rem; line-height: 1; }

    .mt-3 { margin-top: 16px; }
    .submit-btn {
      width: 100%;
      padding: 16px !important;
      font-size: 1.05rem !important;
      margin-top: 24px;
    }

    /* SUCCESS BOX */
    .success-box-green {
      background: rgba(34, 197, 94, 0.08);
      border: 2px solid #22c55e;
      border-radius: 20px;
      padding: 36px;
      display: flex;
      gap: 24px;
      align-items: flex-start;
    }
    .success-icon {
      width: 52px;
      height: 52px;
      background: #22c55e;
      color: #09090b;
      border-radius: 50%;
      font-size: 1.8rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .success-box-green h3 { font-size: 1.5rem; color: #4ade80; margin-bottom: 10px; }
    .success-box-green p { color: #d4d4d8; font-size: 0.95rem; line-height: 1.6; margin-bottom: 10px; }
    .success-box-green strong { color: #f97316; }

    /* SIDEBAR */
    .contact-info-col {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .info-card {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 20px;
      padding: 32px;
    }
    .info-card h3 {
      font-size: 1.25rem;
      margin-bottom: 20px;
    }
    .info-line {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid #27272a;
    }
    .info-line:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .info-line .label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: #71717a;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 4px;
    }
    .info-line .val {
      font-size: 1.05rem;
      color: #ffffff;
      font-weight: 500;
    }
    .highlight-phone a {
      color: #f97316;
      font-weight: 700;
      text-decoration: none;
    }
    .why-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .why-list li {
      font-size: 0.95rem;
      color: #d4d4d8;
    }

    @media (max-width: 992px) {
      .contact-grid { grid-template-columns: 1fr; }
      .input-row { grid-template-columns: 1fr; }
      .process-radios-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ContactComponent {
  fb  = inject(FormBuilder);
  cdr = inject(ChangeDetectorRef);

  submitted    = signal(false);
  isSubmitting = signal(false);
  isDragging = false;
  uploadedFiles: File[] = [];
  refNumber = Math.floor(Math.random() * 90000 + 10000);

  rfqForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    company: ['', Validators.required],
    process: ['CNC Machining', Validators.required],
    quantity: ['', Validators.required],
    material: ['', Validators.required],
    description: ['']
  });

  onDragOver(e: DragEvent) { e.preventDefault(); this.isDragging = true; }
  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragging = false;
    if (e.dataTransfer?.files) {
      Array.from(e.dataTransfer.files).forEach(f => this.uploadedFiles.push(f));
    }
  }
  onFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(f => this.uploadedFiles.push(f));
    }
  }
  removeFile(f: File) {
    this.uploadedFiles = this.uploadedFiles.filter(x => x !== f);
  }

  onSubmit() {
    if (this.rfqForm.invalid) return;
    this.isSubmitting.set(true);
    const val = this.rfqForm.value;

    const newReq = {
      id: 'rfq-' + Date.now(),
      orderNumber: 'NORFATEK-' + this.refNumber,
      title: `${val.process} Package (${val.quantity} pcs)`,
      clientName: `${val.firstName} ${val.lastName}`,
      clientCompany: val.company,
      clientEmail: val.email,
      clientPhone: val.phone,
      material: val.material || 'To Be Specified',
      process: val.process,
      quantity: val.quantity,
      status: 'Received',
      tolerances: 'Standard Norfatek Spec',
      description: val.description || (`Process: ${val.process} | Material: ${val.material}`),
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

    // Save immediately to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('norfat_public_requests') || '[]');
      existing.unshift(newReq);
      localStorage.setItem('norfat_public_requests', JSON.stringify(existing));
    } catch (e) {}

    // Signals trigger instant re-render in zoneless Angular — no delay needed
    this.isSubmitting.set(false);
    this.submitted.set(true);
    this.cdr.markForCheck();
  }
}