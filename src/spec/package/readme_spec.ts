import {expect} from 'chai';
import {packageJson, readme, streamOutputs, stringAsStream} from './helpers';

describe('README', () => {

  it('has an H1 matching the package name', () => {
    const packageName = packageJson.name!;
    expect(readme).to.contain(`# ${packageName}`);
  });

  it('has installation instructions', () => {
    expect(readme).to.contain('## Installation');
  });

  it('has usage information', () => {
    expect(readme).to.contain('## Usage');
  });

  it('has a license section corresponding to package license', () => {
    expect(readme).to.contain('## License');
    const licenseName = packageJson.license!;
    expect(readme).to.contain(`[${licenseName}`);
  });

  describe('code blocks', () => {

    it('has syntactically valid javascript code', async () => {
      const codeblocks = require('markdown-code-blocks');
      const jsBlocks = await streamOutputs<string>(
          stringAsStream(readme).pipe(codeblocks('javascript')));
      expect(jsBlocks).to.deep.equal([]);
    });
  });
});
