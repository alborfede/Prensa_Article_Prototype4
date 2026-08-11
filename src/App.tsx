import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AudioPlayerButton } from './components/AudioPlayerButton';
import { ArticleSummary } from './components/ArticleSummary';
import { ShareMenu } from './components/ShareMenu';
import { RightSidebar } from './components/Sidebar/RightSidebar';
import './App.css';

export function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSubscribeMenu, setShowSubscribeMenu] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);

  const donationAmounts = [
    '$10.000',
    '$15.750',
    '$21.000',
    '$26.250',
    '$31.500',
    '$36.750',
    '$42.000',
    '$47.250',
    '$52.500',
    '$57.750',
    '$63.000',
    '$68.250',
    '$73.500',
    '$78.750',
    '$84.000',
    '$89.250',
    '$94.500',
    '$99.750',
    '$105.000',
    '$110.250',
    '$115.500',
    '$126.000',
    '$131.250',
    '$136.500',
    '$141.750',
    '$147.000',
    '$152.250',
    '$157.500',
    '$162.750',
    '$168.000',
    '$173.250',
    '$178.500',
    '$183.750',
    '$189.000',
    '$194.250',
    '$199.500',
    '$204.750',
    '$210.000',
  ];

  useEffect(() => {
    const handleScroll = () => {
      // 1. Barra de progreso de lectura
      const winScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progressBar = document.getElementById('reading-progress');
      if (progressBar) {
        progressBar.style.width = scrolled + '%';
      }

      // 2. Mostrar la sidebar exactamente cuando comienza el texto del artículo (.article-body)
      const articleBody = document.querySelector('.article-body');
      if (articleBody) {
        const rect = articleBody.getBoundingClientRect();
        if (rect.top <= 90) {
          setShowSidebar(true);
        } else {
          setShowSidebar(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Verificación inicial

    // Cargar y procesar los widgets de Instagram
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    } else {
      const script = document.createElement('script');
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      <div id="reading-progress"></div>

      <Header />

      <main className="main-layout">
        <article className="article-container">
          {/* ETIQUETA EDITORIAL */}
          <div className="editorial-reference-container">
            <div className="editorial-badge-nyt">
              <span className="editorial-badge-text">Editorial</span>
              <div className="editorial-badge-underline"></div>
            </div>
          </div>

          <div className="article-meta-header">
            <a href="#" className="category-tag">
              Políticas
            </a>
            <div className="date-reading-group">
              <span className="article-date">30/7/2026</span>
              <span className="reading-time-badge">
                <i className="ri-time-line"></i> 4 min lect.
              </span>
            </div>
          </div>

          <h1 className="article-title">La Argentina colonia</h1>
          <p className="article-bajada">
            La importancia de la marcha del 6 y la necesidad de la intervención
            obrera.
          </p>

          <div className="above-cover-bar">
            {/* BLOQUE IZQUIERDO: AVATAR, NOMBRE Y ACCIONES DE COMPARTIR */}
            <div className="author-actions-group">
              <div className="author-info-group">
                <img
                  className="author-avatar-img"
                  src="https://admin.prensaobrera.com/wp-content/uploads/pablo-giachello-e1622484713254.jpg"
                  alt="Pablo Giachello"
                />
                <span className="author-name">Pablo Giachello</span>
              </div>

              <div className="share-actions-wrapper">
                <ShareMenu />

                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    'Mirá esta nota de Prensa Obrera: ' +
                      (typeof window !== 'undefined'
                        ? window.location.href
                        : '')
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn-inline"
                  title="Compartir en WhatsApp"
                >
                  <i className="ri-whatsapp-line"></i>
                </a>

                {/* BOTÓN RECTANGULAR EN WEB */}
                <a
                  href="https://news.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="google-news-btn-inline desktop-only-btn"
                >
                  <span>Agregar Prensa Obrera en</span>
                  <svg className="google-icon-svg" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </a>

                {/* BOTÓN CIRCULAR EN MOBILE */}
                <a
                  href="https://news.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="google-news-btn-inline mobile-only-btn"
                  title="Seguir en Google News"
                >
                  <svg className="google-icon-svg" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* BLOQUE DERECHO: REPRODUCTOR DE AUDIO */}
            <AudioPlayerButton />
          </div>

          <div className="article-cover-wrapper">
            <div className="article-cover">
              <img
                src="https://prensaobrera.com/_next/image?url=https%3A%2F%2Fadmin.prensaobrera.com%2Fwp-content%2Fuploads%2Fkristalina-georgieva-luis-caputo-571x321.webp&w=1200&q=75"
                alt="Kristalina Georgieva y Luis Caputo"
              />
            </div>
            <div className="article-caption">
              Retrato del sometimiento frente al imperialismo.
              <span>Foto: Juan Pérez / EFE</span>
            </div>
          </div>

          <div className="summary-section-wrapper">
            <ArticleSummary />
          </div>

          {/* 
          SECCIÓN OCULTA: BOTÓN SEGUIR EN GOOGLE NEWS
          <div className="nyt-google-section">
            <p className="nyt-google-title">
              Mirá más de nuestra cobertura en tus resultados de búsqueda.
            </p>
            <a
              href="https://news.google.com"
              target="_blank"
              rel="noreferrer"
              className="btn-nyt-google"
            >
              Seguir a Prensa Obrera en Google &#8599;
            </a>
          </div> 
          */}

          {/* CUERPO DEL ARTÍCULO (PUNTO DE ANCLAJE DE LA SIDEBAR) */}
          <div className="article-body">
            <h2>Retrato del sometimiento frente al imperialismo</h2>
            <p>
              La llegada de la titular del FMI a la Argentina ha puesto de
              manifiesto, quizá como nunca antes, los inauditos niveles de
              sometimiento a los que Milei ha llevado a nuestro país frente al
              imperialismo. La reunión del gabinete nacional presidida por la
              titular del Fondo, Kristalina Georgieva, fue gráfica en ese
              sentido. Pero también lo fue la conferencia de prensa, no solo
              porque el ministro Caputo estuvo pintado, sino por la pretensión
              de Georgieva de ganarse la adhesión de los periodistas a través de
              una arenga que convocaba al pueblo argentino a mantenerse firme en
              la tolerancia del ajuste y la austeridad.
            </p>
            <p>
              Sin sonrojarse, la titular del FMI invocó a su propio país,
              Bulgaria, como un ejemplo a seguir. Obviamente, Kristalina evitó
              mencionar que la tutela del FMI del proceso de la restauración
              capitalista en Bulgaria a principios de los '90 terminó -entre
              1996 y 1997- en una crisis bancaria, una fuerte devaluación de la
              moneda búlgara y una hiperinflación. Diez años después, a través
              de un derrotero de privatizaciones, liquidación y reestructuración
              de empresas estatales, austeridad fiscal y reformas laborales,
              Bulgaria entraba como un país periférico y sometido a la Unión
              Europea. En todo este proceso, Bulgaria sufrió un derrumbe
              demográfico extraordinario, con una pérdida equivalente al 29% de
              su población. Interesante espejo en el que Georgieva nos convoca a
              mirarnos.
            </p>

            <h2>La agenda de Kristalina</h2>
            <p>
              Es claro que Kristalina Georgieva vino a la Argentina con
              objetivos muy concretos. En primer término, para asegurarse la
              tajada del propio Fondo en la repartija del bocado argentino y, en
              segundo lugar, para apuntalar al gobierno, que es garante de esa
              entrega y que en las encuestas se encuentra cada vez más
              cuestionado por la consideración popular.
            </p>
            <p>
              Hay que recordar que Argentina es el principal deudor del FMI y
              que, entre 2026 y 2027, el Estado argentino deberá pagarle al
              organismo alrededor de 12 mil millones de dólares. Por eso la
              titular del FMI se paseó por Loma Campana, el yacimiento estrella
              de Vaca Muerta, y en la conferencia de prensa planteó que
              Argentina debía profundizar aún más su rumbo de primarización de
              la economía. Es que allí, en la producción hidrocarburífera, están
              los potenciales dólares que el Fondo se anota para cobrar -como
              “acreedor privileged”. La titular del Fondo se mostró confiada en
              la posibilidad del Estado argentino de pagar y reclamó que el
              Banco Central “siga comprando dólares”. El día después, sin
              embargo, por una ironía del destino, por primera vez desde
              principios de enero el Banco Central se veía imposibilitado de
              comprar dólares.
            </p>
            <p>
              En línea con el interés por cobrar, Georgieva y el FMI reclaman
              más ajuste y un cambio de la carta orgánica del Banco Central.
              Sucede que el superávit conquistado por el gobierno en el primer
              semestre del año está muy lejos aún de la meta establecida por el
              FMI. Es que el derrumbe de la actividad -que es en gran medida
              consecuencia de la motosierra- está redundando en una caída de la
              recaudación fiscal: el famoso perro que se muerde la cola. El
              proyecto de ley de reforma del Banco Central, que Milei anunciaría
              por cadena nacional el jueves 30 por la noche, apuntaría a
              suprimir de manera total el financiamiento monetario del BCRA al
              Tesoro, históricamente utilizado para cubrir el déficit fiscal.
              Sería una medida complementaria o integrada al “apagón” del gasto
              estatal (shutdown) en las áreas que sean deficitarias, con
              excepción de las fuerzas represivas. Como se ve, todo es
              sacrificado en el altar del pago de la deuda externa.
            </p>

            <div className="instagram-embed-wrapper">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/p/DbWa6RAlGv5/?utm_source=ig_embed&ig_rid=ALQXtadzE3XejJIMtVlIcIJ"
                data-instgrm-version="14"
                style={{
                  background: '#fff',
                  border: 0,
                  borderRadius: '3px',
                  boxShadow:
                    '0 0 1px 0 rgba(0, 0, 0, 0.5), 0 1px 10px 0 rgba(0, 0, 0, 0.15)',
                  margin: '1px auto',
                  maxWidth: '540px',
                  minWidth: '326px',
                  padding: 0,
                  width: '99.375%',
                }}
              ></blockquote>
            </div>

            <h2>Argentina y el mundo</h2>
            <p>
              De implementarse toda esta agenda, no sólo se agravaría la enorme
              crisis que golpea a los sectores obreros y populares, sino que se
              reduciría sustancialmente el margen del gobierno para desplegar
              algún tipo de política de contención social. Es evidente que el
              plan reeleccionista de Milei se basa en sostener el apoyo de la
              mayor parte de la burguesía, mostrando su eficacia en ir a fondo
              en la ofensiva antiobrera sin desatar un estallido social, y
              mantener una tasa inflacionaria relativamente baja, con leves
              correcciones del tipo de cambio sobre la base de lograr el
              financiamiento internacional. Pero ninguno de los dos objetivos de
              Milei está asegurado de antemano.
            </p>
            <p>
              Sucede que si las contradicciones inmanentes del esquema económico
              -basado en un ajuste recargado, un “dólar barato”, una apertura
              importadora y una dependencia creciente de la asistencia externa-
              conducen al país, más temprano o más tarde, a un colapso; un
              coletazo de la crisis mundial no solo podría precipitarlo, sino
              también agravarlo sensiblemente. Es que, como se sabe, Argentina
              es apenas una hoja al viento en el torbellino de la economía
              mundial.
            </p>
            <p>
              Los factores exógenos podrían ser diversos. Hay que anotar entre
              ellos, desde luego, la guerra en Medio Oriente. Las negociaciones
              para poner fin a la ofensiva yanqui-sionista contra Irán y reabrir
              plenamente el estrecho de Ormuz permanecen empantanadas, la guerra
              tiende a regionalizarse y crece la presión sobre el mercado
              petrolero. También hay que seguir con atención la evolución de la
              burbuja financiera creada alrededor de la inteligencia artificial.
              Un pinchazo de la burbuja pondría al desnudo la fragilidad del
              esquema financiero argentino. Un revés de Trump en las elecciones
              norteamericanas de este año también impactaría en la Argentina, ya
              que pondría en cuestión las capacidades del imperialismo para
              volver a salir al rescate del gobierno libertario. Cualquiera de
              estos escenarios podría redundar en un gran desequilibrio del
              esquema económico y financiero doméstico y en una reactivación de
              la actividad combativa de las masas.
            </p>

            <h2>La ley antinacional y los trabajadores</h2>
            <p>
              Como frutilla del postre de toda esta política de subordinación al
              imperialismo y transformación de la Argentina en una colonia, el
              gobierno pretende avanzar en la aprobación de la ley de
              “inviolabilidad de la propiedad privada” el próximo 6 de agosto.
              Como se recordará, el despliegue de los jugadores de la selección
              de una bandera con la leyenda “Las Malvinas son argentinas” en el
              partido contra Inglaterra forzó la postergación del tratamiento de
              la ley. Los senadores optaron por evitar el papelón de entregar el
              país el día después de que el pueblo argentino festejara
              cerradamente un acto de reivindicación nacional.
            </p>

            <div className="instagram-embed-wrapper">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/p/DbL6fLrlGGP/?utm_source=ig_embed&ig_rid=AOWytg8Rr-nXqcV9fP64nCl"
                data-instgrm-version="14"
                style={{
                  background: '#fff',
                  border: 0,
                  borderRadius: '3px',
                  boxShadow:
                    '0 0 1px 0 rgba(0, 0, 0, 0.5), 0 1px 10px 0 rgba(0, 0, 0, 0.15)',
                  margin: '1px auto',
                  maxWidth: '540px',
                  minWidth: '326px',
                  padding: 0,
                  width: '99.375%',
                }}
              ></blockquote>
            </div>

            <div className="author-bio-card">
              <img
                className="author-bio-avatar"
                src="https://admin.prensaobrera.com/wp-content/uploads/pablo-giachello-e1622484713254.jpg"
                alt="Pablo Giachello"
              />
              <div className="author-bio-content">
                <p className="author-bio-text">
                  <strong>Pablo Giachello</strong> es Legislador electo por la
                  Provincia de Buenos Aires y Dirigente Nacional del PO - FITU.
                </p>
                <a href="#" className="author-bio-link">
                  Ver sus notas
                </a>
              </div>
            </div>

            {/* NOTAS FINALES DEL ARTÍCULO */}
            <div className="related-notes-section">
              <a href="#" className="related-card">
                <img
                  src="https://prensaobrera.com/_next/image?url=https%3A%2F%2Fadmin.prensaobrera.com%2Fwp-content%2Fuploads%2Fruenion-660x318.jpg&w=1920&q=75"
                  alt="Georgieva, Milei y el FMI"
                  className="related-card-img"
                />
                <div className="related-card-info">
                  <h4>Georgieva, Milei y el FMI</h4>
                  <p>Editorial de 14 Toneladas T3E23.</p>
                  <span>prensaobrera.com</span>
                </div>
              </a>

              <a href="#" className="related-card">
                <img
                  src="https://prensaobrera.com/_next/image?url=https%3A%2F%2Fadmin.prensaobrera.com%2Fwp-content%2Fuploads%2Fkristalina-georgieva-luis-caputo-571x321.webp&w=1200&q=75"
                  alt="La Argentina colonia"
                  className="related-card-img"
                />
                <div className="related-card-info">
                  <h4>La Argentina colonia y el ajuste</h4>
                  <p>Debates y perspectivas de la clase obrera.</p>
                  <span>prensaobrera.com</span>
                </div>
              </a>
            </div>

            {/* SECCIÓN "MÁS PARA LEER" MOVIDA AQUÍ: DEBAJO DE LAS NOTAS FINALES Y ANTES DEL FOOTER */}
            <div className="nyt-free-reads-box">
              <div className="nyt-free-reads-header">Más para leer</div>
              <div className="nyt-grid-2x2">
                <a href="#" className="nyt-read-item">
                  <div className="nyt-read-content">
                    <span className="nyt-read-category">Política</span>
                    <h4 className="nyt-read-title">
                      Revelan indicios de las coimas por el $Libra-gate
                    </h4>
                    <span className="nyt-read-time">ACTUALIDAD</span>
                  </div>
                  <img
                    src="https://prensaobrera.com/_next/image?url=https%3A%2F%2Fadmin.prensaobrera.com%2Fwp-content%2Fuploads%2Fmileii-libra-482x321.jpg&w=1920&q=75"
                    alt="Libra-gate"
                    className="nyt-read-img"
                  />
                </a>

                <a href="#" className="nyt-read-item">
                  <div className="nyt-read-content">
                    <span className="nyt-read-category">Sindicales</span>
                    <h4 className="nyt-read-title">
                      Paro nacional docente en Córdoba: alto acatamiento y
                      movilización de UEPC Capital
                    </h4>
                    <span className="nyt-read-time">CÓRDOBA</span>
                  </div>
                  <img
                    src="https://prensaobrera.com/_next/image?url=https%3A%2F%2Fadmin.prensaobrera.com%2Fwp-content%2Fuploads%2FWhatsApp-Image-2026-08-03-at-11.28.12-e1785793340238-660x314.jpeg&w=1920&q=75"
                    alt="Paro docente Córdoba"
                    className="nyt-read-img"
                  />
                </a>

                <div className="nyt-divider-horizontal"></div>

                <a href="#" className="nyt-read-item">
                  <div className="nyt-read-content">
                    <span className="nyt-read-category">Educación</span>
                    <h4 className="nyt-read-title">
                      Formosa: campaña por el cumplimiento de la Educación
                      Sexual Integral
                    </h4>
                    <span className="nyt-read-time">FORMOSA</span>
                  </div>
                  <img
                    src="https://prensaobrera.com/_next/image?url=https%3A%2F%2Fadmin.prensaobrera.com%2Fwp-content%2Fuploads%2Fesi-1.webp&w=1920&q=75"
                    alt="ESI Formosa"
                    className="nyt-read-img"
                  />
                </a>

                <a href="#" className="nyt-read-item">
                  <div className="nyt-read-content">
                    <span className="nyt-read-category">
                      Frente de Izquierda
                    </span>
                    <h4 className="nyt-read-title">
                      Importante reunión por un comité de apoyo al Frente de
                      Izquierda Unidad en Calamuchita
                    </h4>
                    <span className="nyt-read-time">CALAMUCHITA</span>
                  </div>
                  <img
                    src="https://prensaobrera.com/_next/image?url=https%3A%2F%2Fadmin.prensaobrera.com%2Fwp-content%2Fuploads%2Fcalamuchita-549x321.jpg&w=1920&q=75"
                    alt="Calamuchita FIT-U"
                    className="nyt-read-img"
                  />
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* CARRIL STICKY CON APARICIÓN DINÁMICA DESDE EL TEXTO */}
        <aside
          className={`sidebar-right-wrapper ${showSidebar ? 'is-visible' : ''}`}
        >
          <RightSidebar />
        </aside>
      </main>

      {/* BANNER FLOTANTE MINIMIZABLE CON TRANSICIÓN SUAVE */}
      <div className={`nyt-floating-banner ${isMinimized ? 'minimized' : ''}`}>
        <button
          className="nyt-banner-toggle-btn"
          onClick={() => {
            setIsMinimized(!isMinimized);
            if (!isMinimized) setShowSubscribeMenu(false);
          }}
          title={isMinimized ? 'Mostrar banner' : 'Ocultar banner'}
        >
          <i
            className={
              isMinimized ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'
            }
          ></i>
        </button>

        <div className="nyt-banner-content-wrapper">
          <div className="nyt-banner-text">
            <span className="nyt-banner-title">
              <strong>Bancá a Prensa Obrera.</strong> Nos sostenemos de forma
              independiente con el aporte de lxs trabajadores, para construir un
              periódico de análisis y construcción política socialista.
            </span>
          </div>

          <button
            className="nyt-banner-btn"
            onClick={() => setShowSubscribeMenu(!showSubscribeMenu)}
          >
            {showSubscribeMenu ? 'Cerrar' : 'Suscribirse'}
          </button>

          {/* MENÚ DESPLEGABLE DE SELECCIÓN DE MONTO */}
          {showSubscribeMenu && !isMinimized && (
            <div className="nyt-subscribe-menu">
              <div className="nyt-subscribe-menu-header">
                <h4>Elegí tu suscripción mensual</h4>
                <button
                  className="nyt-menu-close"
                  onClick={() => setShowSubscribeMenu(false)}
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              <div className="nyt-amounts-grid">
                {donationAmounts.map((amount, idx) => (
                  <button
                    key={idx}
                    className={`nyt-amount-pill ${
                      selectedAmount === amount ? 'selected' : ''
                    }`}
                    onClick={() => setSelectedAmount(amount)}
                  >
                    {amount}
                  </button>
                ))}
              </div>

              {selectedAmount && (
                <div className="nyt-confirm-container">
                  <button
                    className="nyt-confirm-btn"
                    onClick={() => {
                      alert(
                        `¡Muchas gracias! Has seleccionado una suscripción mensual de ${selectedAmount}`
                      );
                      setShowSubscribeMenu(false);
                      setSelectedAmount(null);
                    }}
                  >
                    Confirmar suscripción de {selectedAmount}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;