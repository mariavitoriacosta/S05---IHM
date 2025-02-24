<<<<<<< HEAD
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
    let armariosDisponiveis = armarios.filter(a => a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel);

    // caso n�o exista arm�rio dispon�vel, retorna para o usu�rio mensagem.
    if (armariosDisponiveis.length === 0) {
        document.getElementById("resultado").innerText = `Ol�, ${usuario.nome}! Nenhum arm�rio dispon�vel para o tipo selecionado.`;
        return;
    }

    // Caso exista arm�rio(s) dispon�veil, seguimos sorteando uma op��o. 
    let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];

    // Depois localizamos o arm�rio emprestado na lista de armarios e mudamos o status do arm�rio.
    let armarioEmprestado = armarios.find(armario => armario.id === armarioSorteado.id).status = false;

    // Finalmente, mudamos a pendencia do usu�rio para verdadeira.
    usuario.pendencia = true;

    // Impmimimos uma mensagem de reserva para o usu�rio.
    document.getElementById("resultado").innerText = `Ol�, ${usuario.nome}! O arm�rio ${armarioSorteado.id} foi reservado com sucesso!`;

    console.log(usuario);
    console.log(armarios);

}
=======

>>>>>>> 279118087f15faf3ee174a6c1709e0d17d503b17
