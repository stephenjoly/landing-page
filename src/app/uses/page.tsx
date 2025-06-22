import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

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

export const metadata = {
  title: 'Uses',
  description: 'Software I use, gadgets I love, and other things I recommend.',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="Software I use, gadgets I love, and other things I can't live without."
      intro="I sometimes get asked about the things I use when building software, trying to stay productive, or just whatever new material obsession has been keeping me occupied as of late. Here’s a big list of all of my favourite stuff and my product recommendations."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="ThinkPad T14 Gen3, Intel i5-1245U, 48GB RAM">
            After being a Macbook Pro user for over 10 years, I finally decided
            to break free and go with Linux on a ThinkPad, the ultimate
            computing setup from an affordability and repairability perspective.
            after getting started with Linux as a daily driver in 2024, i landed
            on NixOS because i love the challenge of it (was previously using
            arch btw).
          </Tool>
          <Tool title="MOKIN Thunderbolt 4 Dock USB C">
            There is no dock that can do what this dock does for the price.
            2.5GbE and the ability to run two 2K monitors at 144 Hz was the
            selling point for me. really helped me to setup a clean and simple
            workstation for my ThinkPad.
          </Tool>
          <Tool title="QwertyKeys QK75N Keyboard, Coffee Colourway">
            There's no better feeling than clacking away at 5am. qwertykeys is
            one of the best value keyboard manufacturers which i cannot
            recommend enough. i run my keyboard with Tangies and PBT WoB with
            the simple legends.
          </Tool>
          <Tool title="Logitech Superlight">
            Once you get used to the lightness of this mouse and the instant
            responsiveness of the 2.4 Ghz connections, its hard to go back to
            any ol' bluetooth mouse.
          </Tool>
          <Tool title="AirPod Pro 2">
            These are so ubiquitous in my life that i almost forgot to include
            them in the list. Having noise cancellation and transparency modes
            are a game changer. Would recommend to anyone and everyone.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="VS Code">
            The ultimate IDE. So extendable, so clean, so effective. Hands down.
          </Tool>
          <Tool title="Continue">
            The best extension for vscode to code with AI. it allows you to turn
            your vscode into cursor.. and you can use your own LLMs via a local
            instance of Ollama or through the API of your own open-webui
            instance.
          </Tool>
          <Tool title="Pocketbase">
            A wonderful prepackaged backend, written in Go, for quick
            deployments with authentication, basic data storage, and more built
            right in.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Productivity">
          <Tool title="Obsidian">
            My favourite note taking service for its simplicity,
            extensions/integrations, and impressive feature-set. Everything is a
            text file - game changing.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Homelab">
          <Tool title="Proxmox">
            It really doesn't get better than this when it comes to convenience
            in running a homelab (at least in my experience). The amount of
            machines i've had to backup, spin up, spin down, reprovision, etc...
            without proxmox it would have been quite a lot harder to do.
          </Tool>
          <Tool title="Ubuntu Server & Docker">
            The tried and true homelab OS and engine. Would recommend to
            everyone setting up a homelab for the first time. I have been
            thinking of using RHEL, NixOS, or ever Arch for a server OS, but
            those are for another day, and definitely not for prod.
          </Tool>
          <Tool title="Asustor AS6104T Gen2 10 Bay NAS">
            The best value pre-built NAS in my opinion. High quality, great
            customer support, and no-frills. I use this as my main NAS and would
            recommend any of the Asustor NAS products.
          </Tool>
          <Tool title="Prusa MK3S+">
            Having a 3D printer opens up a lot of possibilities for homelabbing.
            No explanation needed. I've had a great experience with this model,
            though I know there are superior ones out there, this one has a
            great value for the price.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Photography">
          <Tool title="Fujifilm XT4">
            The shutter is soo satisfying. Amazing features. Highly durable.
            Great video. No complaints.
          </Tool>
          <Tool title="Fujifilm 50-140 F2.8 WR">
            When you just need a bit more reach, or want to get that extra tight
            shot. Such a lovely lens.
          </Tool>
          <Tool title="Fujifilm 16-80 F4 OIS WR">
            For travel and for when you dont know what you'll be shooting that
            day. Super versatile. Would recommend it for anyone's camera bag.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
