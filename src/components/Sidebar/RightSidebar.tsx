import React from 'react';

export const RightSidebar: React.FC = () => {
  return (
    <aside className="sidebar-right">
      <h3 className="sidebar-title">Últimas noticias</h3>

      <a href="#" className="nyt-picks-item">
        <img
          src="https://prensaobrera.com/_next/image?url=https%3A%2F%2Fadmin.prensaobrera.com%2Fwp-content%2Fuploads%2FDiscapacidad-3-e1785531512282-660x305.jpeg&w=1920&q=75"
          alt="Tribuna Disca"
          className="nyt-picks-img"
        />
        <h4 className="nyt-picks-headline">
          Plenario nacional de Tribuna Disca votó un plan de lucha contra la
          motosierra de Milei y la ofensiva en el Senado
        </h4>
      </a>

      <a href="#" className="nyt-picks-item">
        <img
          src="https://prensaobrera.com/_next/image?url=https%3A%2F%2Fadmin.prensaobrera.com%2Fwp-content%2Fuploads%2Fevet-327x321.png&w=1920&q=75"
          alt="Facultad Veterinarias UBA"
          className="nyt-picks-img"
        />
        <h4 className="nyt-picks-headline">
          Elección de decano de la Facultad de Ciencias Veterinarias de la UBA:
          solución de continuidad en la privatización encubierta
        </h4>
      </a>

      <a href="#" className="nyt-picks-item">
        <img
          src="https://prensaobrera.com/_next/image?url=https%3A%2F%2Fadmin.prensaobrera.com%2Fwp-content%2Fuploads%2F1000085252-553x321.jpg&w=1920&q=75"
          alt="Secundarios marcha"
          className="nyt-picks-img"
        />
        <h4 className="nyt-picks-headline">
          El 6 de agosto, los secundarios salen a defender el futuro
        </h4>
      </a>
    </aside>
  );
};
