# تعليمات رفع المشروع يدوياً

## المشكلة:
Git يستخدم بيانات اعتماد للمستخدم `maome1` بدلاً من `kar3r0`، مما يمنع الرفع المباشر.

## الحلول:

### الحل الأول: استخدام GitHub CLI
```bash
# تثبيت GitHub CLI إذا لم يكن مثبتاً
# ثم تسجيل الدخول
gh auth login

# رفع المشروع
git push -u origin main
```

### الحل الثاني: استخدام Personal Access Token
1. اذهب إلى GitHub.com → Settings → Developer settings → Personal access tokens
2. أنشئ token جديد مع صلاحيات repo
3. استخدم الأمر:
```bash
git remote set-url origin https://kar3r0:[TOKEN]@github.com/kar3r0/1.git
git push -u origin main
```

### الحل الثالث: الرفع اليدوي عبر واجهة GitHub
1. اذهب إلى https://github.com/kar3r0/1
2. اضغط "uploading an existing file"
3. ارفع جميع الملفات من المجلد الحالي
4. اكتب commit message: "Initial commit: Social Links Card project"

### الحل الرابع: تغيير بيانات Git المحفوظة
```bash
# حذف بيانات الاعتماد المحفوظة
git config --global --unset credential.helper
# أو
cmdkey /delete:git:https://github.com

# ثم المحاولة مرة أخرى
git push -u origin main
```

## الملفات الجاهزة للرفع:
- جميع ملفات المشروع موجودة ومُعدة
- GitHub Actions workflow جاهز
- إعدادات Vite محدثة للعمل مع GitHub Pages
- README محدث باللغة العربية

## بعد الرفع:
1. اذهب إلى https://github.com/kar3r0/1/settings/pages
2. اختر Source: "GitHub Actions"
3. الموقع سيكون متاح على: https://kar3r0.github.io/1/

---
**المشروع جاهز تماماً، يحتاج فقط للرفع!**