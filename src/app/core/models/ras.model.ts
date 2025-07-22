export interface RAS {
  id: string;
  oficial: string;
  matricula: string;
  posto: string;
  dataRegistro: Date;
  tipoAtividade: string;
  descricao: string;
  local: string;
  horaInicio: string;
  horaFim: string;
  status: 'em_andamento' | 'concluido' | 'cancelado';
  observacoes?: string;
}

export interface RASFilters {
  oficial?: string;
  matricula?: string;
  posto?: string;
  tipoAtividade?: string;
  local?: string;
  dataInicio?: Date;
  dataFim?: Date;
  status?: string;
}