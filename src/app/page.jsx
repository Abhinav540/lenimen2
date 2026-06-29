"use client"

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

const careerFocus = [
  ['Pharma Marketing & Distribution', 'Field professionals who understand healthcare relationships and ethical market development.'],
  ['Institutional Supply Support', 'Coordinated service for hospitals, healthcare institutions, pharmacies, and distribution partners.'],
  ['Product & Portfolio Operations', 'People who can support pharmaceutical formulations, healthcare products, and therapeutic segments with accuracy.'],
]

const socialItems = ['facebook', 'twitter', 'linkedin', 'instagram']

const socialLinks = {
  facebook: 'https://www.facebook.com/lenimenbiotech',
  instagram: 'https://www.instagram.com/lenimenbiotech/',
}

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

const productCategoryMeta = {
  Cardiology: {
    icon: Activity,
    description: 'Medicines for heart health, blood pressure, cholesterol, and cardiac risk management.',
  },
  Diabetology: {
    icon: FlaskConical,
    description: 'Anti-diabetic formulations supporting blood sugar management and glycemic care.',
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

const splitMedicineName = (medicine) => {
  const match = medicine.match(/^(.+?)\s*\((.+)\)$/)
  return {
    brand: match ? match[1].trim() : medicine,
    composition: match ? match[2].trim() : '',
  }
}

const pageFromHash = () => {
  if (typeof window === 'undefined') return 'Home'
  const hash = window.location.hash.replace('#/', '').toLowerCase()
  if (hash.startsWith('products')) return 'Products'
  return navItems.find((item) => item.toLowerCase().replaceAll(' ', '-') === hash) || 'Home'
}

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
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

export default function App() {
  const [page, setPage] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [dbProducts, setDbProducts] = useState([])
  const [dbCareers, setDbCareers] = useState([])
  const [dbNews, setDbNews] = useState([])
  const [loadingData, setLoadingData] = useState(true)

  usePharmaAnimations(page)

  useEffect(() => {
    setPage(pageFromHash())
    const syncPage = () => setPage(pageFromHash())
    window.addEventListener('hashchange', syncPage)

    // Fetch dynamic products, job openings, and news updates
    const fetchData = async () => {
      try {
        const pRes = await fetch('/api/products')
        const pData = await pRes.json()
        setDbProducts(pData)

        const cRes = await fetch('/api/careers?active=true')
        const cData = await cRes.json()
        setDbCareers(cData)

        const nRes = await fetch('/api/news')
        const nData = await nRes.json()
        setDbNews(nData)
      } catch (err) {
        console.error('Error fetching dynamic data:', err)
      } finally {
        setLoadingData(false)
      }
    }
    fetchData()

    return () => window.removeEventListener('hashchange', syncPage)
  }, [])

  useEffect(() => {
    scrollToTop()
  }, [page])

  const goTo = (item) => {
    setPage(item)
    setMenuOpen(false)
    window.location.hash = `/${item.toLowerCase().replaceAll(' ', '-')}`
    scrollToTop()
  }

  // Group database products dynamically into categories
  const dynamicProductGroups = useMemo(() => {
    if (dbProducts.length === 0) return []

    const groupsMap = {}
    const categoryImages = {
      Cardiology: 'category-cardiology.png',
      Diabetology: 'category-diabetology.png',
      Hematology: 'category-hematology.png',
      Gastroenterology: 'category-gastroenterology.png',
      Hypertension: 'category-hypertension.png',
      Urology: 'category-urology.png',
      'Pain Management': 'category-pain.png',
      Respiratory: 'category-respiratory.png',
    }

    dbProducts.forEach((p) => {
      if (!groupsMap[p.group]) {
        groupsMap[p.group] = {
          title: p.group,
          image: categoryImages[p.group] || 'category-cardiology.png',
          sectionsMap: {},
        }
      }

      if (!groupsMap[p.group].sectionsMap[p.section]) {
        groupsMap[p.group].sectionsMap[p.section] = {
          title: p.section,
          medicines: [],
        }
      }

      const medStr = p.composition ? `${p.brand} (${p.composition})` : p.brand
      groupsMap[p.group].sectionsMap[p.section].medicines.push(medStr)
    })

    return Object.values(groupsMap).map((g) => ({
      title: g.title,
      image: g.image,
      sections: Object.values(g.sectionsMap),
    }))
  }, [dbProducts])

  // Flat list of products derived dynamically
  const parsedProductsList = useMemo(() => {
    if (dbProducts.length > 0) {
      return dbProducts.map((p) => ({
        ...p,
        medicine: p.composition ? `${p.brand} (${p.composition})` : p.brand,
      }))
    }
    return []
  }, [dbProducts])

  const CurrentPage = useMemo(() => {
    if (page === 'About Us') return AboutPage
    if (page === 'Products') {
      return (props) => (
        <ProductsPage
          {...props}
          productsList={parsedProductsList}
          productGroups={dynamicProductGroups}
          loading={loadingData}
        />
      )
    }
    if (page === 'Contact Us') return ContactPage
    if (page === 'Careers') {
      return (props) => (
        <CareersPage
          {...props}
          careers={dbCareers}
        />
      )
    }
    return (props) => (
      <HomePage
        {...props}
        newsList={dbNews}
      />
    )
  }, [page, parsedProductsList, dynamicProductGroups, dbCareers, dbNews, loadingData])

  return (
    <>
      <Header active={page} goTo={goTo} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main style={{ minHeight: '60vh' }}>
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

function HomePage({ goTo, newsList }) {
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
      <NewsSection newsList={newsList} />
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
  const b = brand.toLowerCase()
  if (b.includes('lentor')) return '/assets/strip-lentor.png'
  if (b.includes('cili')) return '/assets/strip-cili.png'
  if (b.includes('parinex')) return '/assets/strip-parinex.png'
  if (b.includes('telimen')) return '/assets/strip-telimen.png'
  if (b.includes('betarun')) return '/assets/strip-betarun.png'
  if (b.includes('rosulen')) return '/assets/strip-rosulen.png'
  if (b.includes('pantolen')) return '/assets/strip-pantolen.png'
  if (b.includes('nic')) return '/assets/strip-nic.png'
  if (b.includes('lemet')) return '/assets/strip-lemet-g1.png'
  if (b.includes('lengrel')) return '/assets/strip-lengrel.png'
  if (b.includes('ivalen')) return '/assets/strip-ivalen.png'
  if (b.includes('febulen')) return '/assets/strip-febulen.png'
  if (b.includes('luka')) return '/assets/strip-luka-lc.png'
  return null
}

const renderMiniLogo = (brand) => {
  const lower = brand.toLowerCase()
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
  const meta = productCategoryMeta[title]
  if (meta && meta.icon) {
    const IconComponent = meta.icon
    return <IconComponent size={42} />
  }
  return <Activity size={42} />
}

const staticTherapeuticAreas = [
  {
    title: 'Cardiology',
    brands: ['Lentor', 'Lentor-F', 'Cili', 'Cili-T', 'NIC 5mg', 'Ivalen', 'Betarun', 'Telimen', 'Telimen H40', 'Rosulen', 'Lengrel-75mg', 'Parinex', 'Lemet', 'Sitamen', 'Vasolazine', 'Pantolen', 'Pantolen-D', 'Febulen', 'Defalen'],
  },
  {
    title: 'Nephrology',
    brands: ['Cili', 'Lentor', 'Lentor-F', 'NIC 5mg', 'Ivalen', 'Betarun', 'Telimen', 'Telimen H40', 'Rosulen', 'Lengrel-75mg', 'Parinex', 'Lemet', 'Sitamen', 'Pantolen', 'Pantolen-D', 'Febulen', 'Defalen'],
  },
  {
    title: 'General Medicine',
    brands: ['Lentor', 'Lentor-F', 'Cili', 'Cili-T', 'Telimen', 'Telimen H40', 'Rosulen', 'Lemet', 'Sitamen', 'Vasolazine', 'Pantolen', 'Pantolen-D', 'Febulen', 'Defalen', 'Lengrel-75mg', 'Parinex', 'NIC 5mg', 'Ivalen', 'Betarun', 'LUKA-LC', 'Bilaget', 'Bilaget M', 'ACBC', 'ACBC-N'],
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
    brands: ['Parinex', 'Lengrel-75mg', 'Lentor', 'Lentor-F', 'Cili', 'Rosulen', 'Lemet', 'Sitamen', 'Pantolen', 'Pantolen-D', 'Febulen'],
  },
  {
    title: 'Gastroenterology',
    brands: ['Pantolen', 'Pantolen-D'],
  },
]

function PortfolioSection() {
  const [activeArea, setActiveArea] = useState(staticTherapeuticAreas[0].title)
  const selectedArea = staticTherapeuticAreas.find((area) => area.title === activeArea) || staticTherapeuticAreas[0]
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
          {staticTherapeuticAreas.map((area) => (
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
                const logoImg = getBrandLogo(brand)
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
        <h2>From Sourcing to Healthcare Delivery</h2>
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

function NewsSection({ newsList = [] }) {
  const [selectedArticle, setSelectedArticle] = useState(null)
  
  if (!newsList || newsList.length === 0) return null

  return (
    <section className="news-section" style={{ padding: '80px 0', background: 'linear-gradient(180deg, #ffffff 0%, #f4fbfd 100%)', borderTop: '1px solid var(--line)' }}>
      <div style={{ width: 'min(var(--max), calc(100% - 36px))', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="eyebrow" style={{ color: 'var(--teal)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '12px', margin: '0 0 10px' }}>Updates & News</p>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>Company Announcements</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
          {newsList.map((article) => (
            <article key={article.id} className="news-card" style={{ background: 'var(--white)', border: '1px solid var(--border-color)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgb(7 27 90 / 4%)', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
              <div style={{ height: '200px', width: '100%', overflow: 'hidden', background: 'linear-gradient(135deg, #0b2d6b 0%, #13b8c6 100%)', position: 'relative' }}>
                {article.image ? (
                  <img src={`/assets/${article.image}`} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#fff', opacity: 0.15 }}>
                    <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M16 8h2m-6 0h2M8 8h2m-2 4h6m-6 4h10" /></svg>
                  </div>
                )}
              </div>
              <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--teal)' }}>
                  {new Date(article.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)', margin: 0, lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--muted)', margin: 0, lineHeight: '1.6', flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {article.content}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  style={{ alignSelf: 'flex-start', background: 'transparent', border: 0, color: 'var(--teal)', fontWeight: 700, fontSize: '13.5px', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px' }}
                >
                  Read Article &rarr;
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ARTICLE FULL READ MODAL */}
      {selectedArticle && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(7, 27, 90, 0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: '#ffffff', borderRadius: '32px', maxWidth: '680px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative' }}>
            <button
              onClick={() => setSelectedArticle(null)}
              style={{ position: 'absolute', right: '20px', top: '20px', background: '#ffffff', border: '1px solid #e2e8f0', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, color: 'var(--navy)' }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>

            {selectedArticle.image && (
              <div style={{ height: '280px', width: '100%', overflow: 'hidden', background: '#f8fafc' }}>
                <img src={`/assets/${selectedArticle.image}`} alt={selectedArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}

            <div style={{ padding: '36px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--teal)', display: 'block', marginBottom: '12px' }}>
                Published on {new Date(selectedArticle.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <h2 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--navy)', marginTop: 0, marginBottom: '20px', lineHeight: '1.3' }}>
                {selectedArticle.title}
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.75', whiteSpace: 'pre-wrap', margin: 0 }}>
                {selectedArticle.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function AboutPage() {
  return (
    <>
      <IntroSection />
      <CredibilitySection />
      <ProductMarquee className="standalone" />
    </>
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
  return product.description || 'High-quality pharmaceutical formulation for professional therapeutic care.'
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
  const total = Array.from(brand || '').reduce((sum, letter) => sum + letter.charCodeAt(0), 0)
  const accent = productAccentPalette[total % productAccentPalette.length]
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

const renderProductVisual = (product) => {
  if (product.image) {
    return (
      <img
        src={`/assets/${product.image}`}
        alt={`${product.brand} pharmaceutical pack`}
      />
    )
  }
  const brandLower = (product.brand || '').toLowerCase()
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

function ProductsPage({ productsList, productGroups, loading }) {
  const getCategoryFromHash = () => {
    if (typeof window === 'undefined') return ''
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
  const [productQuery, setProductQuery] = useState('')
  const [catalogQuery, setCatalogQuery] = useState('')
  const [selectedSections, setSelectedSections] = useState([])
  const [selectedStrengths, setSelectedStrengths] = useState([])
  const [selectedForms, setSelectedForms] = useState([])
  const [sortMode, setSortMode] = useState('az')
  const [viewMode, setViewMode] = useState('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [clinicalProduct, setClinicalProduct] = useState(null)
  const [starredProducts, setStarredProducts] = useState({})
  const [showSuggestions, setShowSuggestions] = useState(false)

  const searchRef = useRef(null)

  useEffect(() => {
    const handleHashChange = () => {
      setSelectedGroupTitle(getCategoryFromHash())
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [productGroups])

  // Close search suggestions on click outside
  useEffect(() => {
    const clickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', clickOutside)
    return () => document.removeEventListener('mousedown', clickOutside)
  }, [])

  const toggleStar = (id) => {
    setStarredProducts((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const openCategory = (title) => {
    setSelectedGroupTitle(title)
    setCatalogQuery('')
    window.location.hash = `/products/${title.toLowerCase().replaceAll(' ', '-')}`
    scrollToTop()
  }

  const handleSearchSubmit = (query) => {
    setCatalogQuery(query)
    setShowSuggestions(false)
    if (!selectedGroupTitle && productGroups.length > 0) {
      // Find matches across groups
      const matchedGroup = productGroups.find(g =>
        g.title.toLowerCase().includes(query.toLowerCase())
      )
      if (matchedGroup) {
        openCategory(matchedGroup.title)
      } else {
        openCategory(productGroups[0].title)
      }
    }
  }

  const clearCatalogFilters = () => {
    setSelectedSections([])
    setSelectedStrengths([])
    setSelectedForms([])
    setCatalogQuery('')
  }

  const activeGroup = useMemo(() => {
    return productGroups.find((g) => g.title === selectedGroupTitle)
  }, [productGroups, selectedGroupTitle])

  // Filters computed based on selected category products
  const categoryProducts = useMemo(() => {
    if (!selectedGroupTitle) return []
    return productsList.filter((p) => p.group === selectedGroupTitle)
  }, [productsList, selectedGroupTitle])

  const sections = useMemo(() => {
    return Array.from(new Set(categoryProducts.map((p) => p.section)))
  }, [categoryProducts])

  const strengths = useMemo(() => {
    return Array.from(new Set(categoryProducts.map((p) => p.strength))).filter(Boolean)
  }, [categoryProducts])

  const forms = useMemo(() => {
    return Array.from(new Set(categoryProducts.map((p) => p.form))).filter(Boolean)
  }, [categoryProducts])

  // Search autocomplete suggestions
  const suggestions = useMemo(() => {
    if (!productQuery.trim()) return { categories: [], products: [] }
    const cleanQuery = productQuery.toLowerCase()

    const categories = productGroups.filter((g) =>
      g.title.toLowerCase().includes(cleanQuery)
    )

    const products = productsList.filter((p) =>
      p.brand.toLowerCase().includes(cleanQuery) ||
      (p.composition && p.composition.toLowerCase().includes(cleanQuery))
    ).slice(0, 5)

    return { categories, products }
  }, [productQuery, productGroups, productsList])

  // Apply filters & search to active category list
  const filteredProducts = useMemo(() => {
    let list = [...categoryProducts]

    if (catalogQuery) {
      const q = catalogQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.brand.toLowerCase().includes(q) ||
          p.composition.toLowerCase().includes(q) ||
          p.section.toLowerCase().includes(q)
      )
    }

    if (selectedSections.length > 0) {
      list = list.filter((p) => selectedSections.includes(p.section))
    }
    if (selectedStrengths.length > 0) {
      list = list.filter((p) => selectedStrengths.includes(p.strength))
    }
    if (selectedForms.length > 0) {
      list = list.filter((p) => selectedForms.includes(p.form))
    }

    if (sortMode === 'az') {
      list.sort((a, b) => a.brand.localeCompare(b.brand))
    } else if (sortMode === 'za') {
      list.sort((a, b) => b.brand.localeCompare(a.brand))
    }

    return list
  }, [categoryProducts, catalogQuery, selectedSections, selectedStrengths, selectedForms, sortMode])

  // Pagination params
  const itemsPerPage = 8
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage)
  const safeCurrentPage = Math.min(currentPage, Math.max(1, pageCount))

  const paginatedProducts = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage
    return filteredProducts.slice(start, start + itemsPerPage)
  }, [filteredProducts, safeCurrentPage])

  const totalProducts = productsList.length
  const yearsOfExcellence = new Date().getFullYear() - Number(company.year)

  // Matching home categories search
  const heroMatches = useMemo(() => {
    if (!productQuery) return productGroups
    const q = productQuery.toLowerCase()
    return productGroups.filter((group) =>
      group.title.toLowerCase().includes(q) ||
      group.sections.some((s) =>
        s.title.toLowerCase().includes(q) ||
        s.medicines.some((m) => m.toLowerCase().includes(q))
      )
    )
  }, [productQuery, productGroups])

  if (selectedGroupTitle && activeGroup) {
    const categoryBg = categoryHeroImages[selectedGroupTitle] || 'research-lab.png'
    return (
      <>
        <section className="category-product-hero">
          <div className="category-hero-visual">
            <img src={`/assets/${categoryBg}`} alt={selectedGroupTitle} />
          </div>
          
          <div className="category-hero-copy">
            <div className="category-breadcrumbs" style={{ fontSize: '13.5px', color: 'var(--muted)', display: 'flex', gap: '6px', marginBottom: '18px' }}>
              <span style={{ cursor: 'pointer', fontWeight: 700 }} onClick={() => { setSelectedGroupTitle(''); window.location.hash = '/'; scrollToTop(); }}>Home</span> /
              <span style={{ cursor: 'pointer', fontWeight: 700 }} onClick={() => { setSelectedGroupTitle(''); window.location.hash = '/products'; scrollToTop(); }}>Products</span> /
              <span style={{ color: 'var(--navy)', fontWeight: 800 }}>{selectedGroupTitle}</span>
            </div>
            
            <h1 style={{ fontSize: '48px', fontWeight: 900, color: 'var(--navy)', marginBottom: '14px' }}>{selectedGroupTitle}</h1>
            <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.68', marginBottom: '28px', maxWidth: '520px' }}>
              {productCategoryMeta[selectedGroupTitle]?.description || 'Formulations for clinical and therapeutic healthcare needs.'}
            </p>
            
            <div className="category-meta-chips" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 800, color: 'var(--navy)' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--teal)" strokeWidth="2.5" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                <strong>{categoryProducts.length}</strong> Products Available
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 800, color: 'var(--navy)' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--teal)" strokeWidth="2.5" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 11 11 13 15 9" /></svg>
                Quality Assured
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 800, color: 'var(--navy)' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--teal)" strokeWidth="2.5" fill="none"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                India Supply Network
              </span>
            </div>
          </div>
        </section>

        <section className="product-catalog" id="catalog-listing">
          {/* Left Column: Filter Panel */}
          <aside className={filterDrawerOpen ? 'filter-panel open' : 'filter-panel'}>
            <div className="filter-heading">
              <h2>Filter Products</h2>
              <button type="button" className="reset-all-link" onClick={clearCatalogFilters}>Reset All</button>
              <button type="button" className="filter-close" onClick={() => setFilterDrawerOpen(false)} style={{ display: 'none' }}><X size={20} /></button>
            </div>

            {/* Sidebar Search */}
            <div className="filter-search">
              <input
                type="search"
                value={catalogQuery}
                onChange={(e) => setCatalogQuery(e.target.value)}
                placeholder={`Search in ${selectedGroupTitle}...`}
              />
              <Search size={16} />
            </div>

            {/* Filter Groups */}
            <FilterGroup title="THERAPEUTIC SUBCATEGORY" open={true} onToggle={() => {}}>
              <div style={{ display: 'grid', gap: '8px' }}>
                {sections.map((sec) => {
                  const count = categoryProducts.filter((p) => p.section === sec).length
                  const isActive = selectedSections.includes(sec)
                  return (
                    <FilterOption
                      key={sec}
                      label={sec}
                      count={count}
                      active={isActive}
                      onClick={() => {
                        setSelectedSections((prev) =>
                          prev.includes(sec) ? prev.filter((s) => s !== sec) : [...prev, sec]
                        )
                      }}
                    />
                  )
                })}
              </div>
            </FilterGroup>

            <FilterGroup title="DOSAGE STRENGTH" open={true} onToggle={() => {}}>
              <div style={{ display: 'grid', gap: '8px' }}>
                {strengths.map((str) => {
                  const count = categoryProducts.filter((p) => p.strength === str).length
                  const isActive = selectedStrengths.includes(str)
                  return (
                    <FilterOption
                      key={str}
                      label={str}
                      count={count}
                      active={isActive}
                      onClick={() => {
                        setSelectedStrengths((prev) =>
                          prev.includes(str) ? prev.filter((s) => s !== str) : [...prev, str]
                        )
                      }}
                    />
                  )
                })}
              </div>
            </FilterGroup>

            <FilterGroup title="FORMULATION TYPE" open={true} onToggle={() => {}}>
              <div style={{ display: 'grid', gap: '8px' }}>
                {forms.map((fm) => {
                  const count = categoryProducts.filter((p) => p.form === fm).length
                  const isActive = selectedForms.includes(fm)
                  return (
                    <FilterOption
                      key={fm}
                      label={fm}
                      count={count}
                      active={isActive}
                      onClick={() => {
                        setSelectedForms((prev) =>
                          prev.includes(fm) ? prev.filter((f) => f !== fm) : [...prev, fm]
                        )
                      }}
                    />
                  )
                })}
              </div>
            </FilterGroup>
          </aside>

          {/* Backdrop on mobile */}
          {filterDrawerOpen && (
            <button className="filter-drawer-backdrop" type="button" onClick={() => setFilterDrawerOpen(false)} aria-label="Close filters panel" />
          )}

          {/* Right Column: Catalog Results */}
          <div className="catalog-results">
            {/* Mobile Filter Toggle Button */}
            <button className="mobile-filter-trigger" type="button" onClick={() => setFilterDrawerOpen(true)}>
              <SlidersHorizontal size={16} /> Filters
              {(selectedSections.length + selectedStrengths.length + selectedForms.length) > 0 && (
                <span>{selectedSections.length + selectedStrengths.length + selectedForms.length}</span>
              )}
            </button>
              {loading ? (
                <div className={`medicine-card-grid ${viewMode === 'grid' ? 'compact-view' : 'list-view'}`} aria-label="Loading products">
                  {Array.from({ length: 6 }, (_, index) => <ProductSkeleton key={index} />)}
                </div>
              ) : paginatedProducts.length > 0 ? (
                <div className={`medicine-card-grid ${viewMode === 'grid' ? 'compact-view' : 'list-view'}`}>
                  {paginatedProducts.map((product, i) => {
                    const productId = product.id
                    const isStarred = !!starredProducts[productId]
                    return (
                      <article
                        className="medicine-card"
                        key={productId}
                        style={{ '--product-accent': product.accent }}
                        onClick={() => setClinicalProduct(product)}
                      >
                        <button
                          className={`card-star-btn ${isStarred ? 'starred' : ''}`}
                          type="button"
                          onClick={(e) => { e.stopPropagation(); toggleStar(productId); }}
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
                  <p>Try searching with a broader formulation name or chemical composition.</p>
                  <button type="button" onClick={clearCatalogFilters}>Clear search</button>
                </div>
              )}

              {pageCount > 1 && (
                <nav className="catalog-pagination" aria-label="Product pagination">
                  <button
                    type="button"
                    className="page-prev-btn"
                    disabled={safeCurrentPage === 1}
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  >
                    &lt;
                  </button>
                  {Array.from({ length: pageCount }, (_, index) => index + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={safeCurrentPage === p ? 'active' : ''}
                      aria-current={safeCurrentPage === p ? 'page' : undefined}
                      onClick={() => setCurrentPage(p)}
                    >
                      {p}
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
              )}
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
                      const count = productsList.filter((p) => p.group === cat.title).length
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
                        key={prod.id}
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
              const count = productsList.filter((p) => p.group === group.title).length

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
            <p className="empty-products" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No matching medicines found.</p>
          )}
        </div>
        <button className="view-all-products" type="button" onClick={() => setProductQuery('')}>
          View All Therapeutic Areas <ChevronRight size={17} />
        </button>
      </section>
      <ProductHelpBanner />
      <ProductTrustStrip />
      {clinicalProduct && (
        <PharmaDetailModal
          product={clinicalProduct}
          onClose={() => setClinicalProduct(null)}
        />
      )}
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

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess(true)
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        setErrorMsg(data.error || 'Failed to submit enquiry. Please try again.')
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="contact-page" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '80px 0', width: 'min(var(--max), calc(100% - 36px))', margin: '0 auto' }}>
      <div className="contact-copy" style={{ maxWidth: '100%' }}>
        <p className="eyebrow">Contact Us</p>
        <h1 style={{ color: '#0d2260', fontSize: '38px', fontWeight: 900, marginBottom: '20px' }}>{company.shortName}</h1>
        <p>
          <a
            href="https://maps.app.goo.gl/x8DYWqzmjwshdTeg8?g_st=awb"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-address-link"
            style={{ display: 'flex', gap: '8px', color: 'var(--muted)', textDecoration: 'none', lineHeight: 1.6 }}
          >
            <MapPin size={20} style={{ color: 'var(--teal)', flexShrink: 0, marginTop: '2px' }} />
            <span>{company.registeredOffice}</span>
          </a>
        </p>
        <div className="contact-actions" style={{ display: 'grid', gap: '12px', marginTop: '28px' }}>
          <a href={`mailto:${company.email}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--navy)', fontWeight: 700 }}><Mail size={16} style={{ color: 'var(--teal)' }} /> {company.email}</a>
          <a href={`tel:${company.landline.replaceAll(' ', '')}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--navy)', fontWeight: 700 }}><Phone size={16} style={{ color: 'var(--teal)' }} /> {company.landline}</a>
          {company.phones.map((phone) => (
            <a href={`tel:${phone.replaceAll(' ', '')}`} key={phone} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--navy)', fontWeight: 700 }}>
              <Phone size={16} style={{ color: 'var(--teal)' }} /> {phone}
            </a>
          ))}
        </div>

        <div className="contact-panel" style={{ marginTop: '48px', display: 'grid', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '14px' }}>
            <ShieldCheck size={28} style={{ color: 'var(--pink)', flexShrink: 0 }} />
            <div>
              <h3 style={{ margin: '0 0 4px', color: 'var(--navy)', fontSize: '15px' }}>Quality-led pharmaceutical support</h3>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)' }}>Research manufacturing, sales and marketing of pharmaceutical formulations.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '14px' }}>
            <Globe2 size={28} style={{ color: 'var(--pink)', flexShrink: 0 }} />
            <div>
              <h3 style={{ margin: '0 0 4px', color: 'var(--navy)', fontSize: '15px' }}>International manufacturing collaboration</h3>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)' }}>Reputed manufacturing partnerships supporting pharmaceutical formulations and healthcare products.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-form-container" style={{
        background: '#ffffff',
        border: '1px solid #c4d0d6',
        borderRadius: '16px',
        padding: '36px',
        boxShadow: '0 12px 36px rgba(7, 19, 58, 0.06)'
      }}>
        <h2 style={{ color: 'var(--navy)', fontWeight: 800, fontSize: '24px', marginBottom: '8px' }}>Send an Enquiry</h2>
        <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>Have a question or request supply? Let us know and we will get back to you within 24 hours.</p>

        {success ? (
          <div style={{ padding: '24px', background: '#effafb', border: '1px solid #b9dfe2', borderRadius: '8px', textAlign: 'center' }}>
            <Smile size={38} style={{ color: 'var(--teal)', marginBottom: '12px' }} />
            <h3 style={{ color: 'var(--navy)', margin: '0 0 6px' }}>Message Sent!</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0 }}>Thank you for reaching out. A sales or support officer will contact you shortly.</p>
            <button type="button" onClick={() => setSuccess(false)} style={{
              marginTop: '16px',
              border: 0,
              background: 'var(--teal)',
              color: '#fff',
              padding: '6px 16px',
              borderRadius: '16px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}>Send another message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label htmlFor="contact-name" style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px' }}>Full Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #b9bdc3', font: 'inherit', fontSize: '14px' }}
                />
              </div>
              <div>
                <label htmlFor="contact-phone" style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px' }}>Phone Number *</label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+91 99999 99999"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #b9bdc3', font: 'inherit', fontSize: '14px' }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-email" style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px' }}>Email Address *</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="john@example.com"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #b9bdc3', font: 'inherit', fontSize: '14px' }}
              />
            </div>
            <div>
              <label htmlFor="contact-subject" style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px' }}>Subject *</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                placeholder="Distributorship, Product supply, etc."
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #b9bdc3', font: 'inherit', fontSize: '14px' }}
              />
            </div>
            <div>
              <label htmlFor="contact-message" style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px' }}>Message *</label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Describe your inquiry details..."
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #b9bdc3', font: 'inherit', fontSize: '14px', resize: 'vertical' }}
              />
            </div>

            {errorMsg && <p style={{ color: 'red', fontSize: '13px', margin: 0 }}>{errorMsg}</p>}

            <button type="submit" disabled={submitting} className="primary-button" style={{
              width: '100%',
              padding: '12px',
              borderRadius: '24px',
              fontSize: '14px',
              fontWeight: 800,
              background: submitting ? 'var(--muted)' : 'var(--teal)',
              color: '#fff',
              marginTop: '10px'
            }}>
              {submitting ? 'Sending...' : 'Send Enquiry'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

function CareersPage({ careers }) {
  const [selectedJob, setSelectedJob] = useState(null)
  const [applyForm, setApplyForm] = useState({
    jobId: '',
    jobTitle: 'General Application',
    name: '',
    email: '',
    phone: '',
    experience: '',
    resumeUrl: '',
    coverLetter: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const formRef = useRef(null)

  const handleApplyClick = (job) => {
    setSelectedJob(job)
    setApplyForm((prev) => ({
      ...prev,
      jobId: job ? job.id : '',
      jobTitle: job ? job.title : 'General Application'
    }))
    
    // Scroll down to the apply form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setApplyForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/applicants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applyForm)
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess(true)
        setApplyForm({
          jobId: '',
          jobTitle: 'General Application',
          name: '',
          email: '',
          phone: '',
          experience: '',
          resumeUrl: '',
          coverLetter: ''
        })
        setSelectedJob(null)
      } else {
        setErrorMsg(data.error || 'Failed to submit application.')
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <section className="careers-hero">
        <div>
          <p className="eyebrow">Careers</p>
          <h1>Build Meaningful Healthcare Work with Lenimen.</h1>
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

      <section className="careers-open-positions" style={{ padding: '60px 0', width: 'min(var(--max), calc(100% - 36px))', margin: '0 auto' }}>
        <h2 style={{ color: '#0d2260', fontSize: '32px', fontWeight: 900, marginBottom: '28px', textAlign: 'center' }}>Active Vacancies</h2>
        
        {careers.length > 0 ? (
          <div className="open-positions-list" style={{ display: 'grid', gap: '24px' }}>
            {careers.map((job) => (
              <article key={job.id} className="job-position-card" style={{
                background: '#fff',
                border: '1px solid #c4d0d6',
                borderRadius: '16px',
                padding: '28px 36px',
                boxShadow: '0 8px 24px rgba(7, 19, 58, 0.03)',
                display: 'grid',
                gap: '16px'
              }}>
                <div className="job-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 6px', color: 'var(--navy)', fontSize: '20px', fontWeight: 800 }}>{job.title}</h3>
                    <span className="job-location" style={{ fontSize: '13px', color: 'var(--teal)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{job.location} &bull; {job.type}</span>
                  </div>
                  <button type="button" className="primary-button" onClick={() => handleApplyClick(job)}>Apply For This Role</button>
                </div>
                <div className="job-card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', paddingTop: '20px', borderTop: '1px solid var(--line)' }}>
                  <div>
                    <h4 style={{ margin: '0 0 10px', color: 'var(--navy)', fontSize: '15px', fontWeight: 700 }}>Description</h4>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{job.description}</p>
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 10px', color: 'var(--navy)', fontSize: '15px', fontWeight: 700 }}>Requirements</h4>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{job.requirements}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="open-positions-box">
            <h3>Current Openings</h3>
            <p className="no-vacancies-msg">
              There are no active openings at the moment. However, we are always eager to meet talented professionals.
              You can submit your resume below, and we will contact you when a suitable vacancy arises.
            </p>
          </div>
        )}
      </section>

      <section className="career-apply" ref={formRef} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', padding: '80px 0', width: 'min(var(--max), calc(100% - 36px))', margin: '0 auto', borderTop: '1px solid var(--line)' }}>
        <div>
          <h2 style={{ color: '#0d2260', fontSize: '32px', fontWeight: 900, marginBottom: '16px' }}>Submit Your Profile</h2>
          <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7, marginBottom: '28px' }}>
            Send your resume with your preferred role, location, experience, and contact number.
            The team will review suitable profiles as requirements open.
          </p>
          
          <div className="career-actions" style={{ display: 'grid', gap: '12px' }}>
            <a href={`mailto:${company.email}?subject=Career%20Application%20-%20Lenimen%20Biotech`} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--navy)', fontWeight: 700 }}>
              <Mail size={18} style={{ color: 'var(--teal)' }} /> {company.email}
            </a>
            <a href={`tel:${company.landline.replaceAll(' ', '')}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--navy)', fontWeight: 700 }}>
              <Phone size={18} style={{ color: 'var(--teal)' }} /> {company.landline}
            </a>
            {company.phones.map((phone) => (
              <a href={`tel:${phone.replaceAll(' ', '')}`} key={phone} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--navy)', fontWeight: 700 }}>
                <Phone size={18} style={{ color: 'var(--teal)' }} /> {phone}
              </a>
            ))}
          </div>
        </div>

        <div className="application-form-box" style={{
          background: '#ffffff',
          border: '1px solid #c4d0d6',
          borderRadius: '16px',
          padding: '36px',
          boxShadow: '0 12px 36px rgba(7, 19, 58, 0.06)'
        }}>
          <h3 style={{ color: 'var(--navy)', fontSize: '22px', fontWeight: 800, marginBottom: '6px' }}>
            {selectedJob ? `Apply: ${selectedJob.title}` : 'General Application'}
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '24px' }}>Fill out the form below to register your profile directly in our CRM applicant tracking list.</p>

          {success ? (
            <div style={{ padding: '24px', background: '#effafb', border: '1px solid #b9dfe2', borderRadius: '8px', textAlign: 'center' }}>
              <Smile size={38} style={{ color: 'var(--teal)', marginBottom: '12px' }} />
              <h4 style={{ color: 'var(--navy)', margin: '0 0 6px' }}>Application Logged!</h4>
              <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0 }}>Your profile has been saved. We will contact you if your skills align with open positions.</p>
              <button type="button" onClick={() => setSuccess(false)} style={{
                marginTop: '16px',
                border: 0,
                background: 'var(--teal)',
                color: '#fff',
                padding: '6px 16px',
                borderRadius: '16px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}>Send another profile</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
              {selectedJob && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#effafb', padding: '10px 14px', borderRadius: '8px', border: '1px solid #b9dfe2' }}>
                  <span style={{ fontSize: '13px', color: 'var(--navy)', fontWeight: 700 }}>Selected: {selectedJob.title}</span>
                  <button type="button" onClick={() => handleApplyClick(null)} style={{ border: 0, background: 'transparent', color: 'var(--pink)', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}>Cancel</button>
                </div>
              )}
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label htmlFor="apply-name" style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px' }}>Full Name *</label>
                  <input
                    id="apply-name"
                    type="text"
                    name="name"
                    value={applyForm.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Jane Doe"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #b9bdc3', font: 'inherit', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label htmlFor="apply-phone" style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px' }}>Phone Number *</label>
                  <input
                    id="apply-phone"
                    type="tel"
                    name="phone"
                    value={applyForm.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+91 98765 43210"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #b9bdc3', font: 'inherit', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
                <div>
                  <label htmlFor="apply-email" style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px' }}>Email Address *</label>
                  <input
                    id="apply-email"
                    type="email"
                    name="email"
                    value={applyForm.email}
                    onChange={handleInputChange}
                    required
                    placeholder="jane@example.com"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #b9bdc3', font: 'inherit', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label htmlFor="apply-experience" style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px' }}>Experience *</label>
                  <input
                    id="apply-experience"
                    type="text"
                    name="experience"
                    value={applyForm.experience}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. 3 years"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #b9bdc3', font: 'inherit', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="apply-resume" style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px' }}>Resume Link / URL *</label>
                <input
                  id="apply-resume"
                  type="url"
                  name="resumeUrl"
                  value={applyForm.resumeUrl}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Google Drive or Dropbox link"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #b9bdc3', font: 'inherit', fontSize: '14px' }}
                />
              </div>

              <div>
                <label htmlFor="apply-cover" style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px' }}>Brief Cover Note</label>
                <textarea
                  id="apply-cover"
                  name="coverLetter"
                  value={applyForm.coverLetter}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Introduce yourself and describe why you are a good fit..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #b9bdc3', font: 'inherit', fontSize: '14px', resize: 'vertical' }}
                />
              </div>

              {errorMsg && <p style={{ color: 'red', fontSize: '13px', margin: 0 }}>{errorMsg}</p>}

              <button type="submit" disabled={submitting} className="primary-button" style={{
                width: '100%',
                padding: '12px',
                borderRadius: '24px',
                fontSize: '14px',
                fontWeight: 800,
                background: submitting ? 'var(--muted)' : 'var(--pink)',
                color: '#fff',
                marginTop: '10px'
              }}>
                {submitting ? 'Submitting...' : 'Submit Profile'}
              </button>
            </form>
          )}
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
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" style={{ fill: 'currentColor', width: '20px', height: '20px' }}>
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
            {socialItems.map((item) => {
              const href = socialLinks[item]
              if (!href) return null
              return (
                <a
                  key={item}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item}
                  className="social-icon-wrapper"
                  style={{ display: 'inline-flex', marginRight: '10px' }}
                >
                  <SocialIcon type={item} />
                </a>
              )
            })}
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

        <div className="footer-column contact-info-column" style={{ minWidth: '240px' }}>
          <h2>Contact Info</h2>
          <dl>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <MapPin size={18} style={{ color: 'var(--teal)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <dt style={{ margin: 0, fontWeight: 700 }}>Corporate Office</dt>
                <dd style={{ margin: '4px 0 0 0', color: 'var(--muted)', fontSize: '13px' }}>
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
                <dt style={{ margin: 0, fontWeight: 700 }}>Phone</dt>
                <dd style={{ margin: '4px 0 0 0', color: 'var(--muted)', fontSize: '13px' }}>
                  <a href={`tel:${company.landline.replaceAll(' ', '')}`} className="footer-address-link">
                    {company.landline}
                  </a>
                </dd>
                {company.phones.map((phone) => (
                  <dd style={{ margin: '4px 0 0 0', color: 'var(--muted)', fontSize: '13px' }} key={phone}>
                    <a href={`tel:${phone.replaceAll(' ', '')}`} className="footer-address-link">
                      {phone}
                    </a>
                  </dd>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginTop: '12px' }}>
              <Mail size={18} style={{ color: 'var(--teal)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <dt style={{ margin: 0, fontWeight: 700 }}>Email</dt>
                <dd style={{ margin: '4px 0 0 0', color: 'var(--muted)', fontSize: '13px' }}>
                  <a href={`mailto:${company.email}`} className="footer-address-link">
                    {company.email}
                  </a>
                </dd>
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
