import Link from "next/link";
import { HeaderSearch } from "@/components/layout/HeaderSearch";

export const metadata = { title: "பக்கம் கிடைக்கவில்லை" };

export default function NotFound() {
  return (
    <div data-anim-children="fadeUp" className="container-page py-20 md:py-28">
      <p className="text-lg font-bold text-tea">404</p>
      <h1 className="headline mt-2 text-[2.3rem] md:text-[3.2rem]">இந்தப் பக்கம் இங்கே இல்லை</h1>
      <p className="mt-3 max-w-xl text-lg text-ink-soft">
        இணைப்பு பழையதாக இருக்கலாம், அல்லது கட்டுரை வேறு இடத்துக்கு மாறியிருக்கலாம். தேடிப் பாருங்கள், அல்லது சமீபத்திய செய்திகளிலிருந்து தொடங்குங்கள்.
      </p>
      <div className="mt-8 max-w-sm">
        <HeaderSearch id="notfound-search" />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="rounded-full bg-night px-5 py-2.5 font-semibold text-on-night hover:bg-night/85">
          முகப்புப் பக்கம்
        </Link>
        <Link href="/articles" className="rounded-full border-2 border-ink px-5 py-2 font-semibold hover:bg-night hover:text-on-night">
          எல்லாக் கட்டுரைகளும்
        </Link>
      </div>
    </div>
  );
}
