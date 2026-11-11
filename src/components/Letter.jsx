import Icon from './Icon.jsx'

export default function Letter({ letterRef }) {
  return (
    <section id="letter-section" ref={letterRef} className="relative flex flex-col pt-4 pb-24">
      <div className="relative rounded-2xl bg-surface-container-lowest/90 p-6 shadow-xl backdrop-blur-md sm:p-7">
        <div className="absolute -left-3 -top-3 h-5 w-16 -rotate-12 rounded-sm bg-tertiary-fixed/80 shadow-sm" />
        <div className="absolute -right-3 -top-2 h-5 w-14 rotate-6 rounded-sm bg-secondary-fixed/80 shadow-sm" />

        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 pb-3">
          <span className="flex items-center gap-1.5 font-headline-sm text-headline-sm text-primary">
            <Icon name="mail" filled className="text-xl text-primary" />
            Pesan Kecil Buatmu
          </span>
          <span className="rounded-full bg-surface-container px-2.5 py-1 font-label-sm text-label-sm text-on-surface-variant">
            Baca santai aja ya
          </span>
        </div>

        <div className="space-y-4 font-body-md text-body-md leading-relaxed text-on-surface-variant">
          <p>
            Mungkin ini agak tiba-tiba, tapi aku pengen bilang: dua minggu terakhir ini
            nyenengin banget, dan sebagian besar karena ngobrol sama kamu.
          </p>
          <p className="rounded-xl bg-surface-container-low/60 p-3.5">
            Dari obrolan random di pagi hari sampai cerita panjang pas malam, entah kenapa aku
            sering senyum sendiri baca balasanmu. Kamu enak banget diajak ngobrol, dan aku
            nyaman jadi diri sendiri kalau lagi sama kamu.
          </p>
          <p>
            Nggak ada maksud bikin kamu bingung atau harus jawab apa-apa kok. Aku cuma pengen
            kamu tahu kalau aku seneng bisa kenal kamu. Kalau kamu mau, kapan-kapan kita ngopi
            atau makan bareng ya, santai aja ☕
          </p>
        </div>

        <div className="mt-6 flex flex-col items-end pt-4 text-right">
          <span className="font-body-sm text-body-sm italic text-on-surface-variant">
            Salam hangat,
          </span>
          <span className="mt-0.5 flex items-center gap-1 font-label-lg text-label-lg text-primary">
            Nicry 🌷
          </span>
        </div>
      </div>
    </section>
  )
}