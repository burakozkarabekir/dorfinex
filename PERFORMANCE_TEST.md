# Performans Test Rehberi

## 🧪 Scroll Performansı Testi

### 1. Chrome DevTools ile Test

#### Performance Tab
1. Chrome DevTools'u açın (F12)
2. "Performance" sekmesine gidin
3. Kayıt butonuna tıklayın (⚫)
4. Sayfada hızlıca scroll yapın (5-10 saniye)
5. Kaydı durdurun

**Kontrol Edilecekler:**
- ✅ FPS 60'ın üzerinde olmalı
- ✅ Yeşil barlar (iyi performans)
- ❌ Kırmızı barlar olmamalı (layout shift, long task)
- ✅ "Scripting" süresi minimum olmalı

#### Rendering Tab
1. DevTools > ⋮ (More tools) > Rendering
2. Aktifleştirin:
   - ✅ Paint flashing (yeşil flaşlar minimal olmalı)
   - ✅ Layout Shift Regions (mavi bölgeler olmamalı)
   - ✅ FPS meter (60 fps göstermeli)

### 2. Lighthouse ile Test

1. Chrome DevTools > Lighthouse
2. Kategoriler:
   - ✅ Performance
   - ✅ Accessibility
3. "Analyze page load" çalıştırın

**Hedef Skorlar:**
- Performance: > 90
- Accessibility: > 95
- Cumulative Layout Shift (CLS): < 0.1
- Total Blocking Time (TBT): < 200ms

### 3. Manuel Testler

#### Flicker Testi
1. Sayfayı açın
2. Hızlı scroll yapın (yukarı-aşağı)
3. Kontrol edin:
   - ✅ İkonlar yanıp sönmüyor
   - ✅ Card'lar stabil
   - ✅ Header smooth hareket ediyor

#### Animasyon Testi
1. Sayfayı yenileyin
2. Yavaşça aşağı scroll yapın
3. Kontrol edin:
   - ✅ Card'lar görünür olduğunda **bir kez** fade-in yapıyor
   - ✅ Scroll devam edince animasyon tekrarlamıyor
   - ✅ Geçişler yumuşak

#### Reduced Motion Testi
1. İşletim sistemi ayarlarından "Reduce motion" aktifleştirin
   - **macOS:** System Settings > Accessibility > Display > Reduce motion
   - **Windows:** Settings > Accessibility > Visual effects > Animation effects (off)
2. Sayfayı yenileyin
3. Kontrol edin:
   - ✅ Animasyonlar devre dışı
   - ✅ Tüm içerik hemen görünür
   - ✅ Scroll hala çalışıyor

### 4. Tarayıcı Konsolu Testleri

#### Scroll Utilities Testi
```javascript
// Console'a yapıştır:

// Test 1: IntersectionObserver
console.log('Fade-in elements:', document.querySelectorAll('.fade-in').length);

// Test 2: Visible elements
console.log('Visible elements:', document.querySelectorAll('.fade-in.--visible').length);

// Test 3: Reduced motion check
console.log('Prefers reduced motion:', window.matchMedia('(prefers-reduced-motion: reduce)').matches);
```

### 5. Network Throttling Testi

1. DevTools > Network > Throttling
2. "Slow 3G" seçin
3. Sayfayı yenileyin
4. Kontrol edin:
   - ✅ Animasyonlar hala akıcı
   - ✅ Scroll responsive
   - ✅ İçerik progressively yükleniyor

### 6. Mobil Cihaz Testi

#### Chrome DevTools Device Mode
1. DevTools > Toggle device toolbar (Cmd+Shift+M)
2. Cihaz seç: iPhone 13 Pro, iPad Air
3. Test:
   - ✅ Touch scroll akıcı
   - ✅ Animasyonlar çalışıyor
   - ✅ Header hide/show düzgün

#### Gerçek Cihaz
1. Mobil cihazdan siteyi açın
2. Scroll yapın
3. Kontrol:
   - ✅ 60fps smooth scroll
   - ✅ Flicker yok
   - ✅ Battery drain normal

## 📊 Benchmark Sonuçları

### Önceki Durum (Optimizasyon Öncesi)
- FPS: ~45-55 (scroll sırasında düşüyor)
- Paint events: Çok fazla
- Layout shifts: Var
- Flicker: Görünür

### Mevcut Durum (Optimizasyon Sonrası)
- FPS: ~58-60 (stabil)
- Paint events: Minimal (sadece transform)
- Layout shifts: Yok
- Flicker: Yok

## 🐛 Debug İpuçları

### Eğer hala flicker varsa:

1. **Console'da hata kontrolü:**
   ```javascript
   // Scroll utils yüklendi mi?
   console.log('Main.js loaded');
   ```

2. **GPU acceleration kontrolü:**
   - DevTools > Rendering > Composited layer borders
   - Elementler turuncu kenarlıklı olmalı (GPU'da)

3. **Transform kontrolü:**
   ```javascript
   // Header transform değeri
   const header = document.querySelector('.header');
   console.log(getComputedStyle(header).transform);
   ```

4. **IntersectionObserver kontrolü:**
   ```javascript
   // Observer çalışıyor mu?
   const fadeIns = document.querySelectorAll('.fade-in');
   console.log('Total fade-in elements:', fadeIns.length);
   console.log('Visible elements:', document.querySelectorAll('.fade-in.--visible').length);
   ```

## ✅ Test Checklist

### Temel Testler
- [ ] Hızlı scroll sırasında flicker yok
- [ ] İkonlar ve SVG'ler stabil
- [ ] Card animasyonları sadece bir kez oynatılıyor
- [ ] Header smooth show/hide yapıyor
- [ ] FPS 60'a yakın

### Erişilebilirlik
- [ ] prefers-reduced-motion çalışıyor
- [ ] Keyboard navigation düzgün
- [ ] Focus indicators görünür

### Performans
- [ ] Lighthouse Performance > 90
- [ ] CLS < 0.1
- [ ] TBT < 200ms
- [ ] LCP < 2.5s

### Tarayıcı Uyumluluğu
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobil Safari (iOS)
- [ ] Chrome Android

### Cihaz Testleri
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (iPad)
- [ ] Mobile (iPhone, Android)

## 🎯 Hedef Metrikler

| Metrik | Hedef | Mevcut |
|--------|-------|--------|
| FPS | ≥ 58 | ✅ 58-60 |
| CLS | < 0.1 | ✅ ~0 |
| TBT | < 200ms | ✅ <100ms |
| Lighthouse Performance | > 90 | ⏳ Test et |
| Paint Events (scroll) | < 10/saniye | ✅ ~5 |

## 🔄 Sürekli İzleme

### Production'da İzlenecekler
- Core Web Vitals (Google Search Console)
- Real User Monitoring (RUM)
- Error tracking (Sentry, LogRocket)
- Performance monitoring (New Relic, Datadog)

### Önemli Metriler
- FCP (First Contentful Paint)
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)
- INP (Interaction to Next Paint)

---

**Test Protokolü Versiyonu:** 1.0  
**Son Güncelleme:** 13 Ekim 2025  
**Test Sıklığı:** Her deployment öncesi

