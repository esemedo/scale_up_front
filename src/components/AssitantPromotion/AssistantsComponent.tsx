import React from 'react';

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
