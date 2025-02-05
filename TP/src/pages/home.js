import { LitElement, html } from 'lit';

export class HomeComponent extends LitElement {
  render() {
    return html`
     <h1>Home</h1>
<p>Welcome to the home page!</p>
<div>
  <input
    type="text"
    placeholder="Enter your name"
  />
</div>
<p>Hello YOUR_NAME!</p>
    `;
  }
}

customElements.define('my-home', HomeComponent);
