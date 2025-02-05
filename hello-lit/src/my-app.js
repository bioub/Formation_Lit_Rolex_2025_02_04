import './my-select';

import { LitElement, css, html, nothing } from 'lit';

class App extends LitElement {
  /** @type {import('lit').PropertyDeclarations} */
  static properties = {
    name: { type: String, state: true },
    names: { type: Array, state: true },
  };

  constructor() {
    super();
    this.name = 'Tata';
    this.names = ['Toto', 'Titi', 'Tata'];
  }

  updateName(event) {
    this.name = event.detail;
  }

  render() {
    return html`
      <p>Prénom sélectionné : ${this.name}</p>
      <my-select .selected=${this.name} .items=${this.names} @selected-change=${this.updateName}></my-select>
      <my-select .selected=${this.name} .items=${this.names} @selected-change=${this.updateName}></my-select>
    `;
  }
}

customElements.define('my-app', App);
