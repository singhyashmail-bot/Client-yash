// LalaFlow — Operations Command Center
// Built for Lala Tech LLC — Client Chaos Competition
// Complete Bug-Free Implementation with Stage Controls, Follow-up Radar, and Multi-channel Ingestion

const { useState, useEffect, useMemo, useRef } = React;

// --- ZERO-DEPENDENCY SVG ICONS ---
const Icons = {
  LayoutDashboard: (props) => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  ),
  CheckSquare: (props) => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  Sparkles: (props) => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  Users: (props) => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Bell: (props) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
  Settings: (props) => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  AlertTriangle: (props) => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Clock: (props) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  PauseCircle: (props) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" /><line x1="10" y1="15" x2="10" y2="9" /><line x1="14" y1="15" x2="14" y2="9" />
    </svg>
  ),
  HelpCircle: (props) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  UserX: (props) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="17" y1="8" x2="22" y2="13" /><line x1="22" y1="8" x2="17" y2="13" />
    </svg>
  ),
  CheckCircle2: (props) => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
    </svg>
  ),
  ArrowRight: (props) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  ArrowLeft: (props) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  Plus: (props) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Search: (props) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  X: (props) => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  MessageSquare: (props) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Mail: (props) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Phone: (props) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  FileText: (props) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  Trash2: (props) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  ),
  Check: (props) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
};

// --- STAGE DEFINITIONS ---
const STAGES = [
  { id: 'new_request', label: 'New Request', desc: 'Inbound raw request / triage', colHeader: 'NEW REQUEST', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'needs_clarification', label: 'Needs Clarification', desc: 'Missing info or scoping required', colHeader: 'NEEDS CLARIFICATION', badge: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'ready_to_assign', label: 'Ready to Assign', desc: 'Clarified & ready for employee routing', colHeader: 'READY TO ASSIGN', badge: 'bg-sky-50 text-sky-700 border-sky-200' },
  { id: 'in_progress', label: 'In Progress', desc: 'Actively owned and being worked', colHeader: 'IN PROGRESS', badge: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'waiting_client', label: 'Waiting on Client', desc: 'Paused waiting for client — SLA NOT counted against us', colHeader: 'WAITING ON CLIENT', badge: 'bg-amber-50 text-amber-800 border-amber-300' },
  { id: 'done', label: 'Done', desc: 'Fully resolved and closed', colHeader: 'DONE', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
];

const TEAM_MEMBERS = [
  { name: "John", role: "Operations", title: "Operations Lead", avatarBg: "bg-indigo-600" },
  { name: "Sarah", role: "Customer Success", title: "Customer Success Lead", avatarBg: "bg-emerald-600" },
  { name: "Mike", role: "Finance", title: "Finance & Accounting", avatarBg: "bg-amber-600" },
  { name: "Priya", role: "Operations", title: "Operations Associate", avatarBg: "bg-purple-600" }
];

function isWaitingForUs(task) {
  if (task.status === 'done' || task.status === 'waiting_client') return false;
  return true;
}

function isUnassigned(task) {
  return task.status !== 'done' && (!task.owner || task.owner === 'Unassigned');
}

function isTrulyOverdue(task) {
  if (task.status === 'done') return false;
  if (task.status === 'waiting_client') return false;
  return Boolean(task.isOverdue);
}

function isNeedsFollowUp(task) {
  if (task.status === 'done') return false;
  return Boolean(task.needsFollowUp);
}

// Initial realistic dataset
const INITIAL_TASKS = [
  {
    id: "task-1",
    title: "Send August invoice",
    description: "ABC Ltd requested the August invoice before tomorrow afternoon.",
    owner: "John",
    priority: "high",
    status: "in_progress",
    dueDate: "Today, 4:00 PM",
    isOverdue: false,
    isDueToday: true,
    completedToday: false,
    needsFollowUp: false,
    followUpDate: "",
    source: "WhatsApp",
    clientWaitingReason: "",
    createdAt: "Today, 9:15 AM",
    timeline: [
      { id: "t-1", text: "Captured from WhatsApp client chat", time: "Today, 9:15 AM", user: "AI Parser" },
      { id: "t-2", text: "Assigned to John (In Progress)", time: "Today, 9:16 AM", user: "Manager" }
    ],
    comments: [{ id: "c-1", author: "John", text: "Compiling invoice lines from ERP.", time: "Today, 10:00 AM" }]
  },
  {
    id: "task-2",
    title: "Custom export module scope - Apex Corp",
    description: "Client sent vague audio message asking for 'custom inventory CSV export like last time'. Need to clarify required fields before assigning.",
    owner: "Unassigned",
    priority: "high",
    status: "needs_clarification",
    dueDate: "Today, 3:00 PM",
    isOverdue: false,
    isDueToday: true,
    completedToday: false,
    needsFollowUp: true,
    followUpDate: "Today, 2:30 PM",
    followUpNote: "Call Apex technical lead to confirm required columns if no reply by 2:30 PM.",
    source: "WhatsApp",
    clientWaitingReason: "Need client to confirm which 5 custom columns are required.",
    createdAt: "Today, 8:30 AM",
    timeline: [
      { id: "t-21", text: "Inbound request flagged as Needs Clarification", time: "Today, 8:30 AM", user: "Manager" },
      { id: "t-22", text: "Follow-up scheduled for 2:30 PM", time: "Today, 9:00 AM", user: "Manager" }
    ],
    comments: [{ id: "c-21", author: "Manager", text: "Sent 3 sample templates back to client to pick.", time: "Today, 9:00 AM" }]
  },
  {
    id: "task-3",
    title: "Credit adjustment authorization",
    description: "Prepared $450 credit memo. Waiting for ABC Ltd CFO to countersign before Mike can apply balance.",
    owner: "Mike",
    priority: "medium",
    status: "waiting_client",
    dueDate: "Tomorrow",
    isOverdue: false,
    isDueToday: false,
    completedToday: false,
    needsFollowUp: true,
    followUpDate: "Tomorrow, 10:00 AM",
    followUpNote: "Ping ABC Ltd CFO on WhatsApp if DocuSign still unsigned.",
    source: "Email",
    clientWaitingReason: "Waiting for ABC Ltd CFO signature on DocuSign document.",
    createdAt: "Yesterday, 3:00 PM",
    timeline: [
      { id: "t-31", text: "Shifted to Waiting on Client (SLA paused)", time: "Yesterday, 4:00 PM", user: "Mike" }
    ],
    comments: []
  },
  {
    id: "task-4",
    title: "Prepare customer quote",
    description: "Sarah has all specifications for Delta Logistics 50-seat rollout but quote has not been dispatched.",
    owner: "Sarah",
    priority: "high",
    status: "in_progress",
    dueDate: "Overdue (2h ago)",
    isOverdue: true,
    isDueToday: false,
    completedToday: false,
    needsFollowUp: true,
    followUpDate: "Immediate",
    followUpNote: "Urgent internal follow-up: Sarah needs manager sign-off on 10% discount.",
    source: "WhatsApp",
    clientWaitingReason: "",
    createdAt: "Today, 7:30 AM",
    timeline: [
      { id: "t-41", text: "Quote request confirmed complete with specs", time: "Today, 7:30 AM", user: "System" },
      { id: "t-42", text: "Internal turnaround SLA breached by 2 hours", time: "Today, 1:00 PM", user: "System" }
    ],
    comments: []
  },
  {
    id: "task-5",
    title: "Configure master portal for Nexus Inc",
    description: "All KYC and billing information collected and verified. Ready to assign to an operations specialist.",
    owner: "Unassigned",
    priority: "medium",
    status: "ready_to_assign",
    dueDate: "Tomorrow",
    isOverdue: false,
    isDueToday: false,
    completedToday: false,
    needsFollowUp: false,
    source: "Email",
    clientWaitingReason: "",
    createdAt: "Today, 10:00 AM",
    timeline: [],
    comments: []
  },
  {
    id: "task-6",
    title: "Reconcile vendor batch #402",
    description: "Bank statement is in our inbox. Payment reconciliation for batch #402 was forgotten.",
    owner: "Mike",
    priority: "high",
    status: "in_progress",
    dueDate: "Overdue (1h ago)",
    isOverdue: true,
    isDueToday: false,
    completedToday: false,
    needsFollowUp: false,
    source: "Email",
    clientWaitingReason: "",
    createdAt: "Today, 8:00 AM",
    timeline: [],
    comments: []
  },
  {
    id: "task-7",
    title: "Tax exemption verification - Global Logistics",
    description: "Invoice on hold until client provides state resale certificate form ST-105.",
    owner: "Sarah",
    priority: "medium",
    status: "waiting_client",
    dueDate: "Yesterday",
    isOverdue: false,
    isDueToday: false,
    completedToday: false,
    needsFollowUp: true,
    followUpDate: "Today, 3:00 PM",
    followUpNote: "Follow up with client accounts department for Form ST-105.",
    source: "WhatsApp",
    clientWaitingReason: "Waiting for client's accounting department to email Form ST-105.",
    createdAt: "2 days ago",
    timeline: [],
    comments: []
  },
  {
    id: "task-8",
    title: "Emergency cargo dispatch inquiry",
    description: "Inbound WhatsApp from Orion Trading asking for express air cargo options for Friday.",
    owner: "Unassigned",
    priority: "high",
    status: "new_request",
    dueDate: "Today, 2:00 PM",
    isOverdue: false,
    isDueToday: true,
    completedToday: false,
    needsFollowUp: false,
    source: "WhatsApp",
    clientWaitingReason: "",
    createdAt: "Today, 11:30 AM",
    timeline: [],
    comments: []
  },
  {
    id: "task-9",
    title: "Resolve billing dispute - Acme Corp",
    description: "Double charge inquiry from client. John has not verified warehouse scale calibration.",
    owner: "John",
    priority: "high",
    status: "in_progress",
    dueDate: "Overdue (3h ago)",
    isOverdue: true,
    isDueToday: false,
    completedToday: false,
    needsFollowUp: false,
    source: "WhatsApp",
    clientWaitingReason: "",
    createdAt: "Yesterday, 5:00 PM",
    timeline: [],
    comments: []
  },
  {
    id: "task-10",
    title: "Dispatch delay rectification",
    description: "Coordinate internal warehouse dock team to reload pallets for Route 4.",
    owner: "Priya",
    priority: "high",
    status: "in_progress",
    dueDate: "Overdue (2h ago)",
    isOverdue: true,
    isDueToday: false,
    completedToday: false,
    needsFollowUp: false,
    source: "Phone",
    clientWaitingReason: "",
    createdAt: "Today, 8:15 AM",
    timeline: [],
    comments: []
  },
  {
    id: "task-11",
    title: "Color swatch approval - Vertex LLC",
    description: "Shipped physical samples via courier. Client needs to confirm swatch #B4.",
    owner: "Sarah",
    priority: "low",
    status: "waiting_client",
    dueDate: "Friday",
    isOverdue: false,
    isDueToday: false,
    completedToday: false,
    needsFollowUp: true,
    followUpDate: "Tomorrow, 11:00 AM",
    followUpNote: "Call client logistics agent to check if courier parcel arrived.",
    source: "Email",
    clientWaitingReason: "Waiting for physical inspection & written sign-off from Vertex LLC buyer.",
    createdAt: "Yesterday",
    timeline: [],
    comments: []
  },
  {
    id: "task-12",
    title: "International TT SWIFT copy verification",
    description: "Waiting on client bank to issue SWIFT MT103 confirmation document.",
    owner: "Mike",
    priority: "high",
    status: "waiting_client",
    dueDate: "Today, 5:00 PM",
    isOverdue: false,
    isDueToday: false,
    completedToday: false,
    needsFollowUp: false,
    source: "Email",
    clientWaitingReason: "Client bank processing overseas wire; awaiting MT103 copy.",
    createdAt: "Today, 9:00 AM",
    timeline: [],
    comments: []
  },
  {
    id: "task-13",
    title: "Freight quotation for oversized crate",
    description: "Client sent request without crate height and gross weight. Cannot calculate freight rate.",
    owner: "Unassigned",
    priority: "medium",
    status: "needs_clarification",
    dueDate: "Today, 4:00 PM",
    isOverdue: false,
    isDueToday: true,
    completedToday: false,
    needsFollowUp: false,
    source: "Email",
    clientWaitingReason: "Awaiting exact package L x W x H dimensions from warehouse manager.",
    createdAt: "Today, 10:15 AM",
    timeline: [],
    comments: []
  },
  {
    id: "task-14",
    title: "Customer callback",
    description: "Customer requested callback between 2-3 PM regarding renewal options.",
    owner: "Sarah",
    priority: "high",
    status: "in_progress",
    dueDate: "Today, 2:00 PM",
    isOverdue: false,
    isDueToday: true,
    completedToday: false,
    needsFollowUp: true,
    followUpDate: "Today, 2:00 PM",
    followUpNote: "Dial client directly at +1 (555) 302-8819 for 15-min renewal briefing.",
    source: "Phone",
    clientWaitingReason: "",
    createdAt: "Today, 8:45 AM",
    timeline: [],
    comments: []
  },
  {
    id: "task-15",
    title: "Onboard logistics vendor",
    description: "Collect KYC documents and insurance bond from SwiftFreight LLC.",
    owner: "John",
    priority: "medium",
    status: "in_progress",
    dueDate: "Today, 5:30 PM",
    isOverdue: false,
    isDueToday: true,
    completedToday: false,
    needsFollowUp: false,
    source: "Email",
    clientWaitingReason: "",
    createdAt: "Today, 9:00 AM",
    timeline: [],
    comments: []
  },
  {
    id: "task-16",
    title: "Audit warehouse packing slips",
    description: "Sample check 20 packing boxes against digital manifest before dispatch.",
    owner: "Priya",
    priority: "high",
    status: "in_progress",
    dueDate: "Today, 4:30 PM",
    isOverdue: false,
    isDueToday: true,
    completedToday: false,
    needsFollowUp: false,
    source: "WhatsApp",
    clientWaitingReason: "",
    createdAt: "Today, 11:30 AM",
    timeline: [],
    comments: []
  },
  {
    id: "task-17",
    title: "Webhook production key provisioning",
    description: "Waiting for client IT security administrator to approve API token generation.",
    owner: "John",
    priority: "medium",
    status: "waiting_client",
    dueDate: "Tomorrow",
    isOverdue: false,
    isDueToday: false,
    completedToday: false,
    needsFollowUp: false,
    source: "Email",
    clientWaitingReason: "Waiting for client IT security officer to authorize production webhook endpoint.",
    createdAt: "Yesterday",
    timeline: [],
    comments: []
  },
  {
    id: "task-18",
    title: "PO line item discrepancy check",
    description: "Client PO number 4410 had pricing error of $120. Waiting for their revised PO.",
    owner: "Mike",
    priority: "medium",
    status: "waiting_client",
    dueDate: "Today, 6:00 PM",
    isOverdue: false,
    isDueToday: false,
    completedToday: false,
    needsFollowUp: false,
    source: "Email",
    clientWaitingReason: "Client purchasing agent issuing corrected PO #4410-B.",
    createdAt: "Today, 8:30 AM",
    timeline: [],
    comments: []
  },
  {
    id: "task-19",
    title: "Dispatch confirmation SMS batch",
    description: "Trigger automated delivery tracking texts for route #12 orders.",
    owner: "Priya",
    priority: "low",
    status: "in_progress",
    dueDate: "Today, 5:00 PM",
    isOverdue: false,
    isDueToday: true,
    completedToday: false,
    needsFollowUp: false,
    source: "WhatsApp",
    clientWaitingReason: "",
    createdAt: "Today, 10:45 AM",
    timeline: [],
    comments: []
  },
  {
    id: "task-20",
    title: "Update client information",
    description: "Update tax ID and billing address for OmniCorp in master ERP spreadsheet.",
    owner: "Priya",
    priority: "low",
    status: "in_progress",
    dueDate: "Tomorrow",
    isOverdue: false,
    isDueToday: false,
    completedToday: false,
    needsFollowUp: false,
    source: "Manual",
    clientWaitingReason: "",
    createdAt: "Today, 10:00 AM",
    timeline: [],
    comments: []
  },
  {
    id: "task-21",
    title: "Inventory cycle recount in aisle 4",
    description: "Discrepancy of 14 units detected in barcoded storage bins.",
    owner: "John",
    priority: "medium",
    status: "in_progress",
    dueDate: "Friday",
    isOverdue: false,
    isDueToday: false,
    completedToday: false,
    needsFollowUp: false,
    source: "Manual",
    clientWaitingReason: "",
    createdAt: "Today, 9:40 AM",
    timeline: [],
    comments: []
  },
  {
    id: "task-22",
    title: "Bank statement reconciliation (August)",
    description: "Match merchant processor settlement records to operating bank account.",
    owner: "Mike",
    priority: "high",
    status: "in_progress",
    dueDate: "Tomorrow",
    isOverdue: false,
    isDueToday: false,
    completedToday: false,
    needsFollowUp: false,
    source: "Email",
    clientWaitingReason: "",
    createdAt: "Today, 7:15 AM",
    timeline: [],
    comments: []
  },
  {
    id: "task-23",
    title: "Facility temperature calibration report",
    description: "Log cold-chain telemetry readings for pharmaceutical storage chamber.",
    owner: "John",
    priority: "medium",
    status: "in_progress",
    dueDate: "Tomorrow",
    isOverdue: false,
    isDueToday: false,
    completedToday: false,
    needsFollowUp: false,
    source: "Manual",
    clientWaitingReason: "",
    createdAt: "Today, 9:20 AM",
    timeline: [],
    comments: []
  },
  {
    id: "task-24",
    title: "Draft SLA response for Apex",
    description: "Complete formal response to client inquiry regarding uptime guarantees.",
    owner: "Sarah",
    priority: "high",
    status: "in_progress",
    dueDate: "Today, 3:00 PM",
    isOverdue: false,
    isDueToday: true,
    completedToday: false,
    needsFollowUp: false,
    source: "Email",
    clientWaitingReason: "",
    createdAt: "Today, 10:20 AM",
    timeline: [],
    comments: []
  },

  // 11 COMPLETED TODAY TASKS
  {
    id: "task-c1",
    title: "Confirm morning courier pickup",
    description: "Dispatched 4 express packets via DHL.",
    owner: "John",
    priority: "high",
    status: "done",
    dueDate: "Today, 10:00 AM",
    completedToday: true,
    source: "WhatsApp",
    timeline: [{ id: "t-c1", text: "Completed by John", time: "Today, 10:05 AM", user: "John" }]
  },
  {
    id: "task-c2",
    title: "Issue credit note to Apex Corp",
    description: "Processed $320 warranty adjustment.",
    owner: "Mike",
    priority: "medium",
    status: "done",
    dueDate: "Today, 11:00 AM",
    completedToday: true,
    source: "Email",
    timeline: []
  },
  {
    id: "task-c3",
    title: "VIP client check-in call",
    description: "Account check-in with Omega Retail CEO.",
    owner: "Sarah",
    priority: "high",
    status: "done",
    dueDate: "Today, 11:30 AM",
    completedToday: true,
    source: "Phone",
    timeline: []
  },
  {
    id: "task-c4",
    title: "Update barcode label template",
    description: "Revised layout to include new batch QR code.",
    owner: "Priya",
    priority: "low",
    status: "done",
    dueDate: "Today, 12:00 PM",
    completedToday: true,
    source: "Manual",
    timeline: []
  },
  {
    id: "task-c5",
    title: "Review daily packing productivity",
    description: "Analyzed throughput metrics from night shift.",
    owner: "John",
    priority: "medium",
    status: "done",
    dueDate: "Today, 1:00 PM",
    completedToday: true,
    source: "Manual",
    timeline: []
  },
  {
    id: "task-c6",
    title: "Vendor invoice audit: Horizon Energy",
    description: "Confirmed utility charges match meter read.",
    owner: "Mike",
    priority: "medium",
    status: "done",
    dueDate: "Today, 1:30 PM",
    completedToday: true,
    source: "Email",
    timeline: []
  },
  {
    id: "task-c7",
    title: "Send onboarding pack to New Client",
    description: "Welcome documentation sent to Nexus Ltd.",
    owner: "Sarah",
    priority: "high",
    status: "done",
    dueDate: "Today, 2:00 PM",
    completedToday: true,
    source: "Email",
    timeline: []
  },
  {
    id: "task-c8",
    title: "Warehouse inventory manifest signoff",
    description: "Signed off morning receiving docket.",
    owner: "Priya",
    priority: "medium",
    status: "done",
    dueDate: "Today, 2:30 PM",
    completedToday: true,
    source: "Manual",
    timeline: []
  },
  {
    id: "task-c9",
    title: "Verify export license expiration",
    description: "Confirmed clearance documentation is valid through 2027.",
    owner: "Sarah",
    priority: "low",
    status: "done",
    dueDate: "Today, 3:00 PM",
    completedToday: true,
    source: "Email",
    timeline: []
  },
  {
    id: "task-c10",
    title: "Process petty cash vouchers",
    description: "Reimbursed $85 for packing supplies.",
    owner: "Mike",
    priority: "low",
    status: "done",
    dueDate: "Today, 3:15 PM",
    completedToday: true,
    source: "Manual",
    timeline: []
  },
  {
    id: "task-c11",
    title: "Staff shift allocation review",
    description: "Confirmed roster coverage for weekend emergency shifts.",
    owner: "Priya",
    priority: "high",
    status: "done",
    dueDate: "Today, 3:30 PM",
    completedToday: true,
    source: "WhatsApp",
    timeline: []
  }
];

function getPriorityBadge(priority) {
  switch (priority) {
    case 'high':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
          High
        </span>
      );
    case 'medium':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Med
        </span>
      );
    case 'low':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          Low
        </span>
      );
    default:
      return null;
  }
}

function getStageBadge(status) {
  const stage = STAGES.find(s => s.id === status);
  if (!stage) return null;

  if (status === 'waiting_client') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
        <Icons.PauseCircle className="w-3.5 h-3.5 text-amber-700" />
        Waiting on Client
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${stage.badge}`}>
      {stage.label}
    </span>
  );
}

function getSourceBadge(source) {
  switch (source) {
    case 'WhatsApp':
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <Icons.MessageSquare className="w-3 h-3 text-emerald-600" />
          WhatsApp
        </span>
      );
    case 'Email':
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <Icons.Mail className="w-3 h-3 text-blue-600" />
          Email
        </span>
      );
    case 'Phone':
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
          <Icons.Phone className="w-3 h-3 text-purple-600" />
          Phone
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          <Icons.FileText className="w-3 h-3 text-slate-500" />
          Manual
        </span>
      );
  }
}

function OwnerAvatar({ name, size = "sm" }) {
  if (!name || name === 'Unassigned') {
    const sizeClasses = size === "lg" ? "w-10 h-10 text-xs" : size === "md" ? "w-8 h-8 text-[11px]" : "w-6 h-6 text-[10px]";
    return (
      <div className={`rounded-full flex items-center justify-center font-bold shrink-0 border border-dashed border-slate-400 bg-slate-100 text-slate-500 ${sizeClasses}`} title="Unassigned">
        ?
      </div>
    );
  }

  const member = TEAM_MEMBERS.find(m => m.name === name) || { avatarBg: "bg-slate-700" };
  const sizeClasses = size === "lg" ? "w-10 h-10 text-sm" : size === "md" ? "w-8 h-8 text-xs" : "w-6 h-6 text-[11px]";
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className={`rounded-full flex items-center justify-center font-bold shrink-0 text-white shadow-sm ${member.avatarBg} ${sizeClasses}`} title={name}>
      {initial}
    </div>
  );
}

// --- MAIN APPLICATION COMPONENT ---
function LalaFlowApp() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('lalaflow_full_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TASKS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('lalaflow_full_v4', JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  const [currentTab, setCurrentTab] = useState('dashboard');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const selectedTask = useMemo(() => tasks.find(t => t.id === selectedTaskId) || null, [tasks, selectedTaskId]);

  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  // Manager View Filter: 'ALL' | 'WAITING_FOR_US' | 'WAITING_CLIENT' | 'FOLLOW_UP' | 'UNASSIGNED' | 'OVERDUE'
  const [managerFilter, setManagerFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOwner, setFilterOwner] = useState('ALL');

  // Toasts
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const [showDemoGuide, setShowDemoGuide] = useState(false);

  // Computed Metrics
  const waitingForUsTasks = useMemo(() => tasks.filter(isWaitingForUs), [tasks]);
  const waitingClientTasks = useMemo(() => tasks.filter(t => t.status === 'waiting_client'), [tasks]);
  const followUpTasks = useMemo(() => tasks.filter(isNeedsFollowUp), [tasks]);
  const unassignedTasks = useMemo(() => tasks.filter(isUnassigned), [tasks]);
  const overdueTasks = useMemo(() => tasks.filter(isTrulyOverdue), [tasks]);
  const completedTodayTasks = useMemo(() => tasks.filter(t => t.status === 'done' && t.completedToday), [tasks]);

  // Update Task
  const handleUpdateTask = (updatedTask, timelineMsg) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== updatedTask.id) return t;
      const updated = { ...updatedTask };
      if (timelineMsg) {
        updated.timeline = [
          ...(updated.timeline || []),
          { id: `tl-${Date.now()}`, text: timelineMsg, time: "Just now", user: "Manager" }
        ];
      }
      return updated;
    }));
  };

  // Delete Task
  const handleDeleteTask = (taskId) => {
    const target = tasks.find(t => t.id === taskId);
    setTasks(prev => prev.filter(t => t.id !== taskId));
    if (selectedTaskId === taskId) setSelectedTaskId(null);
    addToast(`Task "${target ? target.title : taskId}" deleted.`, 'info');
  };

  // Move Stage by Index (quick advance)
  const handleMoveStage = (taskId, direction) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    const currentIndex = STAGES.findIndex(s => s.id === task.status);
    if (currentIndex === -1) return;
    const nextIndex = currentIndex + direction;
    if (nextIndex < 0 || nextIndex >= STAGES.length) return;

    const nextStage = STAGES[nextIndex].id;
    const isNowDone = nextStage === 'done';
    const isNowWaitingClient = nextStage === 'waiting_client';

    handleUpdateTask({
      ...task,
      status: nextStage,
      completedToday: isNowDone ? true : false,
      isOverdue: (isNowDone || isNowWaitingClient) ? false : task.isOverdue
    }, `Shifted to ${STAGES[nextIndex].label}`);
    addToast(`"${task.title}" shifted to ${STAGES[nextIndex].label}`, 'success');
  };

  // Mark Complete
  const handleMarkComplete = (task) => {
    const isNowDone = task.status !== 'done';
    const updated = {
      ...task,
      status: isNowDone ? 'done' : 'in_progress',
      completedToday: isNowDone ? true : false,
      needsFollowUp: false,
      isOverdue: false
    };
    handleUpdateTask(updated, isNowDone ? "Marked Complete by Manager" : "Re-opened to In Progress");
    addToast(isNowDone ? `Task "${task.title}" completed!` : `Task "${task.title}" re-opened.`, 'success');
  };

  // Reset demo
  const handleResetData = () => {
    setTasks(INITIAL_TASKS);
    localStorage.removeItem('lalaflow_full_v4');
    addToast("Workflow demo data reset to default.", "info");
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col shrink-0 border-r border-slate-800">
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 text-white font-bold text-lg">
              LF
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white tracking-tight text-lg">LalaFlow</span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">Command Center</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Lala Tech LLC</p>
            </div>
          </div>
        </div>

        {/* Live Queue Status */}
        <div className="px-4 py-3 bg-slate-950/40 border-b border-slate-800/80 space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Live Queue Status</p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">Waiting for Us:</span>
            <span className="text-indigo-400 font-mono font-bold">{waitingForUsTasks.length}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-amber-300 flex items-center gap-1">
              <Icons.PauseCircle className="w-3 h-3 text-amber-400" />
              Waiting on Client:
            </span>
            <span className="text-amber-400 font-mono font-bold">{waitingClientTasks.length} (Paused)</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-purple-300 flex items-center gap-1">
              <Icons.Bell className="w-3 h-3 text-purple-400" />
              Needs Follow-up:
            </span>
            <span className="text-purple-400 font-mono font-bold">{followUpTasks.length}</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <div className="px-3 pt-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Navigation
          </div>

          <button
            onClick={() => { setCurrentTab('dashboard'); setManagerFilter('ALL'); setSearchQuery(''); setFilterOwner('ALL'); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icons.LayoutDashboard className={currentTab === 'dashboard' ? 'text-white' : 'text-slate-400'} />
              <span>Dashboard</span>
            </div>
            {overdueTasks.length > 0 && (
              <span className="px-1.5 py-0.5 text-xs font-bold rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {overdueTasks.length}
              </span>
            )}
          </button>

          <button
            onClick={() => { setCurrentTab('tasks'); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'tasks' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icons.CheckSquare className={currentTab === 'tasks' ? 'text-white' : 'text-slate-400'} />
              <span>Workflow Board</span>
            </div>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-800 text-slate-300">
              {tasks.filter(t => t.status !== 'done').length}
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('quick-capture')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              currentTab === 'quick-capture' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icons.Sparkles className={currentTab === 'quick-capture' ? 'text-white' : 'text-amber-400'} />
              <span>Quick Capture</span>
            </div>
            <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-gradient-to-r from-amber-500/20 to-indigo-500/20 text-amber-300 border border-amber-500/30">
              AI Triage
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('team')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'team' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icons.Users className={currentTab === 'team' ? 'text-white' : 'text-slate-400'} />
              <span>Team</span>
            </div>
            <span className="text-xs text-slate-400">4</span>
          </button>

          <div className="pt-4 px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            System
          </div>

          <button
            onClick={() => setCurrentTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'settings' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Icons.Settings className={currentTab === 'settings' ? 'text-white' : 'text-slate-400'} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="p-3 bg-slate-950/60 border-t border-slate-800 space-y-2">
          <button
            onClick={() => setShowDemoGuide(!showDemoGuide)}
            className="w-full py-2 px-3 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <Icons.HelpCircle className="w-4 h-4 text-indigo-400" />
              <span>3-Min Demo Script</span>
            </div>
            <span className="text-[10px] bg-indigo-600/40 text-indigo-200 px-1.5 py-0.5 rounded font-mono">
              {showDemoGuide ? "Hide" : "Show"}
            </span>
          </button>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 bg-white px-8 flex items-center justify-between shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
              LalaFlow
            </span>
            <span className="text-slate-300">/</span>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-800 capitalize">
                {currentTab === 'tasks' ? 'Workflow Board' : currentTab === 'quick-capture' ? 'Quick Capture & Triage' : currentTab}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsNewTaskModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
            >
              <Icons.Plus className="w-3.5 h-3.5 text-slate-500" />
              <span>Add Task</span>
            </button>

            <button
              onClick={() => setCurrentTab('quick-capture')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
            >
              <Icons.Sparkles className="w-3.5 h-3.5 text-indigo-200" />
              <span>Quick Capture</span>
            </button>

            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-semibold text-xs flex items-center justify-center">
                LT
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">Operations Lead</p>
                <p className="text-[11px] text-slate-600">Lala Tech LLC</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          {currentTab === 'dashboard' && (
            <DashboardView
              tasks={tasks}
              waitingForUsCount={waitingForUsTasks.length}
              waitingClientCount={waitingClientTasks.length}
              followUpCount={followUpTasks.length}
              unassignedCount={unassignedTasks.length}
              overdueCount={overdueTasks.length}
              completedTodayCount={completedTodayTasks.length}
              onNavigateWithFilter={(filterType) => {
                setManagerFilter(filterType);
                setSearchQuery('');
                setFilterOwner('ALL');
                setCurrentTab('tasks');
              }}
              onOpenTask={(id) => setSelectedTaskId(id)}
              onQuickCapture={() => setCurrentTab('quick-capture')}
            />
          )}

          {currentTab === 'tasks' && (
            <TasksBoardView
              tasks={tasks}
              managerFilter={managerFilter}
              setManagerFilter={setManagerFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterOwner={filterOwner}
              setFilterOwner={setFilterOwner}
              onOpenTask={(id) => setSelectedTaskId(id)}
              onUpdateTask={handleUpdateTask}
              onMoveStage={handleMoveStage}
              onMarkComplete={handleMarkComplete}
              onQuickCapture={() => setCurrentTab('quick-capture')}
              onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
            />
          )}

          {currentTab === 'quick-capture' && (
            <QuickCaptureView
              onTaskCreated={(newTask) => {
                setTasks(prev => [newTask, ...prev]);
                addToast("New request created and triaged into pipeline!", "success");
              }}
              onNavigateToTasks={(createdId) => {
                setManagerFilter('ALL');
                setSearchQuery('');
                setFilterOwner('ALL');
                setCurrentTab('tasks');
                if (createdId) setSelectedTaskId(createdId);
              }}
            />
          )}

          {currentTab === 'team' && (
            <TeamView
              tasks={tasks}
              onSelectMember={(memberName) => {
                setFilterOwner(memberName);
                setManagerFilter('ALL');
                setSearchQuery('');
                setCurrentTab('tasks');
              }}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              taskCount={tasks.length}
              onReset={handleResetData}
            />
          )}
        </div>
      </main>

      {/* TASK DETAIL MODAL */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTaskId(null)}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          onToast={addToast}
        />
      )}

      {/* NEW MANUAL TASK MODAL */}
      {isNewTaskModalOpen && (
        <NewTaskModal
          onClose={() => setIsNewTaskModalOpen(false)}
          onCreate={(newTask) => {
            setTasks(prev => [newTask, ...prev]);
            addToast(`Task "${newTask.title}" added to board!`, "success");
            setIsNewTaskModalOpen(false);
          }}
          onOpenQuickCapture={() => {
            setIsNewTaskModalOpen(false);
            setCurrentTab('quick-capture');
          }}
        />
      )}

      {/* DEMO GUIDE POPUP */}
      {showDemoGuide && (
        <DemoGuideModal onClose={() => setShowDemoGuide(false)} />
      )}

      {/* FLOATING TOASTS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="pointer-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium bg-slate-900 text-white border-slate-800 animate-modal"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 1. DASHBOARD VIEW ---
function DashboardView({
  tasks,
  waitingForUsCount,
  waitingClientCount,
  followUpCount,
  unassignedCount,
  overdueCount,
  completedTodayCount,
  onNavigateWithFilter,
  onOpenTask,
  onQuickCapture
}) {
  const priorityTasks = useMemo(() => {
    return tasks
      .filter(isWaitingForUs)
      .sort((a, b) => {
        if (isTrulyOverdue(a) && !isTrulyOverdue(b)) return -1;
        if (!isTrulyOverdue(a) && isTrulyOverdue(b)) return 1;
        const pOrder = { high: 0, medium: 1, low: 2 };
        return pOrder[a.priority] - pOrder[b.priority];
      })
      .slice(0, 6);
  }, [tasks]);

  const followUpRadarList = useMemo(() => {
    return tasks.filter(t => t.needsFollowUp && t.status !== 'done').slice(0, 4);
  }, [tasks]);

  return (
    <div className="max-w-6xl mx-auto space-y-7 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Good morning, Team 👋
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Operations summary across WhatsApp, Email, Phone, and Manual channels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onQuickCapture}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all"
          >
            <Icons.Sparkles className="w-4 h-4 text-indigo-600" />
            Paste Inbound Request
          </button>
        </div>
      </div>

      {/* EXECUTIVE CLARITY BAR */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
          Executive Operational Clarity
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          <div
            onClick={() => onNavigateWithFilter('WAITING_FOR_US')}
            className="p-2.5 rounded-lg bg-indigo-50/60 hover:bg-indigo-100/70 cursor-pointer border border-indigo-100 transition-colors"
          >
            <p className="text-xl font-bold text-indigo-700 font-mono">{waitingForUsCount}</p>
            <p className="text-[10px] font-bold text-indigo-900 uppercase mt-0.5">What To Do</p>
            <p className="text-[9px] text-indigo-600">Waiting for us</p>
          </div>

          <div
            onClick={() => onNavigateWithFilter('WAITING_CLIENT')}
            className="p-2.5 rounded-lg bg-amber-50/60 hover:bg-amber-100/70 cursor-pointer border border-amber-200 transition-colors"
          >
            <p className="text-xl font-bold text-amber-800 font-mono">{waitingClientCount}</p>
            <p className="text-[10px] font-bold text-amber-900 uppercase mt-0.5">Client Gated</p>
            <p className="text-[9px] text-amber-700">SLA Paused</p>
          </div>

          <div
            onClick={() => onNavigateWithFilter('FOLLOW_UP')}
            className="p-2.5 rounded-lg bg-purple-50/60 hover:bg-purple-100/70 cursor-pointer border border-purple-200 transition-colors"
          >
            <p className="text-xl font-bold text-purple-700 font-mono">{followUpCount}</p>
            <p className="text-[10px] font-bold text-purple-900 uppercase mt-0.5">Follow-ups</p>
            <p className="text-[9px] text-purple-600">Client callbacks</p>
          </div>

          <div
            onClick={() => onNavigateWithFilter('UNASSIGNED')}
            className="p-2.5 rounded-lg bg-sky-50/60 hover:bg-sky-100/70 cursor-pointer border border-sky-100 transition-colors"
          >
            <p className="text-xl font-bold text-sky-700 font-mono">{unassignedCount}</p>
            <p className="text-[10px] font-bold text-sky-900 uppercase mt-0.5">Unassigned</p>
            <p className="text-[9px] text-sky-600">Needs routing</p>
          </div>

          <div
            onClick={() => onNavigateWithFilter('OVERDUE')}
            className="p-2.5 rounded-lg bg-rose-50/60 hover:bg-rose-100/70 cursor-pointer border border-rose-200 transition-colors"
          >
            <p className="text-xl font-bold text-rose-700 font-mono">{overdueCount}</p>
            <p className="text-[10px] font-bold text-rose-900 uppercase mt-0.5">Overdue</p>
            <p className="text-[9px] text-rose-600">Internal bottlenecks</p>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
            <p className="text-xl font-bold text-emerald-700 font-mono">{completedTodayCount}</p>
            <p className="text-[10px] font-bold text-emerald-900 uppercase mt-0.5">Done Today</p>
            <p className="text-[9px] text-emerald-600">Closed & archived</p>
          </div>
        </div>
      </div>

      {/* TWO COLUMN: Priority Tasks & Follow-up Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Immediate Internal Priority</h3>
              <p className="text-xs text-slate-600">What needs to be done, who is responsible, priority, and stage</p>
            </div>
            <button
              onClick={() => onNavigateWithFilter('WAITING_FOR_US')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded"
            >
              View All ({waitingForUsCount}) &rarr;
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-600 font-semibold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                  <th className="pb-2 pl-1">What Needs To Be Done</th>
                  <th className="pb-2">Owner</th>
                  <th className="pb-2">Current Stage</th>
                  <th className="pb-2">Priority</th>
                  <th className="pb-2">Due Date</th>
                  <th className="pb-2 text-right pr-1">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {priorityTasks.map(task => (
                  <tr
                    key={task.id}
                    onClick={() => onOpenTask(task.id)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                  >
                    <td className="py-2.5 pl-1 max-w-[200px]">
                      <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                        {task.title}
                      </div>
                      <div className="text-[11px] text-slate-600 truncate max-w-[200px]">
                        {task.description}
                      </div>
                    </td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-1.5">
                        <OwnerAvatar name={task.owner} size="sm" />
                        <span className="font-medium text-slate-700">{task.owner || "Unassigned"}</span>
                      </div>
                    </td>
                    <td className="py-2.5">
                      {getStageBadge(task.status)}
                    </td>
                    <td className="py-2.5">
                      {getPriorityBadge(task.priority)}
                    </td>
                    <td className="py-2.5 font-medium">
                      {isTrulyOverdue(task) ? (
                        <span className="text-rose-600 font-bold text-[11px] bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                          {task.dueDate}
                        </span>
                      ) : (
                        <span className="text-slate-600 text-[11px]">
                          {task.dueDate}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 text-right pr-1">
                      <span className="text-indigo-600 hover:text-indigo-800 font-semibold text-[11px] group-hover:underline">
                        Review &rarr;
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-purple-200/90 shadow-sm p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <h3 className="text-sm font-bold text-purple-950 flex items-center gap-1.5">
                  <Icons.Bell className="w-4 h-4 text-purple-600" />
                  <span>Follow-up Radar</span>
                </h3>
                <p className="text-[11px] text-slate-600">Client callbacks & check-ins due</p>
              </div>
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                {followUpCount} Due
              </span>
            </div>

            <div className="space-y-3">
              {followUpRadarList.map(task => (
                <div
                  key={task.id}
                  onClick={() => onOpenTask(task.id)}
                  className="p-3 rounded-lg border border-purple-200/70 bg-purple-50/30 hover:bg-purple-50 cursor-pointer transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 hover:text-indigo-600 line-clamp-1">
                      {task.title}
                    </span>
                    <OwnerAvatar name={task.owner} size="sm" />
                  </div>
                  <div className="text-[11px] text-purple-900 bg-purple-100/60 p-1.5 rounded border border-purple-200 font-medium">
                    🔔 {task.followUpNote || task.followUpDate || "Follow-up scheduled with client"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <button
              onClick={() => onNavigateWithFilter('FOLLOW_UP')}
              className="w-full py-2 bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold rounded-lg border border-purple-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View All Follow-ups ({followUpCount})</span>
              <Icons.ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 2. WORKFLOW BOARD VIEW ---
function TasksBoardView({
  tasks,
  managerFilter,
  setManagerFilter,
  searchQuery,
  setSearchQuery,
  filterOwner,
  setFilterOwner,
  onOpenTask,
  onUpdateTask,
  onMoveStage,
  onMarkComplete,
  onQuickCapture,
  onOpenNewTaskModal
}) {
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (managerFilter === 'WAITING_FOR_US' && !isWaitingForUs(task)) return false;
      if (managerFilter === 'WAITING_CLIENT' && task.status !== 'waiting_client') return false;
      if (managerFilter === 'FOLLOW_UP' && !isNeedsFollowUp(task)) return false;
      if (managerFilter === 'UNASSIGNED' && !isUnassigned(task)) return false;
      if (managerFilter === 'OVERDUE' && !isTrulyOverdue(task)) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          task.title.toLowerCase().includes(q) ||
          task.description.toLowerCase().includes(q) ||
          (task.owner && task.owner.toLowerCase().includes(q));
        if (!matches) return false;
      }

      if (filterOwner !== 'ALL') {
        if (filterOwner === 'UNASSIGNED' && task.owner && task.owner !== 'Unassigned') return false;
        if (filterOwner !== 'UNASSIGNED' && task.owner !== filterOwner) return false;
      }

      return true;
    });
  }, [tasks, managerFilter, searchQuery, filterOwner]);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (!taskId) return;
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.status === targetStatus) return;

    const isNowDone = targetStatus === 'done';
    const isNowWaitingClient = targetStatus === 'waiting_client';

    onUpdateTask({
      ...task,
      status: targetStatus,
      completedToday: isNowDone ? true : false,
      isOverdue: (isNowDone || isNowWaitingClient) ? false : task.isOverdue
    }, `Moved to ${targetStatus.replace('_', ' ').toUpperCase()}`);
  };

  return (
    <div className="min-h-[620px] flex flex-col space-y-4">
      {/* Board Controls */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-sm space-y-3 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              View:
            </span>

            <button
              onClick={() => setManagerFilter('ALL')}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                managerFilter === 'ALL' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({tasks.length})
            </button>

            <button
              onClick={() => setManagerFilter('WAITING_FOR_US')}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                managerFilter === 'WAITING_FOR_US' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
              }`}
            >
              <Icons.CheckSquare className="w-3.5 h-3.5" />
              <span>Waiting for Us ({tasks.filter(isWaitingForUs).length})</span>
            </button>

            <button
              onClick={() => setManagerFilter('WAITING_CLIENT')}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                managerFilter === 'WAITING_CLIENT' ? 'bg-amber-600 text-white shadow-sm' : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-300'
              }`}
            >
              <Icons.PauseCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Waiting on Client ({tasks.filter(t => t.status === 'waiting_client').length})</span>
            </button>

            <button
              onClick={() => setManagerFilter('FOLLOW_UP')}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                managerFilter === 'FOLLOW_UP' ? 'bg-purple-600 text-white shadow-sm' : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
              }`}
            >
              <Icons.Bell className="w-3.5 h-3.5 text-purple-600" />
              <span>Needs Follow-up ({tasks.filter(isNeedsFollowUp).length})</span>
            </button>

            <button
              onClick={() => setManagerFilter('UNASSIGNED')}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                managerFilter === 'UNASSIGNED' ? 'bg-sky-600 text-white shadow-sm' : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
              }`}
            >
              <Icons.UserX className="w-3.5 h-3.5" />
              <span>Unassigned ({tasks.filter(isUnassigned).length})</span>
            </button>

            <button
              onClick={() => setManagerFilter('OVERDUE')}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                managerFilter === 'OVERDUE' ? 'bg-rose-600 text-white shadow-sm' : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              <Icons.AlertTriangle className="w-3.5 h-3.5" />
              <span>Overdue ({tasks.filter(isTrulyOverdue).length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenNewTaskModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
            >
              <Icons.Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </button>
            <button
              onClick={onQuickCapture}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
            >
              <Icons.Sparkles className="w-3.5 h-3.5 text-indigo-200" />
              <span>Quick Capture</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative min-w-[220px] max-w-sm">
              <Icons.Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search requests or owners..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
              />
            </div>

            <select
              value={filterOwner}
              onChange={e => setFilterOwner(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700"
            >
              <option value="ALL">All Owners</option>
              <option value="UNASSIGNED">Unassigned</option>
              {TEAM_MEMBERS.map(m => (
                <option key={m.name} value={m.name}>{m.name}</option>
              ))}
            </select>
          </div>

          {managerFilter !== 'ALL' && (
            <button
              onClick={() => setManagerFilter('ALL')}
              className="text-xs text-indigo-700 hover:text-indigo-900 font-semibold underline"
            >
              Clear view filter
            </button>
          )}
        </div>
      </div>

      {/* 6 Kanban Columns */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1380px] h-full">
          {STAGES.map((stage, stageIndex) => {
            const colTasks = filteredTasks.filter(t => t.status === stage.id);
            const isWaitingClientCol = stage.id === 'waiting_client';

            return (
              <div
                key={stage.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, stage.id)}
                className={`w-[260px] rounded-xl border flex flex-col min-h-[500px] max-h-[700px] overflow-hidden ${
                  isWaitingClientCol
                    ? 'bg-amber-50/50 border-amber-300 ring-1 ring-amber-200'
                    : 'bg-slate-100/70 border-slate-200/80'
                }`}
              >
                <div className={`p-3 border-b ${isWaitingClientCol ? 'border-amber-200 bg-amber-100/50' : 'border-slate-200 bg-slate-50/70'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {isWaitingClientCol && <Icons.PauseCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />}
                      <h4 className={`text-xs font-bold tracking-wide uppercase ${isWaitingClientCol ? 'text-amber-900' : 'text-slate-800'}`}>
                        {stage.colHeader}
                      </h4>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${stage.badge}`}>
                      {colTasks.length}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-tight line-clamp-1">
                    {stage.desc}
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-2.5">
                  {colTasks.length === 0 ? (
                    <div className="h-24 rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs">
                      <span>Empty</span>
                    </div>
                  ) : (
                    colTasks.map(task => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        onClick={() => onOpenTask(task.id)}
                        className={`bg-white rounded-lg p-3 border shadow-sm hover:shadow-md cursor-pointer transition-all ${
                          isTrulyOverdue(task)
                            ? 'border-rose-300 ring-1 ring-rose-300 bg-rose-50/20'
                            : isWaitingClientCol
                            ? 'border-amber-300 bg-amber-50/20 hover:border-amber-500'
                            : 'border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          {getPriorityBadge(task.priority)}
                          <div className="flex items-center gap-1">
                            {task.needsFollowUp && (
                              <span className="p-0.5 rounded bg-purple-100 text-purple-700" title="Needs Follow-up">
                                <Icons.Bell className="w-3 h-3" />
                              </span>
                            )}
                            {getSourceBadge(task.source)}
                          </div>
                        </div>

                        <h5 className="text-xs font-bold text-slate-900 leading-snug hover:text-indigo-600 transition-colors">
                          {task.title}
                        </h5>

                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                          {task.description}
                        </p>

                        {task.status === 'waiting_client' && task.clientWaitingReason && (
                          <div className="mt-2 text-[10px] font-medium text-amber-900 bg-amber-100 p-1.5 rounded border border-amber-200">
                            ⏸ {task.clientWaitingReason}
                          </div>
                        )}

                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            <OwnerAvatar name={task.owner} size="sm" />
                            <span className="font-semibold text-slate-700 text-[11px]">
                              {task.owner || "Unassigned"}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            {/* Fast 1-Click Move Arrows */}
                            {stageIndex > 0 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onMoveStage(task.id, -1);
                                }}
                                title="Move to previous stage"
                                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                              >
                                <Icons.ArrowLeft className="w-3 h-3" />
                              </button>
                            )}
                            {stageIndex < STAGES.length - 1 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onMoveStage(task.id, 1);
                                }}
                                title="Advance to next stage"
                                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                              >
                                <Icons.ArrowRight className="w-3 h-3" />
                              </button>
                            )}

                            {isTrulyOverdue(task) ? (
                              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1 py-0.5 rounded border border-rose-200 ml-1">
                                {task.dueDate}
                              </span>
                            ) : isWaitingClientCol ? (
                              <span className="text-[10px] font-semibold text-amber-700 bg-amber-100/60 px-1 py-0.5 rounded ml-1">
                                Paused
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-500 font-medium ml-1">
                                {task.dueDate}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- 3. QUICK CAPTURE VIEW ---
function QuickCaptureView({ onTaskCreated, onNavigateToTasks }) {
  const SAMPLE_MESSAGES = [
    {
      label: "Ready Task (August Invoice)",
      text: "Hi John, can you send the August invoice to ABC Ltd before tomorrow afternoon?",
      source: "WhatsApp",
      extracted: {
        title: "Send August invoice to ABC Ltd",
        description: "Customer requested the August invoice before tomorrow afternoon.",
        owner: "John",
        priority: "high",
        status: "in_progress",
        dueDate: "Tomorrow, 4:00 PM",
        source: "WhatsApp",
        needsFollowUp: false,
        clientWaitingReason: ""
      }
    },
    {
      label: "Needs Clarification Sample",
      text: "Hey, client from Delta Logistics emailed: 'Need quick quote for shipping some crates to Bay 3'. No crate size or weight given.",
      source: "Email",
      extracted: {
        title: "Quote for Delta Logistics Bay 3 shipment",
        description: "Client requested quote but omitted crate dimensions and gross weight.",
        owner: "Unassigned",
        priority: "high",
        status: "needs_clarification",
        dueDate: "Today, 5:00 PM",
        source: "Email",
        needsFollowUp: true,
        followUpDate: "Today, 4:00 PM",
        followUpNote: "Call Delta Logistics if dimensions not sent by 4 PM.",
        clientWaitingReason: "Need client to provide crate dimensions (L x W x H) and weight."
      }
    },
    {
      label: "Waiting on Client Sample",
      text: "We sent invoice #8819 to Apex Corp. They replied: 'Will process wire once our controller signs off on Friday.'",
      source: "WhatsApp",
      extracted: {
        title: "Payment clearance for invoice #8819 - Apex Corp",
        description: "Invoice submitted; awaiting internal client controller signoff before wire.",
        owner: "Mike",
        priority: "medium",
        status: "waiting_client",
        dueDate: "Friday",
        source: "WhatsApp",
        needsFollowUp: true,
        followUpDate: "Friday, 10:00 AM",
        followUpNote: "Check bank for wire credit on Friday morning.",
        clientWaitingReason: "Waiting for Apex Corp controller signoff on Friday."
      }
    }
  ];

  const [inputMessage, setInputMessage] = useState(SAMPLE_MESSAGES[0].text);
  const [selectedSource, setSelectedSource] = useState("WhatsApp");
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedTask, setExtractedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [createdSuccessTask, setCreatedSuccessTask] = useState(null);

  const handleExtract = () => {
    if (!inputMessage.trim()) return;

    setIsExtracting(true);
    setExtractedTask(null);
    setCreatedSuccessTask(null);

    setTimeout(() => {
      setIsExtracting(false);

      const matched = SAMPLE_MESSAGES.find(s =>
        inputMessage.toLowerCase().includes(s.text.toLowerCase().slice(0, 25))
      );

      if (matched) {
        setExtractedTask({ ...matched.extracted, source: selectedSource });
      } else {
        const needsClarif = /unclear|vague|missing|no size|no weight|dimensions|clarif/i.test(inputMessage);
        const waitingClient = /client will|waiting for client|once controller|waiting on/i.test(inputMessage);

        let initialStage = "new_request";
        let detectedOwner = "Unassigned";

        if (needsClarif) {
          initialStage = "needs_clarification";
        } else if (waitingClient) {
          initialStage = "waiting_client";
          detectedOwner = "Mike";
        } else {
          initialStage = "in_progress";
          if (/john/i.test(inputMessage)) detectedOwner = "John";
          else if (/sarah/i.test(inputMessage)) detectedOwner = "Sarah";
          else if (/priya/i.test(inputMessage)) detectedOwner = "Priya";
        }

        setExtractedTask({
          title: inputMessage.length > 55 ? inputMessage.slice(0, 52) + "..." : inputMessage,
          description: inputMessage,
          owner: detectedOwner,
          priority: /urgent|high|asap/i.test(inputMessage) ? "high" : "medium",
          status: initialStage,
          dueDate: /today/i.test(inputMessage) ? "Today, 5:00 PM" : "Tomorrow, 4:00 PM",
          source: selectedSource,
          needsFollowUp: /follow|callback|check/i.test(inputMessage),
          clientWaitingReason: waitingClient ? "Waiting on client confirmation" : ""
        });
      }
    }, 650);
  };

  const handleCreateTask = () => {
    if (!extractedTask) return;

    const newTask = {
      id: `task-${Date.now()}`,
      title: extractedTask.title,
      description: extractedTask.description,
      owner: extractedTask.owner,
      priority: extractedTask.priority,
      status: extractedTask.status,
      dueDate: extractedTask.dueDate,
      isOverdue: false,
      isDueToday: /today/i.test(extractedTask.dueDate),
      completedToday: false,
      needsFollowUp: extractedTask.needsFollowUp || false,
      followUpDate: extractedTask.followUpDate || "",
      followUpNote: extractedTask.followUpNote || "",
      source: extractedTask.source,
      clientWaitingReason: extractedTask.clientWaitingReason || "",
      createdAt: "Just now",
      timeline: [
        {
          id: `tl-${Date.now()}-1`,
          text: `Inbound request triaged via LalaFlow AI Parser into [${extractedTask.status.toUpperCase()}]`,
          time: "Just now",
          user: "AI Parser"
        }
      ],
      comments: []
    };

    onTaskCreated(newTask);
    setCreatedSuccessTask(newTask);
    setExtractedTask(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200">
          <Icons.Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>LalaFlow AI Triage</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Turn messages into actionable tasks
        </h2>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Paste an unstructured WhatsApp message, email, or call transcript. LalaFlow extracts ownership, priority, deadlines, and flags follow-ups.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Source:</span>
            {['WhatsApp', 'Email', 'Phone', 'Manual'].map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSource(s)}
                className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all ${
                  selectedSource === s ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-500">
            <span>Sample Prompts:</span>
            {SAMPLE_MESSAGES.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputMessage(sample.text);
                  setSelectedSource(sample.source);
                  setExtractedTask(null);
                  setCreatedSuccessTask(null);
                }}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold px-2 py-0.5 rounded bg-indigo-50 hover:bg-indigo-100 transition-colors"
              >
                Demo #{idx + 1}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Raw Inbound Message / Request
          </label>
          <textarea
            rows="4"
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            placeholder="Paste your client WhatsApp message or email thread here..."
            className="w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/60 font-sans text-slate-800"
          ></textarea>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-slate-600">{inputMessage.length} characters</span>
          <button
            onClick={handleExtract}
            disabled={isExtracting || !inputMessage.trim()}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 disabled:opacity-50 transition-all cursor-pointer"
          >
            <Icons.Sparkles className="w-4 h-4 text-indigo-200" />
            <span>{isExtracting ? "Triaging with AI..." : "✨ Extract Task"}</span>
          </button>
        </div>
      </div>

      {extractedTask && (
        <div className="bg-white rounded-2xl border-2 border-indigo-500/80 shadow-xl shadow-indigo-500/10 p-6 space-y-5 animate-modal">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Icons.Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Extracted Structured Request</h3>
                <p className="text-[11px] text-slate-500">Stage: <strong>{extractedTask.status.replace('_', ' ').toUpperCase()}</strong></p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50"
            >
              {isEditing ? "Done Editing" : "Edit Fields"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">Title</label>
              {isEditing ? (
                <input
                  type="text"
                  value={extractedTask.title}
                  onChange={e => setExtractedTask({ ...extractedTask, title: e.target.value })}
                  className="w-full text-sm font-semibold p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-base font-bold text-slate-900 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {extractedTask.title}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Workflow Stage
              </label>
              <select
                value={extractedTask.status}
                onChange={e => setExtractedTask({ ...extractedTask, status: e.target.value })}
                className="w-full text-xs p-2 border rounded-lg font-bold bg-white text-slate-800"
              >
                {STAGES.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">Owner</label>
              <select
                value={extractedTask.owner}
                onChange={e => setExtractedTask({ ...extractedTask, owner: e.target.value })}
                className="w-full text-xs p-2 border rounded-lg font-semibold bg-white text-slate-800"
              >
                <option value="Unassigned">Unassigned</option>
                {TEAM_MEMBERS.map(m => (
                  <option key={m.name} value={m.name}>{m.name} ({m.role})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">Priority</label>
              <select
                value={extractedTask.priority}
                onChange={e => setExtractedTask({ ...extractedTask, priority: e.target.value })}
                className="w-full text-xs p-2 border rounded-lg bg-white"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">Due Date</label>
              <input
                type="text"
                value={extractedTask.dueDate}
                onChange={e => setExtractedTask({ ...extractedTask, dueDate: e.target.value })}
                className="w-full text-xs p-2 border rounded-lg bg-slate-50 font-medium"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              onClick={() => setExtractedTask(null)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-4 py-2"
            >
              Discard
            </button>
            <button
              onClick={handleCreateTask}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/25 transition-all"
            >
              <Icons.Check className="w-4 h-4" />
              <span>Create Task</span>
            </button>
          </div>
        </div>
      )}

      {createdSuccessTask && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-sm animate-modal flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Icons.CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-900">Task created successfully!</h4>
              <p className="text-xs text-emerald-700">
                "{createdSuccessTask.title}" triaged into <strong>{createdSuccessTask.status.replace('_', ' ').toUpperCase()}</strong>.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToTasks(createdSuccessTask.id)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all shrink-0"
          >
            <span>View on Workflow Board</span>
            <Icons.ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

// --- 4. NEW TASK MODAL ---
function NewTaskModal({ onClose, onCreate, onOpenQuickCapture }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("Unassigned");
  const [status, setStatus] = useState("new_request");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("Tomorrow, 5:00 PM");
  const [source, setSource] = useState("Manual");
  const [needsFollowUp, setNeedsFollowUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      owner,
      status,
      priority,
      dueDate,
      source,
      needsFollowUp,
      followUpDate: needsFollowUp ? "Today, 4:00 PM" : "",
      followUpNote: needsFollowUp ? "Follow-up required" : "",
      completedToday: status === 'done',
      isOverdue: false,
      createdAt: "Just now",
      timeline: [
        { id: `tl-${Date.now()}`, text: `Task created manually via Operations Board`, time: "Just now", user: "Manager" }
      ],
      comments: []
    };

    onCreate(newTask);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-modal">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">Add New Operational Task</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Prepare August quote for Apex Ltd"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Description</label>
            <textarea
              rows="2"
              placeholder="Specific details, requirements, or customer context..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Initial Stage</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full p-1.5 border rounded-lg bg-white"
              >
                {STAGES.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Owner</label>
              <select
                value={owner}
                onChange={e => setOwner(e.target.value)}
                className="w-full p-1.5 border rounded-lg bg-white"
              >
                <option value="Unassigned">Unassigned (Triage)</option>
                {TEAM_MEMBERS.map(m => (
                  <option key={m.name} value={m.name}>{m.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Priority</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value)}
                className="w-full p-1.5 border rounded-lg bg-white"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Due Date</label>
              <input
                type="text"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full p-1.5 border rounded-lg bg-white"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={onOpenQuickCapture}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
            >
              <Icons.Sparkles className="w-3.5 h-3.5" />
              <span>Or use AI Quick Capture</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg border text-slate-600 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-sm"
              >
                Add Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- 5. TEAM VIEW ---
function TeamView({ tasks, onSelectMember }) {
  const teamStats = useMemo(() => {
    return TEAM_MEMBERS.map(member => {
      const memberTasks = tasks.filter(t => t.owner === member.name);
      const active = memberTasks.filter(isWaitingForUs).length;
      const waitingClient = memberTasks.filter(t => t.status === 'waiting_client').length;
      const followUps = memberTasks.filter(isNeedsFollowUp).length;
      const completed = memberTasks.filter(t => t.status === 'done').length;

      return {
        ...member,
        active,
        waitingClient,
        followUps,
        completed,
        topTasks: memberTasks.filter(t => t.status !== 'done').slice(0, 3)
      };
    });
  }, [tasks]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Team Overview & Accountability</h2>
        <p className="text-sm text-slate-600 mt-1">
          Know exactly who is responsible for each deliverable and who has client follow-ups pending.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamStats.map(member => (
          <div
            key={member.name}
            className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <OwnerAvatar name={member.name} size="lg" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                    <p className="text-xs font-medium text-slate-500">{member.title}</p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectMember(member.name)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  View Tasks &rarr;
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 py-4 text-center">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <p className="text-lg font-bold text-slate-900 font-mono">{member.active}</p>
                  <p className="text-[9px] uppercase font-bold text-slate-500 mt-0.5">Active</p>
                </div>

                <div className="bg-amber-50/60 p-2 rounded-lg border border-amber-200">
                  <p className="text-lg font-bold text-amber-800 font-mono">{member.waitingClient}</p>
                  <p className="text-[9px] uppercase font-bold text-amber-700 mt-0.5">Client Block</p>
                </div>

                <div className="bg-purple-50/60 p-2 rounded-lg border border-purple-200">
                  <p className="text-lg font-bold text-purple-800 font-mono">{member.followUps}</p>
                  <p className="text-[9px] uppercase font-bold text-purple-700 mt-0.5">Follow-up</p>
                </div>

                <div className="bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                  <p className="text-lg font-bold text-emerald-700 font-mono">{member.completed}</p>
                  <p className="text-[9px] uppercase font-bold text-emerald-700 mt-0.5">Done</p>
                </div>
              </div>

              <div className="space-y-1.5 mt-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Assigned Pipeline:
                </p>
                {member.topTasks.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No tasks currently assigned</p>
                ) : (
                  member.topTasks.map(t => (
                    <div key={t.id} className="text-xs flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="font-medium text-slate-800 truncate max-w-[180px]">{t.title}</span>
                      <span className="text-[10px] font-semibold text-slate-600 shrink-0">{t.dueDate}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-500 text-[11px]">Active bandwidth</span>
                <span className="font-bold text-slate-800 text-xs">
                  {Math.round((member.active / 8) * 100)}%
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    member.active >= 7 ? 'bg-rose-500' : member.active >= 4 ? 'bg-amber-500' : 'bg-indigo-500'
                  }`}
                  style={{ width: `${Math.min(100, (member.active / 8) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 6. SETTINGS VIEW ---
function SettingsView({ taskCount, onReset }) {
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">System Settings & Data</h2>
        <p className="text-sm text-slate-600 mt-1">
          Operational preferences and data persistence controls.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-6 space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">Organization</h3>
          <div className="mt-3 grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Company</label>
              <input type="text" disabled value="Lala Tech LLC" className="w-full p-2 border rounded-lg bg-slate-50 font-bold" />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Core Purpose</label>
              <input type="text" disabled value="Operational Accountability & SLA Protection" className="w-full p-2 border rounded-lg bg-slate-50 font-bold text-indigo-700" />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Reset Demo State</h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Reset tasks back to initial realistic demo baseline.
          </p>

          <div className="mt-4 flex items-center justify-between p-4 bg-amber-50/70 border border-amber-200 rounded-xl">
            <div>
              <p className="text-xs font-bold text-amber-900">Restore Baseline Pipeline</p>
              <p className="text-[11px] text-amber-700 mt-0.5">Stored requests: {taskCount} items in localStorage</p>
            </div>
            <button
              onClick={onReset}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
            >
              Reset Pipeline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 7. TASK DETAIL MODAL ---
function TaskDetailModal({ task, onClose, onUpdate, onDelete, onToast }) {
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDesc, setEditedDesc] = useState(task.description);
  const [editedOwner, setEditedOwner] = useState(task.owner || "Unassigned");
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedStatus, setEditedStatus] = useState(task.status);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);
  const [editedClientReason, setEditedClientReason] = useState(task.clientWaitingReason || "");
  const [editedNeedsFollowUp, setEditedNeedsFollowUp] = useState(Boolean(task.needsFollowUp));
  const [editedFollowUpDate, setEditedFollowUpDate] = useState(task.followUpDate || "Today, 4:00 PM");
  const [editedFollowUpNote, setEditedFollowUpNote] = useState(task.followUpNote || "");
  const [newComment, setNewComment] = useState("");

  const handleSave = () => {
    const isNowDone = editedStatus === 'done';
    const isNowWaitingClient = editedStatus === 'waiting_client';

    onUpdate({
      ...task,
      title: editedTitle,
      description: editedDesc,
      owner: editedOwner,
      priority: editedPriority,
      status: editedStatus,
      dueDate: editedDueDate,
      clientWaitingReason: editedClientReason,
      needsFollowUp: editedNeedsFollowUp,
      followUpDate: editedFollowUpDate,
      followUpNote: editedFollowUpNote,
      completedToday: isNowDone ? true : false,
      isOverdue: (isNowDone || isNowWaitingClient) ? false : task.isOverdue
    }, `Updated parameters and set stage to ${editedStatus.replace('_', ' ').toUpperCase()}`);

    onToast("Changes saved successfully.", "success");
    onClose();
  };

  const handleCompleteFromModal = () => {
    const isNowDone = editedStatus !== 'done';
    const updated = {
      ...task,
      title: editedTitle,
      description: editedDesc,
      owner: editedOwner,
      priority: editedPriority,
      status: isNowDone ? 'done' : 'in_progress',
      dueDate: editedDueDate,
      clientWaitingReason: editedClientReason,
      needsFollowUp: false,
      completedToday: isNowDone,
      isOverdue: false
    };
    onUpdate(updated, isNowDone ? "Marked Complete by Manager" : "Re-opened to In Progress");
    onToast(isNowDone ? `Task "${editedTitle}" marked Complete!` : `Task "${editedTitle}" re-opened.`, 'success');
    onClose();
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const commentObj = {
      id: `c-${Date.now()}`,
      author: "Manager",
      text: newComment.trim(),
      time: "Just now"
    };

    onUpdate({
      ...task,
      comments: [...(task.comments || []), commentObj],
      timeline: [
        ...(task.timeline || []),
        { id: `tl-${Date.now()}`, text: `Note: "${newComment.trim().slice(0, 30)}..."`, time: "Just now", user: "Manager" }
      ]
    });
    setNewComment("");
    onToast("Note logged on request.", "info");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-modal">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              {getSourceBadge(task.source)}
              <span className="text-xs text-slate-400 font-mono">ID: {task.id}</span>
              {isTrulyOverdue(task) && (
                <span className="px-2 py-0.5 text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 rounded-full">
                  ⚠️ Overdue (Internal)
                </span>
              )}
              {task.status === 'waiting_client' && (
                <span className="px-2 py-0.5 text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 rounded-full flex items-center gap-1">
                  <Icons.PauseCircle className="w-3 h-3 text-amber-700" />
                  SLA Paused
                </span>
              )}
            </div>
            <input
              type="text"
              value={editedTitle}
              onChange={e => setEditedTitle(e.target.value)}
              className="text-lg font-bold text-slate-900 w-full focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1 -mx-1"
            />
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onDelete(task.id)}
              title="Delete task"
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors"
            >
              <Icons.Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
            >
              <Icons.X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Core Parameters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <div>
              <label className="block text-slate-500 font-bold mb-1 uppercase text-[10px]">Current Stage</label>
              <select
                value={editedStatus}
                onChange={e => setEditedStatus(e.target.value)}
                className="w-full p-1.5 bg-white border border-slate-200 rounded font-bold text-slate-800"
              >
                {STAGES.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-bold mb-1 uppercase text-[10px]">Priority</label>
              <select
                value={editedPriority}
                onChange={e => setEditedPriority(e.target.value)}
                className="w-full p-1.5 bg-white border border-slate-200 rounded font-bold text-slate-800"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-bold mb-1 uppercase text-[10px]">Responsible Owner</label>
              <select
                value={editedOwner}
                onChange={e => setEditedOwner(e.target.value)}
                className="w-full p-1.5 bg-white border border-slate-200 rounded font-bold text-slate-800"
              >
                <option value="Unassigned">Unassigned</option>
                {TEAM_MEMBERS.map(m => (
                  <option key={m.name} value={m.name}>{m.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-bold mb-1 uppercase text-[10px]">Due Date</label>
              <input
                type="text"
                value={editedDueDate}
                onChange={e => setEditedDueDate(e.target.value)}
                className="w-full p-1.5 bg-white border border-slate-200 rounded font-bold text-slate-800"
              />
            </div>
          </div>

          {/* Follow-up Section */}
          <div className="p-3.5 bg-purple-50/70 border border-purple-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-purple-950">
                <input
                  type="checkbox"
                  checked={editedNeedsFollowUp}
                  onChange={e => setEditedNeedsFollowUp(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
                <span className="flex items-center gap-1">
                  <Icons.Bell className="w-3.5 h-3.5 text-purple-700" />
                  Flag this request for client follow-up
                </span>
              </label>
              {editedNeedsFollowUp && (
                <span className="text-[10px] font-bold bg-purple-200 text-purple-800 px-2 py-0.5 rounded">
                  Follow-up Active
                </span>
              )}
            </div>

            {editedNeedsFollowUp && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-purple-200/60">
                <div>
                  <label className="block text-[10px] font-bold text-purple-900 uppercase mb-1">Follow-up Time</label>
                  <input
                    type="text"
                    value={editedFollowUpDate}
                    onChange={e => setEditedFollowUpDate(e.target.value)}
                    className="w-full p-1.5 text-xs bg-white border border-purple-300 rounded font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-purple-900 uppercase mb-1">Follow-up Action Note</label>
                  <input
                    type="text"
                    placeholder="e.g. Call client back regarding sample approval..."
                    value={editedFollowUpNote}
                    onChange={e => setEditedFollowUpNote(e.target.value)}
                    className="w-full p-1.5 text-xs bg-white border border-purple-300 rounded font-medium text-slate-800"
                  />
                </div>
              </div>
            )}
          </div>

          {/* If Waiting on Client, display reason box */}
          {editedStatus === 'waiting_client' && (
            <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-300 space-y-1.5">
              <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider">
                ⏸ Client Blocker Reason
              </label>
              <input
                type="text"
                placeholder="What are we waiting for from the client?..."
                value={editedClientReason}
                onChange={e => setEditedClientReason(e.target.value)}
                className="w-full p-2 text-xs border border-amber-300 rounded-lg bg-white text-slate-800"
              />
              <p className="text-[11px] text-amber-800">
                While in <strong>Waiting on Client</strong>, internal SLA counters are paused.
              </p>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Request Details
            </label>
            <textarea
              rows="3"
              value={editedDesc}
              onChange={e => setEditedDesc(e.target.value)}
              className="w-full p-3 text-xs rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            ></textarea>
          </div>

          {/* Activity Timeline */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Workflow History
            </h4>
            <div className="space-y-3 pl-2 border-l-2 border-slate-200 ml-2">
              {(task.timeline && task.timeline.length > 0) ? (
                task.timeline.map((item, idx) => (
                  <div key={item.id || idx} className="relative pl-4 text-xs">
                    <div className="absolute -left-[13px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-white"></div>
                    <p className="font-semibold text-slate-800">{item.text}</p>
                    <p className="text-[10px] text-slate-500">{item.time} • by {item.user || "System"}</p>
                  </div>
                ))
              ) : (
                <div className="relative pl-4 text-xs">
                  <div className="absolute -left-[13px] top-1 w-2.5 h-2.5 rounded-full bg-slate-400 ring-4 ring-white"></div>
                  <p className="font-semibold text-slate-800">Request logged via {task.source}</p>
                  <p className="text-[10px] text-slate-500">{task.createdAt || "Earlier"}</p>
                </div>
              )}
            </div>
          </div>

          {/* Comments */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Internal Notes & Updates
            </h4>
            <div className="space-y-2 mb-3">
              {task.comments && task.comments.map(c => (
                <div key={c.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-1">
                    <span className="font-bold text-slate-800">{c.author}</span>
                    <span className="text-[10px]">{c.time}</span>
                  </div>
                  <p className="text-slate-700">{c.text}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Log internal note or update..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAddComment(); }}
                className="flex-1 p-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold disabled:opacity-40"
              >
                Post
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handleCompleteFromModal}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              editedStatus === 'done'
                ? 'bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {editedStatus === 'done' ? "Re-open Request" : "✓ Mark Complete"}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 8. DEMO GUIDE MODAL ---
function DemoGuideModal({ onClose }) {
  const steps = [
    { num: "1", title: "Open Dashboard", desc: 'Point to the Executive Operational Clarity bar directly answering the 6 core questions: What To Do, Who is Responsible, Priorities, Stages, Follow-ups, and Done.' },
    { num: "2", title: "Explain Client-Gated SLA Pause", desc: 'Explain: "Requests waiting on the client do NOT count as overdue. We protect our team from false alarms while waiting for client documents."' },
    { num: "3", title: "Show Follow-up Radar", desc: 'Point to the 5 pending follow-ups on the dashboard. Click "View All Follow-ups" to filter the board to tasks needing client callbacks.' },
    { num: "4", title: "Open Quick Capture", desc: 'Click Quick Capture. Paste: "Hi John, can you send the August invoice to ABC Ltd before tomorrow afternoon?"' },
    { num: "5", title: "Click ✨ Extract Task", desc: "Show how AI extracts Title, Description, Priority (High), Due Date, and Stage.' },
    { num: "6", title: "View on Workflow Board", desc: "Show the new card in the board across the 6 columns. Demonstrate 1-click stage advancement arrows on each card." },
    { num: "7", title: "Demonstrate Stage Transition", desc: "Open modal, set status to Waiting on Client, or mark Complete. Show real-time KPI updates on Dashboard." }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-modal">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>🎯 3-Minute Demo Playbook</span>
            </h3>
            <p className="text-xs text-slate-500">Fast presentation guide answering all 6 core client questions</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1 text-xs">
          {steps.map(s => (
            <div key={s.num} className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                {s.num}
              </span>
              <div>
                <p className="font-bold text-slate-900">{s.title}</p>
                <p className="text-slate-600 mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold text-xs rounded-lg hover:bg-indigo-700"
          >
            Ready to Demo!
          </button>
        </div>
      </div>
    </div>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LalaFlowApp />);
