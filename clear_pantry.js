// Script untuk reset dan mengosongkan database Pantry Cloud jika terjadi error
// Jalankan dengan command: node clear_pantry.js

const PANTRY_ID = "fb80de92-bc75-495c-9f7c-52a273ca9061";
const BASKET_NAME = "otakin";

async function clearPantry() {
  const url = `https://getpantry.cloud/apiv1/pantry/${PANTRY_ID}/basket/${BASKET_NAME}`;
  console.log("Mengosongkan database Pantry di:", BASKET_NAME, "...");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registrations: [] })
    });
    
    if (response.ok) {
      console.log("✅ Berhasil mengosongkan pantry basket:", BASKET_NAME);
      console.log("Database kembali bersih dan siap digunakan.");
    } else {
      console.error("❌ Gagal mengosongkan pantry. Status code:", response.status, response.statusText);
    }
  } catch (err) {
    console.error("❌ Terjadi error:", err.message);
    console.log("Pastikan kamu menggunakan Node.js versi 18 ke atas agar fungsi fetch() tersedia.");
  }
}

clearPantry();
