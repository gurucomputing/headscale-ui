### Authentication and Authorization
In the current client-only format, the headscale API secret is stored within the browser's `localStorage` area. While `localStorage` is not an ideal location for secrets storage, it is currently the *only* possible method of securing data to a browser without some sort of backend facilitation.

What this means to *you* is that your API credentials are tied to your browser profile. If you open an incognito window or another browser profile, your API key will *not* carry across.

`localStorage` secrets have the possibility of being exploited by XSS. This exploitation avenue is mitigated by the static nature of the site: all pages are protected by a hashsum CSP (content security protection) that prevent modifying or adding javascript from other sources.

The future state for `heascale-ui` is not to rely on `localStorage` at all, but due to the architecture, any other methods require tighter integration with the core `headscale` product. For now this is not on the headscale roadmap.

## Vulnerability Disclosure

If any method of bypassing or leaking the `localStorage` secrets is found, please contact myself directly at `chris@gurucomputing.com.au` rather than opening an issue.