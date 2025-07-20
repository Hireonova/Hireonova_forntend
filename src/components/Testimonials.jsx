import React from 'react';

const Testimonials = () => {
  const testimonials = [
    // Column 1 - scrolling up
    [
      {
        name: "Sarah Chen",
        handle: "@sarahdesigns",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        text: "This AI job engine completely transformed my job search! It parsed my design portfolio and matched me with roles I didn't even know existed. Got 3 interviews in the first week! 🚀",
        time: "2h"
      },
      {
        name: "Marcus Rodriguez",
        handle: "@dev_marcus",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        text: "The shareable portfolio feature is genius. Instead of sending PDFs, I now share a beautiful, interactive link that showcases my projects perfectly. Landed my dream job at a startup!",
        time: "4h"
      },
      {
        name: "Emily Watson",
        handle: "@emwatson_pm",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        text: "As a product manager, I was skeptical about AI matching. But this platform understood my cross-functional experience and connected me with roles that perfectly fit my hybrid skill set.",
        time: "6h"
      },
      {
        name: "David Kim",
        handle: "@davidkimtech",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        text: "The AI actually READ my resume! It picked up on subtle details about my machine learning projects and matched me with companies working on similar problems. Mind-blown! 🤯",
        time: "8h"
      },
      {
        name: "Lisa Park",
        handle: "@lisapark_ux",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        text: "Finally, a job platform that gets UX designers! It understood my design thinking process and matched me with companies that value user-centered design. Amazing experience!",
        time: "12h"
      }
    ],
    // Column 2 - scrolling down
    [
      {
        name: "Alex Thompson",
        handle: "@alexthompsondev",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        text: "I've used every job board out there, but this AI-powered matching is on another level. It found connections between my bootcamp projects and enterprise needs I never saw coming.",
        time: "1h"
      },
      {
        name: "Priya Patel",
        handle: "@priyapatelpro",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
        text: "The portfolio builder turned my scattered projects into a cohesive story. Recruiters are now reaching out to ME instead of the other way around. Game changer! ✨",
        time: "3h"
      },
      {
        name: "James Wilson",
        handle: "@jameswilsonai",
        avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face",
        text: "The AI caught skills in my resume that I forgot I even had! Matched me with a data science role that combines my statistics background with my love for storytelling.",
        time: "5h"
      },
      {
        name: "Rachel Green",
        handle: "@rachelgreen_mk",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        text: "As a marketer transitioning to growth roles, this platform understood my unique blend of creative and analytical skills. Found my perfect growth marketing position!",
        time: "7h"
      },
      {
        name: "Carlos Martinez",
        handle: "@carlosdev",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
        text: "The shareable portfolio is incredible! Clients can see my full-stack projects with live demos. It's like having a personal showcase that works 24/7. Freelance game strong! 💪",
        time: "9h"
      }
    ],
    // Column 3 - scrolling up
    [
      {
        name: "Sophia Liu",
        handle: "@sophialiu_data",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
        text: "This AI is scary good at understanding context. It saw how my research background translates to data science and matched me with biotech companies. Perfect fit!",
        time: "2h"
      },
      {
        name: "Michael Brown",
        handle: "@mikebrowncto",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
        text: "As a CTO looking for my next challenge, I needed something that understood leadership + technical depth. This platform nailed it and found me an amazing opportunity!",
        time: "4h"
      },
      {
        name: "Jessica Davis",
        handle: "@jessicadavis_hr",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
        text: "From the HR perspective, the quality of candidates this platform sends us is outstanding. The AI matching saves us hours of screening. We're hiring exclusively through this now!",
        time: "6h"
      },
      {
        name: "Ryan O'Connor",
        handle: "@ryanoconnor_pm",
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face",
        text: "The way it parsed my project management experience and connected it with tech startups needing operational leadership was brilliant. Started my new role last week! 🎉",
        time: "10h"
      },
      {
        name: "Hannah Foster",
        handle: "@hannahfoster_ui",
        avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop&crop=face",
        text: "My portfolio went from a static PDF to an interactive experience that tells my design story. The response from potential employers has been incredible!",
        time: "14h"
      }
    ],
    // Column 4 - scrolling down (new for lg:grid-cols-4)
    [
      {
        name: "Kevin Chang",
        handle: "@kevinchang_eng",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=face",
        text: "The AI resume parsing caught nuances in my embedded systems experience that even I overlooked. Matched with hardware startups perfectly aligned with my interests!",
        time: "3h"
      },
      {
        name: "Amanda Foster",
        handle: "@amandafoster_qa",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
        text: "As a QA engineer, finding roles that value my automation skills was tough. This platform connected me with companies that actually appreciate comprehensive testing strategies.",
        time: "5h"
      },
      {
        name: "Tyler Johnson",
        handle: "@tylerjohnson_dev",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face",
        text: "The portfolio builder showcased my open-source contributions beautifully. Instead of just listing GitHub repos, it told the story of my impact on the developer community.",
        time: "7h"
      },
      {
        name: "Nina Rodriguez",
        handle: "@nina_designsys",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        text: "Finding design systems roles was impossible until this AI understood my unique blend of design and frontend skills. Now working at my dream company! 🎨",
        time: "11h"
      },
      {
        name: "Jordan Smith",
        handle: "@jordansmith_devops",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        text: "The platform recognized my infrastructure-as-code expertise and matched me with cloud-first companies. The quality of matches was surprisingly accurate!",
        time: "13h"
      }
    ]
  ];

  const TestimonialCard = ({ testimonial }) => (
    <div className="bg-white dark:bg-black rounded-none border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors duration-200 p-3 md:p-4 mb-0">
      <div className="flex items-start space-x-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1 mb-1">
            <h4 className="font-bold text-black dark:text-white text-sm md:text-base truncate">{testimonial.name}</h4>
            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-500 dark:text-gray-400 text-sm truncate">{testimonial.handle}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">·</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.time}</span>
          </div>
          <p className="text-black dark:text-white text-sm md:text-base leading-normal">{testimonial.text}</p>
          <div className="flex items-center justify-between mt-3 text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1 text-xs hover:text-blue-500 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="hidden sm:inline">Reply</span>
            </div>
            <div className="flex items-center space-x-1 text-xs hover:text-green-500 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="hidden sm:inline">Repost</span>
            </div>
            <div className="flex items-center space-x-1 text-xs hover:text-red-500 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {/* Fixed the missing strokeLinejoin attribute */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="hidden sm:inline">Like</span>
            </div>
            <div className="flex items-center space-x-1 text-xs hover:text-blue-500 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span className="hidden sm:inline">Share</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent py-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black   mb-4">
            What our users are saying
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover how our AI-powered job engine is transforming careers by creating perfect matches
            and building stunning portfolios that get results.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-4 lg:gap-6 h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
          {testimonials.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`overflow-hidden relative bg-white dark:bg-black border-l border-r border-gray-200 dark:border-gray-800 md:border md:rounded-2xl ${
                columnIndex % 2 === 0 ? 'animate-scroll-up' : 'animate-scroll-down'
              } ${columnIndex > 0 ? 'hidden md:block' : ''}`}
              style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
              }}
            >
              <div className={`${columnIndex % 2 === 0 ? 'animate-infinite-scroll-up' : 'animate-infinite-scroll-down'}`}>
                {/* Render testimonials twice for infinite scroll effect */}
                {[...column, ...column].map((testimonial, index) => (
                  <TestimonialCard key={`${columnIndex}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>
          ))}
        </div>

        
      </div>

      <style jsx>{`
        @keyframes infinite-scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes infinite-scroll-down {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-infinite-scroll-up {
          animation: infinite-scroll-up 20s linear infinite;
        }

        .animate-infinite-scroll-down {
          animation: infinite-scroll-down 20s linear infinite;
        }

        /* Specific styles for the first column on small screens */
        @media (max-width: 767px) { /* Tailwind's 'md' breakpoint is 768px, so this applies below that */
            .grid-cols-1 > div:first-child {
                border-left: none; /* Remove left border */
                border-right: none; /* Remove right border */
                border-radius: 0; /* Remove border-radius */
            }
        }
      `}</style>
    </div>
  );
};

export default Testimonials;