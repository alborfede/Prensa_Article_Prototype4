import React, { useState } from 'react';

export const ArticleSummary: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleSummarize = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('done');
    }, 1500);
  };

  return (
    <div className="summary-wrapper">
      {/* 1. BOTÓN PREDETERMINADO */}
      {status === 'idle' && (
        <button className="summarize-btn" onClick={handleSummarize}>
          <svg className="summarize-icon" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6H14M3 12H10M3 18H14"
              stroke="#3c4043"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M19 8C19 10.2091 17.2091 12 15 12C17.2091 12 19 13.7909 19 16C19 13.7909 20.7909 12 23 12C20.7909 12 19 10.2091 19 8Z"
              fill="#3c4043"
            />
          </svg>
          <span>Resume esta nota</span>
        </button>
      )}

      {/* ESTADO DE CARGA CON BORDE ANIMADO */}
      {status === 'loading' && (
        <div className="summarize-loading-container">
          <div className="summarize-btn loading">
            <svg className="summarize-icon" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 6H14M3 12H10M3 18H14"
                stroke="#3c4043"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M19 8C19 10.2091 17.2091 12 15 12C17.2091 12 19 13.7909 19 16C19 13.7909 20.7909 12 23 12C20.7909 12 19 10.2091 19 8Z"
                fill="#3c4043"
              />
            </svg>
            <span>Creando Visión general...</span>
          </div>
        </div>
      )}

      {/* 3. CAJA DESPLEGADA DE RESUMEN */}
      {status === 'done' && (
        <div className="summary-card">
          <div className="summary-header">
            <div className="summary-title">
              <svg className="summarize-icon" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 6H14M3 12H10M3 18H14"
                  stroke="#3c4043"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M19 8C19 10.2091 17.2091 12 15 12C17.2091 12 19 13.7909 19 16C19 13.7909 20.7909 12 23 12C20.7909 12 19 10.2091 19 8Z"
                  fill="#3c4043"
                />
              </svg>
              <span>Visión general creada por IA</span>
            </div>

            <button
              className="summary-collapse-btn"
              onClick={() => setStatus('idle')}
              title="Colapsar"
            >
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                <path
                  d="M18 15L12 9L6 15"
                  stroke="#3c4043"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <ul className="summary-list">
            <li>
              La visita de Kristalina Georgieva evidenció el profundo
              sometimiento del gobierno de Milei ante el FMI, exigiendo mayor
              ajuste para garantizar el pago de la deuda externa.
            </li>
            <li>
              El oficialismo impulsa una agenda de subordinación que incluye la
              reforma del Banco Central y el avance de la ley de inviolabilidad
              de la propiedad privada en detrimento de los trabajadores.
            </li>
          </ul>

          <div className="summary-disclaimer">
            Por Gemini; puede contener errores.{' '}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Más información
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
