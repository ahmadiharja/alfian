// Admin: Data Alumni, Sebaran, Events, Donasi, Detail, Form

// === Data Alumni (table) ===
function AdminDataAlumni({ onDetail }) {
  const [selected, setSelected] = React.useState(new Set());
  const [view, setView] = React.useState("table");

  const toggleSelect = id => {
    const s = new Set(selected);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelected(s);
  };

  return (
    <div>
      <AdminTopBar
        title="Data Alumni"
        subtitle="Kelola seluruh data alumni · 1,847 entries"
        actions={
          <>
            <button className="btn btn-ghost btn-sm">⬆ Import CSV</button>
            <button className="btn btn-ghost btn-sm">⬇ Export</button>
            <button className="btn btn-primary btn-sm">＋ Tambah Alumni</button>
          </>
        }
      />

      {/* Toolbar */}
      <div style={{ padding: "16px 32px", display: "flex", gap: 12, alignItems: "center",
                    background: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)",
                    borderBottom: "1px solid var(--line)",
                    position: "sticky", top: 81, zIndex: 15 }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 360 }}>
          <input placeholder="Cari nama, NIA, kampus..."
                  style={{ width: "100%", padding: "9px 12px 9px 36px",
                            border: "1px solid var(--line)", borderRadius: 8,
                            fontSize: 13, background: "var(--bg)" }} />
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                          color: "var(--muted)" }}>⌕</span>
        </div>
        <select style={{ ...selectStyle, padding: "8px 12px", fontSize: 13 }}>
          <option>Semua Wilayah</option>
          <option>Kota Kediri</option>
          <option>Kab. Kediri</option>
        </select>
        <select style={{ ...selectStyle, padding: "8px 12px", fontSize: 13 }}>
          <option>Semua Angkatan</option>
          {[2014,2015,2016,2017,2018,2019,2020,2021].map(a=><option key={a}>{a}</option>)}
        </select>
        <select style={{ ...selectStyle, padding: "8px 12px", fontSize: 13 }}>
          <option>Semua Profesi</option>
          {PEKERJAAN.slice(0,5).map(p=><option key={p.nama}>{p.nama}</option>)}
        </select>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", border: "1px solid var(--line)", borderRadius: 8,
                       background: "var(--bg)", padding: 2 }}>
          {["table","grid"].map(v => (
            <button key={v} onClick={() => setView(v)}
                     style={{ padding: "5px 10px", border: "none",
                               background: view === v ? "white" : "transparent",
                               borderRadius: 6, fontSize: 12, fontWeight: 600,
                               color: view === v ? "var(--blue-700)" : "var(--ink-soft)",
                               cursor: "pointer", fontFamily: "inherit",
                               boxShadow: view === v ? "var(--shadow-sm)" : "none" }}>
              {v === "table" ? "≡ Tabel" : "▦ Kartu"}
            </button>
          ))}
        </div>
      </div>

      {/* Selection bar */}
      {selected.size > 0 && (
        <div style={{ padding: "12px 32px", background: "var(--blue-50)",
                       borderBottom: "1px solid var(--blue-200)",
                       display: "flex", alignItems: "center", gap: 12, fontSize: 13 }}>
          <span style={{ color: "var(--blue-700)", fontWeight: 600 }}>
            {selected.size} terpilih
          </span>
          <button className="btn btn-ghost btn-sm">📧 Kirim Pesan</button>
          <button className="btn btn-ghost btn-sm">🏷 Tag</button>
          <button className="btn btn-ghost btn-sm">⬇ Export terpilih</button>
          <button onClick={() => setSelected(new Set())}
                   className="btn btn-ghost btn-sm" style={{ marginLeft: "auto" }}>
            ✕ Batal
          </button>
        </div>
      )}

      {view === "table" ? (
        <div style={{ padding: "20px 32px" }}>
          <div className="card" style={{ overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "var(--bg)", textAlign: "left" }}>
                  <th style={th}><input type="checkbox" /></th>
                  <th style={th}>Alumni</th>
                  <th style={th}>NIA</th>
                  <th style={th}>Angkatan</th>
                  <th style={th}>Kampus / Jurusan</th>
                  <th style={th}>Domisili</th>
                  <th style={th}>Profesi</th>
                  <th style={th}>Status</th>
                  <th style={th}></th>
                </tr>
              </thead>
              <tbody>
                {ALUMNI_LIST.map(a => (
                  <tr key={a.id}
                       style={{ borderTop: "1px solid var(--line)",
                                background: selected.has(a.id) ? "var(--blue-50)" : "white" }}>
                    <td style={td}>
                      <input type="checkbox" checked={selected.has(a.id)}
                              onChange={() => toggleSelect(a.id)} />
                    </td>
                    <td style={td}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <Avatar initials={a.foto} size={34} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{a.nama}</div>
                          <div style={{ fontSize: 11, color: "var(--muted)" }}>
                            {a.status} · {a.anak} anak
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ ...td, fontFamily: "var(--font-mono)", fontSize: 11,
                                  color: "var(--ink-soft)" }}>
                      {a.id}
                    </td>
                    <td style={td}>{a.angkatan}</td>
                    <td style={td}>
                      <div style={{ fontWeight: 500 }}>{a.kampus}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>{a.jurusan}</div>
                    </td>
                    <td style={td}>
                      <div>{a.kecamatan}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>{a.wilayah}</div>
                    </td>
                    <td style={td}>
                      <div style={{ fontWeight: 500 }}>{a.jabatan}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>{a.pekerjaan}</div>
                    </td>
                    <td style={td}>
                      <span className="pill pill-gold" style={{ fontSize: 10 }}>Aktif</span>
                    </td>
                    <td style={td}>
                      <button onClick={() => onDetail(a)}
                               className="btn btn-ghost btn-sm" style={{ padding: "4px 10px" }}>
                        ⤴
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div style={{ padding: "12px 20px", borderTop: "1px solid var(--line)",
                           display: "flex", alignItems: "center", justifyContent: "space-between",
                           fontSize: 12, color: "var(--ink-soft)", background: "var(--bg)" }}>
              <span>Menampilkan 1–8 dari 1,847</span>
              <div style={{ display: "flex", gap: 4 }}>
                <button className="btn btn-ghost btn-sm">‹</button>
                <button className="btn btn-primary btn-sm">1</button>
                <button className="btn btn-ghost btn-sm">2</button>
                <button className="btn btn-ghost btn-sm">3</button>
                <span style={{ padding: "0 8px", alignSelf: "center" }}>…</span>
                <button className="btn btn-ghost btn-sm">231</button>
                <button className="btn btn-ghost btn-sm">›</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: "24px 32px",
                       display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {ALUMNI_LIST.map(a => (
            <div key={a.id} className="card" style={{ padding: 18, cursor: "pointer" }}
                  onClick={() => onDetail(a)}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Avatar initials={a.foto} size={44} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{a.nama}</div>
                  <div className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>{a.id}</div>
                </div>
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.6 }}>
                {a.angkatan} · {a.kampus.split(" ").slice(0,3).join(" ")}<br/>
                {a.kecamatan}, {a.wilayah}<br/>
                {a.jabatan}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const th = { padding: "12px 14px", fontSize: 11, fontWeight: 700, color: "var(--ink-soft)",
              letterSpacing: "0.04em", textTransform: "uppercase" };
const td = { padding: "12px 14px", verticalAlign: "middle" };

// === Sebaran / Analitik ===
function AdminSebaran() {
  return (
    <div>
      <AdminTopBar
        title="Sebaran & Analitik"
        subtitle="Visualisasi pemetaan alumni"
        actions={<button className="btn btn-ghost btn-sm">⤓ Export Laporan</button>}
      />
      <div style={{ padding: 32 }}>
        {/* Map placeholder + sidebar stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16 }}>
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                          marginBottom: 16 }}>
              <div>
                <h3 className="display" style={{ fontSize: 20, fontWeight: 600, margin: 0,
                                                  letterSpacing: "-0.02em" }}>
                  Peta Sebaran Alumni
                </h3>
                <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>
                  Heatmap berdasarkan domisili
                </div>
              </div>
              <div style={{ display: "flex", gap: 4, background: "var(--bg)",
                            border: "1px solid var(--line)", borderRadius: 8, padding: 2 }}>
                {["Kota","Kabupaten","Gabungan"].map((t, i) => (
                  <button key={t} style={{ padding: "5px 12px", border: "none",
                                            background: i === 2 ? "white" : "transparent",
                                            borderRadius: 6, fontSize: 12, fontWeight: 600,
                                            cursor: "pointer", fontFamily: "inherit",
                                            color: i === 2 ? "var(--blue-700)" : "var(--ink-soft)" }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            {/* Stylized "map" */}
            <FakeMap />
          </div>
          <div className="card" style={{ padding: 24 }}>
            <h3 className="display" style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
              Distribusi Wilayah
            </h3>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2, marginBottom: 16 }}>
              Total 1,847 alumni
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {[...KECAMATAN_KOTA.map(k => ({...k, w: "Kota"})),
                 ...KECAMATAN_KAB.slice(0, 10).map(k => ({...k, w: "Kab"}))].sort((a,b)=>b.jumlah-a.jumlah).slice(0, 12).map(k => (
                <div key={k.nama} style={{ display: "grid",
                                            gridTemplateColumns: "1fr 60px 50px", gap: 10,
                                            alignItems: "center", fontSize: 12 }}>
                  <div>
                    <div style={{ fontWeight: 500 }}>{k.nama}</div>
                    <div style={{ fontSize: 10, color: "var(--muted)" }}>{k.w === "Kota" ? "Kota Kediri" : "Kab. Kediri"}</div>
                  </div>
                  <div style={{ height: 6, background: "var(--line-soft)", borderRadius: 99 }}>
                    <div style={{ width: `${(k.jumlah/189)*100}%`, height: "100%",
                                   background: k.w === "Kota" ? "var(--blue-700)" : "var(--gold-500)",
                                   borderRadius: 99 }} />
                  </div>
                  <span className="mono" style={{ fontWeight: 600, textAlign: "right" }}>
                    {k.jumlah}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kampus & Jurusan */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <div className="card" style={{ padding: 24 }}>
            <h3 className="display" style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
              Sebaran per Kampus
            </h3>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 16, marginTop: 2 }}>
              12 kampus, di 8 kota Indonesia
            </div>
            <BarChart data={UNIVERSITAS} labelKey="singkat" limit={8} color="var(--blue-700)" />
          </div>
          <div className="card" style={{ padding: 24 }}>
            <h3 className="display" style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
              Sebaran per Jurusan
            </h3>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 16, marginTop: 2 }}>
              Program studi populer
            </div>
            <BarChart data={JURUSAN} limit={8} color="var(--gold-600)" />
          </div>
        </div>

        {/* Profesi grid */}
        <div className="card" style={{ padding: 24, marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                        marginBottom: 20 }}>
            <div>
              <h3 className="display" style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
                Sebaran Profesi
              </h3>
              <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>
                Sektor pasca-kampus alumni
              </div>
            </div>
            <button className="btn btn-ghost btn-sm">⤓ Export</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
            {PEKERJAAN.map(p => (
              <div key={p.nama} style={{ padding: 16, borderRadius: 12,
                                          background: "var(--bg)", border: "1px solid var(--line)" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8,
                              background: "var(--blue-700)", color: "var(--gold-500)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontWeight: 700, fontSize: 16 }}>
                  {p.icon}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 12, lineHeight: 1.3 }}>
                  {p.nama}
                </div>
                <div className="display" style={{ fontSize: 24, fontWeight: 600,
                                                    color: "var(--ink)", marginTop: 6,
                                                    letterSpacing: "-0.02em" }}>
                  {p.jumlah}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Stylized SVG "map" — abstract heatmap, not a real Kediri map
function FakeMap() {
  const blobs = [
    { x: 35, y: 45, r: 70, n: "Mojoroto", v: 189, color: "var(--blue-700)" },
    { x: 50, y: 40, r: 65, n: "Kota", v: 189, color: "var(--blue-700)" },
    { x: 48, y: 58, r: 60, n: "Pesantren", v: 167, color: "var(--blue-700)" },
    { x: 72, y: 30, r: 55, n: "Pare", v: 98, color: "var(--gold-500)" },
    { x: 65, y: 50, r: 48, n: "Ngasem", v: 87, color: "var(--gold-500)" },
    { x: 68, y: 70, r: 44, n: "Gurah", v: 76, color: "var(--gold-500)" },
    { x: 82, y: 60, r: 40, n: "Kandangan", v: 71, color: "var(--gold-500)" },
    { x: 25, y: 75, r: 36, n: "Mojo", v: 42, color: "var(--gold-500)" },
    { x: 20, y: 30, r: 32, n: "Tarokan", v: 17, color: "var(--gold-500)" },
  ];
  return (
    <div style={{ position: "relative", height: 480, borderRadius: 12,
                  background: "linear-gradient(180deg, var(--bg) 0%, var(--blue-50) 100%)",
                  border: "1px solid var(--line)", overflow: "hidden" }}>
      {/* Grid bg */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.4,
                    backgroundImage: `linear-gradient(var(--line) 1px, transparent 1px),
                                       linear-gradient(90deg, var(--line) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px" }} />
      {/* Boundary */}
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0 }}>
        <path d="M 15 25 Q 20 15, 38 12 T 75 18 Q 90 30, 88 50 T 75 80 Q 50 92, 30 85 T 12 60 Z"
              fill="none" stroke="var(--blue-700)" strokeWidth="0.3" strokeDasharray="1 1"
              opacity="0.5" />
        <text x="78" y="22" fontSize="2" fontFamily="monospace" fill="var(--ink-soft)" opacity="0.7">
          KAB. KEDIRI
        </text>
        <text x="38" y="48" fontSize="2" fontFamily="monospace" fill="var(--ink-soft)" opacity="0.7">
          KOTA KEDIRI
        </text>
      </svg>
      {/* Blobs */}
      {blobs.map((b, i) => (
        <div key={i} style={{
          position: "absolute", left: `${b.x}%`, top: `${b.y}%`,
          width: b.r, height: b.r, borderRadius: "50%",
          background: b.color, opacity: 0.55,
          transform: "translate(-50%, -50%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}>
          <div style={{ textAlign: "center", color: "white" }}>
            <div style={{ fontSize: 9, fontWeight: 700, lineHeight: 1 }}>{b.n}</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>{b.v}</div>
          </div>
        </div>
      ))}
      {/* Legend */}
      <div style={{ position: "absolute", bottom: 16, left: 16,
                    background: "rgba(255,255,255,0.95)",
                    border: "1px solid var(--line)", borderRadius: 10,
                    padding: "10px 14px", fontSize: 11 }}>
        <div style={{ fontWeight: 700, marginBottom: 6, color: "var(--ink-soft)",
                      letterSpacing: "0.04em", textTransform: "uppercase", fontSize: 10 }}>
          Legend
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: 99, background: "var(--blue-700)" }} />
          <span>Kota Kediri</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: 99, background: "var(--gold-500)" }} />
          <span>Kabupaten Kediri</span>
        </div>
      </div>
      {/* Notice */}
      <div style={{ position: "absolute", top: 16, right: 16,
                    padding: "6px 12px", background: "white",
                    border: "1px solid var(--line)", borderRadius: 99,
                    fontSize: 10, color: "var(--ink-soft)", fontFamily: "var(--font-mono)" }}>
        ⟢ peta abstrak · slot integrasi GeoJSON ⟣
      </div>
    </div>
  );
}

Object.assign(window, { AdminDataAlumni, AdminSebaran, FakeMap });
