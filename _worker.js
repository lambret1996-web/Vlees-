export default {
  async fetch(request, env, ctx) {
    const PASSWORD = "66668888";
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === `/${PASSWORD}`) {
      return new Response(`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial‑scale=1.0">
<title>443订阅过滤器</title>
<style>
body{padding:20px;font-family:system-ui}
input{width:100%;padding:10px;margin:10px 0;box-sizing:border-box}
button{padding:10px 16px;font-size:16px;margin:4px 2px}
pre{margin-top:12px;white‑space:pre‑wrap;background:#f4f4f4;padding:12px;border‑radius:6px;word‑break:break‑all}
</style>
</head>
<body>
<h2>填入原始订阅链接</h2>
<input id="subInput" placeholder="粘贴订阅地址">
<div>
<button onclick="gen()">生成过滤后的订阅地址</button>
<button id="copyBtn" onclick="copyLink()" disabled>一键复制链接</button>
</div>
<pre id="out"></pre>
<script>
let finalUrl = "";
function gen(){
  const origin = document.getElementById('subInput').value.trim();
  if(!origin){alert('请粘贴订阅链接');return;}
  finalUrl = location.origin+'/filter?src='+encodeURIComponent(origin);
  document.getElementById('out').innerText = finalUrl;
  document.getElementById('copyBtn').disabled = false;
}
async function copyLink(){
  try{
    await navigator.clipboard.writeText(finalUrl);
    alert("复制成功！");
  }catch(err){
    alert("复制失败，请手动选中复制");
  }
}
</script>
</body>
</html>
      `, { headers: { "content-type": "text/html;charset=utf-8" } })
    }

    if (path === "/filter") {
      const src = url.searchParams.get("src");
      if (!src) return new Response("错误：缺少 src 参数", { status: 200 });
      try {
        const res = await fetch(src);
        let text = await res.text();
        const lines = text.split('\n').filter(line => line.includes(':443'));
        return new Response(lines.join('\n'), { headers: { "content-type": "text/plain;charset=utf-8" } })
      } catch (e) {
        return new Response("订阅拉取失败：" + e.message, { status: 500 })
      }
    }
    return new Response("404 Not Found", { status: 404 })
  }
}
