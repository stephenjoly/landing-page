import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

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

export const metadata: Metadata = {
  title: 'Speaking',
  description: "I’ve been told I do well with public speaking. Let's talk.",
}

export default function Speaking() {
  return (
    <SimpleLayout
      title="I am passionate about sharing knowledge to improve the lives of others. Let's talk."
      intro="While I have not had the career of a New York Times best seller and global speaker (yet), I am open to having rich and real conversations that get to the heart of any topic."
    >
      <div className="space-y-20">
        <SpeakingSection title="Presentations">
          <Appearance
            href="https://www.youtube.com/watch?v=5vmLojt20ec"
            title="Investigating interventions to unlock student motivation in teams by strengthening self-efficacy"
            description="A study exploring how targeted interventions can strengthen student self-efficacy to enhance motivation and teamwork in engineering education."
            event="Undergraduate Engineering Reserach Day (UnERD) 2020"
            cta="Watch video"
          />
        </SpeakingSection>
        <SpeakingSection title="Dialogues">
          <Appearance
            href="https://www.youtube.com/watch?v=FqeHt8hc7cY&list=PLHGw5gh1irVmU5f3lmYqeAGPtPn8_XjuJ&index=9&ab_channel=SKULEAlumniOutreach"
            title="Conversation with Skule Alumni Outreach: Career Compass Series"
            description="A series of conversations with Alumni from the University of Toronto's Engineering school (aka Skule) centered around mentorship and developing readiness for entering the workforce."
            event="Skule Outreach Initiative 2021"
            cta="Watch video"
          />
        </SpeakingSection>
      </div>
    </SimpleLayout>
  )
}
