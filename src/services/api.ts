// services/api.ts
import axios from "axios";
import {
  Ativo,
  AtivoInput,
  TokenizacaoInput,
  Tokenizacao,
  Token,
} from "../types";

const api = axios.create({
  baseURL: "https://sandbox.fieldtoken.com/v1",
  headers: { "Content-Type": "application/json" },
});

export const ativosService = {
  listarAtivos: async (): Promise<Ativo[]> => {
    const response = await api.get("/ativos");
    return response.data;
  },

  cadastrarAtivo: async (ativo: AtivoInput): Promise<Ativo> => {
    const response = await api.post("/ativos", ativo);
    return response.data;
  },

  atualizarAtivo: async (id: string, ativo: AtivoInput): Promise<Ativo> => {
    const response = await api.put(`/ativos/${id}`, ativo);
    return response.data;
  },

  deletarAtivo: async (id: string): Promise<void> => {
    await api.delete(`/ativos/${id}`);
  },

  tokenizarAtivo: async (id: string, data: TokenizacaoInput) => {
    const response = await api.post(`/ativos/${id}/tokenizar`, data);
    return response.data;
  },
};

export const tokensService = {
  listarTokens: async (): Promise<Token[]> => {
    const { data } = await api.get("/tokens");
    return data;
  },
  criarToken: async (novoToken: Omit<Token, "id">): Promise<Token> => {
    const { data } = await api.post("/tokens", novoToken);
    return data;
  },
  atualizarToken: async (id: string, token: Partial<Token>): Promise<Token> => {
    const { data } = await api.put(`/tokens/${id}`, token);
    return data;
  },
  excluirToken: async (id: string): Promise<void> => {
    await api.delete(`/tokens/${id}`);
  },
};

export default api;
