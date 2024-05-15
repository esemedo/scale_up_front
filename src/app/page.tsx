import React, { useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import HistoriqueBesoins from '../components/historiqueDesBesoins';
import FormulaireBesoin from '@/components/formulaireBesoin';

const Home: React.FC = () => {
  useEffect(() => {
  }, []);

  return (
    <div>
      <FormulaireBesoin />
      <SearchForm />
    </div>
  );
};

export default Home;
