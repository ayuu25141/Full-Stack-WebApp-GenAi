import React, { useRef } from 'react';
import Nav from '../component/Nav';
import Hero from '../component/Hero';
import Feature from '../component/Feature';
import Working from '../component/Working';
import CTA from '../component/Cta';

function Home() {
  // Create refs for each section
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const demoRef = useRef(null);

  return (
    <>
      <Nav featuresRef={featuresRef} howItWorksRef={howItWorksRef} demoRef={demoRef} />

      <Hero />

      {/* Features Section with ref */}
      <div ref={featuresRef}>
        <Feature />
      </div>

      {/* How It Works Section with ref */}
      <div ref={howItWorksRef}>
        <Working />
      </div>

      {/* Demo Section with ref */}
      <div ref={demoRef}>
        <div className="py-24 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Demo</h2>
          {/* Your demo content here */}
        </div>
      </div>

      <CTA />
    </>
  );
}

export default Home;
