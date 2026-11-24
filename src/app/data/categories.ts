// Категорії каталогу: 10 розділів і їхні підкатегорії
export const categoriesSeed = [
  // --- кореневі розділи ---
  { nameUk: "Двигун", nameEn: "Engine", slug: "engine", parent: null },
  { nameUk: "Фільтри", nameEn: "Filters", slug: "filters", parent: null },
  { nameUk: "Гальмівна система", nameEn: "Brakes", slug: "brakes", parent: null },
  { nameUk: "Підвіска", nameEn: "Suspension", slug: "suspension", parent: null },
  { nameUk: "Трансмісія", nameEn: "Transmission", slug: "transmission", parent: null },
  { nameUk: "Електрика", nameEn: "Electrical", slug: "electrical", parent: null },
  { nameUk: "Освітлення", nameEn: "Lighting", slug: "lighting", parent: null },
  { nameUk: "Кузов і салон", nameEn: "Body & interior", slug: "body", parent: null },
  { nameUk: "Масла та рідини", nameEn: "Oils & fluids", slug: "fluids", parent: null },
  { nameUk: "Охолодження", nameEn: "Cooling", slug: "cooling", parent: null },

  // --- підкатегорії ---
  { nameUk: "Свічки запалювання", nameEn: "Spark plugs", slug: "spark-plugs", parent: "engine" },
  { nameUk: "Комплекти ГРМ", nameEn: "Timing belt kits", slug: "timing-kits", parent: "engine" },
  { nameUk: "Прокладки двигуна", nameEn: "Engine gaskets", slug: "gaskets", parent: "engine" },
  { nameUk: "Опори двигуна", nameEn: "Engine mounts", slug: "engine-mounts", parent: "engine" },

  { nameUk: "Масляні фільтри", nameEn: "Oil filters", slug: "oil-filters", parent: "filters" },
  { nameUk: "Повітряні фільтри", nameEn: "Air filters", slug: "air-filters", parent: "filters" },
  { nameUk: "Салонні фільтри", nameEn: "Cabin filters", slug: "cabin-filters", parent: "filters" },
  { nameUk: "Паливні фільтри", nameEn: "Fuel filters", slug: "fuel-filters", parent: "filters" },

  { nameUk: "Гальмівні колодки", nameEn: "Brake pads", slug: "brake-pads", parent: "brakes" },
  { nameUk: "Гальмівні диски", nameEn: "Brake discs", slug: "brake-discs", parent: "brakes" },
  { nameUk: "Гальмівні супорти", nameEn: "Brake calipers", slug: "brake-calipers", parent: "brakes" },

  { nameUk: "Амортизатори", nameEn: "Shock absorbers", slug: "shock-absorbers", parent: "suspension" },
  { nameUk: "Пружини підвіски", nameEn: "Coil springs", slug: "springs", parent: "suspension" },
  { nameUk: "Важелі підвіски", nameEn: "Control arms", slug: "control-arms", parent: "suspension" },
  { nameUk: "Стійки стабілізатора", nameEn: "Stabilizer links", slug: "stabilizer-links", parent: "suspension" },

  { nameUk: "Комплекти зчеплення", nameEn: "Clutch kits", slug: "clutch-kits", parent: "transmission" },
  { nameUk: "ШРУСи", nameEn: "CV joints", slug: "cv-joints", parent: "transmission" },
  { nameUk: "Підшипники маточини", nameEn: "Wheel bearings", slug: "wheel-bearings", parent: "transmission" },

  { nameUk: "Акумулятори", nameEn: "Batteries", slug: "batteries", parent: "electrical" },
  { nameUk: "Генератори", nameEn: "Alternators", slug: "alternators", parent: "electrical" },
  { nameUk: "Стартери", nameEn: "Starters", slug: "starters", parent: "electrical" },
  { nameUk: "Датчики", nameEn: "Sensors", slug: "sensors", parent: "electrical" },

  { nameUk: "Лампи", nameEn: "Bulbs", slug: "bulbs", parent: "lighting" },
  { nameUk: "Фари", nameEn: "Headlights", slug: "headlights", parent: "lighting" },

  { nameUk: "Склоочисники", nameEn: "Wiper blades", slug: "wipers", parent: "body" },
  { nameUk: "Автомобільні килимки", nameEn: "Floor mats", slug: "floor-mats", parent: "body" },
  { nameUk: "Дзеркала", nameEn: "Mirrors", slug: "mirrors", parent: "body" },

  { nameUk: "Моторні масла", nameEn: "Engine oils", slug: "engine-oil", parent: "fluids" },
  { nameUk: "Антифриз", nameEn: "Antifreeze", slug: "antifreeze", parent: "fluids" },
  { nameUk: "Гальмівна рідина", nameEn: "Brake fluid", slug: "brake-fluid", parent: "fluids" },
  { nameUk: "Трансмісійні масла", nameEn: "Transmission oils", slug: "transmission-oil", parent: "fluids" },

  { nameUk: "Радіатори", nameEn: "Radiators", slug: "radiators", parent: "cooling" },
  { nameUk: "Помпи охолодження", nameEn: "Water pumps", slug: "water-pumps", parent: "cooling" },
  { nameUk: "Термостати", nameEn: "Thermostats", slug: "thermostats", parent: "cooling" },
];
