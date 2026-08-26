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
<meta name="viewport" content="width=device-width, initial‑scale=1.0">
<title>443订阅过滤器</title>
<style>
*{box-sizing:border-box}
body{padding:24px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;max-width:720px;margin:0 auto;background:#f0f4f8}
h2{margin-top:0;margin-bottom:20px;color:#1f2937;font-weight:600}
#subInput{width:100%;padding:14px 16px;font-size:16px;border:1px solid #cbd5e1;border-radius:12px;margin-bottom:16px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.06)}
.btn-wrap{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}
.btn-row{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px}
button{padding:12px 14px;font-size:15px;border:none;border-radius:10px;cursor:pointer;transition:all .2s ease}
.btn-primary{background:#2563eb;color:#fff}
.btn-primary:active{background:#1d4ed8;transform:scale(0.98)}
.btn-success{background:#0891b2;color:#fff}
.btn-success:active{background:#0e7490;transform:scale(0.98)}
.btn-warning{background:#d97706;color:#fff}
.btn-warning:active{background:#b45309;transform:scale(0.98)}
.btn-gray{background:#64748b;color:#fff}
.btn-gray:active{background:#475569;transform:scale(0.98)}
#out{width:100%;padding:16px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;white-space:pre-wrap;word-break:break-all;min-height:120px;font-size:14px;color:#333;box-shadow:0 1px 4px rgba(0,0,0,0.05)}
.tip{font-size:13px;color:#64748b;margin-top:8px}
</style>
</head>
<body>
<h2>443端口订阅过滤器</h2>
<input id="subInput" placeholder="粘贴原始订阅链接">

<div class="btn-row">
  <button class="btn-primary" onclick="gen()">生成过滤后的订阅地址</button>
  <button class="btn-success" id="copyBtn" onclick="copyLink()" disabled>一键复制链接</button>
  <button class="btn-gray" onclick="clearAll()">一键清空</button>
</div>

<div class="btn-wrap">
  <button class="btn-warning" id="btnQuantumultX" onclick="openQX()" disabled>一键导入圈X</button>
  <button class="btn-primary" id="btnShadowrocket" onclick="openSR()" disabled>一键导入小火箭</button>
</div>

<pre id="out"></pre>
<div class="tip">说明：导入按钮需要先成功生成订阅链接才可点击</div>

<script>
let finalUrl = "";
const inputEl = document.getElementById('subInput');
const outEl = document.getElementById('out');
const copyBtn = document.getElementById('copyBtn');
const btnQX = document.getElementById('btnQuantumultX');
const btnSR = document.getElementById('btnShadowrocket');

function gen(){
  const origin = inputEl.value.trim();
  if(!origin){alert('请粘贴订阅链接');return;}
  const params = new URLSearchParams();
  params.set("src", origin);
  finalUrl = location.origin + "/filter?" + params.toString();
  outEl.innerText = finalUrl;
  copyBtn.disabled = false;
  btnQX.disabled = false;
  btnSR.disabled = false;
}

async function copyLink(){
  try{
    await navigator.clipboard.writeText(finalUrl);
    alert("复制成功！");
  }catch(err){
    alert("复制失败，请手动选中复制");
  }
}

function clearAll(){
  inputEl.value = '';
  outEl.innerText = '';
  finalUrl = "";
  copyBtn.disabled = true;
  btnQX.disabled = true;
  btnSR.disabled = true;
}

//一键导入圈X
function openQX(){
  window.location.href = `quantumult-x:///import-subscription?url=${encodeURIComponent(finalUrl)}`;
}
//一键导入小火箭Shadowrocket
function openSR(){
  window.location.href = `shadowrocket://add/subscribe?url=${encodeURIComponent(finalUrl)}`;
}
</script>
</body>
</html>
      `, { headers: { "content-type": "text/html;charset=utf-8" } })
    }

    if (path === "/filter") {
      let src = url.searchParams.get("src");
      if (!src) return new Response("错误：缺少 src 参数", { status: 200 });
      if (!src.startsWith("http://") && !src.startsWith("https://")) {
        src = "https://" + src;
      }
      try {
        const res = await fetch(src,{redirect:"follow"});
        let text = await res.text();

        let decoded;
        try{
          decoded = Buffer.from(text, 'base64').toString('utf8');
        }catch(e){
          decoded = text;
        }

        const lines = decoded.split('\n').filter(line => line.includes(':443'));
        return new Response(lines.join('\n'), { headers: { "content-type": "text/plain;charset=utf-8" } })
      } catch (e) {
        return new Response("订阅拉取失败：" + e.message, { status: 500 })
      }
    }
    return new Response("404 Not Found", { status: 404 })
  }
}
