// Engine de Reglas de Vuelo, Altitudes Semicirculares y MEA (SENEAM / ICAO)
const RULES_ENGINE = {
  // Regla Semicircular de Altitudes según rumbo magnético
  validateAltitude: function(course, altitude, rules) {
    const alt = parseInt(altitude);
    const isEast = (course >= 0 && course <= 179);
    const thousands = Math.floor(alt / 1000);
    const remainder = alt % 1000;

    let isValid = false;
    let text = "";

    if (rules === 'IFR') {
      // IFR: Este = Impares de miles (3000, 5000) / Oeste = Pares de miles (4000, 6000)
      if (isEast) {
        isValid = (thousands % 2 !== 0 && remainder === 0);
        text = isValid ? "Altitud IFR Este Correcta" : `Sugerida IFR Este: ${(thousands % 2 === 0 ? thousands + 1 : thousands) * 1000} FT`;
      } else {
        isValid = (thousands % 2 === 0 && remainder === 0);
        text = isValid ? "Altitud IFR Oeste Correcta" : `Sugerida IFR Oeste: ${(thousands % 2 !== 0 ? thousands + 1 : thousands) * 1000} FT`;
      }
    } else {
      // VFR: Este = Impares + 500 (3500, 5500) / Oeste = Pares + 500 (4500, 6500)
      if (isEast) {
        isValid = (thousands % 2 !== 0 && remainder === 500);
        text = isValid ? "Altitud VFR Este Correcta" : `Sugerida VFR Este: ${(thousands % 2 === 0 ? thousands + 1 : thousands) * 1000 + 500} FT`;
      } else {
        isValid = (thousands % 2 === 0 && remainder === 500);
        text = isValid ? "Altitud VFR Oeste Correcta" : `Sugerida VFR Oeste: ${(thousands % 2 !== 0 ? thousands + 1 : thousands) * 1000 + 500} FT`;
      }
    }

    return { isValid, text, direction: isEast ? 'ESTE (000°-179°)' : 'OESTE (180°-359°)' };
  },

  // Reservas de combustible obligatorias según normativa
  getReserveMinutes: function(rules, isNight = false) {
    if (rules === 'IFR') return 45;
    return isNight ? 45 : 30;
  },

  // Diccionario de Aerovías Inferiores de México y sus MEA
  getRouteMEA: function(orig, dest) {
    const routeKey = `${orig.toUpperCase()}-${dest.toUpperCase()}`;
    const reverseKey = `${dest.toUpperCase()}-${orig.toUpperCase()}`;

    const airwayDB = {
      "MMRX-MMMA": { airway: "V2-10 (REX-MAM)", mea: 3000 },
      "MMRX-MMAN": { airway: "V2/V10 (REX-ADN)", mea: 4000 },
      "MMAN-MMTM": { airway: "V14 (ADN-TAM)", mea: 5000 },
      "MMMY-MMMX": { airway: "V1 (MTY-MEX)", mea: 11000 }
    };

    if (airwayDB[routeKey]) return airwayDB[routeKey];
    if (airwayDB[reverseKey]) return airwayDB[reverseKey];

    return { airway: "Ruta Directa / GPS", mea: 3000 };
  }
};