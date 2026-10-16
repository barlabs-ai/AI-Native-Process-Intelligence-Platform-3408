import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const primaryItems = [
  { id: 'process', label: 'Process map', icon: FiIcons.FiGitBranch },
  { id: 'room', label: 'Transformation room', icon: FiIcons.FiMessageSquare },
  { id: 'sop', label: 'SOP studio', icon: FiIcons.FiFileText },
  { id: 'visuals', label: 'Visual instructions', icon: FiIcons.FiImage },
  { id: 'skill', label: 'Agent skill', icon: FiIcons.FiCpu }
];

function Sidebar({ activeView, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand-lockup">
        <div className="brand-symbol"><SafeIcon icon={FiIcons.FiActivity} /></div>
        <span>opsimus<span className="brand-plus">+</span></span>
      </div>
      <button className="workspace-switcher">
        <span className="workspace-mark">N</span>
        <span className="workspace-copy"><b>Northstar Ops</b><small>Workspace</small></span>
        <SafeIcon icon={FiIcons.FiChevronDown} className="tiny-icon" />
      </button>
      <div className="side-section-label">WORKSPACE</div>
      <nav className="side-nav" aria-label="Workspace navigation">
        {primaryItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <SafeIcon icon={item.icon} />
            <span>{item.label}</span>
            {item.id === 'room' && <span className="nav-badge">3</span>}
          </button>
        ))}
      </nav>
      <div className="side-project">
        <div className="side-section-label">CURRENT PROJECT</div>
        <button className="project-row"><span className="project-dot" /><span>Order fulfillment</span><SafeIcon icon={FiIcons.FiMoreHorizontal} /></button>
        <div className="project-meta">Process intelligence <span>·</span> 4 analyses</div>
        <button className="subnav-item"><SafeIcon icon={FiIcons.FiVideo} /> Source videos <span>4</span></button>
        <button className="subnav-item"><SafeIcon icon={FiIcons.FiGitCommit} /> Versions <span>v1.4</span></button>
        <button className="subnav-item"><SafeIcon icon={FiIcons.FiFolder} /> Deliverables <span>3</span></button>
      </div>
      <div className="sidebar-bottom">
        <div className="online-status"><span /> All changes saved</div>
        <button className="profile-button">
          <span className="profile-avatar">JD</span>
          <span><b>Jordan Davis</b><small>Transformation lead</small></span>
          <SafeIcon icon={FiIcons.FiMoreHorizontal} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
