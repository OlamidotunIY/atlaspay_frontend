import { authentication } from './authentication.js';

describe('authentication', () => {
  it('should work', () => {
    expect(authentication()).toEqual('authentication');
  });
});
