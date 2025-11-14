// services/api.ts

import axios from "axios";
import {
  Ativo,
  Usuario,
  AtivoInput,
  UsuarioInput,
  AtualizarAtivoInput,
  AtualizarUsuarioInput,
} from "../types";

export const api = axios.create({
  baseURL: "http://52.248.110.25",
  headers: { "Content-Type": "application/json" },
});



// Helper para header opcional x-correlation-id
function withCorrelation(correlationId?: string) {
  return correlationId
    ? { headers: { "x-correlation-id": correlationId } }
    : {};
}


// =========================================
// =============== ATIVOS ===================
// =========================================

export const ativosService = {
  // GET /bff/ativo
  listarAtivos: async (): Promise<Ativo[]> => {
    const response = await api.get("/bff/ativo");
    return response.data;
  },

// POST /bff/ativo  (event-driven)
cadastrarAtivo: async (
  ativo: AtivoInput,
  correlationId?: string
): Promise<void> => {
  await api.post("/bff/ativo", ativo, withCorrelation(correlationId));
},

  // GET /bff/ativo/{id}
  buscarAtivoPorId: async (id: string): Promise<Ativo> => {
    const response = await api.get(`/bff/ativo/${id}`);
    return response.data;
  },

  // GET /bff/ativo/usuario/{usuarioId}
  listarAtivosPorUsuario: async (usuarioId: string): Promise<Ativo[]> => {
    const response = await api.get(`/bff/ativo/usuario/${usuarioId}`);
    return response.data;
  },

  // PATCH /bff/ativo/{id}
  atualizarAtivo: async (
    id: string,
    ativo: AtualizarAtivoInput
  ): Promise<Ativo> => {
    const response = await api.patch(`/bff/ativo/${id}`, ativo);
    return response.data;
  },

  // DELETE /bff/ativo/{id}
  removerAtivo: async (id: string): Promise<void> => {
    await api.delete(`/bff/ativo/${id}`);
  },
};

// =========================================
// =============== USUÁRIOS =================
// =========================================

export const usuariosService = {
  // GET /bff/usuario
  listarUsuarios: async (): Promise<Usuario[]> => {
    const response = await api.get("/bff/usuario");
    return response.data;
  },

// POST /bff/usuario (event-driven)
cadastrarUsuario: async (
  usuario: UsuarioInput,
  correlationId?: string
): Promise<void> => {
  await api.post("/bff/usuario", usuario, withCorrelation(correlationId));
},

  // GET /bff/usuario/{id}
  buscarUsuarioPorId: async (id: number): Promise<Usuario> => {
    const response = await api.get(`/bff/usuario/${id}`);
    return response.data;
  },

  // PUT /bff/usuario/{id}
  atualizarUsuario: async (
    id: number,
    usuario: AtualizarUsuarioInput
  ): Promise<Usuario> => {
    const response = await api.put(`/bff/usuario/${id}`, usuario);
    return response.data;
  },

  // DELETE /bff/usuario/{id}
  removerUsuario: async (id: number): Promise<void> => {
    await api.delete(`/bff/usuario/${id}`);
  },
};

export default api;
