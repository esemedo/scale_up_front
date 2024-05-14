import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubjectsTab from '../components/TabDashboard/SubjectTab';
import PromotionTab from '../components/TabDashboard/PromotionTab';
import NeedsTab from '@/components/TabDashboard/NeedsTab';

interface Need {
    id: number;
    idSubject: number;
    idPromotion: number;
    status: number;
    idContributor: number;
    hoursVolume: number;
    startSchoolYear: number;
    endSchoolYear: number;
    createdAt: string;
    updatedAt: string;
}

const Dashboard = () => {
    const [needs, setNeeds] = useState<Need[]>([]);
    const [activeTab, setActiveTab] = useState('promotions');

    useEffect(() => {
        getNeeds();
    }, []);

    const getNeeds = async () => {
        try {
            const response = await axios.get<Need[]>('http://localhost:3000/api/needs/');
            setNeeds(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="text-4xl font-bold mb-4 text-blue-500 ">Dashboard</h1>
            <div className="p-8 bg-white rounded-lg shadow-md w-3/4" style={{ height: '700px' }}>
                <div className="mb-4 flex ">
                    <button onClick={() => setActiveTab('promotions')} className={`flex-grow text-center py-2 ${activeTab === 'promotions' ? 'border-b-2 border-blue-500' : ''}`}>Nos Promotions</button>
                    <button onClick={() => setActiveTab('subjects')} className={`flex-grow text-center py-2 ${activeTab === 'subjects' ? 'border-b-2 border-blue-500' : ''}`}>Nos Matières</button>
                    <button onClick={() => setActiveTab('needs')} className={`flex-grow text-center py-2 ${activeTab === 'needs' ? 'border-b-2 border-blue-500' : ''}`}>Nos Besoins</button>
                </div>
                {activeTab === 'promotions' && <PromotionTab />}
                {activeTab === 'subjects' && <SubjectsTab />}
                {activeTab === 'needs' &&  <NeedsTab />}
            </div>
        </div>
    );
};

export default Dashboard;