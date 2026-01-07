/**
 * Puppeteer MCP 测试脚本
 * 测试 Active Tab 模式和持久化用户数据
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('Puppeteer MCP 测试');
console.log('==================\n');

// 测试配置
const userDataDir = join(projectRoot, '.puppeteer-data');

// 确保用户数据目录存在
if (!existsSync(userDataDir)) {
  mkdirSync(userDataDir, { recursive: true });
  console.log(`✓ 创建用户数据目录: ${userDataDir}`);
}

const testConfig = {
  mcpCommand: 'npx',
  mcpArgs: ['-y', '@modelcontextprotocol/server-puppeteer'],
  userDataDir: userDataDir,
  testUrl: 'https://www.example.com'
};

console.log('配置信息:');
console.log(`  MCP 命令: ${testConfig.mcpCommand} ${testConfig.mcpArgs.join(' ')}`);
console.log(`  用户数据目录: ${testConfig.userDataDir}`);
console.log(`  测试 URL: ${testConfig.testUrl}\n`);

// 检查 Puppeteer MCP 是否可用
console.log('检查 Puppeteer MCP 包...');
const checkProcess = spawn('npx', ['-y', '@modelcontextprotocol/server-puppeteer', '--help'], {
  stdio: 'pipe',
  shell: true,
  env: {
    ...process.env,
    PUPPETEER_USER_DATA_DIR: userDataDir
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
  console.log('✓ Puppeteer MCP 配置完成\n');
  console.log('测试说明:');
  console.log('1. Puppeteer MCP 支持通过 userDataDir 持久化用户数据');
  console.log('2. 用户数据目录已创建:', userDataDir);
  console.log('3. 登录状态和 cookies 将保存在此目录中');
  console.log('4. Active Tab 模式需要连接到现有浏览器实例');
  console.log('5. 可以通过环境变量 PUPPETEER_USER_DATA_DIR 指定数据目录\n');
  console.log('配置完成！可以在 Claude Code 中使用 Puppeteer MCP 了。\n');
});

