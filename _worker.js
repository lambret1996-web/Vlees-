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
body{padding:24px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;max-width:720px;margin:0 auto;background:#f8f9fa}
h2{margin-top:0;margin-bottom:16px;color:#222}
#subInput{width:100%;padding:12px 14px;font-size:16px;border:1px solid #ddd;border-radius:8px;margin-bottom:14px}
.btn-group{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px}
button{padding:10px 16px;font-size:15px;border:none;border-radius:8px;cursor:pointer;background:#4088e8;color:#fff}
button:active{opacity:0.85}
#out{width:100%;padding:14px;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;white-space:pre-wrap;word-break:break-all;min-height:100px;font-size:14px;color:#333}
</style>
</head>
<body>
<h2>填入原始订阅链接</h2>
<input id="subInput" placeholder="粘贴订阅地址">
<div class="btn-group">
  <button onclick="gen()">生成过滤后的订阅地址</button>
  <button id="copyBtn" onclick="copyLink()" disabled>一键复制链接</button>
  <button onclick="clearAll()">一键清空</button>
</div>
<pre id="out"></pre>
<script>
let finalUrl = "";
const inputEl = document.getElementById('subInput');
const outEl = document.getElementById('out');
const copyBtn = document.getElementById('copyBtn');

function gen(){
  const origin = inputEl.value.trim();
  if(!origin){alert('请粘贴订阅链接');return;}
  const params = new URLSearchParams();
  params.set("src", origin);
  finalUrl = location.origin + "/filter?" + params.toString();
  outEl.innerText = finalUrl;
  copyBtn.disabled = false;
}

async function copyLink(){
  try{
    await navigator.clipboard.writeText(finalUrl);
    alert("复制成功！");
  }catch(err){
    alert("复制失败，请手动选中复制");
  }
}

//新增：一键清空
function clearAll(){
  inputEl.value = '';
  outEl.innerText = '';
  finalUrl = "";
  copyBtn.disabled = true;
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
