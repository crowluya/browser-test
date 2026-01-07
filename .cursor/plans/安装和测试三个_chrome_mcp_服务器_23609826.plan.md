---
name: 安装和测试三个 Chrome MCP 服务器
overview: 安装并配置 Chrome DevTools MCP、Puppeteer MCP 和 Playwright MCP 三个浏览器自动化 MCP 服务器，确保稳定性、持久化登录状态，并在 Claude Code 中进行测试验证。
todos:
  - id: env-check
    content: 检查系统环境（Node.js 版本、Chrome 安装、npm/npx 可用性）
    status: completed
  - id: project-setup
    content: 创建项目目录结构和基础配置文件（package.json、README.md）
    status: completed
    dependencies:
      - env-check
  - id: install-chrome-devtools
    content: 安装 Chrome DevTools MCP 并配置连接现有浏览器实例
    status: completed
    dependencies:
      - project-setup
  - id: install-puppeteer
    content: 安装 Puppeteer MCP 并配置 Active Tab 模式和持久化用户数据目录
    status: completed
    dependencies:
      - project-setup
  - id: install-playwright
    content: 安装 Playwright MCP 并配置持久化上下文（userDataDir 和 storageState）
    status: completed
    dependencies:
      - project-setup
  - id: configure-claude-code
    content: 配置 Claude Code 的 MCP 设置文件，添加三个服务器配置
    status: completed
    dependencies:
      - install-chrome-devtools
      - install-puppeteer
      - install-playwright
  - id: create-test-scripts
    content: 创建测试脚本验证每个 MCP 的基础功能、登录持久化和长时间运行
    status: completed
    dependencies:
      - configure-claude-code
  - id: run-tests
    content: 执行测试脚本，验证三个 MCP 的功能和稳定性
    status: completed
    dependencies:
      - create-test-scripts
  - id: test-claude-integration
    content: 在 Claude Code 中测试 MCP 集成，验证自然语言指令执行
    status: completed
    dependencies:
      - run-tests
---

# 安装

和测试三个 Chrome MCP 服务器计划

## 目标

安装并配置三个浏览器 MCP 服务器，满足以下要求：

- 稳定性：确保 MCP 服务器能稳定运行
- 长时间使用：避免上下文溢出问题
- 保持登录状态：支持持久化会话和用户数据

## 环境准备

### 1. 检查系统要求

- 验证 Node.js 版本（建议 18.19.0+）
- 确认 Chrome 浏览器已安装
- 检查 npm/npx 可用性

### 2. 创建项目结构

- 创建项目目录结构
- 初始化 package.json（如需要）
- 创建配置文件目录

## MCP 服务器安装和配置

### 1. Chrome DevTools MCP

**特点**：连接现有浏览器实例，复用已登录会话**安装步骤**：

- 使用 `npx chrome-devtools-mcp@latest` 安装
- 配置 Claude Code MCP 设置
- 验证连接现有 Chrome 实例的能力

**配置文件位置**：Claude Code 的 MCP 配置文件（通常为 `~/.config/claude/mcp.json` 或项目级配置）

### 2. Puppeteer MCP

**特点**：基于 Puppeteer，支持 Active Tab 模式**安装步骤**：

- 安装 `@modelcontextprotocol/server-puppeteer`
- 配置 Active Tab 模式（连接现有浏览器）
- 设置用户数据目录以保持登录状态

**持久化配置**：

- 配置 `userDataDir` 参数
- 使用 `storageState` 保存会话状态

### 3. Playwright MCP

**特点**：跨浏览器支持，内置持久化上下文功能**安装步骤**：

- 安装 `@modelcontextprotocol/server-playwright`
- 运行 `npx playwright install` 安装浏览器驱动
- 配置持久化上下文（persistent context）

**持久化配置**：

- 使用 `userDataDir` 保存用户数据
- 使用 `storageState` 保存和加载登录状态
- 配置浏览器上下文选项

## 配置文件结构

创建统一的 MCP 配置文件，包含三个服务器的配置：

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
        "PUPPETEER_USER_DATA_DIR": "./.puppeteer-data"
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-playwright"],
      "env": {
        "PLAYWRIGHT_USER_DATA_DIR": "./.playwright-data"
      }
    }
  }
}
```



## 测试方案

### 1. 基础功能测试

- 测试每个 MCP 服务器是否能正常启动
- 验证浏览器连接功能
- 测试基本的页面导航和截图功能

### 2. 登录状态持久化测试

- 使用测试网站（如 GitHub、Google）进行登录
- 关闭并重启 MCP 服务器
- 验证登录状态是否保持

### 3. 长时间运行测试

- 运行多个自动化任务
- 监控上下文使用情况
- 验证稳定性

### 4. Claude Code 集成测试

- 在 Claude Code 中调用各个 MCP 工具
- 测试自然语言指令执行
- 验证响应速度和准确性

## 文件结构

```javascript
test-chrome-mcp/
├── .mcp-config/          # MCP 配置文件
│   └── mcp.json
├── .puppeteer-data/      # Puppeteer 用户数据目录
├── .playwright-data/     # Playwright 用户数据目录
├── tests/                # 测试脚本
│   ├── test-chrome-devtools.js
│   ├── test-puppeteer.js
│   └── test-playwright.js
├── package.json
└── README.md
```



## 实施步骤

1. **环境检查**：验证 Node.js、Chrome 等依赖
2. **项目初始化**：创建目录结构和配置文件
3. **安装 MCP 服务器**：依次安装三个 MCP 包
4. **配置持久化**：设置用户数据目录和存储状态
5. **配置 Claude Code**：添加 MCP 服务器配置
6. **编写测试脚本**：创建自动化测试脚本
7. **执行测试**：运行各项测试验证功能
8. **文档记录**：记录配置和测试结果

## 注意事项

- Windows 路径处理：确保路径格式正确