from datetime import timedelta
from homeassistant.helpers.entity import Entity

# Importeer je eigen DateProvider
from .date_provider import DateProvider

# Importeer de sensoren uit de losse bestanden
from .sensors_data import GregorianDateSensor, JewishDateSensor
from .sensors_feestdagen import JewishHolidaySensor

# Update de sensoren elke 30 minutes
SCAN_INTERVAL = timedelta(minutes=30)

async def async_setup_platform(hass, config, async_add_entities, discovery_info=None):
    """Zet alle Zmanim Pro sensoren klaar."""
    provider = DateProvider()
    
    # We voegen de nieuwe JewishHolidaySensor toe aan de actieve lijst
    lijst_van_sensoren = [
        GregorianDateSensor(provider),
        JewishDateSensor(provider),
        JewishHolidaySensor(provider)
    ]
    
    # Geef de hele lijst in één keer aan Home Assistant
    async_add_entities(lijst_van_sensoren, True)
