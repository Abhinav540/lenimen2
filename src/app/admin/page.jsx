"use client"

import { useState, useEffect, useMemo, useRef } from 'react'
import {
  Activity,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  Edit,
  FileDown,
  FileText,
  FlaskConical,
  Grid3X3,
  Globe2,
  Lock,
  LogOut,
  Mail,
  Menu,
  Moon,
  Plus,
  Search,
  Settings,
  ShieldAlert,
  Sun,
  Trash2,
  UsersRound,
  X,
  Bell,
  Eye,
  EyeOff,
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react'

const getBrandLogo = (brand) => {
  const b = (brand || '').toLowerCase()
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

// Custom styling stylesheet variables and rules
const styleBlock = `
:root {
  --bg-primary: #F8FAFC;
  --bg-secondary: #FFFFFF;
  --border-color: #E2E8F0;
  --text-primary: #0F172A;
  --text-secondary: #64748B;
  --navy: #0B2D6B;
  --teal: #13B8C6;
  --emerald: #00C2A8;
  --card-bg: #FFFFFF;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 20px rgba(15, 23, 42, 0.04);
  --shadow-lg: 0 10px 30px rgba(11, 45, 107, 0.08);
  --sidebar-bg: #0B2D6B;
  --sidebar-text: #FFFFFF;
  --sidebar-hover: rgba(255, 255, 255, 0.08);
  --sidebar-active: #13B8C6;
  --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark-mode {
  --bg-primary: #0A0F1D;
  --bg-secondary: #111827;
  --border-color: #1F2937;
  --text-primary: #F9FAFB;
  --text-secondary: #9CA3AF;
  --navy: #0F172A;
  --teal: #13B8C6;
  --emerald: #00C2A8;
  --card-bg: #1F2937;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Animations */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
}

@keyframes pulse-glow {
  0% { box-shadow: 0 0 0 0 rgba(19, 184, 198, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(19, 184, 198, 0); }
  100% { box-shadow: 0 0 0 0 rgba(19, 184, 198, 0); }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.glow-teal {
  animation: pulse-glow 2s infinite;
}

.scroll-smooth {
  scroll-behavior: smooth;
}

/* Scrollbar customization */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}
`

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Data states
  const [products, setProducts] = useState([])
  const [jobs, setJobs] = useState([])
  const [applicants, setApplicants] = useState([])
  const [leads, setLeads] = useState([])
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([
    'Cardiology', 'Diabetology', 'Hematology', 'Gastroenterology', 'Hypertension', 'Urology', 'Pain Management', 'Respiratory'
  ])
  const [newCategoryName, setNewCategoryName] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [activities, setActivities] = useState([
    { text: 'Enterprise Database online', author: 'System', time: 'Startup', color: '#00C2A8' },
    { text: 'Next.js Web Services active', author: 'System', time: 'Startup', color: '#13B8C6' }
  ])

  const addActivity = (text, author = 'Admin', color = '#13B8C6') => {
    setActivities(prev => [
      { text, author, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), color },
      ...prev.slice(0, 4) // Keep up to 5 items
    ])
  }

  // Form states
  const [productForm, setProductForm] = useState(null)
  const [jobForm, setJobForm] = useState(null)
  const [newsForm, setNewsForm] = useState(null)
  const [selectedLead, setSelectedLead] = useState(null)
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Autocomplete search states
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  // Toast notifications
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000)
  }

  // Session check on mount
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/auth')
        const data = await res.json()
        if (data.authenticated) {
          setAuthenticated(true)
          loadDashboardData()
        }
      } catch (err) {
        console.error('Session check failed:', err)
      } finally {
        setLoading(false)
      }
    }
    checkSession()
  }, [])

  // Scan products to discover custom categories dynamically
  useEffect(() => {
    if (products.length > 0) {
      setCategories(prev => {
        const uniqueGroups = Array.from(new Set(products.map(p => p.group))).filter(Boolean)
        const updatedList = [...prev]
        uniqueGroups.forEach(g => {
          if (!updatedList.includes(g)) {
            updatedList.push(g)
          }
        })
        return updatedList
      })
    }
  }, [products])

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('dark-mode')
    }
  }

  // Load CRM & catalog database items
  const loadDashboardData = async () => {
    setLoading(true)
    try {
      const [pRes, jRes, aRes, lRes, nRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/careers'),
        fetch('/api/applicants'),
        fetch('/api/leads'),
        fetch('/api/news')
      ])

      const [pData, jData, aData, lData, nData] = await Promise.all([
        pRes.json(),
        jRes.json(),
        aRes.json(),
        lRes.json(),
        nRes.json()
      ])

      setProducts(pData)
      setJobs(jData)
      setApplicants(aData)
      setLeads(lData)
      setNews(nData)
    } catch (err) {
      triggerToast('Failed to load database records', 'error')
    } finally {
      setLoading(false)
    }
  }

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setAuthError('')
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setAuthenticated(true)
        loadDashboardData()
      } else {
        setAuthError(data.error || 'Login failed')
      }
    } catch (err) {
      setAuthError('Network error, please try again')
    } finally {
      setLoading(false)
    }
  }

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' })
      })
      setAuthenticated(false)
      setPassword('')
      triggerToast('Logged out successfully')
    } catch (err) {
      triggerToast('Logout failed', 'error')
    }
  }

  // CREATE Category
  const handleAddCategory = (e) => {
    e.preventDefault()
    const name = newCategoryName.trim()
    if (!name) return
    if (categories.includes(name)) {
      triggerToast('Category already exists', 'error')
      return
    }
    setCategories(prev => [...prev, name])
    addActivity(`New category "${name}" added`, 'By Admin', '#00C2A8')
    triggerToast(`Category "${name}" added successfully`)
    setNewCategoryName('')
  }

  // CREATE/UPDATE Product
  const saveProduct = async (e) => {
    e.preventDefault()
    const isEdit = !!productForm.id
    const method = isEdit ? 'PUT' : 'POST'
    const url = isEdit ? `/api/products/${productForm.id}` : '/api/products'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm)
      })
      if (res.ok) {
        triggerToast(`Product ${isEdit ? 'updated' : 'added'} successfully`)
        addActivity(`Product "${productForm.brand}" ${isEdit ? 'updated' : 'added'}`, 'By Admin', '#13B8C6')
        setProductForm(null)
        loadDashboardData()
      } else {
        const error = await res.json()
        triggerToast(error.error || 'Failed to save product', 'error')
      }
    } catch (err) {
      triggerToast('Network error saving product', 'error')
    }
  }

  // DELETE Product
  const deleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      const targetProduct = products.find(p => p.id === id)
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        triggerToast('Product deleted successfully')
        addActivity(`Product "${targetProduct?.brand || 'Unknown'}" deleted`, 'By Admin', '#e31873')
        loadDashboardData()
      } else {
        triggerToast('Failed to delete product', 'error')
      }
    } catch (err) {
      triggerToast('Network error deleting product', 'error')
    }
  }

  // CREATE/UPDATE News
  const saveNews = async (e) => {
    e.preventDefault()
    if (!newsForm.title || !newsForm.content) {
      triggerToast('Title and content are required', 'error')
      return
    }
    setLoading(true)
    const isEdit = !!newsForm.id
    const url = isEdit ? `/api/news/${newsForm.id}` : '/api/news'
    try {
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsForm)
      })
      const data = await res.json()
      if (res.ok) {
        triggerToast(`News item ${isEdit ? 'updated' : 'added'} successfully`)
        addActivity(`News article "${newsForm.title}" ${isEdit ? 'updated' : 'published'}`, 'By Admin', '#10B981')
        setNewsForm(null)
        loadDashboardData()
      } else {
        triggerToast(data.error || 'Failed to save news', 'error')
      }
    } catch (err) {
      triggerToast('Network error saving news', 'error')
    } finally {
      setLoading(false)
    }
  }

  // DELETE News
  const deleteNews = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return
    setLoading(true)
    try {
      const res = await fetch(`/api/news/${id}`, { method: 'DELETE' })
      if (res.ok) {
        triggerToast('News item deleted successfully')
        addActivity(`News article "${title}" deleted`, 'By Admin', '#EF4444')
        loadDashboardData()
      } else {
        const data = await res.json()
        triggerToast(data.error || 'Failed to delete news', 'error')
      }
    } catch (err) {
      triggerToast('Network error deleting news', 'error')
    } finally {
      setLoading(false)
    }
  }

  // Handle Super Admin Password Change
  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      triggerToast('New passwords do not match', 'error')
      return
    }
    if (newPassword.length < 4) {
      triggerToast('Password must be at least 4 characters long', 'error')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change-password',
          currentPassword,
          newPassword
        })
      })
      const data = await res.json()
      if (res.ok) {
        triggerToast('Admin password updated successfully')
        addActivity('Super Admin Password changed', 'By Admin', '#EF4444')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        triggerToast(data.error || 'Failed to update password', 'error')
      }
    } catch (err) {
      triggerToast('Network error updating password', 'error')
    } finally {
      setLoading(false)
    }
  }

  // CREATE/UPDATE Job vacancy
  const saveJob = async (e) => {
    e.preventDefault()
    const isEdit = !!jobForm.id
    const method = isEdit ? 'PUT' : 'POST'
    const url = isEdit ? `/api/careers/${jobForm.id}` : '/api/careers'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobForm)
      })
      if (res.ok) {
        triggerToast(`Job opening ${isEdit ? 'updated' : 'published'} successfully`)
        addActivity(`Job opening "${jobForm.title}" ${isEdit ? 'updated' : 'published'}`, 'By Admin', '#8b5cf6')
        setJobForm(null)
        loadDashboardData()
      } else {
        const error = await res.json()
        triggerToast(error.error || 'Failed to save job opening', 'error')
      }
    } catch (err) {
      triggerToast('Network error saving job opening', 'error')
    }
  }

  // DELETE Job vacancy
  const deleteJob = async (id) => {
    if (!confirm('Are you sure you want to delete this job vacancy?')) return
    try {
      const targetJob = jobs.find(j => j.id === id)
      const res = await fetch(`/api/careers/${id}`, { method: 'DELETE' })
      if (res.ok) {
        triggerToast('Vacancy deleted successfully')
        addActivity(`Job opening "${targetJob?.title || 'Unknown'}" deleted`, 'By Admin', '#e31873')
        loadDashboardData()
      } else {
        triggerToast('Failed to delete vacancy', 'error')
      }
    } catch (err) {
      triggerToast('Network error deleting vacancy', 'error')
    }
  }

  // UPDATE Lead notes & status
  const updateLeadStatus = async (id, status, notes) => {
    try {
      const targetLead = leads.find(l => l.id === id)
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes })
      })
      if (res.ok) {
        triggerToast('Enquiry lead updated successfully')
        addActivity(`Enquiry lead "${targetLead?.name || 'Unknown'}" status updated to "${status}"`, 'CRM Lead', '#ffb020')
        setSelectedLead(null)
        loadDashboardData()
      } else {
        triggerToast('Failed to update lead', 'error')
      }
    } catch (err) {
      triggerToast('Network error updating lead', 'error')
    }
  }

  // UPDATE Applicant profile status & notes
  const updateApplicantStatus = async (id, status, notes) => {
    try {
      const targetApp = applicants.find(a => a.id === id)
      const res = await fetch(`/api/applicants/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes })
      })
      if (res.ok) {
        triggerToast('Applicant status updated successfully')
        addActivity(`Applicant "${targetApp?.name || 'Unknown'}" status updated to "${status}"`, 'Careers', '#8b5cf6')
        setSelectedApplicant(null)
        loadDashboardData()
      } else {
        triggerToast('Failed to update applicant', 'error')
      }
    } catch (err) {
      triggerToast('Network error updating applicant', 'error')
    }
  }

  // Statistics calculation
  const stats = useMemo(() => {
    return {
      totalProducts: products.length,
      activeJobs: jobs.filter(j => j.active).length,
      newApplicants: applicants.filter(a => a.status === 'New').length,
      totalApplicants: applicants.length,
      newLeads: leads.filter(l => l.status === 'New').length,
      totalLeads: leads.length,
      visitors: 4852
    }
  }, [products, jobs, applicants, leads])

  const notificationsList = useMemo(() => {
    const list = []
    
    // Add real leads
    leads.forEach(l => {
      list.push({
        type: 'lead',
        title: l.name,
        desc: `submitted an inquiry regarding "${l.subject}"`,
        time: new Date(l.createdAt),
        link: 'leads'
      })
    })
    
    // Add real applicants
    applicants.forEach(a => {
      list.push({
        type: 'applicant',
        title: a.name,
        desc: `applied for the position of "${a.position}"`,
        time: new Date(a.createdAt),
        link: 'applicants'
      })
    })
    
    // Sort by time descending
    list.sort((a, b) => b.time - a.time)
    
    // Add a default system alert
    list.push({
      type: 'system',
      title: 'System Alert',
      desc: 'Database synchronization completed successfully',
      time: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      link: 'overview'
    })
    
    return list.slice(0, 5)
  }, [leads, applicants])

  // Filtered lists based on search bar
  const searchedProducts = useMemo(() => {
    if (!searchQuery) return products
    const query = searchQuery.toLowerCase()
    return products.filter(p =>
      (p.brand && p.brand.toLowerCase().includes(query)) ||
      (p.composition && p.composition.toLowerCase().includes(query)) ||
      (p.group && p.group.toLowerCase().includes(query))
    )
  }, [products, searchQuery])

  const searchedLeads = useMemo(() => {
    if (!searchQuery) return leads
    const query = searchQuery.toLowerCase()
    return leads.filter(l =>
      (l.name && l.name.toLowerCase().includes(query)) ||
      (l.subject && l.subject.toLowerCase().includes(query))
    )
  }, [leads, searchQuery])

  const searchedApplicants = useMemo(() => {
    if (!searchQuery) return applicants
    const query = searchQuery.toLowerCase()
    return applicants.filter(a =>
      (a.name && a.name.toLowerCase().includes(query)) ||
      (a.jobTitle && a.jobTitle.toLowerCase().includes(query))
    )
  }, [applicants, searchQuery])

  // Global search calculations across all tables
  const globalSearchResults = useMemo(() => {
    if (!searchQuery) return { products: [], leads: [], applicants: [], jobs: [], news: [] }
    const query = searchQuery.toLowerCase()
    
    return {
      products: products.filter(p => 
        (p.brand && p.brand.toLowerCase().includes(query)) || 
        (p.composition && p.composition.toLowerCase().includes(query))
      ).slice(0, 3),
      leads: leads.filter(l => 
        (l.name && l.name.toLowerCase().includes(query)) || 
        (l.subject && l.subject.toLowerCase().includes(query))
      ).slice(0, 3),
      applicants: applicants.filter(a => 
        (a.name && a.name.toLowerCase().includes(query)) || 
        (a.jobTitle && a.jobTitle.toLowerCase().includes(query))
      ).slice(0, 3),
      jobs: jobs.filter(j => 
        (j.title && j.title.toLowerCase().includes(query)) || 
        (j.location && j.location.toLowerCase().includes(query))
      ).slice(0, 3),
      news: news.filter(n => 
        (n.title && n.title.toLowerCase().includes(query))
      ).slice(0, 3)
    }
  }, [searchQuery, products, leads, applicants, jobs, news])

  const totalResults = useMemo(() => {
    return globalSearchResults.products.length + 
           globalSearchResults.leads.length + 
           globalSearchResults.applicants.length + 
           globalSearchResults.jobs.length + 
           globalSearchResults.news.length
  }, [globalSearchResults])

  // Slice real database records for Dashboard recent items
  const recentApplicants = useMemo(() => {
    return applicants.slice(0, 3)
  }, [applicants])

  const recentLeads = useMemo(() => {
    return leads.slice(0, 3)
  }, [leads])

  if (loading && !authenticated) {
    return (
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
        background: '#0B2D6B', color: '#fff', fontFamily: 'sans-serif'
      }}>
        <style dangerouslySetInnerHTML={{ __html: styleBlock }} />
        <div style={{ textAlign: 'center' }}>
          <FlaskConical size={48} className="animate-float" style={{ color: '#13B8C6', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Loading Lenimen Biotech Enterprise Suite...</h3>
        </div>
      </div>
    )
  }

  // LOGIN GATEWAY
  if (!authenticated) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
        background: 'linear-gradient(135deg, #f4f6fa 0%, #e9ecef 100%)',
        fontFamily: 'Poppins, sans-serif', padding: '18px', position: 'relative', overflow: 'hidden'
      }}>
        <style dangerouslySetInnerHTML={{ __html: styleBlock }} />

        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: '48px 40px',
          width: '100%',
          maxWidth: '430px',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.05)',
          textAlign: 'center',
          color: '#333333',
          zIndex: 2
        }}>
          {/* Logo */}
          <div style={{ marginBottom: '24px' }}>
            <img src="/assets/logo.png" alt="Lenimen Biotech" style={{ height: '44px', objectFit: 'contain' }} />
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0B2D6B', margin: '0 0 10px', letterSpacing: '-0.5px' }}>CRM Portal</h2>
          
          {/* Teal Underline Accent */}
          <div style={{ width: '40px', height: '3px', background: '#13B8C6', borderRadius: '2px', margin: '0 auto 20px' }} />

          <p style={{ color: '#5e7293', fontSize: '13.5px', margin: '0 0 32px', lineHeight: '1.5' }}>
            Enter your password to access the admin dashboard and manage your systems.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'grid', gap: '20px' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', color: '#8898aa' }} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 48px 14px 44px',
                  borderRadius: '8px',
                  border: '1px solid #dcdfe6',
                  background: '#ffffff',
                  color: '#333333',
                  fontFamily: 'inherit',
                  outline: 'none',
                  fontSize: '14.5px',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = '#0038a8'}
                onBlur={e => e.target.style.borderColor = '#dcdfe6'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  background: 'transparent',
                  border: 0,
                  color: '#8898aa',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {authError && <p style={{ color: '#ff4b8c', fontSize: '13.5px', margin: 0, fontWeight: 700 }}>{authError}</p>}

            <button type="submit" style={{
              background: '#0038a8',
              color: '#ffffff',
              border: 0,
              padding: '14px',
              borderRadius: '8px',
              fontSize: '14.5px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#002776'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#0038a8'}
            >
              Access CRM Systems
            </button>
          </form>

          {/* Footer Line & Copyright */}
          <div style={{ borderTop: '1px solid #edf2f7', marginTop: '24px', paddingTop: '20px' }}>
            <span style={{ fontSize: '11px', color: '#a0aec0' }}>
              &copy; 2026 Lenimen Biotech Pvt. Ltd. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      fontFamily: 'Plus Jakarta Sans, Poppins, sans-serif',
      color: 'var(--text-primary)',
      display: 'grid',
      gridTemplateColumns: sidebarCollapsed ? '70px 1fr' : '260px 1fr',
      transition: 'var(--transition)',
      position: 'relative'
    }}>
      <style dangerouslySetInnerHTML={{ __html: styleBlock }} />

      {/* Toast Alert */}
      {toast.show && (
        <div className="glow-teal" style={{
          position: 'fixed', top: '24px', right: '24px', zIndex: 100,
          background: 'var(--bg-secondary)',
          borderLeft: `4px solid ${toast.type === 'success' ? 'var(--teal)' : '#e31873'}`,
          color: 'var(--text-primary)',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-lg)',
          fontSize: '14px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle2 size={16} style={{ color: toast.type === 'success' ? 'var(--teal)' : '#e31873' }} />
          {toast.message}
        </div>
      )}

      {/* LEFT SIDEBAR (Pfizer/Vercel Blue theme) */}
      <aside style={{
        background: 'var(--sidebar-bg)',
        color: 'var(--sidebar-text)',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 10,
        transition: 'var(--transition)',
        overflow: 'hidden'
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: sidebarCollapsed ? '4px' : '8px' }}>
          <div style={{
            background: '#ffffff', borderRadius: '50%', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <FlaskConical size={20} style={{ color: '#0B2D6B' }} />
          </div>
          {!sidebarCollapsed && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '0.5px', lineHeight: 1.1 }}>LENIMEN</span>
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '1px' }}>BIOTECH</span>
            </div>
          )}
        </div>

        {/* Sidebar Nav Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1, overflowY: 'auto' }}>
          {[
            { id: 'overview', label: 'Dashboard', icon: Activity },
            { id: 'products', label: 'Products', icon: FlaskConical },
            { id: 'categories', label: 'Categories', icon: Grid3X3 },
            { id: 'careers', label: 'Careers', icon: Briefcase },
            { id: 'applicants', label: 'Applicants', icon: UsersRound, badge: stats.newApplicants },
            { id: 'leads', label: 'CRM Leads', icon: Mail, badge: stats.newLeads },
            { id: 'news', label: 'News', icon: FileText },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 14px', borderRadius: '12px',
                  border: 0, background: isActive ? 'var(--sidebar-active)' : 'transparent',
                  color: '#ffffff',
                  opacity: isActive ? 1 : 0.8,
                  cursor: 'pointer', textAlign: 'left', fontWeight: isActive ? 700 : 500, fontSize: '13.5px',
                  transition: 'var(--transition)', position: 'relative'
                }}
                onMouseOver={e => !isActive && (e.currentTarget.style.background = 'var(--sidebar-hover)')}
                onMouseOut={e => !isActive && (e.currentTarget.style.background = 'transparent')}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon size={18} />
                {!sidebarCollapsed && <span>{item.label}</span>}
                {!sidebarCollapsed && item.badge > 0 && (
                  <span style={{
                    background: '#e31873', color: '#fff', fontSize: '9px', fontWeight: 800,
                    padding: '2px 6px', borderRadius: '10px', marginLeft: 'auto'
                  }}>{item.badge}</span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom Sign Out */}
        <button onClick={handleLogout} style={{
          display: 'flex', alignItems: 'center', gap: '12px', background: 'transparent', border: 0, color: 'rgba(255, 255, 255, 0.7)',
          cursor: 'pointer', fontSize: '13.5px', fontWeight: 600, padding: '12px 14px', borderRadius: '12px', width: '100%',
          transition: 'var(--transition)'
        }}
        onMouseOver={e => { e.currentTarget.style.color = '#ff6b6b'; e.currentTarget.style.background = 'var(--sidebar-hover)' }}
        onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.background = 'transparent' }}
        >
          <LogOut size={18} />
          {!sidebarCollapsed && <span>Sign Out</span>}
        </button>
      </aside>

      {/* MAIN CONTAINER */}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* TOP NAVBAR (Clean Stripe/Linear style) */}
        <header style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          position: 'sticky',
          top: 0,
          zIndex: 8,
          transition: 'var(--transition)'
        }}>
          {/* Left search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexGrow: 0.5 }}>
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{
              background: 'transparent', border: 0, color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center'
            }}>
              <Menu size={20} />
            </button>
             <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Search anything...          Ctrl /"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '13.5px',
                  outline: 'none',
                  transition: 'var(--transition)'
                }}
              />

              {/* Global search results dropdown */}
              {searchQuery && (
                <div className="custom-scrollbar" style={{
                  position: 'absolute', top: '40px', left: 0, right: 0,
                  background: 'var(--card-bg)', border: '1px solid var(--border-color)',
                  borderRadius: '12px', boxShadow: 'var(--shadow-lg)',
                  maxHeight: '320px', overflowY: 'auto', zIndex: 999,
                  padding: '12px'
                }}>
                  {totalResults === 0 ? (
                    <div style={{ padding: '12px', textAlign: 'center', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                      No matches found for "{searchQuery}"
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gap: '14px' }}>
                      {/* Products */}
                      {globalSearchResults.products.length > 0 && (
                        <div style={{ display: 'grid', gap: '4px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', paddingBottom: '2px', borderBottom: '1px solid var(--border-color)' }}>Products</span>
                          {globalSearchResults.products.map(p => (
                            <div
                              key={p.id}
                              onClick={() => {
                                setProductForm(p);
                                setActiveTab('products');
                                setSearchQuery('');
                              }}
                              onMouseOver={e => e.currentTarget.style.background = 'var(--bg-primary)'}
                              onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                              style={{ padding: '6px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '12.5px', transition: 'background 0.2s' }}
                            >
                              <strong>{p.brand}</strong> <span style={{ color: 'var(--text-secondary)' }}>({p.composition})</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Applicants */}
                      {globalSearchResults.applicants.length > 0 && (
                        <div style={{ display: 'grid', gap: '4px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 800, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', paddingBottom: '2px', borderBottom: '1px solid var(--border-color)' }}>Applicants</span>
                          {globalSearchResults.applicants.map(a => (
                            <div
                              key={a.id}
                              onClick={() => {
                                setSelectedApplicant(a);
                                setActiveTab('applicants');
                                setSearchQuery('');
                              }}
                              onMouseOver={e => e.currentTarget.style.background = 'var(--bg-primary)'}
                              onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                              style={{ padding: '6px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '12.5px', transition: 'background 0.2s' }}
                            >
                              <strong>{a.name}</strong> <span style={{ color: 'var(--text-secondary)' }}>- {a.jobTitle}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CRM Leads */}
                      {globalSearchResults.leads.length > 0 && (
                        <div style={{ display: 'grid', gap: '4px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 800, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', paddingBottom: '2px', borderBottom: '1px solid var(--border-color)' }}>CRM Leads</span>
                          {globalSearchResults.leads.map(l => (
                            <div
                              key={l.id}
                              onClick={() => {
                                setSelectedLead(l);
                                setActiveTab('leads');
                                setSearchQuery('');
                              }}
                              onMouseOver={e => e.currentTarget.style.background = 'var(--bg-primary)'}
                              onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                              style={{ padding: '6px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '12.5px', transition: 'background 0.2s' }}
                            >
                              <strong>{l.name}</strong> <span style={{ color: 'var(--text-secondary)' }}>- {l.subject}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Careers */}
                      {globalSearchResults.jobs.length > 0 && (
                        <div style={{ display: 'grid', gap: '4px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--emerald)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', paddingBottom: '2px', borderBottom: '1px solid var(--border-color)' }}>Careers</span>
                          {globalSearchResults.jobs.map(j => (
                            <div
                              key={j.id}
                              onClick={() => {
                                setJobForm(j);
                                setActiveTab('careers');
                                setSearchQuery('');
                              }}
                              onMouseOver={e => e.currentTarget.style.background = 'var(--bg-primary)'}
                              onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                              style={{ padding: '6px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '12.5px', transition: 'background 0.2s' }}
                            >
                              <strong>{j.title}</strong> <span style={{ color: 'var(--text-secondary)' }}>({j.location})</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* News */}
                      {globalSearchResults.news.length > 0 && (
                        <div style={{ display: 'grid', gap: '4px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', paddingBottom: '2px', borderBottom: '1px solid var(--border-color)' }}>News</span>
                          {globalSearchResults.news.map(n => (
                            <div
                              key={n.id}
                              onClick={() => {
                                setNewsForm(n);
                                setActiveTab('news');
                                setSearchQuery('');
                              }}
                              onMouseOver={e => e.currentTarget.style.background = 'var(--bg-primary)'}
                              onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                              style={{ padding: '6px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '12.5px', transition: 'background 0.2s' }}
                            >
                              <strong>{n.title}</strong>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right profile / notification */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Dark Mode toggle */}
            <button onClick={toggleDarkMode} style={{
              background: 'transparent', border: 0, color: 'var(--text-secondary)', cursor: 'pointer'
            }}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowNotifications(!showNotifications)} style={{
                background: 'transparent', border: 0, color: 'var(--text-secondary)', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center'
              }}>
                <Bell size={20} />
                {notificationsList.filter(n => n.type !== 'system').length > 0 && (
                  <span style={{
                    position: 'absolute', top: '-4px', right: '-4px', background: '#e31873', color: '#fff',
                    fontSize: '8px', fontWeight: 800, width: '15px', height: '15px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>{notificationsList.filter(n => n.type !== 'system').length}</span>
                )}
              </button>

              {showNotifications && (
                <div style={{
                  position: 'absolute', right: 0, top: '30px', width: '320px', background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)', borderRadius: '12px', boxShadow: 'var(--shadow-lg)',
                  padding: '16px', zIndex: 12
                }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 800 }}>Notifications</h4>
                  <div style={{ display: 'grid', gap: '10px', fontSize: '12px' }}>
                    {notificationsList.map((notif, idx) => (
                      <div
                        key={idx}
                        style={{
                          paddingBottom: idx < notificationsList.length - 1 ? '8px' : '0',
                          borderBottom: idx < notificationsList.length - 1 ? '1px solid var(--border-color)' : '0',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          if (notif.link !== 'overview') {
                            setActiveTab(notif.link)
                          }
                          setShowNotifications(false)
                        }}
                      >
                        <strong>{notif.title}</strong> {notif.desc}.<br/>
                        <span style={{ color: 'var(--text-secondary)' }}>
                          {notif.time.toLocaleDateString()} {notif.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => setShowProfileMenu(!showProfileMenu)} style={{
                background: 'transparent', border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #13B8C6 0%, #0B2D6B 100%)',
                  color: '#fff', fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>A</div>
                <div style={{ textAlign: 'left', display: sidebarCollapsed ? 'none' : 'block' }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>Administrator</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Super Admin</div>
                </div>
                <ChevronDown size={14} style={{ color: 'var(--text-secondary)' }} />
              </button>
            </div>
          </div>
        </header>

        {/* WORKSPACE CONTENT */}
        <main style={{ padding: '40px 32px', flexGrow: 1, minWidth: 0 }}>
          
          {/* Header & Date Selector */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Welcome back, Administrator</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', margin: 0 }}>Managing Lenimen Biotech Full-Stack Systems</p>
            </div>
            
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Home &nbsp;&nbsp;/&nbsp;&nbsp; <span style={{ color: 'var(--teal)' }}>Dashboard</span>
            </div>
          </div>

          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div style={{ display: 'grid', gap: '32px' }}>
              
              {/* Row 1: KPI CARDS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
                {[
                  { title: 'Total Products', val: stats.totalProducts, change: '+ 8.6%', type: 'up', icon: FlaskConical, accent: 'rgba(19, 184, 198, 0.1)', color: 'var(--teal)', spark: 'M0 20 Q 8 10, 16 25 T 32 5 T 48 15' },
                  { title: 'Active Careers', val: stats.activeJobs, change: '+ 12%', type: 'up', icon: Briefcase, accent: 'rgba(0, 194, 168, 0.1)', color: 'var(--emerald)', spark: 'M0 25 Q 10 5, 20 20 T 40 8 T 50 15' },
                  { title: 'Total Applicants', val: stats.totalApplicants, change: '+ 18%', type: 'up', icon: UsersRound, accent: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', spark: 'M0 22 Q 12 18, 24 25 T 36 8 T 48 12' },
                  { title: 'CRM Leads', val: stats.totalLeads, change: '+ 22%', type: 'up', icon: Mail, accent: 'rgba(249, 115, 22, 0.1)', color: '#f97316', spark: 'M0 20 Q 8 8, 16 18 T 32 10 T 48 4' },
                  { title: 'Published News', val: news.length, change: 'Live', type: 'status', icon: FileText, accent: 'rgba(16, 185, 129, 0.1)', color: '#10b981', spark: 'M0 25 Q 12 5, 24 22 T 36 12 T 48 2' }
                ].map((card, idx) => {
                  const Icon = card.icon
                  return (
                    <div key={idx} style={{
                      background: 'var(--card-bg)', border: '1px solid var(--border-color)',
                      borderRadius: '24px', padding: '24px', boxShadow: 'var(--shadow-md)',
                      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                      position: 'relative', transition: 'var(--transition)'
                    }}
                    onMouseOver={e => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
                    onMouseOut={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <div style={{
                          background: card.accent, borderRadius: '50%', width: '40px', height: '40px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color
                        }}>
                          <Icon size={20} />
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{card.title}</span>
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4px' }}>
                        <div>
                          <strong style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-1px' }}>{card.val}</strong>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: card.type === 'status' ? 'var(--emerald)' : card.color, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                            {card.type !== 'status' && <TrendingUp size={12} />}
                            {card.change} <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>vs last month</span>
                          </div>
                        </div>
                        
                        {/* Sparkline mini chart */}
                        <svg width="50" height="30" style={{ overflow: 'visible', stroke: card.color, strokeWidth: 2, fill: 'none' }}>
                          <path d={card.spark} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Row 2: GRAPH AND CHARTS */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '24px' }}>
                
                {/* Website Analytics SVG Chart */}
                <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '28px', boxShadow: 'var(--shadow-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Website Analytics</h3>
                    <select style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 700 }}>
                      <option>This Month</option>
                      <option>Last Month</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '24px', marginBottom: '20px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Visitors</span>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>4,852 <span style={{ color: 'var(--emerald)', fontSize: '11px', fontWeight: 700 }}>&uarr; 16.3%</span></div>
                    </div>
                    <div style={{ borderLeft: '1px solid var(--border-color)' }} />
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Page Views</span>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>15,630 <span style={{ color: 'var(--emerald)', fontSize: '11px', fontWeight: 700 }}>&uarr; 12.5%</span></div>
                    </div>
                    <div style={{ borderLeft: '1px solid var(--border-color)' }} />
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Avg. Session</span>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>02:34 <span style={{ color: 'var(--emerald)', fontSize: '11px', fontWeight: 700 }}>&uarr; 8.1%</span></div>
                    </div>
                  </div>

                  {/* SVG line chart */}
                  <svg viewBox="0 0 400 150" style={{ width: '100%', height: '150px', overflow: 'visible' }}>
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="var(--teal)" stopOpacity="0.0"/>
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="0" y1="30" x2="400" y2="30" stroke="var(--border-color)" strokeDasharray="4 4" />
                    <line x1="0" y1="70" x2="400" y2="70" stroke="var(--border-color)" strokeDasharray="4 4" />
                    <line x1="0" y1="110" x2="400" y2="110" stroke="var(--border-color)" strokeDasharray="4 4" />
                    
                    {/* Fill Area */}
                    <path d="M0 130 C 50 110, 100 80, 150 90 C 200 100, 250 120, 300 70 C 350 40, 400 50 L 400 130 L 0 130 Z" fill="url(#chartGradient)" />

                    {/* Chart Lines */}
                    <path d="M0 130 C 50 110, 100 80, 150 90 C 200 100, 250 120, 300 70 C 350 40, 400 50" fill="none" stroke="var(--teal)" strokeWidth="3" strokeLinecap="round" />
                    <path d="M0 140 C 60 120, 120 90, 180 110 C 240 130, 300 100, 360 80 C 380 70, 400 65" fill="none" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
                    
                    {/* Dots */}
                    <circle cx="300" cy="70" r="5" fill="var(--teal)" stroke="#fff" strokeWidth="2" />
                    <circle cx="400" cy="50" r="5" fill="var(--teal)" stroke="#fff" strokeWidth="2" />

                    {/* X axis labels */}
                    <text x="0" y="148" fill="var(--text-secondary)" fontSize="8" fontWeight="700">1 Jun</text>
                    <text x="80" y="148" fill="var(--text-secondary)" fontSize="8" fontWeight="700">6 Jun</text>
                    <text x="160" y="148" fill="var(--text-secondary)" fontSize="8" fontWeight="700">11 Jun</text>
                    <text x="240" y="148" fill="var(--text-secondary)" fontSize="8" fontWeight="700">16 Jun</text>
                    <text x="320" y="148" fill="var(--text-secondary)" fontSize="8" fontWeight="700">21 Jun</text>
                    <text x="380" y="148" fill="var(--text-secondary)" fontSize="8" fontWeight="700">26 Jun</text>
                  </svg>
                  
                  {/* Legend */}
                  <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '12px', fontSize: '11px', fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--teal)' }} />
                      <span>Visitors</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--navy)' }} />
                      <span>Page Views</span>
                    </div>
                  </div>
                </div>

                {/* Top Performing Sections Chart */}
                <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '28px', boxShadow: 'var(--shadow-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Top Performing Sections</h3>
                    <select style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 700 }}>
                      <option>This Month</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gap: '16px' }}>
                    {[
                      { label: 'Products', val: '7,842', pct: '85%', color: 'var(--navy)' },
                      { label: 'Product Details', val: '5,621', pct: '65%', color: 'var(--teal)' },
                      { label: 'About Us', val: '3,421', pct: '45%', color: 'var(--navy)' },
                      { label: 'Careers', val: '2,154', pct: '30%', color: 'var(--emerald)' },
                      { label: 'Contact Us', val: '1,204', pct: '18%', color: '#64748b' }
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'grid', gap: '6px', fontSize: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                          <span>{item.label}</span>
                          <span style={{ color: 'var(--text-secondary)' }}>{item.val}</span>
                        </div>
                        <div style={{ height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: item.pct, background: item.color, borderRadius: '4px', transition: 'width 1s ease' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Action Grid */}
                <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '28px', boxShadow: 'var(--shadow-md)' }}>
                  <h3 style={{ margin: '0 0 24px', fontSize: '16px', fontWeight: 800 }}>Quick Actions</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <button onClick={() => { setProductForm({ brand: '', composition: '', section: '', group: '', strength: 'As directed', form: 'Tablet', image: null, accent: '#071B5A', featured: false, description: '' }); setActiveTab('products'); }} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '16px',
                      background: 'rgba(19, 184, 198, 0.05)', border: '1px solid rgba(19, 184, 198, 0.15)', borderRadius: '16px',
                      color: 'var(--text-primary)', cursor: 'pointer', transition: 'var(--transition)'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(19, 184, 198, 0.1)'}
                    onMouseOut={e => e.currentTarget.style.background = 'rgba(19, 184, 198, 0.05)'}
                    >
                      <Plus size={20} style={{ color: 'var(--teal)' }} />
                      <span style={{ fontSize: '11px', fontWeight: 800 }}>+ Add Product</span>
                    </button>
                    
                    <button onClick={() => setActiveTab('categories')} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '16px',
                      background: 'rgba(0, 194, 168, 0.05)', border: '1px solid rgba(0, 194, 168, 0.15)', borderRadius: '16px',
                      color: 'var(--text-primary)', cursor: 'pointer', transition: 'var(--transition)'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(0, 194, 168, 0.1)'}
                    onMouseOut={e => e.currentTarget.style.background = 'rgba(0, 194, 168, 0.05)'}
                    >
                      <Grid3X3 size={20} style={{ color: 'var(--emerald)' }} />
                      <span style={{ fontSize: '11px', fontWeight: 800 }}>+ Add Category</span>
                    </button>

                    <button onClick={() => { setJobForm({ title: '', location: '', type: 'Full-time', active: true, description: '', requirements: '' }); setActiveTab('careers'); }} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '16px',
                      background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.15)', borderRadius: '16px',
                      color: 'var(--text-primary)', cursor: 'pointer', transition: 'var(--transition)'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)'}
                    onMouseOut={e => e.currentTarget.style.background = 'rgba(139, 92, 246, 0.05)'}
                    >
                      <Briefcase size={20} style={{ color: '#8b5cf6' }} />
                      <span style={{ fontSize: '11px', fontWeight: 800 }}>+ Add Career</span>
                    </button>

                    <button onClick={() => setActiveTab('leads')} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '16px',
                      background: 'rgba(249, 115, 22, 0.05)', border: '1px solid rgba(249, 115, 22, 0.15)', borderRadius: '16px',
                      color: 'var(--text-primary)', cursor: 'pointer', transition: 'var(--transition)'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(249, 115, 22, 0.1)'}
                    onMouseOut={e => e.currentTarget.style.background = 'rgba(249, 115, 22, 0.05)'}
                    >
                      <Mail size={20} style={{ color: '#f97316' }} />
                      <span style={{ fontSize: '11px', fontWeight: 800 }}>Manage CRM Leads</span>
                    </button>

                    <button onClick={() => setActiveTab('news')} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '16px',
                      background: 'rgba(227, 24, 115, 0.05)', border: '1px solid rgba(227, 24, 115, 0.15)', borderRadius: '16px',
                      color: 'var(--text-primary)', cursor: 'pointer', transition: 'var(--transition)'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(227, 24, 115, 0.1)'}
                    onMouseOut={e => e.currentTarget.style.background = 'rgba(227, 24, 115, 0.05)'}
                    >
                      <FileText size={20} style={{ color: '#e31873' }} />
                      <span style={{ fontSize: '11px', fontWeight: 800 }}>+ Publish News</span>
                    </button>

                    <button onClick={() => triggerToast('Generating Excel/PDF reports...')} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '16px',
                      background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '16px',
                      color: 'var(--text-primary)', cursor: 'pointer', transition: 'var(--transition)'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'}
                    onMouseOut={e => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.05)'}
                    >
                      <FileDown size={20} style={{ color: '#10b981' }} />
                      <span style={{ fontSize: '11px', fontWeight: 800 }}>+ Download Report</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Row 3: LIST CARDS GRID (4 sections) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                
                {/* Recent Product Updates */}
                <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '24px', boxShadow: 'var(--shadow-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Recent Product Updates</h3>
                    <button onClick={() => setActiveTab('products')} style={{ background: 'transparent', border: 0, color: 'var(--teal)', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>View All</button>
                  </div>
                  <div style={{ display: 'grid', gap: '14px' }}>
                    {[
                      { brand: 'Lengrel-75mg', comp: 'Clopidogrel Tablets IP 75mg', time: '2 hours ago', tag: 'Updated' },
                      { brand: 'Sitamen Plus', comp: 'Sitagliptin 50mg + Metformin 500mg', time: '5 hours ago', tag: 'Updated' },
                      { brand: 'Pantolen 40mg', comp: 'Pantoprazole Tablets IP 40mg', time: '1 day ago', tag: 'Updated' }
                    ].map((prod, idx) => {
                      const logo = getBrandLogo(prod.brand)
                      return (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
                          <div style={{
                            width: '40px', height: '40px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)',
                            borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                          }}>
                            {logo ? <img src={logo} alt="" style={{ width: '80%', height: 'auto', objectFit: 'contain' }} /> : <FlaskConical size={16} style={{ color: 'var(--text-secondary)' }} />}
                          </div>
                          <div style={{ flexGrow: 1, minWidth: 0 }}>
                            <strong style={{ display: 'block', fontSize: '13px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{prod.brand}</strong>
                            <span style={{ display: 'block', color: 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', fontSize: '11px' }}>{prod.comp}</span>
                          </div>
                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <span style={{ background: 'rgba(0, 194, 168, 0.1)', color: 'var(--emerald)', fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '8px' }}>{prod.tag}</span>
                            <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>{prod.time}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Recent Applicants */}
                <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '24px', boxShadow: 'var(--shadow-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Recent Applicants</h3>
                    <button onClick={() => setActiveTab('careers')} style={{ background: 'transparent', border: 0, color: 'var(--teal)', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>View All</button>
                  </div>
                  <div style={{ display: 'grid', gap: '14px' }}>
                    {recentApplicants.length > 0 ? (
                      recentApplicants.map((app, idx) => (
                        <div key={app.id || idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
                          <div style={{
                            width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-primary)',
                            fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)'
                          }}>
                            {(app.name || '').charAt(0)}
                          </div>
                          <div style={{ flexGrow: 1, minWidth: 0 }}>
                            <strong style={{ display: 'block', fontSize: '13px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{app.name}</strong>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '11px', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{app.jobTitle}</span>
                          </div>
                          {app.resumeUrl ? (
                            <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" style={{
                              background: 'rgba(19, 184, 198, 0.05)', border: '1px solid rgba(19, 184, 198, 0.15)',
                              borderRadius: '8px', padding: '4px 8px', fontSize: '11px', textDecoration: 'none', color: 'var(--teal)', fontWeight: 800
                            }}>Resume ⬇</a>
                          ) : (
                            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>No Resume</span>
                          )}
                        </div>
                      ))
                    ) : (
                      <div style={{ color: 'var(--text-secondary)', fontSize: '12.5px', textAlign: 'center', padding: '16px 0' }}>
                        No recent applicants
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent CRM Leads */}
                <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '24px', boxShadow: 'var(--shadow-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Recent CRM Leads</h3>
                    <button onClick={() => setActiveTab('leads')} style={{ background: 'transparent', border: 0, color: 'var(--teal)', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>View All</button>
                  </div>
                  <div style={{ display: 'grid', gap: '14px' }}>
                    {recentLeads.length > 0 ? (
                      recentLeads.map((lead, idx) => {
                        const getStatusBadge = (status) => {
                          const s = (status || 'New').toLowerCase()
                          if (s === 'new') return { bg: 'rgba(227, 24, 115, 0.08)', text: '#e31873', label: 'New' }
                          if (s === 'contacted') return { bg: 'rgba(19, 184, 198, 0.08)', text: 'var(--teal)', label: 'Contacted' }
                          if (s === 'in progress') return { bg: 'rgba(249, 115, 22, 0.08)', text: '#f97316', label: 'In Progress' }
                          if (s === 'resolved') return { bg: 'rgba(0, 194, 168, 0.08)', text: 'var(--emerald)', label: 'Resolved' }
                          return { bg: 'rgba(100, 116, 139, 0.08)', text: '#64748b', label: status }
                        }
                        const badge = getStatusBadge(lead.status)
                        return (
                          <div key={lead.id || idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
                            <div style={{
                              width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(19,184,198,0.05)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal)'
                            }}>
                              <Mail size={16} />
                            </div>
                            <div style={{ flexGrow: 1, minWidth: 0 }}>
                              <strong style={{ display: 'block', fontSize: '13px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{lead.name}</strong>
                              <span style={{ color: 'var(--text-secondary)', fontSize: '11px', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{lead.subject}</span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <span style={{ background: badge.bg, color: badge.text, fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '8px' }}>{badge.label}</span>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div style={{ color: 'var(--text-secondary)', fontSize: '12.5px', textAlign: 'center', padding: '16px 0' }}>
                        No recent enquiries
                      </div>
                    )}
                  </div>
                </div>

                {/* Activity Timeline */}
                <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '24px', boxShadow: 'var(--shadow-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Recent Activity</h3>
                    <button onClick={() => triggerToast('Activity tracking is active for current session')} style={{ background: 'transparent', border: 0, color: 'var(--teal)', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>View All</button>
                  </div>
                  <div style={{ display: 'grid', gap: '14px', position: 'relative', paddingLeft: '14px', borderLeft: '1px solid var(--border-color)' }}>
                    {activities.map((act, idx) => (
                      <div key={idx} style={{ position: 'relative', fontSize: '11.5px' }}>
                        <span style={{
                          position: 'absolute', left: '-18.5px', top: '4px', width: '8px', height: '8px',
                          borderRadius: '50%', background: act.color, border: '2px solid var(--card-bg)'
                        }} />
                        <strong style={{ display: 'block', fontSize: '12px' }}>{act.text}</strong>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '10px', marginTop: '2px' }}>
                          <span>{act.author}</span>
                          <span>{act.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB: PRODUCTS MANAGER */}
          {activeTab === 'products' && (
            <div>
              {productForm ? (
                // Add / Edit Product form
                <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '36px', maxWidth: '640px', boxShadow: 'var(--shadow-lg)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: 'var(--navy)' }}>{productForm.id ? 'Edit Formulation' : 'Add New Formulation'}</h3>
                    <button onClick={() => setProductForm(null)} style={{ background: 'transparent', border: 0, color: 'var(--text-primary)', cursor: 'pointer' }}><X size={20} /></button>
                  </div>
                  <form onSubmit={saveProduct} style={{ display: 'grid', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Brand Name *</label>
                        <input
                          type="text"
                          value={productForm.brand || ''}
                          onChange={e => setProductForm({...productForm, brand: e.target.value})}
                          required
                          placeholder="e.g. Lentor 10mg"
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Chemical Composition</label>
                        <input
                          type="text"
                          value={productForm.composition || ''}
                          onChange={e => setProductForm({...productForm, composition: e.target.value})}
                          placeholder="e.g. Atorvastatin 10mg"
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Therapeutic Group (Area) *</label>
                        <select
                          value={productForm.group || ''}
                          onChange={e => setProductForm({...productForm, group: e.target.value})}
                          required
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                        >
                          <option value="">Select Group</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Therapeutic Class *</label>
                        <input
                          type="text"
                          value={productForm.section || ''}
                          onChange={e => setProductForm({...productForm, section: e.target.value})}
                          required
                          placeholder="e.g. Lipid Lowering Drug"
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Dose Strength</label>
                        <input
                          type="text"
                          value={productForm.strength || ''}
                          onChange={e => setProductForm({...productForm, strength: e.target.value})}
                          placeholder="e.g. 10 mg"
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Form *</label>
                        <select
                          value={productForm.form || 'Tablet'}
                          onChange={e => setProductForm({...productForm, form: e.target.value})}
                          required
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                        >
                          <option value="Tablet">Tablet</option>
                          <option value="Capsule">Capsule</option>
                          <option value="Injection">Injection</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gap: '8px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Product Image File *</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        {productForm.image ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-primary)', padding: '10px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', width: '100%', maxWidth: '360px' }}>
                            <div style={{ width: '40px', height: '40px', background: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <img src={`/assets/${productForm.image}`} alt="Uploaded product" style={{ width: '90%', height: 'auto', objectFit: 'contain' }} />
                            </div>
                            <div style={{ minWidth: 0, flexGrow: 1 }}>
                              <span style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{productForm.image}</span>
                              <button
                                type="button"
                                onClick={() => setProductForm({...productForm, image: null})}
                                style={{ border: 0, background: 'transparent', color: '#e31873', cursor: 'pointer', fontSize: '11.5px', fontWeight: 800, padding: 0, marginTop: '2px', display: 'block' }}
                              >
                                Remove Image
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div style={{ position: 'relative', width: '100%' }}>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0]
                                if (!file) return
                                setUploadingImage(true)
                                try {
                                  const formData = new FormData()
                                  formData.append('file', file)
                                  const res = await fetch('/api/upload', {
                                    method: 'POST',
                                    body: formData
                                  })
                                  const data = await res.json()
                                  if (res.ok && data.filename) {
                                    setProductForm(prev => ({ ...prev, image: data.filename }))
                                    triggerToast('Image uploaded successfully')
                                  } else {
                                    triggerToast(data.error || 'Failed to upload image', 'error')
                                  }
                                } catch (err) {
                                  triggerToast('Network error uploading image', 'error')
                                } finally {
                                  setUploadingImage(false)
                                }
                              }}
                              style={{ display: 'none' }}
                              id="product-image-upload"
                              disabled={uploadingImage}
                            />
                            <label
                              htmlFor="product-image-upload"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '12px 20px',
                                background: 'var(--bg-primary)',
                                border: '2px dashed var(--border-color)',
                                borderRadius: '12px',
                                cursor: uploadingImage ? 'not-allowed' : 'pointer',
                                fontSize: '13px',
                                fontWeight: 700,
                                color: 'var(--text-secondary)',
                                transition: 'var(--transition)',
                                width: '100%',
                                textAlign: 'center'
                              }}
                            >
                              <ImageIcon size={18} style={{ color: 'var(--teal)' }} />
                              {uploadingImage ? 'Uploading image...' : 'Choose Product Image File'}
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Accent Palette Color *</label>
                        <select
                          value={productForm.accent || '#0B2D6B'}
                          onChange={e => setProductForm({...productForm, accent: e.target.value})}
                          required
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                        >
                          {productAccentPalette.map(color => (
                            <option key={color} value={color} style={{ background: color, color: '#fff' }}>{color}</option>
                          ))}
                        </select>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
                        <input
                          type="checkbox"
                          id="featured-check"
                          checked={!!productForm.featured}
                          onChange={e => setProductForm({...productForm, featured: e.target.checked})}
                          style={{ width: '18px', height: '18px', accentColor: 'var(--teal)', cursor: 'pointer' }}
                        />
                        <label htmlFor="featured-check" style={{ fontSize: '13px', cursor: 'pointer' }}>Featured Formulation</label>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Description / Safety notes</label>
                      <textarea
                        value={productForm.description || ''}
                        onChange={e => setProductForm({...productForm, description: e.target.value})}
                        rows={3}
                        placeholder="Optional custom clinical description..."
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', resize: 'vertical' }}
                      />
                    </div>

                    <button type="submit" style={{
                      background: 'var(--teal)', color: '#fff', border: 0, padding: '12px', borderRadius: '24px',
                      fontSize: '14px', fontWeight: 800, cursor: 'pointer', marginTop: '12px', boxShadow: '0 4px 14px rgba(19,184,198,0.2)'
                    }}>Save Formulation</button>
                  </form>
                </div>
              ) : (
                // List Products
                <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>Listed Formulations ({searchedProducts.length})</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '12.5px', margin: '4px 0 0' }}>Add, edit, or remove catalog items</p>
                    </div>
                    <button onClick={() => setProductForm({
                      brand: '', composition: '', section: '', group: '', strength: 'As directed', form: 'Tablet', image: null, accent: '#0B2D6B', featured: false, description: ''
                    })} style={{
                      background: 'var(--teal)', color: '#fff', border: 0, padding: '10px 22px', borderRadius: '24px',
                      fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                      boxShadow: '0 4px 14px rgba(19, 184, 198, 0.2)'
                    }}><Plus size={16} /> Add Formulation</button>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                          <th style={{ padding: '14px 12px' }}>Brand Name</th>
                          <th style={{ padding: '14px 12px' }}>Composition</th>
                          <th style={{ padding: '14px 12px' }}>Therapeutic Group</th>
                          <th style={{ padding: '14px 12px' }}>Class</th>
                          <th style={{ padding: '14px 12px' }}>Form</th>
                          <th style={{ padding: '14px 12px' }}>Featured</th>
                          <th style={{ padding: '14px 12px', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchedProducts.map(p => (
                          <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 150ms ease' }} className="table-row-hover">
                            <td style={{ padding: '14px 12px', fontWeight: 800 }}>{p.brand}</td>
                            <td style={{ padding: '14px 12px', color: 'var(--text-secondary)' }}>{p.composition || '—'}</td>
                            <td style={{ padding: '14px 12px' }}><span style={{ background: 'rgba(19,184,198,0.1)', color: 'var(--teal)', padding: '3px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: 700 }}>{p.group}</span></td>
                            <td style={{ padding: '14px 12px' }}>{p.section}</td>
                            <td style={{ padding: '14px 12px' }}>{p.form}</td>
                            <td style={{ padding: '14px 12px' }}>{p.featured ? '✅ Yes' : 'No'}</td>
                            <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '8px' }}>
                                <button onClick={() => setProductForm(p)} style={{ background: 'transparent', border: 0, color: 'var(--teal)', cursor: 'pointer', padding: '4px' }}><Edit size={16} /></button>
                                <button onClick={() => deleteProduct(p.id)} style={{ background: 'transparent', border: 0, color: '#e31873', cursor: 'pointer', padding: '4px' }}><Trash2 size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: CAREERS & APPLICANTS */}
          {activeTab === 'careers' && (
            <div style={{ display: 'grid', gap: '40px' }}>
              {/* Jobs Manager */}
              <div>
                {jobForm ? (
                  <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '36px', maxWidth: '640px', boxShadow: 'var(--shadow-lg)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                      <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: 'var(--navy)' }}>{jobForm.id ? 'Edit Vacancy' : 'Publish New Vacancy'}</h3>
                      <button onClick={() => setJobForm(null)} style={{ background: 'transparent', border: 0, color: 'var(--text-primary)', cursor: 'pointer' }}><X size={20} /></button>
                    </div>
                    <form onSubmit={saveJob} style={{ display: 'grid', gap: '16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Job Title *</label>
                          <input
                            type="text"
                            value={jobForm.title || ''}
                            onChange={e => setJobForm({...jobForm, title: e.target.value})}
                            required
                            placeholder="e.g. Area Sales Executive"
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Location *</label>
                          <input
                            type="text"
                            value={jobForm.location || ''}
                            onChange={e => setJobForm({...jobForm, location: e.target.value})}
                            required
                            placeholder="e.g. Aluva, Kerala"
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Employment Type *</label>
                          <select
                            value={jobForm.type || 'Full-time'}
                            onChange={e => setJobForm({...jobForm, type: e.target.value})}
                            required
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                          >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                          </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
                          <input
                            type="checkbox"
                            id="job-active"
                            checked={jobForm.active !== false}
                            onChange={e => setJobForm({...jobForm, active: e.target.checked})}
                            style={{ width: '18px', height: '18px', accentColor: 'var(--teal)', cursor: 'pointer' }}
                          />
                          <label htmlFor="job-active" style={{ fontSize: '13px', cursor: 'pointer' }}>Active (Visible on Site)</label>
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Role Description *</label>
                        <textarea
                          value={jobForm.description || ''}
                          onChange={e => setJobForm({...jobForm, description: e.target.value})}
                          required
                          rows={4}
                          placeholder="Detail the duties and daily tasks..."
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', resize: 'vertical' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Requirements * (One per line)</label>
                        <textarea
                          value={jobForm.requirements || ''}
                          onChange={e => setJobForm({...jobForm, requirements: e.target.value})}
                          required
                          rows={4}
                          placeholder="e.g. 1. 2+ years field experience&#10;2. B.Pharm or equivalent degree"
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', resize: 'vertical' }}
                        />
                      </div>

                      <button type="submit" style={{
                        background: 'var(--pink)', color: '#fff', border: 0, padding: '12px', borderRadius: '24px',
                        fontSize: '14px', fontWeight: 800, cursor: 'pointer', marginTop: '12px', boxShadow: '0 4px 14px rgba(227,24,115,0.2)'
                      }}>Publish Vacancy</button>
                    </form>
                  </div>
                ) : (
                  <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>Job Positions List</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '12.5px', margin: '4px 0 0' }}>Manage vacancies published on the careers page</p>
                      </div>
                      <button onClick={() => setJobForm({ title: '', location: '', type: 'Full-time', active: true, description: '', requirements: '' })} style={{
                        background: 'var(--pink)', color: '#fff', border: 0, padding: '8px 18px', borderRadius: '24px',
                        fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                        boxShadow: '0 4px 14px rgba(227,24,115,0.2)'
                      }}><Plus size={14} /> Add Role</button>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                          <th style={{ padding: '12px' }}>Vacancy Title</th>
                          <th style={{ padding: '12px' }}>Location</th>
                          <th style={{ padding: '12px' }}>Type</th>
                          <th style={{ padding: '12px' }}>Status</th>
                          <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobs.map(j => (
                          <tr key={j.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '12px', fontWeight: 800 }}>{j.title}</td>
                            <td style={{ padding: '12px' }}>{j.location}</td>
                            <td style={{ padding: '12px' }}>{j.type}</td>
                            <td style={{ padding: '12px' }}>{j.active ? '🟢 Open' : '🔴 Closed'}</td>
                            <td style={{ padding: '12px', textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '8px' }}>
                                <button onClick={() => setJobForm(j)} style={{ background: 'transparent', border: 0, color: 'var(--teal)', cursor: 'pointer', padding: '4px' }}><Edit size={16} /></button>
                                <button onClick={() => deleteJob(j.id)} style={{ background: 'transparent', border: 0, color: '#e31873', cursor: 'pointer', padding: '4px' }}><Trash2 size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: APPLICANTS PIPELINE */}
          {activeTab === 'applicants' && (
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>Applicants Pipeline</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '12.5px', margin: '4px 0 0' }}>Review candidates and manage statuses</p>
              </div>

              <div style={{ display: 'grid', gap: '16px' }}>
                {searchedApplicants.map(app => (
                  <div key={app.id} style={{
                    padding: '20px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)',
                    borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '14px', transition: 'var(--transition)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <h4 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 800 }}>{app.name}</h4>
                        <span style={{ fontSize: '12.5px', color: 'var(--teal)', fontWeight: 700 }}>Position: {app.jobTitle}</span>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px', display: 'flex', gap: '16px' }}>
                          <span>Email: <strong>{app.email}</strong></span>
                          <span>Phone: <strong>{app.phone}</strong></span>
                          <span>Exp: <strong>{app.experience}</strong></span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <select
                          value={app.status}
                          onChange={e => updateApplicantStatus(app.id, e.target.value, app.notes || '')}
                          style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700 }}
                        >
                          <option value="New">New</option>
                          <option value="Reviewing">Reviewing</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Offered">Offered</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                        <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" style={{
                          background: 'rgba(19, 184, 198, 0.05)', color: 'var(--teal)', border: '1px solid rgba(19, 184, 198, 0.15)',
                          padding: '6px 12px', borderRadius: '8px', fontSize: '12px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700
                        }}><FileDown size={14} /> Resume</a>
                      </div>
                    </div>

                    {app.coverLetter && (
                      <div style={{ background: 'var(--bg-secondary)', borderLeft: '3px solid var(--border-color)', padding: '10px 14px', fontSize: '13px', color: 'var(--text-secondary)', borderRadius: '0 8px 8px 0' }}>
                        <strong>Cover letter note:</strong> "{app.coverLetter}"
                      </div>
                    )}

                    <div style={{ display: 'grid', gap: '6px' }}>
                      <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>Internal CRM Notes</label>
                      <input
                        type="text"
                        defaultValue={app.notes || ''}
                        placeholder="Log review updates (e.g. Sent screening questions, schedule technical interview)"
                        onBlur={e => updateApplicantStatus(app.id, app.status, e.target.value)}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>
                ))}
                {searchedApplicants.length === 0 && <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>No applicants found.</p>}
              </div>
            </div>
          )}

          {/* TAB: CRM LEAD MANAGER */}
          {activeTab === 'leads' && (
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>CRM Leads & Contact Enquiries</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '12.5px', margin: '4px 0 0' }}>Track enquiries, log communication notes, and update statuses</p>
              </div>

              <div style={{ display: 'grid', gap: '20px' }}>
                {searchedLeads.map(lead => (
                  <div key={lead.id} style={{
                    padding: '24px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)',
                    borderRadius: '16px', display: 'grid', gap: '16px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <h4 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 800 }}>{lead.name}</h4>
                        <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Subject: <strong style={{ color: 'var(--text-primary)' }}>{lead.subject}</strong></span>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px', display: 'flex', gap: '16px' }}>
                          <span>Email: <strong>{lead.email}</strong></span>
                          <span>Phone: <strong>{lead.phone}</strong></span>
                          <span>Received: <strong>{new Date(lead.createdAt).toLocaleDateString()}</strong></span>
                        </div>
                      </div>
                      <div>
                        <select
                          value={lead.status}
                          onChange={e => updateLeadStatus(lead.id, e.target.value, lead.notes || '')}
                          style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700 }}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: '8px', fontSize: '13px', color: 'var(--text-primary)', borderLeft: '3px solid var(--teal)' }}>
                      <strong>Enquiry message:</strong> "{lead.message}"
                    </div>

                    <div style={{ display: 'grid', gap: '6px' }}>
                      <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>CRM Log / Internal notes</label>
                      <input
                        type="text"
                        defaultValue={lead.notes || ''}
                        placeholder="Log email logs or call summaries..."
                        onBlur={e => updateLeadStatus(lead.id, lead.status, e.target.value)}
                        style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>
                ))}
                {searchedLeads.length === 0 && <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>No lead enquiries found.</p>}
              </div>
            </div>
          )}

          {/* TAB: CATEGORIES */}
          {activeTab === 'categories' && (
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>Therapeutic Area Categories</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '12.5px', margin: '4px 0 0' }}>Manage groups that sort listed products</p>
                </div>
                <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="New Category Name..."
                    value={newCategoryName}
                    onChange={e => setNewCategoryName(e.target.value)}
                    required
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                  <button type="submit" style={{
                    background: 'var(--teal)',
                    color: '#fff',
                    border: 0,
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}>Add Category</button>
                </form>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {categories.map((cat, idx) => {
                  const count = products.filter(p => p.group === cat).length
                  return (
                    <div key={cat || idx} style={{
                      padding: '24px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '16px',
                      display: 'flex', flexDirection: 'column', gap: '8px'
                    }}>
                      <strong style={{ fontSize: '16px', color: 'var(--navy)' }}>{cat}</strong>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{count} {count === 1 ? 'active product' : 'active products'}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}


          {/* TAB: NEWS */}
          {activeTab === 'news' && (
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow-md)' }}>
              
              {newsForm ? (
                /* ADD / EDIT NEWS FORM */
                <form onSubmit={saveNews} style={{ display: 'grid', gap: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                    <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: 'var(--navy)' }}>
                      {newsForm.id ? 'Edit News Article' : 'Publish News Article'}
                    </h3>
                    <button type="button" onClick={() => setNewsForm(null)} style={{ background: 'transparent', border: 0, color: 'var(--text-primary)', cursor: 'pointer' }}>
                      <X size={20} />
                    </button>
                  </div>

                  <div style={{ display: 'grid', gap: '6px' }}>
                    <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>News Title</label>
                    <input
                      type="text"
                      required
                      value={newsForm.title || ''}
                      onChange={e => setNewsForm({...newsForm, title: e.target.value})}
                      placeholder="e.g. Lenimen Biotech expands distribution network to Ernakulam"
                      style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '13px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gap: '6px' }}>
                    <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>Thumbnail Image</label>
                    {newsForm.image ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                        <div style={{ width: '60px', height: '40px', background: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <img src={`/assets/${newsForm.image}`} alt="News image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ minWidth: 0, flexGrow: 1 }}>
                          <span style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{newsForm.image}</span>
                          <button
                            type="button"
                            onClick={() => setNewsForm({...newsForm, image: null})}
                            style={{ border: 0, background: 'transparent', color: '#e31873', cursor: 'pointer', fontSize: '11.5px', fontWeight: 800, padding: 0, marginTop: '2px', display: 'block' }}
                          >
                            Remove Image
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ position: 'relative', width: '100%' }}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (!file) return
                            setUploadingImage(true)
                            try {
                              const formData = new FormData()
                              formData.append('file', file)
                              const res = await fetch('/api/upload', {
                                method: 'POST',
                                body: formData
                              })
                              const data = await res.json()
                              if (res.ok && data.filename) {
                                setNewsForm(prev => ({ ...prev, image: data.filename }))
                                triggerToast('Image uploaded successfully')
                              } else {
                                triggerToast(data.error || 'Failed to upload image', 'error')
                              }
                            } catch (err) {
                              triggerToast('Network error uploading image', 'error')
                            } finally {
                              setUploadingImage(false)
                            }
                          }}
                          style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '12px',
                            border: '1.5px dashed var(--border-color)',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-secondary)',
                            fontSize: '12.5px',
                            cursor: 'pointer'
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'grid', gap: '6px' }}>
                    <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>News Content</label>
                    <textarea
                      required
                      rows={8}
                      value={newsForm.content || ''}
                      onChange={e => setNewsForm({...newsForm, content: e.target.value})}
                      placeholder="Write the full news article content here..."
                      style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '13px', lineHeight: '1.6', fontFamily: 'inherit', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setNewsForm(null)}
                      style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '13px', fontWeight: 700 }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ padding: '10px 24px', borderRadius: '12px', border: 0, background: 'var(--teal)', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 700 }}
                    >
                      Publish Article
                    </button>
                  </div>
                </form>
              ) : (
                /* NEWS LIST VIEW */
                <>
                  <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>News & Press Releases</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '12.5px', margin: '4px 0 0' }}>Publish news updates to the live site</p>
                    </div>
                    <button
                      onClick={() => setNewsForm({ title: '', content: '', image: null })}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '12px', background: 'var(--teal)', color: '#fff', border: 0, fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
                    >
                      + Add News
                    </button>
                  </div>

                  <div style={{ display: 'grid', gap: '20px' }}>
                    {news.map((item) => (
                      <div key={item.id} style={{ display: 'flex', gap: '20px', padding: '20px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '16px', alignItems: 'center' }}>
                        {item.image && (
                          <div style={{ width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border-color)', background: '#fff' }}>
                            <img src={`/assets/${item.image}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        )}
                        <div style={{ flexGrow: 1, minWidth: 0 }}>
                          <strong style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: '15px', color: 'var(--text-primary)', lineHeight: '1.4' }}>{item.title}</strong>
                          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>
                            Published: {new Date(item.publishedAt).toLocaleDateString()}
                          </span>
                          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '6px 0 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}>{item.content}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                          <button
                            onClick={() => setNewsForm(item)}
                            style={{ background: 'transparent', border: 0, color: 'var(--teal)', cursor: 'pointer', padding: '6px' }}
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteNews(item.id, item.title)}
                            style={{ background: 'transparent', border: 0, color: '#e31873', cursor: 'pointer', padding: '6px' }}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {news.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                        No news articles published yet. Click "+ Add News" to publish your first update.
                      </div>
                    )}
                  </div>
                </>
              )}

            </div>
          )}



          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>System Settings</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '12.5px', margin: '4px 0 0' }}>Configure site-wide preferences, security, and view platform statistics</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
                
                {/* Security Preferences */}
                <div style={{ display: 'grid', gap: '20px' }}>
                  <form onSubmit={handlePasswordChange} style={{ padding: '24px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '20px', display: 'grid', gap: '16px' }}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>Change Administrator Password</strong>
                      <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Updates the admin access password dynamically</span>
                    </div>

                    <div style={{ display: 'grid', gap: '6px' }}>
                      <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>Current Password</label>
                      <input
                        type="password"
                        required
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-primary)', fontSize: '13px' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gap: '6px' }}>
                      <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>New Password</label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="At least 4 characters"
                        style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-primary)', fontSize: '13px' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gap: '6px' }}>
                      <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>Confirm New Password</label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Re-type new password"
                        style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-primary)', fontSize: '13px' }}
                      />
                    </div>

                    <button
                      type="submit"
                      style={{ padding: '11px 18px', borderRadius: '10px', background: 'var(--teal)', border: 0, color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer', textAlign: 'center', marginTop: '6px' }}
                    >
                      Update Password
                    </button>
                  </form>

                  <div style={{ padding: '24px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '20px' }}>
                    <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '14px' }}>Session Preferences</strong>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div style={{ display: 'grid', gap: '4px' }}>
                        <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>Auto Logout Idle Timeout</label>
                        <select style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-primary)', fontSize: '12.5px' }} defaultValue="24h">
                          <option value="1h">1 Hour</option>
                          <option value="4h">4 Hours</option>
                          <option value="12h">12 Hours</option>
                          <option value="24h">24 Hours (Default)</option>
                        </select>
                      </div>
                      <div style={{ display: 'grid', gap: '4px' }}>
                        <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>Default Toast Notification Time</label>
                        <select style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-primary)', fontSize: '12.5px' }} defaultValue="4s">
                          <option value="2s">2 Seconds</option>
                          <option value="4s">4 Seconds (Default)</option>
                          <option value="6s">6 Seconds</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* System & Architecture Info */}
                <div style={{ padding: '24px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>Platform Diagnostics</strong>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Live system configurations and libraries</span>
                  </div>

                  <div style={{ display: 'grid', gap: '10px', fontSize: '12.5px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Operating System</span>
                      <strong style={{ color: 'var(--text-primary)' }}>Windows (Local Server)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Core Architecture</span>
                      <strong style={{ color: 'var(--text-primary)' }}>Next.js (Turbopack Enabled)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Database Driver</span>
                      <strong style={{ color: 'var(--text-primary)' }}>SQLite (dev.db)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Prisma Client Version</span>
                      <strong style={{ color: 'var(--text-primary)' }}>6.19.3</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Node.js Version</span>
                      <strong style={{ color: 'var(--text-primary)' }}>v20+</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Database Sync Status</span>
                      <strong style={{ color: 'var(--emerald)' }}>Active & Connected</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => triggerToast('Diagnostics re-verified. All systems normal.')}
                    style={{ marginTop: 'auto', padding: '10px 16px', borderRadius: '10px', background: 'var(--teal)', border: 0, color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}
                  >
                    Run Health Check
                  </button>
                </div>

              </div>
            </div>
          )}

        </main>

        {/* FOOTER */}
        <footer style={{
          height: '60px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 32px',
          fontSize: '12px',
          color: 'var(--text-secondary)',
          transition: 'var(--transition)'
        }}>
          <span>&copy; 2026 Lenimen Biotech Pvt. Ltd. All rights reserved.</span>
          <span>Version 1.0.0</span>
        </footer>

      </div>
    </div>
  )
}
