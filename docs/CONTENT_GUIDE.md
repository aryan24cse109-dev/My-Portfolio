# Content guide

- Edit project descriptions, links, stack labels, workflows, features, limitations, and screenshot paths in `frontend/src/data/projects.ts`.
- Keep the project array to the five approved entries and do not add unsupported details.
- Update profile links, resume path, site metadata defaults, navigation, and skill groups in `frontend/src/data/site.ts`.
- Keep experience and hackathon details in `frontend/src/data/experience.ts`, which also drives the homepage preview.
- Verify source code or documentation before adding claims; state demo/sandbox/synthetic limitations beside relevant claims.
- The AlgoMate PR list is in `frontend/src/data/projects.ts`. Current statuses are queried from GitHub's public API; unavailable status is labeled as such, and no aggregate merged count is claimed.
- The return-risk image block is intentionally CSS-drawn to avoid prohibited screenshot claims; retain that approach until corrected evidence is supplied.
- Resume actions appear automatically once `frontend/public/resume/Aryan-Agarwal-CV.pdf` exists. See root README for the exact manual steps.
