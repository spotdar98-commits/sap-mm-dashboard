import react, { useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════
   SAP MM COMPLETE MASTERY GUIDE — 5 Years Experience Revision
   All 12 Parts: Strategy · Org · Master Data · P2P · Inventory ·
   Special Proc · Release · Pricing · MRP · Interview · Cheat Sheet · Exercises
═══════════════════════════════════════════════════════════════════ */

const PARTS = [
  { id: "strategy",   icon: "🎯", label: "Strategy",        short: "1-Week Plan"      },
  { id: "org",        icon: "🏗", label: "Org Structure",   short: "Client→PGroup"    },
  { id: "master",     icon: "📦", label: "Master Data",     short: "MM/Vendor/PIR"    },
  { id: "p2p",        icon: "🔄", label: "P2P Cycle",       short: "PR→MIRO"          },
  { id: "inventory",  icon: "📊", label: "Inventory",       short: "Mvt Types"        },
  { id: "special",    icon: "⚙️", label: "Special Proc.",   short: "Sub/Cons/STO"     },
  { id: "release",    icon: "✅", label: "Release Strat.",  short: "Approval Flow"    },
  { id: "pricing",    icon: "💰", label: "Pricing Proc.",   short: "Condition Tech"   },
  { id: "mrp",        icon: "📈", label: "MRP & Valuation", short: "MD04/MAP/S-Price" },
  { id: "interview",  icon: "🎤", label: "Interview Q&A",   short: "12 Senior Qs"    },
  { id: "cheatsheet", icon: "📋", label: "Cheat Sheet",     short: "All T-Codes"      },
  { id: "exercises",  icon: "✍️", label: "Exercises",       short: "Daily Practice"   },
];

/* ── THEME ─────────────────────────────────────────────────────── */
const T = {
  bg: "#f7f7f8",
  surface: "#f9f8f8",
  card: "#fbfafa",
  cardHov: "#eccac1",
  border: "#CBD5E1",
  borderAct: "#c6d2eb",

  cyan: "#0284C7",
  blue: "#2563EB",
  indigo: "#4F46E5",
  green: "#16A34A",
  amber: "#D97706",
  red: "#DC2626",

  text: "#0F172A",
  sub: "#475569",
  muted: "#64748B",
  white: "#eaadad"
};

/* ── ACCORDION HOOK ────────────────────────────────────────────── */
function useAcc() {
  const [open, setOpen] = useState(new Set());
  const toggle = useCallback(k => setOpen(p => {
    const n = new Set(p);
    n.has(k) ? n.delete(k) : n.add(k);
    return n;
  }), []);
  return { open, toggle };
}

/* ── PRIMITIVES ────────────────────────────────────────────────── */
const styles = {
  badge: (color) => ({
    display: "inline-block", background: color + "20", color,
    border: `1px solid ${color}40`, borderRadius: 4,
    padding: "2px 8px", fontSize: 11, fontWeight: 700,
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace", whiteSpace: "nowrap",
  }),
  card: (active) => ({
    background: active ? T.cardHov : T.card,
    border: `1px solid ${active ? T.borderAct : T.border}`,
    borderRadius: 10, marginBottom: 10, overflow: "hidden",
    transition: "all 0.2s",
  }),
  headerRow: {
    padding: "14px 18px", cursor: "pointer",
    display: "flex", justifyContent: "space-between", alignItems: "center",
    userSelect: "none",
  },
  body: {
    padding: "4px 18px 18px",
    borderTop: `1px solid ${T.border}`,
  },
};

function Badge({ color = T.cyan, children }) {
  return <span style={styles.badge(color)}>{children}</span>;
}
function TC({ code }) { return <Badge color={T.cyan}>{code}</Badge>; }
function GreenBox({ icon, label, text }) {
  return (
    <div style={{ background: T.green + "10", border: `1px solid ${T.green}30`,
      borderRadius: 8, padding: "10px 14px", marginBottom: 10 }}>
      <span style={{ color: T.green, fontWeight: 700, fontSize: 12 }}>{icon} {label && `${label}: `}</span>
      <span style={{ color: T.text, fontSize: 13 }}>{text}</span>
    </div>
  );
}
function AmberBox({ icon, label, text }) {
  return (
    <div style={{ background: T.amber + "10", border: `1px solid ${T.amber}30`,
      borderRadius: 8, padding: "10px 14px", marginBottom: 10 }}>
      <span style={{ color: T.amber, fontWeight: 700, fontSize: 12 }}>{icon} {label && `${label}: `}</span>
      <span style={{ color: T.text, fontSize: 13 }}>{text}</span>
    </div>
  );
}
function BlueBox({ icon, label, text }) {
  return (
    <div style={{ background: T.blue + "15", border: `1px solid ${T.blue}40`,
      borderRadius: 8, padding: "10px 14px", marginBottom: 10 }}>
      <span style={{ color: T.cyan, fontWeight: 700, fontSize: 12 }}>{icon} {label && `${label}: `}</span>
      <span style={{ color: T.text, fontSize: 13 }}>{text}</span>
    </div>
  );
}
function RedBox({ icon, label, text }) {
  return (
    <div style={{ background: T.red + "10", border: `1px solid ${T.red}30`,
      borderRadius: 8, padding: "10px 14px", marginBottom: 10 }}>
      <span style={{ color: T.red, fontWeight: 700, fontSize: 12 }}>{icon} {label && `${label}: `}</span>
      <span style={{ color: T.text, fontSize: 13 }}>{text}</span>
    </div>
  );
}
function SectionTitle({ children, color = T.cyan }) {
  return (
    <div style={{ color, fontWeight: 800, fontSize: 15, letterSpacing: 0.5,
      borderLeft: `3px solid ${color}`, paddingLeft: 10, marginBottom: 14, marginTop: 6 }}>
      {children}
    </div>
  );
}
function SubTitle({ children }) {
  return <div style={{ color: T.sub, fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
    textTransform: "uppercase", marginBottom: 8, marginTop: 14 }}>{children}</div>;
}
function Para({ children }) {
  return <p style={{ color: T.sub, fontSize: 13, lineHeight: 1.7, margin: "0 0 12px" }}>{children}</p>;
}

/* ── TABLE ─────────────────────────────────────────────────────── */
function TTable({ cols, rows }) {
  // cols = [{label, width?, align?}], rows = [[cell,...]]
  return (
    <div style={{ overflowX: "auto", marginBottom: 14 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {cols.map((c, i) => (
              <th key={i} style={{
                background: T.blue, color: T.white, fontWeight: 700,
                padding: "8px 12px", textAlign: c.align || "left",
                fontSize: 12, width: c.width,
              }}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 0 ? T.card : T.surface }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: "8px 12px", color: T.text, fontSize: 13,
                  borderBottom: `1px solid ${T.border}`,
                  fontFamily: ci === 1 ? "'JetBrains Mono','Fira Code',monospace" : "inherit",
                  color: ci === 1 ? T.cyan : T.text, fontWeight: ci === 1 ? 700 : 400,
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── ACCORDION ITEM ────────────────────────────────────────────── */
function Acc({ id, open, toggle, accent = T.cyan, header, children }) {
  const isOpen = open.has(id);
  return (
    <div style={styles.card(isOpen)}>
      <div style={styles.headerRow} onClick={() => toggle(id)}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, flexWrap: "wrap" }}>
          {header}
        </div>
        <span style={{
          color: T.muted, fontSize: 12, marginLeft: 8, flexShrink: 0,
          transform: isOpen ? "rotate(180deg)" : "rotate(0)", display: "inline-block", transition: "transform 0.2s",
        }}>▼</span>
      </div>
      {isOpen && (
        <div style={styles.body} onClick={e => e.stopPropagation()}>
          {children}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PART 1 — STRATEGY
═══════════════════════════════════════════════════════════════════ */
function StrategyPart() {
  const { open, toggle } = useAcc();
  return (
    <div>
      <Para>
        You have 5 years of SAP MM experience. This is not learning from scratch — it is structured recall activation.
        The brain already has the knowledge. The goal this week is to rebuild neural pathways so you can answer questions
        fluently, perform transactions confidently, and explain concepts clearly to anyone.
      </Para>

      <SectionTitle color={T.amber}>🧠 Your Mindset: RECALL not LEARN</SectionTitle>
      {[
        ["RULE 1", "Read a concept → Close the document → Speak it aloud in your own words → Write the T-Code from memory"],
        ["RULE 2", "After each topic ask: What comes before this? What comes after? What can go wrong?"],
        ["RULE 3", "Every night: Write 10 T-Codes on blank paper without looking. Check next morning."],
        ["RULE 4", "Use real business scenarios. Don't think 'GR with mvt 101'. Think: Vendor truck arrived. Stock in plant. What do I do?"],
      ].map(([r, t]) => (
        <div key={r} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: T.amber + "10",
          border: `1px solid ${T.amber}30`, borderRadius: 8, padding: "10px 14px", marginBottom: 8 }}>
          <span style={{ background: T.amber, color: "#000", borderRadius: 4, padding: "2px 8px", fontWeight: 900,
            fontSize: 11, flexShrink: 0, marginTop: 1 }}>{r}</span>
          <span style={{ color: T.text, fontSize: 13 }}>{t}</span>
        </div>
      ))}

      <SectionTitle color={T.green} style={{ marginTop: 20 }}>📅 7-Day Daily Plan</SectionTitle>
      <TTable
        cols={[{ label: "Day", width: "12%" }, { label: "Hours", width: "10%" }, { label: "Topics & Focus", width: "78%" }]}
        rows={[
          ["Day 1 — Mon", "4–5 hrs", "Org Structure (Client→Plant→Pur.Org) + Material Master (MM01, all views) + Vendor Master (XK01). Create each in your head step by step."],
          ["Day 2 — Tue", "4–5 hrs", "Purchase Info Record + Source List + Quota. PR (ME51N) → RFQ (ME41/ME47/ME49) → PO (ME21N). Recite entire P2P flow aloud."],
          ["Day 3 — Wed", "4–5 hrs", "GR (MIGO, movement types 101/103/105/122) + Invoice Verification (MIRO, MRBR, MR11). Do the 3-way match exercise."],
          ["Day 4 — Thu", "4–5 hrs", "All inventory movement types. Physical Inventory (MI01/MI04/MI07). MMBE, MB52, MB51. Transfer postings (311, 301, 303)."],
          ["Day 5 — Fri", "4–5 hrs", "Special Procurement: Subcontracting (L), Consignment (K), STO (U), Blanket PO (B), Third Party (S). Draw each flow on paper."],
          ["Day 6 — Sat", "5–6 hrs", "Release Strategy config steps + Pricing Procedure (condition technique) + Material Valuation (S vs V) + MRP (MD04, types, lot sizing)."],
          ["Day 7 — Sun", "4–5 hrs", "Full revision: T-Code quiz, Interview Q&A, draw complete P2P flow from memory, revise special procurement flows."],
        ]}
      />

      <SectionTitle color={T.indigo}>🔁 The 3-Way Match Exercise (Do This Daily)</SectionTitle>
      <Para>This is the heart of SAP MM. Practice until it becomes automatic:</Para>
      {[
        "Vendor sends goods → MIGO → PO reference → Mvt 101 → Post → Stock increases. GR/IR account credited.",
        "Vendor sends invoice → MIRO → PO/GR reference → System proposes qty/value → Check → Post → Vendor payable created.",
        "If invoice blocked (MRBR) → Find reason: price variance or qty variance → Release or reject.",
        "End of month: MR11 to clear any GR/IR differences.",
      ].map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 8 }}>
          <span style={{ background: T.indigo, color: T.white, borderRadius: "50%", width: 24, height: 24, display: "flex",
            alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 11, flexShrink: 0 }}>{i + 1}</span>
          <span style={{ color: T.text, fontSize: 13, paddingTop: 3 }}>{s}</span>
        </div>
      ))}

      <SectionTitle color={T.cyan} style={{ marginTop: 20 }}>💡 Interview Q&A Topics by Day</SectionTitle>
      <TTable
        cols={[{ label: "Day", width: "15%" }, { label: "Topics to Speak About Aloud" }]}
        rows={[
          ["Day 1", "What is Pur.Org? Can one plant have 2 Pur.Orgs? What is Pur.Group? Why is Storage Location needed?"],
          ["Day 2", "Difference between PIR and PO. Why use Source List? What is Quota? When does MRP use quota?"],
          ["Day 3", "What is 3-way match? What happens at GR accounting? What is GR/IR account?"],
          ["Day 4", "What is movement type 321? When do you use 301 vs 303? What is physical inventory?"],
          ["Day 5", "Explain subcontracting flow. What is mvt 541? What is MRKO used for?"],
          ["Day 6", "How do you set up release strategy? What is condition technique? S price vs MAP?"],
          ["Day 7", "Any question from Day 1–6. Practice answering in 60 seconds per question."],
        ]}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PART 2 — ORG STRUCTURE
═══════════════════════════════════════════════════════════════════ */
function OrgPart() {
  const { open, toggle } = useAcc();
  const levels = [
    { level: 1, name: "Client", tcode: "SCC4", color: T.amber, desc: "Highest level. One SAP system = one client. All company codes share master data if needed. Pre-exists — you don't create it.", example: "Client 100 = Your entire SAP system", config: "SAP Menu → Tools → Administration → Client Admin", assign: null, tip: "Client is pre-existing. You don't create it during MM config. All customizing is client-specific." },
    { level: 2, name: "Company Code", tcode: "OX02", color: T.red, desc: "Legal entity. Separate P&L and balance sheet. Financial accounting level.", example: "1000 = Tata Motors India Ltd", config: "SPRO → Enterprise Structure → Definition → Financial Accounting → Define Company Code", assign: null, tip: "Every purchase eventually posts FI document to a Company Code. Wrong company code = wrong financial books." },
    { level: 3, name: "Plant", tcode: "OX10", color: T.cyan, desc: "Factory/warehouse unit. Core MM level. Almost every transaction requires Plant.", example: "1001 = Pune Plant, 1002 = Mumbai Plant", config: "SPRO → Enterprise Structure → Definition → Logistics General → Define Plant", assign: "Assign Plant to Company Code: OX18", tip: "Plant is where goods are received, stored, and issued. One plant belongs to exactly ONE Company Code." },
    { level: 4, name: "Storage Location", tcode: "OX09", color: T.green, desc: "Physical storage area within a plant. Stock exists at Plant + SLoc level.", example: "0001=Main Store, 0002=Raw Material, 0003=Finished Goods", config: "SPRO → Enterprise Structure → Definition → Materials Management → Maintain Storage Location", assign: "Automatically assigned to plant during creation", tip: "Stock is always tracked at Plant + Storage Location level. Multiple SLocs can exist under one plant." },
    { level: 5, name: "Purchasing Organization", tcode: "OX08", color: T.indigo, desc: "Responsible for procurement activities. Negotiates prices and contracts.", example: "1000 = Central Purchasing Org, 1001 = Local Pune Purchasing", config: "SPRO → Enterprise Structure → Definition → Materials Management → Maintain Purchasing Organization", assign: "Assign Pur.Org to Company Code: OX01 | Assign Pur.Org to Plant: OX17", tip: "One Plant can have multiple Pur.Orgs. Central Pur.Org negotiates enterprise-wide. Plant Pur.Org is local." },
    { level: 6, name: "Purchasing Group", tcode: "OME4", color: T.sub, desc: "Buyer or group of buyers responsible for specific materials. NOT a structural level — just a key field in PO.", example: "001 = Raw Material Buyers, 002 = Capital Goods Buyers", config: "SPRO → MM → Purchasing → Create Purchasing Groups", assign: null, tip: "No org assignment needed. Just referenced in PO header. Used for release strategy and reporting." },
  ];
  return (
    <div>
      {/* Visual tree */}
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: 18, marginBottom: 18 }}>
        <SubTitle>HIERARCHY OVERVIEW</SubTitle>
        {levels.map((l, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: i * 20, marginBottom: 8 }}>
            <span style={{ color: T.muted, fontSize: 10 }}>▶</span>
            <span style={{ fontWeight: 700, fontSize: 13, color: l.color }}>{l.name}</span>
            <TC code={l.tcode} />
            <span style={{ color: T.muted, fontSize: 11 }}>{l.example}</span>
          </div>
        ))}
      </div>

      {levels.map((l, i) => (
        <Acc key={i} id={i} open={open} toggle={toggle} accent={l.color}
          header={
            <>
              <span style={{ background: l.color + "25", color: l.color, borderRadius: "50%", width: 26, height: 26,
                display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 11, flexShrink: 0 }}>
                {l.level}
              </span>
              <span style={{ fontWeight: 700, color: T.text, fontSize: 14 }}>{l.name}</span>
              <TC code={l.tcode} />
            </>
          }>
          <Para>{l.desc}</Para>
          <GreenBox icon="📌" label="Example" text={l.example} />
          <BlueBox icon="📍" label="Config Path" text={l.config} />
          {l.assign && <AmberBox icon="🔗" label="Assignment" text={l.assign} />}
          <GreenBox icon="💡" label="Tip" text={l.tip} />
        </Acc>
      ))}

      <SectionTitle color={T.amber}>🔗 Assignment T-Codes (CRITICAL — Memorize This)</SectionTitle>
      <TTable
        cols={[{ label: "Assignment", width: "30%" }, { label: "T-Code", width: "15%" }, { label: "Notes" }]}
        rows={[
          ["Plant → Company Code", "OX18", "Plant must be assigned before any MM transaction. Without this: no GR, no PO possible."],
          ["Pur.Org → Company Code", "OX01", "For cross-plant purchasing. Pur.Org can procure for all plants under this Co.Code."],
          ["Pur.Org → Plant", "OX17", "Plant-specific purchasing. Only this Pur.Org can procure for this Plant."],
        ]}
      />
      <RedBox icon="⚠️" label="Interview Trap" text="Can one Plant belong to multiple Company Codes? NO. One Plant = One Company Code always. But one Company Code can have many Plants." />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PART 3 — MASTER DATA
═══════════════════════════════════════════════════════════════════ */
function MasterPart() {
  const { open, toggle } = useAcc();
  const items = [
    {
      name: "Material Master", icon: "📦",
      tcodes: [["Create","MM01"],["Change","MM02"],["Display","MM03"],["Flag Delete","MM06"],["Mass Change","MM17"]],
      content: () => (
        <>
          <SubTitle>KEY VIEWS & ORG LEVELS</SubTitle>
          <TTable
            cols={[{ label: "View", width: "30%" }, { label: "Org Level", width: "20%" }, { label: "Key Fields" }]}
            rows={[
              ["Basic Data 1 & 2", "Client", "Material description, base UoM, material group, weight, volume — shared everywhere"],
              ["Purchasing", "Plant", "Purchasing group, order unit, GR processing time, tolerance levels, source list flag"],
              ["MRP 1–4", "Plant", "MRP type, MRP controller, lot size, reorder point, safety stock, planned delivery time"],
              ["Accounting 1 & 2", "Plant", "Valuation class, price control (S/V), standard/moving avg price — critical for FI"],
              ["Storage 1 & 2", "Plant/SLoc", "Storage conditions, hazardous material, temperature conditions"],
              ["Warehouse Mgmt", "Plant/WH", "Warehouse number, storage type — only if WM is active"],
              ["Quality Mgmt", "Plant", "QM inspection active, certificate required, procurement key"],
            ]}
          />
          <SubTitle>MATERIAL TYPES</SubTitle>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            {[["ROH","Raw Material"],["HALB","Semi-Finished"],["FERT","Finished Goods"],["DIEN","Service"],["VERP","Packaging"],["HIBE","Operating Supplies"]].map(([k,v]) => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 4, background: T.surface,
                border: `1px solid ${T.border}`, borderRadius: 6, padding: "4px 10px" }}>
                <Badge color={T.indigo}>{k}</Badge>
                <span style={{ color: T.sub, fontSize: 12 }}>{v}</span>
              </div>
            ))}
          </div>
          <RedBox icon="⚠️" label="Key" text="Valuation Class in Accounting view determines which GL account stock is posted to. Wrong class = wrong financial posting." />
        </>
      )
    },
    {
      name: "Vendor Master", icon: "🏢",
      tcodes: [["Create (Full)","XK01"],["Change","XK02"],["Display","XK03"],["Block","XK05"],["Mark Delete","XK06"],["Create (Purch only)","MK01"],["Change (Purch only)","MK02"]],
      content: () => (
        <>
          <SubTitle>3 SEGMENTS</SubTitle>
          {[
            ["General Data", "Client level", "Name, address, bank details, tax numbers. Shared across all company codes. Created by FI team."],
            ["Company Code Data", "Co.Code level", "Reconciliation GL account, payment terms, dunning, withholding tax. Created at Co.Code level."],
            ["Purchasing Data", "Pur.Org level", "Incoterms, currency, purchasing group, order acknowledgment, vendor schema group. MM team creates this."],
          ].map(([seg, level, desc]) => (
            <div key={seg} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8,
              padding: "10px 14px", marginBottom: 8 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: T.cyan, fontSize: 13 }}>{seg}</span>
                <Badge color={T.indigo}>{level}</Badge>
              </div>
              <span style={{ color: T.sub, fontSize: 13 }}>{desc}</span>
            </div>
          ))}
          <GreenBox icon="💡" text="XK01 creates all 3 segments at once. MK01 creates only Purchasing segment (when FI team has already created General + Co.Code data)." />
        </>
      )
    },
    {
      name: "Purchase Info Record (PIR)", icon: "💹",
      tcodes: [["Create","ME11"],["Change","ME12"],["Display","ME13"],["List by Material","ME1M"],["List by Vendor","ME1L"]],
      content: () => (
        <>
          <Para>Stores the vendor-material-price relationship. Automatically proposes values in PO. Most important MM master data after Material and Vendor.</Para>
          <SubTitle>4 TYPES OF PIR</SubTitle>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {[["Standard","Normal stock PO"],["Subcontracting","Item Cat L"],["Consignment","Item Cat K"],["Pipeline","Direct from pipeline"]].map(([k,v]) => (
              <div key={k} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, padding: "8px 12px" }}>
                <div style={{ color: T.green, fontWeight: 700, fontSize: 13 }}>{k}</div>
                <div style={{ color: T.sub, fontSize: 11 }}>{v}</div>
              </div>
            ))}
          </div>
          <SubTitle>KEY FIELDS</SubTitle>
          <TTable
            cols={[{ label: "Field", width: "30%" }, { label: "Description" }]}
            rows={[
              ["Net Price", "Price proposed in PO automatically. Last PO price also updates here."],
              ["Valid From/To", "Price validity period. After expiry, price must be re-entered in PO."],
              ["Tax Code", "Determines tax calculation in MIRO"],
              ["Tolerance", "Over/under delivery tolerance specific to this vendor-material combination"],
              ["Planned Del. Time", "Lead time in days — used by MRP for scheduling"],
            ]}
          />
        </>
      )
    },
    {
      name: "Source List", icon: "📋",
      tcodes: [["Maintain","ME01"],["Display","ME03"],["Generate","ME05"],["Where Used","ME06"]],
      content: () => (
        <>
          <Para>Defines which vendors are approved/fixed for a material at a plant. Controls MRP vendor assignment.</Para>
          <TTable
            cols={[{ label: "Indicator", width: "15%" }, { label: "Meaning" }]}
            rows={[
              ["0 (blank)", "Vendor is valid/approved for manual PO creation — not fixed"],
              ["1", "Fixed source — MRP will always assign this vendor for planned orders/PRs"],
              ["2", "Blocked — Vendor cannot be used for this material at this plant"],
            ]}
          />
          <AmberBox icon="⚠️" label="Important" text="If 'Source List Required' flag is set in Material Master (Purchasing view), PO can ONLY be created for vendors listed in the source list. Any other vendor will give error." />
        </>
      )
    },
    {
      name: "Quota Arrangement", icon: "📊",
      tcodes: [["Maintain","MEQ1"],["Display","MEQ3"]],
      content: () => (
        <>
          <Para>Splits procurement quantity among multiple vendors by percentage quota. Works together with Source List for MRP-driven procurement.</Para>
          <GreenBox icon="📌" label="Example" text="RM-STEEL-001 at Plant 1001: Vendor A = 60% quota, Vendor B = 40% quota. MRP generates PRs and distributes 60/40 automatically." />
          <BlueBox icon="🔄" label="How it works" text="Quota = (Qty already ordered from vendor) / (Total ordered from all vendors). MRP picks vendor with lowest current quota ratio to balance distribution." />
        </>
      )
    },
  ];

  return (
    <div>
      {items.map((item, i) => (
        <Acc key={i} id={i} open={open} toggle={toggle}
          header={
            <>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontWeight: 700, color: T.text, fontSize: 14 }}>{item.name}</span>
            </>
          }>
          <SubTitle>T-CODES</SubTitle>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
            {item.tcodes.map(([action, tcode]) => (
              <div key={tcode} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: T.muted, fontSize: 11 }}>{action}:</span>
                <TC code={tcode} />
              </div>
            ))}
          </div>
          {item.content()}
        </Acc>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PART 4 — P2P CYCLE
═══════════════════════════════════════════════════════════════════ */
function P2PPart() {
  const { open, toggle } = useAcc();
  const steps = [
    {
      step: 1, name: "Purchase Requisition (PR)", icon: "📝", color: T.cyan,
      tcodes: [["Create","ME51N"],["Change","ME52N"],["Display","ME53N"],["List","ME5A"],["Release (Individual)","ME54N"],["Release (Collective)","ME55"]],
      content: () => (
        <>
          <Para>Internal document to request materials or services. Has NO legal significance — internal only. Created manually or auto by MRP.</Para>
          <SubTitle>ITEM CATEGORIES</SubTitle>
          <TTable
            cols={[{ label: "Cat", width: "10%" }, { label: "Type", width: "25%" }, { label: "Description" }]}
            rows={[
              ["Blank", "Standard", "Normal stock procurement — most common for materials"],
              ["D", "Service", "External services (cleaning, maintenance). Requires service entry sheet ML81N."],
              ["K", "Consignment", "Material stored at your premises, owned by vendor"],
              ["L", "Subcontracting", "Send components to vendor for processing"],
              ["U", "Stock Transfer", "Transfer stock between plants via STO"],
            ]}
          />
          <GreenBox icon="💡" text="PR is an internal authorization request. Only after approval (release strategy) can it be converted to a PO using ME21N Adopt function." />
        </>
      )
    },
    {
      step: 2, name: "RFQ & Quotation", icon: "📨", color: T.indigo,
      tcodes: [["Create RFQ","ME41"],["Change RFQ","ME42"],["Print RFQ","ME9A"],["Enter Quotation","ME47"],["Price Comparison","ME49"]],
      content: () => (
        <>
          <Para>Request for Quotation sent to vendors. Quotation entered in system. Best price selected via comparison report.</Para>
          <SubTitle>PROCESS FLOW</SubTitle>
          {["ME41: Create RFQ (enter material, qty, delivery date, validity). Assign multiple vendors.","ME9A: Print/Output RFQ to vendors via email, fax, EDI.","ME47: Enter vendor's quoted price against the RFQ received.","ME49: Price comparison report — highlights best price. Set comparison type (absolute/weighted).","ME47: Reject losing vendors with rejection reason code — triggers rejection letter."].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <span style={{ background: T.indigo, color: T.white, borderRadius: "50%", width: 22, height: 22, display: "flex",
                alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 11, flexShrink: 0 }}>{i+1}</span>
              <span style={{ color: T.text, fontSize: 13, paddingTop: 2 }}>{s}</span>
            </div>
          ))}
          <AmberBox icon="💡" text="ME49 is the most important step. After selecting best vendor, go to ME47 for all losing vendors and enter rejection reason. This keeps audit trail clean." />
        </>
      )
    },
    {
      step: 3, name: "Purchase Order (PO)", icon: "📄", color: T.amber,
      tcodes: [["Create","ME21N"],["Change","ME22N"],["Display","ME23N"],["PO by Material","ME2M"],["PO by Vendor","ME2L"],["PO by Number","ME2N"],["Release (Individual)","ME29N"],["Release (Collective)","ME28"],["Print PO","ME9F"]],
      content: () => (
        <>
          <Para>Legal procurement document sent to vendor. Creates binding commitment. Triggers GR and Invoice posting against it.</Para>
          <SubTitle>ACCOUNT ASSIGNMENT CATEGORIES</SubTitle>
          <TTable
            cols={[{ label: "Cat", width: "10%" }, { label: "Type", width: "25%" }, { label: "Description" }]}
            rows={[
              ["Blank", "Stock PO", "No account assignment. Goods go to stock. Most common."],
              ["K", "Cost Center", "Direct expense to cost center. No stock update."],
              ["A", "Fixed Asset", "Capitalized to asset. GR creates asset posting."],
              ["F", "Prod. Order", "Direct to production/process order. Component issue."],
              ["P", "WBS/Project", "Assigned to WBS element in Project System (PS)."],
              ["C", "Sales Order", "Linked to customer sales order. Third-party scenario."],
            ]}
          />
          <RedBox icon="⚠️" label="Critical" text="Account assignment + Item category combination determines the procurement scenario. Get this wrong and the GR/MIRO posting fails with error." />
        </>
      )
    },
    {
      step: 4, name: "Goods Receipt (GR)", icon: "📦", color: T.green,
      tcodes: [["Post GR","MIGO"],["Display Mat. Doc","MB03"],["Material Doc List","MB51"],["GR without PO","MIGO (501)"],["Print GR Slip","MB90"]],
      content: () => (
        <>
          <Para>Physical receipt of goods from vendor. Updates stock and generates FI accounting documents automatically.</Para>
          <SubTitle>KEY MOVEMENT TYPES</SubTitle>
          <TTable
            cols={[{ label: "Mvt", width: "12%" }, { label: "Description" }]}
            rows={[
              ["101", "GR against PO → unrestricted stock. Most common. Stock increases."],
              ["102", "Reversal of 101. Cancels GR, stock reduces, accounting reversed."],
              ["103", "GR into GR Blocked Stock. Pending quality check or qty verification."],
              ["105", "Release from GR Blocked to Unrestricted Use (after approval)."],
              ["122", "Return delivery to vendor after GR. Reverses 101."],
              ["161", "Return delivery via Returns PO. Creates outbound delivery."],
            ]}
          />
          <SubTitle>ACCOUNTING ENTRY AT GR</SubTitle>
          <BlueBox icon="📊" label="Debit" text="Stock GL Account (from Valuation Class in Material Master)" />
          <BlueBox icon="📊" label="Credit" text="GR/IR Clearing Account (temporary — clears when MIRO is posted)" />
          <AmberBox icon="⚠️" text="If Standard Price material: difference between PO price and Standard Price goes to Price Difference account. MAP material: no price difference." />
        </>
      )
    },
    {
      step: 5, name: "Invoice Verification (MIRO)", icon: "🧾", color: T.red,
      tcodes: [["Post Invoice","MIRO"],["Display","MIR4"],["Park Invoice","MIR7"],["Invoice List","MIR5"],["Invoice Overview","MIR6"],["Release Blocked","MRBR"],["GR/IR Clearing","MR11"],["Cancel Invoice","MR8M"],["Consignment Settle","MRKO"]],
      content: () => (
        <>
          <Para>Matches vendor invoice against PO and GR — the 3-way match. System automatically proposes quantities and values from GR. Post only if everything matches.</Para>
          <SubTitle>3-WAY MATCH</SubTitle>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
            {["Purchase Order", "+", "Goods Receipt", "+", "Vendor Invoice", "=", "Payment"].map((s, i) => (
              <span key={i} style={{ color: ["+","="].includes(s) ? T.muted : i === 6 ? T.green : T.amber,
                fontWeight: ["+","="].includes(s) ? 400 : 700, fontSize: ["+","="].includes(s) ? 16 : 13,
                background: ["+","="].includes(s) ? "transparent" : T.surface,
                border: ["+","="].includes(s) ? "none" : `1px solid ${T.border}`,
                borderRadius: 6, padding: ["+","="].includes(s) ? "0 2px" : "6px 12px" }}>{s}</span>
            ))}
          </div>
          <SubTitle>ACCOUNTING ENTRY AT MIRO</SubTitle>
          <BlueBox icon="📊" label="Debit" text="GR/IR Clearing Account (clears the balance from GR)" />
          <BlueBox icon="📊" label="Credit" text="Vendor Account (liability to vendor created — triggers payment)" />
          <SubTitle>TOLERANCE KEYS</SubTitle>
          <TTable
            cols={[{ label: "Key", width: "15%" }, { label: "Description" }]}
            rows={[
              ["PP", "Price variance in percentage — most common block reason"],
              ["BD", "Small difference in value — allow posting within small absolute amount"],
              ["ST", "Date variance — invoice date vs posting date tolerance"],
              ["AN", "Amount for item without order — for items with no PO reference"],
            ]}
          />
          <RedBox icon="⚠️" label="Config" text="Tolerance keys configured in: OMRM (for qty tolerance) and OMCQ (for price tolerance). Values set per company code." />
        </>
      )
    },
  ];

  return (
    <div>
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8,
        padding: "12px 16px", marginBottom: 18 }}>
        <SubTitle>COMPLETE P2P FLOW</SubTitle>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ background: s.color + "20", color: s.color, border: `1px solid ${s.color}40`,
                borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>
                {s.step}. {s.name.split(" ")[0]}
              </span>
              {i < steps.length - 1 && <span style={{ color: T.muted }}>→</span>}
            </div>
          ))}
        </div>
      </div>

      {steps.map((s, i) => (
        <Acc key={i} id={i} open={open} toggle={toggle} accent={s.color}
          header={
            <>
              <span style={{ background: s.color + "25", color: s.color, borderRadius: "50%", width: 26, height: 26,
                display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 11, flexShrink: 0 }}>{s.step}</span>
              <span style={{ fontSize: 16 }}>{s.icon}</span>
              <span style={{ fontWeight: 700, color: T.text, fontSize: 14 }}>{s.name}</span>
            </>
          }>
          <SubTitle>T-CODES</SubTitle>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
            {s.tcodes.map(([action, tcode]) => (
              <div key={tcode} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: T.muted, fontSize: 11 }}>{action}:</span>
                <TC code={tcode} />
              </div>
            ))}
          </div>
          {s.content()}
        </Acc>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PART 5 — INVENTORY
═══════════════════════════════════════════════════════════════════ */
function InventoryPart() {
  return (
    <div>
      <SectionTitle color={T.cyan}>📦 Stock Types in SAP</SectionTitle>
      <TTable
        cols={[{ label: "Stock Type", width: "25%" }, { label: "Description" }]}
        rows={[
          ["Unrestricted Use", "Available for GI, production, sales. Standard usable stock."],
          ["Quality Inspection", "Under QM inspection. Cannot be used until released via mvt 321."],
          ["Blocked Stock", "Physically received but blocked — damaged goods, rejected items."],
          ["GR Blocked Stock", "Received via mvt 103 — pending formal acceptance by your team."],
          ["Consignment Stock", "Vendor's material at your premises. No FI posting until withdrawal (mvt 411K)."],
          ["In Transit", "STO 2-step: GI posted at sending plant (mvt 351), not yet received at destination."],
          ["Restricted-Use Stock", "Batch management: batch is restricted (shelf life expired, etc.)"],
        ]}
      />

      <SectionTitle color={T.amber}>🔢 Complete Movement Type Reference</SectionTitle>
      <TTable
        cols={[{ label: "Mvt Type", width: "18%" }, { label: "Description" }]}
        rows={[
          ["101 / 102","GR against PO (Unrestricted) / Reversal"],
          ["103 / 104","GR into GR Blocked Stock / Reversal"],
          ["105 / 106","Release GR Blocked to Unrestricted / Reversal"],
          ["121 / 122","GR without PO reference / Return to vendor"],
          ["201 / 202","Goods Issue to Cost Center / Reversal"],
          ["221 / 222","Goods Issue to Project (WBS) / Reversal"],
          ["241 / 242","Goods Issue to Asset / Reversal"],
          ["261 / 262","Goods Issue to Production/Process Order / Reversal"],
          ["281 / 282","Goods Issue to Network (PS) / Reversal"],
          ["301","Transfer Plant to Plant — 1 Step (immediate, no transit)"],
          ["303 / 305","Transfer Plant to Plant — 2 Step (GI at sending / GR at receiving)"],
          ["311 / 312","Transfer Storage Location to Storage Location — 1 Step"],
          ["313 / 315","Transfer Stor.Loc to Stor.Loc — 2 Step"],
          ["321 / 322","Transfer Quality Inspection to Unrestricted / Reversal"],
          ["323 / 324","Transfer Quality Inspection to Blocked / Reversal"],
          ["325 / 326","Transfer Blocked to Quality Inspection / Reversal"],
          ["331 / 332","GI to Sampling / Reversal"],
          ["344","Transfer Blocked Stock to Quality Inspection"],
          ["411 K","Transfer Consignment to Own Stock (triggers vendor payable)"],
          ["501 / 502","GR without PO, without reference / Reversal"],
          ["521 / 522","GR without PO, into Quality Inspection / Reversal"],
          ["541 / 542","Transfer to Subcontractor Stock / Return components"],
          ["543","Auto consumption of subcontracting components (triggered with mvt 101 on Subcon PO)"],
          ["551 / 552","Scrapping from Unrestricted Stock / Reversal"],
          ["553 / 554","Scrapping from QI Stock / Reversal"],
          ["555 / 556","Scrapping from Blocked Stock / Reversal"],
          ["601 / 602","GI for Delivery (SD outbound) / Reversal"],
          ["701 / 702","Physical Inventory difference posting / Reversal"],
        ]}
      />

      <SectionTitle color={T.green}>📋 Physical Inventory T-Codes</SectionTitle>
      <TTable
        cols={[{ label: "Action", width: "30%" }, { label: "T-Code", width: "18%" }, { label: "Description" }]}
        rows={[
          ["Create PI Document","MI01","Create physical inventory document for a storage location"],
          ["Block Posting","MI02","Block goods movements during count"],
          ["Enter Count","MI04","Enter physically counted quantity"],
          ["Post Differences","MI07","Post counted vs book quantity difference — creates accounting doc"],
          ["Recount","MI11","Initiate recount if quantity seems wrong"],
          ["Difference List","MI20","Print list of materials with variances before posting"],
          ["Print PI Document","MI21","Print document for warehouse counting team"],
          ["Status Check","MI22","Status of all open physical inventory documents"],
          ["Batch Input Count","MI34/MI35","Large-scale count entry for plant-wide inventory"],
        ]}
      />

      <SectionTitle color={T.indigo}>🔍 Key Stock Report T-Codes</SectionTitle>
      <TTable
        cols={[{ label: "T-Code", width: "18%" }, { label: "Name", width: "30%" }, { label: "When to Use" }]}
        rows={[
          ["MMBE","Stock Overview","Daily stock check. All plants, SLocs, stock types for one material."],
          ["MB52","Warehouse Stocks","Stock by plant and storage location for multiple materials"],
          ["MB53","Plant Availability","Stock across all plants for one material"],
          ["MB51","Material Doc List","All goods movements audit trail by material/plant/date/mvt type"],
          ["MB5B","Stocks on Date","Historical stock quantity at a specific date — for audits"],
          ["MB5L","GR/IR Balances","Outstanding GR/IR items — GR without invoice or invoice without GR"],
          ["MB5T","In-Transit Stock","All STOs with GI done but GR pending at receiving plant"],
          ["MB54","Consignment Stock","All consignment stocks by vendor at your plant"],
          ["MD04","Stock/Req List","MRP view — all open orders, PRs, GRs, reservations. Your daily screen."],
        ]}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PART 6 — SPECIAL PROCUREMENT
═══════════════════════════════════════════════════════════════════ */
function SpecialPart() {
  const { open, toggle } = useAcc();
  const items = [
    {
      name: "Subcontracting", itemCat: "L", color: T.cyan,
      tagline: "You send components to vendor → Vendor processes → Returns finished goods",
      content: () => (
        <>
          <SubTitle>COMPLETE FLOW</SubTitle>
          {[
            "ME21N: Create Subcontracting PO — Item Category = L. Enter finished material. BOM explodes to show components automatically.",
            "MIGO (mvt 541): Transfer components to vendor. Stock moves from your plant to Subcontracting Stock at vendor. No FI posting (still your material).",
            "ME2O: Monitor components at vendor. Run this weekly to avoid component loss or aging.",
            "MIGO (mvt 101 + 543): GR of finished goods from vendor. 101 for finished goods, 543 auto-posts component consumption. FI posts now.",
            "MIGO (mvt 542): Return unused components from vendor if needed.",
            "MIRO: Vendor invoice for processing service value only (not raw material cost).",
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <span style={{ background: T.cyan, color: T.bg, borderRadius: "50%", width: 22, height: 22, display: "flex",
                alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 11, flexShrink: 0 }}>{i+1}</span>
              <span style={{ color: T.text, fontSize: 13, paddingTop: 2 }}>{s}</span>
            </div>
          ))}
          <SubTitle>T-CODES</SubTitle>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {[["Create Subcon PO","ME21N (cat L)"],["Send Components","MIGO (541)"],["Monitor Stock","ME2O"],["GR Finished","MIGO (101+543)"],["Return Components","MIGO (542)"]].map(([a,t]) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: T.muted, fontSize: 11 }}>{a}:</span>
                <TC code={t} />
              </div>
            ))}
          </div>
          <GreenBox icon="💡" label="Key Tip" text="ME2O is your most important report for subcontracting. Shows all materials at vendor premises and aging. Run every week to avoid component loss." />
        </>
      )
    },
    {
      name: "Consignment", itemCat: "K", color: T.green,
      tagline: "Vendor's material at your premises — pay only when you consume",
      content: () => (
        <>
          <SubTitle>COMPLETE FLOW</SubTitle>
          {[
            "ME21N (Item Cat K): Create Consignment PO. No price in PO — price comes from Consignment Info Record (ME11).",
            "MIGO (mvt 101 K): GR of consignment. Stock enters Consignment Stock (vendor owned). NO FI accounting document at this stage.",
            "MIGO (mvt 411 K): Withdraw from consignment to own stock. FI posting created NOW — liability to vendor recorded.",
            "MRKO: Consignment settlement — auto-creates invoice for all mvt 411K withdrawals. Run periodically (weekly/monthly).",
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <span style={{ background: T.green, color: T.bg, borderRadius: "50%", width: 22, height: 22, display: "flex",
                alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 11, flexShrink: 0 }}>{i+1}</span>
              <span style={{ color: T.text, fontSize: 13, paddingTop: 2 }}>{s}</span>
            </div>
          ))}
          <SubTitle>T-CODES</SubTitle>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {[["Consign. PO","ME21N (K)"],["GR Consignment","MIGO (101K)"],["Withdraw","MIGO (411K)"],["Consign. List","MB54"],["Settle","MRKO"]].map(([a,t]) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: T.muted, fontSize: 11 }}>{a}:</span>
                <TC code={t} />
              </div>
            ))}
          </div>
          <AmberBox icon="💡" label="Business Value" text="Consignment improves working capital — no advance payment to vendor. Stock available at your site, payment only after consumption." />
        </>
      )
    },
    {
      name: "Stock Transfer Order (STO)", itemCat: "U", color: T.indigo,
      tagline: "Transfer stock between plants with proper documentation",
      content: () => (
        <>
          <SubTitle>1-STEP vs 2-STEP STO</SubTitle>
          <TTable
            cols={[{ label: "Type", width: "20%" }, { label: "Mvt", width: "12%" }, { label: "Description" }]}
            rows={[
              ["1-Step","301","Immediate transfer. No in-transit stock. Both plants same Co.Code. No tracking while in transit."],
              ["2-Step — GI","351","GI at sending plant. Stock becomes In-Transit. Visible in MB5T. Accounting at sending plant."],
              ["2-Step — GR","101","GR at receiving plant. In-transit clears. Stock appears at receiving plant."],
            ]}
          />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {[["Create STO","ME21N (U) / ME27"],["GI Sending Plant","MIGO (351)"],["GR Receiving","MIGO (101)"],["In-Transit Report","MB5T"]].map(([a,t]) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: T.muted, fontSize: 11 }}>{a}:</span>
                <TC code={t} />
              </div>
            ))}
          </div>
          <GreenBox icon="💡" label="When to use 2-Step" text="When plants are in different locations. 2-step gives you visibility of in-transit stock and proper delivery tracking. Essential for cross-company-code STOs." />
        </>
      )
    },
    {
      name: "Blanket PO / Framework Order", itemCat: "B", color: T.amber,
      tagline: "Set a budget limit — invoices posted until value exhausted",
      content: () => (
        <>
          <Para>Used for utilities, recurring services, stationery, maintenance. Set a total value limit. No GR required — invoices post directly against PO until value is consumed.</Para>
          <TTable
            cols={[{ label: "Setting", width: "30%" }, { label: "Value" }]}
            rows={[
              ["Item Category", "B (Blanket/Limit)"],
              ["Account Assignment", "Required (K, A, F, etc.) — expense must go somewhere"],
              ["Validity Period", "From/To dates — PO auto-blocks after end date"],
              ["Value Limit", "Maximum amount — system blocks further posting once reached"],
              ["GR Required?", "NO — invoice posts directly without GR"],
            ]}
          />
          <TC code="ME21N (Item Cat B)" />
        </>
      )
    },
    {
      name: "Third Party (Drop Ship)", itemCat: "S", color: T.red,
      tagline: "Vendor delivers directly to your customer — you never touch goods",
      content: () => (
        <>
          <SubTitle>COMPLETE FLOW</SubTitle>
          {[
            "Customer places Sales Order in SD module.",
            "PR auto-generated with item category S (third party).",
            "ME21N: Create PO against PR (item cat S). PO goes to vendor with customer delivery address.",
            "Vendor ships directly to customer — no physical movement at your plant.",
            "Statistical GR posted in system (no physical movement, quantity tracked only).",
            "MIRO: Vendor invoice posted against PO — your payable created.",
            "SD billing: Customer invoiced by your company (normal SD flow).",
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <span style={{ background: T.red, color: T.white, borderRadius: "50%", width: 22, height: 22, display: "flex",
                alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 11, flexShrink: 0 }}>{i+1}</span>
              <span style={{ color: T.text, fontSize: 13, paddingTop: 2 }}>{s}</span>
            </div>
          ))}
        </>
      )
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
        {items.map(item => (
          <div key={item.itemCat} style={{ background: item.color + "15", border: `1px solid ${item.color}40`,
            borderRadius: 8, padding: "6px 14px", display: "flex", gap: 6, alignItems: "center" }}>
            <Badge color={item.color}>Item Cat: {item.itemCat}</Badge>
            <span style={{ color: T.sub, fontSize: 12 }}>{item.name}</span>
          </div>
        ))}
      </div>

      {items.map((item, i) => (
        <Acc key={i} id={i} open={open} toggle={toggle} accent={item.color}
          header={
            <>
              <Badge color={item.color}>Cat: {item.itemCat}</Badge>
              <span style={{ fontWeight: 700, color: T.text, fontSize: 14 }}>{item.name}</span>
              <span style={{ color: T.muted, fontSize: 12 }}>{item.tagline}</span>
            </>
          }>
          {item.content()}
        </Acc>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PART 7 — RELEASE STRATEGY
═══════════════════════════════════════════════════════════════════ */
function ReleasePart() {
  return (
    <div>
      <Para>Release strategy = approval workflow for PR and PO. Based on Classification system. Different strategies triggered by value, plant, material group, purchasing group, document type.</Para>
      <SectionTitle color={T.cyan}>⚙️ Configuration Steps (SPRO)</SectionTitle>
      {[
        ["Define Release Groups", "OMGS", "Groups classify the document type. Group 0 = PR, Group F = PO. Each group can have separate strategies."],
        ["Define Release Codes", "OMGS", "Codes represent individual approvers or departments. E.g., A1=Mgr, A2=Director, A3=VP. Codes belong to a Release Group."],
        ["Define Release Indicators", "OMGS", "What happens after release? Indicators: 1=Released (changeable), 2=Released (not changeable), 3=Blocked, 0=In Process."],
        ["Define Characteristics", "CT04", "Create characteristics for condition fields. Standard chars: GNETWR (net value), EKGRP (Pur.Group), WERKS (Plant), BSART (Doc type)."],
        ["Define Classes", "CL02", "Create classification class. Assign characteristics to class. Class type 032 for Purchasing documents."],
        ["Define Release Strategy", "OMGS", "Link Release Group + Release Codes + Conditions (based on characteristics). Define sequence: parallel or sequential release."],
        ["Test by Creating Document", "ME21N/ME51N", "Create PO or PR. Check if strategy is found. Go to Header → Release Strategy tab to verify."],
      ].map(([name, tcode, desc], i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start",
          background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, padding: "12px 14px", marginBottom: 8 }}>
          <span style={{ background: T.blue, color: T.white, borderRadius: "50%", width: 26, height: 26, display: "flex",
            alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12, flexShrink: 0 }}>{i + 1}</span>
          <div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
              <span style={{ fontWeight: 700, color: T.text, fontSize: 13 }}>{name}</span>
              <TC code={tcode} />
            </div>
            <span style={{ color: T.sub, fontSize: 12 }}>{desc}</span>
          </div>
        </div>
      ))}

      <SectionTitle color={T.amber}>📋 Release T-Codes</SectionTitle>
      <TTable
        cols={[{ label: "Action", width: "30%" }, { label: "T-Code", width: "20%" }, { label: "Notes" }]}
        rows={[
          ["Config: PR Release Strategy", "OMGS", "Main config node for all release strategy settings"],
          ["Release PR (Individual)", "ME54N", "Release single PR. Can also reset/reject and see history."],
          ["Release PR (Collective)", "ME55", "Mass release of multiple PRs at once"],
          ["Release PO (Individual)", "ME29N", "Release single PO"],
          ["Release PO (Collective)", "ME28", "Mass release of multiple POs"],
          ["Create Characteristics", "CT04", "Fields used as release conditions (GNETWR, EKGRP, WERKS)"],
          ["Create Class", "CL02", "Classification class — links characteristics to release strategy"],
        ]}
      />

      <RedBox icon="⚠️" label="Interview" text="Why would a PO not find a release strategy? Answer: Classification characteristics don't match any defined strategy. Check net value (GNETWR), document type (BSART), purchasing org, and plant values match your strategy conditions." />
      <AmberBox icon="💡" label="Common Characteristics" text="GNETWR = Net Order Value | EKGRP = Purchasing Group | WERKS = Plant | BSART = Document Type | WAERS = Currency | BUKRS = Company Code" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PART 8 — PRICING PROCEDURE
═══════════════════════════════════════════════════════════════════ */
function PricingPart() {
  return (
    <div>
      <Para>Pricing procedure (Condition Technique) determines how PO price is calculated. Base Price + Discounts - Surcharges + Freight + Tax = Effective Price.</Para>
      <SectionTitle color={T.cyan}>🔧 5 Elements of Condition Technique</SectionTitle>
      {[
        { n: 1, name: "Condition Tables", tcode: "M/03", color: T.cyan, desc: "Define key field combinations that determine where conditions are stored/read. E.g., Table 017 = Vendor+Material+Pur.Org. The key determines the specificity of the price." },
        { n: 2, name: "Access Sequence", tcode: "M/07", color: T.indigo, desc: "Search strategy — which condition table to check first, second, etc. Example: Try Vendor+Material (most specific) → then Vendor+Material Group → then Vendor only (most generic). First match wins." },
        { n: 3, name: "Condition Types", tcode: "M/06", color: T.amber, desc: "Defines the TYPE of pricing element. PB00=basic price, RA01=discount%, FRB1=freight, MWST=tax, SKTO=cash discount. Each condition type has an access sequence assigned." },
        { n: 4, name: "Calculation Schema", tcode: "M/08", color: T.green, desc: "The pricing procedure itself. Lists all condition types in sequence with from/to reference steps, subtotals, print flag, requirement, alternative calculation base. This is your PO price calculation formula." },
        { n: 5, name: "Schema Determination", tcode: "OMFI / M/46", color: T.red, desc: "Links Purchasing Organization + Vendor Schema Group → Calculation Schema. When PO is created, SAP reads Pur.Org and Vendor's Schema Group, finds matching schema, and applies it." },
      ].map(e => (
        <div key={e.n} style={{ display: "flex", gap: 12, alignItems: "flex-start",
          background: T.surface, border: `1px solid ${e.color}30`, borderRadius: 8, padding: "12px 14px", marginBottom: 10 }}>
          <span style={{ background: e.color, color: T.bg, borderRadius: "50%", width: 28, height: 28, display: "flex",
            alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, flexShrink: 0 }}>{e.n}</span>
          <div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
              <span style={{ fontWeight: 700, color: T.text, fontSize: 14 }}>{e.name}</span>
              <TC code={e.tcode} />
            </div>
            <span style={{ color: T.sub, fontSize: 13 }}>{e.desc}</span>
          </div>
        </div>
      ))}

      <SectionTitle color={T.amber}>💱 Key Condition Types</SectionTitle>
      <TTable
        cols={[{ label: "Condition", width: "15%" }, { label: "Type", width: "20%" }, { label: "Description" }]}
        rows={[
          ["PB00","Gross Price","Standard price from Info Record or entered manually. Has access sequence."],
          ["PBXX","Manual Price","Price entered manually. No access sequence — used when no info record."],
          ["RA00","Discount %","Percentage discount on net price"],
          ["RA01","Discount Amount","Fixed amount discount"],
          ["FRB1","Freight (Value)","Freight charges added to net price"],
          ["FRC1","Freight (%)","Freight as percentage of order value"],
          ["SKTO","Cash Discount","Early payment discount — informational in PO, calculated in MIRO"],
          ["NAVS","Non-ded. Tax","Non-deductible input tax — added to material value at GR"],
          ["NAVM","Non-ded. Tax %","Non-deductible tax as percentage"],
          ["ZPR0","Custom Cond.","Company-specific conditions. Start with Z or Y. Always custom."],
        ]}
      />

      <SectionTitle color={T.green}>🔗 Schema Determination Flow</SectionTitle>
      {[
        ["Step 1", "Assign Vendor Schema Group to vendor master: Purchasing view → Schema Group for Pricing Procedure field"],
        ["Step 2", "OMFI config: Map Purchasing Org + Vendor Schema Group → Calculation Schema"],
        ["Step 3", "PO created → SAP reads Pur.Org + Vendor's Schema Group → Finds matching entry in OMFI → Applies that schema"],
      ].map(([s, t]) => (
        <BlueBox key={s} icon="→" label={s} text={t} />
      ))}

      <AmberBox icon="💡" label="Interview Tip" text="'What if no pricing schema found?' — SAP uses the default schema (blank vendor schema group in OMFI). Always test config by creating a PO and checking the Conditions tab on the line item." />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PART 9 — MRP & VALUATION
═══════════════════════════════════════════════════════════════════ */
function MRPPart() {
  return (
    <div>
      <SectionTitle color={T.cyan}>💲 Material Valuation</SectionTitle>
      <TTable
        cols={[{ label: "Method", width: "25%" }, { label: "Control", width: "15%" }, { label: "Description" }]}
        rows={[
          ["Standard Price (S)","Price Control = S","Fixed price set manually. All GRs post at standard. Variance → Price Difference account. Used for: Finished goods, Semi-finished."],
          ["Moving Avg Price (V)","Price Control = V","Auto-recalculates with every GR. Formula: (Stock Value + GR Value) / (Stock Qty + GR Qty). Used for: Raw materials, trading goods."],
        ]}
      />
      <AmberBox icon="📊" label="MAP Formula" text="New MAP = (Current Stock Value + GR Value) / (Current Stock Qty + GR Qty). Price changes automatically with every GR posting." />

      <SectionTitle color={T.green}>⚙️ Valuation T-Codes</SectionTitle>
      <TTable
        cols={[{ label: "Action", width: "30%" }, { label: "T-Code", width: "20%" }, { label: "Notes" }]}
        rows={[
          ["Change Material Price","MR21","Manual price change for both S and V price materials"],
          ["Debit/Credit Material","MR22","Post manual debit or credit to material account"],
          ["Valuation Class Config","OMWB / OMSK","Links material to GL account via Valuation Class"],
          ["Material Ledger","CKMVFM","Actual costing — when Material Ledger is active"],
          ["Cost Estimate","CK11N","Product cost estimate for Standard Price materials"],
        ]}
      />
      <RedBox icon="⚠️" label="Critical Rule" text="You CANNOT change Price Control (S→V or V→S) if there is any stock on hand. Stock must be ZERO first. This is a hard system block." />

      <SectionTitle color={T.amber}>📈 MRP — Material Requirements Planning</SectionTitle>
      <Para>MRP calculates future demand and generates procurement proposals (PRs or planned orders) automatically based on requirements vs available supply.</Para>
      <BlueBox icon="🔢" label="MRP Logic" text="Net Requirement = Demand (Sales Orders, PIRs, Reservations) - Supply (Stock + Open POs + Open PRs) - Safety Stock. If Net Requirement > 0 → New PR generated." />

      <SubTitle>MRP TYPES (Material Master MRP 1 view)</SubTitle>
      <TTable
        cols={[{ label: "Type", width: "12%" }, { label: "Name", width: "25%" }, { label: "Description" }]}
        rows={[
          ["PD","MRP","Standard demand-driven MRP. Creates PRs/planned orders based on requirements."],
          ["VB","Reorder Point","Manual reorder point. PR created when stock falls below reorder level."],
          ["VM","Auto Reorder","System calculates reorder point from historical consumption data."],
          ["ND","No Planning","Material excluded from MRP. No proposals generated."],
          ["MF","Forecast-based","Uses consumption forecast. For consumer goods and stable demand."],
        ]}
      />

      <SubTitle>LOT SIZING PROCEDURES</SubTitle>
      <TTable
        cols={[{ label: "Key", width: "12%" }, { label: "Name", width: "25%" }, { label: "Description" }]}
        rows={[
          ["EX","Lot for Lot","PR = exactly requirement quantity. Most common for expensive/perishable."],
          ["FX","Fixed Lot","Always orders fixed quantity regardless of requirement."],
          ["MB","Monthly Lot","Groups all monthly requirements into one PR."],
          ["WB","Weekly Lot","Groups all weekly requirements into one PR."],
          ["HB","Replenishment","Replenish up to maximum stock level."],
        ]}
      />

      <SectionTitle color={T.indigo}>🖥️ MRP Key T-Codes</SectionTitle>
      <TTable
        cols={[{ label: "T-Code", width: "20%" }, { label: "Name", width: "30%" }, { label: "Description" }]}
        rows={[
          ["MD01 / MD01N","Total MRP Run","Run MRP for all materials in a plant. MD01N is newer version."],
          ["MD02","Single Multi-Level","MRP for one material including all BOM components."],
          ["MD03","Single Single-Level","MRP for one material only — no BOM explosion."],
          ["MD04","Stock/Req. List","YOUR DAILY SCREEN. All open PRs, POs, planned orders, GRs, reservations."],
          ["MD05","MRP List","Result of last MRP run — snapshot, not live like MD04."],
          ["MD06","Collective MRP List","View MRP results for multiple materials after planning run."],
          ["MDBT","Background MRP","Schedule MRP as background job for overnight run."],
          ["MD14","Convert Planned","Convert planned orders to PRs manually."],
          ["ME57","Convert PR to PO","Convert PRs to POs — links to source list/quota for vendor assignment."],
        ]}
      />
      <GreenBox icon="💡" label="Daily Practice" text="MD04 is your most important daily MRP screen. Filter by Plant + Material. Understand every line: PR, PO, GR, Reservation, Planned Order. If you can read MD04 fluently, you know MRP." />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PART 10 — INTERVIEW Q&A
═══════════════════════════════════════════════════════════════════ */
function InterviewPart() {
  const { open, toggle } = useAcc();
  const qna = [
    {
      cat: "Org & Configuration", color: T.cyan,
      qs: [
        { q: "What is the difference between a Central Purchasing Org and a Plant-specific Purchasing Org?", a: "Central Pur.Org: Assigned to Company Code only (OX01). Negotiates enterprise-wide contracts and prices. Can create POs for ANY plant under that company code. Plant-specific: Assigned to one Plant (OX17). Only creates POs for that specific plant. Example: Head office uses Pur.Org 1000 (Central) for bulk steel contracts. Pune factory uses Pur.Org 1001 (Plant-specific) for local consumables." },
        { q: "Can one Plant belong to multiple Company Codes?", a: "NO. This is a hard system rule. One Plant belongs to exactly ONE Company Code. However, one Company Code can have MULTIPLE Plants. And one Purchasing Organization can be assigned to multiple Plants. This is one of the most common interview traps." },
        { q: "What happens if I don't assign a Plant to a Company Code?", a: "No MM transaction will work for that plant. GR, PO, material master creation (Accounting view) — all will fail. Plant must be assigned to Company Code (OX18) before any business transaction can be performed." },
        { q: "What is the role of the Purchasing Group in SAP MM?", a: "Purchasing Group is a key used to identify the buyer or buyer team responsible for purchasing specific materials. It is NOT an org unit — it doesn't need to be assigned to plant or company code. It appears in PR, RFQ, PO headers and is used for: (1) Release strategy conditions, (2) Reporting and analysis, (3) Output determination, (4) Workload tracking." },
      ]
    },
    {
      cat: "P2P Process", color: T.amber,
      qs: [
        { q: "Explain the complete P2P document flow from PR to Payment.", a: "PR (ME51N, internal) → Release PR (ME54N) → RFQ (ME41, optional) → Quotation (ME47) → Comparison (ME49) → PO (ME21N, legal external document) → Release PO (ME29N) → GR (MIGO/101, material doc + FI doc) → Invoice (MIRO, FI posting) → Payment (F110/F-53 by Finance team). Each document references the previous, creating full traceability." },
        { q: "What happens at accounting level when GR is posted (mvt 101)?", a: "DEBIT: Stock GL Account (determined by Valuation Class in Material Master Accounting view). CREDIT: GR/IR Clearing Account (temporary account). The GR/IR account is always temporary — it clears when MIRO is posted. If Standard Price material: difference between PO price and Standard Price goes to Price Difference account. MAP material: no price difference, stock always posts at PO price." },
        { q: "Invoice is posted but GR is not done. What happens in MIRO?", a: "Depends on GR-Based Invoice Verification flag in PO item. If ACTIVE (checked): Invoice gets blocked — no GR to match against. Must do GR first. If NOT ACTIVE: Invoice posts but GR/IR account shows a credit balance (negative balance = invoice without GR). At month-end, MR11 identifies and clears these differences." },
        { q: "A vendor delivers 100 pieces but only 80 should be accepted. What do you do?", a: "Option 1: Post GR for 80 (accepted qty) only. Reject 20 physically. Option 2: Post all 100 into GR Blocked Stock (mvt 103). Then release 80 to unrestricted (mvt 105). Return 20 with mvt 122. Option 3: Post 80, create Return PO for 20 and post return delivery (mvt 161). Best practice depends on company SOP — but always document the reason." },
        { q: "What is GR/IR account and why does it have a balance at month-end?", a: "GR/IR = Goods Receipt / Invoice Receipt clearing account. It's a temporary reconciliation account. DEBIT when GR is posted (stock received). CREDIT when invoice is posted (vendor billed). Balance at month-end: Positive balance = GR done but invoice not received yet (you owe vendor but no invoice). Negative balance = invoice posted but no GR yet. Use MB5L to list all GR/IR items. Use MR11 to clear small differences." },
      ]
    },
    {
      cat: "Special Procurement", color: T.green,
      qs: [
        { q: "What is the difference between mvt 541 and mvt 101 in Subcontracting?", a: "541 = Transfer of components TO subcontractor. Stock moves from your unrestricted stock to Subcontracting Stock (still YOUR ownership — visible in ME2O, MB52). NO FI accounting document for 541 because ownership hasn't changed. 101 = GR of FINISHED goods FROM vendor. FI posting happens. Stock increases at your plant. Simultaneously, movement type 543 AUTO-POSTS to consume the components from Subcontracting Stock. This completes the BOM-based consumption." },
        { q: "How does Consignment procurement differ from Subcontracting?", a: "Consignment: Vendor's material stored at YOUR premises. Vendor owns it until you withdraw. No payment until withdrawal (mvt 411K triggers liability). Settlement via MRKO. No components sent — vendor brings their finished material to your site. Subcontracting: YOUR material at VENDOR's premises. Vendor processes it and returns finished goods. You pay for the SERVICE. Components are yours throughout (visible in ME2O)." },
        { q: "When would you use a 2-Step STO instead of 1-Step?", a: "Use 2-Step STO when: (1) Plants are in different geographic locations — need to track goods in-transit. (2) Different company codes involved — valuation happens separately at each step. (3) Quality check needed before acceptance at receiving plant. (4) Logistics/delivery tracking is required (shipping documentation). 1-Step is fine for simple same-company-code transfers where immediate posting is acceptable." },
      ]
    },
    {
      cat: "Configuration", color: T.indigo,
      qs: [
        { q: "How do you configure the pricing procedure in SAP MM? Walk me through all steps.", a: "Step 1: Create Condition Tables (M/03) with relevant key field combinations. Step 2: Create Access Sequence (M/07) — link condition tables in priority search order. Step 3: Create Condition Types (M/06) — assign access sequence to each condition type. Step 4: Create Calculation Schema (M/08) — list condition types in sequence with step numbers, from/to, subtotals, print. Step 5: Schema Determination (OMFI) — map Purchasing Org + Vendor Schema Group → Schema. Step 6: Assign Vendor Schema Group to vendor master (Purchasing data view). Test by creating PO and checking conditions tab." },
        { q: "What is the Valuation Class and what happens if it's configured incorrectly?", a: "Valuation Class is a field in Material Master (Accounting 1 view) that links the material to GL accounts. Configuration path: OMWB → Account Determination. Each material type has default valuation classes. If WRONG: GR posts to wrong GL account (e.g., raw material stock goes into finished goods GL). Financial statements are incorrect. Balance sheet shows stock in wrong category. Correction requires: (1) Fix material master, (2) Accounting adjustment entry, (3) Coordination with Finance team." },
        { q: "How do you set up a Release Strategy and what are the common issues?", a: "Setup: Define Release Groups → Release Codes → Release Indicators → Characteristics (CT04) → Class (CL02) → Release Strategy conditions (OMGS). Common issues: (1) Strategy not found — characteristics values don't match any strategy condition. (2) Wrong release group — strategy configured for PR but applied to PO or vice versa. (3) Amount in wrong currency — GNETWR always in document currency. (4) Characteristics not assigned to correct class. Test: Create PO → Header → Release Strategy tab → should show codes to release." },
      ]
    },
  ];

  return (
    <div>
      <Para>These questions are asked at Senior Consultant / Team Lead level. Your answers must be detailed, structured, and backed by examples. Practice speaking each answer aloud in 60 seconds.</Para>
      {qna.map((cat, ci) => (
        <div key={ci} style={{ marginBottom: 20 }}>
          <SectionTitle color={cat.color}>{cat.cat}</SectionTitle>
          {cat.qs.map((qa, qi) => {
            const id = `${ci}-${qi}`;
            return (
              <Acc key={qi} id={id} open={open} toggle={toggle} accent={cat.color}
                header={
                  <>
                    <span style={{ background: cat.color + "20", color: cat.color, borderRadius: 4,
                      padding: "2px 8px", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>Q{qi + 1}</span>
                    <span style={{ fontWeight: 600, color: T.text, fontSize: 13 }}>{qa.q}</span>
                  </>
                }>
                <div style={{ background: T.surface, border: `1px solid ${cat.color}30`, borderRadius: 8, padding: "12px 16px" }}>
                  <div style={{ color: cat.color, fontWeight: 700, fontSize: 11, marginBottom: 6 }}>✅ ANSWER:</div>
                  <p style={{ color: T.text, fontSize: 13, lineHeight: 1.7, margin: 0 }}>{qa.a}</p>
                </div>
              </Acc>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PART 11 — CHEAT SHEET
═══════════════════════════════════════════════════════════════════ */
function CheatSheetPart() {
  const groups = [
    {
      title: "Org Structure", color: T.amber,
      rows: [["Company Code","OX02","Create/Change Company Code"],["Plant","OX10","Create/Change Plant"],["Storage Location","OX09","Create/Change Stor.Loc"],["Purchasing Org","OX08","Create/Change Pur.Org"],["Purchasing Group","OME4","Create/Change Pur.Group"],["Plant → Co.Code","OX18","Assign Plant to Company Code"],["Pur.Org → Co.Code","OX01","Assign Pur.Org to Company Code"],["Pur.Org → Plant","OX17","Assign Pur.Org to Plant"]],
    },
    {
      title: "Master Data", color: T.cyan,
      rows: [["Material Create/Chg/Disp","MM01/MM02/MM03","Material Master maintenance"],["Material Delete Flag","MM06","Flag material for deletion"],["Vendor Create (Full)","XK01","All 3 segments: General+CC+Purch"],["Vendor Change/Display","XK02/XK03","Vendor master change/display"],["Vendor Block","XK05","Block vendor for purchasing"],["Vendor (Purch Only)","MK01","Create only purchasing segment"],["Info Record C/C/D","ME11/ME12/ME13","Purchase Info Record"],["Info by Material/Vendor","ME1M/ME1L","Info record list reports"],["Source List","ME01/ME03","Maintain/Display source list"],["Quota Arrangement","MEQ1/MEQ3","Maintain/Display quota"]],
    },
    {
      title: "Procurement (P2P)", color: T.green,
      rows: [["PR Create/Change/Disp","ME51N/ME52N/ME53N","Purchase Requisition"],["Release PR (Individual)","ME54N","Individual PR release/reject"],["Release PR (Collective)","ME55","Mass PR release"],["Create RFQ","ME41","Request for Quotation"],["Enter Quotation","ME47","Enter vendor quotation"],["Price Comparison","ME49","Compare all quotations"],["PO Create/Change/Disp","ME21N/ME22N/ME23N","Purchase Order"],["PO by Material/Vendor","ME2M/ME2L/ME2N","PO list reports"],["Release PO (Individual)","ME29N","Individual PO release"],["Release PO (Collective)","ME28","Mass PO release"],["Goods Receipt","MIGO","All goods movements"],["Post Invoice","MIRO","Logistics Invoice Verification"],["Park Invoice","MIR7","Save without posting"],["Invoice List","MIR5/MIR6","Invoice reports"],["Release Blocked Inv.","MRBR","Release tolerance-blocked invoices"],["GR/IR Clearing","MR11","Clear GR/IR account differences"],["Cancel Invoice","MR8M","Reverse posted invoice"],["Consignment Settle","MRKO","Settle consignment liabilities"]],
    },
    {
      title: "Inventory & Stock", color: T.indigo,
      rows: [["Stock Overview","MMBE","Best daily stock check"],["Warehouse Stocks","MB52","Stock by plant and stor.loc"],["Plant Availability","MB53","Stock across all plants"],["Material Doc List","MB51","Goods movement audit trail"],["Stocks on Date","MB5B","Historical stock quantity"],["GR/IR Balances","MB5L","Outstanding GR/IR items"],["In-Transit Stock","MB5T","STO in-transit items"],["Consignment Stock","MB54","Consignment stock by vendor"],["Stock/Req. List","MD04","MRP daily planning screen"],["Physical Inv. Create","MI01","Create PI document"],["Physical Inv. Count","MI04","Enter counted quantity"],["Post PI Differences","MI07","Post inventory differences"],["PI Difference List","MI20","Print variance list"]],
    },
    {
      title: "MRP & Valuation", color: T.red,
      rows: [["Total MRP Run","MD01/MD01N","MRP for all materials in plant"],["Single Multi-Level","MD02","MRP with BOM explosion"],["Single Single-Level","MD03","MRP one material only"],["Background MRP","MDBT","Schedule overnight MRP job"],["Convert Planned→PR","MD14","Convert planned orders to PRs"],["Convert PR→PO","ME57","Convert PRs to POs with vendor"],["Change Material Price","MR21","Manual price change"],["Debit/Credit Material","MR22","Manual material account posting"],["Valuation Class Config","OMWB/OMSK","GL account determination config"],["Subcon. Monitor","ME2O","Components at subcontractor"],],
    },
    {
      title: "Special Procurement", color: T.green,
      rows: [["Subcontracting PO","ME21N (Item Cat L)","Subcontracting purchase order"],["Transfer to Subcon.","MIGO (mvt 541)","Send components to vendor"],["Monitor Subcon. Stock","ME2O","All components at all vendors"],["GR Finished Goods","MIGO (mvt 101+543)","Receive finished + consume comp"],["Consignment PO","ME21N (Item Cat K)","Consignment purchase order"],["GR Consignment","MIGO (mvt 101 K)","Receive to consignment stock"],["Withdraw Consignment","MIGO (mvt 411 K)","Transfer to own stock (FI posts)"],["Consignment Settle","MRKO","Invoice for all withdrawals"],["Create STO","ME21N/ME27 (Cat U)","Stock transfer order"],["STO GI","MIGO (mvt 351)","GI at sending plant"],["Blanket PO","ME21N (Item Cat B)","Framework order with value limit"],["Third Party PO","ME21N (Item Cat S)","Vendor delivers to customer"],],
    },
    {
      title: "Release & Pricing Config", color: T.amber,
      rows: [["Release Strategy Config","OMGS","All release strategy settings"],["Characteristics","CT04","Create condition characteristics"],["Classification Class","CL02","Create/assign class for conditions"],["Pricing Schema","M/08","Define calculation schema"],["Condition Types","M/06","Define pricing condition types"],["Access Sequence","M/07","Define search strategy"],["Condition Tables","M/03","Define key combinations"],["Schema Determination","OMFI/M/46","Map Pur.Org+VendorGrp→Schema"],["Invoice Tolerance","OMRM/OMCQ","Configure price/qty tolerance keys"],],
    },
  ];

  return (
    <div>
      <Para>Complete T-Code reference organized by category. Print this page and test yourself daily — cover the T-Code column and write from memory.</Para>
      {groups.map((g, gi) => (
        <div key={gi} style={{ marginBottom: 20 }}>
          <SectionTitle color={g.color}>{g.title}</SectionTitle>
          <TTable
            cols={[{ label: "Action/Transaction", width: "30%" }, { label: "T-Code", width: "22%" }, { label: "Notes" }]}
            rows={g.rows}
          />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PART 12 — EXERCISES
═══════════════════════════════════════════════════════════════════ */
function ExercisesPart() {
  const { open, toggle } = useAcc();
  const exercises = [
    {
      title: "Exercise 1: Complete P2P Scenario (Do Daily)", color: T.cyan,
      desc: "Scenario: Your Plant 1001 needs 500 kg of Raw Material RM-STEEL-001 from Vendor 100001 by next month at Rs. 90/kg.",
      steps: [
        "ME51N: Create PR for 500 kg RM-STEEL-001. Plant 1001. Delivery date next month. No account assignment (stock PO).",
        "ME54N: Release the PR (if release strategy configured and active).",
        "ME21N: Create PO referencing the PR using Adopt function. Vendor 100001. Price Rs. 90/kg. Item cat = Blank. Plant 1001.",
        "ME29N: Release the PO (if release strategy active for PO).",
        "MIGO: When goods arrive — GR. Select 'Goods Receipt' + 'Purchase Order'. Enter PO number. Mvt type 101. Plant 1001. Stor.Loc 0001. Post.",
        "MB03: Verify material document created. Check stock in MMBE — 500 kg should be in Plant 1001.",
        "MIRO: When vendor invoice arrives — Post Invoice. Reference PO. System proposes 500 kg at Rs. 90 = Rs. 45,000. Verify. Post.",
        "MRBR: If invoice is blocked — find reason (price variance or qty variance). Release or reject with reason.",
        "MR11 (month-end): Clear any residual GR/IR balances if partial invoicing occurred.",
      ]
    },
    {
      title: "Exercise 2: Situation Response Practice", color: T.amber,
      desc: "For each situation: identify what happened → what T-Code → what movement type → what accounting entry. Answer in 30 seconds.",
      steps: [
        "Vendor delivered 200 extra units that you didn't order. What do you do? (Hint: Check PO tolerance, then consider mvt 122)",
        "Material price has increased from Rs. 80 to Rs. 95 per kg. Update the system without waiting for next GR. (Hint: MR21)",
        "You found 50 units in warehouse are damaged and completely unusable. Remove from stock. (Hint: mvt 551 scrapping)",
        "Emergency: Need 1000 kg RM-STEEL urgently from Pune Plant to Mumbai Plant. No time for full STO. (Hint: mvt 301 1-step transfer)",
        "Vendor invoice is 5% higher than PO price. Invoice is blocked in MRBR. What do you do? (Hint: Check tolerance, approve or reject vendor)",
        "Subcontractor says they used more components than expected for the same quantity. How do you handle? (Hint: Check BOM, posting difference, coordinate with production)",
        "Month-end: GR/IR account has a large debit balance. How do you investigate? (Hint: MB5L, then MR11 for small differences)",
      ]
    },
    {
      title: "Exercise 3: T-Code Memory Test (Do Every Night)", color: T.green,
      desc: "Cover the right column. Write the T-Code from memory. Check. Repeat until all are instant.",
      steps: [
        "Create Material Master → ___",
        "Create Vendor Master (full) → ___",
        "Create Purchase Info Record → ___",
        "Create Purchase Requisition → ___",
        "Release Purchase Requisition → ___",
        "Create Purchase Order → ___",
        "Release Purchase Order (individual) → ___",
        "Post Goods Receipt → ___",
        "Post Invoice (MIRO) → ___",
        "Release Blocked Invoice → ___",
        "Stock Overview → ___",
        "Material Document List → ___",
        "MRP Stock/Requirements List → ___",
        "Subcontractor Stock Monitor → ___",
        "Consignment Settlement → ___",
        "GR/IR Clearing → ___",
        "Change Material Price → ___",
        "Physical Inventory Count → ___",
        "Price Comparison for Quotations → ___",
        "Mass Release of POs → ___",
      ]
    },
    {
      title: "Exercise 4: Flow Drawing (Weekly)", color: T.indigo,
      desc: "Draw these flows on blank paper from memory. Include: document names, T-Codes, movement types, accounting entries.",
      steps: [
        "Complete P2P flow: From business need to vendor payment (all 5 steps with T-Codes)",
        "Subcontracting flow: From PO creation to invoice posting (all movement types: 541, 101, 543)",
        "Consignment flow: From PO to settlement (movement types: 101K, 411K → MRKO)",
        "STO 2-step flow: Sending plant to receiving plant (mvt 351, 101, in-transit MB5T)",
        "Physical Inventory flow: Year-end count to posting (MI01→MI04→MI20→MI07)",
        "Release Strategy setup: Config steps from Release Group to document classification",
      ]
    },
  ];

  const answers = { 0: "MM01", 1: "XK01", 2: "ME11", 3: "ME51N", 4: "ME54N", 5: "ME21N", 6: "ME29N", 7: "MIGO", 8: "MIRO", 9: "MRBR", 10: "MMBE", 11: "MB51", 12: "MD04", 13: "ME2O", 14: "MRKO", 15: "MR11", 16: "MR21", 17: "MI04", 18: "ME49", 19: "ME28" };
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div>
      <Para>Daily exercises to rebuild muscle memory. These are the same techniques used by SAP trainers to prepare consultants for projects after long breaks.</Para>

      {exercises.map((ex, i) => (
        <Acc key={i} id={i} open={open} toggle={toggle} accent={ex.color}
          header={<span style={{ fontWeight: 700, color: T.text, fontSize: 14 }}>{ex.title}</span>}>
          <AmberBox icon="📌" label="Scenario" text={ex.desc} />
          {ex.steps.map((s, j) => (
            <div key={j} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
              <span style={{ background: ex.color, color: j === 2 ? T.bg : T.bg, borderRadius: "50%", width: 22, height: 22,
                display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 11, flexShrink: 0 }}>{j + 1}</span>
              <div style={{ flex: 1 }}>
                <span style={{ color: T.text, fontSize: 13 }}>{s}</span>
                {i === 2 && showAnswers && (
                  <Badge color={T.green}> {answers[j]}</Badge>
                )}
              </div>
            </div>
          ))}
          {i === 2 && (
            <button onClick={() => setShowAnswers(!showAnswers)} style={{
              marginTop: 10, background: showAnswers ? T.red + "20" : T.green + "20",
              color: showAnswers ? T.red : T.green, border: `1px solid ${showAnswers ? T.red : T.green}40`,
              borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontWeight: 700, fontSize: 13,
            }}>
              {showAnswers ? "🙈 Hide Answers" : "✅ Show Answers"}
            </button>
          )}
        </Acc>
      ))}

      {/* Final motivational banner */}
      <div style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0F1A2E 100%)",
        border: `1px solid ${T.blue}`, borderRadius: 12, padding: "28px 24px", marginTop: 20, textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 10 }}>🎯</div>
        <div style={{ color: T.white, fontWeight: 900, fontSize: 20, marginBottom: 8 }}>
          YOU HAVE EVERYTHING YOU NEED.
        </div>
        <div style={{ color: T.sub, fontSize: 14, marginBottom: 12, lineHeight: 1.6 }}>
          5 years of experience is already inside you.<br />
          This guide just unlocked it. Practice daily. Speak it aloud. Write T-Codes from memory.
        </div>
        <div style={{ color: T.amber, fontWeight: 700, fontSize: 15 }}>
          You will be perfect. 💪
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════════════ */
const PART_COMPONENTS = {
  strategy: StrategyPart,
  org: OrgPart,
  master: MasterPart,
  p2p: P2PPart,
  inventory: InventoryPart,
  special: SpecialPart,
  release: ReleasePart,
  pricing: PricingPart,
  mrp: MRPPart,
  interview: InterviewPart,
  cheatsheet: CheatSheetPart,
  exercises: ExercisesPart,
};

export default function App() {
  const [active, setActive] = useState("strategy");
  const [menuOpen, setMenuOpen] = useState(false);
  const ActiveComp = PART_COMPONENTS[active];
  const activePart = PARTS.find(p => p.id === active);

  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.text,
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>

      {/* TOP HEADER */}
      <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`,
        padding: "12px 20px", position: "sticky", top: 0, zIndex: 100,
        display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <span style={{ color: T.cyan, fontWeight: 900, fontSize: 16,
            fontFamily: "'JetBrains Mono','Fira Code',monospace" }}>SAP MM</span>
          <span style={{ color: T.muted, fontSize: 12, marginLeft: 10 }}>Complete Mastery Guide</span>
          <span style={{ background: T.amber + "20", color: T.amber, border: `1px solid ${T.amber}40`,
            borderRadius: 4, padding: "1px 8px", fontSize: 10, fontWeight: 700, marginLeft: 8 }}>5YR EXPERIENCE</span>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "transparent", border: `1px solid ${T.border}`, color: T.sub,
          borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: 12,
          display: "none", ["@media(max-width:768px)"]: { display: "block" }
        }}>☰</button>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 53px)" }}>

        {/* SIDEBAR */}
        <div style={{
          width: 220, flexShrink: 0, background: T.surface,
          borderRight: `1px solid ${T.border}`, padding: "14px 0",
          position: "sticky", top: 53, height: "calc(100vh - 53px)",
          overflowY: "auto",
        }}>
          <div style={{ padding: "0 12px 10px", color: T.muted, fontSize: 10,
            fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>
            12 PARTS
          </div>
          {PARTS.map((p, i) => (
            <button key={p.id} onClick={() => setActive(p.id)} style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%",
              padding: "9px 14px", border: "none", cursor: "pointer", textAlign: "left",
              background: active === p.id ? T.blue + "20" : "transparent",
              borderLeft: `3px solid ${active === p.id ? T.blue : "transparent"}`,
              transition: "all 0.15s",
            }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>{p.icon}</span>
              <div>
                <div style={{ color: active === p.id ? T.cyan : T.text, fontWeight: active === p.id ? 700 : 400, fontSize: 12 }}>
                  {p.label}
                </div>
                <div style={{ color: T.muted, fontSize: 10 }}>{p.short}</div>
              </div>
            </button>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, padding: "24px 28px", overflowY: "auto", maxWidth: 880 }}>
          {/* Part header */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <span style={{ fontSize: 28 }}>{activePart.icon}</span>
              <div>
                <div style={{ color: T.cyan, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
                  PART {PARTS.findIndex(p => p.id === active) + 1} of 12
                </div>
                <h1 style={{ margin: 0, color: T.white, fontSize: 22, fontWeight: 900 }}>{activePart.label}</h1>
              </div>
            </div>
            <div style={{ height: 2, background: `linear-gradient(90deg, ${T.blue} 0%, transparent 100%)`, borderRadius: 1 }} />
          </div>

          <ActiveComp />

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32,
            paddingTop: 20, borderTop: `1px solid ${T.border}` }}>
            {(() => {
              const idx = PARTS.findIndex(p => p.id === active);
              const prev = PARTS[idx - 1];
              const next = PARTS[idx + 1];
              return (
                <>
                  {prev ? (
                    <button onClick={() => setActive(prev.id)} style={{
                      background: T.card, border: `1px solid ${T.border}`, color: T.sub,
                      borderRadius: 8, padding: "10px 16px", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", gap: 6
                    }}>← {prev.icon} {prev.label}</button>
                  ) : <div />}
                  {next ? (
                    <button onClick={() => setActive(next.id)} style={{
                      background: T.blue, border: `1px solid ${T.blue}`, color: T.white,
                      borderRadius: 8, padding: "10px 16px", cursor: "pointer", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 6
                    }}>{next.icon} {next.label} →</button>
                  ) : <div />}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
