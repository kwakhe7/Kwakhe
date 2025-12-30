const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
const savedTheme = localStorage.getItem('theme')
const theme = savedTheme || (prefersDark ? 'dark' : 'light')
if (theme === 'dark') document.body.classList.remove('theme-light')
if (theme === 'light') document.body.classList.add('theme-light')
const yearEl = document.getElementById('year')
if (yearEl) yearEl.textContent = new Date().getFullYear()
const toggle = document.getElementById('theme-toggle')
if (toggle) {
  toggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('theme-light')
    localStorage.setItem('theme', isLight ? 'light' : 'dark')
  })
}
const menuToggle = document.getElementById('menu-toggle')
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    document.body.classList.toggle('mobile-nav-open')
  })
}
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href')
    if (!id || id === '#') return
    const el = document.querySelector(id)
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
})
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.2 }
)
document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
const contactForm = document.getElementById('contact-form')
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault()
    const name = contactForm.querySelector('[name="name"]').value.trim()
    const email = contactForm.querySelector('[name="email"]').value.trim()
    const message = contactForm.querySelector('[name="message"]').value.trim()
    if (!name || !email || !message) return
    const mailto = `mailto:kwakhekhumalo7@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + email)}`
    window.location.href = mailto
  })
}
const avatarImg = document.getElementById('avatar')
if (avatarImg) {
  avatarImg.addEventListener('error', () => {
    avatarImg.classList.add('avatar-fallback')
  })
}
const hero = document.querySelector('.hero')
if (hero && avatarImg) {
  let raf
  const onMove = (e) => {
    const rect = hero.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    if (raf) cancelAnimationFrame(raf)
    raf = requestAnimationFrame(() => {
      avatarImg.style.transform = `rotateY(${x * 10}deg) rotateX(${y * -10}deg)`
    })
  }
  const reset = () => {
    avatarImg.style.transform = ''
  }
  hero.addEventListener('mousemove', onMove)
  hero.addEventListener('mouseleave', reset)
}
const titleEl = document.querySelector('.moving-title')
if (titleEl) {
  const text = titleEl.textContent
  const frag = document.createDocumentFragment()
  titleEl.textContent = ''
  Array.from(text).forEach((ch, i) => {
    const span = document.createElement('span')
    span.className = 'char'
    span.textContent = ch
    span.style.animationDelay = `${i * 40}ms`
    frag.appendChild(span)
  })
  titleEl.appendChild(frag)
  titleEl.classList.add('ml-in')
  const chars = Array.from(titleEl.querySelectorAll('.char'))
  setInterval(() => {
    const idx = Math.floor(Math.random() * chars.length)
    const c = chars[idx]
    c.classList.add('jitter')
    setTimeout(() => c.classList.remove('jitter'), 350)
  }, 1200)
}
const rotatorEl = document.getElementById('rotator')
if (rotatorEl) {
  const words = ['Software Developer', 'Frontend', 'Data Analysis', 'UI/UX Enthusiast']
  let i = 0
  setInterval(() => {
    i = (i + 1) % words.length
    rotatorEl.textContent = words[i]
  }, 1800)
}
