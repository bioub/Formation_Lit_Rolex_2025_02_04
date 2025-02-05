import '../components/users-filter.js';

import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';

import { di } from '../di';

export class UsersComponent extends LitElement {
  router = di.inject('router');

  static properties = {
    searchTerm: { type: String },
    users: { type: Array },
  };

  constructor() {
    super();
    this.searchTerm = '';
    this.users = [
      { id: 1, name: 'Pierre' },
      { id: 2, name: 'Paul' },
      { id: 3, name: 'Jacques' },
    ];
  }

  handleClick(event) {
    event.preventDefault();
    this.router.push(event.target.pathname);
    this.requestUpdate();
  }

  handleFilterChanged(event) {
    this.filter = event.detail;
  }

  render() {
    return html`
      <div class="left">
        <my-users-filter filter="t"></my-users-filter>
        <nav>
          <!-- <a class="active" href="#"> Toto </a>
          <a href="#"> Titi </a>
          <a href="#"> Tata </a> -->
          ${repeat(
            this.users,
            (user) => user.id,
            (user) =>
              html`<a
                href="#"
                class="${classMap({
                  active: user.id % 2 === 0,
                })}"
                >${user.name}</a
              >`,
          )}
        </nav>
      </div>
      <div class="right"></div>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      gap: 1rem;
    }

    .left a {
      cursor: pointer;
      display: block;
      padding: 0.5rem;
      text-decoration: none;
      color: black;
    }

    .left a.active {
      background-color: var(--my-bg-color, lightblue);
    }
  `;
}

customElements.define('my-users', UsersComponent);
