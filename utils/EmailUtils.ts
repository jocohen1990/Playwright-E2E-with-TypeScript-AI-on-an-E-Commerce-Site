import { MailSlurp } from 'mailslurp-client';
import { requireEnv } from './env';

/** Thin wrapper around MailSlurp for creating disposable inboxes and reading their emails. */
export class EmailUtils {
    private readonly mailSlurp = new MailSlurp({ apiKey: requireEnv('MAIL_SLURP_API_KEY') });

    async createInbox() {
        return this.mailSlurp.inboxController.createInboxWithDefaults();
    }

    async waitForLatestEmail(inboxId: string, timeoutMs = 30_000) {
        return this.mailSlurp.waitForLatestEmail(inboxId, timeoutMs);
    }
}
