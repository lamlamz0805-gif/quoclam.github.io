
const root = document.documentElement;
const themeToggle = document.querySelector('[data-theme-toggle]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

const savedTheme = localStorage.getItem('beach-blue-theme');

if (savedTheme) {
  root.dataset.theme = savedTheme;
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  root.dataset.theme = 'dark';
}

function syncThemeIcon() {
  if (!themeToggle) return;
  themeToggle.textContent = root.dataset.theme === 'dark' ? '☀' : '☾';
}

syncThemeIcon();

themeToggle?.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('beach-blue-theme', root.dataset.theme);
  syncThemeIcon();
});

menuToggle?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('open');
  menuToggle.textContent = mobileMenu?.classList.contains('open') ? '✕' : '☰';
});

document.querySelectorAll('[data-mobile-menu] a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu?.classList.remove('open');
    if (menuToggle) menuToggle.textContent = '☰';
  });
});

const categoryButtons = document.querySelectorAll('[data-filter]');
const postCards = document.querySelectorAll('[data-category]');

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    postCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? '' : 'none';
    });
  });
});

document.querySelectorAll('[data-demo-form]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const message = form.querySelector('[data-form-message]');
    if (message) {
      message.textContent = 'Đã nhận thông tin. Đây là bản demo front-end nên dữ liệu chưa được gửi lên server.';
    }
    form.reset();
  });
});
