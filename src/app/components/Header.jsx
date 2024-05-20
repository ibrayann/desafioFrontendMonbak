import React from "react";

function Header() {
  return (
    <div className="d-flex mt-3 justify-content-between align-items-center">
      <section className="">
        <span
          className="text-center"
          style={{
            color: "gray",
          }}
        >
          {new Date().toLocaleDateString("es-Es", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </span>
        <h4 className="text-center">Today Tasks</h4>
      </section>
      <span
        className="rounded-circle"
        style={{
          width: 40,
          height: 40,
          backgroundColor: "#58D4F1",
          boxShadow: "0 0 10px #58D4F1",
        }}
      ></span>
    </div>
  );
}

export default Header;
