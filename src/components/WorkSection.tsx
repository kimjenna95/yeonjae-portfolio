import Link from 'next/link'
import Image from 'next/image'
import { projects } from '@/data/projects'

const B300: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 300 }
const B600: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 600 }
const L700: React.CSSProperties = { fontFamily: 'Lato, sans-serif', fontWeight: 700 }

const CARD_COLORS = [
  '#0D1B4B',
  '#1B4BDB',
  '#0D1B4B',
  '#1B4BDB',
  '#1a3a2a',
  '#2a1a3a',
  '#1a2a3a',
  '#3a1a1a',
  '#1a3a3a',
]

export default function WorkSection() {
  return (
    <div style={{ background: '#fff' }} className="py-16 px-6">
      <div style={{ maxWidth: 940 }} className="mx-auto">
        <h2
          className="text-center mb-12"
          style={{ ...L700, fontSize: 12, letterSpacing: '0.1em', color: '#a4a4a4', textTransform: 'uppercase' as const }}
        >
          Featured Work
        </h2>

        <div className="flex flex-col gap-12">
          {projects.map((project, i) => (
            <Link key={project.slug} href={`/work/${project.slug}`} className="group block">
              <div
                className="w-full rounded-sm overflow-hidden"
                style={{
                  background: CARD_COLORS[i % CARD_COLORS.length],
                  aspectRatio: '16/9',
                  position: 'relative',
                }}
              >
                <Image
                  src={project.thumbnail}
                  alt={project.name}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  unoptimized
                />
              </div>

              <div className="mt-4">
                <h3 style={{ ...B600, fontSize: 18, lineHeight: '24px', color: '#111' }} className="group-hover:opacity-60 transition-opacity">
                  {project.name}
                </h3>
                <p style={{ ...B300, fontSize: 14, lineHeight: '24px', color: '#9a9a9a' }} className="mt-0.5">{project.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
