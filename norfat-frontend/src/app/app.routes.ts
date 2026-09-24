import { Routes } from '@angular/router';
import { HomeComponent } from './features/public/home.component';
import { ServicesComponent } from './features/public/services.component';
import { HowItWorksComponent } from './features/public/how-it-works.component';
import { IndustriesComponent } from './features/public/industries.component';
import { AboutComponent } from './features/public/about.component';
import { ContactComponent } from './features/public/contact.component';
import { AdminLoginComponent } from './features/admin/admin-login.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard.component';
import { ClientDashboardComponent } from './features/client/client-dashboard.component';
import { SubmitOrderComponent } from './features/client/submit-order.component';
import { ProjectDetailComponent } from './features/client/project-detail.component';

export const routes: Routes = [
  // Public User Website
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'industries', component: IndustriesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },

  // Admin Direct Portal & Dashboard
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/login', component: AdminLoginComponent },

  // Client Portal
  { path: 'portal/dashboard', component: ClientDashboardComponent },
  { path: 'portal/submit-order', component: SubmitOrderComponent },
  { path: 'portal/project/:id', component: ProjectDetailComponent },

  // Fallback
  { path: '**', redirectTo: '' }
];