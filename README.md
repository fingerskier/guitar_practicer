# Guitar Practicer

This app selects a random practice drill for you based on a few musical variables.

## Variables

* Chord root
* Chord quality (Major, Minor, Augmented, Diminished)
* Chord augment (none, 2, 4, 7)
* Position (0–14)
* Voice (1–3)
* Technique (Strum, Pluck, Arpeggiate, Tap)
* Tempo

## Usage

Run `npm run dev` and open the app in your browser. Click **Generate Practice** to generate a random drill. The chosen settings are displayed and the root note is played four times at the selected tempo.

## Output

Plays the chord root at the tempo.

## Tech stack

Built with the latest [Vite](https://vite.dev/) and [React 19](https://react.dev/) on TypeScript, linted with ESLint (flat config).

## Scripts

* `npm run dev` — start the dev server
* `npm run build` — type-check and build for production into `dist/`
* `npm run preview` — preview the production build locally
* `npm run lint` — run ESLint

## Deployment

The app deploys to **GitHub Pages** automatically via GitHub Actions
(`.github/workflows/deploy.yml`) on every push to `main`. It is served at:

> https://fingerskier.github.io/guitar_practicer/

The workflow builds the app and publishes `dist/` using the official Pages
actions. The Vite `base` is set to `/guitar_practicer/` so assets resolve
under that path (the value is case-sensitive and must match the repo name).

The workflow enables Pages automatically (`configure-pages` with
`enablement: true`). If the first run fails because Pages is disabled for the
repository, enable it once under **Settings → Pages → Build and deployment →
Source: GitHub Actions**, then re-run the workflow.

