import Icon from './Icon.jsx'

const REASONS = [
  {
    icon: 'record_voice_over',
    title: 'Suara Lembutmu 🎧',
    description:
      'Cara kamu ngomong itu lembut dan menenangkan. Dengerin kamu cerita tuh enak banget.',
    iconWrapper: 'bg-primary-fixed text-primary',
    tape: 'bg-tertiary-fixed/80',
  },
  {
    icon: 'mood',
    title: 'Kamu Imut Banget 🐣',
    description:
      'Ada aja tingkah kecilmu yang bikin aku senyum sendiri. Nggak dibuat-buat, jadi makin imut.',
    iconWrapper: 'bg-secondary-fixed text-secondary',
    tape: 'bg-primary-fixed/80',
  },
  {
    icon: 'volunteer_activism',
    title: 'Baik & Perhatian 🤍',
    description:
      'Kamu peduli sama hal-hal kecil dan bikin orang di sekitarmu merasa dihargai. Aku notice itu, lho.',
    iconWrapper: 'bg-tertiary-fixed text-tertiary',
    tape: 'bg-secondary-fixed/80',
  },
  {
    icon: 'sentiment_very_satisfied',
    title: 'Kamu Lucu 😆',
    description:
      'Ngobrol sama kamu nggak pernah garing. Ada aja yang bikin aku ketawa.',
    iconWrapper: 'bg-primary-fixed text-primary',
    tape: 'bg-tertiary-fixed/80',
  },
  {
    icon: 'auto_awesome',
    title: 'Cantik Apa Adanya ✨',
    description:
      'Bukan cuma soal penampilan, tapi cara kamu bawa diri yang hangat dan tulus bikin kamu enak dilihat.',
    iconWrapper: 'bg-secondary-fixed text-secondary',
    tape: 'bg-primary-fixed/80',
  },
  {
    icon: 'chat_bubble',
    title: 'Enak Diajak Ngobrol 💬',
    description:
      'Dari topik receh sampai obrolan serius, aku nyaman jadi diri sendiri kalau lagi sama kamu.',
    iconWrapper: 'bg-tertiary-fixed text-tertiary',
    tape: 'bg-secondary-fixed/80',
  },
]

export default function Reasons() {
  return (
    <section className="relative flex flex-col space-y-5">
      {/* Dekorasi latar */}
      <div className="pointer-events-none absolute -left-6 top-10 h-24 w-24 rounded-full bg-primary-container/30 blur-2xl" />
      <div className="pointer-events-none absolute -right-6 top-1/2 h-28 w-28 rounded-full bg-secondary-container/30 blur-2xl" />

      <div className="relative space-y-1.5 text-center">
        <span className="inline-flex items-center gap-1 rounded-full bg-primary-fixed px-3 py-1 font-label-sm text-label-sm font-bold uppercase tracking-widest text-on-primary-fixed shadow-sm">
          <Icon name="auto_awesome" className="text-[13px]" />
          Sedikit dari banyak
        </span>
        <h2 className="font-headline-md text-headline-md text-on-surface">
          Hal yang Aku Suka dari{' '}
          <span className="text-primary underline decoration-primary-container decoration-wavy decoration-2 underline-offset-4">
            Kamu
          </span>{' '}
          💭
        </h2>
      </div>

      <div className="relative space-y-4">
        {REASONS.map((reason, index) => (
          <div
            key={reason.title}
            style={{ animationDelay: `${index * 120}ms` }}
            className={`animate-fade-up group relative flex items-start gap-3.5 rounded-2xl border border-white/60 bg-gradient-to-br from-surface-container-lowest/95 to-surface-container-low/70 p-4 pt-5 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-xl motion-reduce:animate-none ${
              index % 2 === 0 ? '-rotate-1' : 'rotate-1'
            }`}
          >
            {/* Tape dekoratif */}
            <div
              className={`absolute -top-2 ${
                index % 2 === 0 ? 'left-6 -rotate-3' : 'right-6 rotate-3'
              } h-4 w-12 rounded-sm shadow-sm ${reason.tape}`}
            />

            {/* Nomor kecil */}
            <span className="absolute right-3 top-2.5 font-label-sm text-label-sm font-bold text-on-surface-variant/40">
              {String(index + 1).padStart(2, '0')}
            </span>

            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-inner ring-4 ring-white/70 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${reason.iconWrapper}`}
            >
              <Icon name={reason.icon} filled className="text-xl" />
            </div>

            <div className="pr-4">
              <h3 className="mb-0.5 font-label-lg text-label-lg text-on-surface">
                {reason.title}
              </h3>
              <p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                {reason.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex justify-center pt-2">
        <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary-fixed to-secondary-fixed px-4 py-2 font-label-sm text-label-sm text-on-primary-fixed shadow-lg">
          <Icon name="stars" filled className="animate-pulse text-[15px] text-primary" />
          Masih ada beberapa lagi, nanti kuceritain pelan-pelan 😄
        </div>
      </div>
    </section>
  )
}