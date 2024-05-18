import React, { useEffect, useState } from "react";
import SubjectsTab from "../components/TabDashboard/SubjectTab";
import PromotionTab from "../components/TabDashboard/PromotionTab";
import NeedsTab from "@/components/TabDashboard/NeedsTab";
import TabButton from "../components/TabDashboard/TadButton";


const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("promotions");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="rounded p-5 text-center text-4xl font-bold mb-5 text-blue-500">
        DASHBOARD
      </div>
      <div className="w-3/4 rounded-lg bg-white p-8 shadow-md h-[700px]">
        <div className="mb-4 flex">
          <TabButton
            isActive={activeTab === "promotions"}
            onClick={() => setActiveTab("promotions")}
          >
            Nos Promotions
          </TabButton>
          <TabButton
            isActive={activeTab === "subjects"}
            onClick={() => setActiveTab("subjects")}
          >
            Nos Matières
          </TabButton>
          <TabButton
            isActive={activeTab === "needs"}
            onClick={() => setActiveTab("needs")}
          >
            Nos Besoins
          </TabButton>
        </div>
        {activeTab === "promotions" && <PromotionTab />}
        {activeTab === "subjects" && <SubjectsTab />}
        {activeTab === "needs" && <NeedsTab />}
      </div>
    </div>
  );
};

export default Dashboard;
