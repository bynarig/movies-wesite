import React from "react";



export default function BackgroundDecoration() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Math symbol */}
      <div className="absolute top-[10%] left-[15%] opacity-20 rotate-12">
        <img
          src="/icons/classical-building.png"
          alt="Math symbol"
          width={120}
          height={120}
          className="blur-sm"
        />
      </div>

      {/* Book stack */}
      <div className="absolute top-[30%] right-[10%] opacity-15 -rotate-6">
        <img
          src="/icons/flag-ukraine.png"
          alt="Book stack"
          width={150}
          height={150}
          className="blur-md"
        />
      </div>

      {/* Atom symbol */}
      <div className="absolute bottom-[20%] left-[20%] opacity-20 rotate-45">
        <img
          src="/icons/heart-on-fire.png"
          alt="Atom symbol"
          width={130}
          height={130}
          className="blur-sm"
        />
      </div>

      {/* Pencil */}
      <div className="absolute bottom-[15%] right-[25%] opacity-20 rotate-[30deg]">
        <img
          src="/icons/rocket.png"
          alt="Pencil"
          width={180}
          height={180}
          className="blur-md"
        />
      </div>

      {/* Graduation cap */}
      <div className="absolute top-[45%] left-[5%] opacity-15 rotate-[-15deg]">
        <img
          src="/icons/movie-camera.png"
          alt="Graduation cap"
          width={140}
          height={140}
          className="blur-lg"
        />
      </div>

      {/* Formula */}
      <div className="absolute top-[60%] right-[5%] opacity-20 rotate-[10deg]">
        <img
          src="/icons/popcorn.png"
          alt="Formula"
          width={160}
          height={160}
          className="blur-md"
        />
      </div>
    </div>
  );
}