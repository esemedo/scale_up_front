import React, { useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import HistoriqueBesoins from '../components/historiqueDesBesoins';
import FormulaireBesoin from '@/components/formulaireBesoin';

interface HomeProps extends React.FC {
  useClient: boolean;
}

const Home: HomeProps = () => {
  useEffect(() => {
  }, []);

  return (
    <div>
      <FormulaireBesoin />
      <SearchForm />
    </div>
  );
};

Home.useClient = true;

export default Home;
