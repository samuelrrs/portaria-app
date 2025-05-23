const STORAGE_KEY = "pessoas_cadastradas";

export function salvarPessoa(pessoa) {
  const pessoas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  pessoas.push(pessoa);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pessoas));
}

export function obterPessoas() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function buscarPessoasPorNomeOuDocumento(valor) {
  const pessoas = obterPessoas();
  const termo = valor.toLowerCase();
  return pessoas.filter(
    (p) =>
      p.nome?.toLowerCase().includes(termo) ||
      p.documento?.toLowerCase().includes(termo)
  );
}
