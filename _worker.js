export default {
  async fetch(request, env, ctx) {
    const PASSWORD = "";
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === `/${PASSWORD}` || path === "/") {
      return new Response(`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<meta name="theme-color" content="#0f172a">
<title>443订阅过滤器</title>
<style>
  :root{
    --bg1:#0f172a;
    --bg2:#111827;
    --card:rgba(255,255,255,.96);
    --text:#0f172a;
    --muted:#64748b;
    --primary:#2563eb;
    --primary2:#1d4ed8;
    --success:#16a34a;
    --warning:#f59e0b;
    --border:#e5e7eb;
    --shadow:0 10px 30px rgba(15,23,42,.12);
    --radius:18px;
  }
  *{box-sizing:border-box}
  body{
    margin:0;
    min-height:100vh;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;
    background:
      radial-gradient(circle at top left, rgba(37,99,235,.22), transparent 35%),
      radial-gradient(circle at top right, rgba(16,185,129,.18), transparent 28%),
      linear-gradient(180deg, var(--bg1), var(--bg2));
    color:#fff;
    padding:24px;
  }
  .wrap{max-width:900px;margin:0 auto}
  .hero{text-align:center;margin:18px 0 22px}
  .hero h1{margin:0;font-size:clamp(26px, 4vw, 40px)}
  .hero p{margin:10px 0 0;color:rgba(255,255,255,.78);line-height:1.7;font-size:14px}
  .tag{
    display:inline-block;
    padding:4px 10px;
    border-radius:999px;
    background:rgba(255,255,255,.12);
    color:#fff;
    font-size:12px;
    margin:8px 4px 0;
  }
  .card{
    background:var(--card);
    color:var(--text);
    border-radius:var(--radius);
    box-shadow:var(--shadow);
    padding:20px;
  }
  .label{display:block;font-size:14px;font-weight:700;margin-bottom:10px}
  .input-wrap{
    position:relative;
  }
  .input{
    width:100%;
    border:1px solid var(--border);
    border-radius:14px;
    padding:14px 44px 14px 16px;
    font-size:15px;
    outline:none;
  }
  .input:focus{
    border-color:#93c5fd;
    box-shadow:0 0 0 4px rgba(59,130,246,.12);
  }
  .clear-icon{
    position:absolute;
    right:14px;
    bottom:13px;
    width:22px;
    height:22px;
    border-radius:999px;
    border:none;
    background:#ef4444;
    color:#fff;
    font-size:14px;
    line-height:22px;
    text-align:center;
    cursor:pointer;
    display:none;
    padding:0;
  }
  .btns{
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:10px;
    margin-top:14px;
  }
  .btn{
    border:none;
    border-radius:14px;
    padding:13px 14px;
    font-size:15px;
    font-weight:700;
    cursor:pointer;
    transition:.18s ease;
    color:#fff;
    background:var(--primary);
  }
  .btn:hover{transform:translateY(-1px);background:var(--primary2)}
  .btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
  .secondary{background:#334155}
  .success{background:var(--success)}
  .warning{background:var(--warning);color:#111827}
  .output{
    margin-top:16px;
    border:1px dashed #cbd5e1;
    border-radius:14px;
    padding:12px 14px;
    background:#f8fafc;
    word-break:break-all;
    white-space:pre-wrap;
    min-height:62px;
    line-height:1.6;
  }
  .hint{
    margin-top:12px;
    font-size:13px;
    line-height:1.7;
    color:#475569;
    background:#f8fafc;
    border:1px solid #e2e8f0;
    border-radius:14px;
    padding:12px 14px;
  }
  .footer{text-align:center;margin-top:16px;color:rgba(255,255,255,.6);font-size:12px}
  @media (max-width:640px){
    .card{padding:16px}
    .btns{grid-template-columns:1fr}
  }
</style>
</head>
<body>
  <div class="wrap">
    <div class="hero">
      <h1>443订阅过滤器</h1>
      <p>输入原始订阅链接，自动筛选出包含 <b>:443</b> 的节点，并提供复制、圈X、小火箭快捷入口。</p>
      <span class="tag">Cloudflare Workers</span>
      <span class="tag">订阅过滤</span>
      <span class="tag">移动端适配</span>
    </div>

    <div class="card">
      <label class="label" for="subInput">粘贴原始订阅链接</label>
      <div class="input-wrap">
        <input id="subInput" class="input" placeholder="例如：https://example.com/sub">
        <button class="clear-icon" id="clearInputBtn">×</button>
      </div>

      <div class="btns">
        <button class="btn" onclick="gen()">生成过滤后的订阅地址</button>
        <button class="btn secondary" id="copyBtn" onclick="copyLink()" disabled>一键复制链接</button>
        <button class="btn success" id="qxBtn" onclick="openApp('qx')" disabled>一键导入圈X</button>
        <button class="btn warning" id="srBtn" onclick="openApp('sr')" disabled>一键导入小火箭</button>
      </div>

      <div id="out" class="output">请先输入订阅链接，然后点击“生成过滤后的订阅地址”。</div>

      <div class="hint">
        <b>说明：</b><br>
        1. 先生成过滤链接；<br>
        2. “一键导入”会尝试拉起对应 App；<br>
        3. 若 App 未能自动打开，可直接复制链接到 App 内手动导入。<br>
      </div>
    </div>

    <div class="footer">Made for Cloudflare Workers</div>
  </div>

<script>
let finalUrl = "";

function setButtons(enabled){
  document.getElementById('copyBtn').disabled = !enabled;
  document.getElementById('qxBtn').disabled = !enabled;
  document.getElementById('srBtn').disabled = !enabled;
}

function gen(){
  const origin = document.getElementById('subInput').value.trim();
  if(!origin){
    alert('请粘贴订阅链接');
    return;
  }
  const params = new URLSearchParams();
  params.set("src", origin);
  finalUrl = location.origin + "/filter?" + params.toString();
  document.getElementById('out').innerText = finalUrl;
  setButtons(true);
}

async function copyLink(){
  try{
    await navigator.clipboard.writeText(finalUrl);
    alert("复制成功！");
  }catch(e){
    alert("复制失败，请手动复制");
  }
}

function openApp(type){
  if(!finalUrl){ alert("请先生成订阅链接"); return; }

  const tryOpen = (scheme) => {
    const a = document.createElement('a');
    a.href = scheme;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if(type === 'qx'){
    tryOpen('quantumult-x://');
    setTimeout(async () => {
      try {
        await navigator.clipboard.writeText(finalUrl);
      } catch(e){}
      alert('已尝试打开圈X。如未自动导入，请在圈X中手动添加该订阅链接，或直接复制链接。');
    }, 500);
  }else{
    tryOpen('shadowrocket://addsub?url=' + encodeURIComponent(finalUrl));
    setTimeout(async () => {
      try {
        await navigator.clipboard.writeText(finalUrl);
      } catch(e){}
      alert('已尝试打开小火箭。如未自动导入，请在小火箭中手动添加该订阅链接，或直接复制链接。');
    }, 500);
  }
}

// 红色清除图标逻辑
const subInput = document.getElementById('subInput');
const clearInputBtn = document.getElementById('clearInputBtn');
subInput.addEventListener('input', ()=>{
  clearInputBtn.style.display = subInput.value ? 'block' : 'none';
})
clearInputBtn.onclick = ()=>{
  subInput.value = '';
  clearInputBtn.style.display = 'none';
  document.getElementById('out').innerText = "请先输入订阅链接，然后点击“生成过滤后的订阅地址”。";
  setButtons(false);
}
</script>
</body>
</html>
      `, { headers: { "content-type": "text/html;charset=utf-8" } });
    }

    if (path === "/filter") {
      let src = url.searchParams.get("src");
      if (!src) return new Response("错误：缺少 src 参数", { status: 200 });

      if (!src.startsWith("http://") && !src.startsWith("https://")) {
        src = "https://" + src;
      }

      try {
        const res = await fetch(src, { redirect: "follow" });
        const text = await res.text();

        let decoded = text;
        const cleaned = text.replace(/\s+/g, "");
        if (/^[A-Za-z0-9+/=]+$/.test(cleaned)) {
          decoded = atob(cleaned);
        }

        const lines = decoded
          .split(/\r?\n/)
          .map(line => line.trim())
          .filter(line => line.includes(':443'));

        return new Response(lines.join('\n'), {
          headers: { "content-type": "text/plain;charset=utf-8" }
        });
      } catch (e) {
        return new Response("订阅拉取失败：" + e.message, { status: 500 });
      }
    }

    return new Response("404 Not Found", { status: 404 });
  }
}
