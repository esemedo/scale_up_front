import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubjectsTab from '../components/TabDashboard/SubjectTab';
import PromotionTab from '../components/TabDashboard/PromotionTab';
import NeedsTab from '@/components/TabDashboard/NeedsTab';



const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('promotions');

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
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