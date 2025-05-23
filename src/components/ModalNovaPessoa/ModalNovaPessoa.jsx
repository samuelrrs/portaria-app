"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { salvarPessoa } from "@/utils/pessoaStorage";

export function ModalNovaPessoa({ onPessoaCadastrada }) {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipo, setTipo] = useState("");

  const tiposPessoa = ["VISITANTE", "PRESTADOR", "ENTREGADOR"];

  const handleSalvar = () => {
    if (!nome || !documento || !tipo) {
      alert("Preencha os campos obrigatórios.");
      return;
    }

    const novaPessoa = {
      id: Date.now().toString(),
      nome,
      documento,
      telefone,
      tipo,
    };
    salvarPessoa(novaPessoa);
    onPessoaCadastrada(novaPessoa);
    setOpen(false);
    setNome("");
    setDocumento("");
    setTelefone("");
    setTipo("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary-light/20"
        >
          + Nova Pessoa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-background-panel">
        <DialogHeader>
          <DialogTitle className="text-primary text-lg">
            Cadastrar Nova Pessoa
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-1">
            <Label>Nome*</Label>
            <Input value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="grid gap-1">
            <Label>Documento*</Label>
            <Input
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label>Telefone</Label>
            <Input
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label>Tipo*</Label>
            <Select onValueChange={setTipo}>
              <SelectTrigger className="bg-background-soft border-primary-light">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {tiposPessoa.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button
            onClick={handleSalvar}
            className="bg-primary hover:bg-primary-dark text-white"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
