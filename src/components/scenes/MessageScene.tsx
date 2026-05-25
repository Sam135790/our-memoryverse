import { useState } from "react";
import { motion } from "framer-motion";
import { DustParticles, Fog, MoonGlow, StarField } from "@/components/atmosphere/Atmosphere";

const message = `Hey darling, 🥺❤️

Innaiyoda namma pesa start panni 2 years aachu... aana ipothan pesa start panna maari iruku! 🙈 Intha 2 years laa evloooooooo memories! Ppaahh... nenachale magical aa irukuu... ✨💫

Intha 2 yrs la evlooo Sanda potrupom, ethana breakup vanthirukum, evloooo time Naan una hurt pannirupen, evloo ala vachirupen, ethana time purinjikama pesirupen... ithu ellathaiyummm enakagaa poruthukittu, intha min vara en kuda irukathuku 1st rombaaaaaaaaaaaaa periyaaaaaaaaaaa thanksssss! 🙏😭 I'll be grateful for this all my lifetime... ♾️❤️

And rombaaaaaaaaaaaaaaaaaaaaaaaaaa sryyyyyyyyyyyyyyyyyyyyyyyyy chloo! Intha 2 yrs la evlooo vo kashtapaduthirupen, ellathukum sryyyyyyy ammu... 😔💔 And thankkk youuu for making these 2 years of my life so beautiful; without you, it would have not been the same. 🌹🥰

Aprm unaku theriyuma nu thrlaa... Naan MBBS break eduthu padikirenu sonnapo, enga v2la ellarum manasu maatha thn paathanga. En confidence-ae poiruchu, maarirulaam nu thoniruchu oru time la... but neethn ena motivate panna! ✨💪 Eppaiyum pola Naan doctor aana, athuku full rsn neethn! Thankk youuu soo muchhh dear... You aree myy bigggesttttt motivator! 👩‍⚕️🩺 En 12th mark kuda unnala thn... Tamil-la antha 98, English-la antha 95... ellame unnala thn da! Nee illana my life would have been a mess, you made it beautiful with ur presence. Thank youuu soo muchhh darling... 💖✨

And intha 2 weeks rombaaaa kova pattuten, rombaa over aa pesite, neraiya ala vachuten, rombaaa kashtapaduthiten... 😢 Intha week full aa, pona week la konja naal full aa, intha video epd panrathunu full aa thonite irunthichu da... epd panrathu? ena panrathu nu yosichite irunthen. Intha video full aa athan panitu irunthen... epd panrathu, ena panrathu nu atha concentrate panitu, unna vittuten... thappu thn. 🙇‍♂️

Kochukatha... 'poiren poiren' nu thitunila, ithuku thn poven! Annaiku oru naal kochukitu pesalanu sanda vanthichu la... Naan eve full aa pesala, annaiku kovam athn pesalanu sonnen la... ithan panitu irunthen, unkita sollavum mudila. Ronald ta thn polambitu irunthen, 'dei solla mudila da, breakup nu solra da' nu... avan 'sari airum nee pannu' nu sonnan. Enaku bayam jecii... 😰💔

Kochukatha thangoo... Naan atha 23 kulla mudikanumnu unkita olunga pesama, una olunga convince pannama irunthuten... rombaaa periya thappu thn. Unakaga thn seirathe, unaiye olunga paathukala aana... 🤦‍♂️ Sryyyyyyy jeciii ma... Inime olunga paathukiren... olunga convince panren... kovatha korachukiren... 🥺🙏

Plssss jecii, ena vittu mattum poiratha da... Nee illama nenachu kuda paaka mudila da... Breakup nu eppaiyum solluva, intha time serious aa solriyo nu semmaaaa bayama irukuu da... 😭 Plsss vittu poiratha, knjm poruthuko, Naan olunga iruken inime... plsssss papa... 🥺✨

And ithu rombaa late aa intha surprise aa anupuren, kochukatha, knjm late airuchu... 😅 Once again thank you and sorryyy ammuu... I loveeeeee youuuuu always jaicia.... ♾️❤️❤️❤️`;

export const MessageScene = ({ onNext }: { onNext: () => void }) => {
  const [revealed, setRevealed] = useState(false);
  const paragraphs = message.split("\n\n");

  return (
    <section className="vignette relative flex min-h-screen flex-col items-center overflow-hidden bg-midnight px-4 py-20 text-center">
      <StarField count={100} />
      <Fog />
      <DustParticles count={35} />
      <MoonGlow className="left-1/2 top-10 -translate-x-1/2" />

      <motion.h2
        initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="font-display relative z-10 text-4xl italic text-starlight text-glow-moon md:text-6xl"
      >
        Before This Ends…
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6, duration: 1.6 }}
        className="font-script relative z-10 mt-4 max-w-md text-2xl text-moonlight/90"
      >
        there's something I need you to read…
      </motion.p>

      {!revealed ? (
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.4, duration: 1.4 }}
          onClick={() => setRevealed(true)}
          className="pulse-glow relative z-10 mt-12 rounded-full bg-gradient-romance px-10 py-4 font-display text-lg text-primary-foreground"
        >
          Open Letter
        </motion.button>
      ) : (
        <motion.article
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative z-10 mt-14 w-full max-w-2xl rounded-3xl border border-rose/20 bg-card/40 p-6 text-left backdrop-blur-xl shadow-glow-rose md:p-10"
        >
          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.4, duration: 1.2 }}
                className="font-hand text-xl leading-relaxed text-moonlight/95 md:text-2xl"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: paragraphs.length * 0.4 + 1, duration: 1.4 }}
            className="mt-10 flex justify-center"
          >
            <button
              onClick={onNext}
              className="pulse-glow rounded-full bg-gradient-romance px-10 py-4 font-display text-lg text-primary-foreground"
            >
              Forever, Then →
            </button>
          </motion.div>
        </motion.article>
      )}
    </section>
  );
};
