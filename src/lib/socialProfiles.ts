import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'

export const socialProfiles = [
  {
    href: 'https://www.linkedin.com/in/stephenjoly/',
    label: 'LinkedIn',
    icon: LinkedInIcon,
  },
  { href: 'https://github.com/stephenjoly', label: 'GitHub', icon: GitHubIcon },
  { href: 'https://x.com/stephenjoly', label: 'X', icon: XIcon },
  {
    href: 'https://www.instagram.com/stephenjoly/',
    label: 'Instagram',
    icon: InstagramIcon,
  },
] as const
