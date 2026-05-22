// Admin Dashboard for PMII Kediri Alumni App

// === Admin Sidebar ===
function AdminSidebar({ page, setPage, onLogout }) {
  const sections = [
    {
      title: "Utama",
      items: [
        { key: "dashboard", label: "Dashboard", icon: "▦" },
        { key: "data-alumni", label: "Data Alumni", icon: "◉" },
        { key: "sebaran", label: "Sebaran & Analitik", icon: "◍" },
      ]
    },
    {
      title: "Kegiatan",
      items: [
        { key: "events", label: "Kegiatan", icon: "◇" },
        { key: "donasi-admin", label: "Donasi", icon: "◆" },
      ]
    },
    {
      title: "Sistem",
      items: [
        { key: "verifikasi", label: "Verifikasi", icon: "✓", badge: 8 },
        { key: "pengaturan", label: "Pengaturan", icon: "⚙" },
      ]
    }
  ];

  return (
    <aside style={{
      width: 260, background: "var(--blue-900)", color: "rgba(255,255,255,0.85)",
      display: "flex", flexDirection: "column", flexShrink: 0,
      borderRight: "1px solid var(--blue-800)",
      position: "sticky", top: 0, height: "100vh", alignSelf: "flex-start",
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", gap: 12 }}>
        <img src="assets/ika-pmii-logo.png" alt="IKA-PMII" width={40} height={40}
              style={{ objectFit: "contain", flexShrink: 0,
                        filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))" }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em", color: "white",
                         fontFamily: "var(--font-display)" }}>
            IKA-PMII Console
          </div>
          <div style={{ fontSize: 10, color: "var(--gold-300)", letterSpacing: "0.08em",
                        textTransform: "uppercase", fontWeight: 700, marginTop: 1 }}>
            Kediri Raya
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "20px 12px", overflowY: "auto" }}>
        {sections.map(sec => (
          <div key={sec.title} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)",
                          letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700,
                          padding: "4px 10px 6px" }}>
              {sec.title}
            </div>
            {sec.items.map(it => (
              <button key={it.key} onClick={() => setPage(it.key)}
                       style={{
                         width: "100%", display: "flex", alignItems: "center", gap: 10,
                         padding: "9px 10px", borderRadius: 8,
                         background: page === it.key ? "rgba(255,255,255,0.08)" : "transparent",
                         color: page === it.key ? "white" : "rgba(255,255,255,0.65)",
                         border: "none", cursor: "pointer", fontSize: 13.5, fontWeight: 500,
                         fontFamily: "inherit", textAlign: "left", marginBottom: 2,
                         position: "relative"
                       }}>
                {page === it.key && (
                  <div style={{ position: "absolute", left: -12, top: 6, bottom: 6, width: 3,
                                background: "var(--gold-500)", borderRadius: "0 3px 3px 0" }} />
                )}
                <span style={{ color: page === it.key ? "var(--gold-500)" : "rgba(255,255,255,0.4)",
                                width: 16, textAlign: "center" }}>
                  {it.icon}
                </span>
                <span style={{ flex: 1 }}>{it.label}</span>
                {it.badge && (
                  <span style={{ background: "var(--gold-500)", color: "var(--blue-900)",
                                  fontSize: 10, fontWeight: 700, padding: "1px 6px",
                                  borderRadius: 99 }}>
                    {it.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* User */}
      <div style={{ padding: 16, borderTop: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar initials="AF" size={36} color="var(--gold-500)" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "white",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            Abdullah Faqih
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Ketua Umum</div>
        </div>
        <button onClick={onLogout} title="Kembali ke publik"
                 style={{ background: "transparent", border: "none",
                          color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 16 }}>
          ⏏
        </button>
      </div>
    </aside>
  );
}

// === Admin Top Bar ===
function AdminTopBar({ title, subtitle, actions }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(10px)",
                  borderBottom: "1px solid var(--line)",
                  padding: "20px 32px", display: "flex", alignItems: "center", gap: 24,
                  position: "sticky", top: 0, zIndex: 20 }}>
      <div style={{ flex: 1 }}>
        <h1 className="display" style={{ fontSize: 26, fontWeight: 500, margin: 0,
                                          letterSpacing: "-0.02em" }}>
          {title}
        </h1>
        {subtitle && <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 2 }}>{subtitle}</div>}
      </div>
      <div style={{ position: "relative" }}>
        <input placeholder="Cari di seluruh sistem..."
                style={{ padding: "9px 16px 9px 38px", width: 320,
                          border: "1px solid var(--line)", borderRadius: 10,
                          fontSize: 13, background: "var(--bg)" }} />
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                        color: "var(--muted)" }}>⌕</span>
      </div>
      {actions}
    </div>
  );
}

// === Dashboard ===
function AdminDashboard() {
  const topPekerjaan = PEKERJAAN.slice().sort((a,b)=>b.jumlah-a.jumlah).slice(0, 6);
  const wilayahData = [
    { nama: "Kota Kediri", jumlah: KECAMATAN_KOTA.reduce((s,k)=>s+k.jumlah,0) },
    { nama: "Kab. Kediri", jumlah: KECAMATAN_KAB.reduce((s,k)=>s+k.jumlah,0) },
  ];

  return (
    <div>
      <AdminTopBar
        title="Dashboard"
        subtitle="Ringkasan database alumni · Diperbarui 2 menit lalu"
        actions={
          <>
            <button className="btn btn-ghost btn-sm">⤓ Export</button>
            <button className="btn btn-primary btn-sm">＋ Tambah Alumni</button>
          </>
        }
      />
      <div style={{ padding: 32 }}>
        {/* KPI Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <StatCard label="Total Alumni" value="1,847" delta="6.7%" sub="vs bulan lalu" accent="var(--blue-500)" />
          <StatCard label="Data Lengkap" value="78%" sub="1,441 dari 1,847" accent="oklch(0.65 0.15 145)" />
          <StatCard label="Aktif 30 Hari" value="612" sub="33% engagement" accent="var(--gold-500)" />
          <StatCard label="Pending Verifikasi" value="8" sub="3 perlu review hari ini" accent="oklch(0.65 0.15 30)" />
        </div>

        {/* Row 2: Sebaran Wilayah & Pekerjaan */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginTop: 16 }}>
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                          marginBottom: 20 }}>
              <div>
                <h3 className="display" style={{ fontSize: 18, fontWeight: 600, margin: 0,
                                                  letterSpacing: "-0.01em" }}>
                  Sebaran per Kecamatan
                </h3>
                <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>
                  29 kecamatan se-Kediri Raya
                </div>
              </div>
              <select style={{ ...selectStyle, padding: "6px 12px", fontSize: 12 }}>
                <option>Semua wilayah</option>
                <option>Kota Kediri</option>
                <option>Kabupaten Kediri</option>
              </select>
            </div>
            <BarChart data={[...KECAMATAN_KOTA, ...KECAMATAN_KAB].sort((a,b)=>b.jumlah-a.jumlah)}
                      limit={10} color="var(--blue-700)" />
            <div style={{ marginTop: 16, padding: 12, background: "var(--blue-50)",
                          borderRadius: 8, fontSize: 12, color: "var(--blue-700)" }}>
              ◍ <strong>Mojoroto</strong> menjadi kecamatan dengan alumni terbanyak (189).
              Diikuti Pesantren (167) dan Pare (98).
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h3 className="display" style={{ fontSize: 18, fontWeight: 600, margin: 0,
                                              letterSpacing: "-0.01em" }}>
              Komposisi Wilayah
            </h3>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2, marginBottom: 16 }}>
              Kota vs Kabupaten
            </div>
            <Donut data={wilayahData} size={160}
                    palette={["var(--blue-700)", "var(--gold-500)"]} />

            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
              <div style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.06em",
                            textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>
                Top Profesi
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {topPekerjaan.slice(0, 4).map(p => (
                  <div key={p.nama} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 4, height: 4, borderRadius: 99, background: "var(--gold-500)" }} />
                    <span style={{ flex: 1, fontSize: 13 }}>{p.nama}</span>
                    <span className="mono" style={{ fontSize: 12, fontWeight: 600,
                                                     color: "var(--ink-soft)" }}>
                      {p.jumlah}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Universitas + Recent Activity */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, marginTop: 16 }}>
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 className="display" style={{ fontSize: 18, fontWeight: 600, margin: 0,
                                                  letterSpacing: "-0.01em" }}>
                  Kampus Asal Teratas
                </h3>
                <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>
                  12+ kampus, 8 kota di Indonesia
                </div>
              </div>
              <button className="btn btn-ghost btn-sm">Lihat semua →</button>
            </div>
            <div style={{ marginTop: 20, display: "grid", gap: 10 }}>
              {UNIVERSITAS.slice(0, 6).map(u => (
                <div key={u.nama} style={{ display: "grid",
                                            gridTemplateColumns: "32px 1fr 80px 60px",
                                            gap: 12, alignItems: "center" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8,
                                background: "var(--blue-50)", color: "var(--blue-700)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 11, fontWeight: 700 }}>
                    {u.singkat.slice(0, 3)}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{u.nama}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>📍 {u.kota}</div>
                  </div>
                  <div style={{ height: 8, background: "var(--line-soft)", borderRadius: 99 }}>
                    <div style={{ width: `${(u.jumlah / 412) * 100}%`, height: "100%",
                                   background: "var(--gold-500)", borderRadius: 99 }} />
                  </div>
                  <div className="mono" style={{ fontSize: 12, fontWeight: 600,
                                                  textAlign: "right" }}>
                    {u.jumlah}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 className="display" style={{ fontSize: 18, fontWeight: 600, margin: 0,
                                                letterSpacing: "-0.01em" }}>
                Aktivitas Terbaru
              </h3>
              <span className="pill pill-gold" style={{ fontSize: 10 }}>● Live</span>
            </div>
            <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
              {[
                { who: "Ahmad Fauzi", what: "memperbarui data pekerjaan", when: "2 menit lalu", icon: "◉" },
                { who: "Reza Maulana", what: "mendaftarkan data baru", when: "14 menit lalu", icon: "＋" },
                { who: "Lailatul M.", what: "mendaftar event Workshop", when: "1 jam lalu", icon: "◇" },
                { who: "Donatur Anonim", what: "donasi Rp 250.000", when: "3 jam lalu", icon: "◆" },
                { who: "Siti Nur H.", what: "verifikasi data tertunda", when: "5 jam lalu", icon: "✓" },
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "10px 12px",
                                       borderRadius: 8, background: i === 0 ? "var(--blue-50)" : "transparent" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8,
                                 background: "white", border: "1px solid var(--line)",
                                 display: "flex", alignItems: "center", justifyContent: "center",
                                 fontSize: 12, color: "var(--blue-700)", flexShrink: 0 }}>
                    {a.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13 }}>
                      <strong>{a.who}</strong> <span style={{ color: "var(--ink-soft)" }}>{a.what}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{a.when}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 4: Event upcoming + Donasi */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginTop: 16 }}>
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                          marginBottom: 16 }}>
              <h3 className="display" style={{ fontSize: 18, fontWeight: 600, margin: 0,
                                                letterSpacing: "-0.01em" }}>
                Kegiatan Mendatang
              </h3>
              <button className="btn btn-ghost btn-sm">＋ Buat kegiatan</button>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {EVENTS.slice(0, 3).map(ev => (
                <div key={ev.id} style={{ display: "grid",
                                           gridTemplateColumns: "60px 1fr 120px 70px",
                                           gap: 14, padding: 12, borderRadius: 10,
                                           border: "1px solid var(--line)", alignItems: "center" }}>
                  <div style={{ textAlign: "center", padding: "8px 0", background: "var(--blue-50)",
                                borderRadius: 8 }}>
                    <div className="display" style={{ fontSize: 22, fontWeight: 600,
                                                       color: "var(--blue-700)", lineHeight: 1 }}>
                      {new Date(ev.tanggal).getDate()}
                    </div>
                    <div style={{ fontSize: 10, color: "var(--blue-600)", fontWeight: 700,
                                  letterSpacing: "0.05em", marginTop: 2 }}>
                      {new Date(ev.tanggal).toLocaleDateString("id-ID", { month: "short" }).toUpperCase()}
                    </div>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600,
                                  overflow: "hidden", textOverflow: "ellipsis",
                                  whiteSpace: "nowrap" }}>
                      {ev.judul}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>
                      📍 {ev.lokasi.split(",")[0]} · {ev.waktu}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>
                      {ev.peserta}/{ev.kuota} pendaftar
                    </div>
                    <Progress value={ev.peserta} max={ev.kuota} color="var(--gold-500)" height={6} />
                  </div>
                  <span className="pill" style={{ fontSize: 10 }}>{ev.kategori}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 24, background: "var(--blue-900)",
                                          color: "white", borderColor: "var(--blue-800)" }}>
            <div className="pill pill-gold" style={{ marginBottom: 12 }}>FUNDRAISING</div>
            <div className="display" style={{ fontSize: 32, fontWeight: 500, letterSpacing: "-0.02em",
                                                lineHeight: 1.1 }}>
              {rupiah(587000000)}
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
              Terkumpul dari 3 program aktif
            </div>
            <div style={{ marginTop: 20, display: "grid", gap: 10 }}>
              {DONASI_PROGRAM.map((p, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between",
                                 fontSize: 12, marginBottom: 4 }}>
                    <span style={{ color: "rgba(255,255,255,0.85)" }}>{p.judul.slice(0, 30)}…</span>
                    <span className="mono" style={{ color: "var(--gold-500)", fontWeight: 600 }}>
                      {Math.round((p.terkumpul / p.target) * 100)}%
                    </span>
                  </div>
                  <div style={{ height: 5, background: "rgba(255,255,255,0.1)", borderRadius: 99 }}>
                    <div style={{ width: `${(p.terkumpul/p.target)*100}%`, height: "100%",
                                   background: "var(--gold-500)", borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-accent btn-sm" style={{ width: "100%", justifyContent: "center",
                                                                 marginTop: 18 }}>
              Lihat laporan keuangan →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AdminSidebar, AdminTopBar, AdminDashboard });
