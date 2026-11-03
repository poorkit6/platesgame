// =====================================================================
//  АВТОСАЛОН: список машин
//
//  КАК ДОБАВИТЬ МАШИНУ
//  1. Допиши строку в нужный салон (в конец списка, перед закрывающей ];):
//       { id: 'my-car', salon: 'high', name: 'Моя машина', price: 5000000 },
//     id      — латиницей, без пробелов, уникальный;
//     salon   — low, mid, high, premium или exclusive;
//     price   — цена числом, без пробелов.
//  2. Положи картинку в папку cars/ и назови её по id:  cars/my-car.jpg
//     (подойдёт .jpg, .jpeg, .png или .webp). Если картинки нет, покажется заглушка.
//     Можно указать и своё имя файла:  img: 'cars/photo1.jpg'
//  3. Пересобери APK (или обнови файлы в игре).
//
//  Порядок строк неважен: внутри салона машины сортируются по цене.
// =====================================================================

window.SALONS = [
  { id: 'low', name: 'Низкий класс', color: '#8fd3a8' },
  { id: 'mid', name: 'Средний класс', color: '#6fb4ff' },
  { id: 'high', name: 'Высокий класс', color: '#b58cff' },
  { id: 'premium', name: 'Премиум класс', color: '#ff8fc0' },
  { id: 'exclusive', name: 'Эксклюзив', color: '#ffd34e' },
];

window.CARS = [

  // ---- Низкий класс ----
  { id: 'vaz-2107', salon: 'low', name: 'ВАЗ-2107', price: 150000 },
  { id: 'vaz-2114', salon: 'low', name: 'ВАЗ-2114', price: 200000 },
  { id: 'daewoo-nexia', salon: 'low', name: 'Daewoo Nexia', price: 270000 },
  { id: 'lada-granta', salon: 'low', name: 'Lada Granta', price: 350000 },
  { id: 'renault-logan', salon: 'low', name: 'Renault Logan', price: 430000 },
  { id: 'lada-priora', salon: 'low', name: 'Lada Priora', price: 520000 },
  { id: 'audi-80', salon: 'low', name: 'Audi 80', price: 650000 },
  { id: 'vw-passat-b3', salon: 'low', name: 'Volkswagen Passat B3', price: 800000 },
  { id: 'bmw-e30', salon: 'low', name: 'BMW 3 Series (E30)', price: 1200000 },

  // ---- Средний класс ----
  { id: 'honda-civic-ek9', salon: 'mid', name: 'Honda Civic EK9', price: 1100000 },
  { id: 'toyota-mark2-jzx100', salon: 'mid', name: 'Toyota Mark II (JZX100)', price: 1350000 },
  { id: 'nissan-laurel-c35', salon: 'mid', name: 'Nissan Laurel C35', price: 1500000 },
  { id: 'bmw-e39', salon: 'mid', name: 'BMW 5 Series (E39)', price: 1750000 },
  { id: 'mercedes-w210', salon: 'mid', name: 'Mercedes-Benz E-Class (W210)', price: 2000000 },
  { id: 'subaru-impreza-wrx-sti', salon: 'mid', name: 'Subaru Impreza WRX STI', price: 2300000 },
  { id: 'audi-a6-c5', salon: 'mid', name: 'Audi A6 (C5)', price: 2600000 },
  { id: 'mitsubishi-evo-9', salon: 'mid', name: 'Mitsubishi Lancer Evolution IX', price: 3000000 },
  { id: 'toyota-camry-v70', salon: 'mid', name: 'Toyota Camry (v70)', price: 3200000 },
  { id: 'nissan-skyline-hr34', salon: 'mid', name: 'Nissan Skyline HR34', price: 3500000 },
  { id: 'bmw-m3-e36', salon: 'mid', name: 'BMW M3 (E36)', price: 4000000 },

  // ---- Высокий класс ----
  { id: 'bmw-g20', salon: 'high', name: 'BMW 3 Series (G20)', price: 4500000 },
  { id: 'audi-rs6-c7', salon: 'high', name: 'Audi RS6 Avant (C7)', price: 5500000 },
  { id: 'mercedes-e63-w212', salon: 'high', name: 'Mercedes-Benz E 63 AMG (W212 Рестайлинг)', price: 6800000 },
  { id: 'bmw-m5-f10', salon: 'high', name: 'BMW M5 F10', price: 7500000 },
  { id: 'porsche-911-997', salon: 'high', name: 'Porsche 911 Carrera (997)', price: 8000000 },
  { id: 'bmw-m5-f90', salon: 'high', name: 'BMW M5 F90', price: 9800000 },
  { id: 'nissan-gtr-r35', salon: 'high', name: 'Nissan GT-R (R35)', price: 10500000 },
  { id: 'bmw-m4-f82', salon: 'high', name: 'BMW M4 Competition (F82)', price: 12000000 },
  { id: 'mercedes-cls63', salon: 'high', name: 'Mercedes-Benz CLS 63 AMG', price: 13500000 },
  { id: 'porsche-panamera-gts', salon: 'high', name: 'Porsche Panamera GTS', price: 15000000 },
  { id: 'mercedes-g63', salon: 'high', name: 'Mercedes-Benz G 63 AMG', price: 16500000 },

  // ---- Премиум класс ----
  { id: 'bmw-m8-manhart-mh8', salon: 'premium', name: 'BMW M8 Competition Manhart MH8', price: 18000000 },
  { id: 'bmw-m5-f90-cs-level', salon: 'premium', name: 'BMW M5 F90 CS Level', price: 21000000 },
  { id: 'audi-rs6-c8-mansory', salon: 'premium', name: 'Audi RS6 C8 Mansory Edition', price: 24000000 },
  { id: 'mercedes-amg-gt63s-brabus-930', salon: 'premium', name: 'Mercedes-AMG GT 63 S Brabus 930', price: 30000000 },
  { id: 'porsche-911-turbo-s-techart', salon: 'premium', name: 'Porsche 911 Turbo S TechArt', price: 33000000 },
  { id: 'mercedes-g63-brabus-800', salon: 'premium', name: 'Mercedes-Benz G 63 AMG Brabus 800', price: 36000000 },
  { id: 'rolls-royce-ghost-black-bison', salon: 'premium', name: 'Rolls-Royce Ghost Black Bison', price: 39000000 },
  { id: 'lamborghini-urus-mansory-venatus', salon: 'premium', name: 'Lamborghini Urus Mansory Venatus', price: 42000000 },
  { id: 'rolls-royce-cullinan-mansory', salon: 'premium', name: 'Rolls-Royce Cullinan Mansory', price: 45000000 },

  // ---- Эксклюзив ----
  { id: 'porsche-911-gt2-rs-clubsport-25', salon: 'exclusive', name: 'Porsche 911 GT2 RS Clubsport 25', price: 50000000 },
  { id: 'mclaren-senna-gtr', salon: 'exclusive', name: 'McLaren Senna GTR', price: 140000000 },
  { id: 'pagani-zonda-r', salon: 'exclusive', name: 'Pagani Zonda R', price: 150000000 },
  { id: 'pagani-huayra-r', salon: 'exclusive', name: 'Pagani Huayra R', price: 250000000 },
  { id: 'koenigsegg-jesko-absolut', salon: 'exclusive', name: 'Koenigsegg Jesko Absolut', price: 280000000 },
  { id: 'aston-martin-valkyrie-amr-pro', salon: 'exclusive', name: 'Aston Martin Valkyrie AMR Pro', price: 300000000 },
  { id: 'bugatti-divo', salon: 'exclusive', name: 'Bugatti Divo', price: 460000000 },
  { id: 'ferrari-fxx-k-evo', salon: 'exclusive', name: 'Ferrari FXX K Evo', price: 600000000 },
  { id: 'bugatti-centodieci', salon: 'exclusive', name: 'Bugatti Centodieci', price: 720000000 },
];
