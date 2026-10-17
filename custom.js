(function(){
"use strict";
const $=id=>document.getElementById(id);
const primary=$("primaryColor"),accent=$("accentColor"),shorts=$("shortsColor"),team=$("teamName"),player=$("playerName"),number=$("playerNumber"),style=$("jerseyStyle"),badge=$("badgeFile");
let view="front",badgeUrl="";
const colours={};
function update(){
 const p=primary.value,a=accent.value,s=shorts.value,n=String(Math.max(0,Math.min(99,Number(number.value)||0)));
 $("shirtBody").setAttribute("fill",p);$("shirtStripe").setAttribute("fill",a);
 $("neckV").setAttribute("stroke",a);$("neckRound").setAttribute("stroke",a);$("neckCollar").setAttribute("stroke",a);
 $("shortsBody").setAttribute("fill",s);$("shortsAccent").setAttribute("fill",a);
 $("frontTeam").textContent=(team.value.trim()||"YOUR TEAM").toUpperCase().slice(0,22);
 $("frontNumber").textContent=n;$("shortsNumber").textContent=n;
 const back=view==="back";
 $("frontTeam").style.display=back?"none":"";
 $("frontNumber").style.display=back?"none":"";
 $("shirtBadge").style.display=badgeUrl&&!back?"":"none";
 $("shirtBadge").setAttribute("href",badgeUrl);
 $("neckV").style.display=style.value==="classic"?"":"none";
 $("neckRound").style.display=style.value==="round"?"":"none";
 $("neckCollar").style.display=style.value==="collar"?"":"none";
 $("previewTeam").textContent=(team.value.trim()||"YOUR TEAM").toUpperCase();
 $("previewDetails").textContent=[style.options[style.selectedIndex].text, p.toUpperCase(), a.toUpperCase()].join(" · ");
 $("playerName").setAttribute("aria-label","Player name");
 if(back){
   $("frontTeam").textContent=(player.value.trim()||"YOUR NAME").toUpperCase().slice(0,16);
   $("frontTeam").style.display="";
   $("frontTeam").setAttribute("y","120");
   $("frontNumber").setAttribute("y","225");$("frontNumber").style.display="";
   $("frontNumber").textContent=n;
 }else{$("frontTeam").setAttribute("y","157");}
}
[primary,accent,shorts,team,player,number,style].forEach(el=>el.addEventListener("input",update));
document.querySelectorAll(".preset-row button").forEach(btn=>btn.addEventListener("click",()=>{primary.value=btn.dataset.primary;accent.value=btn.dataset.accent;shorts.value=btn.dataset.shorts;update();}));
document.querySelectorAll(".view-toggle button").forEach(btn=>btn.addEventListener("click",()=>{view=btn.dataset.view;document.querySelectorAll(".view-toggle button").forEach(b=>b.classList.toggle("active",b===btn));update();}));
badge.addEventListener("change",()=>{const f=badge.files&&badge.files[0];if(!f){badgeUrl="";update();return;}if(!f.type.startsWith("image/")||f.size>3*1024*1024){badge.value="";alert("Choose a PNG, JPG or WEBP image under 3 MB.");return;}if(badgeUrl)URL.revokeObjectURL(badgeUrl);badgeUrl=URL.createObjectURL(f);update();});
function downloadSvg(){const shirt=$("shirtSvg").cloneNode(true);shirt.setAttribute("xmlns","http://www.w3.org/2000/svg");const shortsSvg=$("shortsSvg").cloneNode(true);shortsSvg.setAttribute("xmlns","http://www.w3.org/2000/svg");const blob=new Blob([shirt.outerHTML+"\n"+shortsSvg.outerHTML],{type:"image/svg+xml;charset=utf-8"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="it-world-jersey-concept.svg";a.click();URL.revokeObjectURL(url);}
$("downloadPreview").addEventListener("click",downloadSvg);
$("resetDesign").addEventListener("click",()=>{team.value="IT WORLD";player.value="YOUR NAME";number.value="10";style.value="classic";primary.value="#123e86";accent.value="#ffca28";shorts.value="#111827";badge.value="";if(badgeUrl)URL.revokeObjectURL(badgeUrl);badgeUrl="";view="front";document.querySelectorAll(".view-toggle button").forEach(b=>b.classList.toggle("active",b.dataset.view==="front"));update();});
$("requestQuote").addEventListener("click",()=>{$("orderPanel").scrollIntoView({behavior:"smooth",block:"start"});$("quotePhone").focus({preventScroll:true});});
$("quoteForm").addEventListener("submit",e=>{e.preventDefault();const phone=$("quotePhone").value.trim();if(!phone){$("quoteStatus").textContent="Please enter your WhatsApp / phone number.";return;}const msg="IT WORLD JERSEY — CUSTOM DESIGN QUOTE\nTeam: "+(team.value.trim()||"Not specified")+"\nPlayer name: "+(player.value.trim()||"Not specified")+"\nNumber: "+number.value+"\nJersey style: "+style.options[style.selectedIndex].text+"\nPrimary colour: "+primary.value+"\nAccent colour: "+accent.value+"\nShorts colour: "+shorts.value+"\nCustomer WhatsApp: "+phone+"\nExtra notes: "+$("quoteNotes").value.trim()+"\nPlease quote this custom kit concept. Preview file can be shared separately.";window.open("https://wa.me/601126238907?text="+encodeURIComponent(msg),"_blank","noopener");$("quoteStatus").textContent="WhatsApp is opening with your request. Please send the message there; share your saved preview separately if needed.";});
update();
})();