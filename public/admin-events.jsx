// Admin: Events, Donasi, Verifikasi, Pengaturan

// === Admin Events ===
function AdminEvents() {
  return (
    <div>
      <AdminTopBar
        title="Kegiatan & Agenda"
        subtitle={`${EVENTS.length} kegiatan aktif`}
        actions={
          <>
            <button className="btn btn-ghost btn-sm">📅 Kalender</button>
            <button className="btn btn-primary btn-sm">＋ Kegiatan Baru</button>
          </>
        }
      />
      <div style={{ padding: 32 }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
          <StatCard label="Kegiatan Bulan Ini" value="4" sub="2 mendatang" />
          <StatCard label="Total Pendaftar" value="767" sub="lintas event" accent="var(--gold-500)" />
          <StatCard label="Avg. Kehadiran" value="84%" sub="↑ 12% vs Q3" />
          <StatCard label="Anggaran Terpakai" value="42jt" sub="dari 100jt budget" />
        </div>

        {/* Events list with mgmt */}
        <div className="card">
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--line)",
                         display: "flex", alignItems: "center", gap: 12 }}>
            <h3 className="display" style={{ fontSize: 16, fontWeight: 600, margin: 0, flex: 1 }}>
              Daftar Kegiatan
            </h3>
            <div style={{ display: "flex", gap: 4, padding: 2,
                           background: "var(--bg)", border: "1px solid var(--line)",
                           borderRadius: 8 }}>
              {["Semua","Mendatang","Berlangsung","Selesai"].map((s, i) => (
                <button key={s}
                         style={{ padding: "5px 12px", border: "none",
                                  background: i === 1 ? "white" : "transparent",
                                  borderRadius: 6, fontSize: 12, fontWeight: 600,
                                  color: i === 1 ? "var(--blue-700)" : "var(--ink-soft)",
                                  cursor: "pointer", fontFamily: "inherit" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "var(--bg)", textAlign: "left" }}>
                <th style={th}>Kegiatan</th>
                <th style={th}>Kategori</th>
                <th style={th}>Tanggal</th>
                <th style={th}>Pendaftar</th>
                <th style={th}>Status</th>
                <th style={th}></th>
              </tr>
            </thead>
            <tbody>
              {EVENTS.map(ev => (
                <tr key={ev.id} style={{ borderTop: "1px solid var(--line)" }}>
                  <td style={td}>
                    <div style={{ fontWeight: 600 }}>{ev.judul}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>📍 {ev.lokasi}</div>
                  </td>
                  <td style={td}><span className="pill" style={{ fontSize: 10 }}>{ev.kategori}</span></td>
                  <td style={td}>
                    <div>{tglID(ev.tanggal)}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>{ev.waktu}</div>
                  </td>
                  <td style={td}>
                    <div className="mono" style={{ fontWeight: 600 }}>
                      {ev.peserta}/{ev.kuota}
                    </div>
                    <Progress value={ev.peserta} max={ev.kuota} color="var(--gold-500)" height={4} />
                  </td>
                  <td style={td}>
                    <span className="pill pill-gold" style={{ fontSize: 10 }}>Mendatang</span>
                  </td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <button className="btn btn-ghost btn-sm">✎</button>
                    <button className="btn btn-ghost btn-sm">⋯</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// === Admin Donasi ===
function AdminDonasi() {
  const transaksi = [
    { id: "TRX-2026-04212", nama: "Donatur Anonim", program: "Beasiswa", amount: 250000, when: "3 jam lalu", method: "Transfer", status: "Verified" },
    { id: "TRX-2026-04211", nama: "Ahmad Fauzi R.", program: "Sekretariat", amount: 1000000, when: "5 jam lalu", method: "QRIS", status: "Verified" },
    { id: "TRX-2026-04210", nama: "Lailatul M.", program: "Beasiswa", amount: 100000, when: "1 hari lalu", method: "Transfer", status: "Verified" },
    { id: "TRX-2026-04209", nama: "Donatur Anonim", program: "Kemanusiaan", amount: 50000, when: "1 hari lalu", method: "QRIS", status: "Pending" },
    { id: "TRX-2026-04208", nama: "Reza Maulana P.", program: "Sekretariat", amount: 500000, when: "2 hari lalu", method: "Transfer", status: "Verified" },
    { id: "TRX-2026-04207", nama: "Abdullah Faqih", program: "Sekretariat", amount: 2000000, when: "2 hari lalu", method: "Transfer", status: "Verified" },
  ];

  return (
    <div>
      <AdminTopBar
        title="Donasi & Keuangan"
        subtitle="Transparansi pengelolaan dana alumni"
        actions={
          <>
            <button className="btn btn-ghost btn-sm">📊 Laporan Bulanan</button>
            <button className="btn btn-primary btn-sm">＋ Program Baru</button>
          </>
        }
      />
      <div style={{ padding: 32 }}>
        {/* KPI */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
          <StatCard label="Total Terkumpul" value="Rp 587jt" delta="14%" sub="across 3 programs" accent="var(--gold-500)" />
          <StatCard label="Total Donatur" value="627" sub="142 unique" accent="var(--blue-500)" />
          <StatCard label="Bulan Ini" value="Rp 48jt" sub="↑ vs bulan lalu" />
          <StatCard label="Saldo Kas" value="Rp 124jt" sub="setelah pengeluaran" />
        </div>

        {/* Programs cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 }}>
          {DONASI_PROGRAM.map((p, i) => (
            <div key={i} className="card" style={{ padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10,
                              background: "var(--gold-100)", color: "var(--gold-700)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 18 }}>
                  {["✶","◇","◈"][i]}
                </div>
                <button className="btn btn-ghost btn-sm" style={{ padding: "4px 8px" }}>⋯</button>
              </div>
              <h4 className="display" style={{ fontSize: 17, fontWeight: 600, margin: "16px 0 4px",
                                                letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                {p.judul}
              </h4>
              <div className="display" style={{ fontSize: 24, fontWeight: 500, color: "var(--blue-700)",
                                                  letterSpacing: "-0.02em", marginTop: 8 }}>
                {rupiah(p.terkumpul)}
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>
                dari target {rupiah(p.target)}
              </div>
              <div style={{ marginTop: 12 }}>
                <Progress value={p.terkumpul} max={p.target} color="var(--gold-500)" height={8} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6,
                              fontSize: 11, color: "var(--ink-soft)" }}>
                  <span>{p.donatur} donatur</span>
                  <span>{Math.round((p.terkumpul/p.target)*100)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transactions table + chart */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16 }}>
          <div className="card">
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--line)",
                           display: "flex", alignItems: "center" }}>
              <h3 className="display" style={{ fontSize: 16, fontWeight: 600, margin: 0, flex: 1 }}>
                Transaksi Terbaru
              </h3>
              <button className="btn btn-ghost btn-sm">Lihat semua →</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "var(--bg)", textAlign: "left" }}>
                  <th style={th}>ID</th>
                  <th style={th}>Donatur</th>
                  <th style={th}>Program</th>
                  <th style={th}>Nominal</th>
                  <th style={th}>Method</th>
                  <th style={th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {transaksi.map(t => (
                  <tr key={t.id} style={{ borderTop: "1px solid var(--line)" }}>
                    <td style={{ ...td, fontFamily: "var(--font-mono)", fontSize: 10,
                                  color: "var(--ink-soft)" }}>
                      {t.id}
                    </td>
                    <td style={td}>
                      <div style={{ fontWeight: 500 }}>{t.nama}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>{t.when}</div>
                    </td>
                    <td style={td}>{t.program}</td>
                    <td style={{ ...td, fontFamily: "var(--font-mono)", fontWeight: 600,
                                  color: "var(--blue-700)" }}>
                      {rupiah(t.amount)}
                    </td>
                    <td style={td}>{t.method}</td>
                    <td style={td}>
                      <span className="pill" style={{
                        fontSize: 10,
                        background: t.status === "Verified" ? "oklch(0.95 0.04 145)" : "var(--gold-100)",
                        color: t.status === "Verified" ? "oklch(0.4 0.15 145)" : "var(--gold-700)"
                      }}>
                        {t.status === "Verified" ? "✓" : "◷"} {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <h3 className="display" style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
              Tren Donasi
            </h3>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>
              6 bulan terakhir
            </div>
            <FakeChart />
            <div style={{ paddingTop: 16, borderTop: "1px solid var(--line)", marginTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: "var(--ink-soft)" }}>Avg/bulan</span>
                <span className="mono" style={{ fontWeight: 600 }}>Rp 38jt</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 6 }}>
                <span style={{ color: "var(--ink-soft)" }}>Top donatur</span>
                <span style={{ fontWeight: 600 }}>Hamba Allah (Rp 5jt)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 6 }}>
                <span style={{ color: "var(--ink-soft)" }}>Growth</span>
                <span style={{ fontWeight: 600, color: "oklch(0.55 0.15 145)" }}>↑ 14% MoM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FakeChart() {
  const data = [22, 28, 35, 31, 42, 48];
  const labels = ["Nov","Des","Jan","Feb","Mar","Apr"];
  const max = Math.max(...data);
  return (
    <div style={{ marginTop: 16, height: 160, display: "flex", alignItems: "end", gap: 8,
                  padding: "0 4px 24px", position: "relative" }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, position: "relative" }}>
          <div style={{ height: `${(v/max)*140}px`, background: i === data.length - 1 ? "var(--gold-500)" : "var(--blue-700)",
                         borderRadius: "4px 4px 0 0", position: "relative" }}>
            <div style={{ position: "absolute", top: -20, left: 0, right: 0,
                           textAlign: "center", fontSize: 10, fontWeight: 600,
                           color: "var(--ink)" }}>
              {v}jt
            </div>
          </div>
          <div style={{ position: "absolute", bottom: -20, left: 0, right: 0,
                         textAlign: "center", fontSize: 10, color: "var(--ink-soft)",
                         fontWeight: 600 }}>
            {labels[i]}
          </div>
        </div>
      ))}
    </div>
  );
}

// === Verifikasi ===
function AdminVerifikasi() {
  const pending = [
    { id: "PMII-K-2024-0312", nama: "Ahmad Syafii", angkatan: 2022, kampus: "IAIN Kediri", waktu: "2 jam lalu", reason: "Pendaftaran baru" },
    { id: "PMII-K-2024-0311", nama: "Nur Fadila", angkatan: 2020, kampus: "UNP Kediri", waktu: "5 jam lalu", reason: "Update biodata" },
    { id: "PMII-K-2024-0310", nama: "Bayu Pamungkas", angkatan: 2019, kampus: "Universitas Brawijaya", waktu: "1 hari lalu", reason: "Pendaftaran baru" },
    { id: "PMII-K-2024-0309", nama: "Aulia Rahmah", angkatan: 2021, kampus: "UIN SATU", waktu: "1 hari lalu", reason: "Update pekerjaan" },
  ];
  return (
    <div>
      <AdminTopBar
        title="Antrian Verifikasi"
        subtitle="8 data menunggu review · Verifikasi data baru dan update"
        actions={<button className="btn btn-ghost btn-sm">⚙ Aturan Verifikasi</button>}
      />
      <div style={{ padding: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
          <StatCard label="Pending" value="8" sub="3 prioritas" accent="oklch(0.65 0.15 30)" />
          <StatCard label="Verified Hari Ini" value="14" sub="oleh 2 admin" accent="oklch(0.55 0.15 145)" />
          <StatCard label="Avg Time" value="4.2 jam" sub="waktu verifikasi" />
        </div>
        <div className="card">
          {pending.map((p, i) => (
            <div key={p.id} style={{ padding: 20,
                                       borderTop: i > 0 ? "1px solid var(--line)" : "none",
                                       display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 16,
                                       alignItems: "center" }}>
              <Avatar initials={p.nama.split(" ").map(n=>n[0]).join("").slice(0,2)} size={44} />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{p.nama}</div>
                  <span className="mono" style={{ fontSize: 10, color: "var(--ink-soft)" }}>{p.id}</span>
                  <span className="pill" style={{ fontSize: 10 }}>{p.reason}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4 }}>
                  Angkatan {p.angkatan} · {p.kampus} · diajukan {p.waktu}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-ghost btn-sm">👁 Review</button>
                <button className="btn btn-ghost btn-sm" style={{ color: "oklch(0.55 0.18 25)" }}>
                  ✕ Tolak
                </button>
                <button className="btn btn-primary btn-sm">✓ Verifikasi</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// === Pengaturan ===
function AdminPengaturan() {
  return (
    <div>
      <AdminTopBar title="Pengaturan Sistem" subtitle="Konfigurasi cabang dan akses" />
      <div style={{ padding: 32, display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
        <div className="card" style={{ padding: 20, height: "fit-content" }}>
          {["Profil Organisasi", "Pengguna & Akses", "Privasi Data", "Notifikasi",
             "Backup & Export", "Integrasi", "Audit Log"].map((s, i) => (
            <div key={s} style={{ padding: "10px 12px", borderRadius: 8,
                                    background: i === 0 ? "var(--blue-50)" : "transparent",
                                    color: i === 0 ? "var(--blue-700)" : "var(--ink)",
                                    fontWeight: i === 0 ? 600 : 500, fontSize: 13,
                                    cursor: "pointer", marginBottom: 2 }}>
              {s}
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 28 }}>
          <h3 className="display" style={{ fontSize: 22, fontWeight: 500, margin: 0,
                                            letterSpacing: "-0.02em" }}>
            Profil Organisasi
          </h3>
          <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 4 }}>
            Identitas cabang yang muncul di seluruh sistem
          </div>
          <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="Nama Cabang" placeholder="PMII Cabang Kediri Raya" />
            <Field label="Singkatan" placeholder="PMII-KR" />
            <Field label="Alamat Sekretariat" placeholder="Jl. Veteran No. ..." full />
            <Field label="Email Resmi" placeholder="alumni@pmii-kediri.id" />
            <Field label="No. Telepon" placeholder="0354-xxxxxx" />
            <Field label="Ketua Aktif" placeholder="Dr. H. ..." />
            <Field label="Periode" placeholder="2024 - 2027" />
            <Field label="Logo Cabang" full type="textarea" />
          </div>
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--line)",
                         display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button className="btn btn-ghost btn-sm">Batal</button>
            <button className="btn btn-primary btn-sm">Simpan Perubahan</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AdminEvents, AdminDonasi, AdminVerifikasi, AdminPengaturan, FakeChart });
