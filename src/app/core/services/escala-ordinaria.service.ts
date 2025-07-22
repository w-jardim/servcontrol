import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EscalaOrdinaria, EscalaOrdinariaFilters } from '../models/escala-ordinaria.model';

@Injectable({
  providedIn: 'root'
})
export class EscalaOrdinariaService {
  private readonly API_URL = 'http://localhost:3000/api/escalas-ordinarias';

  constructor(private http: HttpClient) {}

  getEscalasOrdinarias(filters?: EscalaOrdinariaFilters): Observable<EscalaOrdinaria[]> {
    let params = new HttpParams();
    
    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = (filters as any)[key];
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<EscalaOrdinaria[]>(this.API_URL, { params });
  }

  getEscalaOrdinariaById(id: string): Observable<EscalaOrdinaria> {
    return this.http.get<EscalaOrdinaria>(`${this.API_URL}/${id}`);
  }

  createEscalaOrdinaria(escala: Omit<EscalaOrdinaria, 'id'>): Observable<EscalaOrdinaria> {
    return this.http.post<EscalaOrdinaria>(this.API_URL, escala);
  }

  updateEscalaOrdinaria(id: string, escala: Partial<EscalaOrdinaria>): Observable<EscalaOrdinaria> {
    return this.http.put<EscalaOrdinaria>(`${this.API_URL}/${id}`, escala);
  }

  deleteEscalaOrdinaria(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  getEscalasPorOficial(oficialId: string): Observable<EscalaOrdinaria[]> {
    return this.http.get<EscalaOrdinaria[]>(`${this.API_URL}/oficial/${oficialId}`);
  }

  getEscalasPorPeriodo(dataInicio: Date, dataFim: Date): Observable<EscalaOrdinaria[]> {
    const params = new HttpParams()
      .set('dataInicio', dataInicio.toISOString())
      .set('dataFim', dataFim.toISOString());
    
    return this.http.get<EscalaOrdinaria[]>(`${this.API_URL}/periodo`, { params });
  }

  cancelarEscala(id: string, motivo: string): Observable<EscalaOrdinaria> {
    return this.http.patch<EscalaOrdinaria>(`${this.API_URL}/${id}/cancelar`, { motivo });
  }

  concluirEscala(id: string): Observable<EscalaOrdinaria> {
    return this.http.patch<EscalaOrdinaria>(`${this.API_URL}/${id}/concluir`, {});
  }

  getEscalasPorUnidade(unidade: string): Observable<EscalaOrdinaria[]> {
    return this.http.get<EscalaOrdinaria[]>(`${this.API_URL}/unidade/${unidade}`);
  }
}