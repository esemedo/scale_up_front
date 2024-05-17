import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { MultiSelect } from 'react-multi-select-component';

const SearchForm: React.FC = () => {
    const [promotions, setPromotions] = useState<any[]>([]);
    const [contributors, setContributors] = useState<any[]>([]);
    const [subjects, setSubjects] = useState<any[]>([]);
    const [selectedSubjects, setSelectedSubjects] = useState<any[]>([]);
    const api = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        // Appeler les fonctions pour récupérer les données
        (async () => {
            await fetchPromotions();
            await fetchContributors();
            await fetchSubjects();
        })();
    }, []);

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Logique pour soumettre le formulaire
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-4 text-blue-500">Recherche</h1>
            <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-3/4" style={{ height: '700px' }}>
                <FormControl className="mb-4 w-full">
                    <InputLabel id="promotion-label">Promotion</InputLabel>
                    <Select
                        labelId="promotion-label"
                        id="promotion"
                        label="Promotion"
                        required
                    >
                        {promotions.length > 0 ? (
                            promotions.map((promotion) => (
                                <MenuItem key={promotion.id} value={promotion.id}>
                                    {promotion.startSchoolYear}-{promotion.endSchoolYear}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>Aucune promotion disponible</MenuItem>
                        )}
                    </Select>
                    <FormHelperText>Sélectionnez une promotion</FormHelperText>
                </FormControl>

                <MultiSelect
                    options={subjects.map((subject) => ({ label: subject.name, value: subject.id }))}
                    value={selectedSubjects}
                    onChange={setSelectedSubjects}
                    labelledBy="Sélectionnez les matières"
                    overrideStrings={{ selectSomeItems: 'Sélectionnez les matières' }}
                    className="w-full"
                />

                <FormControl className="mb-4 w-full">
                    <InputLabel id="contributor-label">Intervenant</InputLabel>
                    <Select
                        labelId="contributor-label"
                        id="contributor"
                        label="Intervenant"
                        required
                    >
                        {contributors.length > 0 ? (
                            contributors.map((contributor) => (
                                <MenuItem key={contributor.id} value={contributor.id}>
                                    {contributor.firstName} {contributor.lastName}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>Aucun intervenant disponible</MenuItem>
                        )}
                    </Select>
                    <FormHelperText>Sélectionnez un intervenant</FormHelperText>
                </FormControl>

                <Button type="submit" variant="contained" color="primary">
                    Rechercher
                </Button>
            </form>
        </div>
    );
};

export default SearchForm;
