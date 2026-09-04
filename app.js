const defaultApps = [
  {id:1,name:"Nova Era TV",version:"1.0.5",category:"TV e Filmes",code:"123456",description:"Aplicativo de entretenimento para dispositivos compatíveis.",download:"#",updated:"04/09/2026",featured:true},
  {id:2,name:"UniTV",version:"5.2.1",category:"Canais de TV",code:"654321",description:"Aplicativo demonstrativo para catálogo de canais e conteúdo.",download:"#",updated:"03/09/2026",featured:true},
  {id:3,name:"Youcine",version:"3.8.0",category:"TV e Filmes",code:"789012",description:"Aplicativo demonstrativo para filmes e séries.",download:"#",updated:"01/09/2026",featured:true},
  {id:4,name:"Downloader",version:"2.1.3",category:"Ferramentas",code:"112233",description:"Ferramenta demonstrativa para acesso a páginas e downloads.",download:"#",updated:"15/08/2026",featured:true}
];

let apps = JSON.parse(localStorage.getItem("novaEraApps") || "null") || defaultApps;

function save(){ localStorage.setItem("novaEraApps", JSON.stringify(apps)); }
function iconFor(a){ return a.name === "Downloader" ? "D" : (a.name === "Nova Era TV" ? "▶" : "N"); }

function card(a){
  return `<article class="app-card">
    <div class="app-icon"><span>${iconFor(a)}</span></div>
    <span class="tag">${a.category}</span>
    <h3>${escapeHtml(a.name)}</h3>
    <p>${escapeHtml(a.description)}</p>
    <div class="meta">Versão: ${escapeHtml(a.version)} · Atualizado: ${a.updated || "agora"}</div>
    <a class="btn primary download" href="${a.download || '#'}" ${a.download && a.download !== '#' ? 'target="_blank" rel="noopener"' : ''}>⬇ BAIXAR AGORA</a>
    ${a.code ? `<div class="code-box">Código Downloader: <b>${escapeHtml(a.code)}</b><button onclick="copyText('${String(a.code).replace(/'/g,"\\'")}')">Copiar</button></div>` : ""}
  </article>`;
}

function renderFeatured(){
  document.getElementById("featuredGrid").innerHTML = apps.filter(a=>a.featured).slice(0,4).map(card).join("");
}
function renderApps(){
  const q=(document.getElementById("appSearch")?.value||"").toLowerCase();
  const cat=document.getElementById("categoryFilter")?.value||"Todos";
  const filtered=apps.filter(a=>(a.name+" "+a.description).toLowerCase().includes(q)&&(cat==="Todos"||a.category===cat));
  document.getElementById("allAppsGrid").innerHTML=filtered.length?filtered.map(card).join(""):"<p>Nenhum aplicativo encontrado.</p>";
}
function renderUpdates(){
  const sorted=[...apps].sort((a,b)=>String(b.updated).localeCompare(String(a.updated))).slice(0,10);
  document.getElementById("updatesList").innerHTML=sorted.map(a=>`<div class="update-item"><div><strong>${escapeHtml(a.name)}</strong><br><small>Versão ${escapeHtml(a.version)} · ${escapeHtml(a.category)}</small></div><span class="tag">${a.updated||"novo"}</span></div>`).join("");
}
function renderAdmin(){
  document.getElementById("adminList").innerHTML=apps.map(a=>`<div class="admin-row"><div><strong>${escapeHtml(a.name)}</strong> · ${escapeHtml(a.version)}<br><small>${escapeHtml(a.category)} · ${a.download}</small></div><button class="danger" onclick="removeApp(${a.id})">Excluir</button></div>`).join("");
}
function removeApp(id){ if(confirm("Excluir este aplicativo do protótipo?")){apps=apps.filter(a=>a.id!==id);save();renderAll();}}
function copyText(t){ navigator.clipboard?.writeText(t); alert("Copiado: "+t); }
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function searchFromHome(){const q=document.getElementById("homeSearch").value;location.hash="apps";setTimeout(()=>{document.getElementById("appSearch").value=q;renderApps()},0)}
function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===id));
  document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("active",a.dataset.page===id));
  window.scrollTo({top:0,behavior:"smooth"});
}
function route(){
  let id=(location.hash||"#home").slice(1);
  if(!["home","apps","tools","updates","support","admin"].includes(id))id="home";
  showPage(id);
}
function renderAll(){renderFeatured();renderApps();renderUpdates();renderAdmin();}
document.querySelectorAll("[data-page]").forEach(a=>a.addEventListener("click",()=>setTimeout(route,0)));
document.getElementById("appSearch").addEventListener("input",renderApps);
document.getElementById("categoryFilter").addEventListener("change",renderApps);
document.getElementById("appForm").addEventListener("submit",e=>{
  e.preventDefault(); const f=new FormData(e.target);
  apps.unshift({id:Date.now(),name:f.get("name"),version:f.get("version"),category:f.get("category"),code:f.get("code"),description:f.get("description"),download:f.get("download"),updated:new Date().toLocaleDateString("pt-BR"),featured:true});
  save();e.target.reset();renderAll();alert("Aplicativo cadastrado no protótipo.");
});
window.addEventListener("hashchange",route);
renderAll();route();
