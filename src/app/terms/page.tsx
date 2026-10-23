import { DraftNotice } from "@/components/common/DraftNotice";
import { PageIntro } from "@/components/common/PageIntro";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "விதிமுறைகள் (வரைவு)",
  description: "Teakadai Politics தளத்தின் வரைவுப் பயன்பாட்டு விதிமுறைகள்.",
  path: "/terms",
});

const h2 = "headline pt-4 font-sans text-[1.5rem]";

export default function TermsPage() {
  return (
    <>
      <PageIntro title="பயன்பாட்டு விதிமுறைகள்" />
      <div className="container-page">
        <div data-anim-children="fadeUp" className="prose-body space-y-5">
          <DraftNotice>
            <strong>வரைவு; இன்னும் நடைமுறையில் இல்லை.</strong> இவை தற்காலிக விதிமுறைகள். வெளியீட்டுக்கு முன், இதழுக்கு
            ஆலோசனை வழங்கத் தகுதியுள்ள ஒருவர் இவற்றைச் சரிபார்க்க வேண்டும்.
          </DraftNotice>

          <h2 className={h2}>தளத்தைப் பயன்படுத்துதல்</h2>
          <p>
            எங்கள் கட்டுரைகளையும் வீடியோக்களையும் தனிப்பட்ட, வணிக நோக்கமற்ற பயன்பாட்டுக்காகப் படிக்கலாம்; அவற்றின்
            இணைப்புகளைப் பகிரலாம். முழுக் கட்டுரையை மறுபிரசுரம் செய்ய எழுத்துப்பூர்வ அனுமதி தேவை.
          </p>

          <h2 className={h2}>உள்ளடக்க அடையாளங்கள்</h2>
          <p>
            கட்டுரைகள் செய்தி, பகுப்பாய்வு, கருத்து என அடையாளமிடப்படுகின்றன. கருத்துக் கட்டுரைகள் அவற்றை
            எழுதியவர்களின் பார்வை; இதழின் நிலைப்பாடு அல்ல.
          </p>

          <h2 className={h2}>வெளி இணைப்புகள்</h2>
          <p>
            எங்கள் கட்டுப்பாட்டில் இல்லாத ஆதாரங்களுக்கும் சமூக ஊடகங்களுக்கும் இணைப்பு தருகிறோம். அவற்றின்
            உள்ளடக்கமும் கொள்கைகளும் அவற்றுக்கே உரியவை.
          </p>

          <h2 className={h2}>மாற்றங்கள்</h2>
          <p>இந்த விதிமுறைகளை நாங்கள் புதுப்பிக்கலாம். சமீபத்திய பதிப்பின் தேதி இந்தப் பக்கத்தில் காட்டப்படும்.</p>
        </div>
      </div>
    </>
  );
}
