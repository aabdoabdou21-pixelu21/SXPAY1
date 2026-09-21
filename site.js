const cfg=window.SXPAY_CONFIG||{};const ready=cfg.SUPABASE_URL&&cfg.SUPABASE_URL.startsWith("http")&&cfg.SUPABASE_ANON_KEY&&cfg.SUPABASE_ANON_KEY.length>20;
const sb=ready?supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY):null;
const grid=document.getElementById("newsGrid"),pop=document.getElementById("popular");
function esc(s=""){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));}
async function load(){
 if(!sb){grid.innerHTML='<p class="muted">أضف بيانات Supabase في config.js أولاً.</p>';return}
 const {data,error}=await sb.from("posts").select("id,title,category,excerpt,image_url,published_at,views").eq("published",true).order("published_at",{ascending:false}).limit(12);
 if(error){grid.innerHTML='<p class="muted">تعذر تحميل الأخبار.</p>';return}
 grid.innerHTML=data.length?data.map(n=>`<article class="news-card"><div class="thumb" style="${n.image_url?`background-image:url('${n.image_url}')`:''}">${n.image_url?'':'🎮'}</div><div class="news-body"><span class="tag">${esc(n.category)}</span><h3>${esc(n.title)}</h3><p class="muted">${esc(n.excerpt||"")}</p><div class="meta">◷ ${new Date(n.published_at).toLocaleDateString("ar-DZ")}　◉ ${n.views||0}</div></div></article>`).join(""):'<p class="muted">لا توجد أخبار منشورة بعد.</p>';
 pop.innerHTML=data.slice(0,5).map((n,i)=>`<li><span class="num">${i+1}</span><span>${esc(n.title)}</span></li>`).join("");
}
load();
const menuBtn=document.getElementById("menuBtn"),nav=document.getElementById("nav");menuBtn.onclick=()=>nav.classList.toggle("open");
const modal=document.getElementById("searchModal"),input=document.getElementById("searchInput"),results=document.getElementById("results");
document.getElementById("searchBtn").onclick=()=>{modal.classList.add("show");input.focus()};document.getElementById("closeSearch").onclick=()=>modal.classList.remove("show");modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};
input.oninput=async()=>{const q=input.value.trim();if(!q||!sb){results.innerHTML="";return}const {data}=await sb.from("posts").select("title,category,excerpt").eq("published",true).or(`title.ilike.%${q}%,excerpt.ilike.%${q}%`).limit(10);results.innerHTML=(data||[]).map(n=>`<div class="result"><b>${esc(n.title)}</b><small class="meta"> — ${esc(n.category)}</small></div>`).join("")};
