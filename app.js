(function(){
"use strict";
const WA="601126238907";
const R2="https://r2.shop.itworldjersey.store/";
const files=[
"Product 0001.webp","Product 0002.webp","Product 0003.webp","Product 0004A.webp",
"Product 0005a.webp","Product 0006A.webp","Product 0007A.webp","Product 0008.webp",
"Product 0009.webp","Product 0010.webp","Product 0011.webp","Product 0012.webp",
"Product 0013.webp","Product 0014.webp","Product 0015.webp","Product 0016.webp"
];
const folder="No#0001 to 0100/";
function imageUrl(file){return R2+folder.split("/").map(encodeURIComponent).join("/")+"/"+encodeURIComponent(file);}
const products=files.map((file,i)=>({n:i+1,name:"Design "+String(i+1).padStart(4,"0"),price:null,emoji:["🔵","⚪","🔴","🩵","⚫","🌸","🔴","🔵"][i%8],file,category:"No# 0001–0100",src:imageUrl(file)}));
const grid=document.getElementById("productGrid"),empty=document.getElementById("emptyState"),count=document.getElementById("resultCount");
function money(p){return p.price==null?"Price on request":"RM "+Number(p.price).toFixed(2)}
function render(q=""){
 const shown=products.filter(p=>(p.name+" "+p.category).toLowerCase().includes(q.toLowerCase()));
 grid.innerHTML="";
 shown.forEach(p=>{
  const card=document.createElement("article");card.className="product-card";
  card.innerHTML='<div class="product-art"><span class="new-badge">Design</span><img class="product-photo" src="'+p.src+'" alt="'+p.name+' football jersey design" loading="lazy"><span class="photo-fallback" aria-hidden="true">'+p.emoji+' 👕</span></div><div class="product-info"><div class="product-name">'+p.name+'</div><div class="price">'+money(p)+'</div><button class="order-button" type="button">☏ Click to Order</button></div>';
  const img=card.querySelector(".product-photo"),fallback=card.querySelector(".photo-fallback");
  fallback.hidden=true;
  img.addEventListener("error",()=>{img.hidden=true;fallback.hidden=false;});
  card.querySelector("button").addEventListener("click",()=>{
   const url=location.origin+location.pathname+"#design-"+String(p.n).padStart(4,"0");
   const msg="Hi IT WORLD JERSEY, I would like to order/inquire about "+p.name+" (image: "+p.src+"). Please share price and availability.";
   window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(msg),"_blank","noopener");
  });
  grid.appendChild(card);
 });
 empty.hidden=shown.length>0;count.textContent=shown.length+" designs shown";
}
render();
const input=document.getElementById("searchInput");
document.getElementById("searchButton").addEventListener("click",()=>render(input.value));
input.addEventListener("keydown",e=>{if(e.key==="Enter")render(input.value)});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
let slide=0;
const dots=[...document.querySelectorAll("#slideDots button")],hero=document.getElementById("heroArt");
const themes=[["#1c5276","#ff1738"],["#254d38","#e2b83b"],["#17233f","#4da5e8"],["#48202a","#ff5a73"],["#1b293b","#c7f36b"]];
const bannerFiles=files.slice(0,5);
function setSlide(n){
 slide=(n+bannerFiles.length)%bannerFiles.length;
 hero.classList.add("has-photo");
 hero.style.backgroundImage="linear-gradient(90deg,#05070b30,#05070b15),url('"+imageUrl(bannerFiles[slide])+"')";
 hero.style.backgroundSize="cover";
 hero.style.backgroundPosition="center";
 hero.style.backgroundColor=themes[slide][0];
 dots.forEach((d,i)=>d.classList.toggle("selected",i===slide));
}
document.getElementById("prevSlide").addEventListener("click",()=>setSlide(slide-1));
document.getElementById("nextSlide").addEventListener("click",()=>setSlide(slide+1));
dots.forEach((d,i)=>d.addEventListener("click",()=>setSlide(i)));
setSlide(0);
window.setInterval(()=>setSlide(slide+1),5000);
})();