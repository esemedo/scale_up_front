import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Papa from "papaparse";

const NeedsTab = () => {

  return (
    <div className="flex space-x-9 rounded-lg p-4">
      <div className="w-1/3 rounded-lg border-r p-4">
        <input
          type="text"
          placeholder="Recherche..."
          className="mb-4 rounded border p-2"
        />
        <select className="rounded border p-2">
          <option value="" disabled selected>
            Trier par...
          </option>
          <option value="manager">Manager</option>
          <option value="need">Besoin</option>
        </select>
      </div>
      <div className="max-h-[500px] w-1/3 overflow-auto rounded-lg border-r p-4"></div>
    </div>
  );
};

export default NeedsTab;
