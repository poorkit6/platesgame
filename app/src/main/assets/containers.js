// =====================================================================
//  КОНТЕЙНЕРЫ: стартовое содержимое
//
//  chance — шанс выпадения. Это не проценты, а «вес»: доля машины = chance / сумма всех chance
//  в контейнере (сейчас сумма равна 100, поэтому числа совпадают с процентами).
//
//  Свои машины, шансы и картинки проще править на телефоне в файле my_containers.txt
//  (папка PlatesGame), без пересборки приложения. Картинка лежит в папке cars и называется
//  по id машины: cars/<id>.jpg (или .jpeg, .png, .webp).
// =====================================================================

window.CONTAINERS = [
  { id: 'de', name: 'Немецкий', flag: '🇩🇪', color: '#ffd34e', price: 3500000, cars: [
    { id: 'vw-golf-gti-mk7', name: 'Volkswagen Golf GTI (Mk7)', price: 1900000, chance: 32 },
    { id: 'audi-a4-b8', name: 'Audi A4 (B8)', price: 2300000, chance: 24 },
    { id: 'bmw-m135i-f20', name: 'BMW M135i (F20)', price: 2800000, chance: 16 },
    { id: 'mercedes-c63-w204', name: 'Mercedes-Benz C 63 AMG (W204)', price: 3900000, chance: 11 },
    { id: 'audi-rs3-8v', name: 'Audi RS3 (8V)', price: 4600000, chance: 8 },
    { id: 'mercedes-a45s', name: 'Mercedes-AMG A 45 S', price: 6200000, chance: 5 },
    { id: 'porsche-cayman-gt4', name: 'Porsche Cayman GT4', price: 9000000, chance: 2.8 },
    { id: 'mercedes-amg-gtr', name: 'Mercedes-AMG GT R', price: 21000000, chance: 0.9 },
    { id: 'porsche-911-gt3rs-991', name: 'Porsche 911 GT3 RS (991.2)', price: 30000000, chance: 0.3 },
  ] },
  { id: 'jp', name: 'Японский', flag: '🇯🇵', color: '#ff8f8f', price: 3500000, cars: [
    { id: 'nissan-180sx', name: 'Nissan 180SX', price: 1600000, chance: 28 },
    { id: 'mazda-rx8', name: 'Mazda RX-8', price: 2000000, chance: 22 },
    { id: 'honda-s2000', name: 'Honda S2000', price: 2900000, chance: 18 },
    { id: 'nissan-silvia-s15', name: 'Nissan Silvia S15', price: 3300000, chance: 13 },
    { id: 'nissan-skyline-r32-gtr', name: 'Nissan Skyline GT-R (R32)', price: 5000000, chance: 9 },
    { id: 'mazda-rx7-fd', name: 'Mazda RX-7 (FD)', price: 5600000, chance: 6 },
    { id: 'toyota-supra-a80', name: 'Toyota Supra (A80)', price: 7000000, chance: 3 },
    { id: 'honda-nsx-na1', name: 'Honda NSX (NA1)', price: 12000000, chance: 0.8 },
    { id: 'lexus-lfa', name: 'Lexus LFA', price: 40000000, chance: 0.2 },
  ] },
  { id: 'us', name: 'Американский', flag: '🇺🇸', color: '#6fb4ff', price: 3500000, cars: [
    { id: 'dodge-charger-rt', name: 'Dodge Charger R/T', price: 2100000, chance: 35 },
    { id: 'chevrolet-camaro-ss', name: 'Chevrolet Camaro SS', price: 2500000, chance: 25 },
    { id: 'ford-mustang-gt', name: 'Ford Mustang GT', price: 2900000, chance: 15 },
    { id: 'cadillac-escalade', name: 'Cadillac Escalade', price: 4200000, chance: 10 },
    { id: 'ford-mustang-shelby-gt500', name: 'Ford Mustang Shelby GT500', price: 6500000, chance: 7.5 },
    { id: 'dodge-challenger-hellcat', name: 'Dodge Challenger SRT Hellcat', price: 7500000, chance: 4.5 },
    { id: 'chevrolet-corvette-c7-z06', name: 'Chevrolet Corvette C7 Z06', price: 10000000, chance: 2.5 },
    { id: 'dodge-viper-acr', name: 'Dodge Viper ACR', price: 14000000, chance: 0.4 },
    { id: 'ford-gt-2017', name: 'Ford GT (2017)', price: 34000000, chance: 0.1 },
  ] },
];
