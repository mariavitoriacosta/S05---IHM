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

    // =============================
    // Funcionalidades adicionadas:
    // Registrar data/hora da reserva e calcular data/hora para entrega das chaves (24h depois)
    let dataReserva = new Date();
    armarioSorteado.dataReserva = dataReserva;
    let dataEntrega = new Date(dataReserva.getTime() + (24 * 60 * 60 * 1000));
    armarioSorteado.dataEntrega = dataEntrega;
    // =============================

    // Depois localizamos o arm�rio emprestado na lista de armarios e mudamos o status do arm�rio.
    let armarioEmprestado = armarios.find(armario => armario.id === armarioSorteado.id).status = false;

    // Finalmente, mudamos a pendencia do usu�rio para verdadeira.
    usuario.pendencia = true;

    // Impmimimos uma mensagem de reserva para o usu�rio.
    document.getElementById("resultado").innerText = `Ol�, ${usuario.nome}! O arm�rio ${armarioSorteado.id} foi reservado com sucesso!`;

    // Acrescentamos a data da reserva e a data de entrega das chaves na mensagem.
    document.getElementById("resultado").innerText += `\nData da reserva: ${dataReserva.toLocaleString()}\nEntrega das chaves: ${dataEntrega.toLocaleString()}`;

    console.log(usuario);
    console.log(armarios);
}
