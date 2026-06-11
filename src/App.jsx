import { useEffect, useMemo, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Activity,
  ChevronRight,
  FlaskConical,
  Globe2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
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
  registeredOffice: 'IV/475-B, Meparambathu, Thottumugham, Aluva, Ernakulam, Kerala - 683105',
  gstin: '32AACCL6612N1ZH',
  roc: 'Ernakulam',
  status: 'Active',
  email: 'info@lenimenbiotech.com',
  website: 'www.lenimen.com',
  landline: '04832633007',
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
  ['service-formulation.png', 'Manufacturing & Formulation Development'],
  ['service-tech-transfer.png', 'Technology Transfer & Dossier Preparation'],
  ['service-research.png', 'Contract Research & Manufacturing Services'],
  ['service-batch.png', 'Exhibit Batch & F&D Batch Formulation'],
  ['service-contract.png', 'Third-Party Manufacturing Support'],
  ['service-rd.png', 'DSIR Approved R&D Center'],
]

const heroSlides = [
  {
    kicker: 'Pharmaceutical Marketing | Distribution | Healthcare Solutions',
    title: 'Trusted Healthcare Solutions for a Healthier Tomorrow.',
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
  ['Quality Systems', 'Manufacturing partner quality focus'],
  ['Regulatory Standards', 'Regulatory and documentation discipline'],
  ['Product Reliability', 'Consistent, dependable pharmaceutical supply'],
  ['Safety Focus', 'Quality-aware sourcing and distribution practices'],
  ['Partner Review', 'Reputed manufacturing and supply partnerships'],
  ['Compliance Mindset', 'Ethical and responsible business practices'],
]

const therapeuticAreas = [
  {
    title: 'Cardiology',
    brands: [
      'Lentor 10/20',
      'Lentor 40/80',
      'Lentor CV',
      'Lentor F',
      'Cili',
      'NIC5',
      'Ivalen',
      'Betarun',
      'Telimen',
      'Rosulen',
      'Lengrel',
      'Parinex',
      'Lemet',
      'Pantolen',
      'Pantolen D',
      'Febulen',
      'Defalen',
    ],
  },
  {
    title: 'Nephrology',
    brands: [
      'Cili',
      'Lentor 10/20',
      'Lentor 40/80',
      'Lentor CV',
      'Lentor F',
      'NIC5',
      'Ivalen',
      'Betarun',
      'Telimen',
      'Rosulen',
      'Lengrel',
      'Parinex',
      'Lemet',
      'Pantolen',
      'Pantolen D',
      'Febulen',
      'Defalen',
    ],
  },
  {
    title: 'General Medicine',
    brands: [
      'Lentor 10/20',
      'Lentor 40/80',
      'Lentor CV',
      'Lentor F',
      'Cili',
      'Telimen',
      'Rosulen',
      'Lemet',
      'Pantolen',
      'Pantolen D',
      'Febulen',
      'Defalen',
      'Lengrel',
      'Parinex',
      'NIC5',
      'Ivalen',
      'Betarun',
    ],
  },
  {
    title: 'Orthopaedics',
    brands: ['Defalen', 'Parinex', 'Febulen', 'Pantolen', 'Pantolen D'],
  },
  {
    title: 'Gynaecology',
    brands: ['Parinex', 'Pantolen', 'Pantolen D'],
  },
  {
    title: 'ENT',
    brands: ['Defalen', 'Pantolen', 'Pantolen D'],
  },
  {
    title: 'Neurology',
    brands: [
      'Parinex',
      'Lengrel',
      'Lentor 10/20',
      'Lentor 40/80',
      'Lentor CV',
      'Lentor F',
      'Cili',
      'Rosulen',
      'Lemet',
      'Pantolen',
      'Pantolen D',
      'Febulen',
    ],
  },
  {
    title: 'Pediatrics',
    brands: ['Pediatric healthcare formulations and product support'],
  },
  {
    title: 'Gastroenterology',
    brands: ['Pantolen', 'Pantolen D', 'Pantolen IV'],
  },
  {
    title: 'Dermatology',
    brands: ['Dermatology healthcare products and formulation support'],
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
          'Lentor 10mg (Atorvastatin Calcium 10 mg)',
          'Lentor 20mg (Atorvastatin Calcium 20 mg)',
          'Lentor 40mg (Atorvastatin Calcium 40 mg)',
          'Lentor 80mg (Atorvastatin Calcium 80 mg)',
          'Lentor F (Atorvastatin 10 mg + Micronized Fenofibrate 160 mg)',
          'Rosulen 5mg (Rosuvastatin 5 mg)',
          'Rosulen 10mg (Rosuvastatin 10 mg)',
        ],
      },
      {
        title: 'Anti-Anginal Drug',
        medicines: ['NIC 5mg (Nicorandil tablets 5mg)'],
      },
      {
        title: 'HCN Channel Blocker',
        medicines: ['Ivalen 5mg (Ivabradine 5 mg)'],
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
          'Lemet G1 (Glimepiride 1 mg + Metformin 500 mg)',
          'Lemet G2 (Glimepiride 2 mg + Metformin 500 mg)',
          'Depaglif 5mg (Dapagliflozin 5mg)',
          'Depaglif 10mg (Dapagliflozin 10mg)',
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
          'Parinex 40mg (Enoxaparin Sodium Injection 40 mg)',
          'Parinex 60mg (Enoxaparin Sodium Injection 60 mg)',
        ],
      },
      {
        title: 'Anti-Platelet',
        medicines: ['Lengrel-75mg (Clopidogrel 75 mg)'],
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
          'Pantolen 40mg (Pantoprazole 40 mg)',
          'Pantolen-D (Pantoprazole 40 mg + Domperidone 30 mg)',
          'Pantolen IV Injection (Pantoprazole 40mg Injection)',
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
          'Telimen 40mg (Telmisartan 40mg)',
          'Telimen-H 40mg (Telmisartan 40mg + Hydrochlorothiazide 12.5mg)',
          'Cili 5mg (Cilnidipine tablets 5mg)',
          'Cili 10mg (Cilnidipine tablets 10mg)',
          'Cili 20mg (Cilnidipine tablets 20mg)',
          'Cili-T (Cilnidipine tablets 10mg + Telmisartan 40mg)',
          'Betarun XL 25mg (Metoprolol succinate extended release 25 mg)',
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
        medicines: ['Febulen-40mg (Febuxostat 40mg)'],
      },
    ],
  },
  {
    title: 'Pain Management',
    image: 'category-pain.png',
    sections: [
      {
        title: 'Corticosteroid',
        medicines: ['Defalen 6mg (Deflazacort 6 mg)'],
      },
    ],
  },
  {
    title: 'Respiratory',
    image: 'category-respiratory.png',
    sections: [
      {
        title: 'Anti-Histamine',
        medicines: ['Luka-LC (Levocetirizine 5mg + Montelukast 10mg tablet)'],
      },
      {
        title: 'Bronchodilator',
        medicines: [
          'ACBC 100MG (Acebrophylline capsule 100 MG)',
          'ACBC 200MG (Acebrophylline SR Tablets 200 MG)',
          'ACBC-N (Acebrophylline 100mg + Acetylcysteine 600mg)',
        ],
      },
    ],
  },
]

const pageFromHash = () => {
  const hash = window.location.hash.replace('#/', '').toLowerCase()
  return navItems.find((item) => item.toLowerCase().replaceAll(' ', '-') === hash) || 'Home'
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
      <div className="topbar">
        <div className="topbar-inner">
          <span>{company.shortName}, Aluva, Ernakulam, Kerala - 683105</span>
          <span className="topbar-phone">{company.phones[0]}</span>
          <Search size={18} strokeWidth={3} />
        </div>
      </div>
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
        <h2>Quality-Focused Manufacturing Partnerships</h2>
        <p>
          Lenimen Biotech collaborates with reputed manufacturing partners that operate under
          recognized quality systems and regulatory standards to ensure consistency, safety, and
          product reliability.
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

function AssuranceSection() {
  return (
    <section className="assurance-section">
      <img className="doctor-image" src="/assets/doctor-consult.png" alt="Doctor consulting a patient" />
      <div className="assurance-copy">
        <h2>Our Commitment to Better Healthcare</h2>
        <p>
          At Lenimen Biotech, our mission is to improve healthcare accessibility through quality
          pharmaceutical formulations and dependable supply chain solutions. We believe every patient
          deserves access to safe, effective, and affordable healthcare products.
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
      <div className="product-marquee" aria-label="Lenimen product range">
        <div className="product-marquee-track">
          {Array.from({ length: 6 }).map((_, index) => (
            <img src="/assets/product-strip.png" alt="" key={index} />
          ))}
        </div>
      </div>
    </section>
  )
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
          <Activity size={42} />
          <h3>{selectedArea.title}</h3>
          <p>{selectedArea.brands.join(', ')}</p>
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

function ProductsPage() {
  const [openProducts, setOpenProducts] = useState(() => new Set())
  const [productQuery, setProductQuery] = useState('')
  const visibleProductGroups = productGroups
    .map((group) => ({
      ...group,
      sections: group.sections
        .map((section) => ({
          ...section,
          medicines: section.medicines.filter((medicine) => {
            const query = productQuery.trim().toLowerCase()
            const haystack = `${group.title} ${section.title} ${medicine}`.toLowerCase()
            return haystack.includes(query)
          }),
        }))
        .filter((section) => section.medicines.length > 0),
    }))
    .filter((group) => group.sections.length > 0)

  const toggleProduct = (id) => {
    setOpenProducts((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <>
      <section className="products-hero">
        <div>
          <p className="eyebrow">Products</p>
          <h1>Pharmaceutical Formulations & Healthcare Products</h1>
          <p>
            Explore Lenimen Biotech&apos;s therapeutic portfolio across pharmaceutical formulations,
            generic medicines, healthcare products, and institutional medicine supply categories.
          </p>
        </div>
        <img src="/assets/pdf/therapeutic-areas.png" alt="Lenimen therapeutic segments and brands" />
      </section>
      <section className="products-section">
        <div className="product-search">
          <Search size={20} />
          <input
            type="search"
            value={productQuery}
            onChange={(event) => setProductQuery(event.target.value)}
            placeholder="Search medicines, brands, or therapeutic areas"
            aria-label="Search products"
          />
        </div>
        <div className="products-grid">
          {visibleProductGroups.length > 0 ? (
            visibleProductGroups.map((group) => (
              <article className="product-group" key={group.title}>
                <h1>{group.title}</h1>
                {group.image && <img src={`/assets/${group.image}`} alt="" />}
                <div className="product-lines">
                  {group.sections.map((section) => (
                    <ProductAccordion
                      key={`${group.title}-${section.title}`}
                      group={group.title}
                      section={section}
                      isOpen={openProducts.has(`${group.title}-${section.title}`) || productQuery.trim().length > 0}
                      onToggle={() => toggleProduct(`${group.title}-${section.title}`)}
                    />
                  ))}
                </div>
              </article>
            ))
          ) : (
            <p className="empty-products">No matching medicines found.</p>
          )}
        </div>
      </section>
    </>
  )
}

function ProductAccordion({ group, section, isOpen, onToggle }) {
  const panelId = `${group}-${section.title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  return (
    <div className={isOpen ? 'product-accordion open' : 'product-accordion'}>
      <button
        type="button"
        className="product-trigger"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span>{section.title}</span>
        <span aria-hidden="true">{isOpen ? '-' : '+'}</span>
      </button>
      <div className="medicine-list" id={panelId} hidden={!isOpen}>
        {section.medicines.map((medicine) => (
          <p key={medicine}>{medicine}</p>
        ))}
      </div>
    </div>
  )
}

function ContactPage() {
  return (
    <section className="contact-page">
      <div className="contact-copy">
        <p className="eyebrow">Contact Us</p>
        <h1>{company.shortName}</h1>
        <p>
          {company.registeredOffice}
        </p>
        <div className="contact-actions">
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={`tel:${company.landline}`}>{company.landline}</a>
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
          <h2>About Us</h2>
          <p>
            <strong>{company.shortName}</strong> is committed to delivering quality pharmaceutical
            formulations, healthcare products, and institutional supply solutions through ethical
            business practices and dependable partnerships.
          </p>
          <div className="socials" aria-label="Social links">
            {socialItems.map((item) => (
              <span key={item} title={item}>
                <SocialIcon type={item} />
              </span>
            ))}
          </div>
        </div>
        <div className="quick-links">
          <h2>Quick Links</h2>
          <div className="footer-link-columns">
            <ul>
              {['Home', 'About Us', 'Products', 'Careers'].map((item) => (
                <li key={item}>
                  <button type="button" onClick={() => goTo(item)}>
                    <ChevronRight size={15} /> {item}
                  </button>
                </li>
              ))}
            </ul>
            <ul>
              <li>
                <button type="button" onClick={() => goTo('Contact Us')}>
                  <ChevronRight size={15} /> Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="hours">
          <h2>Contact Info</h2>
          <dl>
            <div>
              <dt>Corporate Office</dt>
              <dd>Aluva, Ernakulam, Kerala - 683105</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{company.phones[0]}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{company.email}</dd>
            </div>
            <div>
              <dt>Website</dt>
              <dd>{company.website}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="copyright">2021 © All rights reserved by Lenimen Biotech Pvt Ltd</div>
    </footer>
  )
}

export default App
