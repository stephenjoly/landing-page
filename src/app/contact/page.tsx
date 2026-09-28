import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell me what you’re working on, a role you have in mind, or an idea you’d like to explore.',
}

export default function Contact() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="mx-auto max-w-[640px]">
        <ContactForm />
      </div>
    </Container>
  )
}
