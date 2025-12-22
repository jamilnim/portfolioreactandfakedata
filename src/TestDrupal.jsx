import { useEffect } from "react";

export default function TestDrupal() {
  useEffect(() => {
    fetch("https://drupal-portfolio.lndo.site/jsonapi/node/article")
      .then((res) => res.json())
      .then((data) => {
        console.log("DRUPAL RESPONSE:", data);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
      });
  }, []);

  return <h1>Check Console</h1>;
}
