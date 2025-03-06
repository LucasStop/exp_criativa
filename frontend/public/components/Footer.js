class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const year = new Date().getFullYear();
    
    this.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <!-- Coluna 1: Logo e texto -->
            <div class="footer-column footer-branding">
              <img src="/assets/logo_cakeria.png" alt="Cakeria Logo" class="footer-logo-img">
              <p class="footer-tagline">Doces que encantam. Sabores que surpreendem.</p>
              <p class="footer-desc">Confeitaria artesanal especializada em produtos de alta qualidade para todas as ocasiões especiais.</p>
            </div>
            
            <!-- Coluna 2: Navegação -->
            <div class="footer-column footer-nav">
              <h3>Navegação</h3>
              <ul class="footer-links">
                <li><a href="/">Início</a></li>
                <li><a href="/produtos">Produtos</a></li>
                <li><a href="/categorias">Categorias</a></li>
                <li><a href="#">Sobre Nós</a></li>
                <li><a href="#">Contato</a></li>
              </ul>
            </div>
            
            <!-- Coluna 3: Redes sociais -->
            <div class="footer-column footer-social">
              <h3>Siga-nos</h3>
              <div class="social-links">
                <a href="#" class="social-link" title="Instagram">
                  <i class="social-icon">📸</i>
                  <span>Instagram</span>
                </a>
                <a href="#" class="social-link" title="Facebook">
                  <i class="social-icon">👍</i>
                  <span>Facebook</span>
                </a>
                <a href="#" class="social-link" title="WhatsApp">
                  <i class="social-icon">📱</i>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
          
          <div class="footer-bottom">
            <p class="copyright">&copy; ${year} Cakeria. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-component', Footer);
