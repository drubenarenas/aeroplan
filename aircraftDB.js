// Database de Rendimiento de Aeronaves (AeroPlan NavData)
const AIRCRAFT_DB = {
  "C210": {
    name: "Cessna 210 Centurion",
    category: "Single-Engine Piston",
    cruiseTAS: 160,      // Kts
    fuelBurnGPH: 16.5,   // GPH
    serviceCeiling: 17000, // FT
    usableFuelGal: 90,   // Galones totales utilizables
    taxiFuelGal: 2.0
  },
  "C182": {
    name: "Cessna 182 Skylane",
    category: "Single-Engine Piston",
    cruiseTAS: 140,
    fuelBurnGPH: 13.0,
    serviceCeiling: 18100,
    usableFuelGal: 88,
    taxiFuelGal: 1.5
  },
  "C172": {
    name: "Cessna 172 Skyhawk",
    category: "Single-Engine Piston",
    cruiseTAS: 122,
    fuelBurnGPH: 8.5,
    serviceCeiling: 14000,
    usableFuelGal: 53,
    taxiFuelGal: 1.0
  },
  "BE36": {
    name: "Beechcraft Bonanza A36",
    category: "Single-Engine Piston",
    cruiseTAS: 170,
    fuelBurnGPH: 15.5,
    serviceCeiling: 18500,
    usableFuelGal: 74,
    taxiFuelGal: 2.0
  },
  "PA28": {
    name: "Piper Cherokee PA-28-181",
    category: "Single-Engine Piston",
    cruiseTAS: 125,
    fuelBurnGPH: 9.0,
    serviceCeiling: 14000,
    usableFuelGal: 48,
    taxiFuelGal: 1.0
  },
  "M20J": {
    name: "Mooney M20J 201",
    category: "Single-Engine Piston",
    cruiseTAS: 160,
    fuelBurnGPH: 10.8,
    serviceCeiling: 18800,
    usableFuelGal: 64,
    taxiFuelGal: 1.5
  }
};

// Función para obtener aeronave por modelo
function getAircraftPerformance(modelCode) {
  const code = modelCode.toUpperCase().trim();
  return AIRCRAFT_DB[code] || AIRCRAFT_DB["C210"]; // Regresa C210 por defecto si no lo encuentra
}