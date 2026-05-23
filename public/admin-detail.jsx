// Admin: Detail Alumni, Form, Confirm Modal

// === Alumni Detail Drawer ===
function AlumniDetail({ alumni, onClose, onEdit, onDelete }) {
  if (!alumni) return null;
  const nama = alumni.namaLengkap || alumni.nama || "?";
  const initials = nama.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.4)",
                  zIndex: 100, display: "flex", justifyContent: "flex-end" }}
          onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
            style={{ width: "min(720px, 100%)", background: "var(--bg)",
                      height: "100%", overflowY: "auto", boxShadow: "var(--shadow-lg)" }}>

        {/* Header */}
        <div style={{ background: "var(--blue-900)", color: "white", padding: "24px 32px", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--gold-500)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--gold-300)", letterSpacing: "0.05em" }}>
              {alumni.nia || alumni.id}
            </div>
            <button onClick={onClose}
                     style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white",
                              width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 18 }}>
              ✕
            </button>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 16, alignItems: "center" }}>
            <Avatar initials={initials} size={72} color="var(--gold-500)" />
            <div>
              <h2 className="display" style={{ fontSize: 28, fontWeight: 500, margin: 0, letterSpacing: "-0.02em" }}>
                {nama}
              </h2>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
                {alumni.jabatan || "-"} · Angkatan {alumni.angkatan || "-"}
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                <span className="pill pill-gold" style={{ fontSize: 11 }}>
                  {alumni.statusAktif !== false ? "Aktif" : "Nonaktif"}
                </span>
                <span className="pill" style={{ background: "rgba(255,255,255,0.1)", color: "white", fontSize: 11 }}>
                  {alumni.statusVerifikasi === "verified" ? "✓ Terverifikasi" : (alumni.statusVerifikasi || "Pending")}
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            <button onClick={onEdit} className="btn btn-accent btn-sm">✎ Edit Data</button>
            <button onClick={onDelete} className="btn btn-ghost btn-sm"
                     style={{ background: "rgba(220,38,38,0.15)", color: "#fca5a5", borderColor: "rgba(220,38,38,0.3)" }}>
              🗑 Hapus
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: 28 }}>
          <Section title="Biodata Pribadi" icon="◉">
            <KV k="Nama Lengkap" v={alumni.namaLengkap} />
            <KV k="NIA" v={alumni.nia} />
            <KV k="Tempat Lahir" v={alumni.tempatLahir} />
            <KV k="Tanggal Lahir" v={alumni.tanggalLahir ? new Date(alumni.tanggalLahir).toLocaleDateString('id-ID') : null} />
            <KV k="Jenis Kelamin" v={alumni.jenisKelamin} />
            <KV k="NIK" v={alumni.nik} mask />
            <KV k="No. HP" v={alumni.noHp} mask />
            <KV k="Email" v={alumni.email} />
            <KV k="Alamat" v={alumni.alamat} />
            <KV k="Wilayah" v={[alumni.kelurahan, alumni.kecamatan, alumni.wilayah].filter(Boolean).join(', ')} />
          </Section>

          <Section title="Riwayat Pendidikan" icon="◍">
            <KV k="Kampus" v={alumni.kampus} />
            <KV k="Fakultas" v={alumni.fakultas} />
            <KV k="Jurusan" v={alumni.jurusan} />
            <KV k="Angkatan" v={alumni.angkatan} />
            <KV k="Tahun Lulus" v={alumni.tahunLulus} />
            <KV k="IPK" v={alumni.ipk} />
            <KV k="Predikat" v={alumni.predikat} />
            <KV k="Pendidikan Akhir" v={alumni.pendidikanAkhir} />
          </Section>

          <Section title="Keorganisasian PMII" icon="◇">
            <KV k="Komisariat" v={alumni.komisariat} />
            <KV k="Cabang" v={alumni.cabang} />
            <KV k="Rayon" v={alumni.rayon} />
            <KV k="Jabatan Tertinggi" v={alumni.jabatanTertinggi} />
            <KV k="Status MAPABA" v={alumni.statusMapaba ? `Lulus${alumni.tahunMapaba ? ' · ' + alumni.tahunMapaba : ''}` : 'Belum'} />
            <KV k="Status PKD" v={alumni.statusPkd ? 'Lulus' : 'Belum'} />
            <KV k="Status PKL" v={alumni.statusPkl ? 'Lulus' : 'Belum'} />
            <KV k="Status PKN" v={alumni.statusPkn ? 'Lulus' : 'Belum'} />
          </Section>

          <Section title="Status Keluarga" icon="◈">
            <KV k="Status Pernikahan" v={alumni.statusPernikahan} />
            <KV k="Nama Pasangan" v={alumni.namaPasangan} />
            <KV k="Pekerjaan Pasangan" v={alumni.pekerjaanPasangan} />
            <KV k="Jumlah Anak" v={alumni.jumlahAnak} />
            <KV k="Tanggungan" v={alumni.tanggungan} />
            <KV k="Nama Ayah" v={alumni.namaAyah} />
            <KV k="Nama Ibu" v={alumni.namaIbu} />
            <KV k="Pekerjaan Orang Tua" v={alumni.pekerjaanOrangTua} />
          </Section>

          <Section title="Pekerjaan & Karir" icon="◆">
            <KV k="Pekerjaan Utama" v={alumni.pekerjaanUtama} />
            <KV k="Jabatan" v={alumni.jabatan} />
            <KV k="Instansi" v={alumni.instansi} />
            <KV k="Alamat Instansi" v={alumni.alamatInstansi} />
            <KV k="Lama Bekerja" v={alumni.lamaBekerja} />
            <KV k="Estimasi Pendapatan" v={alumni.estimasiPendapatan} mask />
          </Section>

          <Section title="Sosial & Aktivitas" icon="✦">
            <KV k="Aktivitas Sosial" v={alumni.aktivitasSosial} />
            <KV k="Organisasi Lain" v={alumni.organisasiLain} />
            <KV k="Keahlian" v={alumni.keahlian} />
            <KV k="Minat Kontribusi" v={alumni.minatKontribusi} />
            <KV k="Bersedia Mentor" v={alumni.bersediaMentor ? 'Ya' : 'Tidak'} />
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
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--blue-700)",
                       color: "var(--gold-500)", display: "flex", alignItems: "center",
                       justifyContent: "center", fontSize: 14 }}>
          {icon}
        </div>
        <h3 className="display" style={{ fontSize: 17, fontWeight: 600, margin: 0, letterSpacing: "-0.01em" }}>
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
      <span style={{ color: v != null && v !== "" ? "var(--ink)" : "var(--muted)", fontWeight: 500 }}>
        {v != null && v !== "" ? String(v) : "—"}
        {mask && v && <span className="pill" style={{ fontSize: 9, marginLeft: 6 }}>🔒</span>}
      </span>
    </div>
  );
}

// === Confirm Modal ===
function ConfirmModal({ title, message, onConfirm, onCancel, loading, danger }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200,
                  display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div className="card" style={{ width: "min(420px, 100%)", padding: 28 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{title}</h3>
        <p style={{ margin: "12px 0 24px", color: "var(--ink-soft)", fontSize: 14 }}>{message}</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={onCancel} className="btn btn-ghost btn-sm" disabled={loading}>Batal</button>
          <button onClick={onConfirm} disabled={loading}
                   style={{ padding: "8px 16px", border: "none", borderRadius: 8, cursor: "pointer",
                             fontFamily: "inherit", fontSize: 13, fontWeight: 600,
                             background: danger ? "oklch(0.55 0.2 25)" : "var(--blue-700)", color: "white" }}>
            {loading ? "Memproses..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}

// === Form: Add/Edit Alumni ===
function AlumniForm({ onClose, editData, onSuccess }) {
  const isEdit = !!editData;
  const [step, setStep] = React.useState(0);
  const steps = ["Biodata", "Pendidikan", "PMII", "Keluarga", "Karir", "Sosial"];
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState('');

  const [fd, setFd] = React.useState(() => ({
    namaLengkap: '', nia: '', tempatLahir: '', tanggalLahir: '', jenisKelamin: '',
    nik: '', noHp: '', email: '', alamat: '', wilayah: '', kecamatan: '', kelurahan: '',
    kampus: '', fakultas: '', jurusan: '', angkatan: '', tahunLulus: '', ipk: '',
    predikat: '', pendidikanAkhir: '', sedangStudiLanjut: false,
    komisariat: '', cabang: '', rayon: '', jabatanTertinggi: '',
    statusMapaba: false, tahunMapaba: '', statusPkd: false, statusPkl: false, statusPkn: false,
    statusPernikahan: '', namaPasangan: '', pekerjaanPasangan: '',
    jumlahAnak: '', tanggungan: '', namaAyah: '', namaIbu: '', pekerjaanOrangTua: '',
    pekerjaanUtama: '', jabatan: '', instansi: '', alamatInstansi: '',
    lamaBekerja: '', estimasiPendapatan: '', pekerjaanSampingan: '',
    aktivitasSosial: '', organisasiLain: '', keahlian: '', minatKontribusi: '', bersediaMentor: false,
    ...(editData || {}),
    tanggalLahir: editData && editData.tanggalLahir
      ? new Date(editData.tanggalLahir).toISOString().split('T')[0]
      : '',
  }));

  const set = (name, value) => setFd(prev => ({ ...prev, [name]: value }));

  async function handleSubmit() {
    if (!fd.namaLengkap.trim()) { setError('Nama Lengkap wajib diisi'); setStep(0); return; }
    if (!fd.nia.trim()) { setError('NIA wajib diisi'); setStep(0); return; }
    setSaving(true);
    setError('');
    try {
      const payload = { ...fd };
      if (payload.angkatan) payload.angkatan = parseInt(payload.angkatan);
      if (payload.tahunLulus) payload.tahunLulus = parseInt(payload.tahunLulus);
      if (payload.tahunMapaba) payload.tahunMapaba = parseInt(payload.tahunMapaba);
      if (payload.ipk) payload.ipk = parseFloat(payload.ipk);
      if (payload.jumlahAnak) payload.jumlahAnak = parseInt(payload.jumlahAnak);
      if (payload.tanggungan) payload.tanggungan = parseInt(payload.tanggungan);
      if (!payload.tanggalLahir) delete payload.tanggalLahir;

      if (isEdit) {
        await AlumniAPI.update(editData.id, payload);
      } else {
        await AlumniAPI.create(payload);
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  // Inner controlled field component
  function CF({ label, name, placeholder, type = "text", options, full, required, mono }) {
    const val = fd[name];
    const strVal = val == null ? '' : String(val);

    if (type === "boolean-select") {
      return (
        <div style={{ gridColumn: full ? "1 / -1" : undefined }}>
          <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 6, fontWeight: 600 }}>{label}</div>
          <select value={val ? 'Lulus' : 'Belum'}
                   onChange={e => set(name, e.target.value === 'Lulus')}
                   style={{ ...selectStyle, width: "100%", padding: "10px 14px", fontSize: 13 }}>
            <option>Belum</option>
            <option>Lulus</option>
          </select>
        </div>
      );
    }
    return (
      <div style={{ gridColumn: full ? "1 / -1" : undefined }}>
        <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 6, fontWeight: 600 }}>
          {label} {required && <span style={{ color: "oklch(0.6 0.2 25)" }}>*</span>}
        </div>
        {type === "select" ? (
          <select value={strVal} onChange={e => set(name, e.target.value)}
                   style={{ ...selectStyle, width: "100%", padding: "10px 14px", fontSize: 13 }}>
            <option value="">Pilih...</option>
            {(options || []).map(o => <option key={o}>{o}</option>)}
          </select>
        ) : type === "textarea" ? (
          <textarea value={strVal} onChange={e => set(name, e.target.value)}
                     placeholder={placeholder} rows={3}
                     style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--line)",
                               borderRadius: 8, fontSize: 13, fontFamily: "inherit", resize: "vertical" }} />
        ) : (
          <input type={type} value={strVal} onChange={e => set(name, e.target.value)}
                  placeholder={placeholder}
                  style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--line)",
                            borderRadius: 8, fontSize: 13,
                            fontFamily: mono ? "var(--font-mono)" : "inherit" }} />
        )}
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.45)",
                  zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}
          onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
            style={{ width: "min(860px, 100%)", maxHeight: "92vh", background: "white",
                      borderRadius: 16, boxShadow: "var(--shadow-lg)", overflow: "hidden",
                      display: "flex", flexDirection: "column" }}>

        {/* Modal header */}
        <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--line)",
                       display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <h2 className="display" style={{ fontSize: 22, fontWeight: 500, margin: 0, letterSpacing: "-0.02em" }}>
              {isEdit ? 'Edit Data Alumni' : 'Tambah Data Alumni'}
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

        {/* Fields */}
        <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
          {error && (
            <div style={{ padding: "10px 14px", background: "#fef2f2", border: "1px solid #fecaca",
                           borderRadius: 8, color: "#dc2626", fontSize: 13, marginBottom: 16 }}>
              {error}
            </div>
          )}
          {step === 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <CF label="Nama Lengkap" name="namaLengkap" placeholder="Sesuai KTP" required full />
              <CF label="NIA / Nomor Induk" name="nia" placeholder="PMII-K-2024-0XXX" mono required />
              <CF label="Tempat Lahir" name="tempatLahir" />
              <CF label="Tanggal Lahir" name="tanggalLahir" type="date" />
              <CF label="Jenis Kelamin" name="jenisKelamin" type="select" options={["Laki-laki", "Perempuan"]} />
              <CF label="NIK" name="nik" placeholder="16 digit" mono />
              <CF label="No. HP / WhatsApp" name="noHp" placeholder="08xx-xxxx-xxxx" />
              <CF label="Email" name="email" placeholder="nama@email.com" type="email" />
              <CF label="Alamat Domisili" name="alamat" full type="textarea" />
              <CF label="Wilayah" name="wilayah" type="select" options={["Kota Kediri", "Kab. Kediri"]} />
              <CF label="Kecamatan" name="kecamatan" type="select"
                   options={KECAMATAN_KOTA.map(k => k.nama).concat(KECAMATAN_KAB.map(k => k.nama))} />
              <CF label="Kelurahan / Desa" name="kelurahan" />
            </div>
          )}
          {step === 1 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <CF label="Kampus / Universitas" name="kampus" type="select" options={UNIVERSITAS.map(u => u.nama)} full />
              <CF label="Fakultas" name="fakultas" />
              <CF label="Jurusan / Prodi" name="jurusan" type="select" options={JURUSAN.map(j => j.nama)} />
              <CF label="Angkatan / Tahun Masuk" name="angkatan" type="number" />
              <CF label="Tahun Lulus" name="tahunLulus" type="number" />
              <CF label="IPK" name="ipk" type="number" placeholder="0.00" />
              <CF label="Predikat" name="predikat" type="select" options={["Memuaskan", "Sangat Memuaskan", "Cumlaude"]} />
              <CF label="Pendidikan Terakhir" name="pendidikanAkhir" type="select" options={["D3", "S1", "S2", "S3"]} />
            </div>
          )}
          {step === 2 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <CF label="Komisariat" name="komisariat" full />
              <CF label="Cabang PMII" name="cabang" type="select" options={["Kota Kediri", "Kab. Kediri"]} />
              <CF label="Rayon" name="rayon" />
              <CF label="Jabatan Tertinggi" name="jabatanTertinggi" />
              <CF label="Status MAPABA" name="statusMapaba" type="boolean-select" />
              <CF label="Tahun MAPABA" name="tahunMapaba" type="number" />
              <CF label="Status PKD" name="statusPkd" type="boolean-select" />
              <CF label="Status PKL" name="statusPkl" type="boolean-select" />
              <CF label="Status PKN" name="statusPkn" type="boolean-select" />
            </div>
          )}
          {step === 3 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <CF label="Status Pernikahan" name="statusPernikahan" type="select" full
                   options={["Belum Menikah", "Menikah", "Cerai", "Duda/Janda"]} />
              <CF label="Nama Pasangan" name="namaPasangan" />
              <CF label="Pekerjaan Pasangan" name="pekerjaanPasangan" />
              <CF label="Jumlah Anak" name="jumlahAnak" type="number" />
              <CF label="Tanggungan" name="tanggungan" type="number" />
              <CF label="Nama Ayah" name="namaAyah" />
              <CF label="Nama Ibu" name="namaIbu" />
              <CF label="Pekerjaan Orang Tua" name="pekerjaanOrangTua" />
            </div>
          )}
          {step === 4 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <CF label="Pekerjaan Utama" name="pekerjaanUtama" type="select" options={PEKERJAAN.map(p => p.nama)} full />
              <CF label="Jabatan" name="jabatan" />
              <CF label="Instansi / Perusahaan" name="instansi" />
              <CF label="Alamat Instansi" name="alamatInstansi" full />
              <CF label="Lama Bekerja" name="lamaBekerja" />
              <CF label="Estimasi Pendapatan/bln" name="estimasiPendapatan" type="select"
                   options={["< 3jt", "3 - 5jt", "5 - 10jt", "10 - 20jt", "> 20jt", "Memilih tidak menjawab"]} />
              <CF label="Pekerjaan Sampingan" name="pekerjaanSampingan" full />
            </div>
          )}
          {step === 5 && (
            <div style={{ display: "grid", gap: 16 }}>
              <CF label="Aktivitas Sosial / Keagamaan" name="aktivitasSosial" full type="textarea" />
              <CF label="Organisasi Lain" name="organisasiLain" full />
              <CF label="Keahlian / Skill" name="keahlian" full
                   placeholder="Pisahkan dengan koma: public speaking, IT, dll" />
              <CF label="Minat Kontribusi Alumni" name="minatKontribusi" full
                   placeholder="Pendidikan, Ekonomi, Sosial, dll" />
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 28px", borderTop: "1px solid var(--line)",
                       background: "var(--bg)", display: "flex",
                       justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>
            {isEdit ? '✎ Mode Edit · ' + (fd.namaLengkap || "—") : '＋ Data Baru'}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="btn btn-ghost btn-sm">← Kembali</button>
            )}
            {step < steps.length - 1 ? (
              <button onClick={() => setStep(step + 1)} className="btn btn-primary btn-sm">Lanjut →</button>
            ) : (
              <button onClick={handleSubmit} className="btn btn-accent btn-sm" disabled={saving}>
                {saving ? 'Menyimpan...' : '✓ Simpan Data Alumni'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Field component (kept for backward compat with AdminPengaturan)
function Field({ label, placeholder, type = "text", options, full, required }) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : undefined }}>
      <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 6, fontWeight: 600 }}>
        {label} {required && <span style={{ color: "oklch(0.6 0.2 25)" }}>*</span>}
      </div>
      {type === "select" ? (
        <select style={{ ...selectStyle, width: "100%", padding: "10px 14px", fontSize: 13 }}>
          <option value="">Pilih...</option>
          {(options || []).map(o => <option key={o}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea placeholder={placeholder} rows={3}
                   style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--line)",
                             borderRadius: 8, fontSize: 13, fontFamily: "inherit", resize: "vertical" }} />
      ) : (
        <input type={type} placeholder={placeholder}
                style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--line)",
                          borderRadius: 8, fontSize: 13, fontFamily: "inherit" }} />
      )}
    </div>
  );
}

Object.assign(window, { AlumniDetail, AlumniForm, ConfirmModal, Field });
