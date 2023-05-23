import React from 'react';
export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">&copy;&nbsp;{new Date().getFullYear()} Mesto Russia</p>
    </footer>
  );
}
