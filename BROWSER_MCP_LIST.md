# Claude Code 浏览器操作 MCP 列表

本文档列出了 Claude Code 中可用的浏览器自动化 MCP（Model Context Protocol）服务器。

## 主要浏览器 MCP 服务器

### 1. Chrome DevTools MCP
**包名**: `chrome-devtools-mcp`  
**官方**: Google LLC  
**特点**:
- 连接现有 Chrome 浏览器实例
- 通过 Chrome DevTools Protocol (CDP) 控制浏览器
- 复用已登录的浏览器会话
- 支持性能分析、网络监控、页面调试

**安装配置**:
```json
{
  "chrome-devtools": {
    "command": "npx",
    "args": ["chrome-devtools-mcp@latest"]
  }
}
```

**使用场景**:
- 前端调试和性能分析
- 连接已打开的 Chrome 浏览器
- 保持现有登录状态
- 网络请求监控

---

### 2. Puppeteer MCP
**包名**: `@modelcontextprotocol/server-puppeteer`  
**官方**: Model Context Protocol  
**特点**:
- 基于 Puppeteer 库
- 无头浏览器自动化
- 支持持久化用户数据目录
- 支持 Active Tab 模式（连接现有浏览器）

**安装配置**:
```json
{
  "puppeteer": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-puppeteer"],
    "env": {
      "PUPPETEER_USER_DATA_DIR": "./.puppeteer-data"
    }
  }
}
```

**使用场景**:
- 网页截图和 PDF 生成
- 表单自动填写
- 数据抓取和爬虫
- 自动化测试

---

### 3. Playwright MCP
**包名**: `@playwright/mcp`  
**官方**: Microsoft Playwright  
**特点**:
- 跨浏览器支持（Chrome、Firefox、WebKit）
- 持久化上下文（persistent context）
- 支持 storageState 保存登录状态
- 强大的选择器和等待机制

**安装配置**:
```json
{
  "playwright": {
    "command": "npx",
    "args": ["-y", "@playwright/mcp"],
    "env": {
      "PLAYWRIGHT_USER_DATA_DIR": "./.playwright-data"
    }
  }
}
```

**使用场景**:
- 跨浏览器测试
- 复杂交互自动化
- 多标签页管理
- E2E 测试

---

## 其他可用的浏览器 MCP 服务器

### 4. Cursor Browser Extension MCP
**特点**: 
- 集成在 Cursor IDE 中的浏览器扩展
- 提供浏览器快照、导航、点击等基础操作
- 支持表单填写和元素交互

**说明**: 这是 Cursor IDE 内置的浏览器 MCP，无需额外配置。

---

### 5. 社区浏览器 MCP 服务器

以下是一些社区维护的浏览器 MCP 服务器（可根据需要选择）：

#### @executeautomation/playwright-mcp-server
- 增强的 Playwright MCP 实现
- 包含额外的测试工具

#### fetcher-mcp
- 专注于网页内容提取
- 使用 Playwright 进行内容抓取
- 支持 Readability 内容提取

#### better-playwright-mcp
- 内置 HTTP 服务器的 Playwright MCP
- 提供 Web UI 界面

#### playwright-mcp-advanced
- 高级 Playwright 工具集
- 扩展的自动化功能

---

## 功能对比表

| 特性 | Chrome DevTools | Puppeteer | Playwright |
|------|----------------|-----------|------------|
| **浏览器支持** | Chrome 仅 | Chromium | Chrome, Firefox, WebKit |
| **连接现有浏览器** | ✅ 是 | ⚠️ 可选 | ❌ 否 |
| **持久化登录** | ✅ 通过现有会话 | ✅ userDataDir | ✅ persistent context |
| **无头模式** | ❌ 否 | ✅ 是 | ✅ 是 |
| **跨浏览器** | ❌ 否 | ❌ 否 | ✅ 是 |
| **性能分析** | ✅ 是 | ❌ 否 | ❌ 否 |
| **网络监控** | ✅ 是 | ⚠️ 有限 | ⚠️ 有限 |
| **截图/PDF** | ⚠️ 有限 | ✅ 是 | ✅ 是 |
| **多标签页** | ✅ 是 | ⚠️ 有限 | ✅ 是 |

---

## 推荐使用场景

### 选择 Chrome DevTools MCP 当：
- 需要连接已打开的 Chrome 浏览器
- 需要性能分析和调试
- 需要复用现有登录状态
- 主要使用 Chrome 浏览器

### 选择 Puppeteer MCP 当：
- 需要简单的浏览器自动化
- 需要生成截图或 PDF
- 只需要 Chromium 浏览器
- 需要轻量级解决方案

### 选择 Playwright MCP 当：
- 需要跨浏览器测试
- 需要复杂的交互自动化
- 需要持久化登录状态
- 需要企业级稳定性

---

## 安装和配置

### 快速安装

1. **创建 MCP 配置文件**
   - Windows: `%APPDATA%\Claude\mcp.json`
   - macOS: `~/Library/Application Support/Claude/mcp.json`
   - Linux: `~/.config/claude/mcp.json`

2. **添加配置**
   参考本项目中 `.mcp-config/mcp.json` 的配置示例

3. **重启 Claude Code**
   配置生效需要重启 Claude Code

### 验证安装

在 Claude Code 中尝试以下指令：
- "使用 Chrome DevTools 检查页面性能"
- "使用 Puppeteer 打开网页并截图"
- "使用 Playwright 访问网站并获取标题"

---

## 注意事项

1. **路径配置**: Windows 系统需要使用绝对路径或正确的路径格式
2. **权限问题**: 确保用户数据目录有写入权限
3. **端口冲突**: Chrome DevTools MCP 需要确保调试端口可用
4. **网络连接**: 首次运行需要下载 npm 包，确保网络畅通
5. **浏览器版本**: 确保浏览器版本与 MCP 服务器兼容

---

## 相关资源

- [Chrome DevTools MCP GitHub](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Puppeteer MCP 文档](https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer)
- [Playwright MCP 文档](https://playwright.dev/)
- [MCP 协议规范](https://modelcontextprotocol.io/)

---

**最后更新**: 2026-01-07

