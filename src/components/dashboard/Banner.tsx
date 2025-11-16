import { BellRing } from "lucide-react";

export default function Banner() {
  return (
    <div className="relative flex items-center gap-x-6 overflow-hidden px-6 py-6 rounded-xl border bg-[#001633]/5 border-[#001633]/20">
      <div className=" w-full items-center gap-y-4">
        <span>
          <strong className="font-heading text-base">We're Live</strong>
          <br />
          <p className="mt-1 mb-5">
            Provolo is Live on Product Hunt! Help us spread the word.
          </p>

          <a
            href="https://www.producthunt.com/products/provolo?launch=provolo&utm_source=twitter&utm_medium=social"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-none rounded-md bg-black px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-black/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            🔥 Upvote
          </a>
        </span>
      </div>

      <div className=" flex-1 justify-end relative">
        <BellRing
          size={90}
          opacity={0.2}
          className="rotate-12 text-[#001633] absolute right-2 top-0.5"
        />
        <BellRing
          size={90}
          opacity={0.5}
          className="rotate-12 text-[#001633]"
        />
      </div>
    </div>
  );
}
