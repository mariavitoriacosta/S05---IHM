class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.hoje = "ter";
  }

  connectedCallback() {
    this.loadData();
  }

  async loadData() {
    try {
      const response = await fetch('aulas.json');
      const aulas = await response.json();
      this.render(aulas);
    } catch (error) {
      console.error('Erro ao carregar os dados das aulas:', error);
    }
  }

  render(aulas) {
    const aulasDia = aulas.filter(a => a.data === this.hoje);

    // Limpa o shadowRoot corretamente
    this.shadowRoot.innerHTML = '';

    // Cria um fragmento de documento
    const fragment = document.createDocumentFragment();

    // Adiciona estilo que responde a variáveis globais (tema)
    const style = document.createElement('style');
    style.textContent = `
      :host {
        --card-background: var(--card-color);
        --text-color: var(--card-text-color);
        --frequencia: var(--icon-box-color);
        --nota: var(--icon-box-color);
        --prova: var(--icon-box-color);  
        --lable_note: var(--icon-logo-color);
        --cor-texto-nota: var(--icon-logo-color);
      }

      .comp-aula {
        background-color: var(--card-background);
        color: var(--text-color);
        border-radius: 20px;
        padding: 16px;
        margin: 16px 0;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
      }

      .titulo_aula {
        font-weight: bold;
        font-size: 16px;
        margin: 8px 0;
      }

      .p {
        font-size: 14px;
      }

      .lables {
        display: flex;
        gap: 12px;
        margin-top: 8px;
        color: var(--text-color);
      }

      .p_lable {
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        background: var(--frequencia);
        color: var(--lable-note);
      }

      .lable-prova {
        background-color: var(--prova);
        color: var(--lable-note);
        display: inline-block;
        margin-bottom: 8px;
      }

      .lable-nota {
        color: var(--cor-texto-nota);
      }

    `;
    fragment.appendChild(style);

    // Cria container para as aulas
    const container = document.createElement('div');

    aulasDia.forEach(a => {
      const card = document.createElement('div');
      card.classList.add('comp-aula');

      let corNota = '';
      if (parseFloat(a.nota) < 5) {
        corNota = 'red';
      } else if (parseFloat(a.nota) >= 5 && parseFloat(a.nota) < 8) {
        corNota = 'orange';
      } else {
        corNota = 'green';
      }

      card.innerHTML = `
        <div class="lable-prova p_lable" style="${a.prova_alert ? '' : 'display: none;'}">
          PROVA: <b>${a.prova}</b>
        </div>
        <div class="titulo_aula">${a.disciplina}</div>
        <p class="p">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
        <div class="lables">
          <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
          <div class="lable-nota p_lable" style="background-color: ${corNota};">CR: <b>${a.nota}</b></div>
        </div>
      `;

      container.appendChild(card);
    });

    fragment.appendChild(container);

    // Adiciona tudo ao shadowRoot
    this.shadowRoot.appendChild(fragment);
  }
}

customElements.define('aulas-component', AulasComponent);
