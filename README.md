# Chabad House Website - Deployment Repository

**Status:** ⚠️ **Inactive/Incomplete Deployment**

This repository contains an **incomplete Flutter web build** for the Chabad House website. The live, working website is deployed from a different repository.

---

## 🌐 Live Website

**The actual working website is at:**  
👉 **https://shneurgreenberg.github.io/chabad-site/**

**Source repository:**  
👉 **https://github.com/shneurGreenberg/chabad-site**

---

## ⚠️ Issues with This Repository

This repository is **non-functional** due to:

1. **Missing Critical Files:** The compiled Dart code (`main.dart.js`) is not included
2. **Incomplete Build:** Only the "shell" was published (see commit: "Publish site shell without large assets")
3. **GitHub Pages Not Enabled:** This repository does not have Pages configured
4. **404 Error:** Attempting to access https://shneurgreenberg.github.io/chabad-house-web/ returns 404

### What's Missing:
- ❌ `main.dart.js` (compiled application code)
- ❌ `main.dart.js.map` (source maps)
- ❌ Large assets intentionally excluded
- ❌ GitHub Pages configuration

---

## 📋 Repository Purpose

**This repository appears to be:**
- A test/backup deployment location
- An incomplete build export
- Possibly superseded by the `chabad-site` repository

**For the working site, please visit or contribute to:**  
https://github.com/shneurGreenberg/chabad-site

---

## 🔧 To Make This Repository Functional

If you want to use this repository for deployment, you need to:

1. **Complete the Build:**
   ```bash
   # From the Flutter source project
   flutter build web --release --base-href="/chabad-house-web/"
   
   # Copy ALL files from build/web/ to this repository
   cp -r build/web/* /path/to/chabad-house-web/
   
   # Commit and push
   git add .
   git commit -m "Deploy complete Flutter web build"
   git push
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Navigate to Pages section
   - Select source branch (e.g., `main`)
   - Save configuration
   - Wait for deployment

3. **Verify Deployment:**
   - Visit https://shneurgreenberg.github.io/chabad-house-web/
   - Check that the app loads and runs correctly

---

## 📊 Audit Report

A comprehensive audit of both this repository and the live site is available:  
👉 **[AUDIT_REPORT.md](./AUDIT_REPORT.md)**

The audit found:
- ✅ **Live site (chabad-site):** Fully functional, 4/5 stars
- ❌ **This repository:** Non-functional due to missing files
- 📝 Detailed recommendations for improvements

---

## 🏗️ What's Included

This repository currently contains:
- ✅ `index.html` - Flutter web entry point
- ✅ `flutter.js`, `flutter_bootstrap.js` - Flutter framework
- ✅ `assets/` - Font and shader files
- ✅ `icons/` - Default Flutter icons
- ✅ `manifest.json` - PWA manifest
- ❌ `main.dart.js` - **MISSING** (critical for app to run)

---

## 🌟 About the Live Site

**בית חב״ד בית מנחם — נובוסיבירסק**  
(Beit Chabad Beit Menachem — Novosibirsk)

The live Chabad House website features:
- 🇮🇱 Full Hebrew/RTL support
- 📱 Responsive design (desktop, tablet, mobile)
- 📅 Live Shabbat times integration
- 📰 News and events
- 🖼️ Photo gallery
- 💰 Donation system
- 📞 Contact information and forms
- 🎓 Community programs showcase

---

## 👤 Owner

**שניאור גרינברג** (Shneur Greenberg)  
GitHub: [@shneurgreenberg](https://github.com/shneurgreenberg)

---

## 📄 License

This repository is part of the Chabad House Beit Menachem Novosibirsk project.

---

## 🔗 Related Repositories

- [chabad-site](https://github.com/shneurGreenberg/chabad-site) - Main working website
- [chabad-kinder](https://github.com/shneurGreenberg/chabad-kinder) - Chabad Kinder trilingual site
- [synagogue-memorial-saas](https://github.com/shneurGreenberg/synagogue-memorial-saas) - Multi-tenant synagogue platform

---

**Last Updated:** August 27, 2026  
**Status:** Awaiting clarification on repository purpose
