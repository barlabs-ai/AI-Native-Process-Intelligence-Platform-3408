import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const storyboard = [
  { id: 1, time: '00:32', title: 'Open the order record', screen: 'Orders overview', color: 'screen-one' },
  { id: 2, time: '01:08', title: 'Verify customer details', screen: 'Customer record', color: 'screen-two' },
  { id: 3, time: '02:41', title: 'Check delivery date', screen: 'Order details', color: 'screen-three' },
  { id: 4, time: '04:12', title: 'Create ERP order', screen: 'New order form', color: 'screen-four' }
];

function VisualStudio() {
  const [selected, setSelected] = useState(0);
  const [tool, setTool] = useState('arrow');
  const [annotations, setAnnotations] = useState({});
  const [caption, setCaption] = useState(storyboard[0].title);
  const [notice, setNotice] = useState('');

  const addAnnotation = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const point = { x: Math.round((event.clientX - rect.left) / rect.width * 100), y: Math.round((event.clientY - rect.top) / rect.height * 100), tool };
    setAnnotations((current) => ({ ...current, [selected]: [...(current[selected] || []), point] }));
  };

  const chooseSlide = (index) => {
    setSelected(index);
    setCaption(annotations[`caption-${index}`] || storyboard[index].title);
  };

  return (
    <div className="studio-page visual-page">
      <div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> VISUAL INSTRUCTIONS <span className="draft-pill">DRAFT</span></div><h1>Order entry visual guide</h1><p>4 captured steps <span>·</span> Source video linked <span>·</span> Edited just now</p></div><div className="heading-actions"><button className="secondary-button"><SafeIcon icon={FiIcons.FiEye} /> Preview</button><button className="primary-button" onClick={() => setNotice('Visual guide saved for review.')}><SafeIcon icon={FiIcons.FiSend} /> Submit for review</button></div></div>
      <div className="visual-workspace">
        <aside className="storyboard-rail"><div className="storyboard-head"><b>STORYBOARD</b><button className="subtle-icon"><SafeIcon icon={FiIcons.FiPlus} /></button></div><div className="storyboard-list">{storyboard.map((slide, index) => <button key={slide.id} className={`storyboard-item ${selected === index ? 'selected' : ''}`} onClick={() => chooseSlide(index)}><div className={`mini-screen ${slide.color}`}><span className="mini-screen-top" /><span className="mini-screen-lines" /><span className="mini-screen-highlight" /></div><span className="storyboard-number">{String(slide.id).padStart(2, '0')}</span><span className="storyboard-copy"><b>{slide.title}</b><small>{slide.time} · Video frame</small></span><SafeIcon icon={FiIcons.FiMoreVertical} /></button>)}</div><button className="add-visual-step"><SafeIcon icon={FiIcons.FiPlus} /> Add visual step</button><div className="storyboard-foot"><SafeIcon icon={FiIcons.FiVideo} /><span>Source video<small>Order fulfillment walkthrough.mp4</small></span><button className="subtle-icon"><SafeIcon icon={FiIcons.FiArrowUpRight} /></button></div></aside>
        <section className="visual-editor"><div className="visual-editor-top"><div><span className="step-label">STEP {String(selected + 1).padStart(2, '0')}</span><span className="step-time"><SafeIcon icon={FiIcons.FiClock} /> {storyboard[selected].time}</span></div><div className="annotation-tools">{[{ id: 'arrow', icon: FiIcons.FiArrowUpRight }, { id: 'highlight', icon: FiIcons.FiSquare }, { id: 'callout', icon: FiIcons.FiMessageSquare }].map((item) => <button key={item.id} className={tool === item.id ? 'active' : ''} onClick={() => setTool(item.id)} aria-label={`Use ${item.id} annotation`}><SafeIcon icon={item.icon} /></button>)}<span className="tool-divider" /><button className="icon-button" aria-label="Undo annotation" onClick={() => setAnnotations((current) => ({ ...current, [selected]: (current[selected] || []).slice(0, -1) }))}><SafeIcon icon={FiIcons.FiCornerUpLeft} /></button><button className="icon-button" aria-label="Zoom image"><SafeIcon icon={FiIcons.FiZoomIn} /></button></div></div>
          <div className={`screenshot-stage ${storyboard[selected].color}`} onClick={addAnnotation}><div className="mock-app-window"><div className="mock-app-bar"><span className="mock-logo">N</span><b>Northstar Commerce</b><span className="mock-search"><SafeIcon icon={FiIcons.FiSearch} /> Search orders...</span><span className="mock-user">JD</span></div><div className="mock-app-body"><div className="mock-app-nav"><b>OPERATIONS</b><span>Overview</span><span className="mock-nav-active">Orders</span><span>Customers</span><span>Inventory</span><span>Reports</span></div><div className="mock-app-content"><div className="mock-content-heading"><div><small>ORDERS / NEW</small><h3>{storyboard[selected].screen}</h3></div><span className="mock-status">In progress</span></div><div className="mock-data-card"><small>ORDER DETAILS</small><div className="mock-input-row"><span>Customer</span><b>Westfield Supply Co.</b><SafeIcon icon={FiIcons.FiCheck} /></div><div className="mock-input-row"><span>SKU</span><b>NS-2048 · Field kit</b><SafeIcon icon={FiIcons.FiCheck} /></div><div className="mock-input-row highlighted-row"><span>Delivery date</span><b>18 June 2025</b><SafeIcon icon={FiIcons.FiCalendar} /></div><div className="mock-input-row"><span>Quantity</span><b>24 units</b><SafeIcon icon={FiIcons.FiChevronDown} /></div><button className="mock-submit">Continue to review <SafeIcon icon={FiIcons.FiArrowRight} /></button></div></div></div></div>{(annotations[selected] || []).map((annotation, index) => <span className={`annotation-mark mark-${annotation.tool}`} key={index} style={{ left: `${annotation.x}%`, top: `${annotation.y}%` }}>{annotation.tool === 'callout' ? 'Check this field' : annotation.tool === 'arrow' ? '↗' : ''}</span>)}<div className="stage-watermark"><SafeIcon icon={FiIcons.FiMousePointer} /> Click image to add {tool}</div></div>
          <div className="caption-editor"><div><span>STEP INSTRUCTION</span><span className="ai-caption"><SafeIcon icon={FiIcons.FiZap} /> AI DRAFT</span></div><textarea value={caption} onChange={(event) => { setCaption(event.target.value); setAnnotations((current) => ({ ...current, [`caption-${selected}`]: event.target.value })); }} /><div className="caption-foot"><span><SafeIcon icon={FiIcons.FiLink2} /> Linked to source at {storyboard[selected].time}</span><button onClick={() => setNotice('AI suggestion: Verify that each detail matches the original request.')}><SafeIcon icon={FiIcons.FiZap} /> Improve with AI</button></div></div>
          <div className="visual-navigation"><button disabled={selected === 0} onClick={() => chooseSlide(selected - 1)}><SafeIcon icon={FiIcons.FiArrowLeft} /> Previous step</button><span>{selected + 1} of {storyboard.length}</span><button disabled={selected === storyboard.length - 1} onClick={() => chooseSlide(selected + 1)}>Next step <SafeIcon icon={FiIcons.FiArrowRight} /></button></div>
        </section>
        <aside className="annotation-panel"><div className="annotation-heading"><b>ANNOTATIONS</b><button className="subtle-icon"><SafeIcon icon={FiIcons.FiMoreHorizontal} /></button></div><p>Help the reader identify what matters in this frame.</p>{(annotations[selected] || []).length ? (annotations[selected] || []).map((item, index) => <div className="annotation-item" key={index}><span className={`annotation-tool-icon ${item.tool}`}><SafeIcon icon={item.tool === 'arrow' ? FiIcons.FiArrowUpRight : item.tool === 'highlight' ? FiIcons.FiSquare : FiIcons.FiMessageSquare} /></span><span><b>{item.tool[0].toUpperCase() + item.tool.slice(1)} annotation</b><small>Added just now</small></span><button className="subtle-icon" onClick={() => setAnnotations((current) => ({ ...current, [selected]: current[selected].filter((_, itemIndex) => itemIndex !== index) }))}><SafeIcon icon={FiIcons.FiX} /></button></div>) : <div className="annotation-empty"><SafeIcon icon={FiIcons.FiMousePointer} /><span>No annotations on this frame yet.</span><small>Choose a tool, then click the screenshot.</small></div>}<div className="annotation-ai"><span><SafeIcon icon={FiIcons.FiZap} /> AI SUGGESTION</span><p>Highlight the delivery date field to make the verification step easier to follow.</p><button onClick={() => { setTool('highlight'); setNotice('Highlight tool selected. Click the delivery date in the screenshot.'); }}>Use suggestion <SafeIcon icon={FiIcons.FiArrowRight} /></button></div></aside>
      </div>
      {notice && <div className="toast-message"><SafeIcon icon={FiIcons.FiCheckCircle} /> {notice}<button onClick={() => setNotice('')}><SafeIcon icon={FiIcons.FiX} /></button></div>}
    </div>
  );
}

export default VisualStudio;
