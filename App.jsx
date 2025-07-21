
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHome,
  faBook,
  faUsers,
  faCode,
  faCalendar,
  faBlog,
  faSignInAlt,
  faSignOutAlt,
  faTrophy, faBookOpen, faComments,
  faServer,

} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub as faGithubBrands,
  faDiscord as faDiscordBrands,
  faTwitter as faTwitterBrands,
  faLinkedinIn as faLinkedinInBrands,
} from '@fortawesome/free-brands-svg-icons';

const App = () => {
  const [theme, setTheme] = useState('light');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [popupShown, setPopupShown] = useState(false);
  const [time, setTime] = useState(10);
  const [skills, setSkills] = useState(5);
  const [roi, setRoi] = useState(50);
  const [masteryWeeks, setMasteryWeeks] = useState(12);
  const [timer, setTimer] = useState('Loading...');

  // Theme Toggle
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  // Sidebar Toggle
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Navigation
  const navigateTo = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  // Login Functions
  const loginWithGitHub = () => {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID';
  };

  const joinCommunity = () => {
    const nameInput = document.getElementById('name-input')?.value.trim();
    const githubUsernameInput = document.getElementById('github-username-input')?.value.trim();

    if (!nameInput || !githubUsernameInput) {
      alert('Please enter both your name and GitHub username.');
      return;
    }

    const userData = { name: nameInput, githubUsername: githubUsernameInput };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
    alert(`Welcome to CodeCULT, ${nameInput}! Explore the community.`);
  };

  const showLogoutPage = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  // Other Functions
  const joinDiscord = () => {
    window.location.href = 'https://discord.gg/codecult';
  };

  const registerEvent = (event) => {
    alert(`Registered for ${event}! Check your email for details.`);
  };

  const navigateToTrack = (track) => {
    alert(`Starting ${track} track! Redirecting to resources...`);
  };

  const closeExitPopup = () => {
    setPopupShown(false);
  };

  // ROI Calculator
  const updateROI = () => {
    if (time <= 0 || skills <= 0) {
      setRoi(0);
      setMasteryWeeks('∞');
      return;
    }

    const roiValue = Math.min(((skills / time) * 100), 500).toFixed(0); // Cap ROI if needed
    setRoi(roiValue);
    document.documentElement.style.setProperty('--roi', `${roiValue}%`);

    // New mastery logic: assume you gain 1 skill per hour
    const skillsPerWeek = time;
    const mastery = (skills / skillsPerWeek).toFixed(0); // e.g., 10 skills / 5 hrs = 2 weeks
    setMasteryWeeks(mastery);
  };

  // Countdown Timer
  // const endDate = new Date('2025-08-10T23:59:59').getTime();
  // useEffect(() => {
  //   const updateTimer = () => {
  //     const now = new Date().getTime();
  //     const distance = endDate - now;
  //     if (distance < 0) {
  //       setTimer('Hackathon Started!');
  //       return;
  //     }
  //     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //     setTimer(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  //   };
  //   updateTimer();
  //   const interval = setInterval(updateTimer, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // Exit-Intent Popup
  useEffect(() => {
    const handleMouseOut = (e) => {
      if (!popupShown && e.relatedTarget === null && e.clientY < 0) {
        setPopupShown(true);
      }
    };
    document.addEventListener('mouseout', handleMouseOut);
    return () => document.removeEventListener('mouseout', handleMouseOut);
  }, [popupShown]);

  // Auto-login and ROI Update
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
    updateROI();
  }, []);

  useEffect(() => {
    updateROI();
  }, [time, skills]);

  return (
    <div className={`font-poppins min-h-screen flex flex-col transition-all duration-300 ${theme === 'dark' ? 'bg-[#07080a] text-[#E0E0E0]' : 'bg-[#E0E0E0] text-[#333]'}`}>
      {/* Login Page */}
      {!isLoggedIn && (
        <div className="fixed inset-0 flex flex-col justify-center items-center z-[1003] bg-[var(--accent)] bg-opacity-30 transition-opacity duration-300">
          <div className="bg-[black] backdrop-blur-[5px] border border-white/30 rounded-2xl flex flex-col  p-8 shadow-[0_8px_40px_var(--shadow)] w-full max-w-[400px] mx-4 text-center text-[var(--auth-text)]">
            <h2 className="text-3xl font-bold mb-5 text-[var(--accent)]">Your Code Our CULT</h2>
            <button
              className="bg-[var(--accent)] text-white border-none py-2 px-6 w-fit rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
              onClick={loginWithGitHub}
            >
              <FontAwesomeIcon icon={faGithubBrands} /> Sign in with GitHub
            </button>
            <input
              type="text"
              id="name-input"
              placeholder="Name"
              className="w-full p-2 my-2 text-white  border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label="Name"
            />
            <input
              type="text"
              id="github-username-input"
              placeholder="GitHub Username"
              className="w-full p-2 my-2 text-white border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label="GitHub Username"
            />
            <button
              className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center w-fit gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
              onClick={joinCommunity}
            >
              Sign in
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      {isLoggedIn && (
        <>
          <header className="flex items-center py-4 bg-[var(--card-bg)] backdrop-blur-[5px] sticky top-0 z-[1000] rounded-b-2xl shadow-[0_4px_20px_var(--shadow)] overflow-x-hidden">
            <div className="container mx-auto px-5 flex items-center justify-between flex-wrap gap-5">
              <div className="flex items-center gap-5 flex-shrink-0">
                <button
                  className="bg-[var(--card-bg)] rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform duration-200"
                  onClick={toggleSidebar}
                  aria-label="Toggle navigation menu"
                >
                  <FontAwesomeIcon icon={faBars} className="text-xl" />
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[var(--accent)] md:text-3xl">CodeCULT</span>
                </div>

              </div>

              <button
                className="bg-[var(--card-bg)] rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 hover:border-2 hover:border-[var(--accent)] transition-all duration-200"
                onClick={toggleTheme}
                aria-label="Toggle between light and dark mode"
              >
                <span className="text-xl">{theme === 'light' ? '☀️' : '🌙'}</span>
              </button>

            </div>
          </header>

          {/* Sidebar */}
          <div
            className={`fixed top-0 ${sidebarOpen ? 'left-0' : '-left-64'} w-64 h-full bg-gradient-to-br from-[var(--card-bg)] to-white/20 backdrop-blur-[5px] p-5 transition-all duration-300 z-[1001] shadow-[0_0_20px_rgba(0,0,0,0.1)] flex flex-col justify-between md:w-48 md:${sidebarOpen ? 'left-0' : '-left-48'}`}
          >
            <nav className="flex flex-col">
              {['home', 'tracks', 'community', 'projects', 'events', 'blog', 'join'].map((page) => (
                <a
                  key={page}
                  href="#"
                  className="relative flex items-center text-[var(--text)] my-5 p-2 no-underline text-lg font-medium hover:text-[black] hover:translate-x-1 hover:shadow-[0_0_10px_rgba(74,144,226,0.3)] rounded-lg transition-all duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(page);
                  }}
                  aria-label={page.charAt(0).toUpperCase() + page.slice(1)}
                >
                  <FontAwesomeIcon
                    icon={
                      page === 'home'
                        ? faHome
                        : page === 'tracks'
                          ? faBook
                          : page === 'community'
                            ? faUsers
                            : page === 'projects'
                              ? faCode
                              : page === 'events'
                                ? faCalendar
                                : page === 'blog'
                                  ? faBlog
                                  : faSignInAlt
                    }
                    className="mr-2 text-lg hover:scale-110 transition-transform duration-200"
                  />
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                  {page !== 'join' && (
                    <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"></span>
                  )}
                </a>
              ))}
              <a
                href="#"
                className="flex items-center text-[var(--text)] my-5 p-2 no-underline text-lg font-medium hover:text-[var(--accent)] hover:translate-x-1 hover:shadow-[0_0_10px_rgba(74,144,226,0.3)] rounded-lg transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  showLogoutPage();
                }}
                aria-label="Logout"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-lg hover:scale-110 transition-transform duration-200" />
                Logout
              </a>
            </nav>
            <div className="flex items-center gap-2 p-2 border-t border-white/20 mt-5">
              <img
                src={user ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop' : 'https://github.com/${user.githubUsername}.png?size=40'}
                alt={user ? `${user.githubUsername}'s profile image` : 'Top contributor image'}
                className="w-10 h-10 rounded-full object-cover border-2 border-[var(--accent)]"
              />
              <span className="text-sm font-medium">{user ? `Welcome, ${user.githubUsername}` : 'Top Contributor: CodeMaster'}</span>
            </div>
          </div>
          <div
            className={`fixed inset-0 bg-black/50 z-[1000] ${sidebarOpen ? 'block' : 'hidden'}`}
            onClick={toggleSidebar}
          ></div>
          <main className="flex-1 flex flex-col items-center">
            {currentPage === 'home' && (
              <section className="w-full max-w-[1200px] my-10">
                {/* Hero Section */}
                <div className="text-center py-16 px-5 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] text-white rounded-2xl mx-4 md:py-20 md:px-10">
                  <h1 className="text-4xl md:text-5xl font-extrabold leading-tight md:leading-snug mb-4 text-gray-900 tracking-tight">
                    Fuel Your Coding Journey with
                    <span className="inline-block ml-2 px-2 py-1 bg-black text-[#4CAF50] rounded-md shadow-md text-[1.2em]">
                      CodeCULT
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl mb-5">
                    Learn, build, and grow in a developer-first community. No fluff, just code.
                  </p>
                  <div className="flex flex-wrap justify-center gap-5">
                    <button
                      className="bg-[var(--accent)] text-white py-2 px-6 rounded-lg flex items-center gap-2 font-medium 
                       hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 
                       active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 m-1.5"
                      onClick={() => navigateTo('join')}
                    >
                      <FontAwesomeIcon icon={faSignInAlt} /> Join Community
                    </button>
                    <button
                      className="bg-[var(--accent)] text-white py-2 px-6 rounded-lg flex items-center gap-2 font-medium 
                       hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 
                       active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 m-1.5"
                      onClick={() => navigateTo('tracks')}
                    >
                      <FontAwesomeIcon icon={faBook} /> Explore Tracks
                    </button>
                  </div>
                </div>

                {/* Features & ROI Section */}
                <div className="container mx-auto px-5 my-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                    {Array.from({ length: 1 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 
                   shadow-[0_8px_40px_var(--shadow)]  transition-transform duration-300"
                      >
                        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-[var(--accent)]">
                          Why CodeCULT?
                        </h2>
                        <div className="container mx-auto px-5 my-10">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* 1. Project-based learning */}
                            <div className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300">
                              <div className="flex items-start gap-4">
                                <FontAwesomeIcon icon={faCode} className="text-3xl text-[var(--accent)]" />
                                <div>
                                  <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Project-based learning</h3>
                                  <p className="text-[var(--text)] text-base">Learn by building real-world projects — not just theory.</p>
                                </div>
                              </div>
                            </div>

                            {/* 2. Active Discord community */}
                            <div className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300">
                              <div className="flex items-start gap-4">
                                <FontAwesomeIcon icon={faUsers} className="text-3xl text-[var(--accent)]" />
                                <div>
                                  <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Active Discord community</h3>
                                  <p className="text-[var(--text)] text-base">Collaborate, ask questions, and grow with dev-minded peers.</p>
                                </div>
                              </div>
                            </div>

                            {/* 3. Open-source contributions */}
                            <div className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300">
                              <div className="flex items-start gap-4">
                                <FontAwesomeIcon icon={faGithubBrands} className="text-3xl text-[var(--accent)]" />
                                <div>
                                  <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Open-source contributions</h3>
                                  <p className="text-[var(--text)] text-base">Get involved in real open-source projects and build your profile.</p>
                                </div>
                              </div>
                            </div>

                            {/* 4. Monthly hackathons */}
                            <div className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300">
                              <div className="flex items-start gap-4">
                                <FontAwesomeIcon icon={faTrophy} className="text-3xl text-[var(--accent)]" />
                                <div>
                                  <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Monthly hackathons</h3>
                                  <p className="text-[var(--text)] text-base">Compete, collaborate, and showcase your skills every month.</p>
                                </div>
                              </div>
                            </div>

                            {/* 5. Structured learning tracks */}
                            <div className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300">
                              <div className="flex items-start gap-4">
                                <FontAwesomeIcon icon={faBookOpen} className="text-3xl text-[var(--accent)]" />
                                <div>
                                  <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Structured learning tracks</h3>
                                  <p className="text-[var(--text)] text-base">Follow curated tracks for Web, AI, Blockchain and more.</p>
                                </div>
                              </div>
                            </div>

                            {/* 6. Peer mentorship */}
                            <div className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300">
                              <div className="flex items-start gap-4">
                                <FontAwesomeIcon icon={faComments} className="text-3xl text-[var(--accent)]" />
                                <div>
                                  <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Peer mentorship</h3>
                                  <p className="text-[var(--text)] text-base">Learn with and from others through guided peer mentorship.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


                {/* Learning ROI Calculator Card */}
                <div className="bg-[var(--card-bg)] w-full  max-w-[1170px] my-10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 
                        shadow-[0_8px_40px_var(--shadow)] flex flex-col justify-between hover:-translate-y-1 
                        transition-transform duration-300 ease-in-out mx-auto"
                >
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-[var(--accent)]">
                    Learning ROI Calculator
                  </h2>

                  {/* Sliders */}
                  <div className="space-y-8">
                    <div>
                      <label htmlFor="time-slider" className="block text-base md:text-lg font-medium mb-2 text-[var(--text)]">
                        Time Invested (hrs/week): <span className="font-semibold">{time}</span>
                      </label>
                      <input
                        id="time-slider"
                        type="range"
                        min="5"
                        max="40"
                        value={time}
                        onChange={(e) => setTime(parseInt(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none bg-[var(--accent)] cursor-pointer"
                      />
                    </div>
                    <div>
                      <label htmlFor="skills-slider" className="block text-base md:text-lg font-medium mb-2 text-[var(--text)]">
                        Skills Gained: <span className="font-semibold">{skills}</span>
                      </label>
                      <input
                        id="skills-slider"
                        type="range"
                        min="1"
                        max="10"
                        value={skills}
                        onChange={(e) => setSkills(parseInt(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none bg-[var(--accent)] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* ROI Circle */}
                  <div className="flex flex-col items-center gap-4 mt-10">
                    <div
                      className="w-[150px] h-[150px] rounded-full flex items-center justify-center shadow-[0_4px_30px_var(--accent)] 
                         relative transition-all duration-500"
                      style={{
                        background: `conic-gradient(var(--accent) ${roi}%, rgba(255,255,255,0.08) ${roi}% 100%)`,
                      }}
                      role="img"
                      aria-label={`Learning ROI: ${roi}%`}
                    >
                      <div className="w-[115px] h-[115px] bg-[var(--bg)] rounded-full flex items-center justify-center shadow-inner">
                        <span className="text-2xl font-bold text-[var(--accent)]">{roi}%</span>
                      </div>
                    </div>
                    <p className="text-base md:text-lg font-medium text-[var(--text)]">
                      Mastery in <span className="font-semibold">{masteryWeeks}</span> weeks
                    </p>
                  </div>
                </div>

              </section >
            )
            }



            {/* Learning Tracks */}
            {
              currentPage === 'tracks' && (
                <section className="w-full max-w-[1200px] my-10">
                  <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
                    <h2 className="text-3xl font-bold mb-5 md:text-4xl">Learning Tracks</h2>
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-6 flex-1 hover:-translate-y-1 transition-transform duration-300 m-2">
                        <FontAwesomeIcon icon={faCode} className="text-4xl text-[var(--accent)] mb-4" />
                        <h3 className="text-2xl font-semibold mb-3 md:text-3xl">Frontend Development</h3>
                        <p className="text-base md:text-lg">Master React, Vue, and modern UI/UX. Build responsive apps.</p>
                        <button
                          className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mt-4"
                          onClick={() => navigateToTrack('frontend')}
                        >
                          Start Track
                        </button>
                      </div>
                      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-6 flex-1 hover:-translate-y-1 transition-transform duration-300 m-2">
                        <FontAwesomeIcon icon={faServer} className="text-4xl text-[var(--accent)] mb-4" />
                        <h3 className="text-2xl font-semibold mb-3 md:text-3xl">Backend & APIs</h3>
                        <p className="text-base md:text-lg">Learn Node.js, Express, and database design. Build scalable APIs.</p>
                        <button
                          className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mt-4"
                          onClick={() => navigateToTrack('backend')}
                        >
                          Start Track
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )
            }

            {/* Community */}
            {
              currentPage === 'community' && (
                <section className="w-full max-w-[1200px] my-10">
                  <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
                    <h2 className="text-3xl font-bold mb-5 md:text-4xl">Our Community</h2>
                    <p className="text-base md:text-lg">Join thousands of developers on Discord, GitHub, and more.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                      <div className="bg-[var(--card-bg)] rounded-[15px] p-4 text-center hover:-translate-y-1 hover:shadow-[0_8px_20px_var(--shadow)] transition-all duration-300">
                        <img
                          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop"
                          alt="Contributor 1"
                          className="w-20 h-20 rounded-full mb-3 mx-auto object-cover border-2 border-[var(--accent)]"
                        />
                        <h4 className="text-xl font-semibold">CodeMaster</h4>
                        <p className="text-base md:text-lg">50+ PRs | Frontend Mentor</p>
                      </div>
                      <div className="bg-[var(--card-bg)] rounded-[15px] p-4 text-center hover:-translate-y-1 hover:shadow-[0_8px_20px_var(--shadow)] transition-all duration-300">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
                          alt="Contributor 2"
                          className="w-20 h-20 rounded-full mb-3 mx-auto object-cover border-2 border-[var(--accent)]"
                        />
                        <h4 className="text-xl font-semibold">DevQueen</h4>
                        <p className="text-base md:text-lg">30+ PRs | Backend Guru</p>
                      </div>
                    </div>
                    <button
                      className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mt-5 mx-auto"
                      onClick={joinDiscord}
                    >
                      <FontAwesomeIcon icon={faDiscordBrands} /> Join Discord
                    </button>
                  </div>
                </section>
              )
            }

            {/* Projects */}
            {
              currentPage === 'projects' && (
                <section className="w-full max-w-[1200px] my-10">
                  <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
                    <h2 className="text-3xl font-bold mb-5 md:text-4xl">Featured Projects</h2>
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-6 flex-1 hover:-translate-y-1 transition-transform duration-300 m-2">
                        <FontAwesomeIcon icon={faCode} className="text-4xl text-[var(--accent)] mb-4" />
                        <h3 className="text-2xl font-semibold mb-3 md:text-3xl">CodeCULT Portfolio Builder</h3>
                        <p className="text-base md:text-lg">A tool to create stunning developer portfolios.</p>
                        <a
                          href="https://github.com/codecult/portfolio-builder"
                          className="bg-[var(--accent)] w-fit text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mt-4 no-underline"
                        >
                          <FontAwesomeIcon icon={faGithubBrands} /> View on GitHub
                        </a>
                      </div>
                      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-6 flex-1 hover:-translate-y-1 transition-transform duration-300 m-2">
                        <FontAwesomeIcon icon={faCode} className="text-4xl text-[var(--accent)] mb-4" />
                        <h3 className="text-2xl font-semibold mb-3 md:text-3xl">Community Blog Platform</h3>
                        <p className="text-base md:text-lg">A collaborative blogging app for developers.</p>
                        <a
                          href="https://github.com/codecult/blog-platform"
                          className="bg-[var(--accent)] w-fit text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mt-4 no-underline"
                        >
                          <FontAwesomeIcon icon={faGithubBrands} /> View on GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              )
            }

            {/* Events */}
            {
              currentPage === 'events' && (
                <section className="w-full max-w-[1200px] my-10">
                  <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
                    <h2 className="text-3xl font-bold mb-5 md:text-4xl">Events & Workshops</h2>
                    <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-5 mb-4 m-2 flex flex-col gap-4">
                      <h3 className="text-2xl font-semibold md:text-3xl">Web3 Hackathon</h3>
                      <p className="text-base md:text-lg">Date: August 10, 2025 | Online</p>
                      <button
                        className="bg-[var(--accent)] w-fit text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
                        onClick={() => registerEvent('web3-hackathon')}
                      >
                        Register Now
                      </button>
                    </div>
                    <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-5 m-2 flex flex-col gap-4">
                      <h3 className="text-2xl font-semibold md:text-3xl">React Workshop</h3>
                      <p className="text-base md:text-lg">Date: August 15, 2025 | Live on YouTube</p>
                      <button
                        className="bg-[var(--accent)] w-fit text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
                        onClick={() => registerEvent('react-workshop')}
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                </section>
              )
            }

            {/* Blog */}
            {
              currentPage === 'blog' && (
                <section className="w-full max-w-[1200px] my-10">
                  <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
                    <h2 className="text-3xl font-bold mb-5 md:text-4xl">Blog & Insights</h2>
                    <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-5 mb-4 m-2 flex flex-col gap-4">
                      <h3 className="text-2xl font-semibold md:text-3xl">Building a REST API with Node.js</h3>
                      <p className="text-base md:text-lg">Learn how to create a scalable API in this step-by-step guide.</p>
                      <a
                        href="#"
                        className="bg-[var(--accent)] w-fit text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 no-underline"
                      >
                        Read More
                      </a>
                    </div>
                    <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-5 m-2 flex flex-col gap-4">
                      <h3 className="text-2xl font-semibold md:text-3xl">Why Open-Source Matters</h3>
                      <p className="text-base md:text-lg">Our community’s take on contributing to open-source projects.</p>
                      <a
                        href="#"
                        className="bg-[var(--accent)] w-fit text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 no-underline"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </section>
              )
            }

            {/* Join Us */}
            {
              currentPage === 'join' && (
                <section className="w-full max-w-[1200px] my-10">
                  <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
                    <h2 className="text-3xl font-bold mb-5 md:text-4xl">Join CodeCULT</h2>
                    <form className="flex flex-col gap-4 max-w-[500px] mx-auto">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg"
                        aria-label="Your Name"
                        required
                      />
                      <input
                        type="text"
                        placeholder="GitHub Username"
                        className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg"
                        aria-label="GitHub Username"
                        required
                      />
                      <select
                        className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg"
                        aria-label="Role"
                      >
                        <option>Learner</option>
                        <option>Mentor</option>
                        <option>Contributor</option>
                        <option>Organizer</option>
                      </select>
                      <button
                        type="submit"
                        className="bg-[var(--accent)] w-fit text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
                      >
                        <FontAwesomeIcon icon={faSignInAlt} /> Join Now
                      </button>
                    </form>
                  </div>
                </section>
              )
            }
          </main >

          {/* Exit-Intent Popup */}
          {
            popupShown && (
              <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--card-bg)] backdrop-blur-[5px] p-8 rounded-2xl shadow-[0_8px_40px_var(--shadow)] z-[1002] text-center max-w-[400px] w-[90%]">
                <h2 className="text-3xl font-bold mb-5 md:text-4xl">Don’t Leave Yet!</h2>
                <p className="text-base md:text-lg">Join CodeCULT’s Discord community and start coding with us!</p>
                <button
                  className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mt-4 mx-auto"
                  onClick={joinDiscord}
                >
                  <FontAwesomeIcon icon={faDiscordBrands} /> Join Discord
                </button>
                <button
                  className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mt-2 mx-auto"
                  onClick={closeExitPopup}
                >
                  Stay and Explore
                </button>
              </div>
            )
          }

          {/* Footer */}
          <footer className="bg-[var(--card-bg)] backdrop-blur-[5px] p-10 rounded-t-2xl w-full mt-10 text-[var(--text)]">
            <div className="flex flex-col md:flex-row justify-between gap-8 max-w-[1200px] mx-auto px-5">
              <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
                <h4 className="text-lg font-semibold text-[var(--accent)] md:text-xl">About CodeCULT</h4>
                <p className="text-sm md:text-base">A developer-first community focused on learning, building, and growing through projects and collaboration.</p>
              </div>
              <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
                <h4 className="text-lg font-semibold text-[var(--accent)] md:text-xl">Quick Links</h4>
                {['home', 'tracks', 'community', 'projects', 'events', 'blog'].map((page) => (
                  <a
                    key={page}
                    href="#"
                    className="text-sm text-[var(--text)] no-underline hover:text-[var(--accent)] hover:translate-x-1 transition-all duration-200 md:hover:translate-x-0 md:text-base"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(page);
                    }}
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </a>
                ))}
              </div>
              <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
                <h4 className="text-lg font-semibold text-[var(--accent)] md:text-xl">Connect With Us</h4>
                <div className="flex gap-4 justify-center md:justify-start">
                  <a
                    href="https://github.com/codecult"
                    className="text-xl text-[var(--text)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-200"
                    aria-label="GitHub"
                  >
                    <FontAwesomeIcon icon={faGithubBrands} />
                  </a>
                  <a
                    href="https://discord.gg/codecult"
                    className="text-xl text-[var(--text)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-200"
                    aria-label="Discord"
                  >
                    <FontAwesomeIcon icon={faDiscordBrands} />
                  </a>
                  <a
                    href="https://twitter.com/codecult"
                    className="text-xl text-[var(--text)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-200"
                    aria-label="Twitter"
                  >
                    <FontAwesomeIcon icon={faTwitterBrands} />
                  </a>
                  <a
                    href="https://linkedin.com/company/codecult"
                    className="text-xl text-[var(--text)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-200"
                    aria-label="LinkedIn"
                  >
                    <FontAwesomeIcon icon={faLinkedinInBrands} />
                  </a>
                </div>
               
              </div>
               <form className="flex flex-col gap-4 max-w-[500px] mx-auto">
                  <input
                    type="email"
                    placeholder="get updtaes in mail.."
                    className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg"
                    aria-label="Email for newsletter"
                  />
                  <button
                    type="submit"
                    className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
                  >
                    Subscribe
                  </button>
                </form>
            </div>
            <div className="text-center mt-8 pt-5 border-t border-white/20">
              <div className="text-2xl font-bold text-[var(--accent)] mb-2 md:text-3xl">CodeCULT</div>
              <p className="text-sm opacity-80 md:text-base">© 2025 CodeCULT. All rights reserved.</p>
            </div>
          </footer>
        </>
      )
      }

      {/* Custom CSS for non-Tailwind styles */}
      <style>{`
       :root {
  --bg: #E0E0E0;
  --bg-body: #E0E0E0;
  --card-bg: rgba(245, 245, 245, 0.7);
  --shadow: rgba(209, 209, 209, 0.5);
  --accent: #00D1B2;
  --accent-dark: #00A895;
  --text: #333;
  --blur: blur(5px);
  --tooltip-bg: #333;
  --tooltip-text: #fff;
  --auth-text: #1A1A1A;
  --table-border: rgba(0, 0, 0, 0.2);
}

[data-theme="dark"] {
  --bg: #0F111A; /* Rich dark indigo blue */
  --bg-body: #0F111A;
  --card-bg: rgba(23, 28, 40, 0.6); /* Deep navy with transparency */
  --shadow: rgba(0, 0, 0, 0.6);
  --accent: #22D3EE; /* Bright cyan accent */
  --accent-dark: #0EA5E9; /* Muted blue-cyan */
  --text: #F1F5F9; /* Light slate */
  --tooltip-bg: #1E293B; /* Dark slate blue */
  --tooltip-text: #E2E8F0;
  --auth-text: #F8FAFC;
  --table-border: rgba(255, 255, 255, 0.1);
}


        code, pre {
          font-family: 'Fira Code', monospace;
          background: rgba(0, 0, 0, 0.1);
          padding: 2px 4px;
          border-radius: 4px;
        }

        [data-theme="dark"] code, [data-theme="dark"] pre {
          background: rgba(255, 255, 255, 0.1);
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 25px;
          height: 25px;
          background: var(--accent);
          border-radius: 50%;
          box-shadow: 0 2px 10px var(--shadow);
          transition: transform 0.2s ease, background 0.3s ease;
        }

        input[type="range"]::-webkit-slider-thumb:hover,
        input[type="range"]::-webkit-slider-thumb:active {
          transform: scale(1.2);
          background: var(--accent-dark);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.2rem;
          }
          h2 {
            font-size: 1.8rem;
          }
          h3 {
            font-size: 1.4rem;
          }
          p, label, span {
            font-size: 0.9rem;
          }
          .bg-[var(--card-bg)] {
            padding: 20px;
          }
          .w-10 {
            width: 35px;
            height: 35px;
          }
          .text-xl {
            font-size: 1.2rem;
          }
          .text-2xl {
            font-size: 1.6rem;
          }
          .py-2 {
            padding-top: 8px;
            padding-bottom: 8px;
          }
          .px-6 {
            padding-left: 20px;
            padding-right: 20px;
          }
          .text-lg {
            font-size: 0.9rem;
          }
          .w-64 {
            width: 200px;
          }
          .-left-64 {
            left: -200px;
          }
        }
      `}</style>
    </div >
  );
};

export default App;
