import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/menu', '/gallery', '/contact', '/reservations', '/order'],
        disallow: ['/staff', '/login', '/api/', '/_next/'],
      },
    ],
    sitemap: 'https://qistaniya.com/sitemap.xml',
  };
}
