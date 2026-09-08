import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="status-badge" [ngClass]="badgeClass">
      {{ label }}
    </span>
  `
})
export class StatusBadgeComponent {
  @Input() status: string = 'Received';

  get badgeClass(): string {
    const s = this.status?.toLowerCase().replace(/\s+/g, '') || 'received';
    return `status-${s}`;
  }

  get label(): string {
    switch (this.status) {
      case 'Received': return 'Received / Queued';
      case 'InReview': return 'Engineering Review';
      case 'InProduction': return 'In Production';
      case 'QualityCheck': return 'CMM Quality Check';
      case 'Shipped': return 'Shipped / Dispatched';
      case 'Completed': return 'Completed';
      default: return this.status;
    }
  }
}
