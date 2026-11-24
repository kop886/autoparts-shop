// Марки, моделі й модифікації для наповнення бази (npm run seed)

export const carBrandsSeed = [
  "Audi", "BMW", "Ford", "Honda", "Hyundai", "Kia", "Mazda", "Mercedes-Benz",
  "Nissan", "Opel", "Renault", "Skoda", "Toyota", "Volkswagen",
];

export const carModelsSeed = [
  { brand: "Audi", name: "A4" },
  { brand: "Audi", name: "A6" },
  { brand: "Audi", name: "Q5" },
  { brand: "BMW", name: "3 Series" },
  { brand: "BMW", name: "5 Series" },
  { brand: "BMW", name: "X5" },
  { brand: "Ford", name: "Focus" },
  { brand: "Ford", name: "Mondeo" },
  { brand: "Ford", name: "Kuga" },
  { brand: "Honda", name: "Civic" },
  { brand: "Honda", name: "CR-V" },
  { brand: "Hyundai", name: "Tucson" },
  { brand: "Hyundai", name: "Elantra" },
  { brand: "Hyundai", name: "Santa Fe" },
  { brand: "Kia", name: "Ceed" },
  { brand: "Kia", name: "Sportage" },
  { brand: "Mazda", name: "3" },
  { brand: "Mazda", name: "CX-5" },
  { brand: "Mercedes-Benz", name: "C-Class" },
  { brand: "Mercedes-Benz", name: "E-Class" },
  { brand: "Nissan", name: "Qashqai" },
  { brand: "Opel", name: "Astra" },
  { brand: "Renault", name: "Megane" },
  { brand: "Renault", name: "Duster" },
  { brand: "Renault", name: "Logan" },
  { brand: "Skoda", name: "Octavia" },
  { brand: "Skoda", name: "Fabia" },
  { brand: "Skoda", name: "Superb" },
  { brand: "Skoda", name: "Kodiaq" },
  { brand: "Toyota", name: "Corolla" },
  { brand: "Toyota", name: "Camry" },
  { brand: "Toyota", name: "RAV4" },
  { brand: "Volkswagen", name: "Golf" },
  { brand: "Volkswagen", name: "Passat" },
  { brand: "Volkswagen", name: "Tiguan" },
  { brand: "Volkswagen", name: "Polo" },
];

// [марка, модель, рік від, рік до (0 = випускається досі), кузов, двигун, об'єм]
type Row = [string, string, number, number, string, string, number];

const rows: Row[] = [
  ["Audi", "A4", 2015, 2023, "Седан", "Бензин", 2.0],
  ["Audi", "A4", 2015, 2023, "Седан", "Дизель", 2.0],
  ["Audi", "A6", 2011, 2018, "Седан", "Дизель", 3.0],
  ["Audi", "A6", 2011, 2018, "Седан", "Бензин", 2.0],
  ["Audi", "Q5", 2017, 0, "Позашляховик", "Дизель", 2.0],
  ["Audi", "Q5", 2017, 0, "Позашляховик", "Бензин", 2.0],

  ["BMW", "3 Series", 2012, 2019, "Седан", "Бензин", 2.0],
  ["BMW", "3 Series", 2012, 2019, "Седан", "Дизель", 2.0],
  ["BMW", "5 Series", 2010, 2017, "Седан", "Бензин", 2.0],
  ["BMW", "5 Series", 2010, 2017, "Седан", "Дизель", 3.0],
  ["BMW", "X5", 2013, 2018, "Позашляховик", "Дизель", 3.0],

  ["Ford", "Focus", 2011, 2018, "Хетчбек", "Бензин", 1.6],
  ["Ford", "Focus", 2011, 2018, "Універсал", "Дизель", 1.5],
  ["Ford", "Mondeo", 2014, 2022, "Седан", "Дизель", 2.0],
  ["Ford", "Mondeo", 2014, 2022, "Седан", "Бензин", 1.5],
  ["Ford", "Kuga", 2012, 2019, "Позашляховик", "Бензин", 1.6],
  ["Ford", "Kuga", 2012, 2019, "Позашляховик", "Дизель", 2.0],

  ["Honda", "Civic", 2012, 2017, "Хетчбек", "Бензин", 1.8],
  ["Honda", "CR-V", 2012, 2018, "Позашляховик", "Бензин", 2.0],
  ["Honda", "CR-V", 2012, 2018, "Позашляховик", "Дизель", 1.6],

  ["Hyundai", "Tucson", 2015, 2020, "Позашляховик", "Бензин", 2.0],
  ["Hyundai", "Tucson", 2015, 2020, "Позашляховик", "Дизель", 1.7],
  ["Hyundai", "Elantra", 2016, 2020, "Седан", "Бензин", 1.6],
  ["Hyundai", "Elantra", 2016, 2020, "Седан", "Бензин", 2.0],
  ["Hyundai", "Santa Fe", 2012, 2018, "Позашляховик", "Дизель", 2.2],

  ["Kia", "Ceed", 2012, 2018, "Хетчбек", "Бензин", 1.6],
  ["Kia", "Ceed", 2012, 2018, "Хетчбек", "Дизель", 1.6],
  ["Kia", "Sportage", 2016, 2021, "Позашляховик", "Бензин", 2.0],
  ["Kia", "Sportage", 2016, 2021, "Позашляховик", "Дизель", 1.7],

  ["Mazda", "3", 2013, 2019, "Хетчбек", "Бензин", 1.5],
  ["Mazda", "3", 2013, 2019, "Седан", "Бензин", 2.0],
  ["Mazda", "CX-5", 2017, 0, "Позашляховик", "Бензин", 2.5],
  ["Mazda", "CX-5", 2017, 0, "Позашляховик", "Дизель", 2.2],

  ["Mercedes-Benz", "C-Class", 2014, 2021, "Седан", "Бензин", 2.0],
  ["Mercedes-Benz", "C-Class", 2014, 2021, "Седан", "Дизель", 2.2],
  ["Mercedes-Benz", "E-Class", 2009, 2016, "Седан", "Дизель", 2.1],
  ["Mercedes-Benz", "E-Class", 2009, 2016, "Седан", "Бензин", 3.5],

  ["Nissan", "Qashqai", 2013, 2021, "Позашляховик", "Бензин", 1.2],
  ["Nissan", "Qashqai", 2013, 2021, "Позашляховик", "Дизель", 1.5],

  ["Opel", "Astra", 2009, 2015, "Хетчбек", "Бензин", 1.6],
  ["Opel", "Astra", 2009, 2015, "Хетчбек", "Дизель", 1.7],

  ["Renault", "Megane", 2008, 2016, "Хетчбек", "Бензин", 1.6],
  ["Renault", "Megane", 2008, 2016, "Хетчбек", "Дизель", 1.5],
  ["Renault", "Megane", 2016, 2022, "Хетчбек", "Бензин", 1.3],
  ["Renault", "Duster", 2018, 0, "Позашляховик", "Бензин", 1.6],
  ["Renault", "Duster", 2018, 0, "Позашляховик", "Дизель", 1.5],
  ["Renault", "Logan", 2013, 2020, "Седан", "Бензин", 1.6],
  ["Renault", "Logan", 2013, 2020, "Седан", "Дизель", 1.5],

  ["Skoda", "Octavia", 2013, 2020, "Ліфтбек", "Бензин", 1.4],
  ["Skoda", "Octavia", 2013, 2020, "Ліфтбек", "Бензин", 1.8],
  ["Skoda", "Octavia", 2013, 2020, "Універсал", "Дизель", 2.0],
  ["Skoda", "Fabia", 2014, 2021, "Хетчбек", "Бензин", 1.2],
  ["Skoda", "Superb", 2015, 0, "Ліфтбек", "Бензин", 2.0],
  ["Skoda", "Superb", 2015, 0, "Ліфтбек", "Дизель", 2.0],
  ["Skoda", "Kodiaq", 2016, 0, "Позашляховик", "Дизель", 2.0],
  ["Skoda", "Kodiaq", 2016, 0, "Позашляховик", "Бензин", 2.0],

  ["Toyota", "Corolla", 2013, 2018, "Седан", "Бензин", 1.6],
  ["Toyota", "Corolla", 2013, 2018, "Седан", "Бензин", 1.8],
  ["Toyota", "Corolla", 2019, 0, "Хетчбек", "Гібрид", 1.8],
  ["Toyota", "Camry", 2011, 2017, "Седан", "Бензин", 2.5],
  ["Toyota", "Camry", 2018, 0, "Седан", "Бензин", 2.5],
  ["Toyota", "RAV4", 2013, 2018, "Позашляховик", "Бензин", 2.0],
  ["Toyota", "RAV4", 2013, 2018, "Позашляховик", "Дизель", 2.2],
  ["Toyota", "RAV4", 2019, 0, "Позашляховик", "Гібрид", 2.5],

  ["Volkswagen", "Golf", 2012, 2019, "Хетчбек", "Бензин", 1.4],
  ["Volkswagen", "Golf", 2012, 2019, "Хетчбек", "Бензин", 1.6],
  ["Volkswagen", "Golf", 2012, 2019, "Хетчбек", "Дизель", 2.0],
  ["Volkswagen", "Passat", 2014, 2023, "Седан", "Бензин", 1.8],
  ["Volkswagen", "Passat", 2014, 2023, "Універсал", "Дизель", 2.0],
  ["Volkswagen", "Tiguan", 2016, 0, "Позашляховик", "Бензин", 2.0],
  ["Volkswagen", "Tiguan", 2016, 0, "Позашляховик", "Дизель", 2.0],
  ["Volkswagen", "Polo", 2009, 2017, "Хетчбек", "Бензин", 1.2],
  ["Volkswagen", "Polo", 2009, 2017, "Хетчбек", "Бензин", 1.6],
];

export const carModificationsSeed = rows.map(
  ([brand, model, yearFrom, yearTo, bodyType, engineType, engineVolume]) => ({
    brand,
    model,
    yearFrom,
    yearTo: yearTo === 0 ? null : yearTo,
    bodyType,
    engineType,
    engineVolume,
  })
);
