import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { pageMetadata } from '@/lib/site'

function SpeakingSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({
  title,
  description,
  event,
  cta,
  href,
}: {
  title: string
  description: string
  event: string
  cta: string
  href: string
}) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export const metadata: Metadata = pageMetadata({
  title: 'Speaking',
  description:
    'Recordings of my past talks and conversations from 2020 and 2021, and an open invitation to start a new one.',
  path: '/speaking',
})

export default function Speaking() {
  return (
    <SimpleLayout
      title="I am passionate about sharing knowledge to improve the lives of others. Let's talk."
      intro="Below are recordings of two past appearances: a 2020 research presentation and a 2021 alumni conversation. I’m always up for rich and real conversations about the things I’ve worked on, learned, and am still figuring out."
    >
      <div className="space-y-20">
        <SpeakingSection title="Past presentations">
          <Appearance
            href="https://www.youtube.com/watch?v=5vmLojt20ec"
            title="Investigating interventions to unlock student motivation in teams by strengthening self-efficacy"
            description="A study exploring how targeted interventions can strengthen student self-efficacy to enhance motivation and teamwork in engineering education."
            event="Undergraduate Engineering Research Day (UnERD) 2020"
            cta="Watch the 2020 recording"
          />
        </SpeakingSection>
        <SpeakingSection title="Past dialogues">
          <Appearance
            href="https://www.youtube.com/watch?v=FqeHt8hc7cY&list=PLHGw5gh1irVmU5f3lmYqeAGPtPn8_XjuJ&index=9&ab_channel=SKULEAlumniOutreach"
            title="Conversation with Skule Alumni Outreach: Career Compass Series"
            description="A series of conversations with alumni from the University of Toronto's engineering school (aka Skule), centered on mentorship and preparing to enter the workforce."
            event="Skule Outreach Initiative 2021"
            cta="Watch the 2021 recording"
          />
        </SpeakingSection>
      </div>
    </SimpleLayout>
  )
}
