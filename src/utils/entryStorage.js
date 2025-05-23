const STORAGE_KEY = "registros_entrada";

export function salvarEntrada(entry) {
  const existentes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  existentes.unshift(entry); // adiciona no topo
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existentes));
}

export function obterEntradas() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function atualizarEntrada(id, novaEntrada) {
  const registros = JSON.parse(localStorage.getItem("registros_entrada")) || [];
  const atualizados = registros.map((reg) =>
    reg.id === id ? novaEntrada : reg
  );
  localStorage.setItem("registros_entrada", JSON.stringify(atualizados));
}
