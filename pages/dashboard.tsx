"use client";
import { useState } from 'react';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

const Dashboard = () => {

  const [col1, setCol1] = useState<{ id: string; nom: string }[]>([]);
  const [col2, setCol2] = useState<{ id: string; nom: string }[]>([]);
  const [col3, setCol3] = useState<{ id: string; nom: string }[]>([]);
  
  
  // Ajout de la matiere dans la colonne 1 (default de base) + ajout de nom à celui-ci
  const handleAddMatiere = () => {
    const newMatiere = prompt('Entrez le nom de la nouvelle matière');
    if (newMatiere) {
      setCol1([...col1, { id: Math.random().toString(), nom: newMatiere }]);
    }
  };

  // Ajout d'un bouton pour chaque matiere a droite de celle-ci pour supprimer

  const handleDeleteMatiere = (col: { id: string; nom: string }[], setCol: Function, matiereId: string) => {
    setCol(col.filter((m) => m.id !== matiereId));
  };

  // Ajout d'un bouton pour chaque matiere a droite de celle-ci pour editer

  const handleEditMatiere = (col: { id: string; nom: string }[], setCol: Function, matiereId: string) => {
    const matiere = col.find((m) => m.id === matiereId);
    const newMatiere = prompt('Entrez le nouveau nom de la matière', matiere?.nom);
    if (newMatiere) {
      setCol(col.map((m) => (m.id === matiereId ? { ...m, nom: newMatiere } : m)));
    }
  };
  
  // FOnction permettant de drag and drop les matieres dans les colonnes

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, origin: string) => {
    event.dataTransfer.setData('text/plain', (event.target as HTMLDivElement).id);
    event.dataTransfer.setData('origin', origin);
  };


// Fonction permettant d'échanger les positions des matieres dans les colonnes ou de les déplacer d'une colonne 
// à une autre en fonction de l'origine et de la destination de l'élément déplacé.
// Si l'origine et la destination sont la même colonne, échange les positions de la matière et de la destination.
// Sinon, supprime la matière de la colonne d'origine et l'ajoute à la colonne de destination.
// Met à jour l'état de la colonne d'origine et de la colonne de destination.


const handleDrop = (event: React.DragEvent<HTMLDivElement>, setCol: Function, col: { id: string; nom: string }[], destination: string) => {
  event.preventDefault();
  const matiereId = event.dataTransfer.getData('text/plain');
  const origin = event.dataTransfer.getData('origin');

  let destinationIndex = col.findIndex((matiere) => matiere.id === (event.target as HTMLDivElement).id);
  const matiereIndex = getCol(origin).findIndex((matiere) => matiere.id === matiereId);

  if (matiereIndex !== -1) {
    const updatedMatieres = [...getCol(origin)];

    if (origin === destination) {
      if (destinationIndex !== -1) {
        [updatedMatieres[matiereIndex], updatedMatieres[destinationIndex]] = [updatedMatieres[destinationIndex], updatedMatieres[matiereIndex]];
      } else {
        updatedMatieres.push(updatedMatieres.splice(matiereIndex, 1)[0]);
      }

      setCol(updatedMatieres);
    } else {
      const movedMatiere = updatedMatieres.splice(matiereIndex, 1)[0];
      getSetCol(origin)(updatedMatieres);
      const updatedDestination = [...col];
      if (destinationIndex !== -1) {
        updatedDestination.splice(destinationIndex, 0, movedMatiere);
      } else {
        updatedDestination.push(movedMatiere);
      }

      setCol(updatedDestination);
    }
  }
};

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const getCol = (col: string) => {
    switch (col) {
      case 'col1':
        return col1;
      case 'col2':
        return col2;
      case 'col3':
        return col3;
      default:
        return [];
    }
  };

  const getSetCol = (col: string) => {
    switch (col) {
      case 'col1':
        return setCol1;
      case 'col2':
        return setCol2;
      case 'col3':
        return setCol3;
      default:
        return () => {};
    }
  };

  return (
    <div className="w-full h-screen bg-gray-800 text-white p-8">
    <h1 className="text-4xl mb-8">Dashboard</h1>
    <div className="flex justify-between mb-8">
      <Link href="/">
        <div className="bg-blue-500 text-white px-4 py-2 rounded mr-4">
          Acceuil
        </div>
      </Link>
      <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-4" onClick={handleAddMatiere}>
          + Ajouter des matières
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Filtrer</button>
      </div>
    </div>
      <div className="flex gap-4">
        {[{ col: col1, setCol: setCol1, name: 'col1' }, { col: col2, setCol: setCol2, name: 'col2' }, { col: col3, setCol: setCol3, name: 'col3' }].map(({ col, setCol, name }) => (
          <div
            key={name}
            className="flex-1 border border-gray-600 p-4"
            onDrop={(event) => handleDrop(event, setCol, col, name)}
            onDragOver={handleDragOver}
          >
            <h3>{`Promo ${name.slice(-1)}`}</h3>
            {col.map((matiere) => (
              <div
                key={matiere.id}
                id={matiere.id}
                draggable
                onDragStart={(event) => handleDragStart(event, name)}
                className="border border-gray-600 p-8 my-2 flex justify-between items-center "
              >
                <span>{matiere.nom}</span>
                <div>
                  <button style={{ fontSize: '1.5em', marginRight: '15px'  }} onClick={() => handleEditMatiere(col, setCol, matiere.id)}>✎</button>
                  <button style={{ fontSize: '1.5em', marginRight: '10px' }} onClick={() => handleDeleteMatiere(col, setCol, matiere.id)}>X</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;