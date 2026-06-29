import '../index.css'
import '../App.css'

export const metadata = {
  title: 'Lenimen Biotech Private Limited',
  description: 'Lenimen Biotech Pvt. Ltd. delivers quality pharmaceutical formulations, healthcare products, and institutional supply solutions through trusted manufacturing partnerships and ethical business practices.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
