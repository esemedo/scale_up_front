import React, { useEffect, useState } from "react";
import axios from "axios";
import SubjectsTab from "../components/TabDashboard/SubjectTab";
import PromotionTab from "../components/TabDashboard/PromotionTab";
import NeedsTab from "@/components/TabDashboard/NeedsTab";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("promotions");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
                <div className="rounded p-5 text-center text-4xl font-bold mb-5 text-blue-500">
          DASHBOARD
        </div>
      <div
        className="w-3/4 rounded-lg bg-white p-8 shadow-md h-[700px]" 
      >
        <div className="mb-4 flex ">
          <button
            onClick={() => setActiveTab("promotions")}
            className={`flex-grow py-2 text-center ${
              activeTab === "promotions" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Nos Promotions
          </button>
          <button
            onClick={() => setActiveTab("subjects")}
            className={`flex-grow py-2 text-center ${
              activeTab === "subjects" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Nos Matières
          </button>
          <button
            onClick={() => setActiveTab("needs")}
            className={`flex-grow py-2 text-center ${
              activeTab === "needs" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Nos Besoins
          </button>
        </div>
        {activeTab === "promotions" && <PromotionTab />}
        {activeTab === "subjects" && <SubjectsTab />}
        {activeTab === "needs" && <NeedsTab />}
      </div>
    </div>
  );
};

export default Dashboard;
