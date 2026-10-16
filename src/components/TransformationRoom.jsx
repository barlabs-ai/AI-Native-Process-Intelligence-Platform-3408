import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { agents, initialMessages } from '../data/workspace';

function TransformationRoom() {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState('');
  const [activeFilter, setActiveFilter] = useState('All activity');

  const sendMessage = () => {
    if (!draft.trim()) return;
    setMessages((current) => [...current, { author: 'Jordan Davis', initials: 'JD', tone: 'you', time: 'Now', text: draft.trim() }]);
    setDraft('');
  };

  const askAgents = () => {
    setMessages((current) => [...current, { author: 'Mara Chen', initials: 'MC', tone: 'violet', time: 'Now', text: 'Simulated analysis: the biggest opportunity is reducing duplicate entry between request verification and ERP creation. Keep the approval checkpoint until the proposed pre-fill has been validated against exception cases.', tag: 'AI investigation · 2 evidence links' }]);
  };

  return (
    <div className="collaboration-page">
      <div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> COLLABORATIVE WORKSPACE</div><h1>Transformation room</h1><p>Work through findings together. Every recommendation stays connected to its evidence.</p></div><button className="secondary-button"><SafeIcon icon={FiIcons.FiUsers} /> Invite collaborators</button></div>
      <div className="room-layout">
        <section className="room-feed">
          <div className="room-feed-header"><div><b>Order fulfillment review</b><span>AI analysts and your team · 6 participants</span></div><button className="icon-button"><SafeIcon icon={FiIcons.FiMoreHorizontal} /></button></div>
          <div className="thread-context"><SafeIcon icon={FiIcons.FiGitBranch} /><span>Linked to</span><b>Order fulfillment · As-Is v1.4</b><button className="subtle-icon"><SafeIcon icon={FiIcons.FiArrowUpRight} /></button></div>
          <div className="feed-filter">{['All activity', 'AI analysis', 'Decisions'].map((item) => <button key={item} className={activeFilter === item ? 'active' : ''} onClick={() => setActiveFilter(item)}>{item}</button>)}</div>
          <div className="message-list">
            {messages.map((message, index) => <article className={`message-item ${message.tone === 'you' ? 'own-message' : ''}`} key={`${message.author}-${index}`}><div className={`agent-avatar ${message.tone}`}>{message.initials}</div><div className="message-content"><div className="message-meta"><b>{message.author}</b>{message.tone !== 'you' && <span className="agent-role">{agents.find((agent) => agent.initials === message.initials)?.role || 'Project lead'}</span>}<time>{message.time}</time><button className="subtle-icon"><SafeIcon icon={FiIcons.FiMoreHorizontal} /></button></div><p>{message.text}</p>{message.tag && <button className="evidence-link"><SafeIcon icon={FiIcons.FiLink2} /> {message.tag}</button>}<div className="message-reactions"><button><SafeIcon icon={FiIcons.FiThumbsUp} /> 2</button><button><SafeIcon icon={FiIcons.FiMessageCircle} /> Reply</button></div></div></article>)}
          </div>
          <div className="composer"><div className="composer-context"><SafeIcon icon={FiIcons.FiGitBranch} /> Order fulfillment / <b>Verify order details</b><button className="subtle-icon"><SafeIcon icon={FiIcons.FiX} /></button></div><textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} placeholder="Share a thought, challenge a finding, or ask the team…" /><div className="composer-actions"><div><button className="icon-button" aria-label="Attach evidence"><SafeIcon icon={FiIcons.FiPaperclip} /></button><button className="context-add"><SafeIcon icon={FiIcons.FiPlus} /> Link evidence</button></div><button className="send-button" onClick={sendMessage} aria-label="Send message"><SafeIcon icon={FiIcons.FiArrowUp} /></button></div></div>
        </section>
        <aside className="agent-rail">
          <div className="rail-section"><div className="rail-heading"><b>AI ANALYST TEAM</b><button className="subtle-icon"><SafeIcon icon={FiIcons.FiSettings} /></button></div><p className="rail-description">Specialists examine the process together. Every suggestion is simulated for this prototype.</p>{agents.map((agent) => <div className="agent-row" key={agent.initials}><div className={`agent-avatar ${agent.tone}`}>{agent.initials}</div><div><b>{agent.name}</b><span>{agent.role}</span></div><span className="agent-status" /></div>)}<button className="outline-full-button"><SafeIcon icon={FiIcons.FiPlus} /> Add specialist</button></div>
          <div className="rail-section investigation-section"><div className="rail-heading"><b>INVESTIGATIONS</b><span className="nav-badge">2</span></div><div className="investigation-card"><span className="investigation-icon"><SafeIcon icon={FiIcons.FiSearch} /></span><div><b>Duplicate data entry</b><span>2 agents · Evidence linked</span><small><i /> Findings ready</small></div><SafeIcon icon={FiIcons.FiChevronRight} /></div><div className="investigation-card"><span className="investigation-icon amber-bg"><SafeIcon icon={FiIcons.FiShield} /></span><div><b>Approval queue risk</b><span>3 agents · 1 open question</span><small className="status-review"><i /> Needs review</small></div><SafeIcon icon={FiIcons.FiChevronRight} /></div><button className="outline-full-button" onClick={askAgents}><SafeIcon icon={FiIcons.FiZap} /> Ask agents to investigate</button></div>
          <div className="decision-callout"><div><SafeIcon icon={FiIcons.FiCheckSquare} /><b>Human decision required</b></div><p>1 recommendation is waiting for your review before it can be approved.</p><button className="inline-link">Review proposal <SafeIcon icon={FiIcons.FiArrowRight} /></button></div>
        </aside>
      </div>
    </div>
  );
}

export default TransformationRoom;
