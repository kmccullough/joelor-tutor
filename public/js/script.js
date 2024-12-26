const socket = io();
const label = document.querySelector('.js-label');
const btn = document.querySelector('button');
let index = 0;
btn.addEventListener('click', () => {
  label.innerText = ++index;
  socket.emit('inc', index);

  getKitty()
    .then(() => {  });
  getKitty();
});

socket.on('inc', i => {
  label.innerText = index = i;
});

const catUrl = 'https://cataas.com/cat';
let kitty = 0;

async function getKitty() {
  return fetch(catUrl)
    .then(r => r.blob())
    .then(blob => {
      const dataUrl = URL.createObjectURL(blob);
      let img = document.createElement('img');
      img.src = dataUrl;
      document.body.appendChild(img);
      console.log(++kitty);
    })
    .catch(error => console.error('Error:', error));
}

// await getKitty();
//
// await getKitty();

// fetch(catUrl)
//   .then(r => r.blob())
//   .then(blob => {
//     const kitty1 = URL.createObjectURL(blob);
//     let img = document.createElement('img');
//     img.src = kitty1;
//     document.body.appendChild(img);
//   })
//   .then(() => fetch(catUrl))
//   .then(r => r.blob())
//   .then(blob => {
//     const kitty2 = URL.createObjectURL(blob);
//     let img = document.createElement('img');
//     img.src = kitty2;
//     document.body.appendChild(img);
//   })
//   .catch(error => console.error('Error:', error));
//
// try {
//   let response = await fetch(catUrl);
//   let blob = await response.blob();
//   const kitty1 = URL.createObjectURL(blob);
//   let img = document.createElement('img');
//   img.src = kitty1;
//   document.body.appendChild(img);
//
//   response = await fetch(catUrl);
//   blob = await response.blob();
//   const kitty2 = URL.createObjectURL(blob);
//   img = document.createElement('img');
//   img.src = kitty2;
//   document.body.appendChild(img);
// } catch (e) {
//   console.error('Error:', e)
// }
