import React, { useState, useRef, useEffect } from 'react';

export const ShareMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('¡Enlace copiado al portapapeles!');
    setIsOpen(false);
  };

  return (
    <div className="share-menu-container" ref={menuRef}>
      <button
        className="share-btn-inline"
        title="Compartir"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="ri-share-line"></i>
      </button>

      {isOpen && (
        <div className="nyt-share-dropdown">
          {/* FLECHA SUPERIOR (TOOLTIP ARROW) */}
          <div className="nyt-share-arrow"></div>

          {/* CABECERA CON TÍTULO Y DESCRIPCIÓN */}
          <div className="nyt-share-header">
            <h4 className="nyt-share-title">Opciones para compartir</h4>
            <p className="nyt-share-subtitle">
              Compartí este artículo con tus contactos y redes sociales.
            </p>
          </div>

          {/* LISTA DE OPCIONES */}
          <div className="nyt-share-list">
            <button className="nyt-share-item" onClick={handleCopyLink}>
              <span className="nyt-share-icon">
                <i className="ri-link"></i>
              </span>
              <span>Copiar enlace</span>
            </button>

            <a
              href="mailto:?subject=La%20Argentina%20colonia&body=Te%20comparto%20esta%20nota"
              className="nyt-share-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="nyt-share-icon">
                <i className="ri-mail-line"></i>
              </span>
              <span>Email</span>
            </a>

            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://prensaobrera.com"
              className="nyt-share-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="nyt-share-icon">
                <i className="ri-facebook-fill"></i>
              </span>
              <span>Facebook</span>
            </a>

            <a
              href="https://api.whatsapp.com/send?text=Mira%20esta%20nota"
              className="nyt-share-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="nyt-share-icon">
                <i className="ri-whatsapp-line"></i>
              </span>
              <span>WhatsApp</span>
            </a>

            {/* <a
              href="https://bsky.app"
              className="nyt-share-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="nyt-share-icon">
                <i className="ri-butterfly-line"></i>
              </span>
              <span>Bluesky</span>
            </a>
            */}
            <a
              href="https://twitter.com/intent/tweet?text=La%20Argentina%20colonia"
              className="nyt-share-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="nyt-share-icon">
                <i className="ri-twitter-x-line"></i>
              </span>
              <span>X</span>
            </a>

            <a
              href="https://www.linkedin.com/sharing/share-offsite/?url=https://prensaobrera.com"
              className="nyt-share-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="nyt-share-icon">
                <i className="ri-linkedin-fill"></i>
              </span>
              <span>LinkedIn</span>
            </a>

            <a
              href="https://threads.net"
              className="nyt-share-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="nyt-share-icon">
                <i className="ri-threads-line"></i>
              </span>
              <span>Threads</span>
            </a>

            <a
              href="https://reddit.com/submit"
              className="nyt-share-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="nyt-share-icon">
                <i className="ri-reddit-line"></i>
              </span>
              <span>Reddit</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
