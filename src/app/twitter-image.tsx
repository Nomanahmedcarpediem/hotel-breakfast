import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Hotel Breakfast - Because Champagne is a Morning Drink';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  // Fetch the logo
  const logoData = await fetch(
    new URL('/logo.png', 'https://hotel-breakfast-redesign.vercel.app')
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          background: '#FFF6E1',
          position: 'relative',
        }}
      >
        {/* Left side - Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px',
            width: '55%',
            zIndex: 10,
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <img
              src={logoData as unknown as string}
              width={80}
              height={80}
              style={{ objectFit: 'contain' }}
            />
            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: '#1a1a1a',
                letterSpacing: '-1px',
              }}
            >
              HOTEL BREAKFAST
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: '#1a1a1a',
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Because Champagne
            <br />
            is a{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #334FB4, #E85D4C)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Morning Drink
            </span>
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 22,
              color: '#1a1a1a',
              opacity: 0.7,
              marginBottom: 32,
              lineHeight: 1.5,
            }}
          >
            Luxury lifestyle essentials for those who believe every morning should feel like vacation.
          </div>

          {/* CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #334FB4, #4A6BD4)',
                borderRadius: 50,
                color: 'white',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Shop Now
              <span style={{ fontSize: 24 }}>→</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: '#E85D4C',
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              ★★★★★
              <span style={{ color: '#1a1a1a', opacity: 0.5 }}>4.9</span>
            </div>
          </div>

          {/* Trust badges */}
          <div
            style={{
              display: 'flex',
              gap: 24,
              marginTop: 32,
              fontSize: 14,
              color: '#1a1a1a',
              opacity: 0.5,
            }}
          >
            <span>🚚 Free Shipping $75+</span>
            <span>✨ Premium Quality</span>
            <span>🌿 Sustainable</span>
          </div>
        </div>

        {/* Right side - Product images grid */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '45%',
            padding: '40px',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', gap: 16, flex: 1 }}>
            {/* Product 1 - Crewneck */}
            <div
              style={{
                flex: 1,
                borderRadius: 24,
                overflow: 'hidden',
                background: '#f0f0f0',
                position: 'relative',
              }}
            >
              <img
                src="https://cdn.shopify.com/s/files/1/0751/4456/0894/files/3262399543692142814_2048.jpg"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  background: 'linear-gradient(135deg, #334FB4, #4A6BD4)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                Bestseller
              </div>
            </div>
            {/* Product 2 - Towel */}
            <div
              style={{
                flex: 1,
                borderRadius: 24,
                overflow: 'hidden',
                background: '#f0f0f0',
              }}
            >
              <img
                src="https://cdn.shopify.com/s/files/1/0751/4456/0894/files/5885969260573620490_2048.jpg"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, flex: 1 }}>
            {/* Product 3 - Cap */}
            <div
              style={{
                flex: 1,
                borderRadius: 24,
                overflow: 'hidden',
                background: '#f0f0f0',
              }}
            >
              <img
                src="https://cdn.shopify.com/s/files/1/0751/4456/0894/files/1875496474666638470_2048.jpg"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
            {/* Product 4 - Tee */}
            <div
              style={{
                flex: 1,
                borderRadius: 24,
                overflow: 'hidden',
                background: '#f0f0f0',
                position: 'relative',
              }}
            >
              <img
                src="https://cdn.shopify.com/s/files/1/0751/4456/0894/files/8999220662666491318_2048.jpg"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  background: '#A42325',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                NEW
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(51, 79, 180, 0.08)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -60,
            left: '40%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(164, 35, 37, 0.06)',
          }}
        />

        {/* Bottom accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: 'linear-gradient(90deg, #334FB4, #A42325, #E85D4C, #7A9E7E, #334FB4)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
