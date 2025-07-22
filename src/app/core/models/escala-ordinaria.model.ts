export interface EscalaOrdinaria {
  id: string;
  oficial: string;
  posto: string;
  matricula: string;
  dataInicio: Date;
  dataFim: Date;
  unidade: string;
  servico: string;
  valor: number;
  status: 'ativo' | 'cancelado' | 'concluido';
  observacoes?: string;
}

export interface EscalaOrdinariaFilters {
  oficial?: string;
  posto?: string;
  matricula?: string;
  unidade?: string;
  servico?: string;
  dataInicio?: Date;
  dataFim?: Date;
  status?: string;
}