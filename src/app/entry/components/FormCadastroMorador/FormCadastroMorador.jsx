import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const FormCadastroMorador = () => {
  return (
    <div className="max-w-2xl min-w-[642px] mx-auto bg-background-panel shadow-xl rounded-2xl p-6 md:p-10 flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <span className="">Dados pessoais</span>

        <Input placeholder="Nome" />
        <div className="flex gap-2">
          <Input placeholder="E-mail" />
          <Input placeholder="Telefone" />
          <Input placeholder="Placa do veiculo" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span>Endereco</span>
        <div className="flex flex-col gap-2 m-0">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Endereco" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Rua B</SelectItem>
              <SelectItem value="dark">Rua A</SelectItem>
              <SelectItem value="system">
                Rua A (prolongamento da Rua A)
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Input placeholder="CEP" />
            <Input placeholder="Numero" />
          </div>
          <div className="flex gap-2">
            <Input placeholder="Cidade" />
            <Input placeholder="UF" />
          </div>
          <div>
            <Textarea placeholder="Observacao" />
          </div>
        </div>
      </div>
      <Button>Salvar</Button>
    </div>
  );
};

export default FormCadastroMorador;
