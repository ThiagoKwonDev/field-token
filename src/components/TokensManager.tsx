import React, { useState, useEffect } from 'react';
import { Coins, User, DollarSign, Building2 } from 'lucide-react';
import { tokensService } from '../services/api';
import { Token } from '../types';

const TokensManager: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadTokens();
  }, []);

  const loadTokens = async () => {
    try {
      setLoading(true);
      // Dados mock para demonstração
      const mockTokens: Token[] = [
        { id: 'tok_001', ativoId: '1', valorUnitario: 1000, proprietario: 'João Silva' },
        { id: 'tok_002', ativoId: '1', valorUnitario: 1000, proprietario: 'Maria Santos' },
        { id: 'tok_003', ativoId: '1', valorUnitario: 1000, proprietario: 'Pedro Costa' },
        { id: 'tok_004', ativoId: '2', valorUnitario: 500, proprietario: 'Ana Oliveira' },
        { id: 'tok_005', ativoId: '2', valorUnitario: 500, proprietario: 'Carlos Lima' },
        { id: 'tok_006', ativoId: '3', valorUnitario: 2000, proprietario: 'Lucia Pereira' },
        { id: 'tok_007', ativoId: '3', valorUnitario: 2000, proprietario: 'Roberto Alves' },
        { id: 'tok_008', ativoId: '4', valorUnitario: 300, proprietario: 'Fernanda Souza' },
      ];
      setTokens(mockTokens);
    } catch (error) {
      console.error('Erro ao carregar tokens:', error);
    } finally {
      setLoading(false);
    }
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
          <p className="text-gray-600">Visualize todos os tokens criados no sistema</p>
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

      {/* Stats Cards */}
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
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(filteredTokens.reduce((sum, token) => sum + token.valorUnitario, 0))}
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
                {new Set(filteredTokens.map(token => token.proprietario)).size}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <User className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tokens Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTokens.map((token) => (
          <div key={token.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Coins className="h-6 w-6 text-blue-600" />
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                  Ativo
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{token.id}</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {ativosNames[token.ativoId] || `Ativo ${token.ativoId}`}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{token.proprietario}</span>
                </div>

                <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span className="text-xl font-bold text-green-600">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(token.valorUnitario)}
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