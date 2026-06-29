import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const productGroups = [
  {
    title: 'Cardiology',
    image: 'category-cardiology.png',
    sections: [
      {
        title: 'Lipid Lowering Drug',
        medicines: [
          'Lentor 10mg (Atorvastatin 10mg)',
          'Lentor 20mg (Atorvastatin 20mg)',
          'Lentor 40mg (Atorvastatin 40mg)',
          'Lentor 80mg (Atorvastatin 80mg)',
          'Lentor F (Atorvastatin 10mg + Micronized Fenofibrate 160mg)',
          'Rosulen 5mg (Rosuvastatin 5mg)',
          'Rosulen 10mg (Rosuvastatin 10mg)',
        ],
      },
      {
        title: 'Anti-Anginal Drug',
        medicines: ['NIC 5mg (Nicorandil Tablets)'],
      },
      {
        title: 'HCN Channel Blocker',
        medicines: ['Ivalen 5mg (Ivabradine 5mg)'],
      },
      {
        title: 'Vasodilator',
        medicines: ['Vasolazine (Isosorbide Dinitrate 20mg + Hydralazine 37.5mg)'],
      },
    ],
  },
  {
    title: 'Diabetology',
    image: 'category-diabetology.png',
    sections: [
      {
        title: 'Anti-Diabetics',
        medicines: [
          'Lemet G1 (Glimepiride 1mg + Metformin 500mg)',
          'Lemet G2 (Glimepiride 2mg + Metformin 500mg)',
          'Sitamen 50mg (Sitagliptin 50mg)',
          'Sitamen Plus (Sitagliptin 50mg + Metformin 500mg)',
          'Sitamen Forte (Sitagliptin 50mg + Metformin 1000mg)',
        ],
      },
    ],
  },
  {
    title: 'Hematology',
    image: 'category-hematology.png',
    sections: [
      {
        title: 'Anti-Coagulant',
        medicines: [
          'Parinex 40mg (Enoxaparin Sodium Injection 40mg)',
          'Parinex 60mg (Enoxaparin Sodium Injection 60mg)',
        ],
      },
      {
        title: 'Anti-Platelet',
        medicines: ['Lengrel-75mg (Clopidogrel 75mg)'],
      },
    ],
  },
  {
    title: 'Gastroenterology',
    image: 'category-gastroenterology.png',
    sections: [
      {
        title: 'Anti-Ulcerants',
        medicines: [
          'Pantolen 40mg (Pantoprazole 40mg Tablets)',
          'Pantolen-D (Pantoprazole 40mg + Domperidone SR 30mg)',
        ],
      },
    ],
  },
  {
    title: 'Hypertension',
    image: 'category-hypertension.png',
    sections: [
      {
        title: 'Anti-hypertensive',
        medicines: [
          'Telimen 40mg (Telmisartan Tablets IP 40mg)',
          'Telimen H40 (Telmisartan 40mg + Hydrochlorothiazide 12.5mg)',
          'Cili 5mg (Cilnidipine tablets 5mg)',
          'Cili 10mg (Cilnidipine tablets 10mg)',
          'Cili 20mg (Cilnidipine tablets 20mg)',
          'Cili-T (Cilnidipine 10mg + Telmisartan 40mg)',
          'Betarun XL 25mg (Metoprolol Succinate 25mg)',
          'Betarun XL 50mg (Metoprolol Succinate 50mg)',
        ],
      },
    ],
  },
  {
    title: 'Urology',
    image: 'category-urology.png',
    sections: [
      {
        title: 'Anti-Hyperuricemic',
        medicines: ['Febulen 40mg (Febuxostat 40mg)'],
      },
    ],
  },
  {
    title: 'Pain Management',
    image: 'category-pain.png',
    sections: [
      {
        title: 'Corticosteroid',
        medicines: ['Defalen 6mg (Deflazacort 6mg)'],
      },
    ],
  },
  {
    title: 'Respiratory',
    image: 'category-respiratory.png',
    sections: [
      {
        title: 'Anti-Histamine',
        medicines: [
          'LUKA-LC (Levocetirizine 5mg + Montelukast 10mg tablet)',
          'Bilaget (Bilastine 20mg Tablet)',
          'Bilaget M (Bilastine 20 mg + Montelukast 10mg)',
        ],
      },
      {
        title: 'Bronchodilator',
        medicines: [
          'ACBC 100 (Acebrophylline SR 100mg)',
          'ACBC 200 (Acebrophylline SR 200mg)',
          'ACBC-N (Acebrophylline 100mg + Acetylcysteine 600mg)',
        ],
      },
    ],
  },
];

const productImageRules = [
  [/Lentor 10mg/i, 'lentor-10mg.png'],
  [/Lentor 20mg/i, 'lentor-20mg.png'],
  [/Lentor 40mg/i, 'lentor-40mg.png'],
  [/Lentor 80mg/i, 'lentor-80mg.jpg'],
  [/Lentor F/i, 'lentor-f.jpg'],
  [/Cili 5mg/i, 'cili-5mg.jpg'],
  [/Cili 10mg/i, 'cili-10mg.jpg'],
  [/Cili 20mg/i, 'cili-20mg.jpg'],
  [/Cili-T/i, 'cili-t.jpg'],
  [/Cili/i, 'cili-5-10-20-logo.png'],
  [/Telimen H40/i, 'telimen-h40.jpg'],
  [/Telimen/i, 'telimen-40mg.jpg'],
  [/LUKA-LC/i, 'luka-lc.png'],
  [/Pantolen\s*40/i, 'pantolen-40mg.jpg'],
  [/Betarun XL 25mg/i, 'betarun-xl-25mg.png'],
  [/Betarun XL 50mg/i, 'betarun-xl-50mg.jpg'],
  [/Betarun/i, 'betarun-xl-25mg.png'],
  [/Lemet G1/i, 'lemet-g1.jpg'],
  [/Lemet G2/i, 'lemet-g2.jpg'],
  [/Defalen/i, 'defalen.png'],
  [/ACBC 100/i, 'acbc-100.jpg'],
  [/ACBC 200/i, 'acbc-200.jpg'],
  [/ACBC-N/i, 'acbc-n.jpg'],
  [/ACBC/i, 'acbc-100.jpg'],
  [/Bilaget\s*M/i, 'bilaget-m.jpg'],
  [/Bilaget/i, 'bilaget-20mg.jpg'],
  [/Ivalen/i, 'ivalen-5mg.jpg'],
  [/Vasolazine/i, 'vasolazine.jpg'],
  [/Rosulen\s*5mg/i, 'rosulen-5mg.jpg'],
  [/Rosulen\s*10mg/i, 'rosulen-10mg.jpg'],
  [/NIC/i, 'nic-5mg.jpg'],
  [/Sitamen\s*Plus/i, 'sitamen-plus.jpg'],
  [/Sitamen\s*Forte/i, 'sitamen-forte.jpg'],
  [/Sitamen\s*50mg/i, 'sitamen-50mg.jpg'],
  [/Parinex\s*40mg/i, 'parinex-40mg.png'],
  [/Parinex\s*60mg/i, 'parinex-60mg.png'],
  [/Lengrel/i, 'lengrel-75mg.jpg'],
  [/Pantolen-D/i, 'pantolen-d.png'],
];

const productAccentPalette = [
  '#071B5A',
  '#00A6A6',
  '#1F6FEB',
  '#7C3AED',
  '#E11D48',
  '#0F766E',
  '#EA580C',
  '#2563EB',
];

function splitMedicineName(medicine) {
  const match = medicine.match(/^(.+?)\s*\((.+)\)$/)
  return {
    brand: match ? match[1].trim() : medicine,
    composition: match ? match[2].trim() : '',
  }
}

function getMedicineImage(medicine) {
  const match = productImageRules.find(([pattern]) => pattern.test(medicine))
  return match ? match[1] : ''
}

function getProductAccent(medicine) {
  const total = Array.from(medicine).reduce((sum, letter) => sum + letter.charCodeAt(0), 0)
  return productAccentPalette[total % productAccentPalette.length]
}

function getProductStrength(brand, composition) {
  const match = `${brand} ${composition}`.match(/(\d+(?:\.\d+)?)\s*mg/i)
  return match ? `${match[1]} mg` : 'As directed'
}

function getProductForm(composition) {
  const text = composition.toLowerCase()
  if (text.includes('injection')) return 'Injection'
  if (text.includes('capsule')) return 'Capsule'
  return 'Tablet'
}

async function main() {
  console.log('Seeding products...');
  
  // Clear existing products
  await prisma.product.deleteMany({});
  
  const allProducts = [];
  
  for (const group of productGroups) {
    for (const section of group.sections) {
      for (let i = 0; i < section.medicines.length; i++) {
        const medicine = section.medicines[i];
        const parsed = splitMedicineName(medicine);
        const image = getMedicineImage(medicine);
        const accent = getProductAccent(medicine);
        const strength = getProductStrength(parsed.brand, parsed.composition);
        const form = getProductForm(parsed.composition);
        const featured = i === 0 || /Lentor|Telimen|Pantolen|Cili|Sitamen|Vasolazine/i.test(parsed.brand);
        
        allProducts.push({
          brand: parsed.brand,
          composition: parsed.composition,
          section: section.title,
          group: group.title,
          image: image || null,
          accent: accent,
          strength: strength,
          form: form,
          featured: featured,
          description: null
        });
      }
    }
  }
  
  for (const prod of allProducts) {
    await prisma.product.create({
      data: prod
    });
  }
  
  console.log(`Seeded ${allProducts.length} products successfully.`);
  
  
  // Clear applicants table
  console.log('Clearing applicants...');
  await prisma.applicant.deleteMany({});

  // Clear jobs table
  console.log('Clearing jobs...');
  await prisma.job.deleteMany({});
  
  // Clear leads table
  console.log('Clearing leads...');
  await prisma.lead.deleteMany({});

  // Clear news table
  console.log('Clearing news...');
  await prisma.news.deleteMany({});

  console.log('Seeding news articles...');
  const newsArticles = [
    {
      title: 'Lenimen Biotech announces expansion of marketing team in South India',
      content: 'In line with our clinical expansion plans, Lenimen Biotech has announced a strategic expansion of its pharmaceutical sales and marketing team across Kerala, Tamil Nadu, and Karnataka. This initiative aims to improve accessibility of our chronic care portfolios to clinics, hospitals, and primary pharmacies.',
      image: 'hero-pharmacist-smiling.jpg',
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
      title: 'Formulation development milestones achieved for Rosulen series',
      content: 'Our research partners have successfully completed stability trials for the next generation of Rosulen series anti-hypertensive combination therapies. These milestones ensure strict bio-equivalence and compliance with international pharmacopoeia standards.',
      image: 'research-lab.png',
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    }
  ]

  for (const n of newsArticles) {
    await prisma.news.create({ data: n })
  }
  console.log('Seeded news successfully.')
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
