// src/app/page.tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Home() {
  const [subjectsData] = useState([
    { id: 1, name: 'Mathématiques', year: 2023, promotion: 'A' },
    { id: 2, name: 'Physique', year: 2022, promotion: 'B' },
    { id: 3, name: 'Chimie', year: 2023, promotion: 'A' },
    // Ajoutez d'autres matières ici
  ]);

  const [filteredSubjects, setFilteredSubjects] = useState([...subjectsData]);
  const [yearFilter, setYearFilter] = useState('');
  const [promotionFilter, setPromotionFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const handleFilter = () => {
    let filtered = [...subjectsData];

    if (yearFilter) {
      filtered = filtered.filter(subject => subject.year.toString() === yearFilter);
    }

    if (promotionFilter) {
      filtered = filtered.filter(subject => subject.promotion === promotionFilter);
    }

    setFilteredSubjects(filtered);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = e.target.value;
    setSortBy(sortBy);

    const sorted = [...filteredSubjects];

    if (sortBy === 'year') {
      sorted.sort((a, b) => a.year - b.year);
    } else if (sortBy === 'promotion') {
      sorted.sort((a, b) => a.promotion.localeCompare(b.promotion));
    } else {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredSubjects(sorted);
  };

  return (
    <div className="container mx-auto max-w-lg px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Liste des Matières</h1>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Filtrer par Année"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md w-1/2"
        />
        <input
          type="text"
          placeholder="Filtrer par Promotion"
          value={promotionFilter}
          onChange={(e) => setPromotionFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md w-1/2"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Filtrer
        </button>
      </div>
      <div className="mb-4">
        <label className="mr-2">Trier par:</label>
        <select
          value={sortBy}
          onChange={handleSort}
          className="border border-gray-300 px-3 py-2 rounded-md"
        >
          <option value="name">Nom</option>
          <option value="year">Année</option>
          <option value="promotion">Promotion</option>
        </select>
      </div>
      <ul className="space-y-4">
        {filteredSubjects.map((subject) => (
          <motion.li
            key={subject.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-gray-300 px-4 py-2 rounded-md"
          >
            {subject.name} - Année: {subject.year} - Promotion: {subject.promotion}
          </motion.li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </div>
    </div>
  );
}
