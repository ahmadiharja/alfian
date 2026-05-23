// PMII Kediri Alumni — Main App

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "section": "public",
  "accentMix": "gold-warm",
  "displayFont": "fraunces",
  "density": "comfortable"
}/*EDITMODE-END*/;

// Page title map for AdminMobileTopBar
const adminPageTitle = {
  "dashboard":    "Dashboard",
  "data-alumni":  "Data Alumni",
  "sebaran":      "Sebaran & Analitik",
  "events":       "Kegiatan",
  "donasi-admin": "Donasi",
  "verifikasi":   "Verifikasi",
  "pengaturan":   "Pengaturan",
};

// === Login Modal ===
function LoginModal({ onClose, onLogin }) {
  const [email, setEmail] = React.useState('admin@ikapmii.id');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await AuthAPI.login(email, password);
      Auth.setToken(res.token);
      Auth.setAdmin(res.admin);
      onLogin();
    } catch(err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '16px' }}>
      <div className="card" style={{ width: '100%', maxWidth: 400, padding: 32 }}>
        <div style={{ marginBottom: 24 }}>
          <PMIILogo />
          <h2 style={{ margin: '16px 0 4px', fontFamily: 'var(--font-display)', fontSize: 24 }}>
            Masuk Admin
          </h2>
          <p style={{ color: 'var(--ink-soft)', margin: 0, fontSize: 14 }}>
            IKA-PMII Kediri Raya Console
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              Email
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line)',
                       borderRadius: 8, fontSize: 14 }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              Password
            </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line)',
                       borderRadius: 8, fontSize: 14 }} />
          </div>
          {error && <div style={{ color: 'red', fontSize: 13, marginBottom: 12 }}>{error}</div>}
          <button type="submit" className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
          <button type="button" onClick={onClose}
                  style={{ width: '100%', marginTop: 8, padding: '10px', border: 'none',
                           background: 'none', color: 'var(--ink-soft)', cursor: 'pointer',
                           fontSize: 14 }}>
            Batal
          </button>
        </form>
        <div style={{ marginTop: 16, padding: 12, background: 'var(--bg)', borderRadius: 8,
                      fontSize: 12, color: 'var(--ink-soft)' }}>
          Demo: admin@ikapmii.id / pmii2024
        </div>
      </div>
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [mode, setMode] = React.useState(t.section || "public");
  const [publicPage, setPublicPage] = React.useState("beranda");
  const [adminPage, setAdminPage] = React.useState("dashboard");
  const [detail, setDetail] = React.useState(null);
  const [formOpen, setFormOpen] = React.useState(false);
  const [editAlumni, setEditAlumni] = React.useState(null);
  const [deleteAlumni, setDeleteAlumni] = React.useState(null);
  const [deletingAlumni, setDeletingAlumni] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(Auth.isLoggedIn());
  const isMobile = useIsMobile();

  // Sync mode with tweak
  React.useEffect(() => { if (t.section && t.section !== mode) setMode(t.section); }, [t.section]);

  // Apply accent/font tweaks via CSS variables
  React.useEffect(() => {
    const root = document.documentElement;
    if (t.accentMix === "gold-warm") {
      root.style.setProperty("--gold-500", "oklch(0.82 0.17 88)");
      root.style.setProperty("--gold-700", "oklch(0.62 0.15 70)");
    } else if (t.accentMix === "amber-vivid") {
      root.style.setProperty("--gold-500", "oklch(0.78 0.19 65)");
      root.style.setProperty("--gold-700", "oklch(0.60 0.18 55)");
    } else if (t.accentMix === "lemon-cool") {
      root.style.setProperty("--gold-500", "oklch(0.88 0.16 105)");
      root.style.setProperty("--gold-700", "oklch(0.70 0.14 100)");
    }
    if (t.displayFont === "fraunces") {
      root.style.setProperty("--font-display", '"Fraunces", "Plus Jakarta Sans", serif');
    } else if (t.displayFont === "instrument") {
      root.style.setProperty("--font-display", '"Instrument Serif", "Plus Jakarta Sans", serif');
    } else if (t.displayFont === "sans") {
      root.style.setProperty("--font-display", '"Plus Jakarta Sans", system-ui, sans-serif');
    }
  }, [t.accentMix, t.displayFont]);

  function handleAdminAccess() {
    if (isLoggedIn) {
      setMode("admin");
      setTweak("section", "admin");
    } else {
      setShowLogin(true);
    }
  }

  function handleLoginSuccess() {
    setIsLoggedIn(true);
    setShowLogin(false);
    setMode("admin");
    setTweak("section", "admin");
  }

  function handleLogout() {
    Auth.logout();
    setIsLoggedIn(false);
    setMode("public");
    setTweak("section", "public");
  }

  // Page label for comment context
  const screenLabel = mode === "public"
    ? `Public · ${publicPage}`
    : `Admin · ${adminPage}`;

  return (
    <div data-screen-label={screenLabel}>
      {mode === "public" ? (
        <>
          {/* Render correct nav per device — JS-based, not CSS-based */}
          {isMobile
            ? <MobileTopBar page={publicPage} onAdmin={handleAdminAccess} />
            : <PublicNav page={publicPage} setPage={setPublicPage} onSwitchToAdmin={handleAdminAccess} />
          }

          {/* Page content */}
          <div style={{ paddingBottom: isMobile ? 80 : 0 }}>
            {publicPage === "beranda"   && <Beranda setPage={setPublicPage} />}
            {publicPage === "tentang"   && <Tentang />}
            {publicPage === "direktori" && <Direktori />}
            {publicPage === "kegiatan"  && <Kegiatan />}
            {publicPage === "donasi"    && <Donasi />}
          </div>

          {/* Mobile bottom navigation */}
          {isMobile && (
            <PublicBottomNav page={publicPage} setPage={setPublicPage} onAdmin={handleAdminAccess} />
          )}
        </>
      ) : (
        <div style={{ display: "flex", minHeight: "100vh" }}>
          {/* Desktop sidebar (hidden on mobile) */}
          {!isMobile && (
            <AdminSidebar page={adminPage} setPage={setAdminPage} onLogout={handleLogout} />
          )}

          {/* Main content */}
          <main style={{ flex: 1, minWidth: 0, paddingBottom: isMobile ? 80 : 0 }}>
            {/* Mobile admin top bar */}
            {isMobile && (
              <AdminMobileTopBar
                title={adminPageTitle[adminPage] || "Admin"}
                onBack={handleLogout}
                onLogout={handleLogout}
              />
            )}

            {adminPage === "dashboard"    && <AdminDashboard />}
            {adminPage === "data-alumni"  && (
              <AdminDataAlumni
                onDetail={setDetail}
                onEdit={a => { setEditAlumni(a); setFormOpen(true); }}
                onDelete={a => setDeleteAlumni(a)}
              />
            )}
            {adminPage === "sebaran"      && <AdminSebaran />}
            {adminPage === "events"       && <AdminEvents />}
            {adminPage === "donasi-admin" && <AdminDonasi />}
            {adminPage === "verifikasi"   && <AdminVerifikasi />}
            {adminPage === "pengaturan"   && <AdminPengaturan />}
          </main>

          {/* Mobile admin bottom nav */}
          {isMobile && (
            <AdminBottomNav page={adminPage} setPage={setAdminPage} />
          )}
        </div>
      )}

      {detail && (
        <AlumniDetail alumni={detail}
                       onClose={() => setDetail(null)}
                       onEdit={() => { setEditAlumni(detail); setDetail(null); setFormOpen(true); }}
                       onDelete={() => { setDeleteAlumni(detail); setDetail(null); }} />
      )}
      {formOpen && (
        <AlumniForm
          editData={editAlumni}
          onClose={() => { setFormOpen(false); setEditAlumni(null); }}
          onSuccess={() => { if (window.__refreshAlumni) window.__refreshAlumni(); }}
        />
      )}
      {deleteAlumni && (
        <ConfirmModal
          title="Hapus Data Alumni"
          message={`Hapus data "${deleteAlumni.namaLengkap || deleteAlumni.nama}"? Tindakan ini tidak dapat dibatalkan.`}
          loading={deletingAlumni}
          danger
          onCancel={() => setDeleteAlumni(null)}
          onConfirm={async () => {
            setDeletingAlumni(true);
            try {
              await AlumniAPI.delete(deleteAlumni.id);
              setDeleteAlumni(null);
              if (window.__refreshAlumni) window.__refreshAlumni();
            } catch (e) {
              alert('Gagal menghapus: ' + e.message);
            } finally {
              setDeletingAlumni(false);
            }
          }}
        />
      )}

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLoginSuccess} />
      )}

      {/* Tweaks */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Mode Tampilan">
          <TweakRadio
            label="Section"
            value={t.section} onChange={v => { setTweak("section", v); setMode(v); }}
            options={[
              { label: "Publik", value: "public" },
              { label: "Admin",  value: "admin" },
            ]}
          />
        </TweakSection>
        <TweakSection label="Aksen Warna">
          <TweakSelect
            label="Gold accent"
            value={t.accentMix}
            onChange={v => setTweak("accentMix", v)}
            options={[
              { label: "Gold Warm (default)", value: "gold-warm" },
              { label: "Amber Vivid",         value: "amber-vivid" },
              { label: "Lemon Cool",          value: "lemon-cool" },
            ]}
          />
        </TweakSection>
        <TweakSection label="Tipografi Display">
          <TweakSelect
            label="Display font"
            value={t.displayFont}
            onChange={v => setTweak("displayFont", v)}
            options={[
              { label: "Fraunces (serif)",    value: "fraunces" },
              { label: "Instrument Serif",    value: "instrument" },
              { label: "Plus Jakarta Sans",   value: "sans" },
            ]}
          />
        </TweakSection>
        <TweakSection label="Quick Navigate">
          <div style={{ display: "grid", gap: 6 }}>
            {mode === "public" ? (
              [["beranda","Beranda"],["tentang","Tentang"],["direktori","Direktori"],
               ["kegiatan","Kegiatan"],["donasi","Donasi"]].map(([k,l]) => (
                <button key={k} onClick={() => setPublicPage(k)}
                         style={tweakNavStyle(publicPage === k)}>{l}</button>
              ))
            ) : (
              [["dashboard","Dashboard"],["data-alumni","Data Alumni"],["sebaran","Sebaran"],
               ["events","Kegiatan"],["donasi-admin","Donasi"],["verifikasi","Verifikasi"],
               ["pengaturan","Pengaturan"]].map(([k,l]) => (
                <button key={k} onClick={() => setAdminPage(k)}
                         style={tweakNavStyle(adminPage === k)}>{l}</button>
              ))
            )}
          </div>
        </TweakSection>
        <TweakSection label="Aksi Cepat">
          <TweakButton label="＋ Buka Form Tambah Alumni" onClick={() => { setEditAlumni(null); setFormOpen(true); }} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

function tweakNavStyle(active) {
  return {
    padding: "8px 10px",
    border: "1px solid " + (active ? "var(--blue-700)" : "var(--line)"),
    background: active ? "var(--blue-50)" : "white",
    color: active ? "var(--blue-700)" : "var(--ink)",
    borderRadius: 8,
    fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
    textAlign: "left",
  };
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
