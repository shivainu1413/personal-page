import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio | shivainu1413',
  description: 'Personal portfolio — projects, experience, and tech stack.',
  openGraph: {
    title: 'Portfolio | shivainu1413',
    description: 'Personal portfolio — projects, experience, and tech stack.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
