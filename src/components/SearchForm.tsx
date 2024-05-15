import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { MultiSelect } from 'react-multi-select-component';

const SearchForm: React.FC = () => {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [contributors, setContributors] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<any[]>([]);
  const api = process.env.NEXT_PUBLIC_API_URL;

  // Fonction pour récupérer les promotions
  const fetchPromotions = async () => {
    try {
      const response = await axios.get<any[]>(`${api}/api/promotions`);
      setPromotions(response.data);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    }
  };

  // Fonction pour récupérer les contributeurs
  const fetchContributors = async () => {
    try {
      const response = await axios.get<any[]>(`${api}/api/contributors`);
      setContributors(response.data);
    } catch (error) {
      console.error('Error fetching contributors:', error);
    }
  };

  // Fonction pour récupérer les matières
  const fetchSubjects = async () => {
    try {
      const response = await axios.get<any[]>(`${api}/api/subjects`);
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  // Appeler les fonctions pour récupérer les données
  (async () => {
    await fetchPromotions();
    await fetchContributors();
    await fetchSubjects();
  })();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96 p-4 bg-white rounded-lg shadow-lg">
      <FormControl>
        <InputLabel id="promotion-label">Promotion</InputLabel>
        <Select
          labelId="promotion-label"
          id="promotion"
          label="Promotion"
          required
          className="w-full"
          style={{ backgroundColor: 'white' }}
        >
          {promotions.map((promotion) => (
            <MenuItem key={promotion.id} value={promotion.id}>
              {promotion.startSchoolYear}-{promotion.endSchoolYear}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Sélectionnez une promotion</FormHelperText>
      </FormControl>

      <MultiSelect
        options={subjects.map((subject) => ({ label: subject.name, value: subject.id }))}
        value={selectedSubjects}
        onChange={setSelectedSubjects}
        labelledBy="Sélectionnez les matières"
        overrideStrings={{ selectSomeItems: 'Sélectionnez les matières' }}
      />

      <FormControl>
        <InputLabel id="contributor-label">Intervenant</InputLabel>
        <Select
          labelId="contributor-label"
          id="contributor"
          label="Intervenant"
          required
          className="w-full"
          style={{ backgroundColor: 'white' }}
        >
          {contributors.map((contributor) => (
            <MenuItem key={contributor.id} value={contributor.id}>
              {contributor.firstName} {contributor.lastName}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Sélectionnez un intervenant</FormHelperText>
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Rechercher
      </Button>
    </form>
  );
};

export default SearchForm;
