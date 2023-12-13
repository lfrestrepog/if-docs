import React from "react";
import Navbar from "@theme-original/Navbar";

export default function NavbarWrapper(props) {
  return (
    <>
      <div
        style={{
          background: "#f0ffc4",
          textAlign: "center",
          padding: "16px 32px",
          color: "var(--ifm-color-primary-dark)",
          fontWeight: "bold",
        }}
      >
        This project is an <b>incubation project</b> being run inside the Green
        Software Foundation; as such, we DON’T recommend using it in any
        critical use case. Incubation projects are experimental, offer no
        support guarantee, have minimal governance and process, and may be
        retired at any moment. This project may one day Graduate, in which case
        this disclaimer will be removed.
        <br />
        <br />
        We are running a Hackathon! CarbonHack is open to all, including software practitioners and those with a passion for Green Software. Find out more on the <a href='https://grnsft.org/hack/github'>CarbonHack website</a>
      </div>
      <Navbar {...props} />
    </>
  );
}
