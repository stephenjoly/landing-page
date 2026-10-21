import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig([
  ...nextVitals,
  // Preserve the accepted previous-path and carousel ref synchronization patterns.
  // React Compiler is not enabled; rules-of-hooks and exhaustive-deps stay active.
  {
    files: ['src/app/providers.tsx', 'src/components/ConsultingProjectsCarousel.tsx'],
    rules: { 'react-hooks/refs': 'off' },
  },
  // Existing client hydration and IntersectionObserver fallback initialization.
  {
    files: ['src/components/ConsultingProjectsCarousel.tsx', 'src/components/ThemeSelector.tsx'],
    rules: { 'react-hooks/set-state-in-effect': 'off' },
  },
  globalIgnores([
    '.next/**', 'out/**', 'output/**', 'node_modules/**',
    'next-env.d.ts',
  ]),
])
