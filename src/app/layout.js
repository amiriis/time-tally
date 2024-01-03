export const metadata = {
  icons: {
    icon: '/images/timtally-logo.png',
    shortcut: '/images/timtally-logo.png',
    apple: '/images/timtally-logo.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/images/timtally-logo.png',
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
