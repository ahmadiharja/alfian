// Admin: Detail Alumni, Form, Events, Donasi, Verifikasi, Pengaturan

// === Alumni Detail Drawer ===
function AlumniDetail({ alumni, onClose, onEdit }) {
  if (!alumni) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.4)",
                  zIndex: 100, display: "flex", justifyContent: "flex-end" }}
          onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
            style={{ width: "min(720px, 100%)", background: "var(--bg)",
                      height: "100%", overflowY: "auto",
                      boxShadow: "var(--shadow-lg)" }}>
        {/* Header */}
        <div style={{ background: "var(--blue-900)", color: "white", padding: "24px 32px",
                       position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3,
                         background: "var(--gold-500)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--gold-300)",
                                            letterSpacing: "0.05em" }}>
              {alumni.id}
            </div>
            <button onClick={onClose}
                     style={{ background: "rgba(255,255,255,0.1)", border: "none",
                              color: "white", width: 32, height: 32, borderRadius: 8,
                              cursor: "pointer", fontSize: 18 }}>
              ✕
            </button>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 16, alignItems: "center" }}>
            <Avatar initials={alumni.foto} size={72} color="var(--gold-500)" />
            <div>
              <h2 className="display" style={{ fontSize: 28, fontWeight: 500, margin: 0,
                                                letterSpacing: "-0.02em" }}>
                {alumni.nama}
              </h2>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
                {alumni.jabatan} · Angkatan {alumni.angkatan}
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                <span className="pill pill-gold" style={{ fontSize: 11 }}>Aktif</span>
                <span className="pill" style={{ background: "rgba(255,255,255,0.1)",
                                                  color: "white", fontSize: 11 }}>
                  Diverifikasi
                </span>
                <span className="pill" style={{ background: "rgba(255,255,255,0.1)",
                                                  color: "white", fontSize: 11 }}>
                  Data Lengkap
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            <button onClick={onEdit} className="btn btn-accent btn-sm">✎ Edit Data</button>
            <button className="btn btn-ghost btn-sm"
                     style={{ background: "rgba(255,255,255,0.08)", color: "white",
                              borderColor: "rgba(255,255,255,0.15)" }}>
              📧 Kirim Pesan
            </button>
            <button className="btn btn-ghost btn-sm"
                     style={{ background: "rgba(255,255,255,0.08)", color: "white",
                              borderColor: "rgba(255,255,255,0.15)" }}>
              ⬇ Export Profil
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: 28 }}>
          {/* Quick info */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            <Mini label="Status Kader" value="Mu'tabar" />
            <Mini label="Kontribusi" value="14 kegiatan" />
            <Mini label="Donasi Total" value="Rp 1.85jt" />
          </div>

          {/* Biodata */}
          <Section title="Biodata Pribadi" icon="◉">
            <KV k="Nama Lengkap" v={alumni.nama} />
            <KV k="NIA / ID" v={alumni.id} />
            <KV k="Tempat, Tgl Lahir" v="Kediri, 14 Maret 1996" />
            <KV k="Jenis Kelamin" v="Laki-laki" />
            <KV k="NIK" v="3506••••••0014" mask />
            <KV k="No. HP" v="0852-1234-•••8" mask />
            <KV k="Email" v="ahmad.fauzi@email.com" />
            <KV k="Alamat" v={`${alumni.kecamatan}, ${alumni.wilayah}, Jawa Timur`} />
          </Section>

          {/* Pendidikan */}
          <Section title="Riwayat Pendidikan" icon="◍">
            <KV k="Kampus" v={alumni.kampus} />
            <KV k="Fakultas / Jurusan" v={`Tarbiyah · ${alumni.jurusan}`} />
            <KV k="Angkatan / Tahun Masuk" v={alumni.angkatan} />
            <KV k="Tahun Lulus" v={alumni.angkatan + 4} />
            <KV k="IPK / Predikat" v="3.74 (Cumlaude)" />
            <KV k="Pendidikan Akhir" v="S1" />
          </Section>

          {/* PMII */}
          <Section title="Keorganisasian PMII" icon="◇">
            <KV k="Komisariat" v="PMII Komisariat IAIN Kediri" />
            <KV k="Cabang" v="PMII Cabang Kota Kediri" />
            <KV k="Jabatan Tertinggi" v="Ketua Rayon Tarbiyah" />
            <KV k="Status MAPABA" v="Lulus · 2018" />
            <KV k="Status PKD" v="Lulus · 2019" />
            <KV k="Status PKL" v="Lulus · 2020" />
            <KV k="Status PKN" v="Belum" />
          </Section>

          {/* Status Keluarga */}
          <Section title="Status Keluarga" icon="◈">
            <KV k="Status Pernikahan" v={alumni.status} />
            <KV k="Nama Pasangan" v="Khoirun Nisa Salsabila" />
            <KV k="Jumlah Anak" v={`${alumni.anak} anak`} />
            <KV k="Tanggungan" v={`${alumni.anak + 1} orang`} />
            <KV k="Ayah" v="H. Mansyur (Alm)" />
            <KV k="Ibu" v="Hj. Siti Maesaroh" />
          </Section>

          {/* Pekerjaan */}
          <Section title="Pekerjaan & Karir" icon="◆">
            <KV k="Pekerjaan Utama" v={alumni.pekerjaan} />
            <KV k="Jabatan" v={alumni.jabatan} />
            <KV k="Instansi" v="MTs Negeri 2 Kediri" />
            <KV k="Alamat Instansi" v="Jl. Sunan Ampel, Mojoroto" />
            <KV k="Lama Bekerja" v="4 tahun" />
            <KV k="Pendapatan" v="Rp 4.5 – 6jt /bulan" mask />
          </Section>

          {/* Sosial */}
          <Section title="Sosial & Aktivitas" icon="✦">
            <KV k="Aktivitas Sosial" v="Pengurus Takmir Masjid Al-Falah" />
            <KV k="Organisasi Lain" v="NU Ranting Mojoroto · Karang Taruna" />
            <KV k="Keahlian" v="Tahfidz · Public Speaking · Mengajar" />
            <KV k="Minat Kontribusi" v="Pendidikan · Keagamaan · Sosial" />
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8,
                       background: "var(--blue-700)", color: "var(--gold-500)",
                       display: "flex", alignItems: "center", justifyContent: "center",
                       fontSize: 14 }}>
          {icon}
        </div>
        <h3 className="display" style={{ fontSize: 17, fontWeight: 600, margin: 0,
                                          letterSpacing: "-0.01em" }}>
          {title}
        </h3>
      </div>
      <div className="card" style={{ padding: 4 }}>
        <div style={{ display: "grid", gap: 0 }}>{children}</div>
      </div>
    </div>
  );
}
function KV({ k, v, mask }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 16,
                  padding: "10px 16px", borderBottom: "1px solid var(--line-soft)",
                  fontSize: 13, alignItems: "baseline" }}>
      <span style={{ color: "var(--ink-soft)" }}>{k}</span>
      <span style={{ color: "var(--ink)", fontWeight: 500 }}>
        {v} {mask && <span className="pill" style={{ fontSize: 9, marginLeft: 6 }}>🔒 SENSITIF</span>}
      </span>
    </div>
  );
}
function Mini({ label, value }) {
  return (
    <div style={{ padding: 14, background: "white", border: "1px solid var(--line)",
                  borderRadius: 10 }}>
      <div style={{ fontSize: 10, color: "var(--ink-soft)", letterSpacing: "0.06em",
                    textTransform: "uppercase", fontWeight: 700 }}>
        {label}
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, marginTop: 6 }}>{value}</div>
    </div>
  );
}

// === Form: Add/Edit Alumni ===
function AlumniForm({ onClose }) {
  const [step, setStep] = React.useState(0);
  const steps = ["Biodata", "Pendidikan", "PMII", "Keluarga", "Karir", "Sosial"];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.45)",
                  zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center",
                  padding: 32 }}
          onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
            style={{ width: "min(860px, 100%)", maxHeight: "92vh",
                      background: "white", borderRadius: 16,
                      boxShadow: "var(--shadow-lg)", overflow: "hidden",
                      display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--line)",
                       display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <h2 className="display" style={{ fontSize: 22, fontWeight: 500, margin: 0,
                                              letterSpacing: "-0.02em" }}>
              Tambah Data Alumni
            </h2>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>
              Langkah {step + 1} dari {steps.length} · {steps[step]}
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm">✕</button>
        </div>

        {/* Stepper */}
        <div style={{ padding: "16px 28px", borderBottom: "1px solid var(--line)",
                      background: "var(--bg)", display: "flex", gap: 4 }}>
          {steps.map((s, i) => (
            <div key={s} onClick={() => setStep(i)} style={{ flex: 1, cursor: "pointer" }}>
              <div style={{ height: 4, borderRadius: 99,
                             background: i <= step ? "var(--blue-700)" : "var(--line)" }} />
              <div style={{ fontSize: 11, marginTop: 6, fontWeight: 600,
                             color: i === step ? "var(--blue-700)" : i < step ? "var(--ink)" : "var(--muted)" }}>
                {i + 1}. {s}
              </div>
            </div>
          ))}
        </div>

        {/* Form fields */}
        <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
          {step === 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr", gap: 16 }}>
              <div style={{ gridRow: "span 4" }}>
                <PhotoSlot height={140} label="foto 3x4" />
                <button className="btn btn-ghost btn-sm" style={{ marginTop: 8, width: "100%",
                                                                    justifyContent: "center" }}>
                  ⬆ Upload
                </button>
              </div>
              <Field label="Nama Lengkap" placeholder="Sesuai KTP" required />
              <Field label="NIA / Nomor Induk" placeholder="PMII-K-2024-0XXX" mono />
              <Field label="Tempat Lahir" />
              <Field label="Tanggal Lahir" type="date" />
              <Field label="Jenis Kelamin" type="select" options={["Laki-laki", "Perempuan"]} />
              <Field label="NIK" placeholder="16 digit" mono />
              <Field label="No. HP / WhatsApp" placeholder="08xx-xxxx-xxxx" />
              <Field label="Email" placeholder="nama@email.com" />
              <Field label="Alamat Domisili" full type="textarea" />
              <Field label="Wilayah" type="select" options={["Kota Kediri", "Kab. Kediri"]} />
              <Field label="Kecamatan" type="select" options={KECAMATAN_KOTA.map(k=>k.nama).concat(KECAMATAN_KAB.map(k=>k.nama))} />
              <Field label="Kelurahan / Desa" />
            </div>
          )}
          {step === 1 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Kampus / Universitas" type="select" options={UNIVERSITAS.map(u=>u.nama)} full />
              <Field label="Fakultas" />
              <Field label="Jurusan / Prodi" type="select" options={JURUSAN.map(j=>j.nama)} />
              <Field label="Angkatan / Tahun Masuk" type="number" />
              <Field label="Tahun Lulus" type="number" />
              <Field label="IPK" type="number" />
              <Field label="Predikat" type="select" options={["Memuaskan", "Sangat Memuaskan", "Cumlaude"]} />
              <Field label="Pendidikan Terakhir" type="select" options={["S1","S2","S3"]} />
              <Field label="Sedang Studi Lanjut?" type="select" options={["Tidak","Ya - S2","Ya - S3"]} />
            </div>
          )}
          {step === 2 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Komisariat" full />
              <Field label="Cabang PMII" type="select" options={["Kota Kediri", "Kab. Kediri"]} />
              <Field label="Rayon" />
              <Field label="Jabatan Tertinggi" />
              <Field label="Status MAPABA" type="select" options={["Belum", "Lulus"]} />
              <Field label="Tahun MAPABA" type="number" />
              <Field label="Status PKD" type="select" options={["Belum", "Lulus"]} />
              <Field label="Status PKL" type="select" options={["Belum", "Lulus"]} />
              <Field label="Status PKN" type="select" options={["Belum", "Lulus"]} />
            </div>
          )}
          {step === 3 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Status Pernikahan" type="select"
                      options={["Belum Menikah","Menikah","Cerai","Duda/Janda"]} full />
              <Field label="Nama Pasangan" />
              <Field label="Pekerjaan Pasangan" />
              <Field label="Jumlah Anak" type="number" />
              <Field label="Tanggungan" type="number" />
              <Field label="Nama Ayah" />
              <Field label="Nama Ibu" />
              <Field label="Pekerjaan Orang Tua" />
            </div>
          )}
          {step === 4 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Pekerjaan Utama" type="select" options={PEKERJAAN.map(p=>p.nama)} full />
              <Field label="Jabatan" />
              <Field label="Instansi / Perusahaan" />
              <Field label="Alamat Instansi" full />
              <Field label="Lama Bekerja" />
              <Field label="Estimasi Pendapatan/bln" type="select"
                      options={["< 3jt","3 - 5jt","5 - 10jt","10 - 20jt","> 20jt","Memilih tidak menjawab"]} />
              <Field label="Pekerjaan Sampingan" full />
            </div>
          )}
          {step === 5 && (
            <div style={{ display: "grid", gap: 16 }}>
              <Field label="Aktivitas Sosial / Keagamaan" full type="textarea" />
              <Field label="Organisasi Lain" full />
              <Field label="Keahlian / Skill" full
                      placeholder="Pisahkan dengan koma: public speaking, IT, dll" />
              <Field label="Minat Kontribusi Alumni" full type="checkbox"
                      options={["Pendidikan","Keagamaan","Ekonomi/UMKM","Sosial-Kemanusiaan","Politik","Jurnalistik","Lingkungan"]} />
              <Field label="Bersedia menjadi mentor untuk junior?" type="select"
                      options={["Ya","Tidak","Tergantung topik"]} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 28px", borderTop: "1px solid var(--line)",
                       background: "var(--bg)", display: "flex", justifyContent: "space-between",
                       alignItems: "center" }}>
          <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>
            💾 Disimpan otomatis sebagai draft
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="btn btn-ghost btn-sm">
                ← Kembali
              </button>
            )}
            {step < steps.length - 1 ? (
              <button onClick={() => setStep(step + 1)} className="btn btn-primary btn-sm">
                Lanjut →
              </button>
            ) : (
              <button className="btn btn-accent btn-sm">✓ Simpan Data Alumni</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, type = "text", options, full, required, mono }) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : undefined }}>
      <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 6, fontWeight: 600 }}>
        {label} {required && <span style={{ color: "oklch(0.6 0.2 25)" }}>*</span>}
      </div>
      {type === "select" ? (
        <select style={{ ...selectStyle, width: "100%", padding: "10px 14px", fontSize: 13 }}>
          <option value="">Pilih...</option>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea placeholder={placeholder} rows={3}
                   style={{ width: "100%", padding: "10px 14px",
                             border: "1px solid var(--line)", borderRadius: 8,
                             fontSize: 13, fontFamily: "inherit", resize: "vertical" }} />
      ) : type === "checkbox" ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {options.map(o => (
            <label key={o} style={{ display: "flex", alignItems: "center", gap: 6,
                                     padding: "6px 12px", border: "1px solid var(--line)",
                                     borderRadius: 99, fontSize: 12, fontWeight: 500,
                                     cursor: "pointer", background: "white" }}>
              <input type="checkbox" />
              {o}
            </label>
          ))}
        </div>
      ) : (
        <input type={type} placeholder={placeholder}
                style={{ width: "100%", padding: "10px 14px",
                          border: "1px solid var(--line)", borderRadius: 8,
                          fontSize: 13, fontFamily: mono ? "var(--font-mono)" : "inherit" }} />
      )}
    </div>
  );
}

Object.assign(window, { AlumniDetail, AlumniForm });
