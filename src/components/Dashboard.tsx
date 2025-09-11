import React, { useState, useEffect } from 'react';
import { Building2, Coins, TrendingUp, DollarSign } from 'lucide-react';
import { ativosService, tokensService } from '../services/api';
import { Ativo, Token } from '../types';

const Dashboard: React.FC = () => {
  const [ativos, setAtivos] = useState<Ativo[]>([]);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Para demonstração, usaremos dados mock já que a API sandbox pode não estar disponível
        const mockAtivos: Ativo[] = [
          { id: '1', nome: 'Fazenda Primavera', tipo: 'Imóvel Rural', valor: 1000000 },
          { id: '2', nome: 'Sítio Bela Vista', tipo: 'Imóvel Rural', valor: 500000 },
          { id: '3', nome: 'Fazenda São João', tipo: 'Imóvel Rural', valor: 2000000 },
        ];
        
        const mockTokens: Token[] = [
          { id: 'tok_001', ativoId: '1', valorUnitario: 1000, proprietario: 'user_001' },
          { id: 'tok_002', ativoId: '1', valorUnitario: 1000, proprietario: 'user_002' },
          { id: 'tok_003', ativoId: '2', valorUnitario: 500, proprietario: 'user_003' },
        ];

        setAtivos(mockAtivos);
        setTokens(mockTokens);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const valorTotalAtivos = ativos.reduce((total, ativo) => total + ativo.valor, 0);
  const valorTotalTokens = tokens.reduce((total, token) => total + token.valorUnitario, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Ativos</p>
              <p className="text-2xl font-bold text-gray-900">{ativos.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Building2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tokens Gerados</p>
              <p className="text-2xl font-bold text-gray-900">{tokens.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Coins className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valor dos Ativos</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(valorTotalAtivos)}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valor dos Tokens</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(valorTotalTokens)}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ativos Recentes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Ativos Recentes</h3>
          </div>
          <div className="p-6 space-y-4">
            {ativos.slice(0, 3).map((ativo) => (
              <div key={ativo.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{ativo.nome}</p>
                  <p className="text-sm text-gray-600">{ativo.tipo}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(ativo.valor)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tokens Recentes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Tokens Recentes</h3>
          </div>
          <div className="p-6 space-y-4">
            {tokens.slice(0, 3).map((token) => (
              <div key={token.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{token.id}</p>
                  <p className="text-sm text-gray-600">Proprietário: {token.proprietario}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(token.valorUnitario)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;