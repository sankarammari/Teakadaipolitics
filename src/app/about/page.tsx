import Link from "next/link";
import { ContentTypeBadge } from "@/components/common/ContentTypeBadge";
import { PageIntro } from "@/components/common/PageIntro";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "எங்களைப் பற்றி",
  description: "டீக்கடை அரசியல் ஏன் தொடங்கப்பட்டது; செய்தி, பகுப்பாய்வு, கருத்து ஆகியவற்றை எப்படிப் பிரித்துக் காட்டுகிறோம்.",
  path: "/about",
});

const h2 = "headline pt-4 font-sans text-[1.6rem]";

export default function AboutPage() {
  return (
    <>
      <PageIntro title="டீக்கடை அரசியல் பற்றி" />
      <div className="container-page">
        <div className="prose-body space-y-6">
          <p className="text-[1.2rem]">
            தமிழ்நாட்டில் அரசியல் எப்போதும் டீக்கடையில்தான் விவாதிக்கப்படுகிறது. ஒருவர் செய்தித்தாளை உரக்கப்
            படிப்பார், இன்னொருவர் மறுப்பார், இரண்டாவது கிளாஸ் டீ வருவதற்குள் பெஞ்சு முழுவதற்கும் ஒரு கருத்து
            உருவாகிவிடும். அந்த உரையாடலை, அதற்குத் தகுந்த செய்தியாக்கத்தோடும் சான்றுகளோடும், இணையத்துக்குக்
            கொண்டுவருவதே டீக்கடை அரசியல்.
          </p>

          <h2 className={h2}>நாங்கள் வெளியிடுவது</h2>
          <p>
            தமிழ்நாட்டு நடப்பு நிகழ்வுகள், மாநில அரசுக் கொள்கைகள், பொது நிர்வாகம் பற்றிய விளக்கங்கள், தேர்தல்
            பகுப்பாய்வு, கருத்துக் கட்டுரைகள், எங்கள் யூடியூப் சேனலில் வீடியோ விவாதங்கள்.
          </p>

          <h2 className={h2}>எங்களை எப்படிப் படிப்பது</h2>
          <p>நீங்கள் எந்த வகை எழுத்தைப் படிக்கிறீர்கள் என்று எப்போதும் தெரிய, ஒவ்வொரு கட்டுரைக்கும் மூன்றில் ஒரு அடையாளம் உண்டு.</p>
          <dl className="space-y-4 font-sans">
            <div>
              <dt><ContentTypeBadge type="news" /></dt>
              <dd className="mt-1 font-serif">நடந்ததைச் சொல்கிறது. தகவல்களுக்கு ஆதாரம் உண்டு; கூற்றுகள், கூறியவரின் பெயரோடு வரும்.</dd>
            </div>
            <div>
              <dt><ContentTypeBadge type="analysis" /></dt>
              <dd className="mt-1 font-serif">சான்றுகள் என்ன சொல்கின்றன என்று விளக்குகிறது. நீங்களே சரிபார்க்கும்படி காரணங்களைக் காட்டுகிறது.</dd>
            </div>
            <div>
              <dt><ContentTypeBadge type="opinion" /></dt>
              <dd className="mt-1 font-serif">ஒரு நிலைப்பாட்டை வாதிடுகிறது. அது கட்டுரையாளரின் கருத்து; உண்மை அறிக்கையோ இதழின் நிலைப்பாடோ அல்ல.</dd>
            </div>
          </dl>

          <h2 className={h2}>திருத்தங்கள்</h2>
          <p>
            தவறு நேர்ந்தால் திருத்துவோம்; கட்டுரையில் புதுப்பித்த தேதியைக் காட்டுவோம். பிழையைச் சுட்டிக்காட்ட,{" "}
            <Link href="/contact" className="font-semibold text-tea underline underline-offset-2">
              ஆசிரியர் குழுவைத் தொடர்புகொள்ளுங்கள்
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
