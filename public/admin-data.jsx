// Admin: Data Alumni, Sebaran

const th = { padding: "12px 14px", fontSize: 11, fontWeight: 700, color: "var(--ink-soft)",
              letterSpacing: "0.04em", textTransform: "uppercase" };
const td = { padding: "12px 14px", verticalAlign: "middle" };

// === Data Alumni (table) ===
function AdminDataAlumni({ onDetail, onEdit, onDelete }) {
  const [selected, setSelected] = React.useState(new Set());
  const [view, setView] = React.useState("table");
  const [search, setSearch] = React.useState('');
  const [wilayah, setWilayah] = React.useState('');
  const [angkatan, setAngkatan] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState([]);
  const [meta, setMeta] = React.useState({ total: 0, totalPages: 1 });
  const [loading, setLoading] = React.useState(true);

  const fetchData = React.useCallback(() => {
    setLoading(true);
    const params = { page, limit: 20 };
    if (search) params.q = search;
    if (wilayah) params.wilayah = wilayah;
    if (angkatan) params.angkatan = angkatan;
    if (status) params.statusVerifikasi = status;
    AlumniAPI.list(params)
      .then(res => { setData(res.data || []); setMeta(res.meta || { total: 0, totalPages: 1 }); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, search, wilayah, angkatan, status]);

  React.useEffect(() => { fetchData(); }, [fetchData]);

  // Global refresh hook so CRUD operations can trigger reload
  React.useEffect(() => {
    window.__refreshAlumni = fetchData;
    return () => { delete window.__refreshAlumni; };
  }, [fetchData]);

  const toggleSelect = id => {
    const s = new Set(selected);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelected(s);
  };

  return (
    <div>
      <AdminTopBar
        title="Data Alumni"
        subtitle={loading ? "Memuat..." : `${(meta.total || 0).toLocaleString('id-ID')} alumni terdaftar`}
        actions={
          <>
            <button className="btn btn-ghost btn-sm">⬇ Export CSV</button>
            <button className="btn btn-primary btn-sm" onClick={() => onEdit && onEdit(null)}>
              ＋ Tambah Alumni
            </button>
          </>
        }
      />

      {/* Toolbar */}
      <div style={{ padding: "16px 32px", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap",
                    background: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)",
                    borderBottom: "1px solid var(--line)", position: "sticky", top: 81, zIndex: 15 }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 360 }}>
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Cari nama, NIA, kampus..."
                  style={{ width: "100%", padding: "9px 12px 9px 36px", border: "1px solid var(--line)",
                            borderRadius: 8, fontSize: 13, background: "var(--bg)" }} />
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                          color: "var(--muted)" }}>⌕</span>
        </div>
        <select value={wilayah} onChange={e => { setWilayah(e.target.value); setPage(1); }}
                 style={{ ...selectStyle, padding: "8px 12px", fontSize: 13 }}>
          <option value="">Semua Wilayah</option>
          <option>Kota Kediri</option>
          <option>Kab. Kediri</option>
        </select>
        <select value={angkatan} onChange={e => { setAngkatan(e.target.value); setPage(1); }}
                 style={{ ...selectStyle, padding: "8px 12px", fontSize: 13 }}>
          <option value="">Semua Angkatan</option>
          {[2014,2015,2016,2017,2018,2019,2020,2021,2022,2023].map(a => (
            <option key={a}>{a}</option>
          ))}
        </select>
        <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}
                 style={{ ...selectStyle, padding: "8px 12px", fontSize: 13 }}>
          <option value="">Semua Status</option>
          <option value="pending">Pending</option>
          <option value="verified">Terverifikasi</option>
          <option value="rejected">Ditolak</option>
        </select>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", border: "1px solid var(--line)", borderRadius: 8,
                       background: "var(--bg)", padding: 2 }}>
          {["table", "grid"].map(v => (
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
          <span style={{ color: "var(--blue-700)", fontWeight: 600 }}>{selected.size} terpilih</span>
          <button onClick={() => setSelected(new Set())} className="btn btn-ghost btn-sm" style={{ marginLeft: "auto" }}>
            ✕ Batal
          </button>
        </div>
      )}

      {loading ? (
        <div style={{ padding: 60, textAlign: "center", color: "var(--ink-soft)" }}>Memuat data...</div>
      ) : data.length === 0 ? (
        <div style={{ padding: 60, textAlign: "center", color: "var(--ink-soft)" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
          Tidak ada data alumni ditemukan
        </div>
      ) : view === "table" ? (
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
                {data.map(a => {
                  const nama = a.namaLengkap || a.nama || '?';
                  const initials = nama.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
                  return (
                    <tr key={a.id}
                         style={{ borderTop: "1px solid var(--line)",
                                  background: selected.has(a.id) ? "var(--blue-50)" : "white" }}>
                      <td style={td}>
                        <input type="checkbox" checked={selected.has(a.id)}
                                onChange={() => toggleSelect(a.id)} />
                      </td>
                      <td style={td}>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <Avatar initials={initials} size={34} />
                          <div>
                            <div style={{ fontWeight: 600 }}>{nama}</div>
                            <div style={{ fontSize: 11, color: "var(--muted)" }}>
                              {a.statusPernikahan || "—"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ ...td, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-soft)" }}>
                        {a.nia || "—"}
                      </td>
                      <td style={td}>{a.angkatan || "—"}</td>
                      <td style={td}>
                        <div style={{ fontWeight: 500 }}>{a.kampus || "—"}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)" }}>{a.jurusan || "—"}</div>
                      </td>
                      <td style={td}>
                        <div>{a.kecamatan || "—"}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)" }}>{a.wilayah || "—"}</div>
                      </td>
                      <td style={td}>
                        <div style={{ fontWeight: 500 }}>{a.jabatan || "—"}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)" }}>{a.pekerjaanUtama || "—"}</div>
                      </td>
                      <td style={td}>
                        <span className="pill" style={{
                          fontSize: 10,
                          background: a.statusVerifikasi === 'verified' ? 'oklch(0.95 0.04 145)' : 'var(--gold-100)',
                          color: a.statusVerifikasi === 'verified' ? 'oklch(0.4 0.15 145)' : 'var(--gold-700)',
                        }}>
                          {a.statusVerifikasi === 'verified' ? '✓ Verified' : (a.statusVerifikasi || 'pending')}
                        </span>
                      </td>
                      <td style={{ ...td, whiteSpace: "nowrap" }}>
                        <button onClick={() => onDetail && onDetail(a)}
                                 className="btn btn-ghost btn-sm" title="Detail"
                                 style={{ padding: "4px 8px" }}>⤴</button>
                        <button onClick={() => onEdit && onEdit(a)}
                                 className="btn btn-ghost btn-sm" title="Edit"
                                 style={{ padding: "4px 8px" }}>✎</button>
                        <button onClick={() => onDelete && onDelete(a)}
                                 className="btn btn-ghost btn-sm" title="Hapus"
                                 style={{ padding: "4px 8px", color: "oklch(0.55 0.18 25)" }}>🗑</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* Pagination */}
            <div style={{ padding: "12px 20px", borderTop: "1px solid var(--line)",
                           display: "flex", alignItems: "center", justifyContent: "space-between",
                           fontSize: 12, color: "var(--ink-soft)", background: "var(--bg)" }}>
              <span>
                Menampilkan {((page - 1) * 20) + 1}–{Math.min(page * 20, meta.total)} dari {(meta.total || 0).toLocaleString('id-ID')}
              </span>
              <div style={{ display: "flex", gap: 4 }}>
                <button className="btn btn-ghost btn-sm"
                         onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}>‹</button>
                {Array.from({ length: Math.min(5, meta.totalPages || 1) }, (_, i) => {
                  const p = Math.max(1, page - 2) + i;
                  if (p > (meta.totalPages || 1)) return null;
                  return (
                    <button key={p} onClick={() => setPage(p)}
                             className={`btn btn-sm ${page === p ? 'btn-primary' : 'btn-ghost'}`}>{p}</button>
                  );
                })}
                <button className="btn btn-ghost btn-sm"
                         onClick={() => setPage(p => Math.min(meta.totalPages || 1, p + 1))}
                         disabled={page >= (meta.totalPages || 1)}>›</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: "24px 32px", display: "grid",
                       gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
          {data.map(a => {
            const nama = a.namaLengkap || a.nama || '?';
            const initials = nama.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
            return (
              <div key={a.id} className="card" style={{ padding: 18, cursor: "pointer" }}
                    onClick={() => onDetail && onDetail(a)}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Avatar initials={initials} size={44} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{nama}</div>
                    <div className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>{a.nia || "—"}</div>
                  </div>
                </div>
                <div style={{ marginTop: 12, fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.7 }}>
                  {a.angkatan || "—"} · {(a.kampus || "").split(" ").slice(0, 3).join(" ") || "—"}<br/>
                  {a.kecamatan || "—"}, {a.wilayah || "—"}<br/>
                  {a.jabatan || a.pekerjaanUtama || "—"}
                </div>
                <div style={{ marginTop: 10, display: "flex", gap: 6, justifyContent: "flex-end" }}>
                  <button onClick={e => { e.stopPropagation(); onEdit && onEdit(a); }}
                           className="btn btn-ghost btn-sm" style={{ padding: "4px 8px" }}>✎</button>
                  <button onClick={e => { e.stopPropagation(); onDelete && onDelete(a); }}
                           className="btn btn-ghost btn-sm"
                           style={{ padding: "4px 8px", color: "oklch(0.55 0.18 25)" }}>🗑</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// === Sebaran / Analitik ===
function AdminSebaran() {
  const [kampusData, setKampusData] = React.useState(UNIVERSITAS);
  const [jurusanData, setJurusanData] = React.useState(JURUSAN);
  const [pekerjaanData, setPekerjaanData] = React.useState(PEKERJAAN);

  React.useEffect(() => {
    AnalyticsAPI.kampus().then(res => { if (res.data) setKampusData(res.data); }).catch(() => {});
    AnalyticsAPI.jurusan().then(res => { if (res.data) setJurusanData(res.data); }).catch(() => {});
    AnalyticsAPI.pekerjaan().then(res => { if (res.data) setPekerjaanData(res.data); }).catch(() => {});
  }, []);

  return (
    <div>
      <AdminTopBar
        title="Sebaran & Analitik"
        subtitle="Visualisasi pemetaan alumni"
        actions={<button className="btn btn-ghost btn-sm">⤓ Export Laporan</button>}
      />
      <div style={{ padding: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16 }}>
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <h3 className="display" style={{ fontSize: 20, fontWeight: 600, margin: 0, letterSpacing: "-0.02em" }}>
                  Peta Sebaran Alumni
                </h3>
                <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>Heatmap berdasarkan domisili</div>
              </div>
            </div>
            <KediriGeoMap />
          </div>
          <div className="card" style={{ padding: 24 }}>
            <h3 className="display" style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Distribusi Wilayah</h3>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2, marginBottom: 16 }}>Berdasarkan domisili</div>
            <div style={{ display: "grid", gap: 10 }}>
              {[...KECAMATAN_KOTA.map(k => ({ ...k, w: "Kota" })),
                ...KECAMATAN_KAB.slice(0, 10).map(k => ({ ...k, w: "Kab" }))
              ].sort((a, b) => b.jumlah - a.jumlah).slice(0, 12).map(k => (
                <div key={k.nama} style={{ display: "grid", gridTemplateColumns: "1fr 60px 50px", gap: 10, alignItems: "center", fontSize: 12 }}>
                  <div>
                    <div style={{ fontWeight: 500 }}>{k.nama}</div>
                    <div style={{ fontSize: 10, color: "var(--muted)" }}>{k.w === "Kota" ? "Kota Kediri" : "Kab. Kediri"}</div>
                  </div>
                  <div style={{ height: 6, background: "var(--line-soft)", borderRadius: 99 }}>
                    <div style={{ width: `${(k.jumlah / 189) * 100}%`, height: "100%",
                                   background: k.w === "Kota" ? "var(--blue-700)" : "var(--gold-500)",
                                   borderRadius: 99 }} />
                  </div>
                  <span className="mono" style={{ fontWeight: 600, textAlign: "right" }}>{k.jumlah}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <div className="card" style={{ padding: 24 }}>
            <h3 className="display" style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Sebaran per Kampus</h3>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 16, marginTop: 2 }}>Top kampus alumni</div>
            <BarChart data={kampusData} labelKey="singkat" limit={8} color="var(--blue-700)" />
          </div>
          <div className="card" style={{ padding: 24 }}>
            <h3 className="display" style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Sebaran per Jurusan</h3>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 16, marginTop: 2 }}>Program studi populer</div>
            <BarChart data={jurusanData} limit={8} color="var(--gold-600)" />
          </div>
        </div>

        <div className="card" style={{ padding: 24, marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 className="display" style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Sebaran Profesi</h3>
              <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>Sektor pasca-kampus alumni</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
            {pekerjaanData.map(p => (
              <div key={p.nama} style={{ padding: 16, borderRadius: 12, background: "var(--bg)", border: "1px solid var(--line)" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--blue-700)",
                              color: "var(--gold-500)", display: "flex", alignItems: "center",
                              justifyContent: "center", fontWeight: 700, fontSize: 16 }}>
                  {p.icon}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 12, lineHeight: 1.3 }}>{p.nama}</div>
                <div className="display" style={{ fontSize: 24, fontWeight: 600, color: "var(--ink)",
                                                    marginTop: 6, letterSpacing: "-0.02em" }}>
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

// === Real GeoJSON SVG Map — Interactive ===
// Module-level constants (stable, no re-creation per render)
const GEO_W = 600, GEO_H = 390;
const GEO_MAX_ZOOM = 12, GEO_MIN_ZOOM = 0.9;
const GEO_INIT_VB = { x: 0, y: 0, w: GEO_W, h: GEO_H };
function geoClamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
const MAP_BTN_BASE = {
  padding: "5px 10px", border: "none", background: "white",
  color: "var(--ink)", cursor: "pointer", fontFamily: "inherit",
  fontSize: 12, fontWeight: 500, lineHeight: 1, display: "inline-flex",
  alignItems: "center", gap: 4,
};

function KediriGeoMap() {
  const [kotaGeo, setKotaGeo] = React.useState(null);
  const [kabGeo, setKabGeo] = React.useState(null);
  const [sebaranData, setSebaranData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [tooltip, setTooltip] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  const [hovering, setHovering] = React.useState(null);
  const [showBadges, setShowBadges] = React.useState(true);
  const [showLabels, setShowLabels] = React.useState(true);
  const [activeLayer, setActiveLayer] = React.useState('both');
  const [vb, setVb] = React.useState(GEO_INIT_VB);
  const dragRef = React.useRef(null);
  const svgRef = React.useRef(null);

  // Data loading
  React.useEffect(() => {
    Promise.all([
      fetch('/assets/kota-kediri-map.geojson').then(r => r.json()),
      fetch('/assets/kab-kediri-map.geojson').then(r => r.json()),
      AnalyticsAPI.sebaran()
        .then(r => (r.data && r.data.byKecamatan) || [])
        .catch(() => []),
    ]).then(([kota, kab, sebaran]) => {
      setKotaGeo(kota); setKabGeo(kab); setSebaranData(sebaran); setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Non-passive wheel handler for zoom (must be attached imperatively)
  const handleWheel = React.useCallback((e) => {
    e.preventDefault();
    const rect = svgRef.current.getBoundingClientRect();
    setVb(prev => {
      const sx = prev.x + (e.clientX - rect.left) / rect.width * prev.w;
      const sy = prev.y + (e.clientY - rect.top) / rect.height * prev.h;
      const factor = e.deltaY > 0 ? 1.25 : 0.8;
      const newW = geoClamp(prev.w * factor, GEO_W / GEO_MAX_ZOOM, GEO_W / GEO_MIN_ZOOM);
      const newH = newW * (GEO_H / GEO_W);
      const rx = (sx - prev.x) / prev.w, ry = (sy - prev.y) / prev.h;
      return { x: sx - rx * newW, y: sy - ry * newH, w: newW, h: newH };
    });
  }, []);

  React.useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  if (loading) return (
    <div style={{ height: 380, display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--ink-soft)", fontSize: 13, borderRadius: 12,
                  background: "var(--bg)", border: "1px solid var(--line)" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>🗺</div>
        Memuat peta Kediri...
      </div>
    </div>
  );

  const kotaFeatures = (kotaGeo && kotaGeo.features) || [];
  const kabFeatures  = (kabGeo  && kabGeo.features)  || [];
  const allFeatures  = [...kotaFeatures, ...kabFeatures];

  if (allFeatures.length === 0) return (
    <div style={{ height: 380, display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--ink-soft)", borderRadius: 12, background: "var(--bg)", border: "1px solid var(--line)" }}>
      Gagal memuat data peta
    </div>
  );

  // --- Projection setup ---
  let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
  function scanCoords(arr) {
    if (typeof arr[0] === 'number') {
      if (arr[0] < minLon) minLon = arr[0]; if (arr[0] > maxLon) maxLon = arr[0];
      if (arr[1] < minLat) minLat = arr[1]; if (arr[1] > maxLat) maxLat = arr[1];
    } else { arr.forEach(scanCoords); }
  }
  allFeatures.forEach(f => scanCoords(f.geometry.coordinates));

  const PAD = 16;
  const lonSpan = maxLon - minLon, latSpan = maxLat - minLat;
  const scaleGeo = Math.min((GEO_W - PAD * 2) / lonSpan, (GEO_H - PAD * 2) / latSpan);
  const offX = PAD + ((GEO_W - PAD * 2) - lonSpan * scaleGeo) / 2;
  const offY = PAD + ((GEO_H - PAD * 2) - latSpan * scaleGeo) / 2;

  function project(lon, lat) {
    return [offX + (lon - minLon) * scaleGeo, GEO_H - offY - (lat - minLat) * scaleGeo];
  }
  function ringToD(ring) {
    return ring.map((c, i) => {
      const [x, y] = project(c[0], c[1]);
      return (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
    }).join('') + 'Z';
  }
  function featureToD(geom) {
    return geom.coordinates.map(poly => poly.map(ringToD).join('')).join('');
  }
  function getCentroid(geom) {
    const ring = geom.coordinates[0][0];
    let sLon = 0, sLat = 0;
    ring.forEach(c => { sLon += c[0]; sLat += c[1]; });
    return project(sLon / ring.length, sLat / ring.length);
  }

  // --- Count lookup ---
  const countMap = {};
  KECAMATAN_KOTA.forEach(k => { countMap[k.nama.toLowerCase()] = k.jumlah; });
  KECAMATAN_KAB.forEach(k => { countMap[k.nama.toLowerCase()] = k.jumlah; });
  sebaranData.forEach(d => { if (d.name) countMap[d.name.toLowerCase()] = d.count; });
  function getCount(name) {
    if (!name) return 0;
    const key = name.toLowerCase();
    if (countMap[key] !== undefined) return countMap[key];
    for (const k of Object.keys(countMap)) {
      if (key.includes(k) || k.includes(key)) return countMap[k];
    }
    return 0;
  }
  const allCounts = allFeatures.map(f => getCount(f.properties.district));
  const maxCount = Math.max(...allCounts, 1);
  const totalCount = allCounts.reduce((s, c) => s + c, 0);
  const totalKota = kotaFeatures.reduce((s, f) => s + getCount(f.properties.district), 0);
  const totalKab  = kabFeatures.reduce((s, f) => s + getCount(f.properties.district), 0);

  // --- Color scales ---
  function kotaColor(t) { return `oklch(${(0.75 - t*0.28).toFixed(2)} ${(0.08 + t*0.12).toFixed(2)} 252)`; }
  function kabColor(t)  { return `oklch(${(0.88 - t*0.30).toFixed(2)} ${(0.06 + t*0.13).toFixed(2)} 82)`; }

  // --- Sort for ranking ---
  const sortedAll = allFeatures
    .map(f => ({ name: f.properties.district, count: getCount(f.properties.district), isKota: f.properties.regency === 'Kota Kediri' }))
    .sort((a, b) => b.count - a.count);

  // --- Zoom/pan helpers ---
  const zoomLevel = GEO_W / vb.w;

  function zoomAround(cx, cy, factor) {
    setVb(prev => {
      const newW = geoClamp(prev.w * factor, GEO_W / GEO_MAX_ZOOM, GEO_W / GEO_MIN_ZOOM);
      const newH = newW * (GEO_H / GEO_W);
      const rx = (cx - prev.x) / prev.w, ry = (cy - prev.y) / prev.h;
      return { x: cx - rx * newW, y: cy - ry * newH, w: newW, h: newH };
    });
  }
  function zoomIn()  { zoomAround(vb.x + vb.w/2, vb.y + vb.h/2, 0.65); }
  function zoomOut() { zoomAround(vb.x + vb.w/2, vb.y + vb.h/2, 1.54); }
  function resetView() { setVb(GEO_INIT_VB); setSelected(null); }

  function zoomToFeature(f) {
    let fMinX = Infinity, fMaxX = -Infinity, fMinY = Infinity, fMaxY = -Infinity;
    function scanSVG(arr) {
      if (typeof arr[0] === 'number') {
        const [px, py] = project(arr[0], arr[1]);
        if (px < fMinX) fMinX = px; if (px > fMaxX) fMaxX = px;
        if (py < fMinY) fMinY = py; if (py > fMaxY) fMaxY = py;
      } else { arr.forEach(scanSVG); }
    }
    scanSVG(f.geometry.coordinates);
    const pad = 22;
    const fw = fMaxX - fMinX + pad * 2, fh = fMaxY - fMinY + pad * 2;
    const newW = geoClamp(Math.max(fw, fh * GEO_W / GEO_H), GEO_W / GEO_MAX_ZOOM, GEO_W);
    const newH = newW * (GEO_H / GEO_W);
    const cx = (fMinX + fMaxX) / 2, cy = (fMinY + fMaxY) / 2;
    setVb({ x: cx - newW/2, y: cy - newH/2, w: newW, h: newH });
  }

  // --- Drag handlers ---
  function onSVGMouseDown(e) {
    if (e.button !== 0) return;
    dragRef.current = { startX: e.clientX, startY: e.clientY, vbX: vb.x, vbY: vb.y, vbW: vb.w, vbH: vb.h, moved: false };
  }
  function onSVGMouseMove(e) {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX, dy = e.clientY - dragRef.current.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragRef.current.moved = true;
    if (!dragRef.current.moved) return;
    setTooltip(null);
    const rect = svgRef.current.getBoundingClientRect();
    const sdx = dx / rect.width * dragRef.current.vbW;
    const sdy = dy / rect.height * dragRef.current.vbH;
    setVb(prev => ({ ...prev, x: dragRef.current.vbX - sdx, y: dragRef.current.vbY - sdy }));
  }
  function onSVGMouseUp() { dragRef.current = null; }

  // --- Feature interaction ---
  function onFeatureMouseMove(e, name, count, type) {
    if (dragRef.current && dragRef.current.moved) return;
    const rect = svgRef.current.parentElement.getBoundingClientRect();
    setTooltip({ name, count, type, x: e.clientX - rect.left, y: e.clientY - rect.top });
  }
  function onFeatureClick(e, f, count, type) {
    e.stopPropagation();
    if (dragRef.current && dragRef.current.moved) return;
    setSelected({ name: f.properties.district, count, type });
    zoomToFeature(f);
  }

  // Sizes that stay constant on screen regardless of zoom level
  const sz = vb.w / GEO_W; // SVG units per screen-pixel-equivalent (scale factor)
  const badgeR    = 9 * sz;
  const labelSz   = 7 * sz;
  const strokeKab = 0.8 * sz;
  const strokeKota = 1.3 * sz;

  const layerVisible = (isKota) =>
    activeLayer === 'both' || (activeLayer === 'kota' && isKota) || (activeLayer === 'kab' && !isKota);

  // --- Render ---
  return (
    <div style={{ position: "relative", userSelect: "none" }}>

      {/* ── Toolbar ── */}
      <div style={{ display: "flex", gap: 6, marginBottom: 8, alignItems: "center", flexWrap: "wrap" }}>

        {/* Zoom group */}
        <div style={{ display: "flex", border: "1px solid var(--line)", borderRadius: 8, overflow: "hidden" }}>
          <button onClick={zoomIn}  style={MAP_BTN_BASE} title="Zoom In">＋</button>
          <div style={{ padding: "5px 8px", fontSize: 11, fontFamily: "monospace",
                        borderLeft: "1px solid var(--line)", borderRight: "1px solid var(--line)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        minWidth: 50, color: "var(--ink-soft)", background: "var(--bg)" }}>
            {Math.round(zoomLevel * 100)}%
          </div>
          <button onClick={zoomOut} style={MAP_BTN_BASE} title="Zoom Out">－</button>
        </div>

        <button onClick={resetView} style={{ ...MAP_BTN_BASE, border: "1px solid var(--line)", borderRadius: 8 }}
                title="Reset tampilan">
          ⊙ Reset
        </button>

        {/* Layer toggle */}
        <div style={{ display: "flex", border: "1px solid var(--line)", borderRadius: 8, overflow: "hidden" }}>
          {[['both','Semua'],['kota','Kota'],['kab','Kab']].map(([v, l], i) => (
            <button key={v} onClick={() => setActiveLayer(v)}
                     style={{ ...MAP_BTN_BASE,
                              background: activeLayer === v ? "var(--blue-700)" : "white",
                              color:      activeLayer === v ? "white" : "var(--ink)",
                              borderLeft: i > 0 ? "1px solid var(--line)" : "none" }}>
              {l}
            </button>
          ))}
        </div>

        {/* Badge toggle */}
        <button onClick={() => setShowBadges(b => !b)}
                 style={{ ...MAP_BTN_BASE, border: "1px solid var(--line)", borderRadius: 8,
                          background: showBadges ? "var(--blue-50)" : "white",
                          color: showBadges ? "var(--blue-700)" : "var(--muted)" }}>
          ◉ Badge
        </button>

        {/* Label toggle */}
        <button onClick={() => setShowLabels(b => !b)}
                 style={{ ...MAP_BTN_BASE, border: "1px solid var(--line)", borderRadius: 8,
                          background: showLabels ? "var(--blue-50)" : "white",
                          color: showLabels ? "var(--blue-700)" : "var(--muted)" }}>
          𝐓 Label
        </button>

        {selected && (
          <button onClick={resetView}
                   style={{ ...MAP_BTN_BASE, border: "1px solid var(--line)", borderRadius: 8,
                            color: "var(--muted)", marginLeft: "auto" }}>
            ✕ Hapus Seleksi
          </button>
        )}
      </div>

      {/* ── Map + Side Panel ── */}
      <div style={{ display: "flex", gap: 10, alignItems: "stretch" }}>

        {/* SVG Map */}
        <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
          <svg ref={svgRef}
               viewBox={`${vb.x.toFixed(1)} ${vb.y.toFixed(1)} ${vb.w.toFixed(1)} ${vb.h.toFixed(1)}`}
               preserveAspectRatio="xMidYMid meet"
               style={{ width: "100%", height: "auto", display: "block", borderRadius: 10,
                        background: "oklch(0.95 0.025 240)", border: "1px solid var(--line)",
                        cursor: "grab", touchAction: "none" }}
               onMouseDown={onSVGMouseDown}
               onMouseMove={onSVGMouseMove}
               onMouseUp={onSVGMouseUp}
               onMouseLeave={() => { onSVGMouseUp(); setTooltip(null); setHovering(null); }}>

            {/* Kab Kediri (back layer) */}
            {kabFeatures.map((f, i) => {
              if (!layerVisible(false)) return null;
              const count = getCount(f.properties.district);
              const isSel = selected && selected.name === f.properties.district;
              const isHov = hovering === f.properties.district;
              return (
                <path key={'kab-' + i} d={featureToD(f.geometry)}
                      fill={isSel ? "oklch(0.60 0.22 82)" : kabColor(count / maxCount)}
                      stroke={isSel ? "oklch(0.50 0.20 70)" : isHov ? "oklch(0.65 0.18 82)" : "white"}
                      strokeWidth={isSel ? strokeKab * 2.5 : strokeKab}
                      strokeLinejoin="round"
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHovering(f.properties.district)}
                      onMouseLeave={() => { setHovering(null); setTooltip(null); }}
                      onMouseMove={e => onFeatureMouseMove(e, f.properties.district, count, 'kab')}
                      onClick={e => onFeatureClick(e, f, count, 'kab')} />
              );
            })}

            {/* Kota Kediri (front layer) */}
            {kotaFeatures.map((f, i) => {
              if (!layerVisible(true)) return null;
              const count = getCount(f.properties.district);
              const isSel = selected && selected.name === f.properties.district;
              const isHov = hovering === f.properties.district;
              return (
                <path key={'kota-' + i} d={featureToD(f.geometry)}
                      fill={isSel ? "oklch(0.40 0.24 252)" : kotaColor(count / maxCount)}
                      stroke={isSel ? "oklch(0.68 0.14 252)" : isHov ? "oklch(0.60 0.20 252)" : "white"}
                      strokeWidth={isSel ? strokeKota * 2.5 : strokeKota}
                      strokeLinejoin="round"
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHovering(f.properties.district)}
                      onMouseLeave={() => { setHovering(null); setTooltip(null); }}
                      onMouseMove={e => onFeatureMouseMove(e, f.properties.district, count, 'kota')}
                      onClick={e => onFeatureClick(e, f, count, 'kota')} />
              );
            })}

            {/* Kecamatan name labels */}
            {showLabels && allFeatures.map((f, i) => {
              const isKota = f.properties.regency === 'Kota Kediri';
              if (!layerVisible(isKota)) return null;
              // Only show labels for top kecamatan and all kota
              const rank = sortedAll.findIndex(x => x.name === f.properties.district);
              if (!isKota && rank >= 15) return null;
              const [cx, cy] = getCentroid(f.geometry);
              const shortName = f.properties.district.replace('Kota Kediri', 'Kota').trim();
              return (
                <text key={'lbl-' + i} x={cx} y={cy - badgeR - labelSz * 0.4}
                      textAnchor="middle" dominantBaseline="auto"
                      fontSize={isKota ? labelSz * 1.1 : labelSz} fontWeight={isKota ? 800 : 600}
                      fill={isKota ? "white" : "oklch(0.25 0.04 252)"}
                      style={{ pointerEvents: "none", fontFamily: "sans-serif",
                               filter: isKota
                                 ? "drop-shadow(0 0 2px rgba(0,0,0,0.6))"
                                 : "drop-shadow(0 0 2px rgba(255,255,255,1))" }}>
                  {shortName}
                </text>
              );
            })}

            {/* Counter badges — constant apparent size via sz scaling */}
            {showBadges && allFeatures.map((f, i) => {
              const isKota = f.properties.regency === 'Kota Kediri';
              if (!layerVisible(isKota)) return null;
              const count = getCount(f.properties.district);
              const [cx, cy] = getCentroid(f.geometry);
              const r = badgeR;
              const label = count >= 1000 ? (count/1000).toFixed(1)+'k' : String(count);
              const fs = r * (label.length > 3 ? 0.65 : label.length > 2 ? 0.75 : 0.85);
              const isSel = selected && selected.name === f.properties.district;
              const bg = isSel
                ? "oklch(0.30 0.05 252)"
                : isKota ? "var(--blue-700)" : "oklch(0.55 0.17 70)";
              return (
                <g key={'badge-' + i} style={{ pointerEvents: "none" }}>
                  {/* Outer ring */}
                  <circle cx={cx} cy={cy} r={r + r*0.25} fill="white" opacity={0.75} />
                  {/* Colored fill */}
                  <circle cx={cx} cy={cy} r={r} fill={bg} />
                  {/* Inner highlight arc (top-left) */}
                  <circle cx={cx - r*0.15} cy={cy - r*0.15} r={r * 0.55}
                          fill="rgba(255,255,255,0.15)" />
                  {/* Count text */}
                  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
                        fontSize={fs} fontWeight={800} fill="white"
                        style={{ fontFamily: "monospace", letterSpacing: "-0.02em" }}>
                    {label}
                  </text>
                </g>
              );
            })}

            {/* Mini compass rose */}
            <g style={{ pointerEvents: "none" }} opacity={0.5}>
              <text x={GEO_W - 18} y={GEO_H - 14} textAnchor="middle" fontSize={8 * sz}
                    fill="var(--ink-soft)" style={{ fontFamily: "sans-serif" }}>N</text>
              <line x1={GEO_W - 18} y1={GEO_H - 24} x2={GEO_W - 18} y2={GEO_H - 28}
                    stroke="var(--ink-soft)" strokeWidth={sz} />
            </g>
          </svg>

          {/* Hover tooltip */}
          {tooltip && (
            <div style={{ position: "absolute", left: tooltip.x + 14, top: tooltip.y - 42,
                          background: "var(--ink)", color: "white", padding: "8px 12px",
                          borderRadius: 10, fontSize: 12, pointerEvents: "none", zIndex: 20,
                          boxShadow: "0 6px 24px rgba(0,0,0,0.3)", whiteSpace: "nowrap" }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{tooltip.name}</div>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, marginTop: 2 }}>
                {tooltip.type === 'kota' ? 'Kota Kediri' : 'Kab. Kediri'}
              </div>
              <div style={{ marginTop: 6, display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 20, fontWeight: 700 }}>{tooltip.count}</span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>alumni</span>
              </div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
                Klik untuk zoom & detail
              </div>
            </div>
          )}

          {/* Zoom hint overlay (top-left corner) */}
          <div style={{ position: "absolute", top: 8, left: 8, fontSize: 10,
                        color: "rgba(0,0,0,0.35)", pointerEvents: "none",
                        background: "rgba(255,255,255,0.7)", padding: "3px 7px",
                        borderRadius: 6, backdropFilter: "blur(4px)" }}>
            Scroll = zoom · Drag = geser
          </div>
        </div>

        {/* ── Side Panel ── */}
        <div style={{ width: 175, flexShrink: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {selected ? (
            <>
              {/* Selected detail card */}
              <div className="card" style={{ padding: 14 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.07em",
                               textTransform: "uppercase", marginBottom: 6,
                               color: selected.type === 'kota' ? "var(--blue-700)" : "oklch(0.55 0.17 70)" }}>
                  {selected.type === 'kota' ? '■ Kota Kediri' : '■ Kab. Kediri'}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)", lineHeight: 1.2, marginBottom: 12 }}>
                  {selected.name}
                </div>

                {/* Big count */}
                <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1,
                               fontFamily: "var(--font-display)",
                               color: selected.type === 'kota' ? "var(--blue-700)" : "oklch(0.55 0.17 70)" }}>
                  {selected.count}
                </div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>alumni terdaftar</div>

                {/* Rank & porsi */}
                {(() => {
                  const rank = sortedAll.findIndex(x => x.name === selected.name) + 1;
                  const pct = totalCount > 0 ? (selected.count / totalCount * 100).toFixed(1) : 0;
                  return (
                    <>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 12 }}>
                        <div style={{ padding: "7px 8px", background: "var(--bg)", borderRadius: 8, textAlign: "center" }}>
                          <div style={{ fontSize: 9, color: "var(--muted)", marginBottom: 2 }}>Peringkat</div>
                          <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1 }}>#{rank}</div>
                          <div style={{ fontSize: 9, color: "var(--muted)", marginTop: 1 }}>dari {allFeatures.length}</div>
                        </div>
                        <div style={{ padding: "7px 8px", background: "var(--bg)", borderRadius: 8, textAlign: "center" }}>
                          <div style={{ fontSize: 9, color: "var(--muted)", marginBottom: 2 }}>Porsi</div>
                          <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1 }}>{pct}%</div>
                          <div style={{ fontSize: 9, color: "var(--muted)", marginTop: 1 }}>dari total</div>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div style={{ height: 5, background: "var(--line-soft)", borderRadius: 99, marginTop: 10 }}>
                        <div style={{ width: `${pct}%`, height: "100%", borderRadius: 99,
                                       background: selected.type === 'kota' ? "var(--blue-700)" : "oklch(0.65 0.17 82)" }} />
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Top 6 list */}
              <div className="card" style={{ padding: 12, flex: 1 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.07em",
                               textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 8 }}>
                  Peringkat Teratas
                </div>
                {sortedAll.slice(0, 6).map((item, i) => {
                  const isThis = item.name === selected.name;
                  return (
                    <div key={item.name}
                         style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5,
                                  padding: "3px 6px", borderRadius: 6, fontSize: 11,
                                  background: isThis ? "var(--blue-50)" : "transparent" }}>
                      <span style={{ fontSize: 9, color: "var(--muted)", fontFamily: "monospace", minWidth: 14 }}>
                        {i + 1}.
                      </span>
                      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                      fontWeight: isThis ? 700 : 500,
                                      color: isThis ? "var(--blue-700)" : "var(--ink)" }}>
                        {item.name}
                      </span>
                      <span style={{ fontFamily: "monospace", fontSize: 10, color: "var(--ink-soft)", flexShrink: 0 }}>
                        {item.count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              {/* Summary stats */}
              <div className="card" style={{ padding: 14 }}>
                <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted)" }}>
                  Total Alumni
                </div>
                <div style={{ fontSize: 34, fontWeight: 700, color: "var(--blue-700)",
                               fontFamily: "var(--font-display)", lineHeight: 1.1, marginTop: 4 }}>
                  {totalCount.toLocaleString('id-ID')}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div className="card" style={{ padding: 12 }}>
                  <div style={{ fontSize: 9, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Kota</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: "var(--blue-700)",
                                 fontFamily: "var(--font-display)", lineHeight: 1.1, marginTop: 3 }}>
                    {totalKota}
                  </div>
                  <div style={{ fontSize: 9, color: "var(--muted)", marginTop: 2 }}>3 kec.</div>
                </div>
                <div className="card" style={{ padding: 12 }}>
                  <div style={{ fontSize: 9, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Kab.</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: "oklch(0.55 0.17 70)",
                                 fontFamily: "var(--font-display)", lineHeight: 1.1, marginTop: 3 }}>
                    {totalKab}
                  </div>
                  <div style={{ fontSize: 9, color: "var(--muted)", marginTop: 2 }}>26 kec.</div>
                </div>
              </div>

              {/* Controls hint */}
              <div style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid var(--line)",
                             background: "var(--bg)", fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.8 }}>
                <div style={{ fontWeight: 700, color: "var(--ink)", marginBottom: 4, fontSize: 11 }}>Kontrol Peta</div>
                <div>🖱 Scroll → Zoom in/out</div>
                <div>✋ Drag → Geser peta</div>
                <div>👆 Klik → Detail & zoom</div>
              </div>

              {/* Top 5 preview */}
              <div className="card" style={{ padding: 12, flex: 1 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.07em",
                               textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 8 }}>
                  Top 5 Kecamatan
                </div>
                {sortedAll.slice(0, 5).map((item, i) => (
                  <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, fontSize: 11 }}>
                    <span style={{ fontSize: 9, color: "var(--muted)", fontFamily: "monospace", minWidth: 14 }}>{i+1}.</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: 9, color: "var(--muted)" }}>
                        {item.isKota ? 'Kota' : 'Kab.'} Kediri
                      </div>
                    </div>
                    <span style={{ fontFamily: "monospace", fontSize: 10, fontWeight: 700, color: "var(--ink-soft)", flexShrink: 0 }}>
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Legend ── */}
      <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 11,
                    color: "var(--ink-soft)", justifyContent: "center", flexWrap: "wrap",
                    alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 14, height: 10, borderRadius: 2, background: "oklch(0.55 0.18 252)" }} />
          Kota Kediri
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 14, height: 10, borderRadius: 2, background: "oklch(0.68 0.17 82)" }} />
          Kab. Kediri
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ display: "flex", gap: 2 }}>
            {[0.15, 0.4, 0.65, 0.9].map(t => (
              <div key={t} style={{ width: 10, height: 10, borderRadius: 2, background: `oklch(${(0.88 - t*0.30).toFixed(2)} ${(0.06 + t*0.13).toFixed(2)} 82)` }} />
            ))}
          </div>
          Intensitas = jumlah alumni
        </div>
      </div>
    </div>
  );
}

function FakeMap() { return <KediriGeoMap />; }

Object.assign(window, { AdminDataAlumni, AdminSebaran, KediriGeoMap, FakeMap });
