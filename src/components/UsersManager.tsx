import React, { useEffect, useState } from "react";
import { User, Edit, Trash2, Plus } from "lucide-react";
import { usuariosService } from "../services/api";
import { Usuario, UsuarioInput, AtualizarUsuarioInput } from "../types";

const UsersManager: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<UsuarioInput>({
    email: "",
    senha: "",
  });

  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    try {
      setLoading(true);
      const data = await usuariosService.listarUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingUser) {
        await usuariosService.atualizarUsuario(editingUser.id, formData);
      } else {
        await usuariosService.cadastrarUsuario(formData);
      }

      resetForm();
      setShowForm(false);
      await loadUsuarios();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja excluir este usuário?")) return;

    try {
      await usuariosService.removerUsuario(id);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const resetForm = () => {
    setEditingUser(null);
    setFormData({ email: "", senha: "" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Usuários</h2>
          <p className="text-gray-600">Gerencie os usuários do sistema</p>
        </div>

        {/* Botão para abrir o formulário em modo criação */}
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Plus className="h-5 w-5" />
          <span>Novo Usuário</span>
        </button>
      </div>

      {/* Modal de formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              {editingUser ? (
                <>
                  <Edit className="h-5 w-5 text-blue-600" /> Editar Usuário
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 text-green-600" /> Novo Usuário
                </>
              )}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  required
                  type="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <input
                  required
                  type="password"
                  placeholder="Senha"
                  value={formData.senha}
                  onChange={(e) =>
                    setFormData({ ...formData, senha: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  {editingUser ? "Salvar Alterações" : "Criar Usuário"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usuarios.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl shadow-sm border hover:shadow-md transition p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingUser(user);
                    setFormData({ email: user.email, senha: user.senha });
                    setShowForm(true);
                  }}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Edit className="h-4 w-4 text-blue-600" />
                </button>

                <button
                  onClick={() => handleDelete(user.id)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-semibold">{user.email}</h3>
            <p className="text-sm text-gray-600">ID: {user.id}</p>
          </div>
        ))}
      </div>

      {usuarios.length === 0 && (
        <div className="text-center py-12">
          <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Nenhum usuário encontrado</h3>
        </div>
      )}
    </div>
  );
};

export default UsersManager;
