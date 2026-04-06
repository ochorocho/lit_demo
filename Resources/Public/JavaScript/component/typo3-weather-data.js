import {LitElement, html} from 'lit';
import AjaxRequest from '@typo3/core/ajax/ajax-request.js';
import Notification from '@typo3/backend/notification.js';
import { Chart, Colors } from 'chart.js';
import '@typo3/dashboard/chart-initializer.js';

export class WeatherData extends LitElement {
    static properties = {
        data: {type: Object},
    };

    constructor() {
        super();
        this.data = {};
    }

    get canvas() {
        return this.shadowRoot.querySelector('#chart');
    }

    async firstUpdated() {
        super.firstUpdated();
        this.data = await this.fetchData();

        Chart.register(Colors);
        this.chart = new Chart(this.canvas, {
            type: 'line',
            data: {
                labels: this.data.hourly.time || [],
                datasets: [{
                    label: this.data.hourly_units.temperature_2m,
                    data: this.data.hourly.temperature_2m || []
                }],
            },
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.chart?.destroy();
    }

    render() {
        return html`<div>
            <h3>Location Details</h3>
            <div>Elevation: ${this.data?.elevation}m</div>
            <div>Coordinates: Lat ${this.data?.latitude}, Lng ${this.data?.longitude}</div>
            <div>Timezone: ${this.data?.timezone}</div>
            <h3>Temperature forecast</h3>
            <div>
                ...from
                ${this.getDate(this.data.hourly?.time.at(0))} to
                ${this.getDate(this.data.hourly?.time.at(-1))}
            </div>
            <canvas id="chart"></canvas>
        </div>`;
    }

    getDate(dateTime) {
        if (!dateTime) {
            return '';
        }

        return new Date(dateTime).toLocaleString();
    }

    async fetchData() {
        const url = 'https://api.open-meteo.com/v1/forecast';
        const request = await (new AjaxRequest(url));
        request.withQueryArguments('latitude=28.33&longitude=-14.01&hourly=temperature_2m');

        return await request.get().then(async (response) => {
                return response.resolve();
            }, async function (error) {
                let errorData = await error.resolve();
                Notification.error('Error', errorData.reason);
            }
        );
    }
}

customElements.define('typo3-weather-data', WeatherData);
