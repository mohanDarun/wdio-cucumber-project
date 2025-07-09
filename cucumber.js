module.exports = {
    default: {
      require: ['tests/support/world.js', 'tests/step-definitions/*.js'],
      paths: ['tests/features/*.feature'],
      format: ['json:reports/cucumber-report.json']
    }
  };
  