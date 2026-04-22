import React from 'react';

export function Footer() {
  return (
    <footer style={{ width: '100%' }}>
      {/* Copyright bar */}
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 clamp(32px, 9vw, 140px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '24px',
          paddingBottom: '24px',
        }}
      >
        <p
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 400,
            fontSize: '13px',
            color: 'var(--text-tertiary)',
            margin: 0,
          }}
        >
          © 2026 Clair Sun
        </p>
        <p
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 400,
            fontSize: '13px',
            color: 'var(--text-tertiary)',
            margin: 0,
          }}
        >
          All Rights Reserved
        </p>
      </div>

    </footer>
  );
}
