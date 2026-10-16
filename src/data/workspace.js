export const activities = [
  {
    id: 'request',
    number: '01',
    title: 'Receive request',
    owner: 'Customer',
    kind: 'Start',
    duration: '00:18',
    confidence: 98,
    time: '00:14',
    evidence: 'A customer request arrives through the shared operations inbox.',
    insight: 'Requests arrive through three channels; email is the most common.',
    x: 42,
    y: 158
  },
  {
    id: 'verify',
    number: '02',
    title: 'Verify order details',
    owner: 'Operations associate',
    kind: 'Activity',
    duration: '02:46',
    confidence: 94,
    time: '00:32',
    evidence: 'The associate opens the order system and cross-checks the customer, SKU, and requested delivery date.',
    insight: 'Manual cross-checking adds an average of 2.8 minutes per request.',
    x: 252,
    y: 158
  },
  {
    id: 'complete',
    number: '03',
    title: 'Information complete?',
    owner: 'Decision',
    kind: 'Decision',
    duration: '00:12',
    confidence: 89,
    time: '03:26',
    evidence: 'A decision point: the associate checks whether all required order fields are present.',
    insight: 'Missing delivery dates are the most frequent exception.',
    x: 478,
    y: 158
  },
  {
    id: 'follow-up',
    number: '04a',
    title: 'Request missing info',
    owner: 'Operations associate',
    kind: 'Exception',
    duration: '1.4 days',
    confidence: 86,
    time: '03:51',
    evidence: 'The associate emails the customer for a missing delivery date, then waits for a reply.',
    insight: 'This exception path creates the longest delay in the process.',
    x: 704,
    y: 286
  },
  {
    id: 'enter',
    number: '04b',
    title: 'Enter order in ERP',
    owner: 'Operations associate',
    kind: 'Activity',
    duration: '01:32',
    confidence: 96,
    time: '04:12',
    evidence: 'With complete details confirmed, the associate creates a new order in the ERP.',
    insight: 'The same details are re-entered in two systems.',
    x: 704,
    y: 100
  },
  {
    id: 'approve',
    number: '05',
    title: 'Review & approve',
    owner: 'Team lead',
    kind: 'Handoff',
    duration: '04:10',
    confidence: 91,
    time: '06:05',
    evidence: 'The order is sent to a team lead for approval before fulfillment.',
    insight: 'Approval is a queue-based handoff with limited visibility.',
    x: 930,
    y: 100
  },
  {
    id: 'finish',
    number: '06',
    title: 'Confirm to customer',
    owner: 'Operations associate',
    kind: 'End',
    duration: '00:42',
    confidence: 93,
    time: '10:26',
    evidence: 'After approval, the associate sends a confirmation email with the order reference.',
    insight: 'Confirmation is fully manual and uses a reusable template.',
    x: 1156,
    y: 100
  }
];

export const evidenceItems = [
  { time: '00:32', label: 'Order record opened', type: 'screen' },
  { time: '01:08', label: 'Customer and SKU cross-check', type: 'screen' },
  { time: '02:41', label: 'Delivery date reviewed', type: 'screen' },
  { time: '03:18', label: 'Details confirmed', type: 'note' }
];

export const agents = [
  { name: 'Mara Chen', role: 'Process Analyst', initials: 'MC', tone: 'violet' },
  { name: 'Eli Turner', role: 'Improvement Specialist', initials: 'ET', tone: 'mint' },
  { name: 'Ravi Shah', role: 'Risk Analyst', initials: 'RS', tone: 'amber' }
];

export const initialMessages = [
  {
    author: 'Mara Chen',
    initials: 'MC',
    tone: 'violet',
    time: '09:42',
    text: 'I found a repeat handoff between order verification and ERP entry. The associate checks the same customer and SKU details in both systems.',
    tag: 'Evidence · 00:32–02:41'
  },
  {
    author: 'Eli Turner',
    initials: 'ET',
    tone: 'mint',
    time: '09:44',
    text: 'A pre-fill from the request email could remove that duplicate entry. I estimate 1.6–2.1 minutes saved per order, pending a data-quality check.'
  },
  {
    author: 'Ravi Shah',
    initials: 'RS',
    tone: 'amber',
    time: '09:46',
    text: 'Challenge: email parsing may misread non-standard SKUs. Keep a human validation checkpoint before order submission.',
    tag: 'Challenge · Risk review'
  }
];

export const storySteps = activities.map((activity) => activity.id);
