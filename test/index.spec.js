
const runNpmAudit = require('../index');
const { expect } = require('chai');

describe('npm-audit', () => {
  it('should parse audit-report', () => {
    const package = JSON.stringify(require('./1low1moderate.json'));
    const packageLock = JSON.stringify(require('./1low1moderate-lock.json'));

    const report = runNpmAudit({ package, packageLock });

    expect(report).to.be.an('object');
    expect(report.metadata.vulnerabilities.low).to.be.equal(1);
    expect(report.metadata.vulnerabilities.moderate).to.be.equal(1);
  });
});
