const img = document.getElementById('myImg');
let angle = 0;
setInterval(() => {
  angle += 2;
  img.style.transform = `rotate(${angle}deg)`;
  console.log('rotating'); // check if this logs
}, 100);