"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { obterEntradas, atualizarEntrada } from "@/utils/entryStorage";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackgroundWrapper from "@/components/BackgroundWrapper/BackgroundWrapper";

export default function EntriesPage() {
  const [registros, setRegistros] = useState([]);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    setRegistros(obterEntradas());
  }, []);

  const handleRegistrarSaida = (registro) => {
    const atualizado = {
      ...registro,
      dataSaida: new Date().toISOString(),
    };
    atualizarEntrada(registro.id, atualizado);
    setRegistros(obterEntradas());
  };

  const calcularTempo = (entrada, saida) => {
    const inicio = new Date(entrada);
    const fim = new Date(saida);
    const diffMs = fim - inicio;
    const min = Math.floor(diffMs / 60000);

    const dias = Math.floor(min / 1440);
    const horas = Math.floor((min % 1440) / 60);
    const h = Math.floor(min / 60);
    const m = min % 60;

    if (dias >= 1) {
      return `${dias}d ${horas}h ${m}min`;
    }

    return `${h > 0 ? `${h}h ` : ""}${m}min`;
  };

  const registrosFiltrados = registros.filter((r) =>
    filtro === "todos" ? true : r.dataSaida === null
  );

  return (
    <main className="min-h-screen bg-transparent py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Botão Voltar */}
        <div className="flex justify-between items-center mb-4">
          <Link href="/entry">
            <Button variant="outline">← Voltar para registro</Button>
          </Link>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-primary text-center mb-4">
          📄 Registros de Entrada
        </h1>

        {/* Tabs centralizados */}
        <Tabs
          value={filtro}
          onValueChange={setFiltro}
          className="w-full flex justify-center mb-6"
        >
          <TabsList className="bg-muted">
            <TabsTrigger value="todos">Todos ({registros.length})</TabsTrigger>
            <TabsTrigger value="ativos">
              Apenas Ativos ({registros.filter((r) => !r.dataSaida).length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Lista de registros */}
        <div className="space-y-4 flex flex-col items-center">
          {registrosFiltrados.length === 0 ? (
            <p className="text-center text-text-subtle w-fit bg-white p-4 rounded-lg shadow-sm">
              Nenhum registro encontrado.
            </p>
          ) : (
            registrosFiltrados.map((registro) => (
              <div
                key={registro.id}
                className="bg-white border border-primary-light rounded-xl p-4 shadow-sm space-y-1 w-full flex flex-col gap-1"
              >
                <div className="flex justify-between">
                  <p className="text-text-base font-semibold">
                    {registro.pessoa.nome}
                  </p>
                  <span className="text-sm text-text-subtle">
                    {new Date(registro.dataHora).toLocaleString("pt-BR")}
                  </span>
                </div>
                <p className="text-sm text-text-subtle">
                  Documento: {registro.pessoa.documento} — Tipo:{" "}
                  {registro.pessoa.tipo}
                </p>
                <p className="text-sm">
                  Casa destino: <strong>{registro.casaId}</strong>
                </p>

                <div className="flex  gap-2">
                  <p className="text-sm">
                    Veículo: <strong>{registro.pessoa.veiculo}</strong>
                  </p>

                  <p className="text-sm">
                    Placa: <strong>{registro.pessoa.placa}</strong>
                  </p>
                </div>
                <p className="text-sm">Motivo: {registro.motivo}</p>
                {registro.observacoes && (
                  <p className="text-sm italic text-text-subtle">
                    Obs: {registro.observacoes}
                  </p>
                )}

                {registro.dataSaida ? (
                  <div className="text-sm text-green-700 pt-2">
                    Saiu às:{" "}
                    <strong>
                      {new Date(registro.dataSaida).toLocaleTimeString("pt-BR")}
                    </strong>
                    <br />
                    Tempo de permanência:{" "}
                    <strong>
                      {calcularTempo(registro.dataHora, registro.dataSaida)}
                    </strong>
                  </div>
                ) : (
                  <Button
                    onClick={() => handleRegistrarSaida(registro)}
                    className="mt-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 transition-all duration-150"
                  >
                    Registrar Saída
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
