export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // 密码已设置为  66668888
    const PASSWORD = "66668888";

    if (url.pathname === `/${PASSWORD}`) {
      return new Response(`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>订阅过滤 - 仅保留443端口</title>
<style>
body{font-family:system-ui;padding:16px;max-width:700px;margin:0 auto;}
input{width:100%;box-sizing:border-box;padding:10px;font-size:16px;margin:8px 0;}
button{padding:10px 16px;font-size:16px;cursor:pointer;}
#result{margin-top:12px;white-space:pre-wrap;word-break:break-all;background:#f5f5f5;padding:10px;border-radius:6px;}
</style>
</head>
<body>
<h3>填入原始订阅链接</h3>
<input id="subUrl" placeholder="粘贴你的订阅链接">
<button onclick="gen()">生成过滤后的订阅地址</button>
<div id="result"></div>
<script>
async function gen(){
  const sub = document.getElementById('subUrl').value.trim();
  if(!sub){alert('请先粘贴订阅链接');return;}
  const res = await fetch('/filter?url='+encodeURIComponent(sub));
  const text = await res.text();
  document.getElementById('result').innerText = text;
}
</script>
</body>
</html>
`, { headers: { "content-type": "text/html;charset=utf-8" } });
    }

    if (url.pathname === "/filter") {
      const subUrl = url.searchParams.get("url");
      if (!subUrl) return new Response("错误：缺少 url 参数");
      try {
        const rawRes = await fetch(subUrl);
        const rawText = await rawRes.text();
        const lines = rawText.split('\n');
        const out = [];

        for (let line of lines) {
          line = line.trim();
          if (!line || line.startsWith('#') || line.startsWith('//')) continue;
          // 匹配链接里的端口 :数字?
          const portMatch = line.match(/:(\d+)\?/);
          if (portMatch && portMatch[1] === "443") {
            out.push(line);
          }
        }
        return new Response(out.join("\n"), {
          headers: {
            "content-type": "text/plain;charset=utf-8",
            "X‑Filter‑Count": String(out.length)
          }
        });
      } catch (e) {
        return new Response("处理失败：" + e.message);
      }
    }

    return new Response("服务正常，请访问 /" + PASSWORD);
  }
};
