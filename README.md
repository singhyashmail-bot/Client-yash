# LalaFlow — Operations Command Center
**Built for Lala Tech LLC • Practical Operations Command Center**

LalaFlow is a lightweight, high-clarity operational command center built specifically to solve Lala Tech's challenge: client requests, tasks, and follow-ups scattered across WhatsApp, email, and spreadsheets.

---

## 6 Operational Answers at a Glance

LalaFlow directly answers management's 6 core questions in one unified dashboard:

| Management Question | How LalaFlow Solves It |
| :--- | :--- |
| **1. What needs to be done** | Clear, structured tasks extracted directly from inbound WhatsApp/email messages into our actionable queue (*Waiting for Us*). |
| **2. Who is responsible for it** | Explicit ownership with team avatars (John, Sarah, Mike, Priya). Unassigned items sit in a dedicated triage queue so nothing falls through the cracks. |
| **3. What the priority is** | Color-coded **High**, **Medium**, and **Low** priority tags with automatic urgency sorting. |
| **4. What the current status is** | 6 distinct lifecycle stages: `New Request` → `Needs Clarification` → `Ready to Assign` → `In Progress` → `Waiting on Client` → `Done`. |
| **5. What has already been done** | Dedicated **Done** stage, real-time *Completed Today* counter, and full activity timeline logs for every closed task. |
| **6. What needs a follow-up** | Dedicated **Follow-up Radar**, 🔔 notification badges, and follow-up date/action notes (e.g., client callbacks, DocuSign reminders). |

---

## The 6-Stage Lifecycle

```
[Inbound Message]
       ↓
1. New Request          (Raw inbound request in triage queue)
       ↓
2. Needs Clarification  (Missing client data, scoping, or approval required)
       ↓
3. Ready to Assign      (Clarified and pre-scoped; awaiting manager routing)
       ↓
4. In Progress          (Actively owned by an employee with an active SLA)
       ↓
5. Waiting on Client    (⏸ SLA PAUSED — client blocker; NEVER marked overdue)
       ↓
6. Done                 (Resolved and archived with execution history)
```

### Critical SLA Logic: "Waiting on Client" vs. "Overdue"
- **Waiting on Client** requests are **never** penalized as overdue internal bottlenecks.
- The system pauses the internal SLA timer and tags the exact reason (e.g., *"Waiting for ABC Ltd CFO signature on DocuSign"*).
- Only tasks where the ball is in **our court** (*Waiting for Us*) can become **Overdue**.

---

## The Manager Visibility Modes

Managers can switch between instant filters with one click:
* **All Requests**: Complete visibility of the operational pipeline.
* **Waiting for Us (18)**: Actionable internal work across all team members.
* **Waiting on Client (6 — SLA Paused)**: Requests blocked on client replies or documents.
* **Needs Follow-up (6)**: Active client callbacks and check-ins due.
* **Unassigned (4)**: Triage queue of new requests needing scoping or employee assignment.
* **Overdue (4)**: Genuine internal SLA breaches requiring management escalation.

---

## 3-Minute Presentation Demo Script

1. **Open Dashboard (0:00 - 0:30)**
   - *"Lala Tech doesn't need another complex ERP. We need one place to see what needs to be done, who owns it, what's waiting on clients, and what needs a follow-up."*
   - Point to the **Executive Operational Clarity Bar** showing all 6 metrics at a glance.

2. **Quick Capture & AI Triage (0:30 - 1:15)**
   - Click **Quick Capture**.
   - Paste: *"Hi John, can you send the August invoice to ABC Ltd before tomorrow afternoon?"*
   - Click **"✨ Extract Task"** — show how it structures the request, sets owner (John), priority (High), and deadline.
   - Click **"Create Task"**.

3. **Workflow Board & Stage Governance (1:15 - 2:00)**
   - Switch to **Workflow Board**.
   - Walk through the 6 stages:
     `NEW REQUEST` → `NEEDS CLARIFICATION` → `READY TO ASSIGN` → `IN PROGRESS` → `WAITING ON CLIENT` → `DONE`
   - Filter by **"Needs Follow-up"** to show client callbacks.
   - Filter by **"Waiting on Client"** to show paused requests.

4. **Demonstrate Follow-up Radar & Client Blocker (2:00 - 2:30)**
   - Open a task, flag for follow-up, and set a reminder note.
   - Show how the **Follow-up Radar** on the dashboard immediately reflects it.

5. **Complete & Close Loop (2:30 - 3:00)**
   - Click **"✓ Mark Complete"**.
   - Return to **Dashboard** and show *Completed Today* increasing and *Waiting for Us* decreasing.
   - Conclude: *"LalaFlow turns scattered messages into owned, trackable work, protects staff from false overdue alarms when waiting on clients, and keeps every follow-up on radar."*

---

## How to Run

The app is completely standalone and runs immediately:
1. **Direct**: Double-click `index.html` to open in Chrome or Edge.
2. **Batch Launcher**: Double-click `start.bat`.
3. **PowerShell Server**: Run `powershell -ExecutionPolicy Bypass -File .\server.ps1` to serve on `http://localhost:3000`.
