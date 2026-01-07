# Claude Code MCP 配置指南

本指南说明如何将三个 MCP 服务器配置到 Claude Code 中。

## 配置文件位置

Claude Code 的 MCP 配置文件位置取决于您的操作系统：

- **Windows**: `%APPDATA%\Claude\mcp.json` 或 `C:\Users\<用户名>\AppData\Roaming\Claude\mcp.json`
- **macOS**: `~/Library/Application Support/Claude/mcp.json`
- **Linux**: `~/.config/claude/mcp.json`

## 配置步骤

### 方法 1: 直接复制配置文件

1. 打开项目中的 `.mcp-config/mcp.json` 文件
2. 复制其内容
3. 在 Claude Code 配置目录中创建或编辑 `mcp.json` 文件
4. 将内容粘贴进去并保存

### 方法 2: 使用符号链接（推荐）

在 Windows PowerShell（以管理员身份运行）中：

```powershell
# 创建 Claude 配置目录（如果不存在）
New-Item -ItemType Directory -Force -Path "$env:APPDATA\Claude"

# 创建符号链接
New-Item -ItemType SymbolicLink -Path "$env:APPDATA\Claude\mcp.json" -Target "$PWD\.mcp-config\mcp.json"
```

在 macOS/Linux 中：

```bash
# 创建 Claude 配置目录（如果不存在）
mkdir -p ~/.config/claude  # Linux
# 或
mkdir -p ~/Library/Application\ Support/Claude  # macOS

# 创建符号链接
ln -s "$(pwd)/.mcp-config/mcp.json" ~/.config/claude/mcp.json  # Linux
# 或
ln -s "$(pwd)/.mcp-config/mcp.json" ~/Library/Application\ Support/Claude/mcp.json  # macOS
```

### 方法 3: 手动编辑

1. 找到 Claude Code 的配置目录（见上方路径）
2. 创建或编辑 `mcp.json` 文件
3. 将以下内容复制进去：

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest"]
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"],
      "env": {
        "PUPPETEER_USER_DATA_DIR": "D:\\seocode\\tmp\\test-chrome-mcp\\.puppeteer-data"
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"],
      "env": {
        "PLAYWRIGHT_USER_DATA_DIR": "D:\\seocode\\tmp\\test-chrome-mcp\\.playwright-data"
      }
    }
  }
}
```

**注意**: 请将路径中的 `D:\\seocode\\tmp\\test-chrome-mcp` 替换为您的实际项目路径。

## 验证配置

配置完成后，重启 Claude Code，然后：

1. 打开 Claude Code
2. 检查 MCP 服务器是否已加载
3. 尝试使用自然语言指令测试 MCP 功能

## 测试指令示例

在 Claude Code 中尝试以下指令：

- **Chrome DevTools MCP**: "检查 https://www.example.com 的性能"
- **Puppeteer MCP**: "使用 Puppeteer 打开 https://www.example.com 并截图"
- **Playwright MCP**: "使用 Playwright 访问 https://www.example.com 并获取页面标题"

## 故障排除

### MCP 服务器无法启动

1. 确保 Node.js 已正确安装
2. 检查网络连接（需要下载 npm 包）
3. 查看 Claude Code 的日志文件

### 路径问题

如果遇到路径相关错误：
1. 确保使用绝对路径
2. Windows 路径使用双反斜杠 `\\` 或正斜杠 `/`
3. 确保用户数据目录有写入权限

### 浏览器连接问题

- **Chrome DevTools MCP**: 确保 Chrome 浏览器已启动，或使用 `--remote-debugging-port=9222` 启动 Chrome
- **Puppeteer/Playwright**: 确保有足够的磁盘空间用于用户数据目录

