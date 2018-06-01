const shell = require('shelljs');
const assert = require('assert');

const fileNames = {
  package: 'package.json',
  packageLock: 'package-lock.json'
};


function doAudit({ package, packageLock }) {
  const dirBefore = shell.pwd();
  shell.cd(shell.tempdir());
  shell.touch([fileNames.package, fileNames.packageLock]);
  shell.ShellString(package).to(fileNames.package);
  shell.ShellString(packageLock).to(fileNames.packageLock);
  const audit = shell.exec('npm audit --json', { silent: true });
  shell.rm('-f', [fileNames.package, fileNames.packageLock]);
  shell.cd(dirBefore);

  if (audit.stderr) {
    throw Error(`Audit failed! ${audit.stderr}`);
  }

  return JSON.parse(audit.stdout);
}

function runNpmAudit({ package, packageLock } = {}) {
  assert(typeof package === 'string', 'package must be a valid string');
  assert(typeof packageLock === 'string', 'packageLock must be a valid string');

  const audit = doAudit({ package, packageLock });

  return audit;
}


module.exports = runNpmAudit;
