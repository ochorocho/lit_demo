import {LitElement, html} from 'lit';

export class Typo3Surfcamp extends LitElement {
    static properties = {
        year: {type: Number, attribute: 'year'},
    };

    constructor() {
        super();
        this.year = 0;
    }

    render() {
        return html`<div>TYPO3 SurfCamp ${this.year}`;
    }
}

customElements.define('typo3-surfcamp', Typo3Surfcamp);
