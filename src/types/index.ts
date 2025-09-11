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

export interface TokenizacaoInput {
  quantidadeTokens: number;
}

export interface Token {
  id: string;
  ativoId: string;
  valorUnitario: number;
  proprietario: string;
}

export interface Tokenizacao {
  ativoId: string;
  quantidadeTokens: number;
  tokens: Token[];
}