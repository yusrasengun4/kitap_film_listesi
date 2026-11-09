# kitap_film_listesi
Okuduğum/okumak istediğim kitapları ve izlediğim/izlemek istediğim filmleri takip edebildiğim, React ile geliştirdiğim bir web uygulaması.

🔗 **Canlı demo:** https://kitapfilmlistesi.netlify.app/

## Özellikler
- Kullanıcı kaydı ve girişi (her kullanıcının listesi ayrı tutulur)
- Kitap ve film ekleme, düzenleme, silme (CRUD)
- Durum takibi: okunacak / okunuyor / okundu, izlenecek / izleniyor / izlendi
- Tıklanabilir yıldız puanı (1-5),yazar/yönetmen, yıl ve kişisel not alanları
- Başlığa ve yazar/yönetmene göre arama, duruma göre filtreleme
- Dashboard: genel ilerleme, kitap ve film için ayrı istatistikler, durum dağılımı
- Profil sayfası: en yüksek puanlı kitaplar ve filmler

## Ekran Görüntüleri
<img width="1353" height="801" alt="Ekran görüntüsü 2026-11-09 221126" src="https://github.com/user-attachments/assets/255764cb-4a7d-4c67-9da4-15e4d91c497d" />
<img width="1382" height="856" alt="Ekran görüntüsü 2026-11-09 221138" src="https://github.com/user-attachments/assets/bce2e986-4650-47bc-97c0-73e3e434eedb" />
<img width="1411" height="869" alt="image" src="https://github.com/user-attachments/assets/ea343fca-f58c-46ed-8194-0ca69922acbd" />
<img width="1389" height="680" alt="Ekran görüntüsü 2026-11-09 221201" src="https://github.com/user-attachments/assets/f27382a4-e1a6-4ecb-a843-870e52dad415" />

## Kullanılan Teknolojiler

- [React](https://react.dev/) (hook'lar, Context API)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Bootstrap 5](https://getbootstrap.com/)
- Tarayıcı `localStorage`'ı (veri saklama)

## Kurulum
```bash
git clone https://github.com/yusrasengun4/kitap-film-listesi.git
cd kitap_film_listesi
npm install
npm run dev
```
Uygulama `http://localhost:5173` adresinde açılır. Üretim derlemesi için `npm run build`.

## Proje Yapısı
```
src/
├─ components/   # Navbar, MediaForm, MediaList, MediaItem, FilterBar, StarRating, ProtectedRoute
├─ context/      # AuthContext (giriş durumu)
├─ hooks/        # useLocalStorage
├─ pages/        # Dashboard, MediaPage, Profile, Login
├─ constants.js  # Türler, durumlar, renkler
└─ App.jsx
```
## Bilinen Sınırlamalar

- Veriler ve kullanıcı hesapları tarayıcının `localStorage`'ında tutulur. Bu yüzden farklı cihaz ve tarayıcılar arasında paylaşılmaz.
- Giriş sistemi öğrenme amaçlıdır, gerçek güvenlik sağlamaz. Gerçek bir sürüm için bir backend gerekir.


