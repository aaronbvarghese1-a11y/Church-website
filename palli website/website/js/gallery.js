const photos = Array.from(document.querySelectorAll('.gallery-grid img'));

if (photos.length > 0) {
  // build the big-picture viewer
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML =
    '<button class="lb-close">&times;</button>' +
    '<button class="lb-prev">&#10094;</button>' +
    '<img class="lb-img" alt="">' +
    '<button class="lb-next">&#10095;</button>';
  document.body.appendChild(box);

  const bigImage = box.querySelector('.lb-img');
  let current = 0;

  function show(index) {
    current = (index + photos.length) % photos.length;
    bigImage.src = photos[current].src;
    bigImage.alt = photos[current].alt;
    box.classList.add('open');
  }

  function close() {
    box.classList.remove('open');
  }

  photos.forEach(function (photo, i) {
    photo.addEventListener('click', function () { show(i); });
  });

  box.querySelector('.lb-close').addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
  box.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });

  // click on the dark area to close
  box.addEventListener('click', function (e) {
    if (e.target === box) close();
  });

  // keyboard: Esc closes, arrow keys change the photo
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
}