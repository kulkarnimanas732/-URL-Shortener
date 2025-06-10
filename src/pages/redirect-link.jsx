import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLongUrl } from "@/db/apiUrls";
import { storeClicks } from "@/db/apiClicks";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redirect = async () => {
      try {
        console.log("Redirecting for short ID:", id);
        const data = await getLongUrl(id);
        if (!data) return console.error("No data for short url");

        await storeClicks({ id: data.id, originalUrl: data.original_url });
      } catch (err) {
        console.error("Redirect error:", err);
      } finally {
        setLoading(false);
      }
    };

    redirect();
  }, [id]);
   console.log("✅ RedirectLink loaded");

  return loading ? (
    <>
      <BarLoader width={"100%"} color="#36d7b7" />
      <p>Redirecting...</p>
      console.log("📦 storeClicks is running");

    </>
  ) : null;
};

export default RedirectLink;

