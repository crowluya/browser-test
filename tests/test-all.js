/**
 * 综合测试脚本
 * 运行所有 MCP 测试
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('MCP 服务器综合测试');
console.log('==================\n');

const tests = [
  { name: 'Chrome DevTools MCP', file: 'test-chrome-devtools.js' },
  { name: 'Puppeteer MCP', file: 'test-puppeteer.js' },
  { name: 'Playwright MCP', file: 'test-playwright.js' },
  { name: '登录持久化', file: 'test-login-persistence.js' }
];

let currentTest = 0;

function runNextTest() {
  if (currentTest >= tests.length) {
    console.log('\n所有测试完成！');
    console.log('\n下一步:');
    console.log('1. 按照 CLAUDE_CODE_SETUP.md 中的说明配置 Claude Code');
    console.log('2. 重启 Claude Code');
    console.log('3. 在 Claude Code 中测试 MCP 功能\n');
    return;
  }

  const test = tests[currentTest];
  console.log(`\n[${currentTest + 1}/${tests.length}] 运行测试: ${test.name}`);
  console.log('─'.repeat(50));

  const testProcess = spawn('node', [join(__dirname, test.file)], {
    stdio: 'inherit',
    shell: true
  });

  testProcess.on('close', (code) => {
    if (code === 0) {
      console.log(`\n✓ ${test.name} 测试完成\n`);
    } else {
      console.log(`\n⚠ ${test.name} 测试完成（退出码: ${code}）\n`);
    }
    currentTest++;
    setTimeout(runNextTest, 1000);
  });
}

runNextTest();

