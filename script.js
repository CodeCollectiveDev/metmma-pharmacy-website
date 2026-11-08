const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const closeButton = document.querySelector('.menu-close');

function setMenu(open) {
  mobileMenu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}

menuButton.addEventListener('click', () => setMenu(mobileMenu.hidden));
closeButton.addEventListener('click', () => setMenu(false));
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !mobileMenu.hidden) setMenu(false);
});

const contactForm = document.querySelector('#contact-form');
const successPanel = document.querySelector('#success-panel');
const contactFeedback = document.querySelector('#contact-feedback');
const backToForm = document.querySelector('#back-to-form');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  contactFeedback.textContent = '';
  if (!contactForm.reportValidity()) return;
  contactForm.hidden = true;
  successPanel.hidden = false;
});

backToForm.addEventListener('click', () => {
  successPanel.hidden = true;
  contactForm.hidden = false;
  contactForm.reset();
  document.querySelector('#name').focus();
});

document.querySelector('#newsletter-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const feedback = form.querySelector('.newsletter-feedback');
  if (!form.reportValidity()) return;
  feedback.textContent = `Thanks — newsletter signup is a preview and hasn't been saved.`;
  form.reset();
});
