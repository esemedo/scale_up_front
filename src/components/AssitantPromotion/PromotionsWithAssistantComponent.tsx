import React from 'react';

interface PromotionWithAssistant {
  promotionId: number;
  assistantId: number;
  name: string;
  assistantName: string;
}

interface PromotionWithAssistantComponentProps {
  promotionWithAssistant: PromotionWithAssistant[];
  promotions: Promotion[];
  assistants: Assistant[];
}

interface Promotion {
  id: number;
  name: string;
}

interface Assistant {
  id: number;
  name: string;
}

const PromotionWithAssistantComponent: React.FC<PromotionWithAssistantComponentProps> = ({ promotionWithAssistant, assistants }) => {
  const assistantDict = React.useMemo(() => {
    const dict: { [key: number]: string } = {};
    assistants.forEach(assistant => {
      dict[assistant.id] = assistant.name;
    });
    return dict;
  }, [assistants]);

  return (
    <div>
      <ul>
        {promotionWithAssistant.map((item, index) => (
          <li key={index}>
            {item.name || ''}
            &nbsp;{assistantDict[item.assistantId] || ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromotionWithAssistantComponent;
