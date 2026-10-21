// Base de Datos NavData - Radioayudas (VOR/DME) y Aeropuertos de México
const NAV_DB = {
  // Noreste / Frontera
  "MMRX": { name: "Reynosa / General Lucio Blanco", type: "APT/VOR", vor: "REX", freq: "114.3", lat: 26.0089, lon: -98.2286, elev: 125 },
  "MMMA": { name: "Matamoros / General Servando Canales", type: "APT/VOR", vor: "MAM", freq: "114.1", lat: 25.7699, lon: -97.5252, elev: 26 },
  "MMAN": { name: "Monterrey / Del Norte", type: "APT/VOR", vor: "ADN", freq: "116.9", lat: 25.8656, lon: -100.2373, elev: 1475 },
  "MMMY": { name: "Monterrey / General Mariano Escobedo", type: "APT/VOR", vor: "MTY", freq: "114.7", lat: 25.7785, lon: -100.1069, elev: 1278 },
  "MMTM": { name: "Tampico / General Francisco Javier Mina", type: "APT/VOR", vor: "TAM", freq: "113.5", lat: 22.2964, lon: -97.8659, elev: 80 },
  "MMNL": { name: "Nuevo Laredo / Quetzalcóatl", type: "APT/VOR", vor: "NLD", freq: "113.2", lat: 27.4438, lon: -99.5704, elev: 486 },
  "MMCV": { name: "Ciudad Victoria / General Pedro José Méndez", type: "APT/VOR", vor: "CVM", freq: "115.6", lat: 23.7033, lon: -98.9566, elev: 761 },

  // Centro / Troncales
  "MMMX": { name: "Ciudad de México / AICM", type: "APT/VOR", vor: "MEX", freq: "115.3", lat: 19.4363, lon: -99.0721, elev: 7341 },
  "MMGL": { name: "Guadalajara / Miguel Hidalgo", type: "APT/VOR", vor: "GDL", freq: "115.9", lat: 20.5218, lon: -103.3111, elev: 5016 },
  "MMQT": { name: "Querétaro / Intercontinental", type: "APT/VOR", vor: "QRO", freq: "114.5", lat: 20.6172, lon: -100.1856, elev: 6296 },
  "MMPB": { name: "Puebla / Hermanos Serdán", type: "APT/VOR", vor: "PBC", freq: "116.6", lat: 19.1581, lon: -98.3714, elev: 7364 },

  // Frontera EE. UU. (Conexión Transfronteriza)
  "KMFE": { name: "McAllen Miller Intl", type: "APT/VOR", vor: "MFE", freq: "117.2", lat: 26.1758, lon: -98.2386, elev: 107 },
  "KBRO": { name: "Brownsville / South Padre Island", type: "APT/VOR", vor: "BRO", freq: "116.3", lat: 25.9068, lon: -97.4259, elev: 22 }
};

// Buscador de Radioayuda o Aeropuerto por ICAO / Identificador
function getWaypoint(code) {
  if (!code) return null;
  const key = code.toUpperCase().trim();
  return NAV_DB[key] || null;
}

// Cálculo de Distancia Geodésica Orthodrómica (NM)
function calculateDistanceNM(lat1, lon1, lat2, lon2) {
  const R = 3440.065; // Radio de la Tierra en Millas Náuticas
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return Math.round(R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))));
}

// Cálculo de Rumbo Inicial (Initial Bearing / Course)
function calculateBearing(lat1, lon1, lat2, lon2) {
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x);
  
  return Math.round((θ * 180 / Math.PI + 360) % 360);
}