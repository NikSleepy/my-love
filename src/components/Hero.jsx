import Icon from './Icon.jsx'

export default function Hero({ onOpenLetter }) {
  const handleEnvelopeKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpenLetter()
    }
  }

  return (
    <section id="hero-section" className="relative flex flex-col items-center pt-3 text-center">
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-flex -rotate-2 items-center gap-1 rounded-full bg-primary-fixed px-3 py-1 font-label-sm text-label-sm text-on-primary-fixed shadow-sm">
          <Icon name="auto_awesome" className="text-[14px]" />
          Ada pesan kecil
        </span>
        <span className="inline-flex rotate-3 items-center gap-1 rounded-full bg-secondary-fixed px-3 py-1 font-label-sm text-label-sm text-on-secondary-fixed shadow-sm">
          <Icon name="sentiment_satisfied" className="text-[14px]" />
          Dibuat khusus
        </span>
      </div>

      <h1 className="mb-2 font-headline-lg-mobile text-headline-lg-mobile tracking-normal text-on-surface">
        Hai,{' '}
        <span className="text-primary underline decoration-primary-container decoration-wavy decoration-2">
          Indah
        </span>
        ! 👋
      </h1>
      <p className="mb-6 max-w-xs font-body-md text-body-md leading-relaxed text-on-surface-variant">
        Aku bikin sesuatu kecil buat kamu. Santai aja, bacanya nggak lama kok 😊
      </p>

      <div
        id="envelope-trigger"
        role="button"
        tabIndex={0}
        aria-label="Buka pesan untukmu"
        onClick={onOpenLetter}
        onKeyDown={handleEnvelopeKeyDown}
        className="group relative my-4 cursor-pointer outline-none"
      >
        <div className="absolute inset-0 scale-110 rounded-3xl bg-primary-container/40 blur-2xl transition-transform group-hover:scale-125" />
        <div className="relative flex h-48 w-64 flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-surface-container-lowest to-primary-fixed/40 p-5 shadow-xl transition-all duration-300 group-hover:-translate-y-1 group-focus-visible:ring-4 group-focus-visible:ring-primary-container/60">
          <div className="absolute -top-3 left-1/2 flex h-6 w-24 -translate-x-1/2 -rotate-1 items-center justify-center rounded-sm bg-secondary-container/70 opacity-90 shadow-sm">
            <div className="w-full border-t-2 border-dashed border-surface-container-lowest/60" />
          </div>
          <div className="mb-2 flex h-20 w-20 animate-bounce items-center justify-center rounded-full bg-primary-fixed shadow-inner">
            <Icon name="mark_email_unread" filled className="text-4xl text-primary" />
          </div>
          <span className="flex items-center gap-1 font-label-md text-label-md tracking-wide text-primary">
            Ketuk untuk buka
            <Icon name="touch_app" className="text-sm" />
          </span>
        </div>
      </div>

      <button
        type="button"
        id="open-letter-btn"
        onClick={onOpenLetter}
        className="mt-4 flex items-center gap-2 rounded-full bg-primary-container px-8 py-3.5 font-label-lg text-label-lg text-on-primary-container shadow-lg shadow-primary-container/50 transition-all duration-300 hover:bg-primary hover:text-on-primary active:scale-95"
      >
        <Icon name="mail" filled className="text-xl" />
        Buka pesannya ✨
      </button>
    </section>
  )
}