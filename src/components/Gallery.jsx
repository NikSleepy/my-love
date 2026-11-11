const MEMORIES = [
  {
    src: '/images/first.jpeg',
    alt: 'Ilustrasi pasangan kekasih berbagi es krim di sore hari yang cerah, bernuansa pastel',
    caption: 'Hari pertama kita jalan berdua 🍦',
    rotate: '-rotate-2',
    tape: 'rotate-3 bg-primary-fixed/80',
  },
  {
    src: '/images/siluet.jpeg',
    alt: 'Ilustrasi seorang gadis tersenyum bahagia sambil memegang cangkir kopi di kafe pastel',
    caption: 'Waktu kamu ketawa denger lelucon garingku 🤭',
    rotate: 'rotate-2',
    tape: '-rotate-2 bg-secondary-fixed/80',
  },
  {
    src: '/images/nonton.jpeg',
    alt: 'Foto selfie di cermin saat nonton bareng di bioskop',
    caption: 'Nonton bareng, seru banget 🍿',
    rotate: '-rotate-1',  
    tape: 'rotate-1 bg-tertiary-fixed/80',
  },
  {
    src: '/images/foto_selvie.jpeg',
    alt: 'Ilustrasi close-up mata berbinar dan senyum malu yang hangat, dikelilingi kilau pastel',
    caption: 'Senyum kamu yang selalu bikin candu ✨',
    rotate: 'rotate-1',
    tape: '-rotate-3 bg-secondary-container/80',
  },
]

export default function Gallery() {
  return (
    <section className="flex flex-col space-y-4">
      <div className="space-y-1 text-center">
        <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-primary">
          Momen Berharga
        </span>
        <h2 className="font-headline-md text-headline-md text-on-surface">Galeri Kecil Kita 📸</h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Setiap detik sama kamu selalu jadi memori favoritku.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 pt-2 sm:grid-cols-2">
        {MEMORIES.map((memory) => (
          <figure
            key={memory.src}
            className={`relative rounded-2xl bg-surface-container-lowest p-3 pb-5 shadow-md transition-transform duration-300 hover:rotate-0 ${memory.rotate}`}
          >
            <div
              className={`absolute -top-3 left-1/2 h-4 w-14 -translate-x-1/2 rounded-sm shadow-sm ${memory.tape}`}
            />
            <div className="mb-3 h-44 w-full overflow-hidden rounded-xl bg-surface-container">
              <img
                src={memory.src}
                alt={memory.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="px-1 text-center font-label-md text-label-md text-on-surface">
              {memory.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
