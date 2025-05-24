"use client";

import { ModalNovaPessoa } from "@/components/ModalNovaPessoa/ModalNovaPessoa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { salvarEntrada } from "@/utils/entryStorage";
import { buscarPessoasPorNomeOuDocumento } from "@/utils/pessoaStorage";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Link from "next/link";

export default function EntryPage() {
  const [pessoa, setPessoa] = useState(null);
  const [casaId, setCasaId] = useState("");
  const [motivo, setMotivo] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const router = useRouter();

  const mockCasas = ["101", "102", "103"];
  const mockMotivos = ["Visita", "Entrega", "Manutenção"];

  const handleBuscarPessoa = (value) => {
    const lista = buscarPessoasPorNomeOuDocumento(value);
    setSugestoes(lista);
  };
  const handleRegistrar = () => {
    if (!pessoa || !casaId || !motivo) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const registro = {
      id: Date.now().toString(),
      pessoa,
      casaId,
      motivo,
      observacoes,
      tipo: "ENTRADA",
      dataHora: new Date().toISOString(),
      dataSaida: null, // <--- adicionado
    };

    salvarEntrada(registro);
    alert("Entrada registrada com sucesso!");
    router.push("/entries"); // redireciona para a listagem
  };

  return (
    <main className="min-h-screen bg-transparent py-10 ">
      <div className="max-w-2xl mx-auto bg-background-panel shadow-xl rounded-2xl p-6 md:p-10 space-y-6">
        <div className="flex items-center flex-col md:flex-row justify-between mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            📥 Registro de Entrada
          </h1>
          <Link href="/entries">
            <button className="text-sm text-primary hover:underline font-medium">
              📄 Ver registros
            </button>
          </Link>
        </div>

        {/* BUSCAR + CADASTRAR */}
        <div className="space-y-2">
          <Label className="text-text-base">Buscar Pessoa</Label>
          <div className="flex flex-col md:flex-row md:items-end gap-2 w-full relative">
            {/* Input ocupa toda a largura sempre */}
            <div className="w-full md:flex-1">
              <Input
                placeholder="Digite nome ou documento"
                onChange={(e) => handleBuscarPessoa(e.target.value)}
                className="w-full bg-background-soft border border-primary-light focus:ring-2 focus:ring-primary"
              />
              {sugestoes.length > 0 && (
                <div className="absolute z-10 top-full left-0 w-full bg-white border border-gray-200 rounded shadow-md mt-1 max-h-60 overflow-y-auto">
                  {sugestoes.map((pessoa, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setPessoa(pessoa);
                        setSugestoes([]);
                      }}
                      className="cursor-pointer px-3 py-2 hover:bg-gray-100 text-sm text-text-base"
                    >
                      {pessoa.nome} — {pessoa.documento}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Botão ocupa 100% no mobile, shrinka no desktop */}
            <div className="w-full md:w-auto">
              <ModalNovaPessoa onPessoaCadastrada={(nova) => setPessoa(nova)} />
            </div>
          </div>
        </div>

        {/* DADOS DA PESSOA */}
        {pessoa && (
          <div className="bg-primary-light/10 border border-primary-light p-4 rounded-lg space-y-1">
            <p className="text-text-base">
              <strong>Nome:</strong> {pessoa.nome}
            </p>
            <p className="text-text-base">
              <strong>Documento:</strong> {pessoa.documento}
            </p>
            <p className="text-text-base">
              <strong>Tipo:</strong> {pessoa.tipo}
            </p>
          </div>
        )}

        {/* CASA */}
        <div className="space-y-2">
          <Label className="text-text-base">Casa de Destino</Label>
          <Select onValueChange={setCasaId}>
            <SelectTrigger className="bg-background-soft border border-primary-light">
              <SelectValue placeholder="Selecione uma casa" />
            </SelectTrigger>
            <SelectContent>
              {mockCasas.map((casa) => (
                <SelectItem key={casa} value={casa}>
                  Casa {casa}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* MOTIVO */}
        <div className="space-y-2">
          <Label className="text-text-base">Motivo da Entrada</Label>
          <Select onValueChange={setMotivo}>
            <SelectTrigger className="bg-background-soft border border-primary-light">
              <SelectValue placeholder="Selecione o motivo" />
            </SelectTrigger>
            <SelectContent>
              {mockMotivos.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* OBSERVAÇÕES */}
        <div className="space-y-2">
          <Label className="text-text-base">Observações</Label>
          <Textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            placeholder="Ex: Encomenda da Shopee"
            className="bg-background-soft border border-primary-light"
          />
        </div>

        {/* BOTÃO FINAL */}
        <Button
          onClick={handleRegistrar}
          className="w-full bg-primary hover:bg-primary-dark"
        >
          Registrar Entrada
        </Button>
      </div>
    </main>
  );
}
