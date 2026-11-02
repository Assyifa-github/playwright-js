const figlet = require('figlet');

module.exports = async function globalSetup() {
  const gradient = await import('gradient-string'); // dynamic import for ESM
  const target = process.env.TARGET || 'demo';

  console.clear();
  console.log(gradient.default.pastel.multiline(figlet.textSync('Demo Website', { horizontalLayout: 'fitted' })));
  console.log(gradient.default.pastel.multiline(figlet.textSync('Automation Test', { horizontalLayout: 'fitted' })));
  console.log(gradient.default.pastel.multiline(figlet.textSync(`TARGET = ${target.toUpperCase()}`, { horizontalLayout: 'fitted' })));

  console.log(`🔹 Running tests with TARGET: ${target}`);
  console.log(`🔹 Configuration loaded from: data-test/config-${target}.yaml`);
};