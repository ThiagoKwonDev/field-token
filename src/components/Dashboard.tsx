import React, { useState, useEffect } from "react";
import { Building2, TrendingUp, DollarSign } from "lucide-react";
import { ativosService } from "../services/api";
import { Ativo } from "../types";

const Dashboard: React.FC = () => {
  const [ativos, setAtivos] = useState<Ativo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
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
    load();
  }, []);

  const valorTotalAtivos = ativos.reduce((sum, ativo) => sum + ativo.valor, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Total de Ativos */}
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
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

        {/* Valor total dos ativos */}
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valor Total dos Ativos</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(valorTotalAtivos)}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Maior Ativo */}
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Maior Ativo</p>
              <p className="text-lg font-bold text-gray-900">
                {ativos.length > 0
                  ? ativos.reduce((a, b) => (a.valor > b.valor ? a : b)).nome
                  : "Nenhum"}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

      </div>

      {/* Lista de ativos recentes */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Ativos Recentes</h3>
        </div>

        <div className="p-6 space-y-4">
          {ativos.slice(0, 5).map((ativo) => (
            <div
              key={ativo.id}
              className="flex items-center justify-between bg-gray-50 rounded-lg p-4"
            >
              <div>
                <p className="font-medium text-gray-900">{ativo.nome}</p>
                <p className="text-sm text-gray-600">{ativo.tipo}</p>
              </div>

              <p className="font-semibold text-gray-900">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(ativo.valor)}
              </p>
            </div>
          ))}

          {ativos.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              Nenhum ativo cadastrado ainda.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
