import {expect} from 'chai';
import {domcontext} from '../src';

describe('dom context', () => {
  it('needs more tests', () => {
    // This is a quick module that was extracted from another project.
    // It needs tests, feel free to add them. This one is not a good example.
    const ctx = domcontext();
    expect(new ctx.Array(10).length).to.equal(10);
  });
});
