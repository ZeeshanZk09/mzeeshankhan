import Script from "next/script";
import React from "react";

const Analytics = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-9DL20C6P7Y"
      ></Script>
      <Script
        id="google-analytics-script"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9DL20C6P7Y');
          `,
        }}
      ></Script>
    </>
  );
};

export default Analytics;
