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

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  contactFeedback.textContent = '';
  if (!contactForm.reportValidity()) return;

  const captchaResponse = contactForm.querySelector('[name="h-captcha-response"]');
  if (!captchaResponse?.value) {
    contactFeedback.textContent = 'Please complete the hCaptcha challenge before sending.';
    return;
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.setAttribute('aria-busy', 'true');
  submitButton.firstChild.textContent = 'Sending… ';

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: new FormData(contactForm),
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Unable to send your message right now.');
    }

    contactForm.hidden = true;
    successPanel.hidden = false;
  } catch (error) {
    contactFeedback.textContent = error.message || 'Something went wrong. Please try again.';
  } finally {
    submitButton.disabled = false;
    submitButton.removeAttribute('aria-busy');
    submitButton.firstChild.textContent = 'Send message ';
  }
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
