import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

// Rendered once at build time; assets are read from the source tree then.
export const dynamic = 'force-static'

const assets = join(process.cwd(), 'src')

function font(weight: 500 | 600 | 700) {
  return readFile(
    join(assets, `app/social-card.png/fonts/inter-latin-${weight}.woff`),
  )
}

const zinc = {
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  500: '#71717a',
  600: '#52525b',
  800: '#27272a',
}
const teal = { 100: '#ccfbf1', 500: '#14b8a6', 700: '#0f766e' }

export async function GET() {
  let [medium, semibold, bold, portrait] = await Promise.all([
    font(500),
    font(600),
    font(700),
    readFile(join(assets, 'images/portrait.jpg')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          padding: 32,
          background: zinc[100],
          fontFamily: 'Inter',
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            padding: '0 72px 0 80px',
            borderRadius: 32,
            background: zinc[50],
            border: `1px solid ${zinc[200]}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              height: '100%',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: teal[700],
              }}
            >
              ENGINEER AND TECHNOLOGIST · TORONTO
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 20,
                fontSize: 88,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '-0.035em',
                color: zinc[800],
              }}
            >
              Stephen Joly
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 28,
                maxWidth: 560,
                fontSize: 32,
                fontWeight: 500,
                lineHeight: 1.3,
                letterSpacing: '-0.015em',
                color: zinc[600],
              }}
            >
              Product-minded builder focused on customers, clarity, and
              execution.
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 48,
                fontSize: 22,
                fontWeight: 600,
                color: teal[700],
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: 10,
                  height: 10,
                  marginRight: 14,
                  borderRadius: 9999,
                  background: teal[500],
                }}
              />
              stephenjoly.net
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              position: 'relative',
              width: 340,
              height: 340,
              marginLeft: 40,
            }}
          >
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                top: 0,
                left: 0,
                width: 340,
                height: 340,
                borderRadius: 28,
                background: teal[100],
                transform: 'rotate(-6deg) translate(-14px, 12px)',
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img
              src={`data:image/jpeg;base64,${portrait.toString('base64')}`}
              width={340}
              height={340}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 340,
                height: 340,
                borderRadius: 28,
                objectFit: 'cover',
                transform: 'rotate(3deg)',
                boxShadow: '0 20px 40px -12px rgba(39, 39, 42, 0.25)',
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: medium, weight: 500, style: 'normal' },
        { name: 'Inter', data: semibold, weight: 600, style: 'normal' },
        { name: 'Inter', data: bold, weight: 700, style: 'normal' },
      ],
    },
  )
}
