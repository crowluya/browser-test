/**
 * 登录持久化测试脚本
 * 测试三个 MCP 服务器是否能保持登录状态
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, readdirSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('登录持久化测试');
console.log('================\n');

// 检查用户数据目录
const puppeteerDataDir = join(projectRoot, '.puppeteer-data');
const playwrightDataDir = join(projectRoot, '.playwright-data');

console.log('检查用户数据目录...\n');

// Puppeteer 数据目录检查
if (existsSync(puppeteerDataDir)) {
  console.log('✓ Puppeteer 用户数据目录存在:', puppeteerDataDir);
  try {
    const files = readdirSync(puppeteerDataDir);
    if (files.length > 0) {
      console.log(`  包含 ${files.length} 个文件/目录`);
      console.log('  登录状态数据将保存在此目录中');
    } else {
      console.log('  目录为空（首次使用）');
    }
  } catch (err) {
    console.log('  无法读取目录内容');
  }
} else {
  console.log('⚠ Puppeteer 用户数据目录不存在（将在首次使用时创建）');
}

console.log('');

// Playwright 数据目录检查
if (existsSync(playwrightDataDir)) {
  console.log('✓ Playwright 用户数据目录存在:', playwrightDataDir);
  try {
    const files = readdirSync(playwrightDataDir);
    if (files.length > 0) {
      console.log(`  包含 ${files.length} 个文件/目录`);
      console.log('  登录状态数据将保存在此目录中');
    } else {
      console.log('  目录为空（首次使用）');
    }
  } catch (err) {
    console.log('  无法读取目录内容');
  }
} else {
  console.log('⚠ Playwright 用户数据目录不存在（将在首次使用时创建）');
}

console.log('\n持久化配置说明:');
console.log('================\n');

console.log('1. Chrome DevTools MCP:');
console.log('   - 连接现有浏览器实例，自动复用已登录会话');
console.log('   - 无需额外配置，登录状态由 Chrome 浏览器管理');
console.log('   - 建议启动 Chrome 时使用: chrome --remote-debugging-port=9222\n');

console.log('2. Puppeteer MCP:');
console.log('   - 使用 userDataDir 持久化用户数据');
console.log('   - 环境变量: PUPPETEER_USER_DATA_DIR');
console.log('   - 数据目录:', puppeteerDataDir);
console.log('   - Cookies、LocalStorage 等将自动保存\n');

console.log('3. Playwright MCP:');
console.log('   - 支持持久化上下文 (persistent context)');
console.log('   - 环境变量: PLAYWRIGHT_USER_DATA_DIR');
console.log('   - 数据目录:', playwrightDataDir);
console.log('   - 可以使用 storageState 保存/加载登录状态');
console.log('   - 支持跨浏览器持久化\n');

console.log('测试建议:');
console.log('==========\n');
console.log('1. 在 Claude Code 中使用 MCP 登录一个网站（如 GitHub）');
console.log('2. 关闭并重启 MCP 服务器');
console.log('3. 再次访问该网站，验证是否仍处于登录状态');
console.log('4. 检查用户数据目录中是否有新的文件生成\n');

console.log('配置验证完成！\n');

