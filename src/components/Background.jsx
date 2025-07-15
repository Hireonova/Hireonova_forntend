import React from 'react';

const BackgroundGrid = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black flex items-center justify-center">
      {/* Dot background layer */}
      <div
        className="
          absolute inset-0
          [background-size:20px_20px]
          [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]
          dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]
        "
      />

      {/* Radial gradient mask for fade effect */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-white dark:bg-black
          [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]
        "
      />

      {/* Wrapped children content */}
      {/* FIX: Added w-full to ensure this container spans the full width
          of the BackgroundGrid parent, allowing its children to utilize
          100% of that space if they wish. */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default BackgroundGrid;
