import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const initialSteps = [
  'Open the shared operations inbox and locate the incoming order request.',
  'Confirm the customer name, SKU, quantity, and requested delivery date against the order record.',
  'If any required details are missing, contact the customer and pause order entry until a response arrives.',
  'Create the order in the ERP using the verified request details.',
  'Route the order to the team lead for review and approval.',
  'Send the order confirmation and reference number to the customer.'
];

function SopStudio() {
  const [steps, setSteps] = useState(initialSteps);
  const [active, setActive] = useState(0);
  const [saved, setSaved] = useState(true);
  const [notice, setNotice] = useState('');

  const editStep = (index, value) => {
    setSteps((current) => current.map((step, stepIndex) => stepIndex === index ? value : step));
    setSaved(false);
  };

  const addStep = () => {
    setSteps((current) => [...current, 'Add a clear instruction for this step.']);
    setActive(steps.length);
    setSaved(false);
  };

  return (
    <div className="studio-page sop-page">
      <div className="page-heading studio-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> SOP STUDIO <span className="draft-pill">DRAFT</span></div><h1>Order fulfillment procedure</h1><p>Drafted from As-Is process v1.4 <span>·</span> Last edited just now</p></div><div className="heading-actions"><span className="saved-indicator"><i /> {saved ? 'All changes saved' : 'Unsaved changes'}</span><button className="secondary-button" onClick={() => setNotice('Revision history is simulated in this prototype.')}><SafeIcon icon={FiIcons.FiClock} /> History</button><button className="primary-button" onClick={() => { setSaved(true); setNotice('Draft saved for review.'); }}><SafeIcon icon={FiIcons.FiSend} /> Request review</button></div></div>
      <div className="sop-workspace">
        <aside className="document-outline"><div className="outline-title"><b>IN THIS DOCUMENT</b><button className="subtle-icon"><SafeIcon icon={FiIcons.FiMoreHorizontal} /></button></div><button className="outline-link selected"><span>01</span> Purpose & scope</button><button className="outline-link"><span>02</span> Responsibilities</button><button className="outline-link"><span>03</span> Prerequisites</button><button className="outline-link"><span>04</span> Procedure <i>6</i></button><button className="outline-link"><span>05</span> Exceptions</button><button className="outline-link"><span>06</span> Revision notes</button><div className="outline-divider" /><button className="outline-add"><SafeIcon icon={FiIcons.FiPlus} /> Add section</button><div className="source-reference"><span className="source-ref-icon"><SafeIcon icon={FiIcons.FiGitBranch} /></span><div><small>SOURCE PROCESS</small><b>Order fulfillment</b><span>As-Is v1.4 · 7 activities</span></div></div></aside>
        <section className="document-stage">
          <div className="document-toolbar"><div><button className="format-select">Body text <SafeIcon icon={FiIcons.FiChevronDown} /></button><span className="toolbar-separator" /><button className="format-button"><b>B</b></button><button className="format-button"><i>I</i></button><button className="format-button"><SafeIcon icon={FiIcons.FiLink} /></button><button className="format-button"><SafeIcon icon={FiIcons.FiList} /></button></div><button className="ai-rewrite" onClick={() => setNotice('AI rewrite suggestion: use concise, action-first language.')}><SafeIcon icon={FiIcons.FiZap} /> Ask AI to improve</button></div>
          <article className="document-paper"><div className="doc-kicker">STANDARD OPERATING PROCEDURE <span>·</span> OPS-OF-014</div><h2>Order fulfillment</h2><div className="doc-meta"><span><small>PROCESS OWNER</small>Operations team</span><span><small>VERSION</small>Draft 0.3</span><span><small>REVIEW STATUS</small><b className="review-status"><i /> In review</b></span></div><div className="doc-rule" /><h3>Purpose</h3><p className="editable-copy" contentEditable suppressContentEditableWarning onInput={() => setSaved(false)}>Ensure customer orders are verified, entered, approved, and confirmed consistently and accurately.</p><h3>Scope</h3><p className="editable-copy" contentEditable suppressContentEditableWarning onInput={() => setSaved(false)}>Applies to all customer order requests received by the Northstar operations team through the shared inbox.</p><div className="doc-callout"><SafeIcon icon={FiIcons.FiInfo} /><p><b>Before you begin</b><br />Verify the request source and ensure the customer record is available in the order system.</p></div><h3>Procedure</h3><p className="doc-hint">Select a step to edit its wording. Source evidence remains linked to the observed process.</p><ol className="procedure-list">{steps.map((step, index) => <li className={active === index ? 'active-step' : ''} key={`${index}-${step.slice(0, 12)}`} onClick={() => setActive(index)}><span className="step-index">{String(index + 1).padStart(2, '0')}</span><div><p contentEditable suppressContentEditableWarning onInput={(event) => editStep(index, event.currentTarget.textContent)}>{step}</p><button className="step-source"><SafeIcon icon={FiIcons.FiVideo} /> Source evidence · {['00:14', '00:32', '03:51', '04:12', '06:05', '10:26'][index] || '10:26'}</button></div><button className="subtle-icon"><SafeIcon icon={FiIcons.FiMoreHorizontal} /></button></li>)}</ol><button className="add-procedure-step" onClick={addStep}><SafeIcon icon={FiIcons.FiPlus} /> Add procedure step</button><div className="doc-warning"><SafeIcon icon={FiIcons.FiAlertTriangle} /><span><b>Exception: incomplete request</b><br />Contact the customer for missing information. Do not create the ERP order until required details are confirmed.</span><button className="subtle-icon"><SafeIcon icon={FiIcons.FiArrowUpRight} /></button></div><h3>Responsibilities</h3><p className="editable-copy" contentEditable suppressContentEditableWarning onInput={() => setSaved(false)}>Operations associates verify and enter requests. Team leads review and approve orders before customer confirmation.</p></article>
        </section>
        <aside className="doc-assistant"><div className="assistant-title"><span className="assistant-mark"><SafeIcon icon={FiIcons.FiZap} /></span><div><b>SOP copilot</b><span>Grounded in this process</span></div><button className="subtle-icon"><SafeIcon icon={FiIcons.FiMoreHorizontal} /></button></div><div className="assistant-prompt"><span className="assistant-spark">✦</span><p>This procedure has <b>2 steps without explicit owners</b>. Want me to suggest responsibility language?</p><div><button className="mini-primary" onClick={() => setNotice('Suggestion added to the draft for your review.')}>Review suggestion</button><button className="mini-dismiss">Dismiss</button></div></div><div className="assistant-sources"><small>DOCUMENT SOURCES</small><button><SafeIcon icon={FiIcons.FiGitBranch} /><span><b>As-Is process v1.4</b><small>7 activities · 4 evidence clips</small></span></button><button><SafeIcon icon={FiIcons.FiVideo} /><span><b>Walkthrough video</b><small>Order fulfillment · 14:38</small></span></button></div><div className="assistant-bottom"><SafeIcon icon={FiIcons.FiLock} /> AI suggestions require your review</div></aside>
      </div>
      {notice && <div className="toast-message"><SafeIcon icon={FiIcons.FiCheckCircle} /> {notice}<button onClick={() => setNotice('')}><SafeIcon icon={FiIcons.FiX} /></button></div>}
    </div>
  );
}

export default SopStudio;
