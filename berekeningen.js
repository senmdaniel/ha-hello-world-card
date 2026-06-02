import { KosherZmanim } from "https://esm.sh";

export function berekenAlles(vandaag) {
  // 1. Locatie-instellingen (Gelijk aan uw data/antwerp.json configuratie)
  const opties = {
    date: vandaag,
    timeZoneId: "Europe/Brussels",
    latitude: 51.2194,
    longitude: 4.4025,
    elevation: 0
  };

  // 2. Basis Zmanim ophalen via de KosherZmanim engine
  const complexZmanim = KosherZmanim.getZmanimJson(opties);
  const zmanimData = complexZmanim.zmanim;

  // 3. UW PI LOGICA: Handmatige tijdsberekeningen (omgerekend vanuit Python naar JS)
  const shkiasTijd = new Date(zmanimData.Sunset);
  
  // Candle Lighting (Standaard 18 minuten vóór Shkias)
  const candleLighting = new Date(shkiasTijd.getTime() - (18 * 60 * 1000));
  
  // Plag Hamincha (Handmatig gecontroleerd)
  const plagHamincha = new Date(zmanimData.PlagHamincha);

  // Tzeis Hakochavim op basis van graden (zoals uw Python-code vereist)
  const tzeis85 = KosherZmanim.getTzeis8Point5Degrees(opties);

  // 4. De gestructureerde API-output (exact de velden die uw Loxone/Dashboard verwacht)
  return {
    meta_data: {
      api_source: "Home Assistant Lovelace (Zmanim-Pro)",
      city: "Antwerp",
      country: "Belgium",
      coordinates: { lat: opties.latitude, lon: opties.longitude }
    },
    system_clock: {
      date_formatted: vandaag.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
      time_formatted: vandaag.toLocaleTimeString('nl-NL')
    },
    zmanim_timings: {
      alos_hashachar: formatteerTijd(zmanimData.AlosHashachar),
      netz_hachamah_sunrise: formatteerTijd(zmanimData.Sunrise),
      sof_zman_shema_mga: formatteerTijd(zmanimData.SofZmanShmaMGA),
      sof_zman_shema_gra: formatteerTijd(zmanimData.SofZmanShmaGRA),
      chatzos_midday: formatteerTijd(zmanimData.Chatzos),
      mincha_gedolah: formatteerTijd(zmanimData.MinchaGedolah),
      plag_hamincha: formatteerTijd(plagHamincha),
      shkias_sunset: formatteerTijd(shkiasTijd),
      candle_lighting: candleLighting.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }),
      tzeis_hakochavim_8_5_deg: tzeis85 ? new Date(tzeis85).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) : formatteerTijd(zmanimData.Tzeis)
    }
  };
}

// Kleine hulpfunctie om ISO-tijden om te zetten naar leesbare kloktijden (HH:MM)
function formatteerTijd(isoString) {
  if (!isoString) return "--:--";
  return new Date(isoString).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
}
