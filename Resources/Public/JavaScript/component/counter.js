import { LitElement, html, css, nothing } from 'lit';
import {lll} from '@typo3/core/lit-helper.js';

export class Counter extends LitElement {
    static properties = {
        counter: { type: Number, attribute: 'start' },
        icon: { type: String, attribute: 'icon' },
        _pattern: { type: Array, state: true },
    };

    static styles = css`
        :host {
            --icon-color-primary: red;
        }

        @keyframes marquee-content {
            from {
                transform: translateX(0%);
            }
            to {
                transform: translateX(+100%);
            }
        }
        
        .marquee {
            display: flex;
            overflow: hidden;
            white-space: nowrap;
        }

        .marquee__item {
            animation-duration: 4s;
            animation-iteration-count: infinite;
            animation-name: marquee-content;
            animation-timing-function: linear;
        }
    `

    constructor() {
        super();
        this.counter = 1;
        this.icon = 'actions-info';
        this._pattern = [];
    }

    render() {
        return html`
            <div>
                <h1>
                    <typo3-backend-icon identifier="lit-demo-logo" size="medium" aria-hidden="true"></typo3-backend-icon>
                    ${lll('lit-demo.title')}
                </h1>
                <div>${lll('lit-demo.counter.label')}: ${this.counter}</div>
                <div>
                    <button @click="${this.countUp}" class="btn btn-primary">
                        <typo3-backend-icon identifier="actions-arrow-up-alt" size="small" aria-hidden="true"></typo3-backend-icon>
                    </button>
                    <button @click="${this.countDown}" class="btn btn-secondary">
                        <typo3-backend-icon identifier="actions-arrow-down-alt" size="small" aria-hidden="true"></typo3-backend-icon>
                    </button>
                    
                    <div class="marquee">
                        <div class="marquee__item">
                            ${this.vengaBus() ? '🚌🎶... The VengaBus is coming ... 🎶 🚌' : nothing}
                        </div>
                    </div>
                    
                </div>
            </div>
        `;
    }

    countUp() {
        this.counter++;
        this._pattern.push(this.counter);
    }

    countDown() {
        this.counter--;
        this._pattern.push(this.counter);
    }

    vengaBus() {
        let expectedPattern = [2,1,2,1,2,1,2,1]
        return this._pattern.length === expectedPattern.length && this._pattern.every((val, i) => val === expectedPattern[i]);
    }

    // Disable the shadow-root
    // - if disabled (uncommented), CSS from outside the component will be applied
    // - if enabled (remove the following code), only specific
    // createRenderRoot() {
    //     return this;
    // }
}

customElements.define('ld-counter', Counter);
