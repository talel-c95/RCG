import React from 'react';

export default function AboutPage() {
  return (
    <div id="about" className="min-h-screen bg-background">
      {/* Header Section - Similar to Industries */}
      <div className="container mx-auto px-4 pt-20">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto"></div>
          </div>
          <h3 className="text-lg font-semibold text-primary mb-4 uppercase tracking-wider">
            Who We Are?
          </h3>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Led by a goal,<br />
            Powered by innovation.
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            We are a dedicated advisory and automation company
          </p>
          <p className="text-lg text-muted-foreground/80 max-w-4xl mx-auto leading-relaxed">
            to help organizations transform complexity into clarity.
          </p>
        </div>
      </div>

      {/* Mission & Vision Cards Section */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Mission Card */}
          <div className="bg-primary rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">Our Mission</h3>
            </div>
            <p className="text-white/90 text-lg leading-relaxed mb-4">
              To empower businesses across various sectors to achieve unprecedented levels of efficiency, productivity, and innovation through tailored automation solutions and strategic guidance.
            </p>
            <div className="flex items-start space-x-2">
              <span className="text-white/80 text-sm mt-1">•</span>
              <p className="text-white/80 text-sm leading-relaxed">
                We bring together a team of seasoned consultants with deep industry knowledge and robotics engineers at the forefront of automation advancements.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-primary rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">Our Vision</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <span className="text-white/80 text-sm mt-1">•</span>
                <p className="text-white/80 text-sm leading-relaxed">
                  To be the leading catalyst for transformative growth in Tunisia and beyond, enabling organizations to thrive in the age of intelligent automation.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-white/80 text-sm mt-1">•</span>
                <p className="text-white/80 text-sm leading-relaxed">
                  We envision a future where businesses seamlessly integrate robotics and data-driven strategies to optimize operations, enhance safety, and unlock new opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
