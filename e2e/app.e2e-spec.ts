import { V1Page } from './app.po';

describe('v1 App', () => {
  let page: V1Page;

  beforeEach(() => {
    page = new V1Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
