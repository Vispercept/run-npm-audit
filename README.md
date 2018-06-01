# RUN-NPM-AUDIT

Use `npm audit` programmatically. Provide a package.json and a package-lock.json and run `npm audit --json` ([npm docs](https://docs.npmjs.com/cli/audit)) against them.

## Usage

```javascript
const runNpmAudit = require('run-npm-audit');

const package = JSON.stringify(require('./yorPackageJSONSomewhere.json'));
const packageLock = JSON.stringify(require('./yorPackageLockJSONSomewhere.json'));

const report = runNpmAudit({ package, packageLock });
```

```javascript
// example-report with outdated express 2.0.0
{ actions:
   [ { action: 'install',
       module: 'express',
       target: '4.16.3',
       isMajor: true,
       resolves: [Array] } ],
  advisories:
   { '3':
      { findings: [Array],
        id: 3,
        created: '2015-10-17T19:41:46.382Z',
        updated: '2018-02-22T21:47:33.163Z',
        deleted: null,
        title: 'methodOverride Middleware Reflected Cross-Site Scripting',
        found_by: [Object],
        reported_by: [Object],
        module_name: 'connect',
        cves: [Array],
        vulnerable_versions: '<=2.8.0',
        patched_versions: '>=2.8.1',
        overview:
         'Connect is a stack of middleware that is executed in order in each request.\n\nThe "methodOverride" middleware allows the http post to override the method of the request with the value of the "_method" post key or with the header "x-http-method-override".\n\nBecause the user post input was not checked, req.method could contain any kind of value. Because the req.method did not match any common method VERB, connect answered with a 404 page containing the "Cannot `[method]` `[url]`" content. The method was not properly encoded for output in the browser.\n\n\n###Example:\n```\n~ curl "localhost:3000" -d "_method=<script src=http://nodesecurity.io/xss.js></script>"\nCannot <SCRIPT SRC=HTTP://NODESECURITY.IO/XSS.JS></SCRIPT> /\n```\n\n',
        recommendation:
         'Update to the newest version of Connect or disable methodOverride. It is not possible to avoid the vulnerability if you have enabled this middleware in the top of your stack.',
        references:
         '(2013-06-27) Bug reported:\nhttps://github.com/senchalabs/connect/issues/831\n\n(2013-06-27) First fix: escape req.method output\nhttps://github.com/senchalabs/connect/commit/277e5aad6a95d00f55571a9a0e11f2fa190d8135\n\n(2013-06-27) Second fix: whitelist\nhttps://github.com/senchalabs/connect/commit/126187c4e12162e231b87350740045e5bb06e93a',
        access: 'public',
        severity: 'low',
        cwe: 'CWE-79',
        metadata: [Object],
        url: 'https://nodesecurity.io/advisories/3' },
     '8':
      { findings: [Array],
        id: 8,
        created: '2015-10-17T19:41:46.382Z',
        updated: '2018-02-22T21:55:47.925Z',
        deleted: null,
        title: 'No Charset in Content-Type Header',
        found_by: [Object],
        reported_by: [Object],
        module_name: 'express',
        cves: [Array],
        vulnerable_versions: '<3.11 || >= 4 <4.5',
        patched_versions: '>=3.11 <4 || >=4.5',
        overview:
         'Vulnerable versions of express do not specify a charset field in the content-type header while displaying 400 level response messages. The lack of enforcing user\'s browser to set correct charset, could be leveraged by an attacker to perform a cross-site scripting attack, using non-standard encodings, like UTF-7.',
        recommendation:
         'For express 3.x, update express to version 3.11 or later.\nFor express 4.x, update express to version 4.5 or later. ',
        references: '',
        access: 'public',
        severity: 'moderate',
        cwe: 'CWE-79',
        metadata: [Object],
        url: 'https://nodesecurity.io/advisories/8' } },
  muted: [],
  metadata:
   { vulnerabilities: { info: 0, low: 1, moderate: 1, high: 0, critical: 0 },
     dependencies: 7,
     devDependencies: 0,
     optionalDependencies: 0,
     totalDependencies: 7 },
  runId: '................' }
```

## scripts

- test: `$ npm run test`
- dev: `$ npm run dev`
