import type { Logo } from '../data/logos'

const tones = {
  light: 'brightness-0 invert',
  dark: 'brightness-0',
  color: '',
}

export default function LogoMark({
  logo,
  className,
  tone = 'light',
}: {
  logo: Logo
  className?: string
  tone?: keyof typeof tones
}) {
  return (
    <img
      src={logo.src}
      alt={logo.name}
      title={logo.name}
      draggable={false}
      style={{ height: `calc(${logo.h}px * var(--logo-scale, 1))` }}
      className={`w-auto max-w-none select-none ${tones[tone]} ${className ?? ''}`}
    />
  )
}
