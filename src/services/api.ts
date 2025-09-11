import axios from 'axios';
import { Ativo, AtivoInput, TokenizacaoInput, Tokenizacao, Token } from '../types';

const api = axios.create({
  baseURL: 'https://sandbox.fieldtoken.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ativosService = {
  listarAtivos: async (): Promise<Ativo[]> => {
    const response = await api.get('/ativos');
    return response.data;
  },

  cadastrarAtivo: async (ativo: AtivoInput): Promise<Ativo> => {
    const response = await api.post('/ativos', ativo);
    return response.data;
  },

  tokenizarAtivo: async (id: string, data: TokenizacaoInput): Promise<Tokenizacao> => {
    const response = await api.post(`/ativos/${id}/tokenizar`, data);
    return response.data;
  },
};

export const tokensService = {
  listarTokens: async (): Promise<Token[]> => {
    const response = await api.get('/tokens');
    return response.data;
  },
};

export default api;