# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a testing and configuration environment for three browser automation MCP (Model Context Protocol) servers used with Claude Code:

1. **Chrome DevTools MCP** (`chrome-devtools-mcp@latest`) - Connects to existing Chrome browser instances via Chrome DevTools Protocol
2. **Puppeteer MCP** (`@modelcontextprotocol/server-puppeteer`) - Headless Chrome automation with persistent user data
3. **Playwright MCP** (`@playwright/mcp`) - Cross-browser automation (Chrome, Firefox, WebKit) with persistent contexts

The project focuses on testing login/session persistence, long-running stability, and avoiding context overflow when using browser automation through Claude Code.

## Available Commands

```bash
# Test individual MCP servers
npm run test:chrome-devtools    # Test Chrome DevTools MCP connectivity
npm run test:puppeteer          # Test Puppeteer MCP functionality
npm run test:playwright         # Test Playwright MCP functionality
npm run test:login              # Test login persistence across all servers
npm run test:all                # Run all tests sequentially
```

## MCP Configuration

MCP servers are configured in `.mcp-config/`. Two variants are available:
- `mcp.json` - Uses relative paths (`./.puppeteer-data`), resolved from the working directory where Claude Code runs
- `mcp-windows.json` - Uses absolute paths (`D:\\seocode\\tmp\\test-chrome-mcp\\.puppeteer-data`), more reliable on Windows

To use these servers in Claude Code, copy the appropriate configuration to:

- **Windows**: `%APPDATA%\Claude\mcp.json`
- **macOS**: `~/Library/Application Support/Claude/mcp.json`
- **Linux**: `~/.config/claude/mcp.json`

The configuration uses `npx` to run servers without global installation. Relative paths in `env` variables (like `PUPPETEER_USER_DATA_DIR`) are resolved from the working directory where Claude Code is run.

## Architecture

### Persistent User Data

- **Puppeteer**: Uses `PUPPETEER_USER_DATA_DIR` environment variable pointing to `.puppeteer-data/`
- **Playwright**: Uses `PLAYWRIGHT_USER_DATA_DIR` environment variable pointing to `.playwright-data/`
- **Chrome DevTools**: Reuses existing browser sessions; requires Chrome launched with `--remote-debugging-port=9222`

### Test Scripts

All test scripts are ES modules located in `tests/`:
- `test-chrome-devtools.js` - Verifies CDP connectivity and package availability
- `test-puppeteer.js` - Tests Puppeteer MCP browser automation
- `test-playwright.js` - Tests Playwright MCP with multiple browsers
- `test-login-persistence.js` - Validates that user data directories are properly configured for session persistence
- `test-all.js` - Sequential runner for all tests

### Key Differences Between MCP Servers

| Feature | Chrome DevTools | Puppeteer | Playwright |
|---------|----------------|-----------|------------|
| Browser | Existing Chrome only | Chromium (bundled) | Chrome, Firefox, WebKit |
| Session Persistence | Via existing browser | userDataDir | persistent context |
| Requires active browser | Yes | No | No |
| Multi-browser | No | No | Yes |

## Important Notes

- This project uses ES modules (`"type": "module"` in package.json)
- All MCP servers run via `npx` - no runtime dependencies are installed in node_modules
- Windows-specific path handling is handled by using forward slashes or double backslashes in JSON config
- The `.puppeteer-data/` and `.playwright-data/` directories are created automatically on first use
- `test-login-persistence.js` does not actually perform login actions - it only verifies the directory structure is correctly configured for persistence
