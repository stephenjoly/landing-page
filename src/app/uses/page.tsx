import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { pageMetadata } from '@/lib/site'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = pageMetadata({
  title: 'Uses',
  description: 'Software I use, gadgets I love, and other things I recommend.',
  path: '/uses',
})

export default function Uses() {
  return (
    <SimpleLayout
      title="Software I use, gadgets I love, and other things I can't live without."
      intro="I sometimes get asked about the things I use when building software, trying to stay productive, or just whatever new material obsession has been keeping me occupied as of late. Here’s a big list of all of my favourite stuff and my product recommendations."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="ThinkPad T14 Gen 3, Intel i5-1245U, 48GB RAM">
            After being a MacBook Pro user for over 10 years, I finally decided
            to break free and go with Linux on a ThinkPad, the ultimate
            computing setup from an affordability and repairability perspective.
            After getting started with Linux as a daily driver in 2024, I landed
            on NixOS because I love the challenge of it (was previously using
            Arch btw).
          </Tool>
          <Tool title="MOKIN Thunderbolt 4 Dock USB-C">
            There is no dock that can do what this dock does for the price.
            2.5GbE and the ability to run two 2K monitors at 144 Hz were the
            selling points for me. It really helped me set up a clean and simple
            workstation for my ThinkPad.
          </Tool>
          <Tool title="QwertyKeys QK75N Keyboard, Coffee Colourway">
            There&apos;s no better feeling than clacking away at 5 a.m. QwertyKeys is
            one of the best value keyboard manufacturers, and I cannot
            recommend them enough. I run my keyboard with Tangies and PBT WoB with
            the simple legends.
          </Tool>
          <Tool title="Logitech Superlight">
            Once you get used to the lightness of this mouse and the instant
            responsiveness of the 2.4 GHz connection, it’s hard to go back to
            any ol&apos; Bluetooth mouse.
          </Tool>
          <Tool title="AirPods Pro 2">
            These are so ubiquitous in my life that I almost forgot to include
            them in the list. Having noise cancellation and transparency modes
            is a game changer. Would recommend to anyone and everyone.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="VS Code">
            The ultimate IDE. So extensible, so clean, so effective. Hands down.
          </Tool>
          <Tool title="Continue">
            The best extension for VS Code to code with AI. It allows you to turn
            your VS Code into Cursor, and you can use your own LLMs via a local
            instance of Ollama or through the API of your own Open WebUI
            instance.
          </Tool>
          <Tool title="PocketBase">
            A wonderful prepackaged backend, written in Go, for quick
            deployments with authentication, basic data storage, and more built
            right in.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Productivity">
          <Tool title="Obsidian">
            My favourite note-taking service for its simplicity,
            extensions/integrations, and impressive feature set. Everything is a
            text file — game changing.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Homelab">
          <Tool title="Proxmox">
            It really doesn&apos;t get better than this when it comes to convenience
            in running a homelab (at least in my experience). The number of
            machines I&apos;ve had to back up, spin up, spin down, reprovision, etc.
            Without Proxmox, it would have been quite a lot harder to do.
          </Tool>
          <Tool title="Ubuntu Server & Docker">
            The tried and true homelab OS and engine. Would recommend to
            everyone setting up a homelab for the first time. I have been
            thinking of using RHEL, NixOS, or even Arch for a server OS, but
            those are for another day, and definitely not for prod.
          </Tool>
          <Tool title="ASUSTOR AS6104T Gen2 10 Bay NAS">
            The best value pre-built NAS in my opinion. High quality, great
            customer support, and no frills. I use this as my main NAS and would
            recommend any of the ASUSTOR NAS products.
          </Tool>
          <Tool title="Prusa MK3S+">
            Having a 3D printer opens up a lot of possibilities for homelabbing.
            No explanation needed. I&apos;ve had a great experience with this model,
            though I know there are superior ones out there. This one is
            great value for the price.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Photography">
          <Tool title="Fujifilm X-T4">
            The shutter is so satisfying. Amazing features. Highly durable.
            Great video. No complaints.
          </Tool>
          <Tool title="Fujifilm 50-140 F2.8 WR">
            When you just need a bit more reach, or want to get that extra tight
            shot. Such a lovely lens.
          </Tool>
          <Tool title="Fujifilm 16-80 F4 OIS WR">
            For travel and for when you don’t know what you&apos;ll be shooting that
            day. Super versatile. Would recommend it for anyone&apos;s camera bag.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
