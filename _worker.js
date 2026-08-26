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
    --card:#ffffff;
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
  .wrap{
    max-width:820px;
    margin:0 auto;
  }
  .hero{
    text-align:center;
    margin:18px 0 22px;
  }
  .hero h1{
    margin:0;
    font-size:clamp(26px, 4vw, 40px);
    letter-spacing:.5px;
  }
  .hero p{
    margin:10px 0 0;
    color:rgba(255,255,255,.78);
    line-height:1.7;
    font-size:14px;
  }
  .card{
    background:rgba(255,255,255,.96);
    color:var(--text);
    border:1px solid rgba(255,255,255,.35);
    border-radius:var(--radius);
    box-shadow:var(--shadow);
    padding:20px;
    backdrop-filter: blur(8px);
  }
  .label{
    display:block;
    font-size:14px;
    font-weight:700;
    margin-bottom:10px;
    color:#111827;
  }
  .input{
    width:100%;
    border:1px solid var(--border);
    border-radius:14px;
    padding:14px 16px;
    font-size:15px;
    outline:none;
    transition:.2s ease;
    background:#fff;
  }
  .input:focus{
    border-color:#93c5fd;
    box-shadow:0 0 0 4px rgba(59,130,246,.12);
  }
  .btns{
    display:grid;
    grid-template-columns:repeat(2, minmax(0, 1fr));
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
    box-shadow:0 8px 18px rgba(37,99,235,.18);
  }
  .btn:hover{transform:translateY(-1px);background:var(--primary2)}
  .btn:disabled{
    opacity:.5;
    cursor:not-allowed;
    transform:none;
  }
  .btn.secondary{
    background:#334155;
    box-shadow:0 8px 18px rgba(51,65,85,.12);
  }
  .btn.success{
    background:var(--success);
    box-shadow:0 8px 18px rgba(22,163,74,.14);
  }
  .btn.warning{
    background:var(--warning);
    box-shadow:0 8px 18px rgba(245,158,11,.14);
    color:#111827;
  }
  .output{
    margin-top:16px;
    display:grid;
    gap:10px;
  }
  .meta{
    display:flex;
    gap:10px;
    flex-wrap:wrap;
    margin-top:8px;
    font-size:13px;
    color:var(--muted);
  }
  .box{
    border:1px dashed #cbd5e1;
    border-radius:14px;
    padding:12px 14px;
    background:#f8fafc;
    word-break:break-all;
    white-space:pre-wrap;
    min-height:56px;
    line-height:1.6;
    color:#0f172a;
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
  .footer{
    text-align:center;
    margin-top:16px;
    color:rgba(255,255,255,.6);
    font-size:12px;
  }
  .tag{
    display:inline-block;
    padding:4px 10px;
    border-radius:999px;
    background:rgba(255,255,255,.12);
    color:#fff;
    font-size:12px;
    margin:6px 4px 0;
  }
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
      <p>输入原始订阅链接，自动过滤出包含 <b>:443</b> 的节点，并支持一键复制、打开圈X和小火箭导入。</p>
      <span class="tag">Cloudflare Worker</span>
      <span class="tag">订阅过滤</span>
      <span class="tag">iOS/Android</span>
    </div>

    <div class="card">
      <label class="label" for="subInput">粘贴原始订阅链接</label>
      <input id="subInput" class="input" placeholder="例如：https://example.com/sub 或 example.com/sub">

      <div class="btns">
        <button class="btn" onclick="gen()">生成过滤后的订阅地址</button>
        <button class="btn secondary" id="copyBtn" onclick="copyLink()" disabled>一键复制链接</button>
        <button class="btn success" id="quantumBtn" onclick="openQuantum()" disabled>一键导入圈X</button>
        <button class="btn warning" id="surgeBtn" onclick="openSurge()" disabled>一键导入小火箭</button>
      </div>

      <div class="output">
        <div class="meta" id="metaInfo"></div>
        <div id="out" class="box">请先输入订阅链接，然后点击“生成过滤后的订阅地址”。</div>
      </div>

      <div class="hint">
        <b>使用说明：</b><br>
        1. 先生成过滤后的订阅链接；<br>
        2. 可直接复制链接；<br>
        3. 点击“导入圈X / 小火箭”会尝试打开对应 App 的订阅导入；<br>
        4. 若手机系统未自动拉起 App，请直接复制链接到 App 内导入。
      </div>
    </div>

    <div class="footer">Made for Cloudflare Workers</div>
  </div>

<script>
let finalUrl = "";

function setOutput(msg){
  document.getElementById('out').innerText = msg;
}

function setButtons(enabled){
  document.getElementById('copyBtn').disabled = !enabled;
  document.getElementById('quantumBtn').disabled = !enabled;
  document.getElementById('surgeBtn').disabled = !enabled;
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

  setOutput(finalUrl);
  setButtons(true);

  document.getElementById('metaInfo').innerHTML = `
    <span>状态：已生成</span>
    <span>原始链接：${escapeHtml(origin)}</span>
  `;
}

async function copyLink(){
  try{
    await navigator.clipboard.writeText(finalUrl);
    alert("复制成功！");
  }catch(err){
    alert("复制失败，请手动复制");
  }
}

function openQuantum(){
  if(!finalUrl){ alert("请先生成订阅链接"); return; }

  // 常见圈X方案：尝试通过订阅链接打开；如果系统不支持，会失败后提示复制
  const schemeList = [
    "quantumult-x://",
    "quantumult://"
  ];

  openWithFallback(schemeList, finalUrl, "圈X");
}

function openSurge(){
  if(!finalUrl){ alert("请先生成订阅链接"); return; }

  // 常见小火箭方案：尝试通过 subscheme 打开
  const schemeList = [
    "surge://x-callback-url/add-subscription?url=" + encodeURIComponent(finalUrl),
    "shadowrocket://addsub?url=" + encodeURIComponent(finalUrl)
  ];

  openWithFallback(schemeList, finalUrl, "小火箭");
}

function openWithFallback(schemes, urlToCopy, appName){
  let index = 0;

  const tryNext = () => {
    if(index >= schemes.length){
      fallbackCopy(urlToCopy, appName);
      return;
    }

    const scheme = schemes[index++];
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = scheme;
    document.body.appendChild(iframe);

    setTimeout(() => {
      document.body.removeChild(iframe);
      tryNext();
    }, 700);
  };

  tryNext();
}

async function fallbackCopy(urlToCopy, appName){
  try{
    await navigator.clipboard.writeText(urlToCopy);
  }catch(e){}
  alert(appName + " 自动拉起失败，已帮你准备好订阅链接，请手动在 App 中导入或粘贴。");
}

function escapeHtml(str){
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
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
        let text = await res.text();

        let decoded;
        try {
          decoded = Buffer.from(text, "base64").toString("utf8");
        } catch (e) {
          decoded = text;
        }

        const lines = decoded
          .split('\n')
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
