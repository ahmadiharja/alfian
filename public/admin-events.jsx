// Admin: Events, Donasi, Verifikasi, Pengaturan

// ============================================================
// === Admin Events ===
// ============================================================
function AdminEvents() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState('');
  const [formOpen, setFormOpen] = React.useState(false);
  const [editEvent, setEditEvent] = React.useState(null);
  const [deleteTarget, setDeleteTarget] = React.useState(null);
  const [deleting, setDeleting] = React.useState(false);

  const fetchEvents = () => {
    setLoading(true);
    const params = filter ? { status: filter } : {};
    KegiatanAPI.list(params)
      .then(res => setEvents(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  React.useEffect(() => { fetchEvents(); }, [filter]);

  async function handleDelete() {
    setDeleting(true);
    try {
      await KegiatanAPI.delete(deleteTarget.id);
      setDeleteTarget(null);
      fetchEvents();
    } catch (e) {
      alert('Gagal menghapus: ' + e.message);
    } finally {
      setDeleting(false);
    }
  }

  const filterTabs = [
    { label: "Semua", value: "" },
    { label: "Mendatang", value: "mendatang" },
    { label: "Berlangsung", value: "berlangsung" },
    { label: "Selesai", value: "selesai" },
  ];

  const statusColor = s => s === "berlangsung" ? "oklch(0.55 0.15 145)" : s === "selesai" ? "var(--ink-soft)" : "var(--gold-700)";
  const statusBg = s => s === "berlangsung" ? "oklch(0.95 0.04 145)" : s === "selesai" ? "var(--bg)" : "var(--gold-100)";

  return (
    <div>
      <AdminTopBar
        title="Kegiatan & Agenda"
        subtitle={`${events.length} kegiatan`}
        actions={
          <>
            <button className="btn btn-primary btn-sm" onClick={() => { setEditEvent(null); setFormOpen(true); }}>
              ＋ Kegiatan Baru
            </button>
          </>
        }
      />
      <div style={{ padding: 32 }}>
        <div className="card">
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--line)",
                         display: "flex", alignItems: "center", gap: 12 }}>
            <h3 className="display" style={{ fontSize: 16, fontWeight: 600, margin: 0, flex: 1 }}>Daftar Kegiatan</h3>
            <div style={{ display: "flex", gap: 4, padding: 2, background: "var(--bg)",
                           border: "1px solid var(--line)", borderRadius: 8 }}>
              {filterTabs.map(t => (
                <button key={t.value} onClick={() => setFilter(t.value)}
                         style={{ padding: "5px 12px", border: "none",
                                  background: filter === t.value ? "white" : "transparent",
                                  borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
                                  fontFamily: "inherit",
                                  color: filter === t.value ? "var(--blue-700)" : "var(--ink-soft)",
                                  boxShadow: filter === t.value ? "var(--shadow-sm)" : "none" }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          {loading ? (
            <div style={{ padding: 40, textAlign: "center", color: "var(--ink-soft)" }}>Memuat...</div>
          ) : events.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center", color: "var(--ink-soft)" }}>
              Belum ada kegiatan. <button className="btn btn-ghost btn-sm" onClick={() => setFormOpen(true)}>Tambah sekarang</button>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "var(--bg)", textAlign: "left" }}>
                  <th style={evTh}>Kegiatan</th>
                  <th style={evTh}>Kategori</th>
                  <th style={evTh}>Tanggal</th>
                  <th style={evTh}>Kuota</th>
                  <th style={evTh}>Status</th>
                  <th style={evTh}></th>
                </tr>
              </thead>
              <tbody>
                {events.map(ev => (
                  <tr key={ev.id} style={{ borderTop: "1px solid var(--line)" }}>
                    <td style={evTd}>
                      <div style={{ fontWeight: 600 }}>{ev.judul}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>📍 {ev.lokasi || "—"}</div>
                    </td>
                    <td style={evTd}>
                      <span className="pill" style={{ fontSize: 10 }}>{ev.kategori || "Umum"}</span>
                    </td>
                    <td style={evTd}>
                      <div>{new Date(ev.tanggal).toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric' })}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>{ev.waktu || "—"}</div>
                    </td>
                    <td style={evTd}>
                      <div className="mono" style={{ fontWeight: 600 }}>
                        {ev._count?.registrasi || 0}{ev.kuota ? ` / ${ev.kuota}` : ""}
                      </div>
                    </td>
                    <td style={evTd}>
                      <span className="pill" style={{ fontSize: 10, background: statusBg(ev.status), color: statusColor(ev.status) }}>
                        {ev.status || "mendatang"}
                      </span>
                    </td>
                    <td style={{ ...evTd, textAlign: "right", whiteSpace: "nowrap" }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => { setEditEvent(ev); setFormOpen(true); }}>✎</button>
                      <button className="btn btn-ghost btn-sm"
                               onClick={() => setDeleteTarget(ev)}
                               style={{ color: "oklch(0.55 0.18 25)" }}>🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {formOpen && (
        <KegiatanModal
          editData={editEvent}
          onClose={() => { setFormOpen(false); setEditEvent(null); }}
          onSuccess={fetchEvents}
        />
      )}
      {deleteTarget && (
        <ConfirmModal
          title="Hapus Kegiatan"
          message={`Hapus kegiatan "${deleteTarget.judul}"? Semua data registrasi peserta akan ikut terhapus.`}
          loading={deleting}
          danger
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

const evTh = { padding: "10px 14px", fontSize: 11, fontWeight: 700, color: "var(--ink-soft)", letterSpacing: "0.04em", textTransform: "uppercase" };
const evTd = { padding: "12px 14px", verticalAlign: "middle" };

// === Kegiatan Modal (Create/Edit) ===
function KegiatanModal({ editData, onClose, onSuccess }) {
  const isEdit = !!editData;
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState('');
  const [fd, setFd] = React.useState({
    judul: '', deskripsi: '', tanggal: '', waktu: '', lokasi: '',
    kategori: '', kuota: '', pemateri: '', status: 'mendatang', anggaran: '',
    ...(editData || {}),
    tanggal: editData?.tanggal ? new Date(editData.tanggal).toISOString().split('T')[0] : '',
    kuota: editData?.kuota ? String(editData.kuota) : '',
    anggaran: editData?.anggaran ? String(editData.anggaran) : '',
  });
  const set = (k, v) => setFd(p => ({ ...p, [k]: v }));

  async function save() {
    if (!fd.judul.trim()) { setError('Judul wajib diisi'); return; }
    if (!fd.tanggal) { setError('Tanggal wajib diisi'); return; }
    setSaving(true); setError('');
    try {
      const payload = { ...fd };
      if (payload.kuota) payload.kuota = parseInt(payload.kuota); else delete payload.kuota;
      if (payload.anggaran) payload.anggaran = parseFloat(payload.anggaran); else delete payload.anggaran;
      if (isEdit) await KegiatanAPI.update(editData.id, payload);
      else await KegiatanAPI.create(payload);
      onSuccess();
      onClose();
    } catch (e) { setError(e.message); }
    finally { setSaving(false); }
  }

  const Row = ({ label, children }) => (
    <div>
      <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {children}
    </div>
  );
  const inp = { width: "100%", padding: "10px 14px", border: "1px solid var(--line)", borderRadius: 8, fontSize: 13, fontFamily: "inherit" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 150,
                  display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
          onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
            style={{ width: "min(680px, 100%)", background: "white", borderRadius: 16,
                      boxShadow: "var(--shadow-lg)", overflow: "hidden", display: "flex", flexDirection: "column",
                      maxHeight: "90vh" }}>
        <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center" }}>
          <h2 className="display" style={{ fontSize: 20, fontWeight: 500, margin: 0, flex: 1 }}>
            {isEdit ? 'Edit Kegiatan' : 'Tambah Kegiatan'}
          </h2>
          <button onClick={onClose} className="btn btn-ghost btn-sm">✕</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {error && <div style={{ gridColumn: "1/-1", padding: "10px 14px", background: "#fef2f2",
                                   border: "1px solid #fecaca", borderRadius: 8, color: "#dc2626", fontSize: 13 }}>{error}</div>}
          <Row label="Judul Kegiatan *"><input style={{ ...inp, gridColumn: "1/-1" }} value={fd.judul} onChange={e => set('judul', e.target.value)} placeholder="Nama kegiatan" /></Row>
          <Row label="Tanggal *"><input style={inp} type="date" value={fd.tanggal} onChange={e => set('tanggal', e.target.value)} /></Row>
          <Row label="Waktu"><input style={inp} value={fd.waktu} onChange={e => set('waktu', e.target.value)} placeholder="08.00 - 12.00 WIB" /></Row>
          <Row label="Lokasi"><input style={inp} value={fd.lokasi} onChange={e => set('lokasi', e.target.value)} placeholder="Nama tempat" /></Row>
          <Row label="Kategori">
            <select style={{ ...inp, ...selectStyle }} value={fd.kategori} onChange={e => set('kategori', e.target.value)}>
              <option value="">Pilih...</option>
              {["Pengajian", "Silaturahmi", "Seminar", "Pelatihan", "Rapat", "Sosial", "Olahraga", "Lainnya"].map(o => <option key={o}>{o}</option>)}
            </select>
          </Row>
          <Row label="Status">
            <select style={{ ...inp, ...selectStyle }} value={fd.status} onChange={e => set('status', e.target.value)}>
              <option value="mendatang">Mendatang</option>
              <option value="berlangsung">Berlangsung</option>
              <option value="selesai">Selesai</option>
              <option value="dibatalkan">Dibatalkan</option>
            </select>
          </Row>
          <Row label="Kuota Peserta"><input style={inp} type="number" value={fd.kuota} onChange={e => set('kuota', e.target.value)} placeholder="Kosongkan = tak terbatas" /></Row>
          <Row label="Pemateri"><input style={inp} value={fd.pemateri} onChange={e => set('pemateri', e.target.value)} placeholder="Nama pemateri" /></Row>
          <Row label="Anggaran (Rp)"><input style={inp} type="number" value={fd.anggaran} onChange={e => set('anggaran', e.target.value)} placeholder="0" /></Row>
          <div style={{ gridColumn: "1/-1" }}>
            <Row label="Deskripsi">
              <textarea style={{ ...inp, resize: "vertical" }} rows={4} value={fd.deskripsi} onChange={e => set('deskripsi', e.target.value)} placeholder="Deskripsi kegiatan..." />
            </Row>
          </div>
        </div>
        <div style={{ padding: "16px 28px", borderTop: "1px solid var(--line)", background: "var(--bg)",
                       display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose} className="btn btn-ghost btn-sm">Batal</button>
          <button onClick={save} className="btn btn-primary btn-sm" disabled={saving}>
            {saving ? 'Menyimpan...' : (isEdit ? '✓ Simpan Perubahan' : '✓ Buat Kegiatan')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// === Admin Donasi ===
// ============================================================
function AdminDonasi() {
  const [programs, setPrograms] = React.useState([]);
  const [transaksi, setTransaksi] = React.useState([]);
  const [summary, setSummary] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [progFormOpen, setProgFormOpen] = React.useState(false);
  const [editProg, setEditProg] = React.useState(null);
  const [deleteProg, setDeleteProg] = React.useState(null);
  const [deleting, setDeleting] = React.useState(false);

  const fetchAll = () => {
    setLoading(true);
    Promise.all([
      DonasiAPI.programs(),
      DonasiAPI.transaksi({ limit: 10 }),
      DonasiAPI.summary(),
    ]).then(([p, t, s]) => {
      setPrograms(p.data || []);
      setTransaksi(t.data || []);
      setSummary(s.data || null);
    }).catch(() => {}).finally(() => setLoading(false));
  };

  React.useEffect(() => { fetchAll(); }, []);

  async function handleDeleteProg() {
    setDeleting(true);
    try { await DonasiAPI.deleteProgram(deleteProg.id); setDeleteProg(null); fetchAll(); }
    catch (e) { alert(e.message); }
    finally { setDeleting(false); }
  }

  async function handleTxStatus(id, status) {
    try { await DonasiAPI.updateStatus(id, status); fetchAll(); }
    catch (e) { alert(e.message); }
  }

  const statusStyle = s => s === 'berhasil'
    ? { background: 'oklch(0.95 0.04 145)', color: 'oklch(0.4 0.15 145)' }
    : s === 'gagal'
    ? { background: '#fef2f2', color: '#dc2626' }
    : { background: 'var(--gold-100)', color: 'var(--gold-700)' };

  return (
    <div>
      <AdminTopBar
        title="Donasi & Keuangan"
        subtitle="Transparansi pengelolaan dana alumni"
        actions={
          <button className="btn btn-primary btn-sm" onClick={() => { setEditProg(null); setProgFormOpen(true); }}>
            ＋ Program Baru
          </button>
        }
      />
      <div style={{ padding: 32 }}>
        {/* KPI */}
        {summary && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
            <StatCard label="Total Terkumpul" value={rupiah(summary.totalTerkumpul || 0)} accent="var(--gold-500)" />
            <StatCard label="Total Donatur" value={summary.totalDonatur || 0} />
            <StatCard label="Program Aktif" value={summary.programAktif || 0} />
            <StatCard label="Transaksi Pending" value={summary.transaksiPending || 0} accent="oklch(0.65 0.15 30)" />
          </div>
        )}

        {/* Programs */}
        <h3 className="display" style={{ fontSize: 18, fontWeight: 600, margin: "0 0 12px" }}>Program Donasi</h3>
        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: "var(--ink-soft)" }}>Memuat...</div>
        ) : programs.length === 0 ? (
          <div className="card" style={{ padding: 40, textAlign: "center", color: "var(--ink-soft)" }}>
            Belum ada program donasi.
            <button className="btn btn-ghost btn-sm" onClick={() => setProgFormOpen(true)} style={{ marginLeft: 8 }}>Buat sekarang</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 24 }}>
            {programs.map((p, i) => (
              <div key={p.id} className="card" style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--gold-100)",
                                color: "var(--gold-700)", display: "flex", alignItems: "center",
                                justifyContent: "center", fontSize: 18 }}>
                    {["✶", "◇", "◈", "✦"][i % 4]}
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => { setEditProg(p); setProgFormOpen(true); }}
                             style={{ padding: "4px 8px" }}>✎</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setDeleteProg(p)}
                             style={{ padding: "4px 8px", color: "oklch(0.55 0.18 25)" }}>🗑</button>
                  </div>
                </div>
                <h4 className="display" style={{ fontSize: 17, fontWeight: 600, margin: "16px 0 4px", letterSpacing: "-0.01em" }}>
                  {p.judul}
                </h4>
                {p.deskripsi && <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 8 }}>{p.deskripsi}</div>}
                <div className="display" style={{ fontSize: 24, fontWeight: 500, color: "var(--blue-700)", letterSpacing: "-0.02em", marginTop: 8 }}>
                  {rupiah(p.terkumpul)}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>dari target {rupiah(p.target)}</div>
                <div style={{ marginTop: 12 }}>
                  <Progress value={p.terkumpul} max={p.target} color="var(--gold-500)" height={8} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: "var(--ink-soft)" }}>
                    <span>{p._count?.transaksi || 0} transaksi</span>
                    <span>{Math.round((p.terkumpul / p.target) * 100)}%</span>
                  </div>
                </div>
                <span className="pill" style={{ fontSize: 10, marginTop: 10, display: "inline-block",
                                                background: p.status === 'aktif' ? 'oklch(0.95 0.04 145)' : 'var(--bg)',
                                                color: p.status === 'aktif' ? 'oklch(0.4 0.15 145)' : 'var(--ink-soft)' }}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Transactions */}
        <h3 className="display" style={{ fontSize: 18, fontWeight: 600, margin: "0 0 12px" }}>Transaksi Terbaru</h3>
        <div className="card">
          {transaksi.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center", color: "var(--ink-soft)" }}>Belum ada transaksi</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "var(--bg)", textAlign: "left" }}>
                  <th style={evTh}>Donatur</th>
                  <th style={evTh}>Program</th>
                  <th style={evTh}>Nominal</th>
                  <th style={evTh}>Metode</th>
                  <th style={evTh}>Waktu</th>
                  <th style={evTh}>Status</th>
                  <th style={evTh}></th>
                </tr>
              </thead>
              <tbody>
                {transaksi.map(t => (
                  <tr key={t.id} style={{ borderTop: "1px solid var(--line)" }}>
                    <td style={evTd}>
                      <div style={{ fontWeight: 500 }}>{t.namaDonatur || t.alumni?.namaLengkap || "Anonim"}</div>
                    </td>
                    <td style={evTd}>{t.program?.judul || "—"}</td>
                    <td style={{ ...evTd, fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--blue-700)" }}>
                      {rupiah(t.nominal)}
                    </td>
                    <td style={evTd}>{t.metode || "—"}</td>
                    <td style={{ ...evTd, fontSize: 11, color: "var(--ink-soft)" }}>
                      {new Date(t.createdAt).toLocaleDateString('id-ID', { day:'numeric', month:'short' })}
                    </td>
                    <td style={evTd}>
                      <span className="pill" style={{ fontSize: 10, ...statusStyle(t.status) }}>
                        {t.status}
                      </span>
                    </td>
                    <td style={{ ...evTd, whiteSpace: "nowrap" }}>
                      {t.status === 'pending' && (
                        <>
                          <button className="btn btn-ghost btn-sm" style={{ fontSize: 11, color: "oklch(0.4 0.15 145)" }}
                                   onClick={() => handleTxStatus(t.id, 'berhasil')}>✓ Konfirmasi</button>
                          <button className="btn btn-ghost btn-sm" style={{ fontSize: 11, color: "#dc2626" }}
                                   onClick={() => handleTxStatus(t.id, 'gagal')}>✕ Tolak</button>
                        </>
                      )}
                      {t.status === 'berhasil' && (
                        <button className="btn btn-ghost btn-sm" style={{ fontSize: 11, color: "var(--ink-soft)" }}
                                 onClick={() => handleTxStatus(t.id, 'pending')}>↩ Reset</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {progFormOpen && (
        <ProgramModal editData={editProg} onClose={() => { setProgFormOpen(false); setEditProg(null); }} onSuccess={fetchAll} />
      )}
      {deleteProg && (
        <ConfirmModal title="Hapus Program Donasi"
                       message={`Hapus program "${deleteProg.judul}"? Semua transaksi terkait akan ikut terhapus.`}
                       loading={deleting} danger onCancel={() => setDeleteProg(null)} onConfirm={handleDeleteProg} />
      )}
    </div>
  );
}

function FakeChart() {
  const data = [22, 28, 35, 31, 42, 48];
  const labels = ["Nov", "Des", "Jan", "Feb", "Mar", "Apr"];
  const max = Math.max(...data);
  return (
    <div style={{ marginTop: 16, height: 160, display: "flex", alignItems: "end", gap: 8, padding: "0 4px 24px", position: "relative" }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, position: "relative" }}>
          <div style={{ height: `${(v / max) * 140}px`, background: i === data.length - 1 ? "var(--gold-500)" : "var(--blue-700)", borderRadius: "4px 4px 0 0" }}>
            <div style={{ position: "absolute", top: -20, left: 0, right: 0, textAlign: "center", fontSize: 10, fontWeight: 600 }}>{v}jt</div>
          </div>
          <div style={{ position: "absolute", bottom: -20, left: 0, right: 0, textAlign: "center", fontSize: 10, color: "var(--ink-soft)", fontWeight: 600 }}>{labels[i]}</div>
        </div>
      ))}
    </div>
  );
}

// === Program Donasi Modal ===
function ProgramModal({ editData, onClose, onSuccess }) {
  const isEdit = !!editData;
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState('');
  const [fd, setFd] = React.useState({
    judul: '', deskripsi: '', target: '', deadline: '', status: 'aktif', icon: '',
    ...(editData || {}),
    target: editData?.target ? String(editData.target) : '',
    deadline: editData?.deadline ? new Date(editData.deadline).toISOString().split('T')[0] : '',
  });
  const set = (k, v) => setFd(p => ({ ...p, [k]: v }));

  async function save() {
    if (!fd.judul.trim()) { setError('Judul wajib diisi'); return; }
    if (!fd.target) { setError('Target donasi wajib diisi'); return; }
    setSaving(true); setError('');
    try {
      const payload = { ...fd, target: parseFloat(fd.target) };
      if (!payload.deadline) delete payload.deadline;
      if (isEdit) await DonasiAPI.updateProgram(editData.id, payload);
      else await DonasiAPI.createProgram(payload);
      onSuccess(); onClose();
    } catch (e) { setError(e.message); }
    finally { setSaving(false); }
  }

  const inp = { width: "100%", padding: "10px 14px", border: "1px solid var(--line)", borderRadius: 8, fontSize: 13, fontFamily: "inherit" };
  const Row = ({ label, children }) => (
    <div>
      <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {children}
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 150,
                  display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
          onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
            style={{ width: "min(560px, 100%)", background: "white", borderRadius: 16,
                      boxShadow: "var(--shadow-lg)", overflow: "hidden" }}>
        <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center" }}>
          <h2 className="display" style={{ fontSize: 20, fontWeight: 500, margin: 0, flex: 1 }}>
            {isEdit ? 'Edit Program' : 'Program Donasi Baru'}
          </h2>
          <button onClick={onClose} className="btn btn-ghost btn-sm">✕</button>
        </div>
        <div style={{ padding: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {error && <div style={{ gridColumn: "1/-1", padding: "10px 14px", background: "#fef2f2",
                                   border: "1px solid #fecaca", borderRadius: 8, color: "#dc2626", fontSize: 13 }}>{error}</div>}
          <Row label="Judul Program *"><input style={inp} value={fd.judul} onChange={e => set('judul', e.target.value)} /></Row>
          <Row label="Target (Rp) *"><input style={inp} type="number" value={fd.target} onChange={e => set('target', e.target.value)} placeholder="0" /></Row>
          <Row label="Deadline">
            <input style={inp} type="date" value={fd.deadline} onChange={e => set('deadline', e.target.value)} />
          </Row>
          <Row label="Status">
            <select style={{ ...inp, ...selectStyle }} value={fd.status} onChange={e => set('status', e.target.value)}>
              <option value="aktif">Aktif</option>
              <option value="selesai">Selesai</option>
              <option value="ditutup">Ditutup</option>
            </select>
          </Row>
          <div style={{ gridColumn: "1/-1" }}>
            <Row label="Deskripsi">
              <textarea style={{ ...inp, resize: "vertical" }} rows={3} value={fd.deskripsi} onChange={e => set('deskripsi', e.target.value)} placeholder="Keterangan program donasi" />
            </Row>
          </div>
        </div>
        <div style={{ padding: "16px 28px", borderTop: "1px solid var(--line)", background: "var(--bg)",
                       display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose} className="btn btn-ghost btn-sm">Batal</button>
          <button onClick={save} className="btn btn-primary btn-sm" disabled={saving}>
            {saving ? 'Menyimpan...' : (isEdit ? '✓ Simpan' : '✓ Buat Program')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// === Admin Verifikasi ===
// ============================================================
function AdminVerifikasi() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [actionLoading, setActionLoading] = React.useState({});
  const [rejectModal, setRejectModal] = React.useState(null);
  const [alasan, setAlasan] = React.useState('');

  const fetchData = () => {
    setLoading(true);
    VerifikasiAPI.list()
      .then(res => setData(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  React.useEffect(() => { fetchData(); }, []);

  async function approve(id) {
    setActionLoading(p => ({ ...p, [id + '_approve']: true }));
    try { await VerifikasiAPI.approve(id); fetchData(); }
    catch (e) { alert(e.message); }
    finally { setActionLoading(p => ({ ...p, [id + '_approve']: false })); }
  }

  async function reject() {
    const id = rejectModal.id;
    setActionLoading(p => ({ ...p, [id + '_reject']: true }));
    try { await VerifikasiAPI.reject(id, alasan); setRejectModal(null); setAlasan(''); fetchData(); }
    catch (e) { alert(e.message); }
    finally { setActionLoading(p => ({ ...p, [id + '_reject']: false })); }
  }

  const pending = data.filter(a => a.statusVerifikasi === 'pending');
  const others = data.filter(a => a.statusVerifikasi !== 'pending');

  return (
    <div>
      <AdminTopBar
        title="Antrian Verifikasi"
        subtitle={`${pending.length} data menunggu review`}
      />
      <div style={{ padding: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
          <StatCard label="Pending" value={pending.length} sub="menunggu review" accent="oklch(0.65 0.15 30)" />
          <StatCard label="Total Alumni" value={data.length} sub="di daftar" />
          <StatCard label="Terverifikasi" value={data.filter(a => a.statusVerifikasi === 'verified').length} sub="sudah aktif" accent="oklch(0.55 0.15 145)" />
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: "var(--ink-soft)" }}>Memuat...</div>
        ) : pending.length === 0 ? (
          <div className="card" style={{ padding: 40, textAlign: "center", color: "var(--ink-soft)" }}>
            ✓ Tidak ada data yang menunggu verifikasi
          </div>
        ) : (
          <div className="card">
            {pending.map((a, i) => {
              const nama = a.namaLengkap || '?';
              const initials = nama.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
              return (
                <div key={a.id} style={{ padding: 20, borderTop: i > 0 ? "1px solid var(--line)" : "none",
                                           display: "grid", gridTemplateColumns: "auto 1fr auto",
                                           gap: 16, alignItems: "center" }}>
                  <Avatar initials={initials} size={44} />
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{nama}</div>
                      <span className="mono" style={{ fontSize: 10, color: "var(--ink-soft)" }}>{a.nia}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4 }}>
                      Angkatan {a.angkatan || "—"} · {a.kampus || "—"}
                      {a.createdAt && ` · Didaftar ${new Date(a.createdAt).toLocaleDateString('id-ID')}`}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-ghost btn-sm"
                             style={{ color: "oklch(0.55 0.18 25)" }}
                             onClick={() => setRejectModal(a)}
                             disabled={actionLoading[a.id + '_reject']}>
                      ✕ Tolak
                    </button>
                    <button className="btn btn-primary btn-sm"
                             onClick={() => approve(a.id)}
                             disabled={actionLoading[a.id + '_approve']}>
                      {actionLoading[a.id + '_approve'] ? '...' : '✓ Verifikasi'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {others.length > 0 && (
          <>
            <h3 className="display" style={{ fontSize: 16, fontWeight: 600, margin: "24px 0 12px" }}>Sudah Diproses</h3>
            <div className="card">
              {others.slice(0, 20).map((a, i) => {
                const nama = a.namaLengkap || '?';
                const initials = nama.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
                return (
                  <div key={a.id} style={{ padding: "14px 20px", borderTop: i > 0 ? "1px solid var(--line)" : "none",
                                             display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar initials={initials} size={36} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500 }}>{nama}</div>
                      <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{a.nia} · {a.kampus || "—"}</div>
                    </div>
                    <span className="pill" style={{
                      fontSize: 10,
                      background: a.statusVerifikasi === 'verified' ? 'oklch(0.95 0.04 145)' : '#fef2f2',
                      color: a.statusVerifikasi === 'verified' ? 'oklch(0.4 0.15 145)' : '#dc2626',
                    }}>
                      {a.statusVerifikasi === 'verified' ? '✓ Verified' : '✕ Ditolak'}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {rejectModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200,
                      display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div className="card" style={{ width: "min(420px, 100%)", padding: 28 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Tolak Pendaftaran</h3>
            <p style={{ margin: "8px 0 16px", color: "var(--ink-soft)", fontSize: 14 }}>
              Tolak pendaftaran <strong>{rejectModal.namaLengkap}</strong>?
            </p>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Alasan penolakan</div>
              <textarea value={alasan} onChange={e => setAlasan(e.target.value)} rows={3}
                         placeholder="Tulis alasan penolakan (opsional)..."
                         style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--line)",
                                   borderRadius: 8, fontSize: 13, fontFamily: "inherit", resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={() => { setRejectModal(null); setAlasan(''); }} className="btn btn-ghost btn-sm">Batal</button>
              <button onClick={reject} style={{ padding: "8px 16px", border: "none", borderRadius: 8,
                                                cursor: "pointer", fontFamily: "inherit", fontSize: 13,
                                                fontWeight: 600, background: "oklch(0.55 0.2 25)", color: "white" }}>
                Tolak Pendaftaran
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// === Admin Pengaturan ===
// ============================================================
function AdminPengaturan() {
  const [section, setSection] = React.useState('profil');
  const [fd, setFd] = React.useState({
    namaCabang: '', singkatan: '', alamatSekretariat: '',
    emailResmi: '', noTelepon: '', ketuaAktif: '', periode: '', logo: '',
  });
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    PengaturanAPI.get()
      .then(res => { if (res.data) setFd(f => ({ ...f, ...res.data })); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (k, v) => setFd(p => ({ ...p, [k]: v }));

  async function save() {
    setSaving(true); setError(''); setSaved(false);
    try {
      await PengaturanAPI.update(fd);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  const inp = { width: "100%", padding: "10px 14px", border: "1px solid var(--line)", borderRadius: 8, fontSize: 13, fontFamily: "inherit" };
  const Row = ({ label, name, type = "text", full }) => (
    <div style={{ gridColumn: full ? "1/-1" : undefined }}>
      <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {type === "textarea" ? (
        <textarea value={fd[name] || ''} onChange={e => set(name, e.target.value)} rows={3}
                   style={{ ...inp, resize: "vertical" }} />
      ) : (
        <input type={type} value={fd[name] || ''} onChange={e => set(name, e.target.value)} style={inp} />
      )}
    </div>
  );

  const menuItems = [
    { key: 'profil', label: 'Profil Organisasi' },
    { key: 'akses', label: 'Pengguna & Akses' },
  ];

  return (
    <div>
      <AdminTopBar title="Pengaturan Sistem" subtitle="Konfigurasi cabang dan akses" />
      <div style={{ padding: 32, display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
        <div className="card" style={{ padding: 20, height: "fit-content" }}>
          {menuItems.map(m => (
            <div key={m.key} onClick={() => setSection(m.key)}
                  style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", marginBottom: 2,
                             background: section === m.key ? "var(--blue-50)" : "transparent",
                             color: section === m.key ? "var(--blue-700)" : "var(--ink)",
                             fontWeight: section === m.key ? 600 : 500, fontSize: 13 }}>
              {m.label}
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 28 }}>
          {section === 'profil' && (
            <>
              <h3 className="display" style={{ fontSize: 22, fontWeight: 500, margin: "0 0 4px", letterSpacing: "-0.02em" }}>
                Profil Organisasi
              </h3>
              <div style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 24 }}>
                Identitas cabang yang muncul di seluruh sistem
              </div>
              {loading ? (
                <div style={{ padding: 40, textAlign: "center", color: "var(--ink-soft)" }}>Memuat...</div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {error && (
                    <div style={{ gridColumn: "1/-1", padding: "10px 14px", background: "#fef2f2",
                                   border: "1px solid #fecaca", borderRadius: 8, color: "#dc2626", fontSize: 13 }}>
                      {error}
                    </div>
                  )}
                  {saved && (
                    <div style={{ gridColumn: "1/-1", padding: "10px 14px", background: "oklch(0.95 0.04 145)",
                                   border: "1px solid oklch(0.7 0.1 145)", borderRadius: 8,
                                   color: "oklch(0.4 0.15 145)", fontSize: 13 }}>
                      ✓ Perubahan berhasil disimpan
                    </div>
                  )}
                  <Row label="Nama Cabang" name="namaCabang" />
                  <Row label="Singkatan" name="singkatan" />
                  <Row label="Alamat Sekretariat" name="alamatSekretariat" full />
                  <Row label="Email Resmi" name="emailResmi" type="email" />
                  <Row label="No. Telepon" name="noTelepon" />
                  <Row label="Ketua Aktif" name="ketuaAktif" />
                  <Row label="Periode" name="periode" />
                  <Row label="URL Logo" name="logo" full />
                </div>
              )}
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--line)",
                             display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <button className="btn btn-ghost btn-sm" onClick={() => PengaturanAPI.get().then(r => r.data && setFd(f => ({ ...f, ...r.data }))).catch(() => {})}>
                  ↺ Reset
                </button>
                <button className="btn btn-primary btn-sm" onClick={save} disabled={saving}>
                  {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </>
          )}
          {section === 'akses' && (
            <div style={{ textAlign: "center", padding: 40, color: "var(--ink-soft)" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔐</div>
              <div>Manajemen pengguna & akses belum tersedia</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AdminEvents, AdminDonasi, AdminVerifikasi, AdminPengaturan, FakeChart, KegiatanModal, ProgramModal });
