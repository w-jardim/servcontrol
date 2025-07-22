import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EscalaOrdinariaService } from '../../../core/services/escala-ordinaria.service';
import { EscalaOrdinaria, EscalaOrdinariaFilters } from '../../../core/models/escala-ordinaria.model';

@Component({
  selector: 'app-escala-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './escala-list.html',
  styleUrls: ['./escala-list.scss']
})
export class EscalaListComponent implements OnInit {
  escalas: EscalaOrdinaria[] = [];
  filters: EscalaOrdinariaFilters = {};
  isLoading = false;
  error: string | null = null;

  constructor(private escalaService: EscalaOrdinariaService) {}

  ngOnInit(): void {
    this.loadEscalas();
  }

  loadEscalas(): void {
    this.isLoading = true;
    this.error = null;
    
    this.escalaService.getEscalasOrdinarias(this.filters).subscribe({
      next: (escalas) => {
        this.escalas = escalas;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar escalas ordinárias';
        this.isLoading = false;
        console.error('Erro:', error);
      }
    });
  }

  applyFilters(): void {
    this.loadEscalas();
  }

  clearFilters(): void {
    this.filters = {};
    this.loadEscalas();
  }

  deleteEscala(id: string): void {
    if (confirm('Tem certeza que deseja excluir esta escala?')) {
      this.escalaService.deleteEscalaOrdinaria(id).subscribe({
        next: () => {
          this.loadEscalas();
        },
        error: (error) => {
          console.error('Erro ao excluir escala:', error);
        }
      });
    }
  }
}