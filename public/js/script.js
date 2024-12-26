const socket = io();
const label = document.querySelector('.js-label');
const btn = document.querySelector('button');
let index = 0;
btn.addEventListener('click', () => {
  label.innerText = ++index;
  socket.emit('inc', index);
});

socket.on('inc', i => {
  label.innerText = index = i;
});
