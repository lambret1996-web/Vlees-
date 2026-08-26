# 订阅端口过滤器 (Cloudflare Pages 版)

只做一件事：读取你的原始订阅链接，过滤后**只输出端口为 443 的节点**。

## 文件结构
```
sub-filter-pages/
├── _worker.js    # 核心代码（Pages Functions 入口，文件名不可改）
└── README.md     # 本说明
```

## 部署步骤

### 1. 准备 GitHub 仓库
1. 在 GitHub 新建一个公开或私有仓库
2. 把 `_worker.js` 上传到仓库根目录
3. 提交并推送

### 2. 接入 Cloudflare Pages
1. 登录 Cloudflare 控制台 → Workers & Pages → Create → Pages
2. 选择「Connect to Git」，授权并选中你刚创建的仓库
3. 构建设置：
   - **Framework preset**: 选 `None`
   - **Build command**: 留空（不填）
   - **Build output directory**: 留空（不填）
4. 点击「Save and Deploy」
5. 等待部署完成，得到你的 Pages 域名，例如：
   ```
   https://sub-filter-xxx.pages.dev
   ```

### 3. 修改密码（重要）
部署前先编辑 `_worker.js`，把第 13 行：
```js
const PASSWORD = "ABC123xyz";
```
改成你自己的随机字符串，防止别人滥用你的过滤服务。改完提交到 GitHub，Pages 会自动重新部署。

## 使用方法

### 方式一：通过管理面板生成
浏览器访问：
```
https://你的pages域名/你的密码
```
粘贴原始订阅链接，点击「生成过滤订阅」，复制得到的最终地址。

### 方式二：手动拼接
最终订阅地址格式：
```
https://你的pages域名/filter?url=你的原始订阅完整链接
```

把这条地址填入 NekoBox（或其他客户端）的订阅地址栏，更新订阅后就只会保留 443 端口的节点。

## 注意事项
- 本工具仅做端口过滤，不做测速、排序、规则覆写
- 原始订阅如果是 base64 编码格式，需要先确认订阅源返回的是纯文本节点列表
  
