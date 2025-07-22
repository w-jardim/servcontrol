import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrocaPlantao, TrocaPlantaoFilters } from '../models/troca-plantao.model';

@Injectable({
  providedIn: 'root'
})
export class TrocaPlantaoService {
  private readonly API_URL = 'http://localhost:3000/api/trocas-plantao';

  constructor(private http: HttpClient) {}

  getTrocasPlantao(filters?: TrocaPlantaoFilters): Observable<TrocaPlantao[]> {
    let params = new HttpParams();
    
    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = (filters as any)[key];
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<TrocaPlantao[]>(this.API_URL, { params });
  }

  getTrocaPlantaoById(id: string): Observable<TrocaPlantao> {
    return this.http.get<TrocaPlantao>(`${this.API_URL}/${id}`);
  }

  solicitarTrocaPlantao(troca: Omit<TrocaPlantao, 'id' | 'status' | 'dataSolicitacao'>): Observable<TrocaPlantao> {
    return this.http.post<TrocaPlantao>(this.API_URL, troca);
  }

  aceitarTrocaPlantao(id: string, observacoes?: string): Observable<TrocaPlantao> {
    return this.http.patch<TrocaPlantao>(`${this.API_URL}/${id}/aceitar`, { observacoes });
  }

  rejeitarTrocaPlantao(id: string, motivo: string): Observable<TrocaPlantao> {
    return this.http.patch<TrocaPlantao>(`${this.API_URL}/${id}/rejeitar`, { motivo });
  }

  cancelarTrocaPlantao(id: string): Observable<TrocaPlantao> {
    return this.http.patch<TrocaPlantao>(`${this.API_URL}/${id}/cancelar`, {});
  }

  getTrocasPorOficial(oficialId: string): Observable<TrocaPlantao[]> {
    return this.http.get<TrocaPlantao[]>(`${this.API_URL}/oficial/${oficialId}`);
  }

  getTrocasPendentes(): Observable<TrocaPlantao[]> {
    return this.http.get<TrocaPlantao[]>(`${this.API_URL}/pendentes`);
  }

  getHistoricoTrocas(oficialId: string): Observable<TrocaPlantao[]> {
    return this.http.get<TrocaPlantao[]>(`${this.API_URL}/historico/${oficialId}`);
  }
}