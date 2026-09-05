const defaultApps = [
{id:1,name:"BonitoTV",version:"1.0.3",category:"TV e Filmes",code:"",description:"Aplicativo para dispositivos compatíveis.",download:"https://github.com/diegorobainaven-shop/novaeratv.github.io/releases/download/v1.0.0/BonitoTV_Box_v1.0.3_AtivaGo.apk",updated:"04/09/2026",featured:true},
{id:2,name:"LupiTV",version:"1.0.4",category:"TV e Filmes",code:"",description:"Aplicativo para dispositivos compatíveis.",download:"https://github.com/diegorobainaven-shop/novaeratv.github.io/releases/download/v1.0.0/LupiTV_Box_v1.0.4_AtivaGo.apk",updated:"04/09/2026",featured:true},
{id:3,name:"P2P BinStream Exclusive",version:"atual",category:"Canais de TV",code:"",description:"Aplicativo P2P para dispositivos compatíveis.",download:"https://github.com/diegorobainaven-shop/novaeratv.github.io/releases/download/v1.0.0/P2P.BinStream.Exclusive.apk",updated:"04/09/2026",featured:true},
{id:4,name:"TudoTV Box",version:"1.1.0",category:"TV e Filmes",code:"",description:"Aplicativo para TV Box e dispositivos compatíveis.",download:"https://github.com/diegorobainaven-shop/novaeratv.github.io/releases/download/v1.0.0/TudoTV_Box_v1.1.0_AtivaGo.apk",updated:"04/09/2026",featured:true},

{id:6,name:"TV + Cinema",version:"1.1",category:"TV e Filmes",code:"",description:"Aplicativo de TV e cinema para dispositivos compatíveis.",download:"https://github.com/diegorobainaven-shop/novaeratv.github.io/releases/download/v1.0.0/tv%2Bcinema11.apk",updated:"04/09/2026",featured:false},
{id:7,name:"TVE BR",version:"3.8.2",category:"Canais de TV",code:"",description:"Aplicativo para dispositivos compatíveis.",download:"https://github.com/diegorobainaven-shop/novaeratv.github.io/releases/download/v1.0.0/TVEBR_stb01001_3.8.2.apk",updated:"04/09/2026",featured:false},
{id:8,name:"UniTV",version:"atual",category:"Canais de TV",code:"",description:"Aplicativo para dispositivos compatíveis.",download:"https://github.com/diegorobainaven-shop/novaeratv.github.io/releases/download/v1.0.0/unitv.apk",updated:"04/09/2026",featured:false},
{id:9,name:"WPlay P2P",version:"atual",category:"Canais de TV",code:"",description:"Aplicativo P2P para dispositivos compatíveis.",download:"https://github.com/diegorobainaven-shop/novaeratv.github.io/releases/download/v1.0.0/WPlay.P2P.BinStream.apk",updated:"04/09/2026",featured:false},
{id:10,name:"YouCine",version:"1.15.4",category:"TV e Filmes",code:"",description:"Aplicativo para filmes e séries em dispositivos compatíveis.",download:"https://github.com/diegorobainaven-shop/novaeratv.github.io/releases/download/v1.0.0/YouCine_1.15.4_Box_AtivaGo.apk",updated:"04/09/2026",featured:false}
];
const tools = [
{id:1,name:"Downloader",version:"1.5.3",category:"Ferramentas",description:"Ferramenta para download e instalação de aplicativos.",download:"https://github.com/diegorobainaven-shop/novaeratv.github.io/releases/download/v1.0.0/Downloader_1.5.3.apk"},
{id:2,name:"LINK2SD",version:"atual",category:"Ferramentas",description:"Ferramenta para gerenciamento de aplicativos e armazenamento.",download:"https://github.com/diegorobainaven-shop/novaeratv.github.io/releases/download/v1.0.0/LINK2SD.apk"},
{id:3,name:"Lucky Patcher",version:"11.7.0",category:"Ferramentas",description:"Ferramenta para gerenciamento e manutenção de aplicativos.",download:"https://github.com/diegorobainaven-shop/novaeratv.github.io/releases/download/v1.0.0/Lucky-Patcher-v11.7.0.apk"}
];
let apps = JSON.parse(localStorage.getItem("novaEraApps") || "null") || defaultApps;
function save(){ localStorage.setItem("novaEraApps", JSON.stringify(apps)); }
function iconFor(a){
  const imagens = {
    "BonitoTV":"bonitotv.jpg",
    "LupiTV":"lupitv.jpg",
    "P2P BinStream Exclusive":"tvs.jpg",
    "TudoTV Box":"tudo_tv.jpg",
    "TudoTV":"tudo_tv.jpg",
    "TV + Cinema":"tvcinema.png",
    "TVE BR":"tv_mais_express.jpg",
    "UniTV":"unitv.jpg",
    "WPlay P2P":"wplay.jpg",
    "YouCine":"youcine.jpg"
  };
  return imagens[a.name]
    ? `<img src="${imagens[a.name]}" alt="${a.name}" style="width:100%;height:100%;object-fit:cover;border-radius:12px;">`
    : "N";
}
function card(a){
  return `<article class="app-card">
    <div class="app-icon"><span>${iconFor(a)}</span></div>
    <span class="tag">${escapeHtml(a.category)}</span>
    <h3>${escapeHtml(a.name)}</h3>
    <p>${escapeHtml(a.description)}</p>
    <div class="meta">Versão: ${escapeHtml(a.version)} · Atualizado: ${escapeHtml(a.updated || "agora")}</div>
    <a class="btn primary download" href="${a.download || '#'}" target="_blank" rel="noopener">⬇ BAIXAR AGORA</a>
    ${a.code ? `<div class="code-box">Código Downloader: <b>${escapeHtml(a.code)}</b><button onclick="copyText('${String(a.code).replace(/'/g,"\\'")}')">Copiar</button></div>` : ""}
  </article>`;
}
function renderFeatured(){document.getElementById("featuredGrid").innerHTML=apps.filter(a=>a.featured).slice(0,4).map(card).join("");}
function renderApps(){
  const q=(document.getElementById("appSearch")?.value||"").toLowerCase();
  const cat=document.getElementById("categoryFilter")?.value||"Todos";
  const filtered=apps.filter(a=>(a.name+" "+a.description).toLowerCase().includes(q)&&(cat==="Todos"||a.category===cat));
  document.getElementById("allAppsGrid").innerHTML=filtered.length?filtered.map(card).join(""):"<p>Nenhum aplicativo encontrado.</p>";
}
function renderUpdates(){
  document.getElementById("updatesList").innerHTML=[...apps].slice(0,10).map(a=>`<div class="update-item"><div><strong>${escapeHtml(a.name)}</strong><br><small>Versão ${escapeHtml(a.version)} · ${escapeHtml(a.category)}</small></div><span class="tag">${a.updated||"novo"}</span></div>`).join("");
}function renderTools(){
  document.getElementById("toolsGrid").innerHTML=tools.map(a=>`
    <article class="tool-card">
      <span>🛠️</span>
      <h3>${escapeHtml(a.name)}</h3>
      <p>${escapeHtml(a.description)}</p>
      <div class="meta">Versão: ${escapeHtml(a.version)}</div>
      <a class="btn primary" href="${a.download}" target="_blank" rel="noopener">BAIXAR AGORA</a>
    </article>
  `).join("");
}
function renderAdmin(){
  document.getElementById("adminList").innerHTML=apps.map(a=>`<div class="admin-row"><div><strong>${escapeHtml(a.name)}</strong> · ${escapeHtml(a.version)}<br><small>${escapeHtml(a.category)} · ${escapeHtml(a.download)}</small></div><button class="danger" onclick="removeApp(${a.id})">Excluir</button></div>`).join("");
}
function removeApp(id){if(confirm("Excluir este aplicativo do protótipo?")){apps=apps.filter(a=>a.id!==id);save();renderAll();}}
function copyText(t){navigator.clipboard?.writeText(t);alert("Copiado: "+t);}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function searchFromHome(){const q=document.getElementById("homeSearch").value;location.hash="apps";setTimeout(()=>{document.getElementById("appSearch").value=q;renderApps()},0);}
function showPage(id){document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===id));document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("active",a.dataset.page===id));window.scrollTo({top:0,behavior:"smooth"});}
function route(){let id=(location.hash||"#home").slice(1);if(!["home","apps","tools","updates","support","admin"].includes(id))id="home";showPage(id);}
function renderAll(){renderFeatured();renderApps();renderUpdates();renderTools();renderAdmin();}
document.querySelectorAll("[data-page]").forEach(a=>a.addEventListener("click",()=>setTimeout(route,0)));
document.getElementById("appSearch").addEventListener("input",renderApps);
document.getElementById("categoryFilter").addEventListener("change",renderApps);
document.getElementById("appForm").addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target);apps.unshift({id:Date.now(),name:f.get("name"),version:f.get("version"),category:f.get("category"),code:f.get("code"),description:f.get("description"),download:f.get("download"),updated:new Date().toLocaleDateString("pt-BR"),featured:true});save();e.target.reset();renderAll();alert("Aplicativo cadastrado no protótipo.");});
window.addEventListener("hashchange",route);
renderAll();route();
