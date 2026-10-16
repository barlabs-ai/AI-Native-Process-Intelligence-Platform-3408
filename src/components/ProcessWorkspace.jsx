import React, { useEffect, useMemo, useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { activities, evidenceItems, storySteps } from '../data/workspace';
import InspectorPanel from './InspectorPanel';

const connections = [
  { from: 'request', to: 'verify' },
  { from: 'verify', to: 'complete' },
  { from: 'complete', to: 'follow-up', label: 'No' },
  { from: 'complete', to: 'enter', label: 'Yes' },
  { from: 'enter', to: 'approve' },
  { from: 'approve', to: 'finish' }
];

function ProcessWorkspace({ selected, selectedId, onSelect, storyPlaying, setStoryPlaying, names, updateName }) {
  const [zoom, setZoom] = useState(1);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [storyIndex, setStoryIndex] = useState(Math.max(0, storySteps.indexOf(selectedId)));
  const visible = useMemo(() => activities.filter((item) => {
    const matches = `${item.title} ${item.owner} ${item.kind}`.toLowerCase().includes(query.toLowerCase());
    return matches && (filter === 'All' || item.kind === filter);
  }), [query, filter]);

  useEffect(() => {
    if (!storyPlaying) return undefined;
    const timer = window.setInterval(() => {
      setStoryIndex((current) => {
        const next = (current + 1) % storySteps.length;
        onSelect(storySteps[next]);
        return next;
      });
    }, 2200);
    return () => window.clearInterval(timer);
  }, [storyPlaying, onSelect]);

  const getPoint = (item, edge) => ({
    x: item.x + (edge === 'right' ? 174 : 0),
    y: item.y + 49
  });

  return (
    <div className="process-page">
      <div className="page-heading process-heading">
        <div><div className="eyebrow"><span className="eyebrow-dot" /> AS-IS PROCESS <span className="version-pill">v1.4</span></div><h1>Order fulfillment</h1><p>Observed from <b>Order fulfillment walkthrough.mp4</b> <span>·</span> 14:38 min <span>·</span> Analyzed today</p></div>
        <div className="heading-actions"><button className="secondary-button"><SafeIcon icon={FiIcons.FiGitBranch} /> Compare versions</button><button className="primary-button"><SafeIcon icon={FiIcons.FiPlus} /> New version</button></div>
      </div>
      <div className="analysis-strip">
        <div className="analysis-icon"><SafeIcon icon={FiIcons.FiZap} /></div>
        <div className="analysis-summary"><b>Analysis complete</b><span>7 activities <i>·</i> 1 decision <i>·</i> 2 exceptions <i>·</i> 94% confidence</span></div>
        <div className="strip-divider" /><div className="analysis-note"><SafeIcon icon={FiIcons.FiAlertCircle} /> 2 assumptions need review</div>
        <button className="text-button">Review findings <SafeIcon icon={FiIcons.FiArrowUpRight} /></button>
      </div>
      <div className="map-toolbar">
        <div className="toolbar-tabs"><button className="toolbar-tab active">Process map <span>As-Is</span></button><button className="toolbar-tab">Opportunities <span className="count-dot">3</span></button><button className="toolbar-tab">To-Be <SafeIcon icon={FiIcons.FiLock} /></button></div>
        <div className="map-tools">
          <div className="search-wrap"><SafeIcon icon={FiIcons.FiSearch} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find activity" aria-label="Find activity" /><kbd>⌘ K</kbd></div>
          <button className={`icon-button ${storyPlaying ? 'playing' : ''}`} onClick={() => setStoryPlaying(!storyPlaying)} aria-label={storyPlaying ? 'Pause story' : 'Play story'}><SafeIcon icon={storyPlaying ? FiIcons.FiPause : FiIcons.FiPlay} /></button>
          <span className="tool-divider" />
          <button className="icon-button" onClick={() => setZoom(Math.max(0.65, zoom - 0.1))} aria-label="Zoom out"><SafeIcon icon={FiIcons.FiMinus} /></button>
          <span className="zoom-value">{Math.round(zoom * 100)}%</span>
          <button className="icon-button" onClick={() => setZoom(Math.min(1.25, zoom + 0.1))} aria-label="Zoom in"><SafeIcon icon={FiIcons.FiPlus} /></button>
          <button className="icon-button" onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }); }} aria-label="Fit map"><SafeIcon icon={FiIcons.FiMaximize2} /></button>
        </div>
      </div>
      <div className="process-layout">
        <section className="map-panel">
          <div className="map-filter-row"><div className="map-filters">{['All', 'Activity', 'Decision', 'Exception'].map((item) => <button key={item} className={filter === item ? 'filter-chip selected' : 'filter-chip'} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="map-legend"><span><i className="legend-activity" /> Activity</span><span><i className="legend-decision" /> Decision</span><span><i className="legend-exception" /> Exception</span></div></div>
          <div className="canvas-viewport" onPointerDown={(event) => { if (event.target.closest('.process-node')) return; setDragging(true); event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={(event) => { if (dragging) setOffset((current) => ({ x: current.x + event.movementX, y: current.y + event.movementY })); }} onPointerUp={() => setDragging(false)} style={{ cursor: dragging ? 'grabbing' : 'grab' }}>
            <div className="canvas-world" style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }}>
              <svg className="connector-layer" width="1380" height="410" aria-hidden="true">
                {connections.map((connection) => {
                  const from = activities.find((item) => item.id === connection.from);
                  const to = activities.find((item) => item.id === connection.to);
                  const start = getPoint(from, 'right');
                  const end = getPoint(to, 'left');
                  const curve = Math.max(34, (end.x - start.x) / 2);
                  return <g key={`${connection.from}-${connection.to}`}><path d={`M ${start.x} ${start.y} C ${start.x + curve} ${start.y}, ${end.x - curve} ${end.y}, ${end.x} ${end.y}`} /><path className="arrow-head" d={`M ${end.x - 7} ${end.y - 4} L ${end.x} ${end.y} L ${end.x - 7} ${end.y + 4}`} />{connection.label && <text x={(start.x + end.x) / 2 - 7} y={(start.y + end.y) / 2 - 8}>{connection.label}</text>}</g>;
                })}
              </svg>
              {visible.map((item) => <button key={item.id} className={`process-node node-${item.kind.toLowerCase()} ${selectedId === item.id ? 'node-selected' : ''} ${storyPlaying && selectedId === item.id ? 'story-highlight' : ''}`} style={{ left: item.x, top: item.y }} onClick={() => { onSelect(item.id); setStoryIndex(storySteps.indexOf(item.id)); }}><span className="node-topline"><span className="node-number">{item.number}</span><span className={`node-type type-${item.kind.toLowerCase()}`}>{item.kind}</span><SafeIcon icon={item.kind === 'Decision' ? FiIcons.FiGitBranch : item.kind === 'Exception' ? FiIcons.FiAlertTriangle : FiIcons.FiCheckCircle} /></span><b>{names[item.id] || item.title}</b><span className="node-owner"><SafeIcon icon={FiIcons.FiUser} /> {item.owner}</span><span className="node-duration">{item.duration}</span></button>)}
            </div>
            {storyPlaying && <div className="story-progress"><span className="story-live"><i /> PLAY STORY</span><span>{String(storyIndex + 1).padStart(2, '0')} / {String(storySteps.length).padStart(2, '0')}</span><button onClick={() => { const next = (storyIndex + 1) % storySteps.length; setStoryIndex(next); onSelect(storySteps[next]); }}>Next step <SafeIcon icon={FiIcons.FiArrowRight} /></button></div>}
            <div className="canvas-hint"><SafeIcon icon={FiIcons.FiMove} /> Drag to pan <span>·</span> Scroll to explore</div>
          </div>
          <div className="map-footer"><span><SafeIcon icon={FiIcons.FiInfo} /> Select an activity to inspect its evidence and details</span><button><SafeIcon icon={FiIcons.FiPlus} /> Add activity</button></div>
        </section>
        <InspectorPanel activity={selected} name={names[selected.id] || selected.title} updateName={(value) => updateName(selected.id, value)} />
      </div>
    </div>
  );
}

export default ProcessWorkspace;
