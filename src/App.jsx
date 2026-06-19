import { useEffect, useMemo, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Activity,
  ChevronDown,
  ChevronRight,
  FlaskConical,
  Grid3X3,
  Globe2,
  List,
  Mail,
  MapPin,
  Menu,
  Phone,
  RotateCcw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Smile,
  UsersRound,
  X,
} from 'lucide-react'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const navItems = ['Home', 'About Us', 'Products', 'Careers', 'Contact Us']

const company = {
  name: 'Lenimen Biotech Private Limited',
  shortName: 'Lenimen Biotech Pvt Ltd',
  cin: 'U24232KL2014PTC036433',
  year: '2014',
  type: 'Private Limited Company',
  industry: 'Pharmaceuticals & Biotechnology',
  registeredOffice: '2/76B, CKK Building, Thottumugham, Aluva, Ernakulam, Kerala - 683105',
  gstin: '32AACCL6612N1ZH',
  roc: 'Ernakulam',
  status: 'Active',
  email: 'info@lenimenbiotech.com',
  website: 'www.lenimen.com',
  landline: '0484 2633007',
  phones: ['+91 98464 00906', '+91 97445 55075'],
}

const directors = [
  'Pazhangat Kochumarakat Nazar',
  'Shahid Rahman Manthedath',
  'Abdul Rahman Parappath Shibili',
  'Midhul Sasidharan Nair',
  'Saji Subrahmanyan',
]

const missionPoints = [
  'To provide safe, effective, and affordable pharmaceutical products.',
  'To maintain the highest standards of quality and compliance.',
  'To build long-term relationships with healthcare professionals, institutions, and distributors.',
  'To expand market presence through ethical and sustainable business practices.',
]

const businessActivities = [
  'Pharmaceutical Formulations',
  'Generic Medicines',
  'Nutraceuticals',
  'Tablets & Capsules',
  'Healthcare Products',
  'Institutional Supply',
  'Pharma Marketing & Distribution',
  'Third-Party Manufacturing Support',
]

const strengths = [
  ['Quality Commitment', 'Stringent quality standards in sourcing, manufacturing, and distribution processes.'],
  ['Customer-Centric Approach', 'Long-term relationships with customers and healthcare partners remain a primary focus.'],
  ['Ethical Business Practices', 'Transparent, professional, and integrity-led operations.'],
  ['Growing Market Presence', 'Strengthening footprint in Kerala and expanding healthcare markets across India.'],
]

const careerFocus = [
  ['Pharma Marketing & Distribution', 'Field professionals who understand healthcare relationships and ethical market development.'],
  ['Institutional Supply Support', 'Coordinated service for hospitals, healthcare institutions, pharmacies, and distribution partners.'],
  ['Product & Portfolio Operations', 'People who can support pharmaceutical formulations, healthcare products, and therapeutic segments with accuracy.'],
]

const socialItems = ['facebook', 'twitter', 'linkedin', 'instagram']

const qualityJourney = [
  ['Source', 'Ethical sourcing and manufacturer collaboration for dependable formulations.'],
  ['Assure', 'Quality checks, compliance focus, and documentation-led supply discipline.'],
  ['Distribute', 'Marketing, distribution, and institutional supply across healthcare channels.'],
  ['Support', 'Customer-focused service with timely supply and long-term partner relationships.'],
]

const services = [
  ['service-formulation.png', 'Formulation Development & Commercial Manufacturing'],
  ['service-tech-transfer.png', 'Technology Transfer, Regulatory Documentation & Dossier Support'],
  ['service-research.png', 'Contract Research, Development & Manufacturing (CRDMO) Services'],
  ['service-batch.png', 'Exhibit Batch Development & Formulation Optimization'],
  ['service-contract.png', 'Third-Party Manufacturing & Supply Chain Solutions'],
  ['service-rd.png', 'DSIR-Recognized Research & Development Collaboration Network'],
]

const heroSlides = [
  {
    kicker: 'Pharmaceutical Marketing | Distribution | Healthcare Solutions',
    title: 'Transforming Ideas into Trusted Healthcare Solutions',
    subheading:
      'Lenimen Biotech Pvt. Ltd. delivers quality pharmaceutical formulations, healthcare products, and institutional supply solutions through trusted manufacturing partnerships and ethical business practices.',
    buttonLabel: 'Explore Products',
    target: 'Products',
    image: 'hero-pharmacist-smiling.jpg',
  },
  {
    kicker: 'Research & Market Intelligence',
    title: 'Driven by Innovation. Focused on Better Healthcare.',
    subheading:
      'We continuously evaluate therapeutic advancements, healthcare trends, and market opportunities to identify innovative pharmaceutical solutions that meet evolving patient and healthcare needs.',
    buttonLabel: 'Learn More',
    target: 'About Us',
    image: 'hero-pharmacist-checking.jpg',
  },
  {
    kicker: 'Over a Decade of Industry Experience',
    title: 'Building Trust Through Quality and Reliability',
    subheading:
      'With extensive experience in pharmaceutical marketing, distribution, and institutional supply, Lenimen Biotech is committed to delivering dependable healthcare solutions across India.',
    buttonLabel: 'Contact Our Team',
    target: 'Contact Us',
    image: 'hero-tablets-capsules.jpg',
  },
]

const trustMarkers = [
  ['GMP-Compliant Facilities', 'Manufacturing partners operating under GMP-aligned facility standards'],
  ['International Regulatory Standards', 'Globally recognized quality and regulatory expectations'],
  ['Quality Assurance Systems', 'Structured quality controls across manufacturing workflows'],
  ['Product Consistency', 'Reliable product standards from development through supply'],
  ['Supply Chain Reliability', 'Dependable manufacturing and delivery coordination'],
  ['Continuous Compliance Monitoring', 'Ongoing review of quality, documentation, and regulatory discipline'],
]

const therapeuticAreas = [
  {
    title: 'Cardiology',
    brands: [
      'Lentor',
      'Lentor-F',
      'Cili',
      'Cili-T',
      'NIC 5mg',
      'Ivalen',
      'Betarun',
      'Telimen',
      'Telimen H40',
      'Rosulen',
      'Lengrel-75mg',
      'Parinex',
      'Lemet',
      'Sitamen',
      'Vasolazine',
      'Pantolen',
      'Pantolen-D',
      'Febulen',
      'Defalen',
    ],
  },
  {
    title: 'Nephrology',
    brands: [
      'Cili',
      'Lentor',
      'Lentor-F',
      'NIC 5mg',
      'Ivalen',
      'Betarun',
      'Telimen',
      'Telimen H40',
      'Rosulen',
      'Lengrel-75mg',
      'Parinex',
      'Lemet',
      'Sitamen',
      'Pantolen',
      'Pantolen-D',
      'Febulen',
      'Defalen',
    ],
  },
  {
    title: 'General Medicine',
    brands: [
      'Lentor',
      'Lentor-F',
      'Cili',
      'Cili-T',
      'Telimen',
      'Telimen H40',
      'Rosulen',
      'Lemet',
      'Sitamen',
      'Vasolazine',
      'Pantolen',
      'Pantolen-D',
      'Febulen',
      'Defalen',
      'Lengrel-75mg',
      'Parinex',
      'NIC 5mg',
      'Ivalen',
      'Betarun',
      'LUKA-LC',
      'Bilaget',
      'Bilaget M',
      'ACBC',
      'ACBC-N',
    ],
  },
  {
    title: 'Orthopaedics',
    brands: ['Defalen', 'Parinex', 'Febulen', 'Pantolen', 'Pantolen-D'],
  },
  {
    title: 'Gynaecology',
    brands: ['Parinex', 'Pantolen', 'Pantolen-D'],
  },
  {
    title: 'ENT',
    brands: ['Defalen', 'Pantolen', 'Pantolen-D', 'LUKA-LC', 'Bilaget', 'Bilaget M'],
  },
  {
    title: 'Neurology',
    brands: [
      'Parinex',
      'Lengrel-75mg',
      'Lentor',
      'Lentor-F',
      'Cili',
      'Rosulen',
      'Lemet',
      'Sitamen',
      'Pantolen',
      'Pantolen-D',
      'Febulen',
    ],
  },
  {
    title: 'Gastroenterology',
    brands: ['Pantolen', 'Pantolen-D'],
  },
]

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
        title: 'Anti- Ulcerants',
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
]

const productCategoryMeta = {
  Cardiology: {
    icon: Activity,
    description: 'Medicines for heart health, blood pressure, cholesterol, and cardiac risk management.',
  },
  Diabetology: {
    icon: FlaskConical,
    description: 'Anti-diabetic formulations supporting blood sugar management and metabolic care.',
  },
  Hematology: {
    icon: ShieldCheck,
    description: 'Therapies for coagulation support, platelet management, and hematological care.',
  },
  Gastroenterology: {
    icon: Smile,
    description: 'Treatments for digestive health and gastrointestinal disorders.',
  },
  Hypertension: {
    icon: Activity,
    description: 'Blood pressure management products across established anti-hypertensive classes.',
  },
  Urology: {
    icon: Globe2,
    description: 'Focused urology care for urinary tract and hyperuricemic conditions.',
  },
  'Pain Management': {
    icon: UsersRound,
    description: 'Relief-oriented formulations for acute and chronic pain management needs.',
  },
  Respiratory: {
    icon: FlaskConical,
    description: 'Respiratory care products for allergy, bronchodilation, and airway support.',
  },
}

const categoryHeroImages = {
  Cardiology: 'cardiology_hero_bg.png',
  Diabetology: 'research-lab.png',
  Gastroenterology: 'hero-tablets-capsules.jpg',
  Hematology: 'doctor-consult.png',
  Hypertension: 'hero-pharmacist-checking.jpg',
  Urology: 'hero-pharmacist-smiling.jpg',
  'Pain Management': 'hero-pharmacist-checking.jpg',
  Respiratory: 'hero-tablets-capsules.jpg',
}

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
]

const productAccentPalette = [
  '#071B5A',
  '#00A6A6',
  '#1F6FEB',
  '#7C3AED',
  '#E11D48',
  '#0F766E',
  '#EA580C',
  '#2563EB',
]

const splitMedicineName = (medicine) => {
  const match = medicine.match(/^(.+?)\s*\((.+)\)$/)
  return {
    brand: match ? match[1].trim() : medicine,
    composition: match ? match[2].trim() : '',
  }
}

const getMedicineImage = (medicine) => {
  const match = productImageRules.find(([pattern]) => pattern.test(medicine))
  return match ? match[1] : ''
}

const getProductAccent = (medicine) => {
  const total = Array.from(medicine).reduce((sum, letter) => sum + letter.charCodeAt(0), 0)
  return productAccentPalette[total % productAccentPalette.length]
}

const getProductStrength = (brand, composition) => {
  const match = `${brand} ${composition}`.match(/(\d+(?:\.\d+)?)\s*mg/i)
  return match ? `${match[1]} mg` : 'As directed'
}

const getProductForm = (composition) => {
  const text = composition.toLowerCase()
  if (text.includes('injection')) return 'Injection'
  if (text.includes('capsule')) return 'Capsule'
  return 'Tablet'
}

const getGroupProducts = (group) =>
  group.sections.flatMap((section) =>
    section.medicines.map((medicine, index) => {
      const parsed = splitMedicineName(medicine)
      return {
        ...parsed,
        medicine,
        section: section.title,
        group: group.title,
        image: getMedicineImage(medicine),
        accent: getProductAccent(medicine),
        strength: getProductStrength(parsed.brand, parsed.composition),
        form: getProductForm(parsed.composition),
        featured: index === 0 || /Lentor|Telimen|Pantolen|Cili|Sitamen|Vasolazine/i.test(parsed.brand),
      }
    }),
  )

const pageFromHash = () => {
  const hash = window.location.hash.replace('#/', '').toLowerCase()
  if (hash.startsWith('products')) return 'Products'
  return navItems.find((item) => item.toLowerCase().replaceAll(' ', '-') === hash) || 'Home'
}

const scrollToTop = () => {
  if (window.lenis) {
    window.lenis.scrollTo(0, { immediate: true })
  } else {
    window.scrollTo(0, 0)
  }
}

function usePharmaAnimations(page) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!reduceMotion) {
      const lenis = new Lenis({
        duration: 1,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      })
      window.lenis = lenis

      let frameId
      const raf = (time) => {
        lenis.raf(time)
        frameId = window.requestAnimationFrame(raf)
      }
      frameId = window.requestAnimationFrame(raf)
      lenis.on('scroll', ScrollTrigger.update)

      return () => {
        window.cancelAnimationFrame(frameId)
        lenis.destroy()
        window.lenis = null
      }
    }
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

      ScrollTrigger.create({
        start: 60,
        end: 99999,
        toggleClass: { targets: '.site-header', className: 'scrolled' },
      })

      if (reduceMotion) {
        return
      }

      const fadeUp = (targets, trigger, options = {}) => {
        gsap.from(targets, {
          y: 40,
          opacity: 0,
          duration: options.duration || 0.8,
          ease: 'power2.out',
          stagger: options.stagger || 0.1,
          scrollTrigger: {
            trigger,
            start: options.start || 'top 82%',
            once: true,
          },
        })
      }

      fadeUp('.intro-copy > p, .experience-box, .trust-list li', '.intro-section', {
        stagger: 0.12,
      })
      gsap.from('.capsules', {
        x: 55,
        scale: 0.95,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.intro-section', start: 'top 80%', once: true },
      })

      fadeUp('.capability-copy .eyebrow, .capability-copy h2, .capability-copy p', '.capability-map')

      fadeUp('.service-tile', '.services-grid', { stagger: 0.12 })

      fadeUp('.assurance-copy h2, .assurance-copy > p, .feature', '.assurance-section', {
        stagger: 0.12,
      })
      gsap.to('.doctor-image', {
        yPercent: -4,
        scale: 1.04,
        ease: 'none',
        scrollTrigger: {
          trigger: '.assurance-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7,
        },
      })

      fadeUp('.portfolio-section .section-heading > *', '.portfolio-section', { stagger: 0.1 })
      fadeUp('.area-tabs button', '.portfolio-explorer', { stagger: 0.08 })

      fadeUp('.category-hero-copy > *, .category-stat-grid article', '.category-product-hero', {
        stagger: 0.09,
      })
      gsap.from('.category-hero-visual img', {
        x: 50,
        scale: 0.96,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.category-product-hero', start: 'top 78%', once: true },
      })
      fadeUp('.horizontal-filter-chips button, .premium-search', '.product-filter-bar', {
        stagger: 0.05,
      })
      gsap.from('.featured-medicine-visual', {
        x: -45,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.featured-medicine', start: 'top 82%', once: true },
      })
      gsap.from('.featured-medicine-copy > *', {
        x: 38,
        opacity: 0,
        duration: 0.75,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.featured-medicine', start: 'top 82%', once: true },
      })
      fadeUp('.premium-medicine-card', '.premium-medicine-grid', { stagger: 0.08 })

      gsap.from('.journey-line article', {
        y: 34,
        opacity: 0,
        duration: 0.75,
        ease: 'power2.out',
        stagger: 0.14,
        scrollTrigger: { trigger: '.journey-line', start: 'top 82%', once: true },
      })
      gsap.utils.toArray('.journey-line article').forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 78%',
          once: true,
          onEnter: () => item.classList.add('active'),
        })
      })
      gsap.to('.journey-line', {
        '--line-progress': 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.quality-journey',
          start: 'top 75%',
          end: 'bottom 70%',
          scrub: 0.5,
        },
      })

      fadeUp('.research-copy > *, .research-panel img', '.research-band', { stagger: 0.1 })
      fadeUp('.product-detail-copy > *, .detail-stats article', '.product-detail-hero', {
        duration: 0.7,
        stagger: 0.08,
        start: 'top 90%',
      })
      gsap.utils.toArray('.stat-count[data-count]').forEach((item) => {
        const target = Number(item.dataset.count)
        const suffix = item.dataset.suffix || ''
        if (!Number.isFinite(target)) return
        gsap.fromTo(
          item,
          { textContent: 0 },
          {
            textContent: target,
            duration: 1.2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: { trigger: item, start: 'top 88%', once: true },
            onUpdate: () => {
              item.textContent = `${Math.round(Number(item.textContent))}${suffix}`
            },
            onComplete: () => {
              item.textContent = `${target}${suffix}`
            },
          },
        )
      })
      fadeUp('.filter-panel', '.product-catalog', { duration: 0.65, start: 'top 88%' })
      fadeUp('.catalog-search, .catalog-toolbar, .medicine-card', '.product-catalog', {
        duration: 0.7,
        stagger: 0.07,
        start: 'top 86%',
      })
      fadeUp('.site-footer', '.site-footer', { duration: 0.7 })
    })

    window.setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => ctx.revert()
  }, [page])
}

function App() {
  const [page, setPage] = useState(pageFromHash)
  const [menuOpen, setMenuOpen] = useState(false)
  usePharmaAnimations(page)

  useEffect(() => {
    const syncPage = () => setPage(pageFromHash())
    window.addEventListener('hashchange', syncPage)
    return () => window.removeEventListener('hashchange', syncPage)
  }, [])

  useEffect(() => {
    scrollToTop()
  }, [page])

  const CurrentPage = useMemo(() => {
    if (page === 'About Us') return AboutPage
    if (page === 'Products') return ProductsPage
    if (page === 'Contact Us') return ContactPage
    if (page === 'Careers') return CareersPage
    return HomePage
  }, [page])

  const goTo = (item) => {
    setPage(item)
    setMenuOpen(false)
    window.location.hash = `/${item.toLowerCase().replaceAll(' ', '-')}`
    scrollToTop()
  }

  return (
    <>
      <Header active={page} goTo={goTo} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <CurrentPage page={page} goTo={goTo} />
      </main>
      <Footer goTo={goTo} />
      <FloatingContact />
    </>
  )
}

function Header({ active, goTo, menuOpen, setMenuOpen }) {
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <div className="nav-inner">
          <button className="brand" type="button" onClick={() => goTo('Home')} aria-label="Lenimen home">
            <img src="/assets/logo.png" alt="Lenimen Biotech" />
          </button>
          <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item}
                className={active === item ? 'active' : ''}
                type="button"
                onClick={() => goTo(item)}
              >
                {item}
              </button>
            ))}
          </nav>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}

function HomePage({ goTo }) {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((index) => (index + 1) % heroSlides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  const slide = heroSlides[activeSlide]

  return (
    <>
      <section className="hero-section" aria-label="Lenimen highlights">
        <div className="hero-copy" key={slide.title}>
          <p className="eyebrow">{slide.kicker}</p>
          <h1>{slide.title}</h1>
          <p className="hero-subheading">{slide.subheading}</p>
          <button className="primary-button" type="button" onClick={() => goTo(slide.target)}>
            {slide.buttonLabel}
          </button>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img src={`/assets/${slide.image}`} alt="" />
        </div>
        <div className="slide-dots" aria-label="Hero slides">
          {heroSlides.map((item, index) => (
            <button
              key={item.title}
              className={activeSlide === index ? 'active' : ''}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Show ${item.title}`}
            ></button>
          ))}
        </div>
      </section>

      <IntroSection />
      <CapabilityMapSection />
      <CredibilitySection />
      <ServicesSection />
      <AssuranceSection />
      <PortfolioSection />
      <QualityJourneySection />
      <ResearchSection />
    </>
  )
}

function CapabilityMapSection() {
  return (
    <section className="capability-map">
      <div className="capability-copy">
        <p className="eyebrow">Business Focus</p>
        <h2>Integrated Pharmaceutical Business Solutions</h2>
        <p>
          Lenimen Biotech offers end-to-end pharmaceutical business support, from product sourcing
          and formulation partnerships to marketing, distribution, and institutional supply. The
          company serves as a pharma marketing company in India, pharmaceutical distributor in
          Kerala, healthcare product supplier, and generic medicines supplier for professional
          healthcare channels.
        </p>
      </div>
    </section>
  )
}

function IntroSection() {
  return (
    <section className="intro-section">
      <div className="intro-copy">
        <p>
          <strong>About Lenimen Biotech Pvt. Ltd.</strong> Lenimen Biotech Private Limited is a
          professionally managed pharmaceutical and healthcare company headquartered in Aluva,
          Kerala, India. Established in 2014, the company specializes in pharmaceutical marketing,
          distribution, institutional supply, and healthcare product solutions. With a strong network
          of manufacturing partners and healthcare professionals, Lenimen Biotech delivers
          quality-assured pharmaceutical formulations across multiple therapeutic segments.
        </p>
        <div className="experience-row">
          <div className="experience-box">
            <strong>Over a decade of pharmaceutical experience</strong>
          </div>
          <ul className="trust-list">
            <li>Quality-assured products</li>
            <li>Ethical business practices</li>
            <li>Trusted distribution network</li>
            <li>Institutional supply support</li>
          </ul>
        </div>
      </div>
      <img className="capsules" src="/assets/medicine-capsules.png" alt="Pharmaceutical capsules" />
    </section>
  )
}

function CredibilitySection() {
  return (
    <section className="credibility-section">
      <div className="credibility-copy">
        <p className="eyebrow">Quality Network</p>
        <h2>Strategic Manufacturing Partnerships Built on Quality &amp; Compliance</h2>
        <p>
          Lenimen Biotech collaborates with globally recognized manufacturing partners operating
          under stringent quality management systems and international regulatory standards. Our
          network ensures consistent product quality, regulatory compliance, supply reliability,
          and patient safety across every stage of development and manufacturing.
        </p>
        <div className="proof-row">
          {trustMarkers.map(([label, title]) => (
            <span key={label} title={title}>
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="credibility-visual">
        <img src="/assets/pdf/quality-manufacturing.png" alt="Manufacturing and quality credentials from Lenimen PDF" />
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="services-band">
      <div className="services-grid">
        {services.map(([image, title]) => (
          <article className="service-tile" key={title}>
            <img src={`/assets/${image}`} alt="" />
            <h3>{title}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}

function ParinexLogo() {
  return (
    <div className="logo-card parinex">
      <div className="brand-line">
        <span className="brand-name">
          Par<span className="char-i">i<svg className="droplet" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 0C5 0 0 5.4 0 9C0 11.8 2.2 14 5 14C7.8 14 10 11.8 10 9C10 5.4 5 0 5 0Z" fill="#E11D48" /></svg></span>nex
        </span>
        <span className="brand-tm">TM</span>
        <span className="strength-badge">40/60mg</span>
      </div>
      <div className="brand-sub">Enoxaparin Sodium Injection 40/60mg</div>
    </div>
  )
}

function RosulenLogo() {
  return (
    <div className="logo-card rosulen">
      <div className="brand-line">
        <span className="brand-name">
          Ros<span className="char-u">u<span className="u-bar"></span></span>len
        </span>
        <span className="brand-tm">TM</span>
        <span className="strength-badge">5/10</span>
      </div>
      <div className="brand-sub">Rosuvastatin 5/10/20/40 mg</div>
    </div>
  )
}

function TelimenLogo() {
  return (
    <div className="logo-card telimen">
      <div className="brand-line">
        <span className="brand-name-wrap">
          <span className="brand-name">Telimen</span>
          <svg className="telimen-arc" viewBox="0 0 100 20" fill="none">
            <path d="M5 15C30 5 70 5 95 15" stroke="#E28C05" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </span>
        <span className="brand-tm">TM</span>
        <span className="strength-badge">40</span>
      </div>
      <div className="brand-sub">Telmisartan Tablets IP 40mg</div>
    </div>
  )
}

function LukaLcLogo() {
  return (
    <div className="logo-card luka-lc">
      <div className="brand-line">
        <span className="brand-name-wrap">
          <span className="brand-name">LUKA-LC</span>
          <svg className="luka-arc" viewBox="0 0 120 20" fill="none">
            <path d="M5 5C35 15 85 15 115 5" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </span>
        <span className="brand-tm">TM</span>
      </div>
      <div className="brand-sub">Levocetirizine 5mg + Montelukast 10mg tablet</div>
    </div>
  )
}

function NicLogo() {
  return (
    <div className="logo-card nic">
      <div className="brand-line">
        <span className="brand-name">NIC</span>
        <span className="strength-badge">5<sub>mg</sub></span>
      </div>
      <div className="brand-sub">Nicorandil Tablets</div>
    </div>
  )
}

function Pantolen40Logo() {
  return (
    <div className="logo-card pantolen">
      <div className="brand-line">
        <span className="brand-name">
          Pant<span className="square-o"></span>len
        </span>
        <span className="brand-tm">TM</span>
        <span className="strength-badge red-text">40<sub>mg</sub></span>
      </div>
      <div className="brand-sub">Pantoprazole 40mg Tablets</div>
    </div>
  )
}


function PantolenDLogo() {
  return (
    <div className="logo-card pantolen">
      <div className="brand-line">
        <span className="brand-name">
          Pant<span className="square-o"></span>len-D
        </span>
        <span className="brand-tm">TM</span>
      </div>
      <div className="brand-sub">Pantoprazole 40mg + Domperidone SR 30mg</div>
    </div>
  )
}

function SitamenLogo({ brand, composition }) {
  const isPlus = brand.toLowerCase().includes('plus')
  const isForte = brand.toLowerCase().includes('forte')
  return (
    <div className="logo-card sitamen">
      <div className="brand-line">
        <span className="brand-name">SITAMEN</span>
        <span className="brand-tm">TM</span>
        {isPlus && <span className="sitamen-badge plus">Plus</span>}
        {isForte && <span className="sitamen-badge forte">Forte</span>}
        {!isPlus && !isForte && <span className="sitamen-badge standard">50mg</span>}
      </div>
      <div className="brand-sub">{composition || 'Sitagliptin Tablets'}</div>
    </div>
  )
}

function VasolazineLogo() {
  return (
    <div className="logo-card vasolazine">
      <div className="brand-line">
        <span className="brand-name-wrap">
          <span className="brand-name">Vasolazine</span>
          <svg className="vasolazine-swoosh" viewBox="0 0 100 10" fill="none">
            <path d="M5 2C30 8 70 8 95 2" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <span className="brand-tm">TM</span>
      </div>
      <div className="brand-sub">Isosorbide Dinitrate 20 mg + Hydralazine 37.5 mg</div>
    </div>
  )
}

function ProductMarquee({ className = '' }) {
  return (
    <div className={`product-marquee ${className}`} aria-label="Lenimen product range">
      <div className="product-marquee-track">
        {Array.from({ length: 4 }).map((_, groupIndex) => (
          <div className="marquee-group" key={groupIndex}>
            <img src="/assets/strip-lentor.png" alt="Lentor" />
            <img src="/assets/strip-cili.png" alt="Cili" />
            <img src="/assets/strip-parinex.png" alt="Parinex" />
            <img src="/assets/strip-telimen.png" alt="Telimen" />
            <img src="/assets/strip-betarun.png" alt="Betarun" />
            <img src="/assets/strip-rosulen.png" alt="Rosulen" />
            <img src="/assets/strip-pantolen.png" alt="Pantolen" />
            <img src="/assets/strip-nic.png" alt="NIC" />
            <img src="/assets/strip-lemet-g1.png" alt="Lemet" />
            <img src="/assets/strip-lengrel.png" alt="Lengrel" />
            <img src="/assets/strip-ivalen.png" alt="Ivalen" />
            <img src="/assets/strip-febulen.png" alt="Febulen" />
            <img src="/assets/strip-luka-lc.png" alt="Luka-LC" />
          </div>
        ))}
      </div>
    </div>
  )
}

function AssuranceSection() {
  return (
    <section className="assurance-section">
      <img className="doctor-image" src="/assets/doctor-consult.png" alt="Doctor consulting a patient" />
      <div className="assurance-copy">
        <h2>Our Commitment to Better Healthcare</h2>
        <p>
          At Lenimen Biotech, we are committed to delivering innovative pharmaceutical solutions
          that meet the highest standards of quality, safety, and efficacy. Through strategic
          partnerships, scientific expertise, and regulatory excellence, we help bring reliable
          healthcare products to patients worldwide.
        </p>
        <div className="feature-row">
          <div className="feature">
            <UsersRound size={42} />
            <div>
              <h3>Experienced Management</h3>
              <p>
                Our leadership team combines extensive experience in pharmaceutical marketing,
                healthcare distribution, procurement, and institutional supply management.
              </p>
            </div>
          </div>
          <div className="feature">
            <Smile size={42} />
            <div>
              <h3>Trusted Business Relationships</h3>
              <p>
                We measure success through long-term partnerships with healthcare providers,
                distributors, pharmacies, institutions, and procurement agencies.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ProductMarquee />
    </section>
  )
}

const getBrandLogo = (brand) => {
  const b = brand.toLowerCase();
  if (b.includes('lentor')) return '/assets/strip-lentor.png';
  if (b.includes('cili')) return '/assets/strip-cili.png';
  if (b.includes('parinex')) return '/assets/strip-parinex.png';
  if (b.includes('telimen')) return '/assets/strip-telimen.png';
  if (b.includes('betarun')) return '/assets/strip-betarun.png';
  if (b.includes('rosulen')) return '/assets/strip-rosulen.png';
  if (b.includes('pantolen')) return '/assets/strip-pantolen.png';
  if (b.includes('nic')) return '/assets/strip-nic.png';
  if (b.includes('lemet')) return '/assets/strip-lemet-g1.png';
  if (b.includes('lengrel')) return '/assets/strip-lengrel.png';
  if (b.includes('ivalen')) return '/assets/strip-ivalen.png';
  if (b.includes('febulen')) return '/assets/strip-febulen.png';
  if (b.includes('luka')) return '/assets/strip-luka-lc.png';
  return null;
}

const renderMiniLogo = (brand) => {
  const lower = brand.toLowerCase();
  if (lower.includes('sitamen')) {
    return (
      <div className="mini-logo sitamen">
        <span className="brand">SITAMEN</span>
        <span className="tm">TM</span>
      </div>
    )
  }
  if (lower.includes('vasolazine')) {
    return (
      <div className="mini-logo vasolazine">
        <span className="brand">Vasolazine</span>
        <span className="tm">TM</span>
      </div>
    )
  }
  if (lower.includes('defalen')) {
    return (
      <div className="mini-logo defalen">
        <span className="brand">DEFALEN</span>
        <span className="tm">TM</span>
      </div>
    )
  }
  if (lower.includes('bilaget')) {
    return (
      <div className="mini-logo bilaget">
        <span className="brand">Bilaget</span>
        {lower.includes('m') && <span className="badge">M</span>}
      </div>
    )
  }
  if (lower.includes('acbc')) {
    return (
      <div className="mini-logo acbc">
        <span className="brand">ACBC</span>
        {lower.includes('n') && <span className="badge">N</span>}
      </div>
    )
  }
  return (
    <div className="mini-logo generic">
      <span className="brand">{brand}</span>
    </div>
  )
}

const getAreaIcon = (title) => {
  const meta = productCategoryMeta[title];
  if (meta && meta.icon) {
    const IconComponent = meta.icon;
    return <IconComponent size={42} />;
  }
  return <Activity size={42} />;
}

function PortfolioSection() {
  const [activeArea, setActiveArea] = useState(therapeuticAreas[0].title)
  const selectedArea = therapeuticAreas.find((area) => area.title === activeArea) || therapeuticAreas[0]
  const areaDetailRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !areaDetailRef.current) return

    gsap.fromTo(
      areaDetailRef.current,
      { x: 28, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.65, ease: 'power2.out' },
    )
  }, [activeArea])

  const isDescription = selectedArea.brands.length === 1 && selectedArea.brands[0].length > 30

  return (
    <section className="portfolio-section">
      <div className="section-heading">
        <p className="eyebrow">Product Portfolio</p>
        <h2>Therapeutic Segments We Serve</h2>
        <p>
          Our portfolio covers a broad range of therapeutic categories designed to meet the needs of
          healthcare professionals and patients.
        </p>
      </div>
      <div className="portfolio-explorer">
        <div className="area-tabs" aria-label="Therapeutic area selector">
          {therapeuticAreas.map((area) => (
            <button
              type="button"
              className={area.title === activeArea ? 'active' : ''}
              key={area.title}
              onClick={() => setActiveArea(area.title)}
            >
              {area.title}
            </button>
          ))}
        </div>
        <div className="area-detail" ref={areaDetailRef} key={selectedArea.title}>
          <div className="area-detail-header">
            {getAreaIcon(selectedArea.title)}
            <h3>{selectedArea.title}</h3>
          </div>
          
          {isDescription ? (
            <p className="area-description-text">{selectedArea.brands[0]}</p>
          ) : (
            <div className="brands-grid">
              {selectedArea.brands.map((brand) => {
                const logoImg = getBrandLogo(brand);
                return (
                  <div key={brand} className="portfolio-brand-card">
                    {logoImg ? (
                      <img src={logoImg} alt={brand} className="portfolio-brand-img" />
                    ) : (
                      renderMiniLogo(brand)
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function QualityJourneySection() {
  return (
    <section className="quality-journey">
      <div className="section-heading">
        <p className="eyebrow">Operating Discipline</p>
        <h2>From sourcing to healthcare delivery</h2>
      </div>
      <div className="journey-line">
        {qualityJourney.map(([title, copy], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ResearchSection() {
  return (
    <section className="research-band">
      <div className="research-panel">
        <div className="research-copy">
          <h2>Research & Market Intelligence</h2>
          <p>
            At Lenimen Biotech, we continuously evaluate emerging healthcare trends, therapeutic
            advancements, and market opportunities to identify innovative pharmaceutical solutions.
            Our team works closely with manufacturing partners and healthcare professionals to
            ensure that products meet evolving medical needs, regulatory standards, and market
            expectations.
          </p>
          <button type="button">Explore</button>
        </div>
        <img src="/assets/research-lab.png" alt="Laboratory glassware research" />
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <>
      <IntroSection />
      <CredibilitySection />
      <ProductMarquee className="standalone" />
      <CompanyProfileSection />
      <section className="management-section">
        <h1>Meet Our Management Team</h1>
        <p>
          The company is guided by an experienced management team and directors committed to
          operational excellence and sustainable growth.
        </p>
      </section>
      <DirectorsSection />
    </>
  )
}

function CompanyProfileSection() {
  const corporateRows = [
    ['Company Name', company.name],
    ['CIN', company.cin],
    ['Year of Incorporation', company.year],
    ['Company Type', company.type],
    ['Industry', company.industry],
    ['Registered Office', company.registeredOffice],
    ['GSTIN', company.gstin],
    ['ROC', company.roc],
    ['Status', company.status],
  ]

  return (
    <section className="profile-section">
      <div className="section-heading">
        <p className="eyebrow">Company Profile</p>
        <h2>Reliable healthcare solutions from Kerala</h2>
        <p>
          As a pharmaceutical company in Kerala and healthcare solutions company, Lenimen Biotech
          supports hospitals, pharmacies, distributors, and institutions with pharmaceutical
          formulations, generic medicines, healthcare products, and dependable institutional
          medicine supply.
        </p>
      </div>
      <div className="profile-layout">
        <div className="profile-card">
          <h3>Corporate Information</h3>
          <dl>
            {corporateRows.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="profile-content">
          <article>
            <h3>Our Vision</h3>
            <p>
              To become a trusted and leading healthcare company by delivering quality
              pharmaceutical products and innovative healthcare solutions that improve the quality
              of life globally.
            </p>
          </article>
          <article>
            <h3>Our Mission</h3>
            <ul>
              {missionPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Core Business Activities</h3>
            <div className="activity-tags">
              {businessActivities.map((activity) => (
                <span key={activity}>{activity}</span>
              ))}
            </div>
          </article>
        </div>
      </div>
      <div className="strength-grid">
        {strengths.map(([title, copy]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function DirectorsSection() {
  return (
    <section className="directors-section">
      <div className="section-heading">
        <p className="eyebrow">Leadership</p>
        <h2>Directors</h2>
      </div>
      <div className="director-list">
        {directors.map((director) => (
          <span key={director}>{director}</span>
        ))}
      </div>
    </section>
  )
}

const getMedicineDescription = (product) => {
  const sect = (product.section || '').toLowerCase()
  const brand = (product.brand || '').toLowerCase()

  if (sect.includes('lipid') || brand.includes('lentor') || brand.includes('rosulen')) {
    return 'Reduces cholesterol and risk of heart disease and stroke.'
  }
  if (sect.includes('hypertensive') || brand.includes('telimen') || brand.includes('cili') || brand.includes('betarun')) {
    return 'Helps in controlling high blood pressure and improves heart health.'
  }
  if (sect.includes('platelet') || brand.includes('lengrel') || brand.includes('aspimen')) {
    return 'Helps prevent blood clots and reduces risk of heart attack and stroke.'
  }
  if (brand.includes('vasolazine')) {
    return 'Combination vasodilator therapy for heart failure management.'
  }
  if (sect.includes('anginal') || brand.includes('nic')) {
    return 'Helps prevent chest pain (angina) and improves exercise tolerance.'
  }
  if (sect.includes('hcn') || brand.includes('ivalen')) {
    return 'Used for symptomatic treatment of chronic stable angina pectoris.'
  }
  if (sect.includes('diabetic') || brand.includes('lemet') || brand.includes('sitamen')) {
    return 'Helps in blood sugar management and glycemic control.'
  }
  if (sect.includes('coagulant') || brand.includes('parinex')) {
    return 'Helps prevent and treat blood clots in deep veins and lungs.'
  }
  if (sect.includes('ulcer') || brand.includes('pantolen')) {
    return 'Helps reduce stomach acid and treats acid-related reflux disorders.'
  }
  if (sect.includes('uric') || brand.includes('febulen')) {
    return 'Lowers uric acid levels in patients with gout.'
  }
  if (sect.includes('corticosteroid') || brand.includes('defalen')) {
    return 'Helps reduce inflammation and treat various inflammatory conditions.'
  }
  if (sect.includes('histamine') || brand.includes('luka')) {
    return 'Provides relief from allergic symptoms and nasal congestion.'
  }
  if (sect.includes('bronchodilator') || brand.includes('acbc')) {
    return 'Helps open airways and improves breathing in chronic lung conditions.'
  }
  return 'High-quality pharmaceutical formulation for professional therapeutic care.'
}

function LentorLogo({ strength, composition }) {
  return (
    <div className="logo-card lentor">
      <div className="brand-line">
        <span className="brand-name">Lentor</span>
        <span className="brand-tm">TM</span>
        {strength && strength !== 'As directed' && (
          <span className="strength-badge">{strength}</span>
        )}
      </div>
      <div className="brand-sub">{composition || 'Atorvastatin Calcium Tablets'}</div>
    </div>
  )
}

function GenericProductLogo({ brand, strength, composition, section }) {
  const accent = getProductAccent(brand)
  return (
    <div className="logo-card generic-brand-logo" style={{ '--brand-accent': accent }}>
      <div className="brand-line">
        <span className="brand-name">{brand}</span>
        <span className="brand-tm">TM</span>
        {strength && strength !== 'As directed' && (
          <span className="strength-badge">{strength}</span>
        )}
      </div>
      <div className="brand-sub">{composition || section}</div>
    </div>
  )
}

const renderProductVisual = (product) => {
  if (product.image) {
    return (
      <img
        src={`/assets/${product.image}`}
        alt={`${product.brand} pharmaceutical pack`}
      />
    )
  }
  const brandLower = product.brand.toLowerCase()
  if (brandLower.startsWith('parinex')) return <ParinexLogo />
  if (brandLower.startsWith('rosulen')) return <RosulenLogo />
  if (brandLower.startsWith('telimen')) return <TelimenLogo />
  if (brandLower.startsWith('luka-lc')) return <LukaLcLogo />
  if (brandLower.startsWith('nic')) return <NicLogo />
  if (brandLower.startsWith('pantolen-d')) return <PantolenDLogo />
  if (brandLower.startsWith('pantolen')) return <Pantolen40Logo />
  if (brandLower.startsWith('sitamen')) {
    return <SitamenLogo brand={product.brand} composition={product.composition} />
  }
  if (brandLower.startsWith('vasolazine')) return <VasolazineLogo />
  if (brandLower.startsWith('lentor')) {
    return <LentorLogo strength={product.strength} composition={product.composition} />
  }
  return (
    <GenericProductLogo
      brand={product.brand}
      strength={product.strength}
      composition={product.composition}
      section={product.section}
    />
  )
}

function ProductsPage() {
  const getCategoryFromHash = () => {
    const hash = window.location.hash.replace('#/', '').toLowerCase()
    const parts = hash.split('/')
    if (parts[0] === 'products' && parts.length > 1) {
      const slug = parts[1]
      const group = productGroups.find(
        (g) => g.title.toLowerCase().replaceAll(' ', '-') === slug
      )
      return group ? group.title : ''
    }
    return ''
  }

  const [selectedGroupTitle, setSelectedGroupTitle] = useState(getCategoryFromHash)

  useEffect(() => {
    const handleHashChange = () => {
      setSelectedGroupTitle(getCategoryFromHash())
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const [productQuery, setProductQuery] = useState('')
  const [catalogQuery, setCatalogQuery] = useState('')
  const [brandSearchQuery, setBrandSearchQuery] = useState('')
  const [selectedSections, setSelectedSections] = useState([])
  const [selectedStrengths, setSelectedStrengths] = useState([])
  const [selectedForms, setSelectedForms] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [sortMode, setSortMode] = useState('az')
  const [viewMode, setViewMode] = useState('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [clinicalProduct, setClinicalProduct] = useState(null)

  // Keep track of stars clicked on cards locally
  const [starredProducts, setStarredProducts] = useState({})

  // Global search states
  const [isSearchingAll, setIsSearchingAll] = useState(false)
  const [globalSearchQuery, setGlobalSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedGroups, setSelectedGroups] = useState([])
  const searchRef = useRef(null)

  const [openFilterGroups, setOpenFilterGroups] = useState({
    category: true,
    strength: true,
    form: true,
    brand: true,
    group: true,
  })

  // Detect clicks outside search container to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Flattened database of all products across all categories
  const allProducts = useMemo(() => {
    return productGroups.flatMap((group) => getGroupProducts(group))
  }, [])

  const totalProducts = allProducts.length
  const yearsOfExcellence = new Date().getFullYear() - Number(company.year)
  const selectedGroup = productGroups.find((group) => group.title === selectedGroupTitle)

  // Real-time suggestions for autocomplete
  const suggestions = useMemo(() => {
    const query = productQuery.trim().toLowerCase()
    if (query.length < 2) return { categories: [], products: [] }

    const matchedCats = productGroups.filter((group) =>
      group.title.toLowerCase().includes(query)
    )

    const matchedProds = allProducts.filter((prod) =>
      prod.brand.toLowerCase().includes(query) ||
      prod.composition.toLowerCase().includes(query)
    )

    return {
      categories: matchedCats,
      products: matchedProds.slice(0, 6) // Limit to 6 product suggestions
    }
  }, [productQuery, allProducts])

  const heroMatches = productGroups.filter((group) => {
    const query = productQuery.trim().toLowerCase()
    if (!query) return true
    return `${group.title} ${group.sections.map((section) => `${section.title} ${section.medicines.join(' ')}`).join(' ')}`.toLowerCase().includes(query)
  })

  // Determine actual catalog products - either selected group or search matches
  const catalogProducts = useMemo(() => {
    if (selectedGroup) {
      return getGroupProducts(selectedGroup)
    }
    if (isSearchingAll && globalSearchQuery) {
      const query = globalSearchQuery.trim().toLowerCase()
      return allProducts.filter(
        (product) =>
          product.brand.toLowerCase().includes(query) ||
          product.composition.toLowerCase().includes(query) ||
          product.section.toLowerCase().includes(query) ||
          product.group.toLowerCase().includes(query)
      )
    }
    return []
  }, [selectedGroup, isSearchingAll, globalSearchQuery, allProducts])

  // Get dynamic options based on catalog products
  const groupOptions = useMemo(() => {
    return Array.from(new Set(catalogProducts.map((p) => p.group)))
  }, [catalogProducts])

  const sectionsOptions = useMemo(() => {
    return Array.from(new Set(catalogProducts.map((p) => p.section)))
  }, [catalogProducts])

  const strengthOptions = useMemo(() => {
    return Array.from(new Set(catalogProducts.map((product) => product.strength)))
      .sort((a, b) => {
        const numA = parseFloat(a) || 9999
        const numB = parseFloat(b) || 9999
        return numA - numB
      })
  }, [catalogProducts])

  const formOptions = useMemo(() => {
    return Array.from(new Set(catalogProducts.map((product) => product.form)))
  }, [catalogProducts])

  const brandOptions = useMemo(() => {
    return Array.from(new Set(catalogProducts.map((product) => product.brand)))
      .sort((a, b) => a.localeCompare(b))
  }, [catalogProducts])

  // Filtered catalog products
  const visibleCatalogProducts = useMemo(() => {
    return catalogProducts
      .filter((product) => {
        if (selectedGroups.length === 0) return true
        return selectedGroups.includes(product.group)
      })
      .filter((product) => {
        if (selectedSections.length === 0) return true
        return selectedSections.includes(product.section)
      })
      .filter((product) => {
        if (selectedStrengths.length === 0) return true
        return selectedStrengths.includes(product.strength)
      })
      .filter((product) => {
        if (selectedForms.length === 0) return true
        return selectedForms.includes(product.form)
      })
      .filter((product) => {
        if (selectedBrands.length === 0) return true
        return selectedBrands.some(
          (b) => product.brand.startsWith(b) || product.brand === b
        )
      })
      .filter((product) => {
        const query = catalogQuery.trim().toLowerCase()
        if (!query) return true
        return `${product.brand} ${product.composition} ${product.section}`.toLowerCase().includes(query)
      })
      .sort((a, b) => {
        if (sortMode === 'za') return b.brand.localeCompare(a.brand)
        if (sortMode === 'featured') return Number(b.featured) - Number(a.featured) || a.brand.localeCompare(b.brand)
        return a.brand.localeCompare(b.brand)
      })
  }, [catalogProducts, selectedGroups, selectedSections, selectedStrengths, selectedForms, selectedBrands, catalogQuery, sortMode])

  const pageSize = 12
  const pageCount = Math.max(1, Math.ceil(visibleCatalogProducts.length / pageSize))
  const safeCurrentPage = Math.min(currentPage, pageCount)
  const pageStart = (safeCurrentPage - 1) * pageSize
  const paginatedProducts = visibleCatalogProducts.slice(pageStart, pageStart + pageSize)

  const applyCatalogChange = (change) => {
    setLoadingProducts(true)
    setCurrentPage(1)
    change()
    window.setTimeout(() => setLoadingProducts(false), 200)
  }

  const clearCatalogFilters = () => {
    applyCatalogChange(() => {
      setSelectedSections([])
      setSelectedStrengths([])
      setSelectedForms([])
      setSelectedBrands([])
      setSelectedGroups([])
      setCatalogQuery('')
      setBrandSearchQuery('')
    })
  }

  const openCategory = (title) => {
    const slug = title.toLowerCase().replaceAll(' ', '-')
    window.location.hash = `#/products/${slug}`
  }

  useEffect(() => {
    setIsSearchingAll(false)
    setGlobalSearchQuery('')
    setProductQuery('')
    setCatalogQuery('')
    setBrandSearchQuery('')
    setSelectedSections([])
    setSelectedStrengths([])
    setSelectedForms([])
    setSelectedBrands([])
    setSelectedGroups([])
    setCurrentPage(1)
    scrollToTop()
  }, [selectedGroupTitle])

  const handleSearchSubmit = (query) => {
    const trimmed = query.trim()
    if (!trimmed) return

    setShowSuggestions(false)

    // Check if matching group/category
    const catMatch = productGroups.find(
      (g) => g.title.toLowerCase() === trimmed.toLowerCase()
    )
    if (catMatch) {
      openCategory(catMatch.title)
      return
    }

    // Go to global search view
    window.location.hash = '#/products'
    setIsSearchingAll(true)
    setGlobalSearchQuery(trimmed)
    setSelectedGroupTitle('')
    setSelectedSections([])
    setSelectedStrengths([])
    setSelectedForms([])
    setSelectedBrands([])
    setSelectedGroups([])
    setCurrentPage(1)
    scrollToTop()
  }

  const toggleFilterGroup = (group) => {
    setOpenFilterGroups((current) => ({ ...current, [group]: !current[group] }))
  }

  const toggleGroup = (groupTitle) => {
    applyCatalogChange(() => {
      setSelectedGroups((prev) =>
        prev.includes(groupTitle) ? prev.filter((g) => g !== groupTitle) : [...prev, groupTitle]
      )
    })
  }

  const toggleSection = (section) => {
    applyCatalogChange(() => {
      setSelectedSections((prev) =>
        prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
      )
    })
  }

  const toggleStrength = (strength) => {
    applyCatalogChange(() => {
      setSelectedStrengths((prev) =>
        prev.includes(strength) ? prev.filter((s) => s !== strength) : [...prev, strength]
      )
    })
  }

  const toggleForm = (form) => {
    applyCatalogChange(() => {
      setSelectedForms((prev) =>
        prev.includes(form) ? prev.filter((f) => f !== form) : [...prev, form]
      )
    })
  }

  const toggleBrand = (brand) => {
    applyCatalogChange(() => {
      setSelectedBrands((prev) =>
        prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
      )
    })
  }

  const toggleStar = (id) => {
    setStarredProducts((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  if (selectedGroup || isSearchingAll) {
    const meta = selectedGroup
      ? (productCategoryMeta[selectedGroup.title] || productCategoryMeta.Cardiology)
      : { icon: Search, description: `Search results for "${globalSearchQuery}"` }
    const Icon = meta.icon

    const showingStart = visibleCatalogProducts.length === 0 ? 0 : pageStart + 1
    const showingEnd = Math.min(pageStart + pageSize, visibleCatalogProducts.length)

    // Filter brands options inside brand accordion search
    const filteredBrandOptions = brandOptions.filter((brand) =>
      brand.toLowerCase().includes(brandSearchQuery.toLowerCase())
    )


    return (
      <>
        {selectedGroup && (
          <section className="category-product-hero">
            <div className="category-hero-copy">
              <div className="breadcrumb">
                <button type="button" onClick={() => window.location.assign('#/home')}>Home</button>
                <span className="breadcrumb-separator">/</span>
                <button type="button" onClick={() => { window.location.hash = '#/products'; }}>Products</button>
                <span className="breadcrumb-separator">/</span>
                <strong className="active-breadcrumb">{selectedGroup.title}</strong>
              </div>
              <h1>{selectedGroup.title}</h1>
              <p className="hero-desc">
                {meta.description}
              </p>
              <div className="category-hero-highlights">
                <span className="highlight-item">
                  <Icon size={16} />
                  <strong>{catalogProducts.length}</strong> {catalogProducts.length === 1 ? 'Product' : 'Products'} Available
                </span>
                <span className="highlight-divider">•</span>
                <span className="highlight-item">
                  <ShieldCheck size={16} />
                  Quality Assured
                </span>
                <span className="highlight-divider">•</span>
                <span className="highlight-item">
                  <Globe2 size={16} />
                  India Supply Network
                </span>
              </div>
            </div>
            <div className="category-hero-visual">
              <img src={`/assets/${categoryHeroImages[selectedGroup.title] || 'cardiology_hero_bg.png'}`} alt={`${selectedGroup.title} pharmaceutical portfolio`} />
              <svg className="molecular-pattern" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.025 }}>
                <circle cx="10" cy="20" r="1.5" fill="var(--teal)" />
                <circle cx="30" cy="15" r="1" fill="var(--teal)" />
                <circle cx="50" cy="25" r="2" fill="var(--teal)" />
                <line x1="10" y1="20" x2="30" y2="15" stroke="var(--teal)" strokeWidth="0.2" />
                <line x1="30" y1="15" x2="50" y2="25" stroke="var(--teal)" strokeWidth="0.2" />
                <circle cx="75" cy="40" r="1.5" fill="var(--teal)" />
                <circle cx="85" cy="55" r="1.2" fill="var(--teal)" />
                <line x1="75" y1="40" x2="85" y2="55" stroke="var(--teal)" strokeWidth="0.2" />
              </svg>
            </div>
          </section>
        )}

        <section className="product-catalog-shell">
          {isSearchingAll && (
            <div className="search-results-header-inline">
              <div className="breadcrumb">
                <button type="button" onClick={() => window.location.assign('#/home')}>Home</button>
                <span className="breadcrumb-separator">/</span>
                <button type="button" onClick={() => { window.location.hash = '#/products'; }}>Products</button>
                <span className="breadcrumb-separator">/</span>
                <strong className="active-breadcrumb">Search Results</strong>
              </div>
              <h1>Search Results</h1>
              <p>
                Showing {visibleCatalogProducts.length} matching {visibleCatalogProducts.length === 1 ? 'product' : 'products'} for <strong>"{globalSearchQuery}"</strong>
              </p>
            </div>
          )}
          <button
            className="mobile-filter-trigger"
            type="button"
            onClick={() => setFilterDrawerOpen(true)}
          >
            <SlidersHorizontal size={18} /> Filters
          </button>


          <div className="product-catalog">
            {filterDrawerOpen && (
              <button
                className="filter-drawer-backdrop"
                type="button"
                aria-label="Close filters"
                onClick={() => setFilterDrawerOpen(false)}
              />
            )}
            <aside className={filterDrawerOpen ? 'filter-panel open' : 'filter-panel'}>
              <div className="filter-heading">
                <h2>Filter Products</h2>
                <button type="button" className="reset-all-link" onClick={clearCatalogFilters}>Reset All</button>
                <button
                  className="filter-close"
                  type="button"
                  aria-label="Close filters"
                  onClick={() => setFilterDrawerOpen(false)}
                >
                  <X size={19} />
                </button>
              </div>

              <div className="filter-search-box">
                <input
                  type="search"
                  value={catalogQuery}
                  onChange={(event) => {
                    const value = event.target.value
                    applyCatalogChange(() => setCatalogQuery(value))
                  }}
                  placeholder={selectedGroup ? `Search in ${selectedGroup.title}...` : 'Search in results...'}
                />
                <Search size={18} className="search-icon-right" />
              </div>

              {isSearchingAll && (
                <FilterGroup
                  title="Therapeutic Area"
                  open={openFilterGroups.group}
                  onToggle={() => toggleFilterGroup('group')}
                >
                  {groupOptions.map((groupTitle) => {
                    const groupProds = catalogProducts.filter((p) => p.group === groupTitle)
                    const isChecked = selectedGroups.includes(groupTitle)
                    return (
                      <FilterOption
                        key={groupTitle}
                        label={groupTitle}
                        count={groupProds.length}
                        active={isChecked}
                        onClick={() => toggleGroup(groupTitle)}
                      />
                    )
                  })}
                </FilterGroup>
              )}

              <FilterGroup
                title="Therapeutic Subcategory"
                open={openFilterGroups.category}
                onToggle={() => toggleFilterGroup('category')}
              >
                {sectionsOptions.map((section) => {
                  const sectProducts = catalogProducts.filter((p) => p.section === section)
                  const isChecked = selectedSections.includes(section)
                  return (
                    <FilterOption
                      key={section}
                      label={section}
                      count={sectProducts.length}
                      active={isChecked}
                      onClick={() => toggleSection(section)}
                    />
                  )
                })}
              </FilterGroup>

              <FilterGroup
                title="Dosage Strength"
                open={openFilterGroups.strength}
                onToggle={() => toggleFilterGroup('strength')}
              >
                {strengthOptions.map((strength) => {
                  const strengthProducts = catalogProducts.filter((p) => p.strength === strength)
                  const isChecked = selectedStrengths.includes(strength)
                  return (
                    <FilterOption
                      key={strength}
                      label={strength}
                      count={strengthProducts.length}
                      active={isChecked}
                      onClick={() => toggleStrength(strength)}
                    />
                  )
                })}
              </FilterGroup>

              <FilterGroup
                title="Form"
                open={openFilterGroups.form}
                onToggle={() => toggleFilterGroup('form')}
              >
                {formOptions.map((form) => {
                  const formProducts = catalogProducts.filter((p) => p.form === form)
                  const isChecked = selectedForms.includes(form)
                  return (
                    <FilterOption
                      key={form}
                      label={form}
                      count={formProducts.length}
                      active={isChecked}
                      onClick={() => toggleForm(form)}
                    />
                  )
                })}
              </FilterGroup>

              <FilterGroup
                title="Brand"
                open={openFilterGroups.brand}
                onToggle={() => toggleFilterGroup('brand')}
              >
                <div className="brand-inner-search">
                  <input
                    type="text"
                    value={brandSearchQuery}
                    onChange={(e) => setBrandSearchQuery(e.target.value)}
                    placeholder="Search brand..."
                  />
                  <Search size={14} className="brand-search-icon" />
                </div>
                <div className="brand-checkbox-list">
                  {filteredBrandOptions.map((brand) => {
                    const brandProducts = catalogProducts.filter((p) => p.brand.startsWith(brand) || p.brand === brand)
                    const isChecked = selectedBrands.includes(brand)
                    return (
                      <FilterOption
                        key={brand}
                        label={brand}
                        count={brandProducts.length}
                        active={isChecked}
                        onClick={() => toggleBrand(brand)}
                      />
                    )
                  })}
                </div>
              </FilterGroup>

              <button className="clear-filter-button-sidebar" type="button" onClick={clearCatalogFilters}>
                <X size={15} style={{ marginRight: '6px' }} /> Clear Filters
              </button>
            </aside>

            <div className="catalog-results">


              {loadingProducts ? (
                <div className={`medicine-card-grid ${viewMode === 'grid' ? 'compact-view' : 'list-view'}`} aria-label="Loading products">
                  {Array.from({ length: 6 }, (_, index) => <ProductSkeleton key={index} />)}
                </div>
              ) : paginatedProducts.length > 0 ? (
                <div className={`medicine-card-grid ${viewMode === 'grid' ? 'compact-view' : 'list-view'}`}>
                  {paginatedProducts.map((product, i) => {
                    const productId = `${product.brand}-${product.composition}-${i}`
                    const isStarred = !!starredProducts[productId]
                    return (
                      <article
                        className="medicine-card"
                        key={productId}
                        style={{ '--product-accent': product.accent }}
                      >
                        <button
                          className={`card-star-btn ${isStarred ? 'starred' : ''}`}
                          type="button"
                          onClick={() => toggleStar(productId)}
                          aria-label="Favorite product"
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill={isStarred ? 'var(--teal)' : 'none'}>
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </button>
                        <div className="medicine-visual">
                          {renderProductVisual(product)}
                        </div>
                        <div className="medicine-card-content">
                          <h2 className="medicine-card-brand-name">{product.brand}</h2>
                          {product.composition && <p className="medicine-card-generic-name">{product.composition}</p>}
                          <span className="category-badge-pills">{product.section}</span>
                          <p className="medicine-card-desc-text">
                            {getMedicineDescription(product)}
                          </p>
                        </div>
                      </article>
                    )
                  })}
                </div>
              ) : (
                <div className="empty-products">
                  <FlaskConical size={34} />
                  <h2>No matching products</h2>
                  <p>Try removing a filter or searching with a broader medicine name.</p>
                  <button type="button" onClick={clearCatalogFilters}>Reset filters</button>
                </div>
              )}

              <nav className="catalog-pagination" aria-label="Product pagination">
                <button
                  type="button"
                  className="page-prev-btn"
                  disabled={safeCurrentPage === 1}
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                >
                  &lt;
                </button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={safeCurrentPage === page ? 'active' : ''}
                    aria-current={safeCurrentPage === page ? 'page' : undefined}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  className="page-next-btn"
                  disabled={safeCurrentPage === pageCount}
                  onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
                >
                  &gt;
                </button>
              </nav>
            </div>
          </div>
        </section>
        <ProductHelpBanner />
        {clinicalProduct && (
          <PharmaDetailModal
            product={clinicalProduct}
            onClose={() => setClinicalProduct(null)}
          />
        )}
      </>
    )
  }

  return (
    <>
      <section className="products-hero">
        <div className="products-hero-copy">
          <p className="eyebrow">Our Products</p>
          <h1>Trusted Medicines. Better Outcomes.</h1>
          <p>
            A comprehensive portfolio of quality pharmaceutical products across diverse
            therapeutic areas.
          </p>
          <div className="product-search-container" ref={searchRef}>
            <div className="product-search">
              <Search size={22} className="search-icon-left" />
              <input
                type="search"
                value={productQuery}
                onChange={(event) => {
                  setProductQuery(event.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit(productQuery)
                  } else if (e.key === 'Escape') {
                    setShowSuggestions(false)
                  }
                }}
                placeholder="Search medicines, brands or therapeutic areas..."
                aria-label="Search products"
              />
              {productQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => { setProductQuery(''); setShowSuggestions(false); }}
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
              <button className="search-submit-btn" type="button" onClick={() => handleSearchSubmit(productQuery)}>Search</button>
            </div>

            {showSuggestions && (suggestions.categories.length > 0 || suggestions.products.length > 0) && (
              <div className="search-suggestions-dropdown">
                {suggestions.categories.length > 0 && (
                  <div className="suggestions-section">
                    <div className="suggestions-section-title">Therapeutic Areas</div>
                    {suggestions.categories.map((cat) => {
                      const count = getGroupProducts(cat).length
                      return (
                        <button
                          key={cat.title}
                          type="button"
                          className="suggestion-item category-suggestion"
                          onClick={() => {
                            setShowSuggestions(false)
                            openCategory(cat.title)
                          }}
                        >
                          <Activity size={16} className="suggestion-icon" />
                          <div className="suggestion-info">
                            <span className="suggestion-name">{cat.title}</span>
                            <span className="suggestion-meta">{count} {count === 1 ? 'Product' : 'Products'}</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}

                {suggestions.products.length > 0 && (
                  <div className="suggestions-section">
                    <div className="suggestions-section-title">Medicines & Formulations</div>
                    {suggestions.products.map((prod) => (
                      <button
                        key={`${prod.brand}-${prod.composition}`}
                        type="button"
                        className="suggestion-item product-suggestion"
                        onClick={() => {
                          setShowSuggestions(false)
                          setClinicalProduct(prod)
                        }}
                      >
                        <FlaskConical size={16} className="suggestion-icon" />
                        <div className="suggestion-info">
                          <span className="suggestion-name">{prod.brand}</span>
                          {prod.composition && (
                            <span className="suggestion-composition">({prod.composition})</span>
                          )}
                          <span className="suggestion-meta">{prod.group}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {showSuggestions && productQuery.trim().length >= 2 && suggestions.categories.length === 0 && suggestions.products.length === 0 && (
              <div className="search-suggestions-dropdown empty-suggestions">
                <div className="no-suggestions-message">
                  No matching medicines or categories found.
                </div>
              </div>
            )}
          </div>
          <div className="popular-searches">
            <span>Popular Searches:</span>
            {productGroups.slice(0, 5).map((group) => (
              <button
                type="button"
                onClick={() => {
                  setShowSuggestions(false)
                  openCategory(group.title)
                }}
                key={group.title}
              >
                {group.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="product-stat-band" aria-label="Product portfolio statistics">
        <ProductStat icon={FlaskConical} value={totalProducts} label="Listed Products" />
        <ProductStat icon={Activity} value={productGroups.length} label="Therapeutic Areas" />
        <ProductStat icon={ShieldCheck} value={yearsOfExcellence} label="Years of Excellence" />
        <ProductStat icon={UsersRound} value="Trusted" label="Healthcare Network" />
      </section>

      <ProductMarquee className="standalone" />

      <section className="products-section">
        <div className="section-heading product-heading">
          <h2>Our Therapeutic Areas</h2>
          <p>Delivering trusted healthcare solutions across a wide range of therapeutic categories.</p>
        </div>
        <div className="therapy-card-grid">
          {heroMatches.length > 0 ? (
            heroMatches.map((group) => {
              const meta = productCategoryMeta[group.title] || productCategoryMeta.Cardiology
              const Icon = meta.icon
              const count = getGroupProducts(group).length

              return (
                <article className="therapy-card" key={group.title}>
                  <img src={`/assets/${group.image}`} alt="" />
                  <div className="therapy-icon"><Icon size={27} /></div>
                  <h3>{group.title}</h3>
                  <strong>{count} {count === 1 ? 'Product' : 'Products'}</strong>
                  <p>{meta.description}</p>
                  <button type="button" onClick={() => openCategory(group.title)}>
                    View Products <ChevronRight size={17} />
                  </button>
                </article>
              )
            })
          ) : (
            <p className="empty-products">No matching medicines found.</p>
          )}
        </div>
        <button className="view-all-products" type="button" onClick={() => setProductQuery('')}>
          View All Therapeutic Areas <ChevronRight size={17} />
        </button>
      </section>
      <ProductHelpBanner />
      <ProductTrustStrip />
    </>
  )
}

function FilterGroup({ title, open, onToggle, children }) {
  return (
    <section className={open ? 'filter-group open' : 'filter-group'}>
      <button className="filter-group-trigger" type="button" onClick={onToggle} aria-expanded={open}>
        {title}
        <ChevronDown size={17} />
      </button>
      <div className="filter-group-options">
        {children}
      </div>
    </section>
  )
}

function FilterOption({ label, count, active, onClick }) {
  return (
    <button type="button" className={active ? 'active' : ''} onClick={onClick}>
      <span aria-hidden="true" />
      <strong>{label}</strong>
      <em>({count})</em>
    </button>
  )
}

function ProductSkeleton() {
  return (
    <article className="medicine-card product-skeleton" aria-hidden="true">
      <div className="skeleton-block skeleton-image" />
      <div className="skeleton-block skeleton-pill" />
      <div className="skeleton-block skeleton-title" />
      <div className="skeleton-block skeleton-copy" />
      <div className="skeleton-block skeleton-button" />
    </article>
  )
}

function ProductStat({ icon: Icon, value, label }) {
  const valueText = String(value)
  const numericMatch = valueText.match(/^(\d+)(.*)$/)

  return (
    <article>
      <div><Icon size={30} /></div>
      <strong
        className={numericMatch ? 'stat-count' : undefined}
        data-count={numericMatch ? numericMatch[1] : undefined}
        data-suffix={numericMatch ? numericMatch[2] : undefined}
      >
        {value}
      </strong>
      <span>{label}</span>
    </article>
  )
}

function ProductHelpBanner() {
  return (
    <section className="product-help-banner">
      <div className="help-banner-background-overlay" style={{ backgroundImage: 'url("/assets/contact_glassware.png")' }} />
      <div className="help-banner-content">
        <h2>Can’t find what you are looking for?</h2>
        <p>
          Our team is here to help you with the right product.
        </p>
        <div className="help-actions">
          <a href="#/contact-us" className="primary-action-btn">Contact Our Team &rarr;</a>
        </div>
      </div>
    </section>
  )
}

function ProductTrustStrip() {
  const items = [
    [ShieldCheck, 'Quality Assured', 'Products supported by disciplined quality standards.'],
    [FlaskConical, 'Innovation Driven', 'Continuously improving healthcare solutions.'],
    [Globe2, 'Global Reach', 'Supporting pharmaceutical access across multiple markets.'],
    [UsersRound, 'Partner in Health', 'Committed to long-term healthcare partnerships.'],
  ]

  return (
    <section className="product-trust-strip">
      {items.map(([Icon, title, text]) => (
        <article key={title}>
          <div><Icon size={26} /></div>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </section>
  )
}

function ContactPage() {
  return (
    <section className="contact-page">
      <div className="contact-copy">
        <p className="eyebrow">Contact Us</p>
        <h1>{company.shortName}</h1>
        <p>
          <a
            href="https://maps.app.goo.gl/x8DYWqzmjwshdTeg8?g_st=awb"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-address-link"
          >
            {company.registeredOffice}
          </a>
        </p>
        <div className="contact-actions">
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={`tel:${company.landline.replaceAll(' ', '')}`}>{company.landline}</a>
          {company.phones.map((phone) => (
            <a href={`tel:${phone.replaceAll(' ', '')}`} key={phone}>{phone}</a>
          ))}
        </div>
      </div>
      <div className="contact-panel">
        <div>
          <ShieldCheck size={34} />
          <h2>Quality-led pharmaceutical support</h2>
          <p>Research manufacturing, sales and marketing of pharmaceutical formulations.</p>
        </div>
        <div>
          <Globe2 size={34} />
          <h2>International manufacturing collaboration</h2>
          <p>Reputed manufacturing partnerships supporting pharmaceutical formulations and healthcare products.</p>
        </div>
        <div>
          <FlaskConical size={34} />
          <h2>Research & innovation</h2>
          <p>Pharmaceutical research and product support as described on the archived site.</p>
        </div>
      </div>
    </section>
  )
}

function CareersPage() {
  return (
    <>
      <section className="careers-hero">
        <div>
          <p className="eyebrow">Careers</p>
          <h1>Build meaningful healthcare work with Lenimen.</h1>
        </div>
        <p>
          Lenimen Biotech welcomes professionals who value ethical business practices, dependable
          service, and long-term relationships with healthcare partners. Share your profile for
          suitable opportunities across pharmaceutical marketing, distribution, supply support, and
          product operations.
        </p>
      </section>

      <section className="career-focus">
        {careerFocus.map(([title, text]) => (
          <article key={title}>
            <span></span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="careers-open-positions">
        <div className="open-positions-box">
          <h3>Current Openings</h3>
          <p className="no-vacancies-msg">
            There are no active openings at the moment. However, we are always eager to meet talented professionals.
            You can submit your resume below, and we will contact you when a suitable vacancy arises.
          </p>
        </div>
      </section>

      <section className="career-apply">
        <div>
          <h2>Interested in joining?</h2>
          <p>
            Send your resume with your preferred role, location, experience, and contact number.
            The team will review suitable profiles as requirements open.
          </p>
        </div>
        <div className="career-actions">
          <a href={`mailto:${company.email}?subject=Career%20Application%20-%20Lenimen%20Biotech`}>
            <Mail size={18} /> {company.email}
          </a>
          <a href={`tel:${company.phones[0].replaceAll(' ', '')}`}>
            <Phone size={18} /> {company.phones[0]}
          </a>
        </div>
      </section>
    </>
  )
}

function PharmaDetailModal({ product, onClose }) {
  if (!product) return null

  const brand = product.brand || 'Lentor 20'
  const composition = product.composition || 'Atorvastatin Calcium 20 mg Tablets'
  const strength = product.strength || '20 mg'
  const form = product.form || 'Tablet'
  const section = product.section || 'Lipid Lowering Drug'

  return (
    <div
      className="pharma-detail-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="pharma-detail-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close details modal"
        >
          <X size={20} />
        </button>

        <div className="modal-header-banner">
          <div className="modal-badge-row">
            <span>{section}</span>
            <span>Rx Only</span>
          </div>
          <h2>{brand.toUpperCase()}</h2>
          <p className="generic">{composition}</p>
        </div>

        <div className="modal-body-content">
          <div className="modal-col-left">
            <div className="modal-body-section">
              <h3>Clinical Pharmacology</h3>
              <p>
                {brand} acts as a highly effective therapeutic agent. Its active substance, {composition}, is designed
                to provide optimal bioavailability and targeted action. It acts selectively on metabolic pathways
                to ensure controlled, premium therapeutic outcomes.
              </p>
            </div>

            <div className="modal-body-section">
              <h3>Therapeutic Indications</h3>
              <ul>
                <li>Indicated as primary therapy for clinical conditions requiring {section} support.</li>
                <li>Used in combination with dietary adjustments or ancillary therapies.</li>
                <li>Proven efficacy in large-scale clinical trials and professional medical reviews.</li>
                <li>Prophylactic management in patients with elevated therapeutic risk markers.</li>
              </ul>
            </div>
          </div>

          <div className="modal-col-right">
            <div className="modal-body-section">
              <h3>Dosage & Administration</h3>
              <p>
                The recommended dosage is typically 1 dose daily (e.g. {strength}), adjusted according to clinical indicators
                and physician assessment. Regular monitoring of liver function and therapeutic markers is recommended during
                prolonged therapy.
              </p>
            </div>

            <div className="modal-body-section">
              <h3>Storage & Safety guidelines</h3>
              <p>
                Store below 30°C in a dry place. Protect from moisture and direct sunlight. Keep out of reach of children.
                Contraindicated in cases of acute hepatic impairment, hypersensitivity to components, and during pregnancy/lactation.
              </p>
            </div>
          </div>

          <div className="regulatory-badge-strip">
            <div className="regulatory-item">
              <ShieldCheck size={18} />
              <span>WHO-GMP CERTIFIED</span>
            </div>
            <div className="regulatory-item">
              <Activity size={18} />
              <span>ISO 9001:2015</span>
            </div>
            <div className="regulatory-item">
              <FlaskConical size={18} />
              <span>LABORATORY TESTED</span>
            </div>
            <span className="security-seal">SEAL OF AUTHENTICITY</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function FloatingContact() {
  return (
    <div className="floating-contact" aria-label="Quick contact">
      <a href={`tel:${company.phones[0].replaceAll(' ', '')}`} aria-label="Call Lenimen Biotech">
        <Phone size={20} />
      </a>
      <a href={`mailto:${company.email}`} aria-label="Email Lenimen Biotech">
        <Mail size={20} />
      </a>
      <a href="#/contact-us" aria-label="View contact page">
        <MapPin size={20} />
      </a>
    </div>
  )
}

function SocialIcon({ type }) {
  const icons = {
    facebook: (
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.01 10.13 11.91v-8.43H7.08v-3.48h3.05V9.42c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.88v2.26h3.33l-.53 3.48h-2.8v8.43C19.61 23.08 24 18.09 24 12.07z" />
    ),
    twitter: (
      <path d="M23.95 4.57a10 10 0 0 1-2.83.78 4.93 4.93 0 0 0 2.16-2.72 9.86 9.86 0 0 1-3.13 1.2 4.92 4.92 0 0 0-8.39 4.49A13.97 13.97 0 0 1 1.64 3.18a4.9 4.9 0 0 0 1.52 6.57 4.86 4.86 0 0 1-2.23-.62v.06a4.92 4.92 0 0 0 3.95 4.82 4.93 4.93 0 0 1-2.22.08 4.93 4.93 0 0 0 4.6 3.42A9.87 9.87 0 0 1 0 19.54a13.94 13.94 0 0 0 7.55 2.21c9.06 0 14.02-7.5 14.02-14.02v-.64a10.02 10.02 0 0 0 2.38-2.52z" />
    ),
    linkedin: (
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.1 20.45H3.53V9H7.1v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
    ),
    instagram: (
      <>
        <path d="M7.03 0h9.94C20.85 0 24 3.15 24 7.03v9.94C24 20.85 20.85 24 16.97 24H7.03C3.15 24 0 20.85 0 16.97V7.03C0 3.15 3.15 0 7.03 0zm9.94 21.75a4.79 4.79 0 0 0 4.78-4.78V7.03a4.79 4.79 0 0 0-4.78-4.78H7.03a4.79 4.79 0 0 0-4.78 4.78v9.94a4.79 4.79 0 0 0 4.78 4.78h9.94z" />
        <path d="M12 5.84A6.16 6.16 0 1 1 12 18.16 6.16 6.16 0 0 1 12 5.84zm0 10.07A3.91 3.91 0 1 0 12 8.1a3.91 3.91 0 0 0 0 7.82z" />
        <path d="M18.41 5.59a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88z" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {icons[type]}
    </svg>
  )
}

function Footer({ goTo }) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-about">
          <img src="/assets/logo.png" alt="Lenimen Biotech" className="footer-logo" style={{ maxHeight: '44px', width: 'auto', marginBottom: '22px', display: 'block' }} />
          <p>
            Delivering trusted healthcare solutions through quality medicines and innovation for a healthier tomorrow.
          </p>
          <div className="socials" aria-label="Social links">
            {socialItems.map((item) => (
              <span key={item} title={item} className="social-icon-wrapper">
                <SocialIcon type={item} />
              </span>
            ))}
          </div>
        </div>

        <div className="footer-column">
          <h2>Quick Links</h2>
          <ul>
            {['Home', 'About Us', 'Products', 'Careers', 'Contact Us'].map((item) => (
              <li key={item}>
                <button type="button" onClick={() => goTo(item)}>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h2>Our Products</h2>
          <ul>
            {['Cardiology', 'Diabetology', 'Respiratory', 'Gastroenterology', 'View All Categories'].map((item) => (
              <li key={item}>
                <button type="button" onClick={() => { goTo('Products'); window.location.hash = '/products'; }}>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h2>Support</h2>
          <ul>
            {['Quality Assurance', 'FAQs', 'Download Center', 'Privacy Policy', 'Terms & Conditions'].map((item) => (
              <li key={item}>
                <button type="button" onClick={() => goTo('Contact Us')}>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column contact-info-column">
          <h2>Contact Info</h2>
          <dl>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <MapPin size={18} style={{ color: 'var(--teal)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <dt style={{ margin: 0 }}>Corporate Office</dt>
                <dd style={{ margin: '4px 0 0 0' }}>
                  <a
                    href="https://maps.app.goo.gl/x8DYWqzmjwshdTeg8?g_st=awb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-address-link"
                  >
                    Lenimen Biotech Pvt Ltd, 2/76B, CKK Building, Thottumugham, Aluva, Ernakulam, Kerala 683105, India
                  </a>
                </dd>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginTop: '12px' }}>
              <Phone size={18} style={{ color: 'var(--teal)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <dt style={{ margin: 0 }}>Phone</dt>
                <dd style={{ margin: '4px 0 0 0' }}>{company.phones[0]}</dd>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginTop: '12px' }}>
              <Mail size={18} style={{ color: 'var(--teal)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <dt style={{ margin: 0 }}>Email</dt>
                <dd style={{ margin: '4px 0 0 0' }}>{company.email}</dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
      <div className="copyright">
        &copy; 2026 Lenimen Biotech Pvt Ltd. All rights reserved.
      </div>
    </footer>
  )
}

export default App
