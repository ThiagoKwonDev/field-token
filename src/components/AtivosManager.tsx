import React, { useState, useEffect } from 'react';
import { Plus, Building2, Coins, DollarSign } from 'lucide-react';
import { ativosService } from '../services/api';
import { Ativo, AtivoInput, TokenizacaoInput } from '../types';

const AtivosManager: React.FC = () => {
  const [ativos, setAtivos] = useState<Ativo[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showTokenizeModal, setShowTokenizeModal] = useState(false);
  const [selectedAtivo, setSelectedAtivo] = useState<Ativo | null>(null);
  const [loading, setLoading] = useState(true);

  const [novoAtivo, setNovoAtivo] = useState<AtivoInput>({
    nome: '',
    tipo: '',
    valor: 0
  });

  const [tokenizacao, setTokenizacao] = useState<TokenizacaoInput>({
    quantidadeTokens: 0
  });

  useEffect(() => {
    loadAtivos();
  }, []);

  const loadAtivos = async () => {
    try {
      setLoading(true);
      // Dados mock para demonstração
      const mockAtivos: Ativo[] = [
        { id: '1', nome: 'Fazenda Primavera', tipo: 'Imóvel Rural', valor: 1000000 },
        { id: '2', nome: 'Sítio Bela Vista', tipo: 'Imóvel Rural', valor: 500000 },
        { id: '3', nome: 'Fazenda São João', tipo: 'Imóvel Rural', valor: 2000000 },
        { id: '4', nome: 'Chácara Paraíso', tipo: 'Imóvel Rural', valor: 300000 },
      ];
      setAtivos(mockAtivos);
    } catch (error) {
      console.error('Erro ao carregar ativos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simular criação de ativo
      const newAtivo: Ativo = {
        id: Date.now().toString(),
        ...novoAtivo
      };
      setAtivos([...ativos, newAtivo]);
      setNovoAtivo({ nome: '', tipo: '', valor: 0 });
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao criar ativo:', error);
    }
  };

  const handleTokenize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAtivo) return;

    try {
      // Simular tokenização
      alert(`Ativo "${selectedAtivo.nome}" tokenizado com ${tokenizacao.quantidadeTokens} tokens!`);
      setShowTokenizeModal(false);
      setTokenizacao({ quantidadeTokens: 0 });
      setSelectedAtivo(null);
    } catch (error) {
      console.error('Erro ao tokenizar ativo:', error);
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
          <p className="text-gray-600">Gerencie seus ativos e crie tokens</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Novo Ativo</span>
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cadastrar Novo Ativo</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  value={novoAtivo.nome}
                  onChange={(e) => setNovoAtivo({ ...novoAtivo, nome: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                <select
                  value={novoAtivo.tipo}
                  onChange={(e) => setNovoAtivo({ ...novoAtivo, tipo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecione o tipo</option>
                  <option value="Imóvel Rural">Imóvel Rural</option>
                  <option value="Fazenda">Fazenda</option>
                  <option value="Sítio">Sítio</option>
                  <option value="Chácara">Chácara</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Valor (R$)</label>
                <input
                  type="number"
                  value={novoAtivo.valor}
                  onChange={(e) => setNovoAtivo({ ...novoAtivo, valor: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Cadastrar
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tokenization Modal */}
      {showTokenizeModal && selectedAtivo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tokenizar Ativo: {selectedAtivo.nome}
            </h3>
            <form onSubmit={handleTokenize} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantidade de Tokens
                </label>
                <input
                  type="number"
                  value={tokenizacao.quantidadeTokens}
                  onChange={(e) => setTokenizacao({ quantidadeTokens: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="1"
                  required
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Valor do ativo:</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(selectedAtivo.valor)}
                </p>
                {tokenizacao.quantidadeTokens > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Valor por token:</p>
                    <p className="text-lg font-semibold text-green-600">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(selectedAtivo.valor / tokenizacao.quantidadeTokens)}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Tokenizar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowTokenizeModal(false);
                    setSelectedAtivo(null);
                    setTokenizacao({ quantidadeTokens: 0 });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
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
          <div key={ativo.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                  {ativo.tipo}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{ativo.nome}</h3>
              
              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-xl font-bold text-gray-900">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(ativo.valor)}
                </span>
              </div>

              <button
                onClick={() => {
                  setSelectedAtivo(ativo);
                  setShowTokenizeModal(true);
                }}
                className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Coins className="h-4 w-4" />
                <span>Tokenizar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AtivosManager;