// Public-facing pages for PMII Kediri alumni app

const { useState: useStateP } = React;

// === Top Navigation ===
function PublicNav({ page, setPage, onSwitchToAdmin }) {
  const items = [
    { key: "beranda", label: "Beranda" },
    { key: "tentang", label: "Tentang" },
    { key: "direktori", label: "Direktori" },
    { key: "kegiatan", label: "Kegiatan" },
    { key: "donasi", label: "Donasi" },
  ];
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--line)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 32px",
                    display: "flex", alignItems: "center", gap: 32 }}>
        <button onClick={() => setPage("beranda")}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
          <PMIILogo size={42} />
        </button>
        <div style={{ display: "flex", gap: 4, flex: 1 }}>
          {items.map(it => (
            <button key={it.key} onClick={() => setPage(it.key)}
                    style={{
                      padding: "8px 14px", borderRadius: 8,
                      background: page === it.key ? "var(--blue-50)" : "transparent",
                      color: page === it.key ? "var(--blue-700)" : "var(--ink-soft)",
                      border: "none", fontSize: 14, fontWeight: 600,
                    }}>
              {it.label}
            </button>
          ))}
        </div>
        <button className="btn btn-ghost btn-sm" onClick={onSwitchToAdmin}>
          ⌗ Masuk Admin
        </button>
        <button className="btn btn-primary btn-sm">
          Daftar Alumni →
        </button>
      </div>
    </nav>
  );
}

// === Hero / Beranda ===
function Beranda({ setPage }) {
  const totalAlumni = ALUMNI_LIST.length > 0
    ? KECAMATAN_KOTA.reduce((s, k) => s + k.jumlah, 0) + KECAMATAN_KAB.reduce((s, k) => s + k.jumlah, 0)
    : 0;
  return (
    <div>
      {/* Hero */}
      <section style={{
        position: "relative",
        background: "linear-gradient(135deg, var(--blue-900) 0%, var(--blue-700) 55%, var(--blue-600) 100%)",
        color: "white", overflow: "hidden",
      }}>
        {/* decorative dots */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.12,
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }} />
        {/* gold band */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4,
                      background: "linear-gradient(90deg, var(--gold-500), var(--gold-700), var(--gold-500))" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 32px 120px",
                      display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, position: "relative" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8,
                          padding: "6px 14px", borderRadius: 99,
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          fontSize: 12, fontWeight: 600, letterSpacing: "0.04em",
                          color: "var(--gold-300)", marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--gold-500)" }} />
              IKATAN KELUARGA ALUMNI · PMII KEDIRI RAYA
            </div>
            <h1 className="display" style={{
              fontSize: 72, fontWeight: 500, lineHeight: 1.02, margin: 0,
              letterSpacing: "-0.035em"
            }}>
              Merawat <span style={{ fontStyle: "italic", color: "var(--gold-500)", fontWeight: 400 }}>silaturahmi</span>,<br />
              menguatkan <span style={{ fontStyle: "italic", color: "var(--gold-500)", fontWeight: 400 }}>jejaring</span>.
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.5, marginTop: 24, color: "rgba(255,255,255,0.78)",
                        maxWidth: 540 }}>
              Platform pendataan alumni Pergerakan Mahasiswa Islam Indonesia
              se-Kabupaten &amp; Kota Kediri — dari biodata, sebaran wilayah, hingga
              kontribusi sosial-ekonomi pasca-kampus.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
              <button className="btn btn-accent">Daftarkan Diri ↗</button>
              <button className="btn btn-ghost" style={{ background: "rgba(255,255,255,0.08)",
                                                          color: "white", borderColor: "rgba(255,255,255,0.18)" }}>
                Pelajari lebih lanjut
              </button>
            </div>
            {/* Mini stats */}
            <div style={{ display: "flex", gap: 48, marginTop: 64 }}>
              {[
                { label: "Alumni terdata", value: totalAlumni.toLocaleString("id-ID") },
                { label: "Kecamatan", value: "29" },
                { label: "Kampus asal", value: "12+" },
                { label: "Angkatan", value: "1998–2024" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="display" style={{ fontSize: 28, fontWeight: 500, color: "var(--gold-500)" }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)",
                                letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 4 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Hero side card */}
          <div style={{ position: "relative" }}>
            <div style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 20, padding: 24, backdropFilter: "blur(12px)",
              transform: "rotate(2deg)", marginBottom: -120, marginTop: 12
            }}>
              <div style={{ fontSize: 11, letterSpacing: "0.08em", color: "var(--gold-300)",
                            textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>
                Sebaran Alumni · Kediri Raya
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {[
                  ["Kota Kediri", 498, 100],
                  ["Pare", 98, 22],
                  ["Ngasem", 87, 19],
                  ["Gurah", 76, 17],
                  ["Kandangan", 71, 16],
                ].map(([n, v, p]) => (
                  <div key={n} style={{ display: "grid", gridTemplateColumns: "1fr 60px",
                                         alignItems: "center", gap: 10 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{n}</div>
                      <div style={{ height: 6, marginTop: 4, background: "rgba(255,255,255,0.1)", borderRadius: 99 }}>
                        <div style={{ width: `${p}%`, height: "100%", background: "var(--gold-500)",
                                       borderRadius: 99 }} />
                      </div>
                    </div>
                    <div className="mono" style={{ fontSize: 12, fontWeight: 600,
                                                   textAlign: "right", color: "rgba(255,255,255,0.85)" }}>
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.95)", color: "var(--ink)",
              borderRadius: 20, padding: 20, boxShadow: "var(--shadow-lg)",
              transform: "rotate(-3deg)", marginLeft: 40
            }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Avatar initials="AF" size={48} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Ahmad Fauzi Ridwan</div>
                  <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Angkatan 2018 · Mojoroto</div>
                </div>
                <span className="pill pill-gold">Aktif</span>
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                <span className="pill" style={{ fontSize: 11 }}>IAIN Kediri</span>
                <span className="pill" style={{ fontSize: 11 }}>PAI</span>
                <span className="pill" style={{ fontSize: 11 }}>Guru MTs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section style={{ background: "white", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "180px 32px 60px",
                      display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <StatCard label="Total Alumni Terdata" value="1,847" sub="↑ 124 alumni bulan ini" accent="var(--blue-500)" />
          <StatCard label="Tersebar di Kecamatan" value="29" sub="3 Kota · 26 Kabupaten" accent="var(--gold-500)" />
          <StatCard label="Kampus Asal" value="12+" sub="Tersebar di 8 kota" accent="var(--blue-500)" />
          <StatCard label="Donasi Terkumpul" value="587jt" sub="Dari 3 program aktif" accent="var(--gold-500)" />
        </div>
      </section>

      {/* Upcoming events highlight */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", marginBottom: 32 }}>
            <div>
              <div className="pill pill-gold" style={{ marginBottom: 12 }}>AGENDA</div>
              <h2 className="display" style={{ fontSize: 44, fontWeight: 500, margin: 0,
                                                letterSpacing: "-0.03em" }}>
                Kegiatan mendatang
              </h2>
            </div>
            <button className="btn btn-ghost" onClick={() => setPage("kegiatan")}>Lihat semua →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 16 }}>
            {/* Featured event */}
            <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex",
                                            flexDirection: "column" }}>
              <div style={{
                height: 260,
                background: "linear-gradient(135deg, var(--blue-700), var(--blue-500))",
                position: "relative", padding: 24, display: "flex", flexDirection: "column",
                justifyContent: "end", color: "white"
              }}>
                <div style={{
                  position: "absolute", inset: 0, opacity: 0.15,
                  backgroundImage: "radial-gradient(circle at 20% 80%, var(--gold-500) 0%, transparent 50%)"
                }} />
                <div style={{ position: "absolute", top: 20, left: 20, display: "flex", gap: 6 }}>
                  <span className="pill" style={{ background: "var(--gold-500)", color: "var(--blue-900)" }}>
                    Unggulan
                  </span>
                  <span className="pill" style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>
                    {EVENTS[0].kategori}
                  </span>
                </div>
                <div style={{ position: "relative" }}>
                  <div className="mono" style={{ fontSize: 12, opacity: 0.8 }}>
                    {tglID(EVENTS[0].tanggal).toUpperCase()} · {EVENTS[0].waktu}
                  </div>
                  <h3 className="display" style={{ fontSize: 28, fontWeight: 500, margin: "8px 0 0",
                                                    letterSpacing: "-0.02em" }}>
                    {EVENTS[0].judul}
                  </h3>
                </div>
              </div>
              <div style={{ padding: 24, flex: 1 }}>
                <div style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.55 }}>
                  {EVENTS[0].deskripsi}
                </div>
                <div style={{ display: "flex", gap: 16, marginTop: 16, fontSize: 13 }}>
                  <div>
                    <div style={{ color: "var(--muted)", fontSize: 11 }}>Lokasi</div>
                    <div style={{ fontWeight: 500 }}>{EVENTS[0].lokasi}</div>
                  </div>
                  <div>
                    <div style={{ color: "var(--muted)", fontSize: 11 }}>Pendaftar</div>
                    <div style={{ fontWeight: 500 }}>{EVENTS[0].peserta} / {EVENTS[0].kuota}</div>
                  </div>
                </div>
              </div>
            </div>
            {EVENTS.slice(1, 3).map(ev => (
              <div key={ev.id} className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: 24, flex: 1 }}>
                  <span className="pill" style={{ marginBottom: 12 }}>{ev.kategori}</span>
                  <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 8 }}>
                    {tglID(ev.tanggal).toUpperCase()}
                  </div>
                  <h4 className="display" style={{ fontSize: 22, fontWeight: 500, margin: "6px 0 12px",
                                                    letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                    {ev.judul}
                  </h4>
                  <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>
                    {ev.deskripsi.slice(0, 100)}…
                  </div>
                </div>
                <div style={{ padding: "16px 24px", borderTop: "1px solid var(--line)",
                              display: "flex", justifyContent: "space-between", alignItems: "center",
                              background: "var(--bg)" }}>
                  <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)" }}>
                    📍 {ev.lokasi.split(",")[0]}
                  </div>
                  <button className="btn btn-ghost btn-sm">Detail →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sebaran visual */}
      <section style={{ padding: "60px 32px", background: "var(--blue-50)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <div className="pill" style={{ marginBottom: 16 }}>SEBARAN</div>
              <h2 className="display" style={{ fontSize: 44, fontWeight: 500, margin: 0, letterSpacing: "-0.03em" }}>
                Dari pelosok desa<br />ke ruang-ruang strategis.
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--ink-soft)", marginTop: 16 }}>
                Alumni PMII Kediri tersebar di 29 kecamatan, mengisi peran dari pendidikan,
                pemerintahan, hingga sektor wirausaha. Platform ini memetakan kontribusi
                tersebut untuk memudahkan konsolidasi &amp; kolaborasi.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24 }}>
                {PEKERJAAN.slice(0, 4).map(p => (
                  <div key={p.nama} style={{ padding: 14, background: "white",
                                              borderRadius: 12, border: "1px solid var(--line)" }}>
                    <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)" }}>
                      ◆ PROFESI
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{p.nama}</div>
                    <div className="display" style={{ fontSize: 24, color: "var(--blue-700)", marginTop: 4 }}>
                      {p.jumlah}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding: 28 }}>
              <div style={{ fontSize: 12, letterSpacing: "0.06em", color: "var(--ink-soft)",
                            textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>
                Top 8 Kecamatan
              </div>
              <BarChart data={[...KECAMATAN_KOTA, ...KECAMATAN_KAB].sort((a,b)=>b.jumlah-a.jumlah)}
                        limit={8} color="var(--blue-700)" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 32px", background: "var(--blue-900)", color: "white",
                        position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -80, width: 400, height: 400,
                      borderRadius: "50%",
                      background: "radial-gradient(circle, var(--gold-500) 0%, transparent 60%)",
                      opacity: 0.2 }} />
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <h2 className="display" style={{ fontSize: 56, fontWeight: 500,
                                            letterSpacing: "-0.035em", lineHeight: 1.05, margin: 0 }}>
            Sudah waktunya<br />
            <span style={{ fontStyle: "italic", color: "var(--gold-500)" }}>terdata</span>.
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", marginTop: 20, lineHeight: 1.5 }}>
            Bergabung dalam database resmi alumni PMII Kediri Raya. Cukup 5 menit,
            datamu menjadi bagian dari peta gerakan.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32 }}>
            <button className="btn btn-accent" style={{ padding: "14px 24px", fontSize: 15 }}>
              Daftarkan Diri Sekarang ↗
            </button>
            <button className="btn btn-ghost" style={{ background: "rgba(255,255,255,0.1)",
                                                        color: "white", borderColor: "rgba(255,255,255,0.2)",
                                                        padding: "14px 24px", fontSize: 15 }}>
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
  return (
    <footer style={{ background: "var(--blue-900)", color: "rgba(255,255,255,0.7)",
                      padding: "48px 32px 32px", borderTop: "4px solid var(--gold-500)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto",
                    display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48 }}>
        <div>
          <div style={{ marginBottom: 16 }}>
            <PMIILogo size={48} dark />
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 320 }}>
            Sistem pendataan alumni Pergerakan Mahasiswa Islam Indonesia
            Cabang Kabupaten Kediri &amp; Kota Kediri.
          </p>
        </div>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.08em", color: "var(--gold-500)",
                        textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>
            Navigasi
          </div>
          <div style={{ display: "grid", gap: 8, fontSize: 13 }}>
            <div>Beranda</div>
            <div>Tentang</div>
            <div>Direktori</div>
            <div>Kegiatan</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.08em", color: "var(--gold-500)",
                        textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>
            Kontak
          </div>
          <div style={{ display: "grid", gap: 8, fontSize: 13 }}>
            <div>Sekretariat Cabang</div>
            <div>Jl. Veteran, Kediri</div>
            <div>alumni@pmii-kediri.id</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.08em", color: "var(--gold-500)",
                        textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>
            Sosial
          </div>
          <div style={{ display: "grid", gap: 8, fontSize: 13 }}>
            <div>Instagram</div>
            <div>Facebook</div>
            <div>YouTube</div>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 40,
                    paddingTop: 20, fontSize: 11, color: "rgba(255,255,255,0.4)",
                    display: "flex", justifyContent: "space-between", maxWidth: 1280, margin: "40px auto 0" }}>
        <span>© 2026 Alumni PMII Kediri Raya · Prototype</span>
        <span className="mono">v1.0 · Build 2025.10</span>
      </div>
    </footer>
  );
}

Object.assign(window, { PublicNav, Beranda, PublicFooter });
