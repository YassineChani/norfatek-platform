import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectOrder, ProjectMessage, ProjectFile, DashboardMetrics } from '../models/norfat.models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient) {}

  getMyProjects(): Observable<ProjectOrder[]> {
    return this.http.get<ProjectOrder[]>(`${this.apiUrl}/projects`);
  }

  getProjectById(id: string): Observable<ProjectOrder> {
    return this.http.get<ProjectOrder>(`${this.apiUrl}/projects/${id}`);
  }

  createProject(formData: FormData): Observable<ProjectOrder> {
    return this.http.post<ProjectOrder>(`${this.apiUrl}/projects`, formData);
  }

  addMessage(projectId: string, messageText: string): Observable<ProjectMessage> {
    return this.http.post<ProjectMessage>(`${this.apiUrl}/projects/${projectId}/messages`, { messageText });
  }

  downloadFileUrl(fileId: string): string {
    return `${this.apiUrl}/projects/files/${fileId}/download`;
  }

  // Admin endpoints
  getAdminMetrics(): Observable<DashboardMetrics> {
    return this.http.get<DashboardMetrics>(`${this.apiUrl}/admin/metrics`);
  }

  getAllProjects(): Observable<ProjectOrder[]> {
    return this.http.get<ProjectOrder[]>(`${this.apiUrl}/admin/projects`);
  }

  updateProjectStatus(projectId: string, status: string, quotedPrice?: number): Observable<ProjectOrder> {
    return this.http.put<ProjectOrder>(`${this.apiUrl}/admin/projects/${projectId}/status`, { status, quotedPrice });
  }

  uploadAdminDocument(projectId: string, formData: FormData): Observable<ProjectFile> {
    return this.http.post<ProjectFile>(`${this.apiUrl}/admin/projects/${projectId}/documents`, formData);
  }
}
