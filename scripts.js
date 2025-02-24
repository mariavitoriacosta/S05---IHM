function reservarArmario() {

    // obter tipo de armário selecionado pelo usuário no html.
    let tipoSelecionado = document.getElementById("tipoArmario").value;

    // na lista, filtrar apenas os armários que estão disponíveis e que são acessiveis ao usuário.
    let armariosDisponiveis = armarios.filter(a => a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel);

    // caso não exista armário disponível, retorna para o usuário mensagem.
    if (armariosDisponiveis.length === 0) {
        document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
        return;
    }

    // Caso exista armário(s) disponíveil, seguimos sorteando uma opção. 
    let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];

    // =============================
    // Funcionalidades adicionadas:
    // Registrar data/hora da reserva e calcular data/hora para entrega das chaves (24h depois)
    let dataReserva = new Date();
    armarioSorteado.dataReserva = dataReserva;
    let dataEntrega = new Date(dataReserva.getTime() + (24 * 60 * 60 * 1000));
    armarioSorteado.dataEntrega = dataEntrega;
    // =============================

    // Depois localizamos o armário emprestado na lista de armarios e mudamos o status do armário.
    let armarioEmprestado = armarios.find(armario => armario.id === armarioSorteado.id).status = false;

    // Finalmente, mudamos a pendencia do usuário para verdadeira.
    usuario.pendencia = true;

    // Impmimimos uma mensagem de reserva para o usuário.
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso!`;

    // Acrescentamos a data da reserva e a data de entrega das chaves na mensagem.
    document.getElementById("resultado").innerText += `\nData da reserva: ${dataReserva.toLocaleString()}\nEntrega das chaves: ${dataEntrega.toLocaleString()}`;

    console.log(usuario);
    console.log(armarios);
}
