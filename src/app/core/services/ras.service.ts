import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RAS, RASFilters } from '../models/ras.model';

@Injectable({
  providedIn: 'root'
})
export class RASService {
  private readonly API_URL = 'http://localhost:3000/api/ras';

  constructor(private http: HttpClient) {}

  getRASList(filters?: RASFilters): Observable<RAS[]> {
    let params = new HttpParams();
    
    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = (filters as any)[key];
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<RAS[]>(this.API_URL, { params });
  }

  getRASById(id: string): Observable<RAS> {
    return this.http.get<RAS>(`${this.API_URL}/${id}`);
  }

  createRAS(ras: Omit<RAS, 'id'>): Observable<RAS> {
    return this.http.post<RAS>(this.API_URL, ras);
  }

  updateRAS(id: string, ras: Partial<RAS>): Observable<RAS> {
    return this.http.put<RAS>(`${this.API_URL}/${id}`, ras);
  }

  deleteRAS(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  getRASPorOficial(oficialId: string): Observable<RAS[]> {
    return this.http.get<RAS[]>(`${this.API_URL}/oficial/${oficialId}`);
  }

  getRASPorPeriodo(dataInicio: Date, dataFim: Date): Observable<RAS[]> {
    const params = new HttpParams()
      .set('dataInicio', dataInicio.toISOString())
      .set('dataFim', dataFim.toISOString());
    
    return this.http.get<RAS[]>(`${this.API_URL}/periodo`, { params });
  }

  concluirRAS(id: string): Observable<RAS> {
    return this.http.patch<RAS>(`${this.API_URL}/${id}/concluir`, {});
  }

  cancelarRAS(id: string, motivo: string): Observable<RAS> {
    return this.http.patch<RAS>(`${this.API_URL}/${id}/cancelar`, { motivo });
  }

  getRASPorTipoAtividade(tipoAtividade: string): Observable<RAS[]> {
    return this.http.get<RAS[]>(`${this.API_URL}/tipo-atividade/${tipoAtividade}`);
  }

  getRASPorLocal(local: string): Observable<RAS[]> {
    return this.http.get<RAS[]>(`${this.API_URL}/local/${local}`);
  }
}