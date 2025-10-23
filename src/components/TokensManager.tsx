import React, { useState, useEffect } from 'react';
import { Coins, User, DollarSign, Building2, Edit, Trash2, Plus } from 'lucide-react';
import { tokensService } from '../services/api';
import { Token } from '../types';

const TokensManager: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState<Omit<Token, 'id'>>({
    ativoId: '',
    valorUnitario: 0,
    proprietario: '',
  });
  const [editingToken, setEditingToken] = useState<Token | null>(null);

  useEffect(() => {
    loadTokens();
  }, []);

  const loadTokens = async () => {
    try {
      setLoading(true);
      const data = await tokensService.listarTokens();
      setTokens(data);
    } catch (error) {
      console.error('Erro ao carregar tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingToken) {
        await tokensService.atualizarToken(editingToken.id, form);
      } else {
        await tokensService.criarToken(form);
      }
      await loadTokens();
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar token:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Deseja realmente excluir este token?')) return;
    try {
      await tokensService.excluirToken(id);
      setTokens(tokens.filter(t => t.id !== id));
    } catch (error) {
      console.error('Erro ao excluir token:', error);
    }
  };

  const handleEdit = (token: Token) => {
    setEditingToken(token);
    setForm({
      ativoId: token.ativoId,
      valorUnitario: token.valorUnitario,
      proprietario: token.proprietario,
    });
  };

  const resetForm = () => {
    setForm({ ativoId: '', valorUnitario: 0, proprietario: '' });
    setEditingToken(null);
  };

  const filteredTokens = tokens.filter(token => {
    if (filter === 'all') return true;
    return token.ativoId === filter;
  });

  const ativosNames: { [key: string]: string } = {
    '1': 'Fazenda Primavera',
    '2': 'Sítio Bela Vista',
    '3': 'Fazenda São João',
    '4': 'Chácara Paraíso',
  };

  const uniqueAtivos = Array.from(new Set(tokens.map(token => token.ativoId)));

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
          <h2 className="text-2xl font-bold text-gray-900">Tokens Gerados</h2>
          <p className="text-gray-600">Gerencie todos os tokens do sistema (CRUD completo)</p>
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Filtrar por ativo:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">Todos os ativos</option>
            {uniqueAtivos.map(ativoId => (
              <option key={ativoId} value={ativoId}>
                {ativosNames[ativoId] || `Ativo ${ativoId}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Formulário de criação/edição */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          {editingToken ? <Edit className="h-5 w-5 text-blue-600" /> : <Plus className="h-5 w-5 text-green-600" />}
          {editingToken ? 'Editar Token' : 'Cadastrar Novo Token'}
        </h3>
        <form onSubmit={handleCreateOrUpdate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            required
            placeholder="ID do Ativo"
            value={form.ativoId}
            onChange={(e) => setForm({ ...form, ativoId: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            required
            type="number"
            placeholder="Valor Unitário (R$)"
            value={form.valorUnitario}
            onChange={(e) => setForm({ ...form, valorUnitario: Number(e.target.value) })}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            required
            placeholder="Proprietário"
            value={form.proprietario}
            onChange={(e) => setForm({ ...form, proprietario: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <div className="col-span-full flex gap-3 mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              {editingToken ? 'Salvar Alterações' : 'Criar Token'}
            </button>
            {editingToken && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Tokens</p>
              <p className="text-2xl font-bold text-gray-900">{filteredTokens.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Coins className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valor Total</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                  .format(filteredTokens.reduce((sum, token) => sum + token.valorUnitario, 0))}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Proprietários Únicos</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(filteredTokens.map(t => t.proprietario)).size}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <User className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de tokens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTokens.map(token => (
          <div key={token.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Coins className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(token)} className="p-1 rounded-full hover:bg-gray-100">
                    <Edit className="h-4 w-4 text-blue-600" />
                  </button>
                  <button onClick={() => handleDelete(token.id)} className="p-1 rounded-full hover:bg-gray-100">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{token.id}</h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{ativosNames[token.ativoId] || `Ativo ${token.ativoId}`}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{token.proprietario}</span>
                </div>

                <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span className="text-xl font-bold text-green-600">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                      .format(token.valorUnitario)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTokens.length === 0 && (
        <div className="text-center py-12">
          <Coins className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum token encontrado</h3>
          <p className="text-gray-600">
            {filter === 'all'
              ? 'Não há tokens cadastrados no sistema ainda.'
              : 'Não há tokens para o ativo selecionado.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default TokensManager;
