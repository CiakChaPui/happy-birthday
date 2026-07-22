import { useState } from 'react';
import IntroSection from './components/IntroSection';
import ScrapbookSection from './components/ScrapbookSection';
import CakeSection from './components/CakeSection';

function App() {
  const [activeSection, setActiveSection] = useState('intro');
  // sections: 'intro', 'scrapbook', 'cake'

  const isVintage = activeSection === 'scrapbook';

  return (
    <div className={`app-container ${isVintage ? 'vintage-theme' : ''}`}>
      <div className="bg-mesh"></div>
      <div className="noise-overlay"></div>
      
      <IntroSection 
        isActive={activeSection === 'intro'} 
        onNext={() => setActiveSection('scrapbook')} 
      />
      <ScrapbookSection 
        isActive={activeSection === 'scrapbook'} 
        onNext={() => setActiveSection('cake')} 
      />
      <CakeSection 
        isActive={activeSection === 'cake'} 
      />
    </div>
  );
}

export default App;
