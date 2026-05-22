import ProjectRow from './ProjectRow'
import { projects } from '@/data/projects'

export default function ProjectList() {
  return (
    <section className="px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-xs tracking-widest uppercase text-foreground/30 font-medium">
            Selected Work
          </span>
          <div className="h-px flex-1 bg-foreground/10" />
          <span className="text-xs text-foreground/20 font-mono">{projects.length} Projects</span>
        </div>

        {/* Project rows */}
        <div>
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
