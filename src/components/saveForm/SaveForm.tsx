// SaveForm.tsx

import React, { useState } from 'react';

interface SaveFormProps {
  onSave: (tableName: string) => void;
}

const SaveForm: React.FC<SaveFormProps> = ({ onSave }) => {
  const [tableName, setTableName] = useState<string>('');

  const handleSave = () => {
    onSave(tableName);
    setTableName('');
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Játék neve" 
        value={tableName} 
        onChange={(e) => setTableName(e.target.value)} 
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default SaveForm;
