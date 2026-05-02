import { LitElement, html, css } from 'lit';
import { Task } from '@lit/task';

const API = 'https://api.chucknorris.io/jokes';

export class ChuckNorris extends LitElement {
    static properties = {
        _nonce: { state: true },
    };

    constructor() {
        super();
        this._nonce = 0;
        this._jokeTask = new Task(this, {
            task: async ([nonce], { signal }) => {
                const url = `${API}/random`;
                const res = await fetch(url, { signal });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            },
            args: () => [this._nonce],
        });
    }

    refresh() {
        this._nonce++;
    }

    render() {
        return html`
          <button @click=${this.refresh}>New joke</button>
          ${this._jokeTask.render({
                pending: () => html`<p>Loading joke…</p>`,
                error: (e) => html`<p class="error">Failed: ${e.message}</p>`,
                complete: (joke) => html`
                    <div>${joke.value}</div>
                `,
            })}
        `;
    }
}

customElements.define('chuck-norris', ChuckNorris);
