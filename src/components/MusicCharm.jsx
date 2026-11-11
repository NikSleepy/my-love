import Icon from './Icon.jsx'
import { useHeartBurst } from './HeartBurstProvider.jsx'
import { useAmbientMusic } from '../hooks/useAmbientMusic.js'

export default function MusicCharm() {
  const { isPlaying, toggle } = useAmbientMusic()
  const burst = useHeartBurst()

  const handleToggle = (event) => {
    toggle()
    const rect = event.currentTarget.getBoundingClientRect()
    burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 8)
  }

  return (
    <aside className="fixed right-4 top-4 z-40">
      <button
        type="button"
        aria-label={isPlaying ? 'Matikan Musik Romantis' : 'Nyalakan Musik Romantis'}
        aria-pressed={isPlaying}
        onClick={handleToggle}
        className={`group relative flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-lowest/80 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-110 active:scale-95 ${
          isPlaying ? 'text-on-surface-variant' : 'text-primary'
        }`}
      >
        <Icon
          name={isPlaying ? 'music_off' : 'music_note'}
          filled
          className="text-[20px] transition-transform duration-500"
        />
        <span className="absolute -right-1 -top-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-container opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
        </span>
      </button>
    </aside>
  )
}
