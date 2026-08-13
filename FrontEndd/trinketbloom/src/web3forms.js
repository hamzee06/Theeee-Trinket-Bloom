// Sends a copy of order/contact submissions to the store owner's Gmail via
// Web3Forms (https://web3forms.com) — a simple form-to-email service. Must
// run client-side: Web3Forms' API sits behind a Cloudflare bot challenge
// that blocks plain server-to-server requests, so this can't be called from
// the backend. Best-effort — a failure here never blocks the actual
// order/feedback submission, which has already succeeded by this point.
const WEB3FORMS_ACCESS_KEY = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;

export async function sendWeb3FormsNotification(fields) {
  if (!WEB3FORMS_ACCESS_KEY) {
    console.warn('REACT_APP_WEB3FORMS_ACCESS_KEY not set — skipping email notification.');
    return;
  }

  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        from_name: 'The Trinket Bloom',
        ...fields,
      }),
    });
  } catch (err) {
    console.error('Web3Forms notification failed:', err.message);
  }
}
