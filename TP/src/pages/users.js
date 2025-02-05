import '../components/users-filter.js';

import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';

import { di } from '../di';
import { UsersController } from '../services/UsersController.js';

export class UsersComponent extends LitElement {
  router = di.inject('router');

  usersController = new UsersController(this);

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
    this.searchTerm = event.detail;
  }

  render() {
    return html`
      <div class="left">
        <my-users-filter filter=${this.searchTerm} @filter-change=${this.handleFilterChanged}></my-users-filter>
        <nav>
          <!-- <a class="active" href="#"> Toto </a>
          <a href="#"> Titi </a>
          <a href="#"> Tata </a> -->
          <!-- ${repeat(
            this.usersController.items?.filter((user) => user.name.toLowerCase().includes(this.searchTerm.toLowerCase())),
            (user) => user.id,
            (user) =>
              html`<a
                href="#"
                class="${classMap({
                  active: user.id % 2 === 0,
                })}"
                >${user.name}</a
              >`,
          )} -->
          ${this.usersController.items?.filter((user) => user.name.toLowerCase().includes(this.searchTerm.toLowerCase())).map((user) =>
              html`<a
                href=${`/users/${user.id}`}
                class="${classMap({
                  active: user.id == this.router.resolver.route.parameters.userId,
                })}"
                @click=${this.handleClick}
                >${user.name}</a
              >`,
          )}
        </nav>
      </div>
      <div class="right">
       <rlx-flx-router-view></rlx-flx-router-view>
      </div>
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
