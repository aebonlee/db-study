# 배포 가이드 (Deployment Guide)

## 📦 배포 개요

### 시스템 아키텍처
이 웹프로그래밍 학습 지원 시스템은 **순수 클라이언트 사이드 애플리케이션**으로 설계되었습니다.

**기술 스택:**
- HTML5, CSS3, JavaScript (ES6+)
- LocalStorage API (데이터 저장)
- 로컴 브라우저 지원
- 서버 사이드 또는 데이터베이스 불필요

### 배포 옵션
1. **정적 파일 호스팅** (추천)
   - GitHub Pages
   - Netlify
   - Vercel
   - Firebase Hosting

2. **웹 서버 배포**
   - Apache
   - Nginx
   - IIS

3. **로컴 실행**
   - 파일 드래그 앤 드롭
   - 로컴 서버

---

## 🚀 GitHub Pages 배포 (추천)

### 1단계: 리포지토리 준비
```bash
# 리포지토리 클로닝
git clone https://github.com/aebonlee/web_final.git
cd web_final

# 또는 기존 리포지토리에서 업데이트
git pull origin main
```

### 2단계: GitHub Pages 설정
1. **GitHub 리포지토리 접속**
   - https://github.com/aebonlee/web_final
   - Settings 탭 클릭

2. **Pages 설정**
   - 좌측 메뉴에서 "Pages" 선택
   - Source: "Deploy from a branch" 선택
   - Branch: "main" 선택
   - Folder: "/ (root)" 선택
   - Save 버튼 클릭

3. **배포 URL 확인**
   - 약 5-10분 후 사이트 접속 가능
   - URL: `https://aebonlee.github.io/web_final/`

### 3단계: 사용자 지정 도메인 (선택)
```bash
# CNAME 파일 생성 (예시)
echo "exam.yourdomain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push origin main
```

---

## 🌐 Netlify 배포

### 지속적 배포 (CD)
1. **Netlify 사이트 등록**
   - https://netlify.com 접속
   - GitHub 계정으로 로그인

2. **새 사이트 생성**
   - "New site from Git" 클릭
   - "GitHub" 선택
   - `aebonlee/web_final` 리포지토리 선택

3. **배포 설정**
   ```yaml
   # Build settings
   Base directory: (empty)
   Build command: (empty)  # 정적 파일이므로 빌드 단계 없음
   Publish directory: .    # 루트 디렉토리
   ```

4. **사용자 지정 도메인**
   - Site settings > Domain management
   - "Add custom domain" 입력
   - DNS 설정 업데이트

### 수동 배포
```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 사이트 디렉토리에서 로그인
netlify login

# 배포 실행
netlify deploy --dir=. --prod
```

---

## ⚡ Vercel 배포

### GitHub 연동 배포
1. **Vercel 사이트 접속**
   - https://vercel.com 로그인
   - "New Project" 클릭

2. **리포지토리 선택**
   - GitHub 계정 연결
   - `web_final` 리포지토리 선택
   - "Import" 클릭

3. **배포 설정**
   ```yaml
   Framework Preset: Other
   Root Directory: ./
   Build Command: (leave empty)
   Output Directory: ./
   Install Command: (leave empty)
   ```

4. **자동 배포**
   - main 브랜치에 push 시 자동 배포
   - PR 미리보기 지원

---

## 🔥 Firebase Hosting 배포

### 초기 설정
```bash
# Firebase CLI 설치
npm install -g firebase-tools

# Firebase 로그인
firebase login

# 프로젝트 초기화
firebase init hosting

# 설정 옵션
# - Use an existing project: 기존 프로젝트 선택
# - Public directory: . (루트 디렉토리)
# - Configure as single-page app: N
# - Set up automatic builds: N
```

### firebase.json 설정
```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      "Dev_md/**",
      "README.md"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

### 배포 실행
```bash
# 로컴 테스트
firebase serve

# 프로덕션 배포
firebase deploy
```

---

## 💻 로컴 서버 배포

### Node.js 간단 서버
```bash
# 로컴 서버 실행
npx serve .
# 또는
python -m http.server 8000
# 또는
php -S localhost:8000
```

### Apache 설정
```apache
# .htaccess 파일
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # HTTPS 리다이렉트
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    
    # 캐시 설정
    <FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </FilesMatch>
</IfModule>

# 보안 헤더
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-XSS-Protection "1; mode=block"
Header always set X-Content-Type-Options "nosniff"
```

### Nginx 설정
```nginx
server {
    listen 80;
    server_name example.com;
    
    # HTTPS 리다이렉트
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com;
    
    root /var/www/web_final;
    index index.html;
    
    # SSL 설정
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;
    
    # 정적 파일 캐시
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # 로그 설정
    access_log /var/log/nginx/exam_access.log;
    error_log /var/log/nginx/exam_error.log;
    
    # 보안 헤더
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

---

## ⚙️ 배포 전 최적화

### 1. 성능 최적화

**CSS 최적화:**
```bash
# CSS 미니파이 (postcss-cli 사용)
npm install -g postcss-cli cssnano
postcss css/styles.css --use cssnano --output css/styles.min.css
```

**JavaScript 최적화:**
```bash
# JavaScript 미니파이 (terser 사용)
npm install -g terser
terser js/exam.js --compress --mangle --output js/exam.min.js
```

**이미지 최적화:**
```bash
# 이미지 압축 (예시 - imagemin 사용)
npm install -g imagemin-cli imagemin-webp
imagemin images/*.{jpg,png} --plugin=webp --out-dir=images/optimized
```

### 2. 보안 강화

**CSP (Content Security Policy) 설정:**
```html
<!-- HTML head에 추가 -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline' fonts.googleapis.com;
               font-src fonts.gstatic.com;
               img-src 'self' data:;">
```

**robots.txt 파일:**
```txt
# robots.txt
User-agent: *
Allow: /
Disallow: /Dev_md/
Disallow: /*.js
Disallow: /*.css

Sitemap: https://yourdomain.com/sitemap.xml
```

### 3. SEO 최적화

**sitemap.xml 생성:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2025-11-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/exam.html</loc>
    <lastmod>2025-11-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**Meta 태그 최적화:**
```html
<!-- 각 HTML 파일에 추가 -->
<meta name="description" content="웹프로그래밍 학습 지원 시스템 - 대학생을 위한 인터렉티브 학습 플랫폼">
<meta name="keywords" content="웹프로그래밍, HTML, CSS, JavaScript, 학습, 시험, 대학">
<meta name="author" content="Claude Code AI Assistant">

<!-- Open Graph -->
<meta property="og:title" content="웹프로그래밍 학습 지원 시스템">
<meta property="og:description" content="인터렉티브 학습 경험을 제공하는 웹프로그래밍 교육 플랫폼">
<meta property="og:type" content="website">
<meta property="og:url" content="https://yourdomain.com">
```

---

## 📊 모니터링 및 분석

### Google Analytics 연동
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
  
  // 사용자 지정 이벤트
  gtag('event', 'exam_start', {
    'event_category': 'engagement',
    'event_label': 'exam'
  });
</script>
```

### 성능 모니터링
```javascript
// performance.js - 성능 추적 스크립트
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            
            // Analytics에 전송
            gtag('event', 'page_load_time', {
                'value': loadTime,
                'event_category': 'performance'
            });
        }, 1000);
    });
}
```

### 에러 모니터링
```javascript
// error-tracking.js
window.addEventListener('error', function(e) {
    gtag('event', 'exception', {
        'description': e.message,
        'fatal': false,
        'lineno': e.lineno,
        'filename': e.filename
    });
});

window.addEventListener('unhandledrejection', function(e) {
    gtag('event', 'exception', {
        'description': 'Unhandled Promise Rejection: ' + e.reason,
        'fatal': false
    });
});
```

---

## 🔄 CI/CD 파이프라인

### GitHub Actions 설정

**자동 배포 워크플로우:**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: |
        npm install -g html-minifier terser postcss-cli cssnano
        
    - name: Optimize files
      run: |
        # HTML 미니파이
        html-minifier --input-dir . --output-dir dist --file-ext html \
          --remove-comments --collapse-whitespace --minify-css --minify-js
        
        # CSS 미니파이
        postcss css/styles.css --use cssnano --output dist/css/styles.min.css
        
        # JS 미니파이
        terser js/*.js --compress --mangle --output-path dist/js/
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Netlify 배포 설정
```toml
# netlify.toml
[build]
  command = "echo 'No build step required'"
  publish = "."

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "max-age=31536000"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "max-age=31536000"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  conditions = {Role = ["admin"], Country = ["US"]}
```

---

## ⚙️ 환경별 설정

### 개발 환경
```bash
# 로컴 개발 서버
git clone https://github.com/aebonlee/web_final.git
cd web_final

# 라이브 리로드 서버 실행
npx live-server --port=3000 --open=/index.html

# 또는 VS Code Live Server 확장 사용
code .
```

### 스테이징 환경
```bash
# Netlify 브랜치 배포
netlify deploy --dir=. --alias=staging

# 또는 별도 브랜치에서
git checkout -b staging
git push origin staging
# GitHub Pages에서 staging 브랜치 설정
```

### 프로덕션 환경
```bash
# 최종 배포 전 검증
# 1. 모든 에셋 및 링크 확인
# 2. 브라우저 호환성 테스트
# 3. 모바일 디바이스 테스트
# 4. 성능 테스트

# main 브랜치에 마지

git checkout main
git merge staging
git tag -a v2.0 -m "Learning Support System Release"
git push origin main --tags
```

---

## 🔒 보안 대성
cd web_final

# 도메인별 설정 파일 생성
echo "domain: exam.school.edu" > config.yml

# 보안 헤더 추가
sed -i '/<head>/a\  <meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains">' *.html
```

### HTTPS 설정

**Let's Encrypt SSL 인증서:**
```bash
# Certbot 설치 및 인증서 발급
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# SSL 인증서 발급
sudo certbot --nginx -d exam.yourdomain.com

# 자동 갱신 설정
sudo crontab -e
# 다음 라인 추가:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

**Cloudflare 연동:**
```bash
# Cloudflare 설정
# 1. DNS 레코드 A/AAAA 추가
# 2. SSL/TLS 모드: Full (strict)
# 3. Always Use HTTPS: ON
# 4. HSTS: ON
# 5. 미니파이: ON
```

### 코드 서명
```bash
# 코드 무결성 검증
find . -name "*.js" -o -name "*.css" -o -name "*.html" | xargs sha256sum > checksums.txt

# SRI (Subresource Integrity) 추가
sha384sum css/styles.css | awk '{print $1}' | xxd -r -p | base64
# 결과를 HTML에 추가:
# <link rel="stylesheet" href="css/styles.css" integrity="sha384-...">
```

---

## 🔍 디버그 및 테스트

### 브라우저 호환성 테스트
```bash
# BrowserStack 자동화 테스트 (Selenium)
npm install -g selenium-webdriver

# 테스트 스크립트 예시
node test/browser-compatibility.js
```

### 성능 테스트
```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://yourdomain.com --view

# PageSpeed Insights API
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://yourdomain.com"
```

### 접근성 테스트
```bash
# axe-core CLI
npm install -g @axe-core/cli
axe https://yourdomain.com

# 또는 브라우저 확장 사용
# - axe DevTools
# - WAVE
# - Lighthouse 접근성 감사
```

---

## 🗺️ 백업 및 복구

### 데이터 백업
```bash
# LocalStorage 데이터 내보내기 스크립트
# browser-backup.js
function exportLocalStorageData() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data[key] = localStorage.getItem(key);
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], 
                         {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exam-backup.json';
    a.click();
}
```

### 사이트 미러링
```bash
# wget을 사용한 사이트 미러링
wget --mirror --convert-links --adjust-extension \
     --page-requisites --no-parent \
     https://yourdomain.com

# 또는 httrack 사용
httrack https://yourdomain.com -O mirror/
```

---

## 📱 모바일 최적화

### PWA (Progressive Web App) 변환
```json
// manifest.json
{
  "name": "웹프로그래밍 학습 지원 시스템",
  "short_name": "웹프로그래밍 학습",
  "description": "인터렉티브 웹프로그래밍 교육 플랫폼",
  "start_url": "./index.html",
  "display": "standalone",
  "theme_color": "#0ea5e9",
  "background_color": "#f8fafc",
  "icons": [
    {
      "src": "icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Service Worker 추가
```javascript
// sw.js - 기본 서비스 워커
const CACHE_NAME = 'exam-system-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/exam.html',
  '/result.html',
  '/css/styles.css',
  '/js/main.js',
  '/js/exam.js',
  '/js/questions.js',
  '/js/result.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      }
    )
  );
});
```

---

## 📊 성능 벤치마크

### 예상 성능 지표
- **FCP (First Contentful Paint)**: < 1.5s
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTI (Time to Interactive)**: < 3.5s

### 캐시 전략
```apache
# .htaccess - 캐시 설정
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/html "access plus 1 hour"
</IfModule>
```

---

## 🔄 업데이트 및 유지보수

### 버전 관리
```bash
# Git 사용한 버전 관리
git tag -a v2.1 -m "Add new features"
git push origin v2.1

# CHANGELOG.md 업데이트
echo "## [2.1.0] - 2025-11-23" >> CHANGELOG.md
echo "### Added" >> CHANGELOG.md
echo "- New learning guide feature" >> CHANGELOG.md
```

### 다운타임 없는 업데이트
```bash
# Blue-Green 배포 예시
# 1. 새 버전을 staging 서버에 배포
# 2. 테스트 완료 후 DNS 전환
# 3. 이전 버전은 대기 상태로 유지

# Netlify 또는 Vercel의 드로우 배포
npx vercel --prod
```

### 모니터링 알림
```bash
# 간단한 uptime 모니터링
crontab -e
# */5 * * * * curl -f https://yourdomain.com > /dev/null 2>&1 || echo "사이트 다운!"
```

---

## ❓ 문제 해결 가이드

### 자주 발생하는 문제

**1. 404 에러 발생**
```bash
# 파일 경로 확인
find . -name "*.html" -o -name "*.css" -o -name "*.js"

# 대소문자 확인 (기대대)
ls -la *.HTML  # 대소문자 차이 확인
```

**2. CORS 에러**
```bash
# 로컴 서버에서 테스트
python -m http.server 8000 --bind 127.0.0.1

# 또는 CORS 헤더 추가
# Access-Control-Allow-Origin: *
```

**3. 성능 이슈**
```bash
# 네트워크 연결 상태 확인
ping yourdomain.com
nslookup yourdomain.com

# CDN 캐시 초기화
# Cloudflare: Caching > Purge Everything
# AWS CloudFront: Invalidation 생성
```

### 비상 상황 대응
```bash
# 예비 인스턴스 활성화
# AWS Route 53 Health Check
# Cloudflare Load Balancer

# 백업 사이트로 리다이렉트
# DNS 설정에서 대체 레코드 활성화
```

---

**📅 문서 작성일**: 2025년 11월 23일  
**📝 문서 버전**: v1.0  
**👨‍💻 작성자**: Claude Code AI Assistant  
**🔄 최종 수정**: 배포 가이드 완성

> 💡 이 배포 가이드는 다양한 환경에서의 배포 옵션과 모범 사례를 제공하여, 프로덕션 레벨의 안정적이고 효율적인 배포를 도와줍니다.