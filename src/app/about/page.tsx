import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
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

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Stephen. I live in Toronto, where I help companies evolve.',
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
            <p>
              I’m Stephen. I live in Toronto, where I help companies evolve.
            </p>

            <p>
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

            <p>
              Professionally, I’m the Manager of Customer Deployment for
              Dayforce&apos;s Strategic Workforce Planning product. I joined that
              journey through Agentnoon, a Y Combinator-backed startup building
              organizational design and workforce planning software that was
              later acquired by Dayforce. Today I lead the post-sale customer
              lifecycle across onboarding, implementation, support, training,
              and product feedback, working at the intersection of customers,
              sales, and engineering. Before that, I spent six years at
              Deloitte, where I advised clients on regulatory risk, operational
              resilience, and workforce strategy before moving into the Office
              of Generative AI to focus on internal AI enablement, product
              development, and scalable delivery.
            </p>

            <p>
              When I’m not working, I’m usually tinkering with small apps in my
              home lab, or reading about mental health, economics, and
              behavioral science — always searching for ways to understand
              people better, and build systems that make life work a little
              smoother at scale.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://x.com/stephenjoly" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink
              href="https://www.instagram.com/stephenjoly/"
              icon={InstagramIcon}
              className="mt-4"
            >
              Follow on Instagram
            </SocialLink>
            <SocialLink
              href="https://github.com/stephenjoly"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/stephenjoly/"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:stephen.a.joly@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              stephen.a.joly@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
