import { type Locator, type Page } from '@playwright/test';

export class Footer {
    readonly root: Locator;
    readonly disclaimerHeading: Locator;
    readonly disclaimerText: Locator;
    readonly versionInfo: Locator;

    constructor(page: Page) {
        this.root = page.getByRole('contentinfo');
        this.disclaimerHeading = this.root.getByRole('heading', { name: 'Disclaimer' });
        this.disclaimerText = this.root.getByText('This is not a real shop');
        this.versionInfo = this.root.getByText(/^Version: \w+ \| Built on: \d{4}-\d{2}-\d{2}$/);
    }
}
