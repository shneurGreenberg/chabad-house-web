# chabad-house-web

This repository is the **static web deployment artifact** for a Flutter web app (published to GitHub Pages). It contains only the built site shell: `index.html`, the Flutter loader (`flutter.js` / `flutter_bootstrap.js`), `manifest.json`, `version.json`, icons, and a minimal `assets/` folder.

There is **no application source code, package manager, build system, linter, or test suite in this repo**. The Dart/Flutter source that produces this build lives in a separate repository.

## Cursor Cloud specific instructions

### What this repo is (and isn't)
- This is a pre-built static site (a GitHub Pages deploy artifact), not a development codebase. There is nothing to install (no `package.json` / `pubspec.yaml` / `requirements.txt`) and nothing to compile here.
- No lint, no automated tests, and no build step exist in this repo. Do not fabricate them; there is no tooling to run.
- The compiled app entrypoint `main.dart.js` (and `canvaskit/` if bundling locally) is **not committed** to this repo. Because of that, serving the site produces a **blank page** and a `404` for `main.dart.js` in the browser console. This is expected given the repo's current contents — it is a content gap, not an environment problem. Producing/adding `main.dart.js` requires the separate Flutter source repo plus the Flutter SDK (out of scope for setting up this repo).

### How to run (serve) the site
- `index.html` sets `<base href="/chabad-house-web/">`, so relative asset URLs resolve under the `/chabad-house-web/` path. Serving the repo root directly at `/` will break asset paths.
- Serve it so the site is reachable at `.../chabad-house-web/`. One reliable way (nothing to install; Python 3 is already available):
  - `mkdir -p /tmp/webroot && ln -sfn /workspace /tmp/webroot/chabad-house-web`
  - `python3 -m http.server 8080 --bind 0.0.0.0` run from `/tmp/webroot`
  - Open `http://localhost:8080/chabad-house-web/`
- CanvasKit is loaded at runtime from the `gstatic.com` CDN (see `engineRevision` in `flutter_bootstrap.js`), so serving the site requires outbound network access for the renderer to load.
