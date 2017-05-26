import {expect} from 'chai';
import {packageJson} from './helpers';

describe('package.json', () => {

  it('has a name', () => {
    expect(packageJson.name).to.not.be.null;
  });
});
