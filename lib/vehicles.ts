export type VehicleType = "new" | "preowned" | "hypercar" | "suv" | "coupe" | "electric" | "sedan" | "luxury";

export type Spec = { label: string; value: string; highlight?: boolean };

export type Vehicle = {
  slug: string;
  make: string;
  makeKey: string;
  series: string;
  name: string;
  year: string;
  summary: string;
  image: string;
  altImage?: string;
  badges: [string, string];
  cornerTag: string;
  specs: [Spec, Spec, Spec];
  price: number;
  priceLabel: string;
  monthly?: number;
  body: "coupe" | "suv" | "sedan" | "convertible";
  types: VehicleType[];
  mileage: string;
  details: Spec[];
  features: string[];
  description: string;
};

export const vehicles: Vehicle[] = [
  {
    slug: "range-rover-sport-autobiography",
    make: "Land Rover",
    makeKey: "land-rover",
    series: "sport",
    name: "Range Rover Sport Autobiography",
    year: "2025 Model",
    summary: "3.0L Turbocharged I6 • Santorini Black • Caraway Semi-Aniline Leather",
    image: "/images/range-rover-sport.jpg",
    altImage: "/images/m-cat-suv.jpg",
    badges: ["New Arrival", "GCC Spec"],
    cornerTag: "1-Year Vantage Warranty",
    specs: [
      { label: "Mileage", value: "8,500 KM" },
      { label: "Engine", value: "395 HP" },
      { label: "Gearbox", value: "8-Spd Auto" },
    ],
    price: 425000,
    priceLabel: "Acquisition Price",
    body: "suv",
    types: ["new", "suv"],
    mileage: "8,500 KM",
    details: [
      { label: "Engine", value: "3.0L Turbo I6 MHEV" },
      { label: "Power / Torque", value: "395 HP / 550 Nm" },
      { label: "0-100 KM/H", value: "5.7 Seconds", highlight: true },
      { label: "Transmission", value: "8-Spd Automatic" },
      { label: "Drivetrain", value: "Intelligent AWD" },
      { label: "Top Velocity", value: "242 KM/H" },
    ],
    features: ["Meridian Signature Sound", "Dynamic Air Suspension", "Panoramic Roof", "Cabin Air Purification Pro"],
    description:
      "Finished in Santorini Black over Caraway semi-aniline leather, this Autobiography arrives with full agency history and a 1-year Vantage warranty.",
  },
  {
    slug: "mercedes-amg-g63-magno",
    make: "Mercedes-AMG",
    makeKey: "mercedes",
    series: "gwagon",
    name: "G 63 AMG Magno Edition",
    year: "2024 Model",
    summary: "4.0L Bi-Turbo V8 • Night Black Magno • Bengal Red Diamond Stitched Nappa",
    image: "/images/g63-magno.jpg",
    altImage: "/images/m-g63.jpg",
    badges: ["Verified Single Owner", "GCC Spec"],
    cornerTag: "Agency Maintained",
    specs: [
      { label: "Mileage", value: "12,000 KM" },
      { label: "Output", value: "577 HP" },
      { label: "0-100 km/h", value: "4.5s" },
    ],
    price: 595000,
    priceLabel: "Acquisition Price",
    body: "suv",
    types: ["preowned", "suv"],
    mileage: "12,000 KM",
    details: [
      { label: "Engine", value: "4.0L Bi-Turbo V8" },
      { label: "Power / Torque", value: "577 HP / 850 Nm" },
      { label: "0-100 KM/H", value: "4.5 Seconds", highlight: true },
      { label: "Transmission", value: "9G-Tronic" },
      { label: "Drivetrain", value: "4MATIC AWD" },
      { label: "Top Velocity", value: "220 KM/H" },
    ],
    features: ["Magno Matte Paint", "Burmester Surround", "AMG Night Package", "Diamond Stitched Nappa"],
    description:
      "A single-owner, agency-maintained G 63 in Night Black Magno with a Bengal Red diamond-stitched Nappa cabin.",
  },
  {
    slug: "bmw-760i-xdrive-m-sport",
    make: "BMW Motorsport",
    makeKey: "bmw",
    series: "7series",
    name: "BMW 760i xDrive M Sport",
    year: "2025 Model",
    summary: "4.4L Twin-Turbo V8 • Frozen Deep Grey • Cashmere Wool / Merino Interior",
    image: "/images/bmw-760i.jpg",
    badges: ["Executive Saloon", "GCC Spec"],
    cornerTag: "31-Inch Theater Screen",
    specs: [
      { label: "Mileage", value: "6,500 KM" },
      { label: "Power", value: "536 HP" },
      { label: "Drivetrain", value: "AWD" },
    ],
    price: 410000,
    priceLabel: "Acquisition Price",
    body: "sedan",
    types: ["new", "sedan"],
    mileage: "6,500 KM",
    details: [
      { label: "Engine", value: "4.4L Twin-Turbo V8" },
      { label: "Power / Torque", value: "536 HP / 750 Nm" },
      { label: "0-100 KM/H", value: "4.2 Seconds", highlight: true },
      { label: "Transmission", value: "8-Spd Steptronic" },
      { label: "Drivetrain", value: "xDrive AWD" },
      { label: "Top Velocity", value: "250 KM/H" },
    ],
    features: ["31-Inch Theater Screen", "Executive Lounge Seating", "Bowers & Wilkins Diamond", "Crystal Headlights"],
    description:
      "First-class transit in Frozen Deep Grey with a Cashmere wool and Merino interior and the rear 31-inch Theater Screen.",
  },
  {
    slug: "porsche-911-carrera-4-gts",
    make: "Porsche",
    makeKey: "porsche",
    series: "911",
    name: "911 Carrera 4 GTS (992)",
    year: "2024 Model",
    summary: "3.0L Twin-Turbo Boxer 6 • Crayon Grey • Race-Tex Carbon Package",
    image: "/images/porsche-911-gts.jpg",
    altImage: "/images/m-911.jpg",
    badges: ["Pure Performance", "GCC Spec"],
    cornerTag: "Porsche Approved",
    specs: [
      { label: "Mileage", value: "9,200 KM" },
      { label: "0-100 km/h", value: "3.3s" },
      { label: "Top Speed", value: "309 KM/H" },
    ],
    price: 485000,
    priceLabel: "Acquisition Price",
    body: "coupe",
    types: ["preowned", "coupe"],
    mileage: "9,200 KM",
    details: [
      { label: "Engine", value: "3.0L Twin-Turbo Flat-6" },
      { label: "Power / Torque", value: "478 HP / 570 Nm" },
      { label: "0-100 KM/H", value: "3.3 Seconds", highlight: true },
      { label: "Transmission", value: "8-Spd PDK" },
      { label: "Drivetrain", value: "AWD" },
      { label: "Top Velocity", value: "309 KM/H" },
    ],
    features: ["Race-Tex Carbon Package", "Sport Chrono", "Rear-Axle Steering", "Bose Surround Sound"],
    description:
      "Crayon Grey Carrera 4 GTS with the Race-Tex carbon interior package and remaining Porsche Approved warranty.",
  },
  {
    slug: "ferrari-296-gtb-fiorano",
    make: "Ferrari Maranello",
    makeKey: "ferrari",
    series: "296gtb",
    name: "Ferrari 296 GTB Fiorano",
    year: "2024 Model",
    summary: "3.0L Hybrid Twin-Turbo V6 • Rosso Corsa • Carbon Racing Buckets",
    image: "/images/ferrari-296-gtb.jpg",
    altImage: "/images/m-ferrari-296.jpg",
    badges: ["Assetto Fiorano", "Hybrid V6"],
    cornerTag: "7-Year Maintenance",
    specs: [
      { label: "Mileage", value: "3,100 KM" },
      { label: "Power", value: "819 HP" },
      { label: "0-100 km/h", value: "2.9s" },
    ],
    price: 1450000,
    priceLabel: "Acquisition Price",
    body: "coupe",
    types: ["preowned", "hypercar", "coupe"],
    mileage: "3,100 KM",
    details: [
      { label: "Engine", value: "3.0L Twin-Turbo V6 PHEV" },
      { label: "Power / Torque", value: "819 HP / 740 Nm" },
      { label: "0-100 KM/H", value: "2.9 Seconds", highlight: true },
      { label: "Transmission", value: "8-Spd F1 DCT" },
      { label: "Drivetrain", value: "RWD" },
      { label: "Top Velocity", value: "330 KM/H" },
    ],
    features: ["Assetto Fiorano Package", "Carbon Racing Buckets", "Multimatic Shocks", "7-Year Maintenance"],
    description:
      "Rosso Corsa 296 GTB in Assetto Fiorano specification with carbon racing buckets and the balance of the 7-year maintenance programme.",
  },
  {
    slug: "rolls-royce-cullinan-ii",
    make: "Rolls-Royce Goodwood",
    makeKey: "rolls-royce",
    series: "cullinan",
    name: "Rolls-Royce Cullinan II",
    year: "2025 Series II",
    summary: "6.75L Twin-Turbo V12 • Diamond Black • Mandarin Orange Bespoke Leather",
    image: "/images/cullinan-ii.jpg",
    altImage: "/images/m-cullinan.jpg",
    badges: ["Black Badge", "Commissioned 2025"],
    cornerTag: "Shooting Star Headliner",
    specs: [
      { label: "Mileage", value: "1,800 KM" },
      { label: "Output", value: "592 HP" },
      { label: "Torque", value: "900 Nm" },
    ],
    price: 2350000,
    priceLabel: "Acquisition Price",
    body: "suv",
    types: ["new", "luxury", "suv"],
    mileage: "1,800 KM",
    details: [
      { label: "Engine", value: "6.75L Twin-Turbo V12" },
      { label: "Power / Torque", value: "592 HP / 900 Nm" },
      { label: "0-100 KM/H", value: "4.9 Seconds", highlight: true },
      { label: "Transmission", value: "8-Spd Automatic" },
      { label: "Drivetrain", value: "All-Wheel Drive" },
      { label: "Top Velocity", value: "250 KM/H" },
    ],
    features: ["Shooting Star Headliner", "Viewing Suite", "Bespoke Audio", "Mandarin Orange Leather"],
    description:
      "A 2025 Series II Black Badge commission in Diamond Black with Mandarin Orange bespoke leather and the Shooting Star headliner.",
  },
  {
    slug: "rolls-royce-spectre-ev",
    make: "Rolls-Royce Goodwood",
    makeKey: "rolls-royce",
    series: "spectre",
    name: "Rolls-Royce Spectre EV",
    year: "2025 Model",
    summary:
      "Zero miles • Chartreuse & Black Diamond • Starlight Doors with 4,796 Illuminated Stars • Deliverable Tomorrow.",
    image: "/images/spectre.jpg",
    altImage: "/images/m-cat-ev.jpg",
    badges: ["Goodwood Commission", "All-Electric"],
    cornerTag: "Deliverable Tomorrow",
    specs: [
      { label: "Mileage", value: "0 KM" },
      { label: "Output", value: "577 HP" },
      { label: "Range", value: "530 KM" },
    ],
    price: 2680000,
    priceLabel: "Vault Price",
    body: "coupe",
    types: ["new", "luxury", "electric", "coupe"],
    mileage: "0 KM",
    details: [
      { label: "Powertrain", value: "Dual-Motor Electric" },
      { label: "Power / Torque", value: "577 HP / 900 Nm" },
      { label: "0-100 KM/H", value: "4.5 Seconds", highlight: true },
      { label: "Range (WLTP)", value: "530 KM" },
      { label: "Drivetrain", value: "All-Wheel Drive" },
      { label: "Top Velocity", value: "250 KM/H" },
    ],
    features: ["Starlight Doors", "Chartreuse Two-Tone", "Illuminated Fascia", "Bespoke Audio"],
    description:
      "Zero-mile Goodwood commission in Chartreuse and Black Diamond, with Starlight Doors carrying 4,796 illuminated stars.",
  },
  {
    slug: "lamborghini-revuelto",
    make: "Lamborghini",
    makeKey: "lamborghini",
    series: "revuelto",
    name: "Lamborghini Revuelto",
    year: "2024 Model",
    summary: "2024 • 900 KM • Arancio Apodis • Full Monofuselage Carbon Chassis • 0-100 in 2.5 seconds.",
    image: "/images/revuelto.jpg",
    altImage: "/images/m-cat-supercars.jpg",
    badges: ["1,001 HP Hybrid V12", "Flagship Hypercar"],
    cornerTag: "Carbon Monofuselage",
    specs: [
      { label: "Mileage", value: "900 KM" },
      { label: "Power", value: "1,001 HP" },
      { label: "0-100 km/h", value: "2.5s" },
    ],
    price: 2850000,
    priceLabel: "Vault Price",
    body: "coupe",
    types: ["preowned", "hypercar", "luxury", "coupe"],
    mileage: "900 KM",
    details: [
      { label: "Engine", value: "6.5L V12 HPEV" },
      { label: "Power / Torque", value: "1,001 HP / 725 Nm" },
      { label: "0-100 KM/H", value: "2.5 Seconds", highlight: true },
      { label: "Transmission", value: "8-Spd DCT" },
      { label: "Drivetrain", value: "e-AWD" },
      { label: "Top Velocity", value: "350+ KM/H" },
    ],
    features: ["Monofuselage Carbon Chassis", "Arancio Apodis", "Carbon Aero Package", "Lifting System"],
    description: "Flagship hybrid V12 in Arancio Apodis with only 900 KM and the full monofuselage carbon chassis.",
  },
  {
    slug: "aston-martin-dbs-770-ultimate",
    make: "Aston Martin",
    makeKey: "aston-martin",
    series: "dbs",
    name: "Aston Martin DBS 770",
    year: "2024 Model",
    summary:
      "2024 • 1,400 KM • Satin Xenon Grey • 5.2L Twin-Turbo V12 • Semi-Aniline Leather with Fluted Quilting.",
    image: "/images/dbs-770.jpg",
    badges: ["1 of 300 Worldwide", "Collector Spec"],
    cornerTag: "Ultimate Edition",
    specs: [
      { label: "Mileage", value: "1,400 KM" },
      { label: "Power", value: "759 HP" },
      { label: "0-100 km/h", value: "3.4s" },
    ],
    price: 1890000,
    priceLabel: "Vault Price",
    body: "coupe",
    types: ["preowned", "luxury", "coupe"],
    mileage: "1,400 KM",
    details: [
      { label: "Engine", value: "5.2L Twin-Turbo V12" },
      { label: "Power / Torque", value: "759 HP / 900 Nm" },
      { label: "0-100 KM/H", value: "3.4 Seconds", highlight: true },
      { label: "Transmission", value: "8-Spd ZF Automatic" },
      { label: "Drivetrain", value: "RWD" },
      { label: "Top Velocity", value: "340 KM/H" },
    ],
    features: ["Satin Xenon Grey", "Fluted Quilting", "Carbon Ceramic Brakes", "Bang & Olufsen"],
    description: "One of 300 worldwide, finished in Satin Xenon Grey with semi-aniline leather and fluted quilting.",
  },
  {
    slug: "porsche-cayenne-turbo-gt",
    make: "Porsche",
    makeKey: "porsche",
    series: "cayenne",
    name: "Porsche Cayenne Turbo GT",
    year: "2025 Model",
    summary: "2025 Model • 7,800 KM • Single Private Owner • Dubai Registered",
    image: "/images/featured-porsche.png",
    badges: ["Vantage Spotlight", "GCC Spec"],
    cornerTag: "Porsche Approved",
    specs: [
      { label: "Mileage", value: "7,800 KM" },
      { label: "Power", value: "631 HP" },
      { label: "0-100 km/h", value: "3.3s" },
    ],
    price: 525000,
    priceLabel: "Cash Acquisition",
    monthly: 8420,
    body: "suv",
    types: ["preowned", "suv"],
    mileage: "7,800 KM",
    details: [
      { label: "Engine", value: "4.0L Bi-Turbo V8" },
      { label: "Power / Torque", value: "631 HP / 850 Nm" },
      { label: "0-100 KM/H", value: "3.3 Seconds", highlight: true },
      { label: "Transmission", value: "8-Spd Tiptronic S" },
      { label: "Drivetrain", value: "Active PTM AWD" },
      { label: "Top Velocity", value: "300 KM/H" },
    ],
    features: ["Carbon Ceramic Brakes (PCCB)", "Titanium Sports Exhaust", "Carbon Fiber Roof", "Rear-Axle Steering"],
    description:
      "Single private owner, Dubai registered, with Porsche Approved warranty coverage valid until 2028 across the GCC.",
  },
  {
    slug: "porsche-911-gt3-rs",
    make: "Porsche",
    makeKey: "porsche",
    series: "911",
    name: "Porsche 911 GT3 RS",
    year: "2024 Performance Marque",
    summary: "Stealth Satin Black • Weissach Package • Carbon-Ceramic Brakes • Zero Track Usage",
    image: "/images/m-spotlight-gt3rs.jpg",
    badges: ["Curator's Spotlight", "Weissach"],
    cornerTag: "Warranty Through 2028",
    specs: [
      { label: "Power", value: "518 HP" },
      { label: "0-100 km/h", value: "3.2s" },
      { label: "Top Speed", value: "296 KM/H" },
    ],
    price: 1680000,
    priceLabel: "VAT Included",
    body: "coupe",
    types: ["preowned", "hypercar", "coupe"],
    mileage: "2,400 KM",
    details: [
      { label: "Engine", value: "4.0L Naturally Aspirated Flat-6" },
      { label: "Power / Torque", value: "518 HP / 465 Nm" },
      { label: "0-100 KM/H", value: "3.2 Seconds", highlight: true },
      { label: "Transmission", value: "7-Spd PDK" },
      { label: "Drivetrain", value: "RWD" },
      { label: "Top Velocity", value: "296 KM/H" },
    ],
    features: ["Weissach Package", "Carbon-Ceramic Brakes", "DRS Rear Wing", "Clubsport Package"],
    description:
      "Finished in Stealth Satin Black with Weissach Package, carbon-ceramic composite braking system, and zero track usage. Full Dubai dealer warranty through 2028.",
  },
];

export const homeInventory = vehicles.slice(0, 6);
export const luxuryCollection = vehicles.filter((v) =>
  ["rolls-royce-spectre-ev", "lamborghini-revuelto", "aston-martin-dbs-770-ultimate"].includes(v.slug),
);
export const featuredVehicle = vehicles.find((v) => v.slug === "porsche-cayenne-turbo-gt")!;
export const spotlightVehicle = vehicles.find((v) => v.slug === "porsche-911-gt3-rs")!;
export const getVehicle = (slug: string) => vehicles.find((v) => v.slug === slug);

export const inventoryTabs: { key: "all" | VehicleType; label: string; count: number }[] = [
  { key: "all", label: "All", count: 84 },
  { key: "new", label: "New Arrivals", count: 28 },
  { key: "preowned", label: "Certified Pre-Owned", count: 56 },
  { key: "hypercar", label: "Hypercars & Luxury", count: 34 },
  { key: "suv", label: "SUVs", count: 31 },
  { key: "coupe", label: "Coupes", count: 22 },
  { key: "electric", label: "Electric Performance", count: 12 },
];

export const makeOptions = [
  { value: "all", label: "All Marques (84)" },
  { value: "porsche", label: "Porsche (18)" },
  { value: "rolls-royce", label: "Rolls-Royce (9)" },
  { value: "ferrari", label: "Ferrari (11)" },
  { value: "mercedes", label: "Mercedes-AMG (16)" },
  { value: "lamborghini", label: "Lamborghini (8)" },
  { value: "land-rover", label: "Land Rover (14)" },
  { value: "bentley", label: "Bentley (8)" },
  { value: "aston-martin", label: "Aston Martin (6)" },
  { value: "bmw", label: "BMW (10)" },
];

export const modelOptions = [
  { value: "all", label: "Any Model" },
  { value: "911", label: "911 GT3 / Turbo" },
  { value: "cullinan", label: "Cullinan Series II" },
  { value: "gwagon", label: "G 63 AMG Magno" },
  { value: "296gtb", label: "296 GTB / GTS" },
  { value: "sport", label: "Range Rover Sport" },
  { value: "revuelto", label: "Revuelto V12" },
];

export const priceOptions = [
  { value: "all", label: "Any Valuation", min: 0, max: Infinity },
  { value: "tier1", label: "Up to AED 500,000", min: 0, max: 500000 },
  { value: "tier2", label: "AED 500,000 - 1,000,000", min: 500000, max: 1000000 },
  { value: "tier3", label: "AED 1,000,000 - 2,500,000", min: 1000000, max: 2500000 },
  { value: "tier4", label: "AED 2,500,000+ (Hypercars)", min: 2500000, max: Infinity },
];

export const bodyOptions = [
  { value: "all", label: "All Profiles" },
  { value: "coupe", label: "Coupe / Supercar" },
  { value: "suv", label: "Performance SUV" },
  { value: "sedan", label: "Executive Saloon" },
  { value: "convertible", label: "Spider / Cabriolet" },
];

export type Filters = { type: string; make: string; model: string; price: string; body: string };

export const defaultFilters: Filters = { type: "all", make: "all", model: "all", price: "all", body: "all" };

export function filterVehicles(list: Vehicle[], f: Partial<Filters>) {
  const tier = priceOptions.find((p) => p.value === (f.price ?? "all")) ?? priceOptions[0];
  return list.filter(
    (v) =>
      (!f.type || f.type === "all" || v.types.includes(f.type as VehicleType)) &&
      (!f.make || f.make === "all" || v.makeKey === f.make) &&
      (!f.model || f.model === "all" || v.series === f.model) &&
      (!f.body || f.body === "all" || v.body === f.body) &&
      v.price >= tier.min &&
      v.price < tier.max,
  );
}

export type Category = {
  index: string;
  title: string;
  mobileTitle: string;
  text: string;
  image: string;
  mobileImage?: string;
  href: string;
  count: number;
};

export const categories: Category[] = [
  {
    index: "01 / Pinnacle Craft",
    title: "Luxury Cars",
    mobileTitle: "Luxury Cars",
    text: "Elegance without compromise • Rolls-Royce, Bentley, Maybach",
    image: "/images/cat-luxury.jpg",
    href: "/luxury-cars",
    count: 34,
  },
  {
    index: "02 / Grand Command",
    title: "Performance SUVs",
    mobileTitle: "Luxury SUVs",
    text: "Space. Power. Presence • G-Wagon, Range Rover, Urus, Cullinan",
    image: "/images/cat-suv.jpg",
    mobileImage: "/images/m-cat-suv.jpg",
    href: "/inventory?type=suv",
    count: 12,
  },
  {
    index: "03 / Apex Dynamics",
    title: "Sports & Hypercars",
    mobileTitle: "Supercars",
    text: "Engineered for pure sensation • 911 GT3, F8 Tributo, Huracán, Artura",
    image: "/images/cat-sports.jpg",
    mobileImage: "/images/m-cat-supercars.jpg",
    href: "/inventory?type=hypercar",
    count: 14,
  },
  {
    index: "04 / First-Class Transit",
    title: "Executive Saloons",
    mobileTitle: "Saloon Class",
    text: "Refined prestige for every journey • S-Class, 7-Series, Flying Spur",
    image: "/images/cat-saloon.jpg",
    mobileImage: "/images/m-cat-saloon.jpg",
    href: "/inventory?body=sedan",
    count: 7,
  },
  {
    index: "05 / The Electric Frontier",
    title: "Electric Vehicles",
    mobileTitle: "EV & Hybrid",
    text: "Silent authority and instantaneous torque • Taycan Turbo, Spectre, EQS",
    image: "/images/cat-electric.jpg",
    mobileImage: "/images/m-cat-ev.jpg",
    href: "/inventory?type=electric",
    count: 5,
  },
  {
    index: "06 / Certified Provenance",
    title: "Premium Used Cars",
    mobileTitle: "Pre-Owned",
    text: "Exceptional acquisitions. Verified value • 160-Point Comprehensive Inspection",
    image: "/images/cat-used.jpg",
    href: "/used-cars",
    count: 56,
  },
];

export const luxuryMarques = [
  { label: "Rolls-Royce", make: "rolls-royce" },
  { label: "Bentley", make: "bentley" },
  { label: "Ferrari", make: "ferrari" },
  { label: "Lamborghini", make: "lamborghini" },
  { label: "Aston Martin", make: "aston-martin" },
  { label: "Porsche", make: "porsche" },
  { label: "McLaren", make: "mclaren" },
  { label: "Maybach", make: "mercedes" },
];
