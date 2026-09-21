# SXPay Gaming — Final deployment

## 1) GitHub Pages
- Create a repository such as `sxpay-gaming`.
- Upload all files in this folder.
- GitHub: Settings → Pages → Deploy from branch → `main` → `/ (root)`.
- Open the generated Pages URL.
- GitHub Pages supports HTTPS; use HTTPS for the production site.

## 2) Supabase
- Create a Supabase project.
- Run `supabase.sql` in SQL Editor.
- Create an admin user in Authentication → Users.
- Copy the Project URL and the **publishable key** into `config.js`.
- Never put a Supabase secret/service-role key in this repository.
- Open `/admin.html` and sign in.
- Add a title, category, article text and image; publish.

## 3) AdSense
- Add the live site to AdSense and request review.
- After Google approves the site, put the official AdSense script in `index.html`.
- Replace the placeholder in `ads.txt` with the exact line supplied by AdSense.
- Add responsive ad-unit code only where the design has ad placeholders.
- Do not click your own ads or encourage visitors to click.
- Approval and ad serving are controlled by Google; this project cannot guarantee approval.

## 4) PWA
- `manifest.webmanifest` and `sw.js` are included.
- On a supported browser, users can install SXPay from the browser menu.

## 5) Custom domain
A custom domain can be connected later through GitHub Pages → Settings → Pages → Custom domain.

### مهم قبل الرفع
- فك ضغط الملف كاملًا ثم ارفع **كل الملفات** إلى المستودع، وليس `index.html` وحده.
- إذا فتحت `index.html` مباشرة من الهاتف، النسخة الجديدة تحتوي CSS احتياطي داخل الصفحة حتى لا تظهر بتنسيق HTML الأبيض الافتراضي.
- تأثير الدائرة الخضراء حول الفأرة يعمل على الكمبيوتر فقط، ويختفي تلقائيًا على الهاتف.
