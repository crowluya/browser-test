# Chrome MCP 服务器测试项目

本项目用于安装、配置和测试三个浏览器自动化 MCP 服务器：

1. **Chrome DevTools MCP** - 连接现有浏览器实例
2. **Puppeteer MCP** - 基于 Puppeteer 的自动化
3. **Playwright MCP** - 跨浏览器自动化，支持持久化上下文

## 特性

- ✅ 稳定性：确保 MCP 服务器能稳定运行
- ✅ 长时间使用：避免上下文溢出问题
- ✅ 保持登录状态：支持持久化会话和用户数据

## 环境要求

- Node.js 18.19.0 或更高版本
- Google Chrome 浏览器
- npm/npx

## 安装

### 1. 安装 MCP 服务器

项目使用 npx 直接运行 MCP 服务器，无需全局安装。

### 2. 配置 Claude Code

MCP 配置文件位于 `.mcp-config/mcp.json`，需要将其配置到 Claude Code 的 MCP 设置中。

对于 Claude Code，配置文件通常位于：
- Windows: `%APPDATA%\Claude\mcp.json` 或项目级配置
- macOS: `~/Library/Application Support/Claude/mcp.json`
- Linux: `~/.config/claude/mcp.json`

## 使用

### 测试脚本

```bash
# 测试 Chrome DevTools MCP
npm run test:chrome-devtools

# 测试 Puppeteer MCP
npm run test:puppeteer

# 测试 Playwright MCP
npm run test:playwright

# 测试所有 MCP
npm run test:all
```

## 目录结构

```
test-chrome-mcp/
├── .mcp-config/          # MCP 配置文件
│   └── mcp.json
├── .puppeteer-data/      # Puppeteer 用户数据目录（自动创建）
├── .playwright-data/     # Playwright 用户数据目录（自动创建）
├── tests/                # 测试脚本
│   ├── test-chrome-devtools.js
│   ├── test-puppeteer.js
│   └── test-playwright.js
├── package.json
└── README.md
```

## 注意事项

- Windows 路径处理：确保路径格式正确
- 权限问题：确保有权限创建用户数据目录
- 端口冲突：检查是否有端口占用
- 浏览器版本：确保 Chrome 版本兼容

