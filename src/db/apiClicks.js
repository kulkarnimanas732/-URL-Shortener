import {UAParser} from "ua-parser-js";
import supabase from "./supabase";


export async function getClicksForUrls(urlIds) {
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.error("Error fetching clicks:", error);
    return null;
  }

  return data;
}

export async function getClicksForUrl(url_id) {
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load Stats");
  }

  return data;
}

const parser = new UAParser();

// export const storeClicks = async ({ id, originalUrl }) => {
//   try {
//     console.log("📦 storeClicks called with id:", id);

//     const result = parser.getResult();
//     const device = result.device?.type || "desktop";
//     console.log("📱 Device:", device);

//     let city = "Unknown";
//     let country = "Unknown";

//     try {
//       const response = await fetch("https://ipapi.co/json");
//       const data = await response.json();
//       city = data.city;
//       country = data.country_name;
//       console.log("🌍 Location:", city, country);
//     } catch (err) {
//       console.error("❌ IP API failed:", err);
//     }

//     const { data, error } = await supabase.from("clicks").insert({
//       url_id: id,
//       city,
//       country,
//       device,
//     });

//     if (error) {
//       console.error("❌ Supabase insert error:", error);
//     } else {
//       console.log("✅ Click stored:", data);
//     }

//     // Always redirect
//     window.location.href = originalUrl;
//   } catch (error) {
//     console.error("❌ storeClicks failed:", error);
//   }
// };
export const storeClicks = async ({ id, originalUrl }) => {
  try {
    console.log("📦 storeClicks called with id:", id);

    const result = parser.getResult();
    const device = result.device?.type || "desktop";
    console.log("📱 Device:", device);

    let city = "Unknown";
    let country = "Unknown";

    try {
      const response = await fetch("https://ipapi.co/json");
      const data = await response.json();
      city = data.city;
      country = data.country_name;
      console.log("🌍 Location:", city, country);
    } catch (err) {
      console.error("❌ IP API failed:", err);
    }

    const { data, error } = await supabase.from("clicks").insert({
      url_id: id,
      city,
      country,
      device,
    });

    if (error) {
      console.error("❌ Supabase insert error:", error);
    } else {
      console.log("✅ Click stored:", data);
    }

    // ✅ Delay redirect by 300ms to make sure it stores first
    setTimeout(() => {
      window.location.href = originalUrl;
    }, 300);
  } catch (error) {
    console.error("❌ storeClicks failed:", error);
  }
};
