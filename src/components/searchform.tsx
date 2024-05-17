import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { MultiSelect } from 'react-multi-select-component';

interface Promotion {
    id: number;
    startSchoolYear: number;
    endSchoolYear: number;
}

interface Contributor {
    id: number;
    firstName: string;
    lastName: string;
}

interface Subject {
    id: number;
    name: string;
}

const SearchForm: React.FC = () => {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [contributors, setContributors] = useState<Contributor[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [selectedSubjects, setSelectedSubjects] = useState<any[]>([]);
    const api = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        fetchPromotions();
        fetchContributors();
        fetchSubjects();
    }, []);

    const fetchPromotions = async () => {
        try {
            const response = await axios.get<Promotion[]>(`${api}/api/promotions`);
            setPromotions(response.data);
        } catch (error) {
            console.error('Error fetching promotions:', error);
        }
    };

    const fetchContributors = async () => {
        try {
            const response = await axios.get<Contributor[]>(`${api}/api/contributors`);
            setContributors(response.data);
        } catch (error) {
            console.error('Error fetching contributors:', error);
        }
    };

    const fetchSubjects = async () => {
        try {
            const response = await axios.get<Subject[]>(`${api}/api/subjects`);
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
                    className="w-full mb-4" // Ajouter une marge en bas
                />

                <FormControl className="mb-4 w-full" style={{ zIndex: 1 }}>
                    <InputLabel id="contributor-label">Intervenant</InputLabel>
                    <Select
                        labelId="contributor-label"
                        id="contributor"
                        label="Intervenant"
                        required
                        style={{ zIndex: 2 }}
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





                <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: '#3f51b5' }}>
                Rechercher
                </Button>

            </form>
        </div>
    );
};

export default SearchForm;
