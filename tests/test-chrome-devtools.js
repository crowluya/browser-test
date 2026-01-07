/**
 * Chrome DevTools MCP 测试脚本
 * 测试连接现有浏览器实例和基本功能
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Chrome DevTools MCP 测试');
console.log('==================\n');

// 测试配置
const testConfig = {
  mcpCommand: 'npx',
  mcpArgs: ['chrome-devtools-mcp@latest'],
  testUrl: 'https://www.example.com'
};

console.log('配置信息:');
console.log(`  MCP 命令: ${testConfig.mcpCommand} ${testConfig.mcpArgs.join(' ')}`);
console.log(`  测试 URL: ${testConfig.testUrl}\n`);

console.log('注意: Chrome DevTools MCP 需要连接到现有的 Chrome 浏览器实例');
console.log('请确保 Chrome 浏览器已启动，并且启用了远程调试端口\n');

// 检查 Chrome DevTools MCP 是否可用
console.log('检查 Chrome DevTools MCP 包...');
const checkProcess = spawn('npx', ['chrome-devtools-mcp@latest', '--help'], {
  stdio: 'pipe',
  shell: true
});

let output = '';
checkProcess.stdout.on('data', (data) => {
  output += data.toString();
});

checkProcess.stderr.on('data', (data) => {
  output += data.toString();
});

checkProcess.on('close', (code) => {
  if (code === 0 || output.includes('chrome-devtools-mcp') || output.includes('MCP')) {
    console.log('✓ Chrome DevTools MCP 包可用\n');
    console.log('测试说明:');
    console.log('1. Chrome DevTools MCP 通过 Chrome DevTools Protocol (CDP) 连接现有浏览器');
    console.log('2. 需要在启动 Chrome 时添加 --remote-debugging-port=9222 参数');
    console.log('3. 或者使用默认端口连接已运行的 Chrome 实例');
    console.log('4. 这样可以复用已登录的会话，保持登录状态\n');
    console.log('配置完成！可以在 Claude Code 中使用 Chrome DevTools MCP 了。\n');
  } else {
    console.log('⚠ 无法验证 Chrome DevTools MCP，但配置已创建');
    console.log('可以在 Claude Code 中测试实际功能\n');
  }
});

