import base64,glob,os,re,json,zipfile,time
S='src/';D='dist/';os.makedirs(D,exist_ok=True)
r=lambda p:open(S+p,encoding='utf8').read()
logo='data:image/png;base64,'+base64.b64encode(open(S+'logo-small.png','rb').read()).decode()
css=r('fonts.css')+'\n'+r('style.css')
css=css.replace('var(--logo)','var(--logo)')
ver=str(int(time.time()))
js_files=['js/01-core.js','js/01a-edu.js','js/02-engine.js','js/03-visual.js','js/03b-paper.js','js/04-ui.js','sound.js','js/05-timer.js','js/06-home-study.js','js/07-tasks-log.js','js/08-gym-food.js','js/08b-fitness.js','js/09-water-routine.js','js/10-read-notes-lib-insp-settings.js','js/11-alarm.js','js/11b-cloud.js','js/13-native.js','js/10c-books-catalog.js','js/10b-edu-ui.js','js/14a-exam-bank.js','js/14b-exams.js','js/12-main.js']
js='\n'.join(r(f) for f in js_files)
body=r('body.html')
head='''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>إنجاز | منظّم الدراسة والحياة للطالب المصري: مذاكرة وامتحانات وكتب الوزارة</title>
<meta name="description" content="إنجاز تطبيق مجاني لتنظيم يومك: مؤقت مذاكرة، مواد وكتب الوزارة PDF لكل مرحلة (ابتدائي وإعدادي وثانوي وبكالوريا)، امتحان أسبوعي بالحلول، ومتابعة الرياضة والأكل والنوم والماء.">
<meta name="keywords" content="إنجاز, تنظيم المذاكرة, كتب الوزارة PDF, مناهج مصر, ثانوية عامة, بكالوريا مصرية, امتحانات الصف, مؤقت مذاكرة, منظم يومي, تطبيق طالب">
<meta name="robots" content="index,follow,max-image-preview:large"><meta name="author" content="إنجاز">
<link rel="canonical" href="https://aamedabdou-alt.github.io/https-github.com-new/mysapaty/">
<meta property="og:type" content="website"><meta property="og:locale" content="ar_EG"><meta property="og:site_name" content="إنجاز">
<meta property="og:title" content="إنجاز | منظّم الدراسة والحياة للطالب المصري"><meta property="og:description" content="مؤقت مذاكرة، كتب الوزارة PDF لكل مرحلة، امتحان أسبوعي بالحلول، ومتابعة الرياضة والصحة. مجاني.">
<meta property="og:url" content="https://aamedabdou-alt.github.io/https-github.com-new/mysapaty/"><meta property="og:image" content="https://aamedabdou-alt.github.io/https-github.com-new/mysapaty/icon-512.png">
<meta name="twitter:card" content="summary"><meta name="twitter:title" content="إنجاز | منظّم الدراسة والحياة"><meta name="twitter:description" content="مؤقت مذاكرة، كتب الوزارة PDF، امتحان أسبوعي بالحلول، ورياضة وصحة.">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebApplication","name":"إنجاز","url":"https://aamedabdou-alt.github.io/https-github.com-new/mysapaty/","inLanguage":"ar","applicationCategory":"EducationalApplication","operatingSystem":"Web, Android","offers":{"@type":"Offer","price":"0","priceCurrency":"EGP"},"description":"تطبيق لتنظيم المذاكرة والحياة اليومية للطالب المصري مع كتب الوزارة وامتحانات أسبوعية."}</script>
<meta name="theme-color" content="#0f1318">
<meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><meta name="apple-mobile-web-app-title" content="إنجاز">
<link rel="manifest" href="manifest.webmanifest"><link rel="icon" href="icon-192.png"><link rel="apple-touch-icon" href="apple-touch-icon.png">
<style>:root{--logo:url(%s)}
%s</style>
</head>
<body>
'''%(logo,css)
html=head+body+'\n<script>'+r('gsap.min.js')+'</script>\n<script>'+r('supabase.min.js')+'</script>\n<script>'+r('config.js')+'</script>\n<script>\n'+js+'\n</script>\n</body>\n</html>\n'
open(D+'index.html','w',encoding='utf8').write(html)
for f in ['icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png']:
    open(D+f,'wb').write(open(S+f,'rb').read())
json.dump({"name":"إنجاز","short_name":"إنجاز","lang":"ar","dir":"rtl","start_url":"./index.html","scope":"./","display":"standalone","orientation":"any","background_color":"#0f1318","theme_color":"#0f1318","icons":[{"src":"icon-192.png","sizes":"192x192","type":"image/png"},{"src":"icon-512.png","sizes":"512x512","type":"image/png"},{"src":"icon-maskable-512.png","sizes":"512x512","type":"image/png","purpose":"maskable"}]},open(D+'manifest.webmanifest','w',encoding='utf8'),ensure_ascii=False)
open(D+'robots.txt','w').write('User-agent: *\nAllow: /\nSitemap: https://aamedabdou-alt.github.io/https-github.com-new/mysapaty/sitemap.xml\n')
open(D+'sitemap.xml','w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://aamedabdou-alt.github.io/https-github.com-new/mysapaty/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url></urlset>\n')
open(D+'sw.js','w').write('''const C="ab-%s";const F=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==self.location.origin)return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(m=>m||fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match("./index.html"))))});
'''%ver)
print(len(html)//1024,'KB')
