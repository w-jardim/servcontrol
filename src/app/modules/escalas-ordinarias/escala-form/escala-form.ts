import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EscalaOrdinariaService } from '../../../core/services/escala-ordinaria.service';
import { EscalaOrdinaria } from '../../../core/models/escala-ordinaria.model';

@Component({
  selector: 'app-escala-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './escala-form.html',
  styleUrls: ['./escala-form.scss']
})
export class EscalaFormComponent implements OnInit {
  escalaForm: FormGroup;
  isEditing = false;
  escalaId: string | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private escalaService: EscalaOrdinariaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.escalaForm = this.createForm();
  }

  ngOnInit(): void {
    this.escalaId = this.route.snapshot.paramMap.get('id');
    if (this.escalaId) {
      this.isEditing = true;
      this.loadEscala();
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      oficial: ['', [Validators.required]],
      posto: ['', [Validators.required]],
      matricula: ['', [Validators.required]],
      dataInicio: ['', [Validators.required]],
      dataFim: ['', [Validators.required]],
      unidade: ['', [Validators.required]],
      servico: ['', [Validators.required]],
      valor: [0, [Validators.required, Validators.min(0)]],
      status: ['ativo', [Validators.required]],
      observacoes: ['']
    });
  }

  loadEscala(): void {
    if (!this.escalaId) return;

    this.isLoading = true;
    this.escalaService.getEscalaOrdinariaById(this.escalaId).subscribe({
      next: (escala) => {
        this.escalaForm.patchValue({
          ...escala,
          dataInicio: this.formatDateForInput(escala.dataInicio),
          dataFim: this.formatDateForInput(escala.dataFim)
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar escala';
        this.isLoading = false;
        console.error('Erro:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.escalaForm.valid) {
      this.isLoading = true;
      const formData = this.prepareFormData();

      const request = this.isEditing
        ? this.escalaService.updateEscalaOrdinaria(this.escalaId!, formData)
        : this.escalaService.createEscalaOrdinaria(formData);

      request.subscribe({
        next: () => {
          this.router.navigate(['/escalas-ordinarias']);
        },
        error: (error) => {
          this.error = 'Erro ao salvar escala';
          this.isLoading = false;
          console.error('Erro:', error);
        }
      });
    }
  }

  private prepareFormData(): Omit<EscalaOrdinaria, 'id'> {
    const formValue = this.escalaForm.value;
    return {
      ...formValue,
      dataInicio: new Date(formValue.dataInicio),
      dataFim: new Date(formValue.dataFim)
    };
  }

  private formatDateForInput(date: Date): string {
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  }

  cancel(): void {
    this.router.navigate(['/escalas-ordinarias']);
  }
}