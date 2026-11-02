const getConfig = require('./configReader'); 
const config = getConfig(); 

function generateCustomLayout(summaryResults) {
  const adjustedPassed = summaryResults.passed + summaryResults.flaky;
  const adjustedFlaky = 0;

  // Ambil hanya title (test.name) dan kasih nomor
  const failedScenarios = summaryResults.tests
    .filter(test => test.status === 'failed')
    .map((test, idx) => `[${idx + 1}] ${test.name || test.title || test.fullTitle || "Unknown test"}`);

  // Slack block limit = 3000 chars per text field
  let failedText = failedScenarios.join("\n");
  if (failedText.length > 2800) {
    failedText = failedText.substring(0, 2800) + "\n... (truncated)";
  }

  const blocks = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: '[Desktop Web] Automation Test Report',
        emoji: true,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: "*Environment : * " + (process.env.TARGET || '').toUpperCase() + "\n*Base Url :* " + config.base_url,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text:
          `Test Result:\n` +
          `> :white_check_mark: *Passed:* ${adjustedPassed}\n` +
          `> :x: *Failed:* ${summaryResults.failed}\n` +
          `> :repeat: *Flaky:* ${adjustedFlaky}\n` +
          `> :fast_forward: *Skip:* ${summaryResults.skipped}\n` +
          `> :information_source: *Total Scenario:* ${summaryResults.tests.length}\n`,
      },
    },
  ];

  // Tambahkan block failed scenario hanya kalau ada
  if (failedScenarios.length > 0) {
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Failed Scenarios:*\n\`\`\`\n${failedText}\n\`\`\``,
      },
    });
  }

  return blocks;
}

module.exports = generateCustomLayout;
