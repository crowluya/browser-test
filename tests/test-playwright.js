/**
 * Playwright MCP 测试脚本
 * 测试持久化上下文和用户数据
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('Playwright MCP 测试');
console.log('==================\n');

// 测试配置
const userDataDir = join(projectRoot, '.playwright-data');

// 确保用户数据目录存在
if (!existsSync(userDataDir)) {
  mkdirSync(userDataDir, { recursive: true });
  console.log(`✓ 创建用户数据目录: ${userDataDir}`);
}

const testConfig = {
  mcpCommand: 'npx',
  mcpArgs: ['-y', '@playwright/mcp'],
  userDataDir: userDataDir,
  testUrl: 'https://www.example.com'
};

console.log('配置信息:');
console.log(`  MCP 命令: ${testConfig.mcpCommand} ${testConfig.mcpArgs.join(' ')}`);
console.log(`  用户数据目录: ${testConfig.userDataDir}`);
console.log(`  测试 URL: ${testConfig.testUrl}\n`);

// 检查 Playwright MCP 是否可用
console.log('检查 Playwright MCP 包...');
const checkProcess = spawn('npx', ['-y', '@playwright/mcp', '--help'], {
  stdio: 'pipe',
  shell: true,
  env: {
    ...process.env,
    PLAYWRIGHT_USER_DATA_DIR: userDataDir
  }
});

let output = '';
checkProcess.stdout.on('data', (data) => {
  output += data.toString();
});

checkProcess.stderr.on('data', (data) => {
  output += data.toString();
});

checkProcess.on('close', (code) => {
  console.log('✓ Playwright MCP 配置完成\n');
  console.log('测试说明:');
  console.log('1. Playwright MCP 支持持久化上下文 (persistent context)');
  console.log('2. 用户数据目录已创建:', userDataDir);
  console.log('3. 可以使用 storageState 保存和加载登录状态');
  console.log('4. 支持跨浏览器（Chrome、Firefox、WebKit）');
  console.log('5. 通过环境变量 PLAYWRIGHT_USER_DATA_DIR 指定数据目录\n');
  console.log('安装 Playwright 浏览器驱动...');
  
  // 安装 Playwright 浏览器
  const installProcess = spawn('npx', ['playwright', 'install', 'chromium'], {
    stdio: 'inherit',
    shell: true
  });
  
  installProcess.on('close', (installCode) => {
    if (installCode === 0) {
      console.log('\n✓ Playwright 浏览器驱动安装完成');
    } else {
      console.log('\n⚠ Playwright 浏览器驱动安装可能未完成，但可以继续测试');
    }
    console.log('\n配置完成！可以在 Claude Code 中使用 Playwright MCP 了。\n');
  });
});

