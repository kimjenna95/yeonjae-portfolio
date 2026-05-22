'use client'

import PageHeader from '@/components/PageHeader'
import BackToTop from '@/components/BackToTop'
import FadeUp from '@/components/FadeUp'

const B300: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 300 }
const B400: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 400 }
const B600: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 600 }
const L700: React.CSSProperties = { fontFamily: 'Lato, sans-serif', fontWeight: 700 }
const TEXT: React.CSSProperties = { color: '#333' }

function SectionLabel({ children, divider }: { children: React.ReactNode; divider?: boolean }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <span style={{
        display: 'inline-block',
        ...L700, fontSize: 12, lineHeight: '20px', color: '#a4a4a4', letterSpacing: '1px',
        ...(divider ? { borderTop: '1px solid #d8d8d8', paddingTop: 24 } : {}),
      }}>
        {children}
      </span>
    </div>
  )
}

const experience = [
  {
    company: 'Cisco',
    role: 'Product Designer',
    dates: "Feb '23 – Present",
    description: "Designed enterprise experiences for Cisco's IT Design team focused on employee support, access management, and security workflows. Led and contributed to large-scale UX initiatives that improved usability, streamlined internal operations, and modernized support experiences through AI-powered and self-service solutions. Collaborated cross-functionally with product managers, engineers, researchers, content designers, and executive stakeholders to deliver scalable web platform experiences.",
  },
  {
    company: 'Springboard',
    role: 'UX/UI Design Mentor',
    dates: "Apr '22 – Jul '25",
    description: "Mentored 10+ aspiring product designers for a 40-week UX/UI design course, topics consisting of design thinking, UX and UI research, wireframes and prototypes, job search and interview tactics.",
  },
  {
    company: 'J.P. Morgan Chase',
    role: 'UX/UI Designer',
    dates: "Oct '21 – Feb '23",
    description: "Worked for JPMorgan Chase on the Home Lending team. Built an internal application that will improve and revolutionize the workflow for the company's home lending advisors. Built an in-house mortgage application flow to help simplify home buying and give customers a more personalized digital experience. Collaborated with business and development teams to envision solutions and bring them to life. Participated in research and discovery sessions with users, product owners, architects and other stakeholders to achieve a shared understanding of the requirements and solutions.",
  },
  {
    company: 'OxeFit',
    role: 'UX/UI Designer',
    dates: "Jan '21 – Oct '21",
    description: "Conducted all aspects of the design process, including leading discovery, crafting mockups, and creating interactive prototypes to solve and communicate innovative design solutions. Designed products across mobile, web, and GUI devices that targeted specific customer values as well as business goals for professional athletes and rehab centers. Collaborated with product managers, development teams, and executive stakeholders to deliver creative solutions.",
  },
  {
    company: 'JCPenney',
    role: 'Assistant Designer',
    dates: "Jan '19 – Jan '20",
    description: "Worked on the Liz Claiborne team. Oversaw and exhibited a diverse range of design abilities in multiple categories including women's knit and woven. Engaged in all aspects of design process from development through production, approving samples and changing sketches as needed.",
  },
  {
    company: 'Banana Republic',
    role: 'Freelance Designer',
    dates: "Sep '17 – Jan '20",
    description: "Worked on the Banana Republic Factory (BRFS) team. Assisted in a diverse range of categories including women's C&S, sweaters, and woven.",
  },
]

const skills = ['Product Design', 'AI Prototyping', 'Sprint Facilitation', 'UI/UX Design', 'Visual Design', 'Ethnographic Research', 'Accessibility / WCAG', 'User Testing', 'Interaction Design', 'Design Systems', 'Enterprise UX', 'Data Strategy', 'Statistical Analysis', 'Listening to People']
const tools = ['Figma', 'Miro', 'Jira', 'Confluence', 'Adobe Creative Suite', 'Figma Make', 'Claude Code', 'Cursor', 'ChatGPT']
const frontEnd = ['HTML5', 'Bootstrap', 'CSS3', 'JavaScript']

const GDRIVE_URL = 'https://drive.google.com/uc?export=download&id=1vLWr5i_ab6t3dPZfquUH6-6X-pZobyjp'

export default function ResumePage() {
  return (
    <div>
      <PageHeader active="Résumé" />

      {/* Resume content */}
      <div style={{ background: '#fff', padding: '64px 0 0' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }} className="px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-[293px_1fr]">

              {/* LEFT COLUMN */}
              <div className="pr-0 md:pr-10 pb-12 md:pb-0 border-b md:border-b-0 border-gray-100 mb-12 md:mb-0">

                {/* Download PDF */}
                <FadeUp style={{ marginBottom: 40 }}>
                  <a
                    href={GDRIVE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      border: '1px solid #eee', padding: '16px 24px', textDecoration: 'none',
                    }}
                    className="hover:border-gray-400 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" fill="#333" aria-hidden="true">
                      <g><rect fill="none" height="24" width="24"/></g>
                      <g><path d="M12,2C6.49,2,2,6.49,2,12s4.49,10,10,10s10-4.49,10-10S17.51,2,12,2z M11,10V7c0-0.55,0.45-1,1-1h0c0.55,0,1,0.45,1,1v3h1.79c0.45,0,0.67,0.54,0.35,0.85l-2.79,2.79c-0.2,0.2-0.51,0.2-0.71,0l-2.79-2.79C8.54,10.54,8.76,10,9.21,10H11z M16,17H8c-0.55,0-1-0.45-1-1v0c0-0.55,0.45-1,1-1h8c0.55,0,1,0.45,1,1v0C17,16.55,16.55,17,16,17z"/></g>
                    </svg>
                    <span style={{ ...B400, fontSize: 14, lineHeight: '24px', ...TEXT, borderBottom: '1px solid #dbdbdb' }}>
                      Download PDF
                    </span>
                  </a>
                </FadeUp>

                {/* EDUCATION */}
                <FadeUp style={{ marginBottom: 56 }}>
                  <SectionLabel>EDUCATION</SectionLabel>
                  <div style={{ ...B600, fontSize: 14, lineHeight: '24px', ...TEXT, marginBottom: 12 }}>
                    Parsons the New School for Design
                  </div>
                  <div style={{ ...B400, fontSize: 14, lineHeight: '24px', ...TEXT }}>
                    BFA · New York, NY
                  </div>
                </FadeUp>

                {/* SKILLS */}
                <FadeUp style={{ marginBottom: 56 }}>
                  <SectionLabel divider>SKILLS</SectionLabel>
                  <div style={{ ...B400, fontSize: 14, lineHeight: '24px', ...TEXT }}>
                    {skills.map((s, i) => (
                      <span key={s}>{s}{i < skills.length - 1 && <br />}</span>
                    ))}
                  </div>
                </FadeUp>

                {/* DESIGN TOOLS */}
                <FadeUp style={{ marginBottom: 56 }}>
                  <SectionLabel divider>DESIGN TOOLS</SectionLabel>
                  <div style={{ ...B400, fontSize: 14, lineHeight: '24px', ...TEXT }}>
                    {tools.map((t, i) => (
                      <span key={t}>{t}{i < tools.length - 1 && <br />}</span>
                    ))}
                  </div>
                </FadeUp>

                {/* FRONT-END */}
                <FadeUp>
                  <SectionLabel divider>FRONT-END</SectionLabel>
                  <div style={{ ...B400, fontSize: 14, lineHeight: '24px', ...TEXT }}>
                    {frontEnd.map((f, i) => (
                      <span key={f}>{f}{i < frontEnd.length - 1 && <br />}</span>
                    ))}
                  </div>
                </FadeUp>

              </div>

              {/* RIGHT COLUMN */}
              <div>
                <FadeUp><SectionLabel>EXPERIENCE</SectionLabel></FadeUp>
                <div>
                  {experience.map((job, idx) => (
                    <FadeUp key={job.company} style={{ marginBottom: idx < experience.length - 1 ? 40 : 0 }}>
                      <div style={{ ...B400, fontSize: 14, lineHeight: '24px', ...TEXT, marginBottom: 8 }}>
                        <strong style={{ ...B600, marginRight: 12 }}>{job.company}</strong>{job.role}
                      </div>
                      <div style={{ ...B400, fontSize: 14, lineHeight: '24px', ...TEXT, fontStyle: 'italic', marginBottom: 8 }}>
                        <em>{job.dates}</em>
                      </div>
                      <div style={{ ...B300, fontSize: 14, lineHeight: '24px', ...TEXT }}>
                        {job.description}
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div style={{ borderTop: '1px solid #eee', marginTop: 100 }}>
            <div style={{ maxWidth: 880, margin: '0 auto', padding: '64px 24px' }}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
                <span style={{ ...B600, fontSize: 16, lineHeight: '20px', ...TEXT }}>Yeonjae Kim</span>
                <a
                  href="mailto:yeonjae.design@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...B300, fontSize: 16, lineHeight: '20px', ...TEXT, textDecoration: 'none' }}
                  className="hover:opacity-60 transition-opacity"
                >
                  yeonjae.design@gmail.com
                </a>
                <span style={{ ...B400, fontSize: 16, lineHeight: '20px', ...TEXT }}>2026</span>
              </div>
            </div>
          </div>

        </div>
      <BackToTop />
    </div>
  )
}
