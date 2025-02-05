import { LitElement, css, html, nothing } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';

class Select extends LitElement {
  /** @type {import('lit').PropertyDeclarations} */
  static properties = {
    items: { type: Array },
    selected: { type: String },
    _menuOpen: { type: Boolean, state: true },
  };

  constructor() {
    super();
    this.items = ['Toto', 'Titi', 'Tata'];
    this.selected = '';
    this._menuOpen = false;
  }

  selectedRef = createRef();

  // la fonction est fléchée =>, pour que le this soit celui de la déclaration
  // et pas celui de l'appel (dans window.addEventListener)
  closeMenu = (event) => {
    // this._menuOpen = false;
    // console.log('currentTarget', event.currentTarget);
    // console.log('target', event.target);
    // console.log('composedPath()[0]', event.composedPath()[0]);
    if (!(this.selectedRef.value.contains(event.composedPath()[0]))) {
      this._menuOpen = false;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('click', this.closeMenu);
    // Pour régler le problème de fermeture du menu on peut
    // commencer par le fermer plutot que finir par le fermer en changeant
    // la phase (capture ou lieu de bubbling par défaut)
    // window.addEventListener('click', this.closeMenu, { capture: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('click', this.closeMenu);
    // window.removeEventListener('click', this.closeMenu, { capture: true });
  }

  toggleOpen(event) {
    // event.stopPropagation();
    this._menuOpen = !this._menuOpen;
  }

  updateSelected(newItem) {
    this.selected = newItem;
    this._menuOpen = false;
    this.dispatchEvent(new CustomEvent('selected-change', { detail: newItem, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div ${ref(this.selectedRef)} class="selected" @click=${this.toggleOpen}>${this.selected}</div>
      ${this._menuOpen
        ? html`<div class="menu" @click=${(e) => this.updateSelected(e.target.dataset.item)}>
            ${this.items.map((item) => html`<div class="item" data-item=${item}>${item}</div>`)}  
          </div>`
        : nothing}
    `;
  }

  static styles = css`
    .selected {
      border: 1px solid black;
      padding: 0.5em;
    }
    .menu {
      border: 1px solid black;
    }
    .item {
      padding: 0.5em;
    }
  `;
}

customElements.define('my-select', Select);
