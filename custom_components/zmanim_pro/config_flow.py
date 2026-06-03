import logging
import voluptuous as vol
from homeassistant import config_entries
from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

class ZmanimProConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Beheert de configuratie-flow voor Zmanim Pro."""
    
    VERSION = 1

    async def async_step_user(self, user_input=None):
        """Eerste stap wanneer een gebruiker de integratie toevoegt via de UI."""
        # Controleer of de integratie niet al een keer is toegevoegd
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        # Als de gebruiker op 'Indienen' klikt in het lege pop-up scherm:
        if user_input is not None:
            return self.async_create_entry(title="Zmanim Pro", data={})

        # Toon een simpel leeg formulier (geen invoervelden nodig, we gebruiken de HA-locatie)
        return self.async_show_form(step_id="user", data_schema=vol.Schema({}))
