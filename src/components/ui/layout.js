import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Header = dynamic(() => import("../nav/Header"), {
  ssr: false,
});

const Layout = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient && (
        <>
          <Header />
          {children}
        </>
      )}
    </>
  );
};

export default Layout;
