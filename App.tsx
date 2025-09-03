import React from 'react';
import ProfileCard from './components/ProfileCard';
import { CARD_DATA } from './constants';
import { MatrixRain } from './components/MatrixRain';

const App: React.FC = () => {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <MatrixRain />
      <ProfileCard data={CARD_DATA} />
    </main>
  );
};

export default App;