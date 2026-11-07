import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://shehzankhan.dev'),
  title: 'Shehzan Khan — Software Engineer | C++ & Backend Developer',
  description: 'Portfolio of Shehzan Khan. High-performance C++ systems, multi-objective scheduling engines, agentic AI assistants, and 1,300+ solved algorithmic problems.',
  keywords: [
    'Shehzan Khan',
    'Software Engineer',
    'C++',
    'Backend Engineer',
    'FastAPI',
    'Genetic Algorithms',
    'Systems Programming',
    'WebSocket RFC 6455',
    'Codolio',
    'LeetCode'
  ],
  authors: [{ name: 'Shehzan Khan', url: 'https://github.com/ershehzan' }],
  openGraph: {
    title: 'Shehzan Khan — Software Engineer | C++ & Backend',
    description: 'Specializing in C++, backend systems, multi-agent AI security, and algorithmic optimization.',
    url: 'https://github.com/ershehzan',
    siteName: 'Shehzan Khan Portfolio',
    images: [
      {
        url: '/assets/shehzan-portrait.jpg',
        width: 800,
        height: 1200,
        alt: 'Shehzan Khan — Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var params = new URLSearchParams(window.location.search);
                  var queryTheme = params.get('theme');
                  var stored = localStorage.getItem('theme');
                  var isDark = queryTheme ? queryTheme === 'dark' : (stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased selection:bg-[#C5F36A] selection:text-black">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
