import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';

import { di } from '../di';

export class SettingsComponent extends LitElement {

  /** @type {import('../services/SettingsStore').SettingsStore} */
  settings = di.inject('settings');

  inputRef = createRef();

  connectedCallback() {
    super.connectedCallback();
    this.settings.addHost(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.settings.updateTitle(this.inputRef.value.value);
  }

  render() {
    return html`
      <h1>Settings</h1>
      <p>Welcome to the Settings page!</p>
      <form @submit=${this.handleSubmit}>
        <div>
          <label for="title">App title:</label>
          <input ${ref(this.inputRef)} type="text" id="title" name="title" value=${this.settings.state.title} />
        </div>
        <button type="submit">Submit</button>
      </form>
    `;
  }
}

customElements.define('my-settings', SettingsComponent);
