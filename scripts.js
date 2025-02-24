// objeto do usu�rio
const usuario = { nome: "Raphael", matricula: "123456", pendencia: false, acessibilidade: true };

// lista objetos de arm�rios
const armarios = [
    { id: 1, formato: "padrao", status: true, acessivel: false },
    { id: 2, formato: "padrao", status: true, acessivel: false },
    { id: 3, formato: "padrao", status: true, acessivel: false },
    { id: 4, formato: "padrao", status: false, acessivel: true },
    { id: 5, formato: "padrao", status: false, acessivel: true },
    { id: 6, formato: "duplo", status: true, acessivel: true },
    { id: 7, formato: "duplo", status: false, acessivel: true },
    { id: 8, formato: "duplo", status: false, acessivel: true },
];

// fun��o para reserva do arm�rio, incluindo as regras.
function reservarArmario() {

    // obter tipo de arm�rio selecionado pelo usu�rio no html.
    let tipoSelecionado = document.getElementById("tipoArmario").value;

    // na lista, filtrar apenas os arm�rios que est�o dispon�veis e que s�o acessiveis ao usu�rio.
    let armariosDisponiveis = armarios.filter(a =>
        a.formato === tipoSelecionado &&
        a.status === true &&
        usuario.acessibilidade === a.acessivel
    );

    // caso n�o exista arm�rio dispon�vel, retorna para o usu�rio mensagem.
    if (armariosDisponiveis.length === 0) {
        document.getElementById("resultado").innerHTML = `Ol�, ${usuario.nome}! Nenhum arm�rio dispon�vel para o tipo selecionado.`;
        return;
    }

    // Caso exista arm�rio(s) dispon�veil, seguimos sorteando uma op��o. 
    let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];

    // ============= Funcionalidades Adicionadas =============
    // Registrar data/hora da reserva.
    let dataReserva = new Date();
    armarioSorteado.dataReserva = dataReserva;

    // Calcular a data/hora para entrega das chaves (24h depois).
    let dataEntrega = new Date(dataReserva.getTime() + (24 * 60 * 60 * 1000));
    armarioSorteado.dataEntrega = dataEntrega;
    // =======================================================

    // Depois localizamos o arm�rio emprestado na lista de armarios e mudamos o status do arm�rio.
    armarios.find(armario => armario.id === armarioSorteado.id).status = false;

    // Finalmente, mudamos a pendencia do usu�rio para verdadeira.
    usuario.pendencia = true;

    // Imprimimos uma mensagem de reserva para o usu�rio, incluindo as datas.
    document.getElementById("resultado").innerHTML =
        `Ol�, ${usuario.nome}! O arm�rio ${armarioSorteado.id} foi reservado com sucesso!<br>` +
        `Data da reserva: ${dataReserva.toLocaleString()}<br>` +
        `Entrega das chaves: ${dataEntrega.toLocaleString()}`;

    console.log(usuario);
    console.log(armarios);
}
