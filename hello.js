// 100% LOKAAL: We laden Lit uit de interne motor van uw eigen Home Assistant
import { LitElement, html } from "/frontend_latest/lit.js";

// We importeren uw calculator uit de tweede file binnen de repository
import { berekenAlles } from "./berekeningen.js";

class HaZmanimProCard extends LitElement {
  static get properties() {
    return { hass: { type: Object } };
  }

  setConfig(config) {}

  render() {
    // Haal de actuele systeemtijd van dit moment op
    const vandaag = new Date();
    
    // Voer de volledige Joodse kalender- en Zmanim-berekeningen uit via de calculator
    const apiOutput = berekenAlles(vandaag);

    // Projecteer de complete JSON-datastructuur direct op uw browserscherm
    return html`
      <pre style="white-space: pre-wrap; font-family: monospace; padding: 10px; background-color: #1c1c1c; color: #00ff00; border-radius: 5px;">
        ${JSON.stringify(apiOutput, null, 2)}
      </pre>
    `;
  }
}

// Registreer de kaart onder de vertrouwde naam voor uw browser-URL
customElements.define('pi-zmanim-card', HaZmanimProCard);
