import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { evidenceItems } from '../data/workspace';

function InspectorPanel({ activity, name, updateName }) {
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Details');

  return (
    <aside className="inspector-panel">
      <div className="inspector-header"><div><span className="inspector-kicker">ACTIVITY {activity.number}</span><span className={`node-type type-${activity.kind.toLowerCase()}`}>{activity.kind}</span></div><button className="icon-button" aria-label="More activity options"><SafeIcon icon={FiIcons.FiMoreHorizontal} /></button></div>
      <div className="inspector-title-row">{editing ? <input className="activity-edit-input" value={name} autoFocus onChange={(event) => updateName(event.target.value)} onBlur={() => setEditing(false)} onKeyDown={(event) => event.key === 'Enter' && setEditing(false)} /> : <h2>{name}</h2>}<button className="subtle-icon" onClick={() => setEditing(true)} aria-label="Edit activity name"><SafeIcon icon={FiIcons.FiEdit2} /></button></div>
      <div className="inspector-tabs">{['Details', 'Discussion'].map((tab) => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}{tab === 'Discussion' && <span className="tab-count">2</span>}</button>)}</div>
      {activeTab === 'Details' ? <>
        <div className="inspector-field"><span className="field-label">OWNER</span><button className="owner-select"><span className="owner-avatar">OA</span>{activity.owner}<SafeIcon icon={FiIcons.FiChevronDown} /></button></div>
        <div className="inspector-metrics"><div><span>Observed duration</span><b>{activity.duration}</b></div><div><span>AI confidence</span><b className="confidence-value">{activity.confidence}% <i className="confidence-track"><i style={{ width: `${activity.confidence}%` }} /></i></b></div></div>
        <div className="inspector-section"><div className="section-heading"><span>OBSERVATION</span><button className="subtle-icon"><SafeIcon icon={FiIcons.FiEdit2} /></button></div><p>{activity.evidence}</p></div>
        <div className="inspector-section insight-box"><div className="section-heading"><span><SafeIcon icon={FiIcons.FiZap} /> AI INSIGHT</span><span className="sparkle-dot" /></div><p>{activity.insight}</p><button className="inline-link">Explore opportunity <SafeIcon icon={FiIcons.FiArrowUpRight} /></button></div>
        <div className="inspector-section evidence-section"><div className="section-heading"><span>SOURCE EVIDENCE</span><button className="text-muted">View all</button></div>{evidenceItems.slice(0, 3).map((item) => <button className="evidence-row" key={item.time}><span className="evidence-play"><SafeIcon icon={FiIcons.FiPlay} /></span><span className="evidence-text"><b>{item.label}</b><small>Frame captured</small></span><span className="evidence-time">{item.time}</span></button>)}<button className="source-video"><SafeIcon icon={FiIcons.FiVideo} /> Order fulfillment walkthrough.mp4 <SafeIcon icon={FiIcons.FiExternalLink} /></button></div>
        <div className="inspector-bottom"><button className="secondary-button"><SafeIcon icon={FiIcons.FiMessageCircle} /> Discuss with AI</button><button className="icon-button"><SafeIcon icon={FiIcons.FiMoreHorizontal} /></button></div>
      </> : <div className="activity-thread"><div className="thread-note"><span className="presence-avatar violet">MC</span><div><b>Mara Chen <small>09:42</small></b><p>This step includes a repeated customer data check.</p></div></div><button className="secondary-button"><SafeIcon icon={FiIcons.FiPlus} /> Add comment</button></div>}
    </aside>
  );
}

export default InspectorPanel;
