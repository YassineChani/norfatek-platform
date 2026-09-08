import { Routes } from '@angular/router';
import { HomeComponent } from './features/public/home.component';
import { ServicesComponent } from './features/public/services.component';
import { HowItWorksComponent } from './features/public/how-it-works.component';
import { IndustriesComponent } from './features/public/industries.component';
import { AboutComponent } from './features/public/about.component';
import { ContactComponent } from './features/public/contact.component';
import { AdminLoginComponent } from './features/admin/admin-login.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard.component';

export const routes: Routes = [
  // Public User Website
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'industries', component: IndustriesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },

  // Admin Dedicated Portal (Email & Password protected)
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },

  // Fallback
  { path: '**', redirectTo: '' }
];