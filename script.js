document.querySelector('form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = new FormData(e.target).get('email');
  alert(`Thanks! We will contact: ${email}`);
});
