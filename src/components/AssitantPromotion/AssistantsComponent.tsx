import React, { useState, useEffect } from 'react';
import axios from 'axios';
const api = process.env.NEXT_PUBLIC_API_URL;

interface Assistant {
  id: number;
  name: string;
}

interface AssistantComponentProps {
  assistants: Assistant[];
}

const AssistantComponent: React.FC<AssistantComponentProps> = ({ assistants }) => {
  return (
    <div>
      <ul>
        {assistants.map(assistant => (
          <li key={assistant.id}>{assistant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AssistantComponent;
