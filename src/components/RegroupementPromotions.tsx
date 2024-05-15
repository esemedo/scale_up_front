import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import Select, { MultiValue, ActionMeta } from 'react-select';

interface Category {
  id: number;
  name: string;
}

interface Promotion {
  id: number;
  startSchoolYear: number;
  endSchoolYear: number;
}

interface OptionType {
  value: number;
  label: string;
}

const RegroupPromotions = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<OptionType | null>(null);
  const [selectedPromotions, setSelectedPromotions] = useState<MultiValue<OptionType>>([]);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchPromotions();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>('http://localhost:3000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
  };

  const fetchPromotions = async () => {
    try {
      const response = await axios.get<Promotion[]>('http://localhost:3000/api/promotions');
      setPromotions(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des promotions:', error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || selectedPromotions.length === 0) {
      setMessage('Veuillez sélectionner une catégorie et au moins une promotion.');
      return;
    }
  
    const url = `http://localhost:3000/api/regroup-promotions/categories/${selectedCategory.value}/regroup-promotions`;
    // console.log('URL:', url);
  
    try {
      const response = await axios.post(url, {
        promotionIds: selectedPromotions.map(p => p.value)
      });
      setTotalPrice(response.data.totalPrice);
      setMessage('Regroupement réussi !');
    } catch (error) {
      console.error('Erreur lors du regroupement:', error);
      setMessage('Une erreur s\'est produite lors du regroupement.');
    }
  };
  

  const handleCategoryChange = (selectedOption: OptionType | null) => {
    setSelectedCategory(selectedOption);
  };

  const handlePromotionsChange = (selectedOptions: MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
    setSelectedPromotions(selectedOptions);
  };

  const categoryOptions = categories.map(category => ({ value: category.id, label: category.name }));
  const promotionOptions = promotions.map(promotion => ({ value: promotion.id, label: `${promotion.startSchoolYear} - ${promotion.endSchoolYear}` }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Regroupement de matières et de promotions</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Catégorie</label>
          <Select
            options={categoryOptions}
            value={selectedCategory}
            onChange={handleCategoryChange}
            placeholder="Sélectionner une catégorie"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Promotions</label>
          <Select
            options={promotionOptions}
            value={selectedPromotions}
            onChange={handlePromotionsChange}
            isMulti
            placeholder="Sélectionner des promotions"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Regrouper</button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
      {totalPrice !== null && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Prix total : {totalPrice}</h2>
        </div>
      )}
    </div>
  );
};

export default RegroupPromotions;
