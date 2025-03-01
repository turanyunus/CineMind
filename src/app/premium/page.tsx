import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const plans = [
  {
    name: "Temel",
    price: "Ücretsiz",
    description: "Temel özellikler",
    features: [
      "Film ve dizi önerileri",
      "Kişisel izleme listesi",
      "Temel yorum yapma",
      "Sınırlı içerik erişimi",
    ],
  },
  {
    name: "Premium",
    price: "₺49.99/ay",
    description: "Tüm özelliklere erişim",
    features: [
      "Tüm temel özellikler",
      "Reklamsız deneyim",
      "Özel film koleksiyonları",
      "Erken erişim içerikleri",
      "Özel etkinlik davetiyeleri",
      "Premium rozet",
      "7/24 öncelikli destek",
      "Özel anketler oluşturma",
    ],
    popular: true,
  },
  {
    name: "Yıllık Premium",
    price: "₺499.99/yıl",
    description: "2 ay bedava",
    features: [
      "Tüm Premium özellikler",
      "2 ay ücretsiz kullanım",
      "Özel film tavsiyeleri",
      "VIP etkinlik davetiyeleri",
      "Yıllık üye rozeti",
      "Film festivali biletleri",
      "Özel film koleksiyonları",
      "Sınırsız anket oluşturma",
    ],
  },
];

export default function PremiumPage() {
  return (
    <Layout>
      <main className="bg-gradient-to-br from-background to-primary/5 py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Premium Üyelik</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Film deneyiminizi bir üst seviyeye taşıyın. Premium üyelik ile tüm
              özelliklere erişin ve ayrıcalıklı içeriklerin keyfini çıkarın.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.popular
                    ? "border-primary shadow-lg scale-105 z-10"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      En Popüler
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">{plan.price}</div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular ? "bg-primary hover:bg-primary/90" : ""
                    }`}
                  >
                    {plan.name === "Temel" ? "Ücretsiz Başla" : "Şimdi Katıl"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Sıkça Sorulan Sorular
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Premium üyeliği nasıl iptal edebilirim?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Premium üyeliğinizi hesap ayarlarınızdan istediğiniz zaman
                  iptal edebilirsiniz. İptal işlemi sonrası dönem sonuna kadar
                  premium özellikleri kullanmaya devam edebilirsiniz.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Ödeme yöntemleri nelerdir?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Kredi kartı, banka kartı ve PayPal ile ödeme yapabilirsiniz.
                  Tüm ödemeler güvenli bir şekilde işlenir ve bilgileriniz
                  korunur.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Premium içerikler nelerdir?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Premium üyeler özel film koleksiyonlarına, erken erişim
                  içeriklerine, özel etkinliklere ve daha fazlasına erişebilir.
                  Ayrıca reklamsız bir deneyim ve 7/24 öncelikli destek hizmeti
                  sunuyoruz.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
