export interface TrocaPlantao {
  id: string;
  escalaOrigemId: string;
  escalaDestinoId: string;
  oficialSolicitante: string;
  oficialDestino: string;
  motivo: string;
  status: 'pendente' | 'aceita' | 'rejeitada' | 'cancelada';
  dataSolicitacao: Date;
  dataResposta?: Date;
  observacoes?: string;
}

export interface TrocaPlantaoFilters {
  oficialSolicitante?: string;
  oficialDestino?: string;
  status?: string;
  dataSolicitacao?: Date;
}