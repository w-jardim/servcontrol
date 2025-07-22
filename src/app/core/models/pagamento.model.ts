export interface Pagamento {
  id: string;
  escalaId: string;
  oficial: string;
  matricula: string;
  posto: string;
  valor: number;
  dataPagamento: Date;
  formaPagamento: 'dinheiro' | 'pix' | 'transferencia' | 'cartao';
  status: 'pendente' | 'pago' | 'cancelado';
  observacoes?: string;
}

export interface RelatorioFinanceiro {
  periodo: {
    inicio: Date;
    fim: Date;
  };
  totalPago: number;
  totalPendente: number;
  totalCancelado: number;
  pagamentosPorOficial: Array<{
    oficial: string;
    matricula: string;
    posto: string;
    totalPago: number;
    totalPendente: number;
    quantidadeEscalas: number;
  }>;
  pagamentosPorFormaPagamento: Array<{
    formaPagamento: string;
    total: number;
    quantidade: number;
  }>;
}

export interface PagamentoFilters {
  oficial?: string;
  matricula?: string;
  posto?: string;
  status?: string;
  formaPagamento?: string;
  dataInicio?: Date;
  dataFim?: Date;
}