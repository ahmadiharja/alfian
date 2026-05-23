// Shared components for PMII Kediri alumni app

const { useState, useMemo, useEffect } = React;

// === PMII Logo / Emblem (Logo resmi IKA-PMII) ===
function PMIILogo({ size = 48, withText = true, dark = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <img src="assets/ika-pmii-logo.png" alt="IKA-PMII"
           width={size} height={size}
           style={{ flexShrink: 0, objectFit: "contain", display: "block" }} />
      {withText && (
        <div style={{ lineHeight: 1.15 }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700,
                         fontSize: 16, color: dark ? "white" : "var(--blue-900)",
                         letterSpacing: "-0.02em" }}>
            IKA-PMII
          </div>
          <div style={{ fontSize: 10.5, color: dark ? "var(--gold-300)" : "var(--ink-soft)",
                         fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                         marginTop: 1 }}>
            Kediri Raya
          </div>
        </div>
      )}
    </div>
  );
}

// === Stat Card ===
function StatCard({ label, value, delta, sub, accent }) {
  return (
    <div className="card" style={{ padding: 20, position: "relative", overflow: "hidden" }}>
      <div style={{ fontSize: 12, color: "var(--ink-soft)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <div className="display" style={{ fontSize: 36, fontWeight: 600, color: "var(--ink)", lineHeight: 1 }}>
          {value}
        </div>
        {delta && (
          <span style={{ fontSize: 12, fontWeight: 600, color: "oklch(0.55 0.15 145)" }}>
            ↑ {delta}
          </span>
        )}
      </div>
      {sub && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}>{sub}</div>}
      {accent && (
        <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60,
                      background: `linear-gradient(135deg, transparent 50%, ${accent} 50%)`, opacity: 0.15 }} />
      )}
    </div>
  );
}

// === Horizontal Bar Chart ===
function BarChart({ data, max, color = "var(--blue-600)", labelKey = "nama", valueKey = "jumlah", limit }) {
  const sliced = limit ? data.slice(0, limit) : data;
  const top = max || Math.max(...sliced.map(d => d[valueKey]));
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {sliced.map((d, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr 50px", gap: 12, alignItems: "center" }}>
          <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {d[labelKey]}
          </div>
          <div style={{ height: 22, background: "var(--line-soft)", borderRadius: 4, overflow: "hidden", position: "relative" }}>
            <div style={{ width: `${(d[valueKey] / top) * 100}%`, height: "100%",
                          background: color, borderRadius: 4,
                          transition: "width 0.6s cubic-bezier(0.3,0.1,0.3,1)" }} />
          </div>
          <div className="mono" style={{ fontSize: 12, color: "var(--ink-soft)", textAlign: "right", fontWeight: 600 }}>
            {d[valueKey]}
          </div>
        </div>
      ))}
    </div>
  );
}

// === Donut Chart (SVG) ===
function Donut({ data, size = 180, thickness = 28, palette }) {
  const total = data.reduce((s, d) => s + d.jumlah, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const colors = palette || [
    "var(--blue-700)", "var(--gold-500)", "var(--blue-500)",
    "var(--gold-700)", "var(--blue-300)", "oklch(0.65 0.12 180)",
    "oklch(0.55 0.15 30)", "oklch(0.70 0.12 320)",
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {data.map((d, i) => {
          const frac = d.jumlah / total;
          const dash = frac * circumference;
          const seg = (
            <circle key={i} cx={size/2} cy={size/2} r={radius}
                    fill="none" stroke={colors[i % colors.length]} strokeWidth={thickness}
                    strokeDasharray={`${dash} ${circumference - dash}`}
                    strokeDashoffset={-offset} />
          );
          offset += dash;
          return seg;
        })}
      </svg>
      <div style={{ flex: 1, display: "grid", gap: 6 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: colors[i % colors.length] }} />
            <div style={{ flex: 1, color: "var(--ink)" }}>{d.nama}</div>
            <div className="mono" style={{ color: "var(--ink-soft)", fontWeight: 600 }}>
              {Math.round((d.jumlah / total) * 100)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// === Avatar ===
function Avatar({ initials, size = 40, color }) {
  const palette = ["oklch(0.42 0.18 252)", "oklch(0.62 0.15 70)", "oklch(0.55 0.15 30)",
                   "oklch(0.50 0.15 180)", "oklch(0.55 0.15 320)", "oklch(0.50 0.15 145)"];
  const bg = color || palette[(initials?.charCodeAt(0) || 0) % palette.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: 999,
      background: bg, color: "white",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 600, fontSize: size * 0.4, letterSpacing: "-0.02em",
      flexShrink: 0
    }}>
      {initials}
    </div>
  );
}

// === Photo placeholder (striped SVG) ===
function PhotoSlot({ width = "100%", height = 200, label = "image" }) {
  return (
    <div style={{
      width, height, borderRadius: "var(--r-md)",
      backgroundImage: "repeating-linear-gradient(135deg, oklch(0.93 0.02 245) 0 8px, oklch(0.96 0.01 245) 8px 16px)",
      border: "1px solid var(--line)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "var(--ink-soft)", fontFamily: "var(--font-mono)", fontSize: 11,
      letterSpacing: "0.05em"
    }}>
      ⟢ {label} ⟣
    </div>
  );
}

// === Indonesian Rupiah formatter ===
function rupiah(n) {
  return "Rp " + n.toLocaleString("id-ID");
}

// === Progress bar ===
function Progress({ value, max, color = "var(--blue-600)", height = 8 }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ height, background: "var(--line-soft)", borderRadius: 99, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99,
                    transition: "width 0.6s" }} />
    </div>
  );
}

// === Indonesian date format ===
function tglID(iso) {
  const bulan = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
  const d = new Date(iso);
  return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

// Shared select input style — exposed globally for admin forms
const selectStyle = {
  border: "1px solid var(--line)", borderRadius: 8,
  background: "white", fontFamily: "inherit", cursor: "pointer",
};

Object.assign(window, {
  PMIILogo, StatCard, BarChart, Donut, Avatar, PhotoSlot,
  rupiah, Progress, tglID, selectStyle,
});
