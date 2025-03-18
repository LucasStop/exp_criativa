class Footer extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    try {
      // Carregar o HTML do arquivo separado
      const response = await fetch('/components/Footer.html');
      if (!response.ok) {
        throw new Error(`Erro ao carregar o template do Footer: ${response.status}`);
      }
      
      const html = await response.text();
      this.innerHTML = html;
      
      // Configurar o ano atual no copyright
      const yearSpan = this.querySelector('#current-year');
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }
    } catch (error) {
      console.error('Não foi possível carregar o componente Footer:', error);
      this.innerHTML = '<p>Erro ao carregar o componente Footer</p>';
    }
  }
}

customElements.define('footer-component', Footer);
