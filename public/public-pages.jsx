// Public-facing pages — mobile-first responsive

// ===  Hook: detect mobile ===
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' && window.innerWidth <= 768
  );
  React.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

// === Mobile Top Bar (shown only on mobile) ===
function MobileTopBar({ page, onAdmin }) {
  const titles = {
    beranda: "IKA-PMII Kediri",
    direktori: "Direktori Alumni",
    kegiatan: "Kegiatan",
    donasi: "Donasi",
    tentang: "Tentang",
  };
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 50,
      height: 56,
      background: "rgba(255,255,255,0.96)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--line)",
      display: "flex", alignItems: "center",
      padding: "0 16px", gap: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
        <img src="assets/ika-pmii-logo.png" width={28} height={28}
             style={{ objectFit: "contain", flexShrink: 0 }} alt="IKA-PMII" />
        <span style={{ fontWeight: 700, fontSize: 15, fontFamily: "var(--font-display)",
                        color: "var(--blue-900)", whiteSpace: "nowrap" }}>
          IKA-PMII
        </span>
      </div>
      <div style={{ flex: 1, textAlign: "center", fontSize: 14, fontWeight: 600,
                    color: "var(--ink-soft)", overflow: "hidden", textOverflow: "ellipsis",
                    whiteSpace: "nowrap" }}>
        {titles[page] || "IKA-PMII"}
      </div>
      <button onClick={onAdmin} style={{
        width: 36, height: 36, border: "none", borderRadius: "50%",
        background: "var(--blue-50)", color: "var(--blue-700)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", fontSize: 17, flexShrink: 0,
      }}>⌗</button>
    </div>
  );
}

// === Public Bottom Nav (shown only on mobile) ===
function PublicBottomNav({ page, setPage, onAdmin }) {
  const items = [
    { key: "beranda",   label: "Beranda",   icon: "🏠" },
    { key: "direktori", label: "Direktori", icon: "👥" },
    { key: "kegiatan",  label: "Kegiatan",  icon: "📅" },
    { key: "donasi",    label: "Donasi",    icon: "💚" },
    { key: "_admin",    label: "Admin",     icon: "⌗" },
  ];
  return (
    <nav style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(255,255,255,0.97)",
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      borderTop: "1px solid var(--line)",
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
    }}>
      <div style={{ display: "flex", height: 64 }}>
        {items.map(it => {
          const active = page === it.key;
          return (
            <button key={it.key}
              onClick={() => it.key === "_admin" ? onAdmin() : setPage(it.key)}
              style={{
                flex: 1, border: "none", background: "transparent",
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: 3, cursor: "pointer",
                fontFamily: "inherit", padding: "6px 4px",
                color: active ? "var(--blue-700)" : "var(--muted)",
              }}>
              <span style={{ fontSize: 22, lineHeight: 1 }}>{it.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.01em" }}>
                {it.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// === Desktop Top Navigation ===
function PublicNav({ page, setPage, onSwitchToAdmin }) {
  const items = [
    { key: "beranda",   label: "Beranda" },
    { key: "tentang",   label: "Tentang" },
    { key: "direktori", label: "Direktori" },
    { key: "kegiatan",  label: "Kegiatan" },
    { key: "donasi",    label: "Donasi" },
  ];
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--line)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "14px 32px",
                    display: "flex", alignItems: "center", gap: 32 }}>
        <button onClick={() => setPage("beranda")}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
          <PMIILogo size={40} />
        </button>
        <div style={{ display: "flex", gap: 4, flex: 1 }}>
          {items.map(it => (
            <button key={it.key} onClick={() => setPage(it.key)}
                    style={{
                      padding: "8px 14px", borderRadius: 8,
                      background: page === it.key ? "var(--blue-50)" : "transparent",
                      color: page === it.key ? "var(--blue-700)" : "var(--ink-soft)",
                      border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer",
                      fontFamily: "inherit",
                    }}>
              {it.label}
            </button>
          ))}
        </div>
        <button className="btn btn-ghost btn-sm" onClick={onSwitchToAdmin}>⌗ Masuk Admin</button>
        <button className="btn btn-primary btn-sm">Daftar Alumni →</button>
      </div>
    </nav>
  );
}

// === Beranda ===
function Beranda({ setPage }) {
  const m = useIsMobile();
  const totalAlumni = KECAMATAN_KOTA.reduce((s, k) => s + k.jumlah, 0)
                    + KECAMATAN_KAB.reduce((s, k) => s + k.jumlah, 0);
  const px = m ? 20 : 32;

  return (
    <div style={{ maxWidth: "100vw", overflow: "hidden" }}>

      {/* ── Hero ── */}
      <section style={{
        position: "relative",
        background: "linear-gradient(135deg, var(--blue-900) 0%, var(--blue-700) 55%, var(--blue-600) 100%)",
        color: "white", overflow: "hidden",
      }}>
        {/* dots bg */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.1,
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px" }} />
        {/* gold band */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4,
          background: "linear-gradient(90deg, var(--gold-500), var(--gold-700), var(--gold-500))" }} />

        <div style={{
          maxWidth: 1280, margin: "0 auto",
          padding: m ? "52px 20px 52px" : "96px 32px 120px",
          display: "grid",
          gridTemplateColumns: m ? "1fr" : "1.2fr 1fr",
          gap: m ? 28 : 64, position: "relative",
        }}>
          <div>
            {/* badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "5px 12px", borderRadius: 99,
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
              fontSize: m ? 10 : 12, fontWeight: 600, letterSpacing: "0.04em",
              color: "var(--gold-300)", marginBottom: 20,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: 99, background: "var(--gold-500)", flexShrink: 0 }} />
              {m ? "IKA-PMII KEDIRI RAYA" : "IKATAN KELUARGA ALUMNI · PMII KEDIRI RAYA"}
            </div>

            {/* headline */}
            <h1 className="display" style={{
              fontSize: m ? 42 : 72, fontWeight: 500,
              lineHeight: m ? 1.05 : 1.02, margin: 0,
              letterSpacing: m ? "-0.025em" : "-0.035em",
            }}>
              Merawat{" "}
              <span style={{ fontStyle: "italic", color: "var(--gold-500)", fontWeight: 400 }}>
                silaturahmi
              </span>,<br />
              menguatkan{" "}
              <span style={{ fontStyle: "italic", color: "var(--gold-500)", fontWeight: 400 }}>
                jejaring
              </span>.
            </h1>

            <p style={{
              fontSize: m ? 15 : 18, lineHeight: 1.55, marginTop: m ? 16 : 24,
              color: "rgba(255,255,255,0.8)", maxWidth: 540,
            }}>
              Platform pendataan alumni PMII se-Kabupaten &amp; Kota Kediri —
              dari biodata, sebaran wilayah, hingga kontribusi sosial-ekonomi pasca-kampus.
            </p>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: 10, marginTop: m ? 24 : 36,
                          flexDirection: m ? "column" : "row" }}>
              <button className="btn btn-accent"
                style={{ justifyContent: "center", padding: m ? "14px 20px" : "11px 18px" }}>
                Daftarkan Diri ↗
              </button>
              <button className="btn" style={{
                background: "rgba(255,255,255,0.1)", color: "white",
                border: "1px solid rgba(255,255,255,0.2)",
                justifyContent: "center", padding: m ? "14px 20px" : "11px 18px",
              }}>
                Pelajari lebih lanjut
              </button>
            </div>

            {/* Mini stats */}
            <div style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr 1fr" : "repeat(4, auto)",
              gap: m ? "16px 24px" : "0 48px",
              marginTop: m ? 36 : 64,
            }}>
              {[
                { label: "Alumni terdata", value: totalAlumni.toLocaleString("id-ID") },
                { label: "Kecamatan", value: "29" },
                { label: "Kampus asal", value: "12+" },
                { label: "Angkatan", value: "1998–2024" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="display" style={{ fontSize: m ? 24 : 28, fontWeight: 500, color: "var(--gold-500)" }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)",
                                letterSpacing: "0.05em", textTransform: "uppercase", marginTop: 3 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero side card — desktop only */}
          {!m && (
            <div style={{ position: "relative" }}>
              <div style={{
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 20, padding: 24, backdropFilter: "blur(12px)",
                transform: "rotate(2deg)", marginBottom: -120, marginTop: 12,
              }}>
                <div style={{ fontSize: 11, letterSpacing: "0.08em", color: "var(--gold-300)",
                              textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>
                  Sebaran Alumni · Kediri Raya
                </div>
                <div style={{ display: "grid", gap: 8 }}>
                  {[["Kota Kediri",498,100],["Pare",98,22],["Ngasem",87,19],["Gurah",76,17],["Kandangan",71,16]]
                    .map(([n,v,p]) => (
                    <div key={n} style={{ display: "grid", gridTemplateColumns: "1fr 56px", alignItems: "center", gap: 10 }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{n}</div>
                        <div style={{ height: 5, marginTop: 4, background: "rgba(255,255,255,0.1)", borderRadius: 99 }}>
                          <div style={{ width: `${p}%`, height: "100%", background: "var(--gold-500)", borderRadius: 99 }} />
                        </div>
                      </div>
                      <div className="mono" style={{ fontSize: 12, fontWeight: 600, textAlign: "right", color: "rgba(255,255,255,0.85)" }}>
                        {v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                background: "rgba(255,255,255,0.95)", color: "var(--ink)",
                borderRadius: 20, padding: 20, boxShadow: "var(--shadow-lg)",
                transform: "rotate(-3deg)", marginLeft: 40,
              }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Avatar initials="AF" size={44} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>Ahmad Fauzi Ridwan</div>
                    <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Angkatan 2018 · Mojoroto</div>
                  </div>
                  <span className="pill pill-gold">Aktif</span>
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                  <span className="pill" style={{ fontSize: 11 }}>IAIN Kediri</span>
                  <span className="pill" style={{ fontSize: 11 }}>PAI</span>
                  <span className="pill" style={{ fontSize: 11 }}>Guru MTs</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Quick Stats ── */}
      <section style={{ background: "white", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: m ? "28px 20px" : "180px 32px 60px" }}>
          {m ? (
            /* mobile: 2×2 grid */
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { label: "Alumni Terdata", value: "1,847", sub: "↑ 124 bulan ini", accent: "var(--blue-500)" },
                { label: "Kecamatan", value: "29", sub: "3 Kota · 26 Kab.", accent: "var(--gold-500)" },
                { label: "Kampus Asal", value: "12+", sub: "Di 8 kota", accent: "var(--blue-500)" },
                { label: "Donasi", value: "587jt", sub: "3 program aktif", accent: "var(--gold-500)" },
              ].map((s, i) => (
                <div key={i} className="card" style={{ padding: 16, position: "relative", overflow: "hidden" }}>
                  <div style={{ fontSize: 10, color: "var(--ink-soft)", fontWeight: 600,
                                letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 6 }}>
                    {s.label}
                  </div>
                  <div className="display" style={{ fontSize: 28, fontWeight: 600, color: "var(--ink)", lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>{s.sub}</div>
                  <div style={{ position: "absolute", top: 0, right: 0, width: 40, height: 40,
                                background: `linear-gradient(135deg, transparent 50%, ${s.accent} 50%)`, opacity: 0.15 }} />
                </div>
              ))}
            </div>
          ) : (
            /* desktop: 4-col */
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              <StatCard label="Total Alumni Terdata" value="1,847" sub="↑ 124 alumni bulan ini" accent="var(--blue-500)" />
              <StatCard label="Tersebar di Kecamatan" value="29" sub="3 Kota · 26 Kabupaten" accent="var(--gold-500)" />
              <StatCard label="Kampus Asal" value="12+" sub="Tersebar di 8 kota" accent="var(--blue-500)" />
              <StatCard label="Donasi Terkumpul" value="587jt" sub="Dari 3 program aktif" accent="var(--gold-500)" />
            </div>
          )}
        </div>
      </section>

      {/* ── Events ── */}
      <section style={{ padding: m ? "32px 20px" : "80px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between",
                        marginBottom: m ? 20 : 32, flexWrap: "wrap", gap: 10 }}>
            <div>
              <div className="pill pill-gold" style={{ marginBottom: 8 }}>AGENDA</div>
              <h2 className="display" style={{ fontSize: m ? 28 : 44, fontWeight: 500, margin: 0,
                                               letterSpacing: "-0.03em" }}>
                Kegiatan mendatang
              </h2>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setPage("kegiatan")}>
              Lihat semua →
            </button>
          </div>

          {m ? (
            /* mobile: vertical list */
            <div style={{ display: "grid", gap: 12 }}>
              {EVENTS.slice(0, 3).map(ev => (
                <div key={ev.id} className="card" style={{ padding: 0, overflow: "hidden" }}>
                  <div style={{
                    background: "linear-gradient(135deg, var(--blue-700), var(--blue-500))",
                    padding: "16px 20px", color: "white", display: "flex", gap: 14, alignItems: "center",
                  }}>
                    <div style={{ textAlign: "center", background: "rgba(255,255,255,0.15)",
                                  borderRadius: 10, padding: "8px 12px", minWidth: 52 }}>
                      <div className="display" style={{ fontSize: 24, fontWeight: 600, lineHeight: 1 }}>
                        {new Date(ev.tanggal).getDate()}
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", marginTop: 2 }}>
                        {new Date(ev.tanggal).toLocaleDateString("id-ID",{month:"short"}).toUpperCase()}
                      </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span className="pill" style={{ background: "var(--gold-500)", color: "var(--blue-900)",
                                                       fontSize: 10, marginBottom: 6 }}>
                        {ev.kategori}
                      </span>
                      <div style={{ fontWeight: 600, fontSize: 14, marginTop: 4, lineHeight: 1.3 }}>
                        {ev.judul}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "12px 20px", display: "flex", justifyContent: "space-between",
                                alignItems: "center", gap: 12 }}>
                    <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>
                      📍 {ev.lokasi.split(",")[0]}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>
                      👥 {ev.peserta}/{ev.kuota}
                    </div>
                    <button className="btn btn-ghost btn-sm" style={{ fontSize: 12 }}>
                      Detail →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* desktop: 3-col grid */
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 16 }}>
              <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ height: 240, background: "linear-gradient(135deg, var(--blue-700), var(--blue-500))",
                              position: "relative", padding: 24, display: "flex", flexDirection: "column",
                              justifyContent: "flex-end", color: "white" }}>
                  <div style={{ position: "absolute", top: 20, left: 20, display: "flex", gap: 6 }}>
                    <span className="pill" style={{ background: "var(--gold-500)", color: "var(--blue-900)" }}>Unggulan</span>
                    <span className="pill" style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>{EVENTS[0].kategori}</span>
                  </div>
                  <div className="mono" style={{ fontSize: 11, opacity: 0.8 }}>
                    {tglID(EVENTS[0].tanggal).toUpperCase()} · {EVENTS[0].waktu}
                  </div>
                  <h3 className="display" style={{ fontSize: 26, fontWeight: 500, margin: "6px 0 0", letterSpacing: "-0.02em" }}>
                    {EVENTS[0].judul}
                  </h3>
                </div>
                <div style={{ padding: 24, flex: 1 }}>
                  <div style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.55 }}>{EVENTS[0].deskripsi}</div>
                  <div style={{ display: "flex", gap: 16, marginTop: 16, fontSize: 13 }}>
                    <div><div style={{ color: "var(--muted)", fontSize: 11 }}>Lokasi</div><div style={{ fontWeight: 500 }}>{EVENTS[0].lokasi}</div></div>
                    <div><div style={{ color: "var(--muted)", fontSize: 11 }}>Pendaftar</div><div style={{ fontWeight: 500 }}>{EVENTS[0].peserta} / {EVENTS[0].kuota}</div></div>
                  </div>
                </div>
              </div>
              {EVENTS.slice(1, 3).map(ev => (
                <div key={ev.id} className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  <div style={{ padding: 24, flex: 1 }}>
                    <span className="pill">{ev.kategori}</span>
                    <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 10 }}>{tglID(ev.tanggal).toUpperCase()}</div>
                    <h4 className="display" style={{ fontSize: 20, fontWeight: 500, margin: "6px 0 10px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{ev.judul}</h4>
                    <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>{ev.deskripsi.slice(0, 100)}…</div>
                  </div>
                  <div style={{ padding: "14px 24px", borderTop: "1px solid var(--line)",
                                display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg)" }}>
                    <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)" }}>📍 {ev.lokasi.split(",")[0]}</div>
                    <button className="btn btn-ghost btn-sm">Detail →</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Sebaran ── */}
      <section style={{ padding: m ? "32px 20px" : "60px 32px", background: "var(--blue-50)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="pill" style={{ marginBottom: 12 }}>SEBARAN</div>
          <h2 className="display" style={{ fontSize: m ? 28 : 44, fontWeight: 500, margin: "0 0 16px",
                                            letterSpacing: "-0.03em" }}>
            {m ? "Dari desa ke ruang strategis." : "Dari pelosok desa ke ruang-ruang strategis."}
          </h2>
          <p style={{ fontSize: m ? 14 : 16, lineHeight: 1.6, color: "var(--ink-soft)", margin: "0 0 24px" }}>
            Alumni PMII Kediri tersebar di 29 kecamatan, mengisi peran dari pendidikan,
            pemerintahan, hingga sektor wirausaha.
          </p>

          {/* Profesi grid */}
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr 1fr" : "repeat(4, 1fr)", gap: m ? 10 : 12, marginBottom: m ? 20 : 0 }}>
            {PEKERJAAN.slice(0, m ? 4 : 4).map(p => (
              <div key={p.nama} style={{ padding: m ? 14 : 14, background: "white",
                                          borderRadius: 12, border: "1px solid var(--line)" }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-soft)" }}>◆ PROFESI</div>
                <div style={{ fontSize: m ? 13 : 14, fontWeight: 600, marginTop: 4 }}>{p.nama}</div>
                <div className="display" style={{ fontSize: m ? 22 : 24, color: "var(--blue-700)", marginTop: 4 }}>
                  {p.jumlah}
                </div>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          {!m && (
            <div className="card" style={{ padding: 28, marginTop: 24 }}>
              <div style={{ fontSize: 12, letterSpacing: "0.06em", color: "var(--ink-soft)",
                            textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>
                Top 8 Kecamatan
              </div>
              <BarChart data={[...KECAMATAN_KOTA, ...KECAMATAN_KAB].sort((a,b)=>b.jumlah-a.jumlah)}
                        limit={8} color="var(--blue-700)" />
            </div>
          )}
          {m && (
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.06em", color: "var(--ink-soft)",
                            textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
                Top 5 Kecamatan
              </div>
              <BarChart data={[...KECAMATAN_KOTA, ...KECAMATAN_KAB].sort((a,b)=>b.jumlah-a.jumlah)}
                        limit={5} color="var(--blue-700)" />
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: m ? "52px 20px" : "100px 32px",
                        background: "var(--blue-900)", color: "white",
                        position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -60, width: 300, height: 300,
                      borderRadius: "50%",
                      background: "radial-gradient(circle, var(--gold-500) 0%, transparent 60%)",
                      opacity: 0.15 }} />
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <h2 className="display" style={{ fontSize: m ? 38 : 52, fontWeight: 500,
                                            letterSpacing: "-0.03em", lineHeight: 1.08, margin: 0 }}>
            Sudah waktunya<br />
            <span style={{ fontStyle: "italic", color: "var(--gold-500)" }}>terdata</span>.
          </h2>
          <p style={{ fontSize: m ? 14 : 17, color: "rgba(255,255,255,0.72)", marginTop: 16, lineHeight: 1.55 }}>
            Bergabung dalam database resmi alumni PMII Kediri Raya.
            Cukup 5 menit, datamu menjadi bagian dari peta gerakan.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 28,
                        flexDirection: m ? "column" : "row" }}>
            <button className="btn btn-accent"
              style={{ padding: m ? "15px 24px" : "14px 24px", fontSize: m ? 15 : 15,
                       justifyContent: "center" }}>
              Daftarkan Diri Sekarang ↗
            </button>
            <button className="btn" style={{
              background: "rgba(255,255,255,0.1)", color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: m ? "15px 24px" : "14px 24px", fontSize: m ? 15 : 15,
              justifyContent: "center",
            }}>
              Konfirmasi via WhatsApp
            </button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

// === Footer ===
function PublicFooter() {
  const m = useIsMobile();
  return (
    <footer style={{ background: "var(--blue-900)", color: "rgba(255,255,255,0.7)",
                      padding: m ? "36px 20px 24px" : "48px 32px 32px",
                      borderTop: "4px solid var(--gold-500)" }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: m ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
        gap: m ? 24 : 48,
      }}>
        <div style={{ gridColumn: m ? "1 / -1" : "auto" }}>
          <div style={{ marginBottom: 12 }}><PMIILogo size={40} dark /></div>
          <p style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 320, margin: 0 }}>
            Sistem pendataan alumni PMII Cabang Kab. Kediri &amp; Kota Kediri.
          </p>
        </div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.08em", color: "var(--gold-500)",
                        textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>Navigasi</div>
          {["Beranda","Tentang","Direktori","Kegiatan"].map(l => (
            <div key={l} style={{ fontSize: 13, marginBottom: 6 }}>{l}</div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.08em", color: "var(--gold-500)",
                        textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>Kontak</div>
          {["Sekretariat Cabang","Jl. Veteran, Kediri","alumni@pmii-kediri.id"].map(l => (
            <div key={l} style={{ fontSize: 13, marginBottom: 6 }}>{l}</div>
          ))}
        </div>
        {!m && (
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.08em", color: "var(--gold-500)",
                          textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>Sosial</div>
            {["Instagram","Facebook","YouTube"].map(l => (
              <div key={l} style={{ fontSize: 13, marginBottom: 6 }}>{l}</div>
            ))}
          </div>
        )}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)",
                    marginTop: m ? 28 : 40, paddingTop: 16,
                    fontSize: 11, color: "rgba(255,255,255,0.4)",
                    display: "flex", flexDirection: m ? "column" : "row",
                    justifyContent: "space-between", gap: 4,
                    maxWidth: 1280, marginLeft: "auto", marginRight: "auto" }}>
        <span>© 2026 Alumni PMII Kediri Raya</span>
        <span className="mono">v1.0</span>
      </div>
    </footer>
  );
}

Object.assign(window, { useIsMobile, MobileTopBar, PublicBottomNav, PublicNav, Beranda, PublicFooter });
