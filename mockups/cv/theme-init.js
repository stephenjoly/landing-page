// Runs before first paint. Same storage key and values as next-themes on the live site.
;(function () {
  var stored
  try {
    var fromUrl = new URLSearchParams(window.location.search).get('theme')
    if (fromUrl === 'light' || fromUrl === 'dark' || fromUrl === 'system') {
      localStorage.setItem('theme', fromUrl)
    }
    stored = localStorage.getItem('theme')
  } catch (error) {
    stored = null
  }
  var theme = stored || 'system'
  var dark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', dark)
})()
