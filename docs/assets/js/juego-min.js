const miModulo=(()=>{"use strict";let e=[];const t=["C","D","H","S"],s=["A","J","Q","K"];let a=[];const n=document.querySelector("#btnPedir"),r=document.querySelector("#btnDetener"),o=document.querySelector("#btnNuevo"),d=document.querySelectorAll(".divCartas"),l=document.querySelectorAll("small"),c=(t=2)=>{e=i(),a=[];for(let e=0;e<t;e++)a.push(0);l.forEach(e=>e.innerText=0),d.forEach(e=>e.innerHTML=""),n.disabled=!1,r.disabled=!0},i=()=>{e=[];for(let s=2;s<=10;s++)for(const a of t)e.push(s+a);for(const a of t)for(const t of s)e.push(t+a);return _.shuffle(e)},u=()=>{if(0===e.length)throw"No hay cartas en el deck";return e.pop()},b=(e,t)=>(a[t]=a[t]+(e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t})(e),l[t].innerText=a[t],a[t]),m=(e,t)=>{const s=document.createElement("img");s.src=`assets/cartas/${e}.png`,s.classList.add("carta"),d[t].append(s)},f=e=>{let t=0;do{const e=u();t=b(e,a.length-1),m(e,a.length-1)}while(t<e&&e<=21);h()},h=()=>{const[e,t]=a;setTimeout(()=>{t===e?swal({title:"Empate!",text:"Nadie gana :(´....!",icon:"error"}):e>21?swal({title:"Perdiste!",text:" Computadora gana :(´....!",icon:"error"}):t>21?(swal({title:"Ganaste!",text:" Manca esa computadora... :)!",icon:"success"}),o.disabled=!1):swal({title:"Perdiste!",text:"Computadora gana :(´....!",icon:"error"})},100)};return n.addEventListener("click",()=>{o.disabled=!0;const e=u(),t=b(e,0);m(e,0),t>1&&(r.disabled=!1),t>21?(n.disabled=!0,r.disabled=!0,o.disabled=!1,f(t)):21===t&&(n.disabled=!0,r.disabled=!0,f(t))}),r.addEventListener("click",()=>{n.disabled=!0,r.disabled=!0,f(a[0]),o.disabled=!1}),o.addEventListener("click",()=>{c()}),{nuevoJuego:c}})();