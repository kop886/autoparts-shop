// Демо-товари для наповнення бази (npm run seed).
// Фото додаються через адмін-панель, тому imageUrl тут порожній.

// Правила сумісності. Логіка:
//   brands / models — підходить, якщо збігається марка АБО модель («Марка Модель»);
//   fuel — додатково обмежує тип двигуна;
//   null — універсальний товар, підходить до всіх авто.
export type FitType = {
  brands?: string[];
  models?: string[];
  fuel?: string;
} | null;

const ALL: FitType = null;
const VAG: FitType = { brands: ["Volkswagen", "Skoda", "Audi"] };
const GERMAN_PREMIUM: FitType = { brands: ["BMW", "Mercedes-Benz"] };
const JAPAN: FitType = { brands: ["Toyota", "Honda", "Mazda", "Nissan"] };
const KOREA: FitType = { brands: ["Hyundai", "Kia"] };
const EURO_MASS: FitType = { brands: ["Ford", "Opel", "Renault"] };

export type ProductSeedType = {
  categorySlug: string;
  manufacturer: string;
  nameUk: string;
  nameEn: string;
  articleNumber: string;
  price: number;
  stockQuantity: number;
  descriptionUk: string;
  descriptionEn: string;
  fit: FitType;
};

// Короткі описи для кожної підкатегорії
const descriptions: Record<string, { uk: string; en: string }> = {
  "spark-plugs": { uk: "Забезпечує надійне займання паливної суміші, стабільний запуск і економію пального.", en: "Ensures reliable ignition of the fuel mixture, stable starting and fuel economy." },
  "timing-kits": { uk: "Комплект для заміни приводу газорозподільного механізму: ремінь, ролики та за потреби помпа.", en: "Kit for replacing the timing drive: belt, rollers and, where applicable, water pump." },
  "gaskets": { uk: "Забезпечує герметичність з'єднань двигуна та запобігає витокам масла й охолоджувальної рідини.", en: "Seals engine joints and prevents oil and coolant leaks." },
  "engine-mounts": { uk: "Гасить вібрації двигуна та коробки передач, підвищуючи комфорт під час руху.", en: "Dampens engine and gearbox vibration for a more comfortable ride." },
  "oil-filters": { uk: "Очищає моторне масло від нагару та металевого пилу, подовжуючи ресурс двигуна.", en: "Cleans engine oil from soot and metal dust, extending engine life." },
  "air-filters": { uk: "Затримує пил і бруд, що потрапляють у двигун, і забезпечує чисте повітря для згоряння.", en: "Traps dust and dirt before they reach the engine and provides clean air for combustion." },
  "cabin-filters": { uk: "Очищає повітря в салоні від пилку, пилу та неприємних запахів.", en: "Cleans cabin air from pollen, dust and unpleasant odours." },
  "fuel-filters": { uk: "Захищає паливну систему та форсунки від забруднень і води в пальному.", en: "Protects the fuel system and injectors from dirt and water in the fuel." },
  "brake-pads": { uk: "Надійне гальмування з низьким рівнем шуму та мінімальним зносом дисків.", en: "Reliable braking with low noise and minimal disc wear." },
  "brake-discs": { uk: "Вентильований диск із точною геометрією для рівномірного та безпечного гальмування.", en: "Ventilated disc with precise geometry for even, safe braking." },
  "brake-calipers": { uk: "Гальмівний супорт у зборі з поршнем, готовий до встановлення.", en: "Complete brake caliper with piston, ready to install." },
  "shock-absorbers": { uk: "Гасить коливання кузова, покращує стійкість і керованість автомобіля.", en: "Damps body oscillation and improves stability and handling." },
  "springs": { uk: "Пружина підвіски зберігає потрібний кліренс і комфорт під навантаженням.", en: "Suspension spring maintains ride height and comfort under load." },
  "control-arms": { uk: "Важіль підвіски з'єднує колесо з кузовом і утримує правильну геометрію.", en: "Control arm links the wheel to the body and keeps correct geometry." },
  "stabilizer-links": { uk: "Зменшує крени кузова в поворотах і покращує керованість.", en: "Reduces body roll in corners and improves handling." },
  "clutch-kits": { uk: "Комплект зчеплення: диск, кошик і вижимний підшипник для плавного перемикання передач.", en: "Clutch kit: disc, cover and release bearing for smooth gear changes." },
  "cv-joints": { uk: "ШРУС передає крутний момент на колеса під різними кутами повороту.", en: "CV joint transmits torque to the wheels at varying steering angles." },
  "wheel-bearings": { uk: "Підшипник маточини забезпечує плавне обертання колеса без шуму та люфтів.", en: "Wheel bearing ensures smooth, quiet wheel rotation without play." },
  "batteries": { uk: "Необслуговуваний акумулятор із високим пусковим струмом, надійний у морози.", en: "Maintenance-free battery with high cold-cranking current, reliable in frost." },
  "alternators": { uk: "Генератор забезпечує живлення бортової мережі та заряджання акумулятора.", en: "Alternator powers the on-board network and charges the battery." },
  "starters": { uk: "Стартер для впевненого запуску двигуна за будь-якої погоди.", en: "Starter motor for confident engine starting in any weather." },
  "sensors": { uk: "Точний датчик для коректної роботи системи керування двигуном.", en: "Precise sensor for correct operation of the engine management system." },
  "bulbs": { uk: "Яскраве світло та тривалий ресурс. Відповідає стандартам безпеки.", en: "Bright light and long service life. Meets safety standards." },
  "headlights": { uk: "Передня фара в зборі з відбивачем і корпусом. Покращує видимість уночі.", en: "Complete front headlight with reflector and housing. Improves night visibility." },
  "wipers": { uk: "Чисте скло в будь-яку погоду: тихо працює, не залишає смуг.", en: "Clear glass in any weather: quiet operation, no streaks." },
  "floor-mats": { uk: "Захищають підлогу салону від бруду та вологи. Легко миються.", en: "Protect the cabin floor from dirt and moisture. Easy to clean." },
  "mirrors": { uk: "Дзеркало заднього виду з правильним кутом огляду та підігрівом.", en: "Rear-view mirror with correct viewing angle and heating." },
  "engine-oil": { uk: "Синтетичне моторне масло захищає двигун від зносу та працює в широкому діапазоні температур.", en: "Synthetic engine oil protects against wear and works across a wide temperature range." },
  "antifreeze": { uk: "Охолоджувальна рідина захищає систему від корозії та замерзання до -35 °C.", en: "Coolant protects the system from corrosion and freezing down to -35 °C." },
  "brake-fluid": { uk: "Гальмівна рідина з високою температурою кипіння для надійного гальмування.", en: "Brake fluid with a high boiling point for dependable braking." },
  "transmission-oil": { uk: "Трансмісійне масло для плавної та тихої роботи коробки передач.", en: "Transmission oil for smooth, quiet gearbox operation." },
  "radiators": { uk: "Радіатор ефективно відводить тепло та запобігає перегріву двигуна.", en: "Radiator efficiently removes heat and prevents engine overheating." },
  "water-pumps": { uk: "Помпа забезпечує циркуляцію охолоджувальної рідини в системі.", en: "Water pump circulates coolant through the system." },
  "thermostats": { uk: "Термостат підтримує оптимальну температуру двигуна.", en: "Thermostat keeps the engine at its optimal temperature." },
};

// [категорія, виробник, назва UA, назва EN, артикул, ціна, склад, сумісність]
type Row = [string, string, string, string, string, number, number, FitType];

const rows: Row[] = [
  // --- Свічки запалювання ---
  ["spark-plugs", "NGK", "Свічка запалювання Laser Iridium", "Laser Iridium spark plug", "ILKAR7B11", 245, 60, { brands: ["Toyota", "Honda", "Mazda", "Nissan", "Hyundai", "Kia"], fuel: "Бензин" }],
  ["spark-plugs", "Bosch", "Свічка запалювання Super Plus FR7DC+", "Super Plus FR7DC+ spark plug", "0242235668", 140, 80, { brands: ["Volkswagen", "Skoda", "Audi"], fuel: "Бензин" }],
  ["spark-plugs", "Denso", "Свічка запалювання Iridium Power IK20", "Iridium Power IK20 spark plug", "DEN-IK20", 310, 45, { fuel: "Бензин" }],

  // --- Комплекти ГРМ ---
  ["timing-kits", "Gates", "Комплект ГРМ з помпою", "Timing belt kit with water pump", "KP25565XS", 4850, 7, { models: ["Volkswagen Golf", "Skoda Octavia"], fuel: "Дизель" }],
  ["timing-kits", "Dayco", "Комплект ГРМ", "Timing belt kit", "KTB880", 2890, 5, { brands: ["Renault", "Nissan"] }],
  ["timing-kits", "Febi Bilstein", "Ремінь ГРМ", "Timing belt", "FE23570", 780, 14, { brands: ["Ford", "Mazda"] }],

  // --- Прокладки двигуна ---
  ["gaskets", "Mahle", "Прокладка головки блоку циліндрів", "Cylinder head gasket", "MH54132", 1650, 9, { brands: ["Volkswagen", "Skoda"], fuel: "Бензин" }],
  ["gaskets", "Febi Bilstein", "Прокладка клапанної кришки", "Valve cover gasket", "FE36814", 520, 11, GERMAN_PREMIUM],
  ["gaskets", "Blue Print", "Прокладка піддону картера", "Oil pan gasket", "ADG06201", 380, 0, { brands: ["Toyota", "Honda"] }],

  // --- Опори двигуна ---
  ["engine-mounts", "Lemförder", "Опора двигуна передня", "Front engine mount", "LF35042", 1450, 6, { models: ["BMW 3 Series", "BMW 5 Series"] }],
  ["engine-mounts", "Febi Bilstein", "Опора коробки передач", "Gearbox mount", "FE40126", 980, 10, { brands: ["Volkswagen", "Skoda"] }],
  ["engine-mounts", "Blue Print", "Подушка двигуна", "Engine cushion", "ADT380153", 1120, 4, { brands: ["Toyota"] }],

  // --- Масляні фільтри ---
  ["oil-filters", "Mann-Filter", "Масляний фільтр W 712/95", "Oil filter W 712/95", "W71295", 245, 80, VAG],
  ["oil-filters", "Bosch", "Масляний фільтр F026407006", "Oil filter F026407006", "F026407006", 210, 55, JAPAN],
  ["oil-filters", "Mahle", "Масляний фільтр OC 593", "Oil filter OC 593", "OC593", 235, 40, GERMAN_PREMIUM],
  ["oil-filters", "Blue Print", "Масляний фільтр", "Oil filter", "ADG02122", 190, 33, KOREA],
  ["oil-filters", "Febi Bilstein", "Масляний фільтр", "Oil filter", "FE27140", 175, 3, EURO_MASS],

  // --- Повітряні фільтри ---
  ["air-filters", "Mann-Filter", "Повітряний фільтр C 27 009", "Air filter C 27 009", "C27009", 420, 35, VAG],
  ["air-filters", "Bosch", "Повітряний фільтр", "Air filter", "F026400233", 360, 22, { brands: ["Toyota", "Honda"] }],
  ["air-filters", "Mahle", "Повітряний фільтр LX 3354", "Air filter LX 3354", "LX3354", 395, 18, { brands: ["Hyundai", "Kia", "Mazda"] }],
  ["air-filters", "Blue Print", "Повітряний фільтр", "Air filter", "ADR162203", 330, 27, { brands: ["Renault", "Nissan", "Opel", "Ford"] }],

  // --- Салонні фільтри ---
  ["cabin-filters", "Mann-Filter", "Салонний фільтр вугільний CUK 2939", "Carbon cabin filter CUK 2939", "CUK2939", 380, 45, VAG],
  ["cabin-filters", "Bosch", "Салонний фільтр", "Cabin filter", "1987432397", 340, 20, { brands: ["BMW", "Mercedes-Benz", "Ford"] }],
  ["cabin-filters", "Mahle", "Салонний фільтр LAK 181", "Cabin filter LAK 181", "LAK181", 310, 25, JAPAN],
  ["cabin-filters", "Febi Bilstein", "Салонний фільтр", "Cabin filter", "FE38538", 270, 12, { brands: ["Hyundai", "Kia", "Renault", "Opel"] }],

  // --- Паливні фільтри ---
  ["fuel-filters", "Mann-Filter", "Паливний фільтр WK 8029", "Fuel filter WK 8029", "WK8029", 560, 15, { brands: ["Volkswagen", "Skoda", "Audi"], fuel: "Дизель" }],
  ["fuel-filters", "Bosch", "Паливний фільтр", "Fuel filter", "F026402065", 480, 9, { brands: ["BMW", "Mercedes-Benz"], fuel: "Дизель" }],
  ["fuel-filters", "Mahle", "Паливний фільтр KL 440", "Fuel filter KL 440", "KL440", 520, 6, { brands: ["Ford", "Renault", "Opel"], fuel: "Дизель" }],

  // --- Гальмівні колодки ---
  ["brake-pads", "TRW", "Колодки гальмівні передні", "Front brake pads", "GDB1550", 1180, 20, VAG],
  ["brake-pads", "Brembo", "Колодки гальмівні передні", "Front brake pads", "P85020", 1490, 12, GERMAN_PREMIUM],
  ["brake-pads", "Bosch", "Колодки гальмівні задні", "Rear brake pads", "0986494120", 780, 16, { brands: ["Toyota", "Honda", "Mazda"] }],
  ["brake-pads", "Febi Bilstein", "Колодки гальмівні передні", "Front brake pads", "FE16488", 690, 4, { brands: ["Hyundai", "Kia", "Nissan"] }],
  ["brake-pads", "TRW", "Колодки гальмівні передні", "Front brake pads", "GDB1799", 950, 8, EURO_MASS],

  // --- Гальмівні диски ---
  ["brake-discs", "Brembo", "Диск гальмівний передній вентильований (1 шт.)", "Front ventilated brake disc (1 pc)", "09A42611", 1650, 14, VAG],
  ["brake-discs", "TRW", "Диск гальмівний передній (1 шт.)", "Front brake disc (1 pc)", "DF4915", 1420, 9, GERMAN_PREMIUM],
  ["brake-discs", "Bosch", "Диск гальмівний (1 шт.)", "Brake disc (1 pc)", "0986479298", 1280, 11, JAPAN],
  ["brake-discs", "Blue Print", "Диск гальмівний передній (1 шт.)", "Front brake disc (1 pc)", "ADG04380", 1050, 2, KOREA],

  // --- Гальмівні супорти ---
  ["brake-calipers", "TRW", "Супорт гальмівний передній", "Front brake caliper", "BHN358E", 3850, 4, { models: ["Volkswagen Golf", "Skoda Octavia", "Audi A4"] }],
  ["brake-calipers", "Febi Bilstein", "Супорт гальмівний задній", "Rear brake caliper", "FE177510", 3150, 3, { brands: ["Ford", "Opel"] }],
  ["brake-calipers", "Blue Print", "Супорт гальмівний передній", "Front brake caliper", "ADT34890", 3420, 5, { brands: ["Toyota", "Honda"] }],

  // --- Амортизатори ---
  ["shock-absorbers", "Monroe", "Амортизатор передній газовий", "Front gas shock absorber", "G8101", 1950, 12, EURO_MASS],
  ["shock-absorbers", "Sachs", "Амортизатор задній", "Rear shock absorber", "313292", 1450, 15, VAG],
  ["shock-absorbers", "KYB", "Амортизатор передній Excel-G", "Front shock absorber Excel-G", "334504", 2150, 8, JAPAN],
  ["shock-absorbers", "Sachs", "Амортизатор передній", "Front shock absorber", "315926", 2480, 6, GERMAN_PREMIUM],
  ["shock-absorbers", "KYB", "Амортизатор задній Excel-G", "Rear shock absorber Excel-G", "343458", 1890, 5, KOREA],

  // --- Пружини ---
  ["springs", "Sachs", "Пружина підвіски передня", "Front coil spring", "996824", 1380, 9, VAG],
  ["springs", "Monroe", "Пружина підвіски задня", "Rear coil spring", "SP3584", 1190, 7, EURO_MASS],
  ["springs", "KYB", "Пружина підвіски", "Coil spring", "RA1356", 1260, 4, { brands: ["Toyota", "Honda", "Mazda"] }],

  // --- Важелі підвіски ---
  ["control-arms", "Lemförder", "Важіль передній нижній лівий", "Front lower left control arm", "LF2790001", 2150, 8, GERMAN_PREMIUM],
  ["control-arms", "TRW", "Важіль підвіски передній", "Front control arm", "JTC1245", 1650, 10, VAG],
  ["control-arms", "Blue Print", "Важіль підвіски нижній", "Lower control arm", "ADG086124", 1380, 6, { brands: ["Hyundai", "Kia", "Nissan"] }],
  ["control-arms", "Febi Bilstein", "Важіль підвіски задній", "Rear control arm", "FE41234", 1190, 3, EURO_MASS],

  // --- Стійки стабілізатора ---
  ["stabilizer-links", "Febi Bilstein", "Стійка стабілізатора передня", "Front stabilizer link", "FE24832", 340, 40, VAG],
  ["stabilizer-links", "Lemförder", "Стійка стабілізатора", "Stabilizer link", "LF3156101", 420, 25, GERMAN_PREMIUM],
  ["stabilizer-links", "TRW", "Стійка стабілізатора передня", "Front stabilizer link", "JTS7790", 310, 30, JAPAN],
  ["stabilizer-links", "Blue Print", "Стійка стабілізатора", "Stabilizer link", "ADG08545", 280, 2, { brands: ["Hyundai", "Kia", "Ford"] }],

  // --- Зчеплення ---
  ["clutch-kits", "Sachs", "Комплект зчеплення 3 в 1", "Clutch kit 3-in-1", "3000951002", 6850, 5, { models: ["Volkswagen Golf", "Skoda Octavia", "Audi A4"] }],
  ["clutch-kits", "Valeo", "Комплект зчеплення", "Clutch kit", "826754", 5420, 6, { brands: ["Renault", "Nissan"] }],
  ["clutch-kits", "Sachs", "Комплект зчеплення з вижимним", "Clutch kit with release bearing", "3000950895", 7250, 3, { brands: ["Ford", "Opel"] }],

  // --- ШРУСи ---
  ["cv-joints", "Febi Bilstein", "ШРУС зовнішній", "Outer CV joint", "FE27498", 1250, 14, VAG],
  ["cv-joints", "Blue Print", "ШРУС зовнішній", "Outer CV joint", "ADT38921", 1380, 8, { brands: ["Toyota", "Honda", "Mazda"] }],
  ["cv-joints", "Lemförder", "ШРУС внутрішній", "Inner CV joint", "LF2987901", 1840, 5, GERMAN_PREMIUM],

  // --- Підшипники маточини ---
  ["wheel-bearings", "SKF", "Підшипник маточини передній", "Front wheel bearing", "VKBA3530", 1280, 16, VAG],
  ["wheel-bearings", "SKF", "Підшипник маточини", "Wheel bearing", "VKBA6846", 1450, 9, { brands: ["Toyota", "Honda", "Nissan"] }],
  ["wheel-bearings", "Febi Bilstein", "Підшипник маточини задній", "Rear wheel bearing", "FE19213", 990, 12, EURO_MASS],
  ["wheel-bearings", "Blue Print", "Підшипник маточини", "Wheel bearing", "ADG08235", 1050, 7, { brands: ["Hyundai", "Kia", "Mazda"] }],

  // --- Акумулятори ---
  ["batteries", "Varta", "Акумулятор Blue Dynamic E11 74Ah 680A", "Blue Dynamic E11 battery 74Ah 680A", "5744120683132", 3450, 12, ALL],
  ["batteries", "Varta", "Акумулятор Silver Dynamic 61Ah 600A", "Silver Dynamic battery 61Ah 600A", "5614000603162", 3150, 9, ALL],
  ["batteries", "Bosch", "Акумулятор S4 60Ah 540A", "S4 battery 60Ah 540A", "0092S40040", 2890, 14, ALL],
  ["batteries", "Varta", "Акумулятор Black Dynamic 52Ah 470A", "Black Dynamic battery 52Ah 470A", "5524000483122", 2450, 6, ALL],

  // --- Генератори ---
  ["alternators", "Bosch", "Генератор 140A", "Alternator 140A", "0986049960", 5850, 3, { models: ["Volkswagen Golf", "Skoda Octavia", "Audi A4"] }],
  ["alternators", "Valeo", "Генератор 110A", "Alternator 110A", "439505", 5150, 4, { brands: ["Renault", "Nissan"] }],
  ["alternators", "Denso", "Генератор 100A", "Alternator 100A", "DAN1015", 6250, 2, { brands: ["Toyota", "Honda", "Mazda"] }],

  // --- Стартери ---
  ["starters", "Bosch", "Стартер 1.7 кВт", "Starter motor 1.7 kW", "0986018290", 4650, 4, VAG],
  ["starters", "Valeo", "Стартер 1.1 кВт", "Starter motor 1.1 kW", "438169", 4150, 5, { brands: ["Renault", "Nissan", "Opel"] }],
  ["starters", "Denso", "Стартер 1.4 кВт", "Starter motor 1.4 kW", "DSN1011", 5180, 3, { brands: ["Toyota", "Honda"] }],

  // --- Датчики ---
  ["sensors", "Bosch", "Лямбда-зонд (датчик кисню)", "Lambda sensor (oxygen sensor)", "0258006537", 1950, 18, { fuel: "Бензин" }],
  ["sensors", "Bosch", "Датчик положення колінвалу", "Crankshaft position sensor", "0261210199", 640, 22, VAG],
  ["sensors", "Hella", "Датчик ABS передній", "Front ABS sensor", "6PU009106481", 580, 11, GERMAN_PREMIUM],
  ["sensors", "Hella", "Датчик температури охолоджувальної рідини", "Coolant temperature sensor", "6PT009107061", 290, 30, ALL],

  // --- Лампи ---
  ["bulbs", "Osram", "Лампа H7 Night Breaker Laser (2 шт.)", "H7 Night Breaker Laser bulb (2 pcs)", "64210NBL-HCB", 1290, 25, ALL],
  ["bulbs", "Philips", "Лампа H7 X-tremeVision +130% (2 шт.)", "H7 X-tremeVision +130% bulb (2 pcs)", "12972XVPS2", 980, 30, ALL],
  ["bulbs", "Osram", "Лампа H4 Original Line", "H4 Original Line bulb", "64193", 180, 50, ALL],
  ["bulbs", "Philips", "Лампа W5W WhiteVision (2 шт.)", "W5W WhiteVision bulb (2 pcs)", "12961NBVB2", 210, 40, ALL],

  // --- Фари ---
  ["headlights", "Hella", "Фара передня права", "Front right headlight", "1EL010740121", 8900, 2, { models: ["Volkswagen Golf"] }],
  ["headlights", "Valeo", "Фара передня ліва", "Front left headlight", "046838", 6450, 3, { brands: ["Renault"] }],
  ["headlights", "Hella", "Фара передня ліва LED", "Front left LED headlight", "1EE354690041", 12350, 2, { models: ["Skoda Octavia"] }],

  // --- Склоочисники ---
  ["wipers", "Bosch", "Щітки склоочисника Aerotwin 650/400 (комплект)", "Aerotwin wiper blades 650/400 (set)", "3397118909", 780, 40, ALL],
  ["wipers", "Valeo", "Щітки склоочисника First 600/450 (комплект)", "First wiper blades 600/450 (set)", "574287", 520, 35, ALL],
  ["wipers", "Bosch", "Щітка склоочисника задня H340", "Rear wiper blade H340", "3397004629", 260, 20, { brands: ["Volkswagen", "Skoda", "Audi", "Renault"] }],

  // --- Килимки ---
  ["floor-mats", "Stingray", "Килимки гумові для Volkswagen Golf VII (4 шт.)", "Rubber mats for Volkswagen Golf VII (4 pcs)", "ST-VW-G7", 950, 10, { models: ["Volkswagen Golf"] }],
  ["floor-mats", "Stingray", "Килимки гумові для Skoda Octavia A7 (4 шт.)", "Rubber mats for Skoda Octavia A7 (4 pcs)", "ST-SK-OA7", 950, 8, { models: ["Skoda Octavia"] }],
  ["floor-mats", "Stingray", "Килимки гумові для Toyota Corolla / Camry (4 шт.)", "Rubber mats for Toyota Corolla / Camry (4 pcs)", "ST-TY-CC", 980, 6, { models: ["Toyota Corolla", "Toyota Camry"] }],
  ["floor-mats", "Stingray", "Килимки універсальні (4 шт.)", "Universal mats (4 pcs)", "ST-UNI-4", 650, 25, ALL],

  // --- Дзеркала ---
  ["mirrors", "Blue Print", "Дзеркало заднього виду ліве електричне", "Left electric rear-view mirror", "ADV18709", 2150, 3, { brands: ["Volkswagen", "Skoda"] }],
  ["mirrors", "Febi Bilstein", "Дзеркало заднього виду праве", "Right rear-view mirror", "FE81240", 1980, 4, { brands: ["Ford", "Opel"] }],
  ["mirrors", "Hella", "Скло дзеркала з підігрівом", "Heated mirror glass", "HEL2250", 540, 14, { brands: ["BMW", "Mercedes-Benz", "Audi"] }],

  // --- Моторні масла ---
  ["engine-oil", "Castrol", "Моторне масло EDGE 5W-30 LL 4 л", "EDGE 5W-30 LL engine oil 4 L", "15669E", 1850, 30, ALL],
  ["engine-oil", "Mobil", "Моторне масло Mobil 1 ESP 5W-30 4 л", "Mobil 1 ESP 5W-30 engine oil 4 L", "154305", 2150, 22, ALL],
  ["engine-oil", "Liqui Moly", "Моторне масло Top Tec 4200 5W-30 5 л", "Top Tec 4200 5W-30 engine oil 5 L", "LM3707", 2650, 18, ALL],
  ["engine-oil", "Castrol", "Моторне масло Magnatec 10W-40 4 л", "Magnatec 10W-40 engine oil 4 L", "15C9D9", 1280, 25, { fuel: "Бензин" }],
  ["engine-oil", "Liqui Moly", "Моторне масло Special Tec AA 5W-20 4 л", "Special Tec AA 5W-20 engine oil 4 L", "LM8030", 1980, 5, { brands: ["Ford", "Toyota", "Honda", "Mazda"] }],

  // --- Антифриз ---
  ["antifreeze", "Liqui Moly", "Антифриз KFS 12+ G12+ 1,5 л", "KFS 12+ G12+ antifreeze 1.5 L", "LM21134", 460, 40, ALL],
  ["antifreeze", "Mobil", "Антифриз Mobil Antifreeze Extra 5 л", "Mobil Antifreeze Extra 5 L", "151787", 780, 22, ALL],
  ["antifreeze", "Febi Bilstein", "Антифриз G12 1,5 л", "G12 antifreeze 1.5 L", "FE22271", 340, 35, VAG],

  // --- Гальмівна рідина ---
  ["brake-fluid", "Bosch", "Гальмівна рідина DOT 4 1 л", "DOT 4 brake fluid 1 L", "1987479107", 280, 50, ALL],
  ["brake-fluid", "Liqui Moly", "Гальмівна рідина DOT 4 0,5 л", "DOT 4 brake fluid 0.5 L", "LM21156", 190, 60, ALL],
  ["brake-fluid", "Castrol", "Гальмівна рідина DOT 5.1 1 л", "DOT 5.1 brake fluid 1 L", "CAS-DOT51", 420, 15, ALL],

  // --- Трансмісійні масла ---
  ["transmission-oil", "Liqui Moly", "Масло для АКПП Top Tec ATF 1200 1 л", "Top Tec ATF 1200 automatic transmission oil 1 L", "LM3681", 640, 20, ALL],
  ["transmission-oil", "Castrol", "Трансмісійне масло Syntrans 75W-90 1 л", "Syntrans 75W-90 transmission oil 1 L", "CAS-ST7590", 520, 17, ALL],
  ["transmission-oil", "Mobil", "Трансмісійне масло Mobilube HD 80W-90 1 л", "Mobilube HD 80W-90 transmission oil 1 L", "MB-HD8090", 390, 24, ALL],

  // --- Радіатори ---
  ["radiators", "Valeo", "Радіатор охолодження двигуна", "Engine cooling radiator", "735041", 4850, 4, { models: ["Volkswagen Golf", "Skoda Octavia"] }],
  ["radiators", "Mahle", "Радіатор охолодження двигуна", "Engine cooling radiator", "CR1535000S", 5450, 3, GERMAN_PREMIUM],
  ["radiators", "Blue Print", "Радіатор охолодження двигуна", "Engine cooling radiator", "ADH29846", 3950, 2, { brands: ["Honda", "Toyota", "Mazda"] }],

  // --- Помпи охолодження ---
  ["water-pumps", "Gates", "Помпа водяна", "Water pump", "WP0053", 1480, 11, VAG],
  ["water-pumps", "Dayco", "Помпа водяна", "Water pump", "DP312", 1250, 8, { brands: ["Renault", "Nissan"] }],
  ["water-pumps", "Febi Bilstein", "Помпа водяна", "Water pump", "FE45068", 1650, 6, GERMAN_PREMIUM],

  // --- Термостати ---
  ["thermostats", "Gates", "Термостат у корпусі", "Thermostat with housing", "TH33987G1", 590, 18, VAG],
  ["thermostats", "Mahle", "Термостат", "Thermostat", "TX10587D", 640, 14, EURO_MASS],
  ["thermostats", "Blue Print", "Термостат", "Thermostat", "ADH29208", 520, 9, { brands: ["Honda", "Toyota", "Hyundai", "Kia"] }],
];

export const productsSeed: ProductSeedType[] = rows.map(
  ([categorySlug, manufacturer, nameUk, nameEn, articleNumber, price, stockQuantity, fit]) => {
    const d = descriptions[categorySlug];
    return {
      categorySlug,
      manufacturer,
      nameUk,
      nameEn,
      articleNumber,
      price,
      stockQuantity,
      descriptionUk: `${d.uk} Виробник: ${manufacturer}. Артикул: ${articleNumber}.`,
      descriptionEn: `${d.en} Manufacturer: ${manufacturer}. Part number: ${articleNumber}.`,
      fit,
    };
  }
);
