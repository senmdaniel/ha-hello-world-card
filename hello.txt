import { LitElement, html } from "https://unpkg.com";

class PiZmanimCard extends LitElement {
  static get properties() {
    return { _data: { type: Object } };
  }
  constructor() {
    super();
    this._data = null;
    this.haalPiDataOp();
  }
  haalPiDataOp() {
    fetch('http://192.168.178')
      .then(res => res.json())
      .then(json => { this._data = json; })
      .catch(err => console.error("Fout:", err));
  }
  setConfig(config) {}
  render() {
    if (!this._data) return html`<pre>Laden...</pre>`;
    return html`<pre>${JSON.stringify(this._data, null, 2)}</pre>`;
  }
}
customElements.define('pi-zmanim-card', PiZmanimCard);
