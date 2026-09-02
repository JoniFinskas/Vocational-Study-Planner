# Vocational Study Planner

Vocational Study Planner, originally developed as Oma Hoks, is a student project from 2022. It was built to help plan Finnish vocational studies by academic year and study period.

The project is kept online as an old portfolio piece. Its original scope and visual design are still easy to recognize, so it should not be treated as an example of the authors' current work.

The interface is in Finnish. This version runs entirely in the browser with demo data included in the repository. It has no login or backend connection.

## Features

- Arrange qualification units across academic years and periods with drag and drop.
- Track selected study credits.
- Adjust the starting season and year.
- Show or hide summer periods.
- Export a plan as PDF or CSV.
- Store the current plan locally in the browser.

## Local development

The supported runtime is Node.js 22.22.2, recorded in `.nvmrc` and `package.json`.

```bash
npm ci
npm start
```

The development server is available at `http://127.0.0.1:5173/` by default.

Available checks:

```bash
npm run lint
npm test
npm run build
```

The production output is written to `dist/`. Production source maps are disabled in the Vite configuration.

## Search indexing

This site is intentionally excluded from search indexing. The built pages include `noindex` metadata, `robots.txt` blocks crawling, and `_headers` adds an `X-Robots-Tag` rule on hosts that support it.

## Project status

This project is archived and is not under active development. The build setup was updated and the old backend connection was removed so the original interface can still be opened and tested.

## Authors

- Joni Finskas
- Miika Toivanen

## License

No open-source license is granted. The repository may be viewed for portfolio review, but copying, modification, redistribution, or reuse is not permitted without permission from the relevant rights holders. All rights are reserved by the respective contributors.

Third-party software and assets retain their original licenses. Open Sans is distributed under the SIL Open Font License 1.1. See [`public/THIRD_PARTY_NOTICES.txt`](public/THIRD_PARTY_NOTICES.txt).
