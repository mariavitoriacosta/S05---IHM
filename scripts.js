function reservarArmario() {
    // Obter o tipo selecionado no HTML.
    let tipoSelecionado = document.getElementById("tipoArmario").value;

    // Filtrar os armários disponíveis que correspondam ao tipo selecionado e às condições de acessibilidade.
    let armariosDisponiveis = armarios.filter(a =>
        a.formato === tipoSelecionado &&
        a.status === true &&
        usuario.acessibilidade === a.acessivel
    );

    // Se não houver armários disponíveis, exibe uma mensagem e encerra a função.
    if (armariosDisponiveis.length === 0) {
        document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
        return;
    }

    // Sorteia um armário disponível.
    let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];

    // Registrar a data e hora da reserva.
    let dataReserva = new Date();
    armarioSorteado.dataReserva = dataReserva;

    // Calcular a data e hora para entrega das chaves (24 horas após a reserva).
    let dataEntrega = new Date(dataReserva.getTime() + (24 * 60 * 60 * 1000));
    armarioSorteado.dataEntrega = dataEntrega;

    // Atualiza o status do armário para reservado.
    armarios.find(armario => armario.id === armarioSorteado.id).status = false;

    // Atualiza a pendência do usuário.
    usuario.pendencia = true;

    // Exibe a mensagem de sucesso, incluindo a data e hora para entrega das chaves.
    document.getElementById("resultado").innerText =
        `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso!\n` +
        `Data da reserva: ${dataReserva.toLocaleString()}\n` +
        `Entrega das chaves: ${dataEntrega.toLocaleString()}`;

    console.log(usuario);
    console.log(armarios);
}
