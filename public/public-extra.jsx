// More public pages: Direktori, Kegiatan, Donasi, Tentang

// === Direktori Alumni (Public, masked) ===
function Direktori() {
  const [search, setSearch] = React.useState("");
  const [filterKec, setFilterKec] = React.useState("Semua");
  const [filterAng, setFilterAng] = React.useState("Semua");

  const filtered = ALUMNI_LIST.filter(a => {
    if (filterKec !== "Semua" && a.kecamatan !== filterKec) return false;
    if (filterAng !== "Semua" && String(a.angkatan) !== filterAng) return false;
    if (search && !a.nama.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "white", borderBottom: "1px solid var(--line)",
                    padding: "64px 32px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="pill" style={{ marginBottom: 12 }}>DIREKTORI PUBLIK</div>
          <h1 className="display" style={{ fontSize: 56, fontWeight: 500, margin: 0,
                                            letterSpacing: "-0.03em" }}>
            Direktori Alumni
          </h1>
          <p style={{ fontSize: 17, color: "var(--ink-soft)", marginTop: 12, maxWidth: 620 }}>
            Telusuri jejak alumni PMII Kediri Raya berdasarkan angkatan, kecamatan, kampus,
            dan profesi. Data sensitif disembunyikan; login untuk akses penuh.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px",
                    display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 12 }}>
        <div style={{ position: "relative" }}>
          <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Cari nama alumni..."
                  style={{ width: "100%", padding: "12px 16px 12px 44px",
                            border: "1px solid var(--line)", borderRadius: 10,
                            fontSize: 14, background: "white" }} />
          <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
                          color: "var(--muted)" }}>⌕</span>
        </div>
        <select value={filterKec} onChange={e => setFilterKec(e.target.value)}
                style={selectStyle}>
          <option>Semua Kecamatan</option>
          {[...KECAMATAN_KOTA, ...KECAMATAN_KAB].map(k => (
            <option key={k.nama}>{k.nama}</option>
          ))}
        </select>
        <select value={filterAng} onChange={e => setFilterAng(e.target.value)}
                style={selectStyle}>
          <option>Semua Angkatan</option>
          {[...new Set(ALUMNI_LIST.map(a => a.angkatan))].sort().map(a => (
            <option key={a}>{a}</option>
          ))}
        </select>
        <button className="btn btn-ghost">⇅ Filter Lanjut</button>
      </div>

      {/* Result count */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 16px",
                    fontSize: 13, color: "var(--ink-soft)" }}>
        Menampilkan <strong style={{ color: "var(--ink)" }}>{filtered.length}</strong> dari {ALUMNI_LIST.length} alumni
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 80px",
                    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {filtered.map(a => (
          <div key={a.id} className="card" style={{ padding: 24, transition: "transform 0.15s",
                                                     cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = ""}>
            <div style={{ display: "flex", gap: 14 }}>
              <Avatar initials={a.foto} size={52} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)",
                              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {a.nama}
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>
                  {a.id}
                </div>
              </div>
              <span className="pill pill-gold" style={{ fontSize: 10 }}>Aktif</span>
            </div>
            <div style={{ display: "grid", gap: 6, marginTop: 16, fontSize: 13 }}>
              <DKV k="Angkatan" v={a.angkatan} />
              <DKV k="Kampus" v={a.kampus} />
              <DKV k="Kecamatan" v={`${a.kecamatan}, ${a.wilayah}`} />
              <DKV k="Profesi" v={a.jabatan} />
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
              <span className="pill" style={{ fontSize: 10 }}>{a.jurusan}</span>
              <span className="pill pill-ghost" style={{ fontSize: 10 }}>● {a.pekerjaan}</span>
            </div>
          </div>
        ))}
      </div>
      <PublicFooter />
    </div>
  );
}

function DKV({ k, v }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "82px 1fr", gap: 8 }}>
      <span style={{ color: "var(--muted)", fontSize: 12 }}>{k}</span>
      <span style={{ color: "var(--ink)", fontWeight: 500,
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {v}
      </span>
    </div>
  );
}

const selectStyle = {
  padding: "12px 16px", border: "1px solid var(--line)", borderRadius: 10,
  fontSize: 14, background: "white", fontWeight: 500, cursor: "pointer",
};

// === Kegiatan Page ===
function Kegiatan() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div style={{ background: "white", borderBottom: "1px solid var(--line)",
                    padding: "64px 32px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="pill pill-gold" style={{ marginBottom: 12 }}>AGENDA</div>
          <h1 className="display" style={{ fontSize: 56, fontWeight: 500, margin: 0,
                                            letterSpacing: "-0.03em" }}>
            Kegiatan Alumni
          </h1>
          <p style={{ fontSize: 17, color: "var(--ink-soft)", marginTop: 12, maxWidth: 620 }}>
            Silaturahmi, pelatihan, kajian, hingga aksi sosial — agenda lintas
            alumni Kediri Raya.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 32px" }}>
        <div style={{ display: "grid", gap: 16 }}>
          {EVENTS.map((ev, i) => (
            <div key={ev.id} className="card" style={{ padding: 0, display: "grid",
                                                        gridTemplateColumns: "200px 1fr auto",
                                                        overflow: "hidden" }}>
              {/* Date block */}
              <div style={{
                background: i === 0 ? "linear-gradient(135deg, var(--blue-700), var(--blue-500))"
                                    : "var(--blue-50)",
                color: i === 0 ? "white" : "var(--blue-700)",
                padding: 24, display: "flex", flexDirection: "column", justifyContent: "center",
              }}>
                <div className="mono" style={{ fontSize: 12, opacity: 0.7,
                                                letterSpacing: "0.06em" }}>
                  {new Date(ev.tanggal).toLocaleDateString("id-ID", { weekday: "long" }).toUpperCase()}
                </div>
                <div className="display" style={{ fontSize: 56, fontWeight: 500, lineHeight: 1,
                                                    letterSpacing: "-0.04em" }}>
                  {new Date(ev.tanggal).getDate()}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase",
                              letterSpacing: "0.04em", marginTop: 4 }}>
                  {new Date(ev.tanggal).toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                </div>
                <div className="mono" style={{ fontSize: 11, opacity: 0.7, marginTop: 12 }}>
                  ⌚ {ev.waktu}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: 24 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <span className="pill">{ev.kategori}</span>
                  {i === 0 && <span className="pill pill-gold">Featured</span>}
                </div>
                <h3 className="display" style={{ fontSize: 24, fontWeight: 500, margin: 0,
                                                  letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                  {ev.judul}
                </h3>
                <p style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 8, lineHeight: 1.55 }}>
                  {ev.deskripsi}
                </p>
                <div style={{ display: "flex", gap: 24, marginTop: 16, fontSize: 13 }}>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>Lokasi</div>
                    <div style={{ fontWeight: 500 }}>📍 {ev.lokasi}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>Pemateri</div>
                    <div style={{ fontWeight: 500 }}>{ev.pemateri}</div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div style={{ padding: 24, display: "flex", flexDirection: "column",
                            gap: 12, justifyContent: "center", minWidth: 200,
                            borderLeft: "1px solid var(--line)", background: "var(--bg)" }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>Kuota</div>
                  <div className="mono" style={{ fontSize: 13, fontWeight: 600 }}>
                    {ev.peserta} / {ev.kuota}
                  </div>
                  <Progress value={ev.peserta} max={ev.kuota} color="var(--gold-500)" />
                </div>
                <button className="btn btn-primary btn-sm" style={{ justifyContent: "center" }}>
                  Daftar Hadir →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}

// === Donasi Page ===
function Donasi() {
  const [selectedAmount, setSelectedAmount] = React.useState(100000);
  const [customAmt, setCustomAmt] = React.useState("");
  const presets = [50000, 100000, 250000, 500000, 1000000];
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(180deg, var(--gold-100), var(--bg))",
                    padding: "64px 32px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="pill pill-gold" style={{ marginBottom: 12 }}>DONASI · WAKAF · INFAQ</div>
          <h1 className="display" style={{ fontSize: 56, fontWeight: 500, margin: 0,
                                            letterSpacing: "-0.03em" }}>
            Donasi &amp; program sosial
          </h1>
          <p style={{ fontSize: 17, color: "var(--ink-soft)", marginTop: 12, maxWidth: 620 }}>
            Salurkan kontribusi anda — beasiswa anak alumni, pembangunan sekretariat,
            hingga respon kemanusiaan. Setiap rupiah dikelola transparan.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 32px",
                    display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32 }}>
        {/* Programs */}
        <div style={{ display: "grid", gap: 16 }}>
          {DONASI_PROGRAM.map((p, i) => (
            <div key={i} className="card" style={{ padding: 24 }}>
              <div style={{ display: "flex", gap: 16, alignItems: "start" }}>
                <div style={{ width: 56, height: 56, borderRadius: 12,
                              background: "var(--gold-100)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: "var(--gold-700)", fontSize: 24, flexShrink: 0 }}>
                  {["✶", "◇", "◈"][i]}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 className="display" style={{ fontSize: 22, fontWeight: 500, margin: 0,
                                                    letterSpacing: "-0.02em" }}>
                    {p.judul}
                  </h3>
                  <div style={{ display: "flex", gap: 18, marginTop: 14, fontSize: 13 }}>
                    <div>
                      <div style={{ color: "var(--muted)", fontSize: 11 }}>Terkumpul</div>
                      <div className="mono" style={{ fontWeight: 600, color: "var(--blue-700)" }}>
                        {rupiah(p.terkumpul)}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: "var(--muted)", fontSize: 11 }}>Target</div>
                      <div className="mono" style={{ fontWeight: 600 }}>{rupiah(p.target)}</div>
                    </div>
                    <div>
                      <div style={{ color: "var(--muted)", fontSize: 11 }}>Donatur</div>
                      <div className="mono" style={{ fontWeight: 600 }}>{p.donatur} orang</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <Progress value={p.terkumpul} max={p.target} color="var(--gold-500)" height={10} />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6,
                                  fontSize: 11, color: "var(--ink-soft)" }}>
                      <span>{Math.round((p.terkumpul / p.target) * 100)}% tercapai</span>
                      <span>Deadline: {p.deadline}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Donasi widget */}
        <div className="card" style={{ padding: 28, height: "fit-content", position: "sticky", top: 100 }}>
          <div className="pill" style={{ marginBottom: 12 }}>QUICK DONATE</div>
          <h3 className="display" style={{ fontSize: 24, fontWeight: 500, margin: 0 }}>
            Berapa yang ingin anda donasikan?
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 20 }}>
            {presets.map(n => (
              <button key={n} onClick={() => { setSelectedAmount(n); setCustomAmt(""); }}
                       style={{
                         padding: "12px 8px", borderRadius: 10,
                         border: selectedAmount === n && !customAmt
                                  ? "1.5px solid var(--blue-700)" : "1px solid var(--line)",
                         background: selectedAmount === n && !customAmt
                                      ? "var(--blue-50)" : "white",
                         color: selectedAmount === n && !customAmt
                                  ? "var(--blue-700)" : "var(--ink)",
                         fontWeight: 600, fontSize: 13, fontFamily: "inherit", cursor: "pointer"
                       }}>
                {n >= 1000000 ? `${n/1000000}jt` : `${n/1000}rb`}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 6 }}>Atau nominal lain</div>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                              color: "var(--ink-soft)", fontWeight: 600 }}>Rp</span>
              <input value={customAmt} onChange={e => { setCustomAmt(e.target.value.replace(/\D/g, ""));
                                                          setSelectedAmount(0); }}
                      placeholder="0"
                      style={{ width: "100%", padding: "12px 16px 12px 40px",
                                border: "1px solid var(--line)", borderRadius: 10,
                                fontSize: 14, background: "white", fontFamily: "var(--font-mono)" }} />
            </div>
          </div>
          <select style={{ ...selectStyle, width: "100%", marginTop: 12 }}>
            <option>Beasiswa Anak Alumni Kurang Mampu</option>
            <option>Pembangunan Sekretariat Bersama</option>
            <option>Bantuan Bencana &amp; Kemanusiaan</option>
          </select>
          <input placeholder="Nama (opsional, untuk hamba Allah kosongkan)"
                  style={{ width: "100%", padding: "12px 16px", marginTop: 12,
                            border: "1px solid var(--line)", borderRadius: 10,
                            fontSize: 14, background: "white" }} />
          <button className="btn btn-accent" style={{ width: "100%", justifyContent: "center",
                                                       marginTop: 14, padding: "14px 16px", fontSize: 15 }}>
            Lanjutkan Donasi →
          </button>
          <div style={{ marginTop: 16, padding: 12, background: "var(--blue-50)",
                        borderRadius: 8, fontSize: 11, color: "var(--blue-700)", lineHeight: 1.5 }}>
            🔒 Transaksi dikelola oleh Bendahara Cabang. Laporan keuangan
            dipublikasikan tiap bulan di laman <strong>Transparansi</strong>.
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}

// === Tentang ===
function Tentang() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div style={{ background: "white", borderBottom: "1px solid var(--line)",
                    padding: "64px 32px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="pill" style={{ marginBottom: 12 }}>TENTANG</div>
          <h1 className="display" style={{ fontSize: 56, fontWeight: 500, margin: 0,
                                            letterSpacing: "-0.03em", maxWidth: 720 }}>
            Tentang Ikatan Alumni PMII Kediri Raya
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "64px 32px" }}>
        <div style={{ fontSize: 22, lineHeight: 1.5, color: "var(--ink)",
                      fontFamily: "var(--font-display)", fontWeight: 400,
                      borderLeft: "3px solid var(--gold-500)", paddingLeft: 24 }}>
          "Pendataan bukan sekadar administrasi — ia adalah cara organisasi
          menghormati jejak setiap kader yang pernah ditempa."
        </div>

        <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <h3 className="display" style={{ fontSize: 28, fontWeight: 500,
                                              letterSpacing: "-0.02em" }}>
              Visi
            </h3>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--ink-soft)" }}>
              Menjadi simpul konsolidasi alumni PMII Kediri Raya yang aktif merawat
              jejaring, berkontribusi pada kemaslahatan masyarakat, dan menjaga
              estafet gerakan keislaman-keindonesiaan.
            </p>
          </div>
          <div>
            <h3 className="display" style={{ fontSize: 28, fontWeight: 500,
                                              letterSpacing: "-0.02em" }}>
              Misi
            </h3>
            <ul style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-soft)",
                          paddingLeft: 20, margin: 0 }}>
              <li>Memetakan sebaran &amp; potensi alumni secara digital.</li>
              <li>Memfasilitasi kolaborasi lintas profesi &amp; sektor.</li>
              <li>Mengelola program sosial, beasiswa, dan kemanusiaan.</li>
              <li>Merawat silaturahmi lintas angkatan.</li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 64, padding: 32, background: "var(--blue-900)",
                      color: "white", borderRadius: 16, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3,
                        background: "var(--gold-500)" }} />
          <div className="pill pill-gold" style={{ marginBottom: 16 }}>STRUKTUR PENGURUS</div>
          <h3 className="display" style={{ fontSize: 32, fontWeight: 500, margin: 0,
                                            letterSpacing: "-0.02em" }}>
            Periode 2024–2027
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 24 }}>
            {[
              { jabatan: "Ketua Umum", nama: "Dr. H. Abdullah Faqih" },
              { jabatan: "Sekretaris", nama: "Lailatul Maghfiroh, M.A" },
              { jabatan: "Bendahara", nama: "Nur Aisyah Rahmawati" },
              { jabatan: "Koord. Pendataan", nama: "Muhammad Iqbal Hakim" },
            ].map(p => (
              <div key={p.jabatan} style={{ background: "rgba(255,255,255,0.05)",
                                              padding: 16, borderRadius: 12,
                                              border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 11, color: "var(--gold-500)",
                              letterSpacing: "0.05em", textTransform: "uppercase",
                              fontWeight: 600 }}>
                  {p.jabatan}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 6 }}>{p.nama}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}

Object.assign(window, { Direktori, Kegiatan, Donasi, Tentang });
