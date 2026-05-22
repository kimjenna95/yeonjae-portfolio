import { projects, getProjectBySlug, getAdjacentProjects } from '@/data/projects'
import ProjectDetail from '@/components/ProjectDetail'
import LifeIsSweetDetail from '@/components/LifeIsSweetDetail'
import FireEscapeDetail from '@/components/FireEscapeDetail'
import SilentEchoDetail from '@/components/SilentEchoDetail'
import Link from 'next/link'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

interface Props {
  params: { slug: string }
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  const { prev, next } = getAdjacentProjects(params.slug)

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-foreground/40 mb-4">Project not found</p>
          <Link href="/" className="text-accent hover:underline">
            Back to work
          </Link>
        </div>
      </main>
    )
  }

  // Fashion/photography editorial pages use their own layouts
  if (params.slug === 'life-is-sweet') {
    return <LifeIsSweetDetail project={project} prev={prev} next={next} />
  }
  if (params.slug === 'fire-escape') {
    return <FireEscapeDetail project={project} prev={prev} next={next} />
  }
  if (params.slug === 'silent-echo') {
    return <SilentEchoDetail project={project} prev={prev} next={next} />
  }

  return <ProjectDetail project={project} prev={prev} next={next} />
}
