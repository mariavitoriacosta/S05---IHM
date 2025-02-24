function reservarArmario() {
    // Obter o tipo selecionado no HTML.
    let tipoSelecionado = document.getElementById("tipoArmario").value;

    // Filtrar os arm�rios dispon�veis que correspondam ao tipo selecionado e �s condi��es de acessibilidade.
    let armariosDisponiveis = armarios.filter(a =>
        a.formato === tipoSelecionado &&
        a.status === true &&
        usuario.acessibilidade === a.acessivel
    );

    // Se n�o houver arm�rios dispon�veis, exibe uma mensagem e encerra a fun��o.
    if (armariosDisponiveis.length === 0) {
        document.getElementById("resultado").innerText = `Ol�, ${usuario.nome}! Nenhum arm�rio dispon�vel para o tipo selecionado.`;
        return;
    }

    // Sorteia um arm�rio dispon�vel.
    let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];

    // Registrar a data e hora da reserva.
    let dataReserva = new Date();
    armarioSorteado.dataReserva = dataReserva;

    // Calcular a data e hora para entrega das chaves (24 horas ap�s a reserva).
    let dataEntrega = new Date(dataReserva.getTime() + (24 * 60 * 60 * 1000));
    armarioSorteado.dataEntrega = dataEntrega;

    // Atualiza o status do arm�rio para reservado.
    armarios.find(armario => armario.id === armarioSorteado.id).status = false;

    // Atualiza a pend�ncia do usu�rio.
    usuario.pendencia = true;

    // Exibe a mensagem de sucesso, incluindo a data e hora para entrega das chaves.
    document.getElementById("resultado").innerText =
        `Ol�, ${usuario.nome}! O arm�rio ${armarioSorteado.id} foi reservado com sucesso!\n` +
        `Data da reserva: ${dataReserva.toLocaleString()}\n` +
        `Entrega das chaves: ${dataEntrega.toLocaleString()}`;

    console.log(usuario);
    console.log(armarios);
}
