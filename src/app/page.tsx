// Home.tsx

import React from 'react';
import SearchForm from '../components/seachFrom';
import HistoriqueBesoins from '../components/historiqueDesBesoins';
import FormulaireBesoin from '@/components/formulaireBesoin';

const Home: React.FC = () => {
  return (
    <div>
      <FormulaireBesoin />
      <SearchForm />
    </div>
  );
};

export default Home;
