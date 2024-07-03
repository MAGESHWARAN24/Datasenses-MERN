import React from "react";

function Layout({children}) {
  return (
    <main className="h-screen w-full">
      <section className="size-full p-5 flex items-center justify-center">
        {children}
      </section>
    </main>
  );
}

export default Layout;
