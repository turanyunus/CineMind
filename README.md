# Film ve Dizi Öneri Asistanı

Bu proje, kullanıcıların ruh hallerine ve izleme geçmişlerine göre kişiselleştirilmiş film ve dizi önerileri sunan bir web uygulamasıdır.

## Özellikler

- 🎭 Ruh haline göre film/dizi önerileri
- 🔐 Google ve GitHub ile kimlik doğrulama
- 📝 İzleme listeleri oluşturma
- 🎬 Detaylı film/dizi bilgileri
- 🤖 AI destekli öneri sistemi

## Teknolojiler

- Next.js 14
- TypeScript
- Prisma
- PostgreSQL
- NextAuth.js
- Shadcn UI
- TMDB API

## Kurulum

1. Projeyi klonlayın:

```bash
git clone https://github.com/yourusername/movie-recommendations.git
cd movie-recommendations
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. `.env` dosyasını oluşturun ve gerekli değişkenleri ayarlayın:

```env
DATABASE_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
TMDB_API_KEY=
```

4. Veritabanı şemasını oluşturun:

```bash
npx prisma db push
```

5. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

## Kullanım

1. Ana sayfada trend filmleri görüntüleyin
2. Giriş yaparak kişiselleştirilmiş öneriler alın
3. Ruh halinizi seçin ve size özel film önerileri alın
4. İzlediğiniz veya izlemek istediğiniz filmleri listenize ekleyin

## Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Bir Pull Request oluşturun
