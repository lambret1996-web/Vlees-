export default {
  async fetch(request, env, ctx) {
    const PASSWORD = "";
    const url = new URL(request.url);
    const path = url.pathname;

    // 纯手写Base64解码，不依赖运行时API
    function base64Decode(input) {
      try {
        const key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        input = String(input).replace(/[^A-Za-z0-9\+\/]/g, "");
        let output = "";
        let i = 0;
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        while (i < input.length) {
          enc1 = key.indexOf(input.charAt(i++));
          enc2 = key.indexOf(input.charAt(i++));
          enc3 = key.indexOf(input.charAt(i++));
          enc4 = key.indexOf(input.charAt(i++));
          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;
          output = output + String.fromCharCode(chr1);
          if (enc3 !== 64) output += String.fromCharCode(chr2);
          if (enc4 !== 64) output += String.fromCharCode(chr3);
        }
        return output;
      } catch (e) {
        return input;
      }
    }

    if (path === `/${PASSWORD}` || path === "/") {
      return new Response(`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial‑scale=1.0">
<title>443端口订阅过滤器</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{
  min-height:100vh;
  background:linear-gradient(135deg,#141e30,#243b55);
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  padding:28px 16px;
  color:#fff;
}
.container{
  max-width:640px;
  margin:0 auto;
}
.card{
  background:rgba(255,255,255,0.08);
  backdrop-filter:blur(12px);
  border-radius:20px;
  padding:28px;
  border:1px solid rgba(255,255,255,0.12);
  box-shadow:0 8px 32px rgba(0,0,0,0.25);
}
.title{
  font-size:22px;
  text-align:center;
  margin-bottom:24px;
  font-weight:600;
  letter-spacing:1px;
}
.desc{
  font-size:14px;
  color:#b8c2cc;
  text-align:center;
  margin-bottom:20px;
}
#subInput{
  width:100%;
  background:rgba(255,255,255,0.1);
  border:1px solid rgba(255,255,255,0.18);
  border-radius:12px;
  padding:16px;
  color:#fff;
  font-size:15px;
  outline:none;
  transition:.25s;
}
#subInput:focus{
  border-color:#409eff;
  box-shadow:0 0 0 3px rgba(64,158,255,0.2);
}
#subInput::placeholder{color:#909fa8}
.btn-group-top{
  display:grid;
  grid-template-columns:2fr 1fr;
  gap:10px;
  margin:16px 0;
}
.btn-group-bottom{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;
  margin-bottom:20px;
}
button{
  padding:14px 10px;
  border-radius:12px;
  border:none;
  font-size:15px;
  font-weight:500;
  cursor:pointer;
  transition:all .2s ease;
}
button:disabled{
  opacity:0.35;
  cursor:not-allowed;
  transform:none !important;
}
.btn-main{
  background:linear-gradient(90deg,#3671e9,#409eff);
  color:#fff;
}
.btn-main:active{transform:scale(0.97)}
.btn-copy{
  background:#27ae60;
  color:#fff;
}
.btn-copy:active{transform:scale(0.97)}
.btn-qx{
  background:#9b59b6;
  color:#fff;
}
.btn-qx:active{transform:scale(0.97)}
.btn-sr{
  background:#e67e22;
  color:#fff;
}
.btn-sr:active{transform:scale(0.97)}
.btn-clear{
  width:100%;
  background:rgba(255,255,255,0.12);
  color:#dee2e6;
  margin-bottom:18px;
}
#out{
  width:100%;
  min-height:130px;
  background:rgba(0,0,0,0.25);
  border-radius:12px;
  padding:16px;
  white-space:pre-wrap;
  word-break:break-all;
  font-size:14px;
  color:#a5d6ff;
  border:1px solid rgba(255,255,255,0.1);
}
.tip{
  margin-top:12px;
  font-size:13px;
  color:#8798a7;
  text-align:center;
}
</style>
</head>
<body>
<div class="container">
  <div class="card">
    <h2 class="title">443端口订阅过滤器</h2>
    <div class="desc">过滤订阅，仅保留 :443 节点，一键导入小火箭 / 圈X</div>
    <input id="subInput" placeholder="粘贴你的原始订阅链接">

    <div class="btn-group-top">
      <button class="btn-main" onclick="gen()">生成过滤订阅链接</button>
      <button class="btn-copy" id="copyBtn" onclick="copyLink()" disabled>复制链接</button>
    </div>

    <div class="btn-group-bottom">
      <button class="btn-qx" id="btnQuantumultX" onclick="openQX()" disabled>导入圈X</button>
      <button class="btn-sr" id="btnShadowrocket" onclick="openSR()" disabled>导入小火箭</button>
    </div>

    <button class="btn-clear" onclick="clearAll()">清空全部内容</button>

    <pre id="out"></pre>
    <div class="tip">先粘贴订阅并生成链接，导入按钮才会激活</div>
  </div>
</div>

<script>
let finalUrl = "";
const inputEl = document.getElementById('subInput');
const outEl = document.getElementById('out');
const copyBtn = document.getElementById('copyBtn');
const btnQX = document.getElementById('btnQuantumultX');
const btnSR = document.getElementById('btnShadowrocket');

function gen(){
  const origin = inputEl.value.trim();
  if(!origin){alert('请先粘贴订阅链接');return;}
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
    alert("✅ 链接复制成功");
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

function openQX(){
  window.location.href = `quantumult-x:///import-subscription?url=${encodeURIComponent(finalUrl)}`;
}
function openSR(){
  window.location.href = `shadowrocket://add/subscribe?url=${encodeURIComponent(finalUrl)}`;
}
</script>
  </div>
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
        let decoded = base64Decode(text);
        const lines = decoded.split('\n').filter(line => line.includes(':443'));
        return new Response(lines.join('\n'), { headers: { "content-type": "text/plain;charset=utf-8" } })
      } catch (e) {
        return new Response("订阅拉取失败：" + e.message, { status: 500 })
      }
    }
    return new Response("404 Not Found", { status: 404 })
  }
}
