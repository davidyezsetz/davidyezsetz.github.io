const name = 'kontakt';
const server = 'davidsetz.de';
const subject = 'kontakt via davidsetz.de';
const mailSet = false;

function setMailTarget(link) {
  /* eslint-disable no-param-reassign */
  if (mailSet === false) {
    link.href = `mailto:${name}@${server}?subject=${subject}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const link = document.getElementById('js-mail-link');
  link.addEventListener('click', () => setMailTarget(link));
});
