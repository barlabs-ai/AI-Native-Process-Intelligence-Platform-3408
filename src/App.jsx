import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './common/SafeIcon';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ProcessWorkspace from './components/ProcessWorkspace';
import TransformationRoom from './components/TransformationRoom';
import SopStudio from './components/SopStudio';
import VisualStudio from './components/VisualStudio';
import SkillStudio from './components/SkillStudio';
import { activities } from './data/workspace';
import './App.css';

const views = {
  process: ProcessWorkspace,
  room: TransformationRoom,
  sop: SopStudio,
  visuals: VisualStudio,
  skill: SkillStudio
};

function App() {
  const [activeView, setActiveView] = useState('process');
  const [selectedId, setSelectedId] = useState('verify');
  const [isDark, setIsDark] = useState(true);
  const [storyPlaying, setStoryPlaying] = useState(false);
  const [names, setNames] = useState({});
  const View = views[activeView];
  const selected = activities.find((item) => item.id === selectedId) || activities[0];

  const updateName = (id, value) => setNames((current) => ({ ...current, [id]: value }));

  return (
    <div className={`app-shell ${isDark ? 'theme-dark' : 'theme-light'}`}>
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <div className="app-main">
        <Topbar onThemeToggle={() => setIsDark((value) => !value)} isDark={isDark} />
        <AnimatePresence mode="wait">
          <motion.div
            className="view-frame"
            key={activeView}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
          >
            <View
              selected={selected}
              selectedId={selectedId}
              onSelect={setSelectedId}
              storyPlaying={storyPlaying}
              setStoryPlaying={setStoryPlaying}
              names={names}
              updateName={updateName}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <button className="help-fab" aria-label="Open help">
        <SafeIcon icon={FiIcons.FiHelpCircle} />
      </button>
    </div>
  );
}

export default App;
