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
      
        // Adiciona o link de estilo ao fragmento
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './styles_componente.css';
        fragment.appendChild(link);
      
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
      
        // Agora sim: adiciona tudo no shadowRoot de uma vez
        this.shadowRoot.appendChild(fragment);
      }
    }      
  
  customElements.define('aulas-component', AulasComponent);  
