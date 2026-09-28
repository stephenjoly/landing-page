import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { socialProfiles } from '@/lib/socialProfiles'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description: 'I’m Stephen. I live in Toronto, where I help companies evolve.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I’m Stephen. I live in Toronto, where I help companies evolve.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p className="text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              Curiosity has always been my fuel. As a kid, I couldn’t resist
              opening every drawer in the house just to see what was inside. My
              aunt, a chemistry professor, fed that spark with test tubes and
              food coloring — I’d spend hours mixing colors, fascinated by how
              simple things could combine into something new.
            </p>

            <p>
              That sense of discovery carried me through high school, where I
              launched a student newspaper and supported younger students in my
              community. It’s also what drew me to engineering — the perfect mix
              of creativity, structure, and real-world impact.
            </p>

            {[
              [
                'NOW',
                'Customer Deployment at Dayforce',
                'I lead the post-sale customer lifecycle for Strategic Workforce Planning: onboarding, implementation, support, training, and product feedback, where customers, sales, and engineering meet. I joined through Agentnoon, a Y Combinator-backed workforce planning startup that Dayforce acquired.',
              ],
              [
                'BEFORE',
                'Six years at Deloitte',
                'I advised clients on regulatory risk, operational resilience, and workforce strategy, then moved into the Office of Generative AI to work on internal AI enablement, product development, and scalable delivery.',
              ],
              [
                'OUTSIDE WORK',
                'Home lab and reading list',
                'I tinker with small apps in my home lab and read about mental health, economics, and behavioral science, always looking for ways to understand people better and build systems that make life a little smoother at scale.',
              ],
            ].map(([label, title, body]) => (
              <section
                key={label}
                className="border-t border-zinc-200 pt-6 dark:border-zinc-700/40"
              >
                <p className="text-[11px] font-bold tracking-[0.1em] text-teal-700 dark:text-teal-400">
                  {label}
                </p>
                <h2 className="mt-2 text-[17px] font-semibold text-zinc-800 dark:text-zinc-100">
                  {title}
                </h2>
                <p className="mt-3 leading-7">{body}</p>
              </section>
            ))}
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            {socialProfiles.map(({ href, label, icon }, index) => (
              <SocialLink
                key={label}
                href={href}
                icon={icon}
                className={index ? 'mt-4' : undefined}
              >
                {label}
              </SocialLink>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl bg-teal-50 p-6 dark:bg-teal-950/50">
            <h2 className="text-lg font-semibold text-teal-900 dark:text-teal-200">
              Let’s talk
            </h2>
            <p className="mt-2 text-sm leading-6 text-teal-800 dark:text-teal-300">
              Have a question or an idea? Send me a message.
            </p>
            <Link
              href="/contact"
              className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 dark:bg-teal-400 dark:text-zinc-950 dark:hover:bg-teal-300 dark:focus-visible:outline-teal-400"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
              </svg>
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}
