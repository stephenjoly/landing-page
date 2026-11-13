;(function () {
  var root = document.documentElement

  /* Theme selector */
  var media = window.matchMedia('(prefers-color-scheme: dark)')

  function readTheme() {
    try {
      return localStorage.getItem('theme') || 'system'
    } catch (error) {
      return 'system'
    }
  }

  function applyTheme(theme) {
    var dark = theme === 'dark' || (theme === 'system' && media.matches)
    root.classList.toggle('dark', dark)
  }

  var radios = document.querySelectorAll('input[name="appearance"]')
  var current = readTheme()
  radios.forEach(function (radio) {
    radio.checked = radio.value === current
    radio.addEventListener('change', function () {
      if (!radio.checked) return
      try {
        localStorage.setItem('theme', radio.value)
      } catch (error) {}
      applyTheme(radio.value)
    })
  })

  media.addEventListener('change', function () {
    if (readTheme() === 'system') applyTheme('system')
  })

  /* Mobile menu */
  var menuButton = document.querySelector('.menu-button')
  var menu = document.getElementById('mobile-menu')

  function focusables() {
    return menu.querySelectorAll('a[href], button:not([disabled])')
  }

  function openMenu() {
    menu.hidden = false
    menuButton.setAttribute('aria-expanded', 'true')
    document.body.style.overflow = 'hidden'
    menu.querySelector('.mobile-menu-close').focus()
  }

  function closeMenu() {
    if (menu.hidden) return
    menu.hidden = true
    menuButton.setAttribute('aria-expanded', 'false')
    document.body.style.overflow = ''
    menuButton.focus()
  }

  menuButton.addEventListener('click', openMenu)
  menu.querySelectorAll('[data-menu-close]').forEach(function (element) {
    element.addEventListener('click', closeMenu)
  })
  menu.querySelectorAll('nav a').forEach(function (link) {
    link.addEventListener('click', closeMenu)
  })

  document.addEventListener('keydown', function (event) {
    if (menu.hidden) return
    if (event.key === 'Escape') {
      closeMenu()
      return
    }
    if (event.key !== 'Tab') return
    var items = focusables()
    var first = items[0]
    var last = items[items.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  })

  window.matchMedia('(min-width: 1024px)').addEventListener('change', function (event) {
    if (event.matches) closeMenu()
  })

  /* Section wayfinding */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc ul a'))
  var sections = tocLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute('href'))
    })
    .filter(Boolean)

  function setActive(id) {
    tocLinks.forEach(function (link) {
      if (link.getAttribute('href') === '#' + id) {
        link.setAttribute('aria-current', 'location')
      } else {
        link.removeAttribute('aria-current')
      }
    })
  }

  function updateActive() {
    var marker = window.innerHeight * 0.3
    var active = null
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= marker) active = section
    })
    var atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
    if (atBottom) active = sections[sections.length - 1]
    if (active) setActive(active.id)
    else tocLinks.forEach(function (link) { link.removeAttribute('aria-current') })
  }

  var ticking = false
  window.addEventListener(
    'scroll',
    function () {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(function () {
        updateActive()
        ticking = false
      })
    },
    { passive: true },
  )
  window.addEventListener('resize', updateActive)
  updateActive()

  /* Footer year */
  var year = document.querySelector('[data-year]')
  if (year) year.textContent = String(new Date().getFullYear())
})()
