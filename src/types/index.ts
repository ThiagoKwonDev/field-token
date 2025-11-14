// -------------------------
// ATIVOS
// -------------------------
export interface Ativo {
  id: string;
  nome: string;
  tipo: string;
  valor: number;
}

export interface AtivoInput {
  nome: string;
  tipo: string;
  valor: number;
}

export interface AtualizarAtivoInput {
  nome?: string;
  tipo?: string;
  valor?: number;
}

// -------------------------
// USUÁRIOS
// -------------------------
export interface Usuario {
  id: number;
  email: string;
  senha: string;
}

export interface UsuarioInput {
  email: string;
  senha: string;
}

export interface AtualizarUsuarioInput {
  email?: string;
  senha?: string;
}
