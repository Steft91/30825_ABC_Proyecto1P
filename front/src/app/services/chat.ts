import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private baseUrl = 'http://localhost:8000';
  constructor(private http: HttpClient) {}

  enviarPregunta(pregunta: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/chat/?pregunta=${encodeURIComponent(pregunta)}`, {});
  }

  subirArchivo(archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', archivo);
    return this.http.post(`${this.baseUrl}/ingestar/`, formData);
  }

}
