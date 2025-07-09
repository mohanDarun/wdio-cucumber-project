const report = require('multiple-cucumber-html-reporter');

report.generate({
    jsonDir: 'reports',
    reportPath: 'reports/html-report',
    metadata: {
        browser: { name: 'chrome', version: 'latest' },
        device: 'Local Test Machine',
        platform: { name: 'Windows', version: '10' }
    }
});
