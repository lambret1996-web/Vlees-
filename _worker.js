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
<title>443订阅过滤器 | 稳定版</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
  :root{
    --white: #ffffff;
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --card-bg: rgba(255, 255, 255, 0.97);
    --text-primary: #1e293b;
    --text-secondary: #475569;
    --blue-500: #3b82f6;
    --blue-600: #2563eb;
    --green-500: #10b981;
    --green-600: #059669;
    --amber-500: #f59e0b;
    --amber-600: #d97706;
    --slate-200: #e2e8f0;
    --slate-300: #cbd5e1;
    --radius: 20px;
    --shadow: 0 12px 32px rgba(15, 23, 42, 0.14);
    --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    color: var(--white);
    min-height: 100vh;
    padding: 20px;
    line-height: 1.6;
  }
  .container {
    max-width: 1000px;
    margin: 0 auto;
  }
  /* Header */
  .header {
    text-align: center;
    margin-bottom: 32px;
  }
  .header .logo {
    font-size: 42px;
    color: var(--blue-500);
    margin-bottom: 8px;
  }
  .header h1 {
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 8px;
    background: linear-gradient(to right, #60a5fa, #34d399);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .header .desc {
    color: #cbd5e1;
    font-size: 16px;
    max-width: 600px;
    margin: 0 auto 16px;
  }
  .tags {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .tag {
    background: rgba(59, 130, 246, 0.15);
    border: 1px solid rgba(59, 130, 246, 0.4);
    color: #93c5fd;
    padding: 6px 14px;
    border-radius: 50px;
    font-size: 13px;
    font-weight: 500;
  }
  .tag i {
    margin-right: 4px;
  }
  /* Main */
  .main {
    background: var(--card-bg);
    border-radius: var(--radius);
    padding: 28px;
    box-shadow: var(--shadow);
    margin-bottom: 24px;
  }
  .section-title {
    color: var(--text-primary);
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-title i {
    color: var(--blue-500);
  }
  /* Input */
  .input-wrapper {
    position: relative;
    margin-bottom: 22px;
  }
  .input-wrapper label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 8px;
  }
  .input-wrapper .input-with-icon {
    position: relative;
  }
  .input-wrapper input {
    width: 100%;
    padding: 16px 20px 16px 48px;
    border: 2px solid var(--slate-200);
    border-radius: 16px;
    font-size: 16px;
    background: white;
    transition: all 0.25s ease;
  }
  .input-wrapper input:focus {
    outline: none;
    border-color: var(--blue-500);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  }
  .input-wrapper .input-icon {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    font-size: 18px;
  }
  /* Buttons */
  .btn-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    margin-bottom: 28px;
  }
  .btn {
    border: none;
    border-radius: 14px;
    padding: 16px 20px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
  .btn-primary {
    background: linear-gradient(to right, var(--blue-500), var(--blue-600));
    color: white;
  }
  .btn-secondary {
    background: #475569;
    color: white;
  }
  .btn-success {
    background: linear-gradient(to right, var(--green-500), var(--green-600));
    color: white;
  }
  .btn-warning {
    background: linear-gradient(to right, var(--amber-500), var(--amber-600));
    color: white;
  }
  .btn-tertiary {
    background: #6366f1;
    color: white;
  }
  /* Output */
  .output-wrapper {
    margin-top: 8px;
    margin-bottom: 28px;
  }
  .output-box {
    background: #f8fafc;
    border: 2px dashed var(--slate-300);
    border-radius: 16px;
    padding: 18px;
    word-break: break-all;
    white-space: pre-wrap;
    font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
    font-size: 15px;
    line-height: 1.5;
    color: var(--text-primary);
    min-height: 80px;
    max-height: 200px;
    overflow-y: auto;
  }
  /* QR Code */
  .qr-section {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid var(--slate-200);
  }
  .qr-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .qr-placeholder {
    width: 200px;
    height: 200px;
    background: #f1f5f9;
    border
