import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

function Topbar({ onThemeToggle, isDark }) {
  return (
    <header className="topbar">
      <div className="breadcrumbs">
        <span>Northstar Ops</span><SafeIcon icon={FiIcons.FiChevronRight} />
        <span>Order fulfillment</span><SafeIcon icon={FiIcons.FiChevronRight} />
        <b>Process intelligence</b>
      </div>
      <div className="topbar-actions">
        <div className="presence-stack"><span className="presence-avatar violet">MC</span><span className="presence-avatar mint">ET</span><span className="presence-avatar amber">RS</span></div>
        <span className="live-label"><i /> 3 collaborators</span>
        <button className="icon-button" aria-label="Toggle theme" onClick={onThemeToggle}>
          <SafeIcon icon={isDark ? FiIcons.FiSun : FiIcons.FiMoon} />
        </button>
        <button className="icon-button notification-button" aria-label="Notifications"><SafeIcon icon={FiIcons.FiBell} /><i /></button>
        <button className="share-button"><SafeIcon icon={FiIcons.FiShare2} /> Share</button>
      </div>
    </header>
  );
}

export default Topbar;
