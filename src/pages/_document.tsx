import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Preconnect to important domains */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://cdn.leafly.com" />
          <link rel="preconnect" href="https://weedmaps.com" />
          
          {/* Common meta tags */}
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          
          {/* Manifest and icons */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          
          {/* Global site tag - Google Analytics */}
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
                  `,
                }}
              />
            </>
          )}
          
          {/* Organization schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Greenway Marijuana',
                url: 'https://greenwaymarijuana.com',
                logo: 'https://greenwaymarijuana.com/images/logo.png',
                sameAs: [
                  'https://www.facebook.com/greenwaymarijuana',
                  'https://www.instagram.com/greenwaymarijuana',
                  'https://twitter.com/greenwaymarij'
                ],
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+1-360-876-0420',
                  contactType: 'customer service',
                  areaServed: 'Port Orchard, WA',
                  availableLanguage: 'English'
                },
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: '1107 Bay St',
                  addressLocality: 'Port Orchard',
                  addressRegion: 'WA',
                  postalCode: '98366',
                  addressCountry: 'US'
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: '47.5405',
                  longitude: '-122.6368'
                },
                openingHoursSpecification: [
                  {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: [
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                      'Saturday',
                      'Sunday'
                    ],
                    opens: '08:00',
                    closes: '22:00'
                  }
                ]
              })
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;