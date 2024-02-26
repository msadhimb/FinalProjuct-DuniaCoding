import React from "react";
import { Footer } from "flowbite-react";

const Footers = () => {
  return (
    <>
      <hr />
      <Footer className="px-5 md:container py-5 border-0 shadow-none overflow-hidden">
        <Footer.Copyright href="#" by="Poke Pedia" year={2024} />
        <Footer.LinkGroup>
          <Footer.Link href="#">About</Footer.Link>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Licensing</Footer.Link>
          <Footer.Link href="#">Contact</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </>
  );
};

export default Footers;
