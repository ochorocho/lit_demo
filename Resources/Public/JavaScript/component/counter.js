import {LitElement, html, css, nothing} from 'lit';
import {lll} from '@typo3/core/lit-helper.js';

export class Counter extends LitElement {
    static properties = {
        start: {type: Number, attribute: 'start', reflect: true},
        _counter: {state: true},
        _pattern: {state: true},
    };

    // Define component specific CSS
    static styles = css`
        :host {
            --icon-color-primary: red;
        }
    `

    constructor() {
        super();
        this.start = 0;
        this._counter = 0;
        this._pattern = [];
    }

    connectedCallback() {
        super.connectedCallback();
        // Initialize the internal state with the attribute start="X"
        this._counter = this.start;
    }

    // Do something when a particular property changes
    // updated(changedProperties) {
    //     super.updated(changedProperties);
    //     if(changedProperties.has('_counter')) {
    //         this.start = this._counter;
    //     }
    // }

    render() {
        return html`
            <div class="card">
                <div class="card-header">
                    <div class="card-icon">
                        <typo3-backend-icon 
                                identifier="lit-demo-logo" 
                                size="medium"
                                aria-hidden="true">
                        </typo3-backend-icon>
                    </div>
                    <div class="card-header-body">
                        <h2 class="card-title">
                            ${lll('lit-demo.title')}
                        </h2>
                    </div>
                </div>
                <div class="card-body">
                    <p class="card-text">
                        ${lll('lit-demo.counter.label')}: ${this._counter}

                    <div class="marquee">
                        <div class="marquee__item">
                            ${this.vengaBus() ? '🚌🎶... The VengaBus is coming ... 🎶 🚌' : nothing}
                        </div>
                    </div>
                    </p>
                </div>
                <div class="card-footer">
                    <button @click="${this.countUp}" class="btn btn-primary">
                        <typo3-backend-icon 
                                identifier="actions-arrow-up-alt"
                                size="small"
                                aria-hidden="true">
                        </typo3-backend-icon>
                    </button>
                    <button @click="${this.countReset}" class="btn btn-primary">
                        <typo3-backend-icon 
                                identifier="actions-undo"
                                size="small"
                                aria-hidden="true">
                        </typo3-backend-icon> reset
                    </button>
                    <button @click="${this.countDown}" class="btn btn-secondary">
                        <typo3-backend-icon 
                                identifier="actions-arrow-down-alt" 
                                size="small"
                                aria-hidden="true">
                        </typo3-backend-icon>
                    </button>
                </div>
            </div>
        `;
    }

    countUp() {
        this._counter++;
        this._pattern.push(this._counter);
    }

    countReset() {
        this._counter = this.start;
        this._pattern = [];
    }

    countDown() {
        this._counter--;
        this._pattern.push(this._counter);
    }

    vengaBus() {
        let expectedPattern = [1, 0, 1, 0, 1, 0, 1, 0]
        return this._pattern.length === expectedPattern.length && this._pattern.every((val, i) => val === expectedPattern[i]);
    }

    // Disable the shadow-root
    // - if disabled (uncommented), CSS from outside the component will be applied
    // - if enabled (remove the following code), only
    createRenderRoot() {
        return this;
    }
}

customElements.define('ld-counter', Counter);
