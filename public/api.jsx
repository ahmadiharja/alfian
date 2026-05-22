// API client for IKA-PMII Backend

const API_BASE = '/api';

// Token management
const Auth = {
  getToken: () => localStorage.getItem('pmii_token'),
  setToken: (t) => localStorage.setItem('pmii_token', t),
  removeToken: () => localStorage.removeItem('pmii_token'),
  getAdmin: () => { try { return JSON.parse(localStorage.getItem('pmii_admin') || 'null'); } catch { return null; } },
  setAdmin: (a) => localStorage.setItem('pmii_admin', JSON.stringify(a)),
  removeAdmin: () => localStorage.removeItem('pmii_admin'),
  isLoggedIn: () => !!localStorage.getItem('pmii_token'),
};

// HTTP helpers
async function apiFetch(path, options = {}) {
  const token = Auth.getToken();
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(API_BASE + path, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// Auth API
const AuthAPI = {
  login: (email, password) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  me: () => apiFetch('/auth/me'),
  logout: () => { Auth.removeToken(); Auth.removeAdmin(); },
};

// Alumni API
const AlumniAPI = {
  list: (params = {}) => apiFetch('/alumni?' + new URLSearchParams(params)),
  listPublic: (params = {}) => apiFetch('/alumni/public?' + new URLSearchParams(params)),
  get: (id) => apiFetch('/alumni/' + id),
  create: (data) => apiFetch('/alumni', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch('/alumni/' + id, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch('/alumni/' + id, { method: 'DELETE' }),
  daftar: (data) => apiFetch('/alumni/daftar', { method: 'POST', body: JSON.stringify(data) }),
};

// Kegiatan API
const KegiatanAPI = {
  list: (params = {}) => apiFetch('/kegiatan?' + new URLSearchParams(params)),
  get: (id) => apiFetch('/kegiatan/' + id),
  create: (data) => apiFetch('/kegiatan', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch('/kegiatan/' + id, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch('/kegiatan/' + id, { method: 'DELETE' }),
  daftar: (id) => apiFetch('/kegiatan/' + id + '/daftar', { method: 'POST', body: JSON.stringify({}) }),
};

// Donasi API
const DonasiAPI = {
  programs: () => apiFetch('/donasi/program'),
  transaksi: (params = {}) => apiFetch('/donasi/transaksi?' + new URLSearchParams(params)),
  createTransaksi: (data) => apiFetch('/donasi/transaksi', { method: 'POST', body: JSON.stringify(data) }),
  summary: () => apiFetch('/donasi/summary'),
  updateStatus: (id, status) => apiFetch('/donasi/transaksi/' + id + '/status', { method: 'PUT', body: JSON.stringify({ status }) }),
};

// Verifikasi API
const VerifikasiAPI = {
  list: () => apiFetch('/verifikasi'),
  approve: (id) => apiFetch('/verifikasi/' + id + '/approve', { method: 'PUT' }),
  reject: (id, alasan) => apiFetch('/verifikasi/' + id + '/reject', { method: 'PUT', body: JSON.stringify({ alasan }) }),
};

// Analytics API
const AnalyticsAPI = {
  dashboard: () => apiFetch('/analytics/dashboard'),
  sebaran: (params = {}) => apiFetch('/analytics/sebaran?' + new URLSearchParams(params)),
  kampus: () => apiFetch('/analytics/kampus'),
  jurusan: () => apiFetch('/analytics/jurusan'),
  pekerjaan: () => apiFetch('/analytics/pekerjaan'),
};

// Pengaturan API
const PengaturanAPI = {
  get: () => apiFetch('/pengaturan'),
  update: (data) => apiFetch('/pengaturan', { method: 'PUT', body: JSON.stringify(data) }),
  public: () => apiFetch('/pengaturan/public'),
};

// React hooks
function useApi(fn, deps = []) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fn().then(d => { if (!cancelled) { setData(d); setLoading(false); } })
        .catch(e => { if (!cancelled) { setError(e.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, deps);

  return { data, loading, error };
}

Object.assign(window, {
  Auth, AuthAPI, AlumniAPI, KegiatanAPI, DonasiAPI, VerifikasiAPI, AnalyticsAPI, PengaturanAPI, useApi
});
