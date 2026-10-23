import { DraftNotice } from "@/components/common/DraftNotice";
import { PageIntro } from "@/components/common/PageIntro";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "தனியுரிமைக் கொள்கை (வரைவு)",
  description: "Teakadai Politics தளத்தின் வரைவுத் தனியுரிமைக் கொள்கை.",
  path: "/privacy-policy",
});

const h2 = "headline pt-4 font-sans text-[1.5rem]";

export default function PrivacyPage() {
  return (
    <>
      <PageIntro title="தனியுரிமைக் கொள்கை" />
      <div className="container-page">
        <div data-anim-children="fadeUp" className="prose-body space-y-5">
          <DraftNotice>
            <strong>வரைவு; இன்னும் நடைமுறையில் இல்லை.</strong> தளம் இப்போது செயல்படும் விதத்தை விவரிக்கும் தற்காலிக
            உரை இது. வெளியீட்டுக்கு முன், இதழின் உண்மையான நடைமுறைகள், டிஜிட்டல் தனிநபர் தரவுப் பாதுகாப்புச் சட்டம்
            2023 உள்ளிட்ட பொருந்தும் சட்டங்கள் அடிப்படையில் இது சரிபார்க்கப்பட வேண்டும்.
          </DraftNotice>

          <h2 className={h2}>இப்போது தளம் சேகரிப்பவை</h2>
          <p>
            இந்தத் தளத்தில் கணக்குகள், கருத்துப் பதிவுகள், செய்திமடல் எதுவும் இல்லை. தேடல் பெட்டியிலோ தொடர்புப்
            படிவத்திலோ நீங்கள் தட்டச்சு செய்வதை எங்கள் சர்வர்களில் சேமிப்பதில்லை. மின்னஞ்சல் சேவை இணைக்கப்படும்
            வரை தொடர்புப் படிவம் செய்திகளை அனுப்பாது; உங்கள் சொந்த மின்னஞ்சல் செயலியை மட்டுமே திறக்கும்.
          </p>

          <h2 className={h2}>உட்பொதிந்த வீடியோக்கள்</h2>
          <p>
            வீடியோக்கள் யூடியூபில் உள்ளன. நீங்கள் இயக்கு பொத்தானை அழுத்தும் வரை பிளேயர் ஏற்றப்படாது; அதன்பின்
            யூடியூபின் தனியுரிமை மேம்பட்ட பயன்முறையைப் பயன்படுத்தும். வீடியோ ஓடத் தொடங்கியதும் யூடியூபின்
            தனியுரிமைக் கொள்கை பொருந்தும்.
          </p>

          <h2 className={h2}>ஹோஸ்டிங்</h2>
          <p>
            பாதுகாப்புக்கும் நம்பகத்தன்மைக்கும், எங்கள் ஹோஸ்டிங் நிறுவனம் IP முகவரி, கோரப்பட்ட பக்கங்கள் போன்ற
            வழக்கமான சர்வர் பதிவுகளை வைத்திருக்கலாம்.
          </p>

          <h2 className={h2}>தொடர்புக்கு</h2>
          <p>
            தனியுரிமை பற்றிய கேள்விகளை{" "}
            <a className="text-tea underline" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>{" "}
            முகவரிக்கு அனுப்பலாம்.
          </p>
        </div>
      </div>
    </>
  );
}
