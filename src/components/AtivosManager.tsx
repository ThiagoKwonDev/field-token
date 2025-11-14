import React, { useState, useEffect } from "react";
import { Plus, Building2, DollarSign, Trash2, Edit } from "lucide-react";
import { ativosService } from "../services/api";
import { Ativo, AtivoInput } from "../types";

const AtivosManager: React.FC = () => {
  const [ativos, setAtivos] = useState<Ativo[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAtivo, setSelectedAtivo] = useState<Ativo | null>(null);

  const [formData, setFormData] = useState<AtivoInput>({
    nome: "",
    tipo: "",
    valor: 0,
  });

  // Carrega os ativos ao iniciar
  useEffect(() => {
    loadAtivos();
  }, []);

  const loadAtivos = async () => {
    try {
      setLoading(true);
      const data = await ativosService.listarAtivos();
      setAtivos(data);
    } catch (error) {
      console.error("Erro ao carregar ativos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Criar ou atualizar ativo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing && selectedAtivo) {
        const updated = await ativosService.atualizarAtivo(selectedAtivo.id, formData);
        setAtivos((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      } else {
        // POST retorna void no BFF, então precisamos recarregar a lista
        await ativosService.cadastrarAtivo(formData);
        await loadAtivos();
      }

      resetForm();
    } catch (error) {
      console.error("Erro ao salvar ativo:", error);
    }
  };

  const resetForm = () => {
    setFormData({ nome: "", tipo: "", valor: 0 });
    setSelectedAtivo(null);
    setIsEditing(false);
    setShowForm(false);
  };

  // Remover ativo
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este ativo?")) return;

    try {
      await ativosService.removerAtivo(id);
      setAtivos((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Erro ao remover ativo:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão de Ativos</h2>
          <p className="text-gray-600">Gerencie seus ativos cadastrados</p>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setIsEditing(false);
            setFormData({ nome: "", tipo: "", valor: 0 });
          }}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <Plus className="h-5 w-5" />
          <span>Novo Ativo</span>
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isEditing ? "Editar Ativo" : "Cadastrar Novo Ativo"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nome</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tipo</label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Selecione o tipo</option>
                  <option value="Renda Variável">Renda Variável</option>
                  <option value="Renda Fixa">Renda Fixa</option>
                  <option value="Criptoativo">Criptoativo</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Valor (R$)</label>
                <input
                  type="number"
                  value={formData.valor}
                  min={0}
                  onChange={(e) => setFormData({ ...formData, valor: parseFloat(e.target.value) })}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  {isEditing ? "Salvar Alterações" : "Cadastrar"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ativos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ativos.map((ativo) => (
          <div
            key={ativo.id}
            className="bg-white rounded-xl shadow-sm border hover:shadow-md transition p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                {ativo.tipo}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{ativo.nome}</h3>

            <div className="flex items-center space-x-2 mb-4">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="text-xl font-bold">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(ativo.valor)}
              </span>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setSelectedAtivo(ativo);
                  setFormData({
                    nome: ativo.nome,
                    tipo: ativo.tipo,
                    valor: ativo.valor,
                  });
                  setIsEditing(true);
                  setShowForm(true);
                }}
                className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                <Edit className="h-4 w-4" />
              </button>

              <button
                onClick={() => handleDelete(ativo.id)}
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {ativos.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Nenhum ativo encontrado</h3>
          <p className="text-gray-600">Cadastre um novo ativo para começar.</p>
        </div>
      )}
    </div>
  );
};

export default AtivosManager;
