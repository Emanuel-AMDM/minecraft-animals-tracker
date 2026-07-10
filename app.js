/**
 * MINECRAFT ANIMALS TRACKER - CORE JAVASCRIPT
 * Manipulação de dados, filtros, salvamento local/API e interface dinâmica.
 */

// URL da API local
const API_URL = 'http://localhost:3000/api/animals';

// Estado global da aplicação
let animalsData = [];
let usingAPI = false;
let uniqueBiomes = [];

// Fallback de dados inicial (caso o db.json falhe totalmente ou não exista no primeiro acesso em LocalStorage)
const INITIAL_FALLBACK_DATA = [
  {
    "id": "abelha",
    "name": "Abelha",
    "englishName": "Bee",
    "image": "https://minecraft.wiki/images/Bee_JE1.gif",
    "tameable": true,
    "breedable": true,
    "category": "Neutro",
    "biomes": [
      "Planície",
      "Floresta",
      "Planície de Girassóis",
      "Floresta de Flores"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "allay",
    "name": "Allay",
    "englishName": "Allay",
    "image": "https://minecraft.wiki/images/Allay_JE1_BE1.gif",
    "tameable": true,
    "breedable": false,
    "category": "Passivo",
    "biomes": [
      "Mansão da Floresta",
      "Posto de Saqueadores"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "axolote",
    "name": "Axolote",
    "englishName": "Axolotl",
    "image": "https://minecraft.wiki/images/Axolotl_Idle_Floor_Underwater.gif",
    "tameable": false,
    "breedable": true,
    "category": "Aquático",
    "biomes": [
      "Cavernas Luxuriantes"
    ],
    "variants": [
      "Leucístico (Rosa)",
      "Selvagem (Marrom)",
      "Ouro (Amarelo)",
      "Ciano",
      "Azul (Raro)"
    ],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "baiacu",
    "name": "Baiacu",
    "englishName": "Pufferfish",
    "image": "https://minecraft.wiki/images/Pufferfish_small.gif",
    "tameable": false,
    "breedable": false,
    "category": "Aquático",
    "biomes": [
      "Oceano Quente",
      "Oceano Morno"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "bacalhau",
    "name": "Bacalhau",
    "englishName": "Cod",
    "image": "https://minecraft.wiki/images/Cod.gif",
    "tameable": false,
    "breedable": false,
    "category": "Aquático",
    "biomes": [
      "Oceano Frio",
      "Oceano Normal",
      "Oceano Morno"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "burro",
    "name": "Burro",
    "englishName": "Donkey",
    "image": "https://minecraft.wiki/images/Donkey_JE5.png",
    "tameable": true,
    "breedable": true,
    "category": "Passivo",
    "biomes": [
      "Planície",
      "Savana"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "cabra",
    "name": "Cabra",
    "englishName": "Goat",
    "image": "https://minecraft.wiki/images/Goat_%28two_horns%29_JE1_BE1.png",
    "tameable": false,
    "breedable": true,
    "category": "Neutro",
    "biomes": [
      "Encostas Nevadas",
      "Picos Denteados",
      "Picos Congelados"
    ],
    "variants": [
      "Normal",
      "Gritadora (Screaming)"
    ],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "camelo",
    "name": "Camelo",
    "englishName": "Camel",
    "image": "https://minecraft.wiki/images/Camel_Idle.gif",
    "tameable": true,
    "breedable": true,
    "category": "Passivo",
    "biomes": [
      "Vila do Deserto"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "cavalo",
    "name": "Cavalo",
    "englishName": "Horse",
    "image": "https://minecraft.wiki/images/White_Horse.png",
    "tameable": true,
    "breedable": true,
    "category": "Passivo",
    "biomes": [
      "Planície",
      "Savana"
    ],
    "variants": [
      "Branco",
      "Castanho Claro",
      "Castanho Escuro",
      "Preto",
      "Cinza",
      "Baio",
      "Alazão"
    ],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "cavalo_esqueleto",
    "name": "Cavalo Esqueleto",
    "englishName": "Skeleton Horse",
    "image": "https://minecraft.wiki/images/Skeleton_Horse.png",
    "tameable": true,
    "breedable": false,
    "category": "Neutro",
    "biomes": [
      "Tempestades (Skeleton Trap)"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "cavalo_zumbi",
    "name": "Cavalo Zumbi",
    "englishName": "Zombie Horse",
    "image": "https://minecraft.wiki/images/Zombie_Horse_JE6.png",
    "tameable": true,
    "breedable": false,
    "category": "Neutro",
    "biomes": [
      "Invocado por Comandos"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "coelho",
    "name": "Coelho",
    "englishName": "Rabbit",
    "image": "https://minecraft.wiki/images/Brown_Rabbit_BE4.png",
    "tameable": false,
    "breedable": true,
    "category": "Passivo",
    "biomes": [
      "Deserto",
      "Taiga",
      "Taiga Nevada",
      "Floresta de Flores",
      "Dunas"
    ],
    "variants": [
      "Marrom",
      "Branco",
      "Preto",
      "Preto e Branco",
      "Dourado",
      "Sal e Pimenta",
      "Toast (Nomeado)",
      "Coelho Assassino"
    ],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "farejador",
    "name": "Farejador",
    "englishName": "Sniffer",
    "image": "https://minecraft.wiki/images/Sniffer_sniffsniff.gif",
    "tameable": false,
    "breedable": true,
    "category": "Passivo",
    "biomes": [
      "Chocado de Ovo (Ruínas do Oceano Quente)"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "galinha",
    "name": "Galinha",
    "englishName": "Chicken",
    "image": "https://minecraft.wiki/images/Chicken_JE2_BE2.png",
    "tameable": false,
    "breedable": true,
    "category": "Passivo",
    "biomes": [
      "Planície",
      "Floresta",
      "Pântano",
      "Selva"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "gato",
    "name": "Gato",
    "englishName": "Cat",
    "image": "https://minecraft.wiki/images/Tabby_Cat.png",
    "tameable": true,
    "breedable": true,
    "category": "Passivo",
    "biomes": [
      "Vila",
      "Cabana de Bruxa"
    ],
    "variants": [
      "Tuxedo (Preto e Branco)",
      "Tabby (Laranja)",
      "Siamês",
      "Vermelho",
      "Calico",
      "Persa",
      "Ragdoll",
      "British Shorthair",
      "Jelly",
      "Preto",
      "Branco"
    ],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "girino",
    "name": "Girino",
    "englishName": "Tadpole",
    "image": "https://minecraft.wiki/images/Tadpole_swimming_BE1.gif",
    "tameable": false,
    "breedable": false,
    "category": "Aquático",
    "biomes": [
      "Pântano",
      "Manguezal"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "golfinho",
    "name": "Golfinho",
    "englishName": "Dolphin",
    "image": "https://minecraft.wiki/images/Dolphin.gif",
    "tameable": false,
    "breedable": false,
    "category": "Aquático",
    "biomes": [
      "Oceano Normal",
      "Oceano Morno",
      "Oceano Frio"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "hoglin",
    "name": "Hoglin",
    "englishName": "Hoglin",
    "image": "https://minecraft.wiki/images/Hoglin_JE3.png",
    "tameable": false,
    "breedable": true,
    "category": "Hostil",
    "biomes": [
      "Floresta Carmesim (Nether)",
      "Bastiões"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "jaguatirica",
    "name": "Jaguatirica",
    "englishName": "Ocelot",
    "image": "https://minecraft.wiki/images/Ocelot_JE2_BE2.png",
    "tameable": true,
    "breedable": true,
    "category": "Passivo",
    "biomes": [
      "Selva"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "lavagante",
    "name": "Lavagante",
    "englishName": "Strider",
    "image": "https://minecraft.wiki/images/Strider_JE2_BE2.gif",
    "tameable": true,
    "breedable": true,
    "category": "Passivo",
    "biomes": [
      "Nether (Lagos de Lava)"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "lhama",
    "name": "Lhama",
    "englishName": "Llama",
    "image": "https://minecraft.wiki/images/Brown_Llama_JE2_BE2.png",
    "tameable": true,
    "breedable": true,
    "category": "Passivo",
    "biomes": [
      "Savana",
      "Extremo Colinas"
    ],
    "variants": [
      "Creme",
      "Marrom",
      "Cinza",
      "Branca"
    ],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "lhama_do_vendedor",
    "name": "Lhama do Vendedor",
    "englishName": "Trader Llama",
    "image": "https://minecraft.wiki/images/Brown_Trader_Llama.png",
    "tameable": true,
    "breedable": true,
    "category": "Passivo",
    "biomes": [
      "Gera junto ao Comerciante Viajante"
    ],
    "variants": [
      "Azul",
      "Verde",
      "Marrom",
      "Creme"
    ],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "lobo",
    "name": "Lobo",
    "englishName": "Wolf",
    "image": "https://minecraft.wiki/images/Wolf_JE2_BE2.png",
    "tameable": true,
    "breedable": true,
    "category": "Neutro",
    "biomes": [
      "Taiga",
      "Floresta",
      "Taiga Nevada",
      "Bosque",
      "Serras"
    ],
    "variants": [
      "Pálido (Pale)",
      "Enferrujado (Rusty)",
      "Manchado (Spotted)",
      "Preto (Black)",
      "Listrado (Striped)",
      "Castanho (Chestnut)",
      "Nevado (Snowy)",
      "Bosque (Woods)",
      "Cinza (Ashen)"
    ],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "lula",
    "name": "Lula",
    "englishName": "Squid",
    "image": "https://minecraft.wiki/images/Squid_JE2_BE2.gif",
    "tameable": false,
    "breedable": false,
    "category": "Aquático",
    "biomes": [
      "Rio",
      "Oceano"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "lula_brilhante",
    "name": "Lula Brilhante",
    "englishName": "Glow Squid",
    "image": "https://minecraft.wiki/images/Glow_Squid_JE1.gif",
    "tameable": false,
    "breedable": false,
    "category": "Aquático",
    "biomes": [
      "Oceanos Profundos",
      "Cavernas Subterrâneas"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "mooshroom",
    "name": "Cogumaca",
    "englishName": "Mooshroom",
    "image": "https://minecraft.wiki/images/Red_Mooshroom_JE5_BE3.png",
    "tameable": false,
    "breedable": true,
    "category": "Passivo",
    "biomes": [
      "Campos de Cogumelos (Mushroom Fields)"
    ],
    "variants": [
      "Vermelha",
      "Marrom"
    ],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "mula",
    "name": "Mula",
    "englishName": "Mule",
    "image": "https://minecraft.wiki/images/Mule_JE5.png",
    "tameable": true,
    "breedable": false,
    "category": "Passivo",
    "biomes": [
      "Cruzamento de Cavalo e Burro"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "ovelha",
    "name": "Ovelha",
    "englishName": "Sheep",
    "image": "https://minecraft.wiki/images/White_Sheep_JE5.png",
    "tameable": false,
    "breedable": true,
    "category": "Passivo",
    "biomes": [
      "Planície",
      "Floresta",
      "Savana"
    ],
    "variants": [
      "Branco",
      "Preto",
      "Cinza Escuro",
      "Cinza Claro",
      "Marrom",
      "Rosa",
      "Vermelho",
      "Laranja",
      "Amarelo",
      "Verde Lima",
      "Verde",
      "Ciano",
      "Azul Claro",
      "Azul",
      "Roxo",
      "Magenta"
    ],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "panda",
    "name": "Panda",
    "englishName": "Panda",
    "image": "https://minecraft.wiki/images/Panda_JE1_BE1.png",
    "tameable": false,
    "breedable": true,
    "category": "Passivo",
    "biomes": [
      "Selva de Bambu"
    ],
    "variants": [
      "Normal",
      "Preguiçoso",
      "Preocupado",
      "Brincalhão",
      "Agressivo",
      "Doente",
      "Marrom"
    ],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "papagaio",
    "name": "Papagaio",
    "englishName": "Parrot",
    "image": "https://minecraft.wiki/images/Red_Parrot_JE1_BE1.png",
    "tameable": true,
    "breedable": false,
    "category": "Passivo",
    "biomes": [
      "Selva",
      "Selva Escassa"
    ],
    "variants": [
      "Vermelho",
      "Verde",
      "Azul",
      "Ciano",
      "Cinza"
    ],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "peixe_tropical",
    "name": "Peixe Tropical",
    "englishName": "Tropical Fish",
    "image": "https://minecraft.wiki/images/Clownfish.png",
    "tameable": false,
    "breedable": false,
    "category": "Aquático",
    "biomes": [
      "Oceano Quente",
      "Cavernas Luxuriantes"
    ],
    "variants": [
      "Anêmona",
      "Peixe-Palhaço",
      "Dourado",
      "Neon",
      "Parrotfish",
      "Amarelo Tang"
    ],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "porco",
    "name": "Porco",
    "englishName": "Pig",
    "image": "https://minecraft.wiki/images/Temperate_Pig_JE3.png",
    "tameable": false,
    "breedable": true,
    "category": "Passivo",
    "biomes": [
      "Planície",
      "Floresta",
      "Pântano"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "raposa",
    "name": "Raposa",
    "englishName": "Fox",
    "image": "https://minecraft.wiki/images/Fox_JE1_BE1.png",
    "tameable": true,
    "breedable": true,
    "category": "Passivo",
    "biomes": [
      "Taiga",
      "Taiga Nevada",
      "Bosque de Cerejeiras"
    ],
    "variants": [
      "Vermelha",
      "Ártica (Neve)"
    ],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "sapo",
    "name": "Sapo",
    "englishName": "Frog",
    "image": "https://minecraft.wiki/images/Temperate_Frog_JE1_BE1.gif",
    "tameable": false,
    "breedable": true,
    "category": "Passivo",
    "biomes": [
      "Pântano",
      "Manguezal"
    ],
    "variants": [
      "Laranja (Temperado)",
      "Verde (Frio)",
      "Branco (Quente)"
    ],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "salmao",
    "name": "Salmão",
    "englishName": "Salmon",
    "image": "https://minecraft.wiki/images/Salmon.gif",
    "tameable": false,
    "breedable": false,
    "category": "Aquático",
    "biomes": [
      "Rio",
      "Oceano Frio",
      "Oceano Gelado"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "tartaruga",
    "name": "Tartaruga",
    "englishName": "Sea Turtle",
    "image": "https://minecraft.wiki/images/Turtle_JE3_BE1.png",
    "tameable": false,
    "breedable": true,
    "category": "Aquático",
    "biomes": [
      "Praia"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "tatu",
    "name": "Tatu",
    "englishName": "Armadillo",
    "image": "https://minecraft.wiki/images/Armadillo_JE2_BE2.png",
    "tameable": false,
    "breedable": true,
    "category": "Passivo",
    "biomes": [
      "Savana",
      "Ermos (Badlands)"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "urso_polar",
    "name": "Urso Polar",
    "englishName": "Polar Bear",
    "image": "https://minecraft.wiki/images/Polar_Bear_JE2_BE2.png",
    "tameable": false,
    "breedable": false,
    "category": "Neutro",
    "biomes": [
      "Taiga Nevada",
      "Planície Gelada",
      "Oceano Congelado"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  },
  {
    "id": "vaca",
    "name": "Vaca",
    "englishName": "Cow",
    "image": "https://minecraft.wiki/images/Cow_JE7_BE4.png",
    "tameable": false,
    "breedable": true,
    "category": "Passivo",
    "biomes": [
      "Planície",
      "Floresta",
      "Pântano"
    ],
    "variants": [],
    "obtained": false,
    "hasPair": false,
    "tamed": false,
    "selectedVariant": "",
    "color": "",
    "notes": "",
    "coordinates": ""
  }
];

// Elementos do DOM
const elements = {
  connectionStatus: document.getElementById('connection-status'),
  statusText: document.querySelector('#connection-status .status-text'),
  
  // Stats
  countCollection: document.getElementById('count-collection'),
  fillCollection: document.getElementById('fill-collection'),
  countPairs: document.getElementById('count-pairs'),
  fillPairs: document.getElementById('fill-pairs'),
  countTamed: document.getElementById('count-tamed'),
  fillTamed: document.getElementById('fill-tamed'),
  
  // Toolbar
  btnAddAnimal: document.getElementById('btn-add-animal'),
  btnExportJson: document.getElementById('btn-export-json'),
  inputImportJson: document.getElementById('input-import-json'),
  btnReset: document.getElementById('btn-reset'),
  
  // Filtros
  searchBox: document.getElementById('search-box'),
  btnClearSearch: document.getElementById('btn-clear-search'),
  filterCategory: document.getElementById('filter-category'),
  filterBiome: document.getElementById('filter-biome'),
  
  // Toggles
  toggleGroupCategory: document.getElementById('toggle-group-category'),
  toggleGroupBiome: document.getElementById('toggle-group-biome'),
  toggleHideObtained: document.getElementById('toggle-hide-obtained'),
  toggleMissingPairs: document.getElementById('toggle-missing-pairs'),
  toggleMissingTame: document.getElementById('toggle-missing-tame'),
  toggleLowFidelity: document.getElementById('toggle-low-fidelity'),
  
  // Main
  loadingSpinner: document.getElementById('loading-spinner'),
  gridContainer: document.getElementById('grid-container'),
  emptyState: document.getElementById('empty-state'),
  
  // Modal Editar
  animalModal: document.getElementById('animal-modal'),
  closeModal: document.getElementById('close-modal'),
  animalForm: document.getElementById('animal-form'),
  modalTitle: document.getElementById('modal-title'),
  modalAnimalId: document.getElementById('modal-animal-id'),
  modalName: document.getElementById('modal-name'),
  modalEnglishName: document.getElementById('modal-english-name'),
  modalCategory: document.getElementById('modal-category'),
  modalImage: document.getElementById('modal-image'),
  modalBiomes: document.getElementById('modal-biomes'),
  modalTameable: document.getElementById('modal-tameable'),
  modalBreedable: document.getElementById('modal-breedable'),
  
  // Toggles do Modal
  modalObtained: document.getElementById('modal-obtained'),
  modalHasPair: document.getElementById('modal-haspair'),
  modalTamed: document.getElementById('modal-tamed'),
  
  // Extra Modal
  modalVariantsList: document.getElementById('modal-variants-list'),
  modalSelectedVariant: document.getElementById('modal-selected-variant'),
  modalColor: document.getElementById('modal-color'),
  modalCoordinates: document.getElementById('modal-coordinates'),
  modalNotes: document.getElementById('modal-notes'),
  btnDeleteAnimal: document.getElementById('btn-delete-animal'),
  btnCancelModal: document.getElementById('btn-cancel-modal'),
  btnSaveModal: document.getElementById('btn-save-modal')
};

// ==========================================================================
// 1. CARREGAMENTO E SINCRONIZAÇÃO DE DADOS
// ==========================================================================

// Inicializar aplicativo
async function init() {
  showLoader(true);
  
  try {
    // Tenta carregar os dados da API local
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Erro na resposta do servidor");
    
    animalsData = await response.json();
    usingAPI = true;
    updateConnectionStatus(true);
  } catch (error) {
    console.warn("Servidor local não encontrado ou offline. Usando LocalStorage.", error);
    usingAPI = false;
    updateConnectionStatus(false);
    
    // Tenta carregar do LocalStorage
    const localData = localStorage.getItem('minecraft_animals');
    if (localData) {
      try {
        animalsData = JSON.parse(localData);
      } catch (parseErr) {
        console.error("Dados do LocalStorage corrompidos. Reiniciando database.");
        animalsData = [...INITIAL_FALLBACK_DATA];
      }
    } else {
      // Usa dados fallback iniciais
      animalsData = [...INITIAL_FALLBACK_DATA];
      localStorage.setItem('minecraft_animals', JSON.stringify(animalsData));
    }
  }

  // Preencher filtros de biomas
  populateBiomeFilter();
  
  // Adicionar ouvintes de evento
  setupEventListeners();
  
  // Renderizar estatísticas e o grid
  updateStats();
  renderGrid();
  
  showLoader(false);
}

// Atualizar o status da conexão na barra de navegação
function updateConnectionStatus(isOnline) {
  if (isOnline) {
    elements.connectionStatus.className = "status-badge online";
    elements.statusText.textContent = "Conectado ao db.json";
  } else {
    elements.connectionStatus.className = "status-badge offline";
    elements.statusText.textContent = "Offline (LocalStorage)";
  }
}

// Exibir ou ocultar o loading spinner
function showLoader(show) {
  elements.loadingSpinner.style.display = show ? 'flex' : 'none';
  elements.gridContainer.style.display = show ? 'none' : 'grid';
}

// Salvar dados no banco e atualizar interface
async function saveData() {
  updateStats();
  renderGrid();

  // Sempre salvar no LocalStorage como redundância
  localStorage.setItem('minecraft_animals', JSON.stringify(animalsData));
  
  if (usingAPI) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalsData)
      });
      if (!response.ok) throw new Error("Erro ao salvar no servidor");
    } catch (error) {
      console.error("Falha ao salvar no servidor API. Os dados foram mantidos localmente no navegador.", error);
      updateConnectionStatus(false);
      usingAPI = false;
    }
  }
}

// ==========================================================================
// 2. CONSTRUÇÃO E POPULAÇÃO DE FILTROS
// ==========================================================================

// Preenche dinamicamente o select de biomas na barra lateral
function populateBiomeFilter() {
  const biomesSet = new Set();
  animalsData.forEach(animal => {
    if (animal.biomes && Array.isArray(animal.biomes)) {
      animal.biomes.forEach(biome => {
        if (biome.trim() !== "") biomesSet.add(biome.trim());
      });
    }
  });
  
  // Ordena os biomas
  uniqueBiomes = Array.from(biomesSet).sort((a, b) => a.localeCompare(b));
  
  // Guarda o valor selecionado anteriormente
  const previousValue = elements.filterBiome.value;
  
  // Limpa o select e adiciona a opção padrão
  elements.filterBiome.innerHTML = '<option value="all">Todos os Biomas</option>';
  
  uniqueBiomes.forEach(biome => {
    const option = document.createElement('option');
    option.value = biome;
    option.textContent = biome;
    elements.filterBiome.appendChild(option);
  });
  
  // Restaura o valor anterior se ele ainda existir
  if (uniqueBiomes.includes(previousValue)) {
    elements.filterBiome.value = previousValue;
  }
}

// ==========================================================================
// 3. PROCESSAMENTO DE CÁLCULO DE ESTATÍSTICAS
// ==========================================================================

function updateStats() {
  const total = animalsData.length;
  
  // 1. Coleção
  const obtainedCount = animalsData.filter(a => a.obtained).length;
  elements.countCollection.textContent = `${obtainedCount}/${total}`;
  const pctCollection = total > 0 ? (obtainedCount / total) * 100 : 0;
  elements.fillCollection.style.width = `${pctCollection}%`;
  
  // 2. Casais (Apenas animais procriáveis contam para esta métrica)
  const breedableAnimals = animalsData.filter(a => a.breedable);
  const totalBreedable = breedableAnimals.length;
  const pairCount = breedableAnimals.filter(a => a.hasPair).length;
  elements.countPairs.textContent = `${pairCount}/${totalBreedable}`;
  const pctPairs = totalBreedable > 0 ? (pairCount / totalBreedable) * 100 : 0;
  elements.fillPairs.style.width = `${pctPairs}%`;
  
  // 3. Domesticados (Apenas animais domesticáveis contam para esta métrica)
  const tameableAnimals = animalsData.filter(a => a.tameable);
  const totalTameable = tameableAnimals.length;
  const tamedCount = tameableAnimals.filter(a => a.tamed).length;
  elements.countTamed.textContent = `${tamedCount}/${totalTameable}`;
  const pctTamed = totalTameable > 0 ? (tamedCount / totalTameable) * 100 : 0;
  elements.fillTamed.style.width = `${pctTamed}%`;
}

// Fallback caso a imagem não carregue
function handleImageError(img, name) {
  const initials = name.slice(0, 2).toUpperCase();
  img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23182033" rx="8"/><rect x="5" y="5" width="90" height="90" fill="none" stroke="%2322283f" stroke-width="2" rx="6"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="24" font-weight="bold" fill="%239ca3af">${initials}</text></svg>`;
  img.onerror = null; // evita loops de erro infinitos
}

// ==========================================================================
// 4. RENDERIZAÇÃO DOS CARDS E GRUPOS
// ==========================================================================

function renderGrid() {
  elements.gridContainer.innerHTML = '';
  
  const filtered = getFilteredAnimals();
  
  if (filtered.length === 0) {
    elements.emptyState.style.display = 'flex';
    elements.gridContainer.style.display = 'none';
    return;
  }
  
  elements.emptyState.style.display = 'none';
  elements.gridContainer.style.display = elements.toggleGroupCategory.checked || elements.toggleGroupBiome.checked ? 'block' : 'grid';

  // Se agrupar por Categoria
  if (elements.toggleGroupCategory.checked) {
    renderGrouped(filtered, 'category', ['Passivo', 'Neutro', 'Hostil', 'Aquático']);
  } 
  // Se agrupar por Bioma principal
  else if (elements.toggleGroupBiome.checked) {
    const biomesList = [...uniqueBiomes, "Sem Bioma"];
    renderGrouped(filtered, 'primaryBiome', biomesList);
  } 
  // Grid Simples sem agrupamento
  else {
    filtered.forEach(animal => {
      const card = createAnimalCard(animal);
      elements.gridContainer.appendChild(card);
    });
  }
}

// Renderiza o grid agrupado por seções
function renderGrouped(list, key, order) {
  const groups = {};
  
  // Inicializa os grupos
  order.forEach(grp => groups[grp] = []);
  
  list.forEach(animal => {
    let value = '';
    if (key === 'primaryBiome') {
      value = animal.biomes && animal.biomes.length > 0 ? animal.biomes[0] : "Sem Bioma";
    } else {
      value = animal[key] || "Outros";
    }
    
    if (!groups[value]) groups[value] = [];
    groups[value].push(animal);
  });
  
  // Cria elementos visuais para os grupos
  order.forEach(grpName => {
    const groupItems = groups[grpName] || [];
    if (groupItems.length === 0) return;
    
    const section = document.createElement('section');
    section.className = 'group-section';
    
    const title = document.createElement('h2');
    title.className = 'group-title';
    title.innerHTML = `${grpName} <span class="count-badge">${groupItems.length}</span>`;
    
    const grid = document.createElement('div');
    grid.className = 'cards-grid';
    
    groupItems.forEach(animal => {
      grid.appendChild(createAnimalCard(animal));
    });
    
    section.appendChild(title);
    section.appendChild(grid);
    elements.gridContainer.appendChild(section);
  });
}

// Filtra a lista de animais global de acordo com as escolhas do usuário
function getFilteredAnimals() {
  const searchQuery = elements.searchBox.value.toLowerCase().trim();
  const categoryFilter = elements.filterCategory.value;
  const biomeFilter = elements.filterBiome.value;
  
  // Progresso radio
  const progressFilter = document.querySelector('input[name="progress-filter"]:checked').value;
  
  return animalsData.filter(animal => {
    // 1. Busca por nome
    const nameMatch = animal.name.toLowerCase().includes(searchQuery) || 
                      animal.englishName.toLowerCase().includes(searchQuery);
    if (!nameMatch) return false;
    
    // 2. Filtro de Categoria
    if (categoryFilter !== 'all') {
      if (categoryFilter === 'tameable' && !animal.tameable) return false;
      if (categoryFilter === 'breedable' && !animal.breedable) return false;
      if (categoryFilter !== 'tameable' && categoryFilter !== 'breedable' && animal.category !== categoryFilter) return false;
    }
    
    // 3. Filtro de Bioma
    if (biomeFilter !== 'all') {
      if (!animal.biomes || !animal.biomes.includes(biomeFilter)) return false;
    }
    
    // 4. Filtro de Progresso (Radio)
    if (progressFilter === 'owned' && !animal.obtained) return false;
    if (progressFilter === 'unowned' && animal.obtained) return false;
    
    // 5. Switches extras
    if (elements.toggleHideObtained.checked && animal.obtained) return false;
    
    if (elements.toggleMissingPairs.checked) {
      if (!animal.breedable) return false;
      if (animal.hasPair) return false;
    }
    
    if (elements.toggleMissingTame.checked) {
      if (!animal.tameable) return false;
      if (animal.tamed) return false;
    }
    
    return true;
  });
}

// Cria a árvore DOM para um card de animal individual
function createAnimalCard(animal) {
  const card = document.createElement('div');
  card.className = 'animal-card';
  card.setAttribute('data-id', animal.id);
  card.setAttribute('data-category', animal.category);
  
  // Imagem e Badges
  const media = document.createElement('div');
  media.className = 'card-media';
  
  const badgeCat = document.createElement('span');
  badgeCat.className = 'badge-category';
  badgeCat.textContent = animal.category;
  media.appendChild(badgeCat);
  
  if (animal.selectedVariant && animal.selectedVariant.trim() !== "") {
    const badgeVar = document.createElement('span');
    badgeVar.className = 'badge-variant';
    badgeVar.textContent = animal.selectedVariant;
    media.appendChild(badgeVar);
  }
  
  // Botão de Editar flutuante
  const editBtn = document.createElement('button');
  editBtn.className = 'btn-edit-card';
  editBtn.innerHTML = '✏️';
  editBtn.title = "Editar Detalhes";
  editBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openEditModal(animal.id);
  });
  media.appendChild(editBtn);
  
  const imgContainer = document.createElement('div');
  imgContainer.className = 'animal-image-container';
  
  const img = document.createElement('img');
  img.className = 'animal-image';
  img.alt = animal.name;
  img.src = animal.image || '';
  img.onerror = () => handleImageError(img, animal.name);
  imgContainer.appendChild(img);
  media.appendChild(imgContainer);
  
  // Toggles de Ações Rápidas no Card (Direita Flutuante)
  const quickActions = document.createElement('div');
  quickActions.className = 'card-quick-actions';
  
  // 1. Obtido (Checkmark)
  const btnObt = document.createElement('button');
  btnObt.className = `quick-action-btn qa-obtained ${animal.obtained ? 'active' : ''}`;
  btnObt.innerHTML = '✔️';
  btnObt.title = animal.obtained ? 'Marcado como Já Tenho' : 'Marcar como Já Tenho';
  btnObt.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleAnimalState(animal.id, 'obtained');
  });
  quickActions.appendChild(btnObt);
  
  // 2. Casal (Coração)
  const btnPair = document.createElement('button');
  btnPair.className = `quick-action-btn qa-pair ${animal.hasPair ? 'active' : ''} ${!animal.breedable ? 'disabled' : ''}`;
  btnPair.innerHTML = '❤️';
  btnPair.title = !animal.breedable ? 'Não é Procriável' : (animal.hasPair ? 'Marcado como Casal Pronto' : 'Marcar como Casal Pronto');
  btnPair.addEventListener('click', (e) => {
    e.stopPropagation();
    if (animal.breedable) toggleAnimalState(animal.id, 'hasPair');
  });
  quickActions.appendChild(btnPair);
  
  // 3. Domesticado (Osso)
  const btnTame = document.createElement('button');
  btnTame.className = `quick-action-btn qa-tamed ${animal.tamed ? 'active' : ''} ${!animal.tameable ? 'disabled' : ''}`;
  btnTame.innerHTML = '🦴';
  btnTame.title = !animal.tameable ? 'Não é Domesticável' : (animal.tamed ? 'Marcado como Domesticado' : 'Marcar como Domesticado');
  btnTame.addEventListener('click', (e) => {
    e.stopPropagation();
    if (animal.tameable) toggleAnimalState(animal.id, 'tamed');
  });
  quickActions.appendChild(btnTame);
  
  media.appendChild(quickActions);
  card.appendChild(media);
  
  // Informações de Texto
  const info = document.createElement('div');
  info.className = 'card-info';
  
  const name = document.createElement('h3');
  name.className = 'animal-name';
  name.textContent = animal.name;
  info.appendChild(name);
  
  const biomesText = document.createElement('span');
  biomesText.className = 'animal-biomes';
  biomesText.textContent = animal.biomes && animal.biomes.length > 0 ? animal.biomes.join(', ') : 'Nenhum Bioma Especificado';
  info.appendChild(biomesText);
  card.appendChild(info);
  
  // Barra de status no rodapé
  const footer = document.createElement('div');
  footer.className = 'card-footer-status';
  
  const stateObt = document.createElement('span');
  stateObt.className = `footer-status-item status-check ${animal.obtained ? 'active' : ''}`;
  stateObt.innerHTML = `✔️ ${animal.obtained ? 'Tenho' : 'Não'}`;
  footer.appendChild(stateObt);
  
  if (animal.breedable) {
    const statePair = document.createElement('span');
    statePair.className = `footer-status-item status-heart ${animal.hasPair ? 'active' : ''}`;
    statePair.innerHTML = `❤️ ${animal.hasPair ? 'Casal' : 'Falta'}`;
    footer.appendChild(statePair);
  }
  
  if (animal.tameable) {
    const stateTame = document.createElement('span');
    stateTame.className = `footer-status-item status-tame ${animal.tamed ? 'active' : ''}`;
    stateTame.innerHTML = `🦴 ${animal.tamed ? 'Domado' : 'Selvagem'}`;
    footer.appendChild(stateTame);
  }
  
  card.appendChild(footer);
  
  // Clique no card abre modal de edição geral
  card.addEventListener('click', () => {
    openEditModal(animal.id);
  });
  
  return card;
}

// Alternar status rápido no card (Check, Coração, Osso)
function toggleAnimalState(id, prop) {
  const index = animalsData.findIndex(a => a.id === id);
  if (index !== -1) {
    // Inverte a propriedade booleana
    animalsData[index][prop] = !animalsData[index][prop];
    
    // Regra lógica: Se você tem o casal ou ele está domesticado, presume-se que você "Já tem" o animal
    if (prop === 'hasPair' && animalsData[index].hasPair) {
      animalsData[index].obtained = true;
    }
    if (prop === 'tamed' && animalsData[index].tamed) {
      animalsData[index].obtained = true;
    }
    
    saveData();
  }
}

// ==========================================================================
// 5. MODAL DE ADICIONAR / EDITAR
// ==========================================================================

function openEditModal(id) {
  const animal = animalsData.find(a => a.id === id);
  if (!animal) return;
  
  elements.modalTitle.textContent = "Editar Animal";
  elements.modalAnimalId.value = animal.id;
  elements.modalName.value = animal.name;
  elements.modalEnglishName.value = animal.englishName || '';
  elements.modalCategory.value = animal.category;
  elements.modalImage.value = animal.image || '';
  elements.modalBiomes.value = animal.biomes ? animal.biomes.join(', ') : '';
  elements.modalTameable.checked = animal.tameable || false;
  elements.modalBreedable.checked = animal.breedable || false;
  
  // Tracking
  elements.modalObtained.checked = animal.obtained || false;
  elements.modalHasPair.checked = animal.hasPair || false;
  elements.modalTamed.checked = animal.tamed || false;
  
  // Detalhes extras
  elements.modalVariantsList.value = animal.variants ? animal.variants.join(', ') : '';
  elements.modalColor.value = animal.color || '';
  elements.modalCoordinates.value = animal.coordinates || '';
  elements.modalNotes.value = animal.notes || '';
  
  // Configurar dropdown de variante obtida
  setupVariantDropdown(animal.variants, animal.selectedVariant);
  
  // Visibilidade de botões
  elements.btnDeleteAnimal.style.display = 'block';
  
  // Ajusta a visibilidade dos toggles com base nas propriedades do animal
  adjustModalTogglesVisibility();
  
  elements.animalModal.style.display = 'flex';
}

function openAddModal() {
  elements.modalTitle.textContent = "Adicionar Novo Animal";
  elements.modalAnimalId.value = "";
  elements.animalForm.reset();
  
  // Resetar tracking manual
  elements.modalObtained.checked = false;
  elements.modalHasPair.checked = false;
  elements.modalTamed.checked = false;
  
  // Limpar select de variantes
  elements.modalSelectedVariant.innerHTML = '<option value="">Nenhuma / Padrão</option>';
  
  // Esconder botão de deletar
  elements.btnDeleteAnimal.style.display = 'none';
  
  // Ajustar visibilidades iniciais
  adjustModalTogglesVisibility();
  
  elements.animalModal.style.display = 'flex';
}

// Mostra ou esconde campos específicos conforme caixas de seleção
function adjustModalTogglesVisibility() {
  const isTameable = elements.modalTameable.checked;
  const isBreedable = elements.modalBreedable.checked;
  
  document.getElementById('card-toggle-tamed').style.opacity = isTameable ? '1' : '0.4';
  elements.modalTamed.disabled = !isTameable;
  if (!isTameable) elements.modalTamed.checked = false;
  
  document.getElementById('card-toggle-pair').style.opacity = isBreedable ? '1' : '0.4';
  elements.modalHasPair.disabled = !isBreedable;
  if (!isBreedable) elements.modalHasPair.checked = false;
}

// Configura o select das variantes no modal de edição
function setupVariantDropdown(variants, selectedValue) {
  elements.modalSelectedVariant.innerHTML = '<option value="">Nenhuma / Padrão</option>';
  
  if (variants && variants.length > 0) {
    variants.forEach(variant => {
      const option = document.createElement('option');
      option.value = variant;
      option.textContent = variant;
      if (variant === selectedValue) {
        option.selected = true;
      }
      elements.modalSelectedVariant.appendChild(option);
    });
  }
}

// Salva as alterações feitas no modal (Criar ou Editar)
function handleModalSubmit(e) {
  e.preventDefault();
  
  const id = elements.modalAnimalId.value;
  const name = elements.modalName.value.trim();
  const englishName = elements.modalEnglishName.value.trim();
  const category = elements.modalCategory.value;
  const image = elements.modalImage.value.trim();
  
  // Transforma lista de biomas separados por vírgula em array
  const biomes = elements.modalBiomes.value
    .split(',')
    .map(b => b.trim())
    .filter(b => b !== '');
    
  // Transforma variantes em array
  const variants = elements.modalVariantsList.value
    .split(',')
    .map(v => v.trim())
    .filter(v => v !== '');

  const tameable = elements.modalTameable.checked;
  const breedable = elements.modalBreedable.checked;
  
  let obtained = elements.modalObtained.checked;
  let hasPair = elements.modalHasPair.checked;
  let tamed = elements.modalTamed.checked;
  
  // Regras de validação de progresso
  if (hasPair && breedable) obtained = true;
  if (tamed && tameable) obtained = true;
  
  const selectedVariant = elements.modalSelectedVariant.value;
  const color = elements.modalColor.value.trim();
  const coordinates = elements.modalCoordinates.value.trim();
  const notes = elements.modalNotes.value.trim();
  
  if (id === "") {
    // Criando NOVO animal
    const newId = name.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .replace(/[^a-z0-9]+/g, '_')     // substitui caracteres especiais por underline
      .replace(/^_+|_+$/g, '');        // limpa underlines extras
      
    // Verifica se já existe um animal com o mesmo ID
    if (animalsData.some(a => a.id === newId)) {
      alert("Já existe um animal com um identificador semelhante! Modifique o nome.");
      return;
    }
    
    const newAnimal = {
      id: newId,
      name,
      englishName,
      image: image || `https://minecraft.wiki/images/${englishName.replace(/\s+/g, '_')}_JE2_BE2.png`,
      tameable,
      breedable,
      category,
      biomes,
      variants,
      obtained,
      hasPair,
      tamed,
      selectedVariant,
      color,
      notes,
      coordinates
    };
    
    animalsData.push(newAnimal);
  } else {
    // Editando animal EXISTENTE
    const index = animalsData.findIndex(a => a.id === id);
    if (index !== -1) {
      animalsData[index] = {
        ...animalsData[index],
        name,
        englishName,
        image: image || animalsData[index].image || '',
        category,
        biomes,
        variants,
        tameable,
        breedable,
        obtained,
        hasPair,
        tamed,
        selectedVariant,
        color,
        notes,
        coordinates
      };
    }
  }
  
  // Salva no banco de dados e fecha modal
  saveData();
  populateBiomeFilter();
  elements.animalModal.style.display = 'none';
}

// Exclui o animal selecionado do banco de dados
function deleteCurrentAnimal() {
  const id = elements.modalAnimalId.value;
  if (id === "") return;
  
  const animal = animalsData.find(a => a.id === id);
  if (confirm(`Tem certeza que deseja excluir o animal "${animal.name}" do catálogo?`)) {
    animalsData = animalsData.filter(a => a.id !== id);
    saveData();
    populateBiomeFilter();
    elements.animalModal.style.display = 'none';
  }
}

// ==========================================================================
// 6. EVENTOS E COMPORTAMENTOS DO USUÁRIO
// ==========================================================================

function setupEventListeners() {
  // Toolbar ações principais
  elements.btnAddAnimal.addEventListener('click', openAddModal);
  
  elements.btnExportJson.addEventListener('click', exportDatabase);
  
  elements.inputImportJson.addEventListener('change', importDatabase);
  
  elements.btnReset.addEventListener('click', resetTracking);
  
  // Modais de ação
  elements.closeModal.addEventListener('click', () => {
    elements.animalModal.style.display = 'none';
  });
  
  elements.btnCancelModal.addEventListener('click', (e) => {
    e.preventDefault();
    elements.animalModal.style.display = 'none';
  });
  
  elements.btnDeleteAnimal.addEventListener('click', (e) => {
    e.preventDefault();
    deleteCurrentAnimal();
  });
  
  elements.animalForm.addEventListener('submit', handleModalSubmit);
  
  // Ouvintes de alteração nos checkboxes/campos de tameable e breedable no modal
  elements.modalTameable.addEventListener('change', adjustModalTogglesVisibility);
  elements.modalBreedable.addEventListener('change', adjustModalTogglesVisibility);
  
  // Quando edita a lista de variantes no input de texto do modal, atualiza o dropdown correspondente
  elements.modalVariantsList.addEventListener('input', () => {
    const list = elements.modalVariantsList.value
      .split(',')
      .map(v => v.trim())
      .filter(v => v !== '');
    setupVariantDropdown(list, elements.modalSelectedVariant.value);
  });

  // Filtros dinâmicos em tempo real
  elements.searchBox.addEventListener('input', () => {
    elements.btnClearSearch.style.display = elements.searchBox.value !== "" ? 'block' : 'none';
    renderGrid();
  });
  
  elements.btnClearSearch.addEventListener('click', () => {
    elements.searchBox.value = "";
    elements.btnClearSearch.style.display = 'none';
    renderGrid();
  });
  
  elements.filterCategory.addEventListener('change', renderGrid);
  elements.filterBiome.addEventListener('change', renderGrid);
  
  // Radio buttons do progresso
  const radios = document.querySelectorAll('input[name="progress-filter"]');
  radios.forEach(radio => {
    radio.addEventListener('change', renderGrid);
  });
  
  // Toggles e Switches da Sidebar
  elements.toggleHideObtained.addEventListener('change', renderGrid);
  elements.toggleMissingPairs.addEventListener('change', renderGrid);
  elements.toggleMissingTame.addEventListener('change', renderGrid);
  
  elements.toggleGroupCategory.addEventListener('change', () => {
    if (elements.toggleGroupCategory.checked) {
      elements.toggleGroupBiome.checked = false;
    }
    renderGrid();
  });
  
  elements.toggleGroupBiome.addEventListener('change', () => {
    if (elements.toggleGroupBiome.checked) {
      elements.toggleGroupCategory.checked = false;
    }
    renderGrid();
  });

  // Modo de fidelidade baixa (Simula o layout sem gradiente de cores)
  elements.toggleLowFidelity.addEventListener('change', () => {
    if (elements.toggleLowFidelity.checked) {
      document.body.classList.add('low-fidelity');
    } else {
      document.body.classList.remove('low-fidelity');
    }
  });

  // Fechar modal clicando fora dele
  window.addEventListener('click', (e) => {
    if (e.target === elements.animalModal) {
      elements.animalModal.style.display = 'none';
    }
  });
}

// ==========================================================================
// 7. EXPORTAÇÃO, IMPORTAÇÃO E RESET DE DADOS
// ==========================================================================

// Exporta o banco de dados atual completo como um arquivo JSON baixável
function exportDatabase() {
  const jsonString = JSON.stringify(animalsData, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const tempLink = document.createElement("a");
  tempLink.href = url;
  tempLink.download = "minecraft_animals_db.json";
  
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  URL.revokeObjectURL(url);
}

// Importa um arquivo JSON para substituir o banco de dados atual
function importDatabase(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const importedData = JSON.parse(evt.target.result);
      
      if (!Array.isArray(importedData)) {
        throw new Error("O arquivo JSON deve conter um array de animais.");
      }
      
      // Validação básica do primeiro elemento
      if (importedData.length > 0) {
        const item = importedData[0];
        if (!item.id || !item.name || !item.category) {
          throw new Error("O formato do banco de dados de animais está incorreto.");
        }
      }
      
      if (confirm(`Deseja substituir sua lista atual por esta importada com ${importedData.length} animais?`)) {
        animalsData = importedData;
        saveData();
        populateBiomeFilter();
        alert("Banco de dados importado e salvo com sucesso!");
      }
    } catch (err) {
      alert("Erro ao decodificar JSON: " + err.message);
    }
  };
  
  reader.readAsText(file);
  // Limpa o input file para permitir novas importações do mesmo arquivo
  elements.inputImportJson.value = '';
}

// Zera apenas as informações de progresso do usuário no catálogo
function resetTracking() {
  if (confirm("ATENÇÃO: Isso irá zerar todas as suas marcações de captura, casais formados, domesticação, notas e coordenadas. O catálogo de animais continuará intacto. Deseja prosseguir?")) {
    animalsData = animalsData.map(animal => ({
      ...animal,
      obtained: false,
      hasPair: false,
      tamed: false,
      selectedVariant: "",
      color: "",
      notes: "",
      coordinates: ""
    }));
    saveData();
  }
}

// Inicializar aplicativo no carregamento do DOM
document.addEventListener('DOMContentLoaded', init);
