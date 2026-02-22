# Deploying to Vercel & Pushing to GitHub

This repository contains a static site (HTML/CSS/JS). The steps below prepare the project for Vercel and push it to GitHub.

1) Local commit (creates a git repo if needed)

```bash
# initialize repo if needed
if [ ! -d .git ]; then
  git init
fi
git add .
git commit -m "Prepare for Vercel: add vercel.json and .gitignore"
```

2) Create GitHub repo and push (two options)

- Option A — use GitHub CLI (`gh`) (recommended if authenticated):

```bash
# create a remote repo, private by default (remove --private to make public)
gh repo create my-repo-name --source=. --remote=origin --push --private
# Replace `my-repo-name` with your desired repo name
```

- Option B — manual remote creation in GitHub web UI:

```bash
# 1) Create a repo on github.com manually
# 2) Then run (replace URL):
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main
```

3) Deploy to Vercel

- Option A — connect repository in Vercel dashboard (easy):
  - Go to https://vercel.com/new, pick your GitHub repository, and deploy.

- Option B — use `vercel` CLI (requires login):

```bash
# install vercel if needed
npm i -g vercel
vercel login
vercel --prod
```

Notes
- The provided `vercel.json` config uses `@vercel/static` to serve HTML files.
- You can customize `vercel.json` for rewrites/redirects and headers.
