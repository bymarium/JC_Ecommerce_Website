const header = document.getElementById('header')
const menuOpen = document.getElementById('menu-open')
const menuClose = document.getElementById('menu-close')
const navMenu = document.getElementById('nav-menu')

// Menu responsive
if (menuOpen) {
  menuOpen.addEventListener('click', () => {
    navMenu.classList.add('header__nav--visible')
  })
}

if (menuClose) {
  menuClose.addEventListener('click', () => {
    navMenu.classList.remove('header__nav--visible')
  })
}

// Scroll in menu
addEventListener('scroll', () => {
  if (this.scrollY > 150) {
    header.classList.add('header--fill')
  } else {
    header.classList.remove('header--fill')
  }
})

const testimonials = document.querySelectorAll('.testimonials__element')
testimonials.forEach((testi) => {
  testi.firstElementChild.style.height = `${testi.getBoundingClientRect().height + 13}px`
})
