import { Registration } from './types';

const STORAGE_KEY = 'otakin_waiting_list';

// Load from environment variables (.env)
const PUBLIC_BASKET_URL = import.meta.env.VITE_PANTRY_PUBLIC_URL || "https://getpantry.cloud/apiv1/public/f4e7999d6b92021c4c08fc1ce1e304f1";
const PANTRY_ID = import.meta.env.VITE_PANTRY_ID || "fb80de92-bc75-495c-9f7c-52a273ca9061";

export function getPantryPostUrl() {
  return `https://getpantry.cloud/apiv1/pantry/${PANTRY_ID}/basket/otakin`;
}

// Cookie management helpers
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function setCookie(name: string, value: string, days = 365): void {
  if (typeof document === 'undefined') return;
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

// Local cache backup
export function getLocalRegistrations(): Registration[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
}

// Fetch current registrations from Pantry (Public view endpoint)
export async function getPantryRegistrations(): Promise<Registration[]> {
  try {
    const response = await fetch(PUBLIC_BASKET_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to fetch from Pantry');
    const data = await response.json();
    
    // Assume data is { registrations: [...] }
    if (data && Array.isArray(data.registrations)) {
      // Sync local storage cache
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data.registrations));
      return data.registrations;
    }
    return [];
  } catch (err) {
    console.warn("Pantry fetch failed, falling back to localStorage:", err);
    return getLocalRegistrations();
  }
}

// Save to Pantry with strict duplicate checking
export async function savePantryRegistration(email: string): Promise<{ success: boolean; data?: Registration; error?: string }> {
  // Regex validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email.trim())) {
    return { success: false, error: 'Masukkan alamat email yang valid.' };
  }

  const cleanEmail = email.trim().toLowerCase();
  
  try {
    // 1. Fetch latest list from public GET endpoint to check for duplicates
    const existing = await getPantryRegistrations();
    
    const duplicate = existing.find((r) => r.email === cleanEmail);
    if (duplicate) {
      return { 
        success: false, 
        error: 'Email ini sudah terdaftar di waiting list!',
        data: duplicate
      };
    }

    // 2. Generate new registration record (minimal footprint)
    const newReg: Registration = {
      id: existing.length + 1, // 1-indexed queue number
      email: cleanEmail,
      ts: new Date().toISOString(),
    };

    const updated = [...existing, newReg];

    // 3. POST to Pantry main endpoint (updates the basket)
    const postUrl = getPantryPostUrl();
    const response = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registrations: updated }),
    });

    if (!response.ok) {
      throw new Error('Gagal menyimpan ke cloud.');
    }

    // Sync local storage cache
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return { success: true, data: newReg };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message || 'Terjadi kesalahan jaringan.' };
  }
}

export function getTotalWaiting(): number {
  return getLocalRegistrations().length;
}

export async function clearAllRegistrations(): Promise<void> {
  try {
    const postUrl = getPantryPostUrl();
    await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registrations: [] }),
    });
  } catch (e) {
    console.error(e);
  }
  localStorage.removeItem(STORAGE_KEY);
}
