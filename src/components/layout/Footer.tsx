import React from 'react';

/**
 * Footer component
 */
const Footer: React.FC = () => {
  return (
    <footer className="py-4 mt-auto shadow-[0px_-2px_5px_0px_rgba(0,_0,_0,_0.1)]">
      <div className="container mx-auto px-4 text-center">
          <p className="mt-2 md:mt-0 font-bold">
            Made with ❤️ for the MobProgramming team
          </p>
      </div>
    </footer>
  );
};

export default Footer;