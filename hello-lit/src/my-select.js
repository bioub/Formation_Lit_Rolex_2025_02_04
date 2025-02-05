import { LitElement, css, html, nothing } from 'lit';

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

  toggleOpen() {
    this._menuOpen = !this._menuOpen;
  }

  updateSelected(newItem) {
    this.selected = newItem;
    this._menuOpen = false;
    this.dispatchEvent(new CustomEvent('selected-change', { detail: newItem, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="selected" @click=${this.toggleOpen}>${this.selected}</div>
      ${this._menuOpen
        ? html`<div class="menu">
            ${this.items.map((item) => html`<div class="item" @click=${() => this.updateSelected(item)}>${item}</div>`)}  
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
