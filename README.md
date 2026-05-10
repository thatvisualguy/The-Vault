# The Vault

A minimal static index for browsing a collection of standalone HTML files. Drop files in, push to GitHub, browse via GitHub Pages.

## Structure

```
the-vault/
├── index.html           ← homepage (the index)
├── files.js             ← auto-generated manifest
├── generate-index.js    ← scanner script
├── README.md
└── *.html               ← your files (any name, any depth)
```

## Setup

### 1. Local

```bash
# Drop your html files anywhere in this folder (subfolders OK)
node generate-index.js
```

Open `index.html` in a browser. Done.

### 2. Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "init vault"
git branch -M main
git remote add origin git@github.com:YOUR_USER/the-vault.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Source: `main` branch / root**.

Live in ~30 seconds at: `https://YOUR_USER.github.io/the-vault/`

### 3. Adding new files

```bash
# 1. drop file(s) into the folder
# 2. regenerate the manifest
node generate-index.js
# 3. push
git add . && git commit -m "add files" && git push
```

### Optional: automate on push

Add to `package.json`:

```json
{
  "scripts": {
    "build": "node generate-index.js"
  }
}
```

Or use a git pre-commit hook so you never forget to regenerate.

## Notes

- File names are pretty-printed: `my_cool-file.html` → `My Cool File`.
- Files open in a new tab.
- Subdirectories are scanned recursively.
- `index.html` and `404.html` are skipped automatically.
- No backend, no storage, no auth. It's just files on a CDN.
