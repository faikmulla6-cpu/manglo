export function StudioContent() {
  return (
    <>
      <svg
        className="svg-defs"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {"\n    "}
          <symbol id="i-spark" viewBox="0 0 24 24">
            <path d="m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3L12 3Z" />
          </symbol>
          {"\n    "}
          <symbol id="i-screen" viewBox="0 0 24 24">
            <rect x="3" y="4" width={18} height={13} rx="2" />
            <path d="M8 21h8m-4-4v4M3 8h18" />
          </symbol>
          {"\n    "}
          <symbol id="i-check" viewBox="0 0 24 24">
            <path d="m5 12 4 4L19 6" />
          </symbol>
          {"\n    "}
          <symbol id="i-plus" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" />
          </symbol>
          {"\n    "}
          <symbol id="i-close" viewBox="0 0 24 24">
            <path d="m6 6 12 12M6 18 18 6" />
          </symbol>
          {"\n    "}
          <symbol id="i-menu" viewBox="0 0 24 24">
            <path d="M4 8h16M4 16h16" />
          </symbol>
          {"\n    "}
          <symbol id="i-pointer" viewBox="0 0 24 24">
            <path d="m4 3 6 18 3-8 8-3L4 3Z" />
          </symbol>
          {"\n    "}
          <symbol id="i-code" viewBox="0 0 24 24">
            <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20" />
          </symbol>
          {"\n    "}
          <symbol id="i-globe" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <ellipse cx="12" cy="12" rx="4" ry="9" />
            <path d="M3 12h18" />
          </symbol>
          {"\n    "}
          <symbol id="i-calendar" viewBox="0 0 24 24">
            <rect x="3" y="5" width={18} height={16} rx="3" />
            <path d="M7 3v4m10-4v4M3 10h18m-11 5 2 2 4-4" />
          </symbol>
          {"\n    "}
          <symbol id="i-mail" viewBox="0 0 24 24">
            <rect x="3" y="5" width={18} height={14} rx="3" />
            <path d="m4 7 8 6 8-6" />
          </symbol>
          {"\n    "}
          <symbol id="i-play" viewBox="0 0 24 24">
            <path d="m9 5 11 7-11 7V5Z" />
          </symbol>
          {"\n    "}
          <symbol id="i-layers" viewBox="0 0 24 24">
            <path d="m12 3 10 6-10 6L2 9l10-6Zm-9 11 9 5 9-5M3 18l9 5 9-5" />
          </symbol>
          {"\n  "}
        </defs>
      </svg>
      <section className="brand-bridge" aria-label="Founder’s products">
        <div className="shell brand-bridge-inner">
          <p>
            {"Good ideas deserve"}
            <br />
            <strong>{"thoughtful execution."}</strong>
          </p>
          <div className="bridge-rule"></div>
          <a
            href="https://clipkaro.pro/"
            className="real-brand clipkaro-brand"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="assets/clipkaro-logo.webp"
              width={46}
              height={46}
              alt=""
            />
            <span>
              {"ClipKaro"}
              <span className="ai-text">{"AI"}</span>
            </span>
          </a>
          <a
            href="https://zyvello.pro/"
            className="real-brand zyvello-brand"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="assets/zyvello-logo.webp" width={40} height={40} alt="" />
            <span>
              {"Zyvello"}
              <small>{"ACADEMY"}</small>
            </span>
          </a>
          <span className="bridge-context">
            {"REAL PRODUCTS."}
            <br />
            {"BUILT BY OUR FOUNDER."}
          </span>
        </div>
      </section>
      {"\n  "}
      <section
        id="work"
        className="work section shell"
        aria-labelledby="work-title"
      >
        {"\n    "}
        <div className="section-top reveal">
          <div>
            <span className="overline">{"SELECTED FOUNDER WORK"}</span>
            <h2 id="work-title">
              {"From an idea."}
              <br />
              <em>{"To something real."}</em>
            </h2>
          </div>
          <p>
            {
              "From creator software to practical education. Explore the products behind the person building your next website."
            }
          </p>
        </div>
        {"\n    "}
        <div className="project-grid">
          {"\n      "}
          <article className="project project-clip reveal">
            <a
              className="project-art clip-art"
              href="https://clipkaro.pro/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Explore ClipKaro AI’s live website"
            >
              <div className="project-glow" aria-hidden="true"></div>
              <span className="project-category">{"CREATOR SOFTWARE"}</span>
              <img
                className="project-floating-logo"
                src="assets/clipkaro-logo.webp"
                width={70}
                height={70}
                alt="ClipKaro AI logo"
              />
              <div className="clip-app" aria-hidden="true">
                <div className="app-chrome">
                  <span className="window-dots">
                    <i></i>
                    <i></i>
                    <i></i>
                  </span>
                  <span>{"clipkaro.pro"}</span>
                  <svg className="icon">
                    <use href="#i-globe" />
                  </svg>
                </div>
                <div className="clip-app-inner">
                  <div className="clip-sidebar">
                    <img
                      src="assets/clipkaro-logo.webp"
                      width={25}
                      height={25}
                      alt=""
                    />
                    <span>{"Workspace"}</span>
                    <b>{"Create"}</b>
                    <span>{"Projects"}</span>
                    <span>{"Studio"}</span>
                    <span>{"Post Karo"}</span>
                    <div className="sidebar-bottom">
                      <span className="avatar-initial">{"C"}</span>
                      {" Creator workspace"}
                    </div>
                  </div>
                  <div className="clip-workspace">
                    <div className="workspace-heading">
                      <div>
                        <small>{"FROM RECORDING TO READY"}</small>
                        <strong>{"Make the moment."}</strong>
                      </div>
                      <span className="app-chip">{"Creator Studio"}</span>
                    </div>
                    <div className="video-canvas">
                      <div className="long-video">
                        <img src="assets/clipkaro-usecase-founder.jpg" alt="" />
                        <span className="video-corner">
                          {"ORIGINAL RECORDING"}
                        </span>
                        <span className="video-copy">
                          {"Ideas worth"}
                          <br />
                          {"sharing."}
                        </span>
                        <span className="play-icon">
                          <svg className="icon">
                            <use href="#i-play" />
                          </svg>
                        </span>
                      </div>
                      <div className="short-video">
                        <span>{"SHORT PREVIEW"}</span>
                        <strong>
                          {"ONE IDEA."}
                          <br />
                          {"MORE"}
                          <br />
                          <em>{"IMPACT."}</em>
                        </strong>
                        <span className="caption-pill">
                          {"Your story, reframed."}
                        </span>
                      </div>
                    </div>
                    <div className="timeline">
                      <span>{"CLIP TIMELINE"}</span>
                      <div className="waveform"></div>
                      <span className="timeline-playhead"></span>
                    </div>
                    <div className="workspace-tags">
                      <span>{"Find moments"}</span>
                      <span>{"Refine captions"}</span>
                      <span>{"Publish"}</span>
                    </div>
                  </div>
                </div>
              </div>
              <span className="art-caption">
                {"ILLUSTRATIVE PRODUCT WALKTHROUGH"}
              </span>
              <span className="project-open">
                {"Explore live site "}
                <svg className="icon">
                  <use href="#i-plus" />
                </svg>
              </span>
            </a>
            <div className="project-description">
              <div>
                <h3>{"ClipKaro AI"}</h3>
                <p>{"One recording. More ways to tell your story."}</p>
              </div>
              <span className="project-tag">{"FOUNDER-OWNED PRODUCT"}</span>
            </div>
          </article>
          {"\n      "}
          <article className="project project-academy reveal">
            <a
              className="project-art academy-art"
              href="https://zyvello.pro/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Explore Zyvello Academy’s live website"
            >
              <span className="project-category">{"PRACTICAL EDUCATION"}</span>
              <div className="academy-screen" aria-hidden="true">
                <div className="academy-nav">
                  <img
                    src="assets/zyvello-logo.webp"
                    width={25}
                    height={25}
                    alt=""
                  />
                  <strong>
                    {"Zyvello "}
                    <small>{"ACADEMY"}</small>
                  </strong>
                  <span>{"Library    Educator"}</span>
                </div>
                <div className="academy-screen-copy">
                  <small>{"LEARN. BUILD. PUT IT TO WORK."}</small>
                  <strong>
                    {"BUILD"}
                    <br />
                    {"WHAT’S"}
                    <br />
                    <span>{"NEXT."}</span>
                  </strong>
                  <span className="academy-screen-button">
                    {"Explore the library"}
                  </span>
                </div>
                <img
                  className="academy-portrait"
                  src="assets/faik-portrait.jpg"
                  width={800}
                  height={1000}
                  alt=""
                />
                <div className="academy-screen-footer">
                  <span>{"Technology, taught practically."}</span>
                  <span>{"ZYVELLO.PRO"}</span>
                </div>
              </div>
              <div className="academy-floating">
                <img
                  src="assets/zyvello-logo.webp"
                  width={34}
                  height={34}
                  alt="Zyvello Academy logo"
                />
                <div>
                  {"Practical knowledge."}
                  <br />
                  <strong>{"Personal delivery."}</strong>
                </div>
              </div>
              <span className="art-caption">
                {"VISUAL STUDY OF THE FOUNDER’S PRODUCT"}
              </span>
              <span className="project-open">
                {"Explore live site "}
                <svg className="icon">
                  <use href="#i-plus" />
                </svg>
              </span>
            </a>
            <div className="project-description">
              <div>
                <h3>{"Zyvello Academy"}</h3>
                <p>{"A personal approach to learning technology."}</p>
              </div>
              <span className="project-tag">{"FOUNDER-OWNED PRODUCT"}</span>
            </div>
          </article>
          {"\n    "}
        </div>
        {"\n    "}
        <div className="work-footnote">
          <svg className="icon">
            <use href="#i-layers" />
          </svg>
          <p>
            {
              "Real founder-owned products. The artwork above illustrates their visual direction; visit the live sites to explore them."
            }
          </p>
        </div>
        {"\n  "}
      </section>
      {"\n  "}
      <section
        id="expertise"
        className="expertise section"
        aria-labelledby="expertise-title"
      >
        <div className="shell">
          {"\n    "}
          <div className="section-top reveal">
            <div>
              <span className="overline">
                {"THOUGHTFUL AT EVERY TOUCHPOINT"}
              </span>
              <h2 id="expertise-title">
                {"Beautiful is the beginning."}
                <br />
                <em>{"Useful is the point."}</em>
              </h2>
            </div>
            <p>
              {
                "Looking good gets attention. Clarity, care, and a natural next step turn that attention into a conversation."
              }
            </p>
          </div>
          {"\n    "}
          <div className="expertise-grid">
            {"\n      "}
            <article className="design-card reveal">
              <div className="service-overline">
                <span className="icon-box">
                  <svg className="icon">
                    <use href="#i-screen" />
                  </svg>
                </span>
                <span>{"WEB DESIGN & DEVELOPMENT"}</span>
              </div>
              <h3>
                {"A website that"}
                <br />
                {"could only be yours."}
              </h3>
              <p>
                {
                  "Distinctive layouts, thoughtful typography, and clear service pages. Built around your business and the people you want to reach."
                }
              </p>
              <div className="design-canvas" aria-hidden="true">
                <div className="canvas-grid"></div>
                <div className="mini-site">
                  <div className="mini-site-nav">
                    <span className="mini-monogram">{"a."}</span>
                    <span>{"Our approach   Projects   Contact"}</span>
                  </div>
                  <div className="mini-site-content">
                    <small>{"ALDER / PLUMBING"}</small>
                    <strong>
                      {"Good work."}
                      <br />
                      <em>{"Clear flow."}</em>
                    </strong>
                    <span className="mini-site-cta">{"Let’s talk"}</span>
                  </div>
                  <div className="mini-site-shape"></div>
                </div>
                <span className="design-cursor">
                  <svg className="icon">
                    <use href="#i-pointer" />
                  </svg>
                  <b>{"Made for your business"}</b>
                </span>
                <span className="canvas-label">
                  {"ILLUSTRATIVE DESIGN STUDY"}
                </span>
              </div>
            </article>
            {"\n      "}
            <div className="expertise-stack">
              <article className="journey-card reveal">
                <div className="service-overline">
                  <span className="icon-box">
                    <svg className="icon">
                      <use href="#i-pointer" />
                    </svg>
                  </span>
                  <span>{"MESSAGING & ENQUIRIES"}</span>
                </div>
                <h3>
                  {"Make the next step"}
                  <br />
                  {"feel effortless."}
                </h3>
                <p>
                  {
                    "Clear messaging and purposeful enquiry flows help people understand your offer and get in touch."
                  }
                </p>
                <div className="journey-visual" aria-hidden="true">
                  <span>
                    <svg className="icon">
                      <use href="#i-screen" />
                    </svg>
                    {" Discover"}
                  </span>
                  <i></i>
                  <span className="journey-active">
                    <svg className="icon">
                      <use href="#i-mail" />
                    </svg>
                    {" Enquire"}
                  </span>
                  <i></i>
                  <span>
                    <svg className="icon">
                      <use href="#i-calendar" />
                    </svg>
                    {" Connect"}
                  </span>
                </div>
              </article>
              <article className="care-card reveal">
                <div className="care-illustration" aria-hidden="true">
                  <div className="care-orbit"></div>
                  <div className="care-core">
                    <svg className="icon">
                      <use href="#i-code" />
                    </svg>
                  </div>
                </div>
                <div>
                  <span className="overline">{"LAUNCH & BEYOND"}</span>
                  <h3>
                    {"Built with the"}
                    <br />
                    {"next chapter in mind."}
                  </h3>
                  <p>
                    {
                      "Agree hosting, handover, and ongoing care before the build. Know what you’re getting and what happens next."
                    }
                  </p>
                </div>
              </article>
            </div>
            {"\n    "}
          </div>
          {"\n    "}
          <div className="concept-links reveal">
            <span>{"Explore a direction for your trade"}</span>
            <a href="plumbing.html">
              {"Plumbing "}
              <svg className="icon">
                <use href="#i-plus" />
              </svg>
            </a>
            <a href="roofing.html">
              {"Roofing "}
              <svg className="icon">
                <use href="#i-plus" />
              </svg>
            </a>
            <a href="electrical.html">
              {"Electrical "}
              <svg className="icon">
                <use href="#i-plus" />
              </svg>
            </a>
            <small>{"FICTIONAL DESIGN CONCEPTS"}</small>
          </div>
          {"\n  "}
        </div>
      </section>
      {"\n  "}
      <section className="method section" aria-labelledby="method-title">
        <div className="method-glow" aria-hidden="true"></div>
        <div className="shell">
          <div className="method-heading reveal">
            <span className="overline overline-light">
              {"A PERSONAL WAY OF WORKING"}
            </span>
            <h2 id="method-title">
              {"One conversation."}
              <br />
              <em>{"A clear way forward."}</em>
            </h2>
            <p>
              {"Good work starts with understanding."}
              <br />
              {"We keep the process clear, collaborative, and close to you."}
            </p>
          </div>
          <div className="method-track">
            <article className="reveal">
              <span className="method-icon">
                <svg className="icon">
                  <use href="#i-mail" />
                </svg>
              </span>
              <h3>{"Understand your world."}</h3>
              <p>
                {
                  "Your business, your customers, your ambitions. We start by listening, then define what the site needs to do."
                }
              </p>
              <span className="method-label">{"DISCOVERY & DIRECTION"}</span>
            </article>
            <article className="reveal">
              <span className="method-icon">
                <svg className="icon">
                  <use href="#i-layers" />
                </svg>
              </span>
              <h3>{"Make the vision tangible."}</h3>
              <p>
                {
                  "Review the direction and agree the scope, content, pricing, and timeline. See where we’re going before we build."
                }
              </p>
              <span className="method-label">{"DESIGN & COLLABORATION"}</span>
            </article>
            <article className="reveal">
              <span className="method-icon">
                <svg className="icon">
                  <use href="#i-spark" />
                </svg>
              </span>
              <h3>{"Refine until it feels right."}</h3>
              <p>
                {
                  "Build, review, and check the details across screen sizes. Launch with the handover and support we’ve agreed."
                }
              </p>
              <span className="method-label">{"BUILD, POLISH & LAUNCH"}</span>
            </article>
          </div>
        </div>
      </section>
      {"\n  "}
      <section
        id="founder"
        className="founder section shell"
        aria-labelledby="founder-title"
      >
        <div className="founder-photo reveal">
          <img
            src="assets/faik-editorial.jpg"
            alt="Faik Hameed Mulla"
            width={800}
            height={1000}
            loading="lazy"
          />
          <span className="founder-photo-caption">
            {"THE PERSON BEHIND THE WORK."}
          </span>
          <div className="founder-photo-sign">
            {"Faik Mulla"}
            <span>{"Builder. Educator. Founder."}</span>
          </div>
        </div>
        <div className="founder-story reveal">
          <span className="overline">
            {"BUILDER FIRST. YOUR PARTNER NEXT."}
          </span>
          <h2 id="founder-title">
            {"A founder’s care."}
            <br />
            <em>{"In your corner."}</em>
          </h2>
          <p className="founder-lead">
            {"Your business isn’t a template."}
            <br />
            {"Your website shouldn’t feel like one."}
          </p>
          <p>
            {
              "I’m Faik Hameed Mulla. I build software, teach technology, and founded Zyvello Academy and ClipKaro AI."
            }
          </p>
          <p>
            {
              "With Manglo, I bring that same hands-on approach to service businesses: understand what matters, build with intention, and care about how it feels to use."
            }
          </p>
          <div className="founder-signature">
            <span className="signature-line"></span>
            <strong>
              {"Faik Hameed Mulla"}
              <small>{"FOUNDER, MANGLO STUDIO"}</small>
            </strong>
          </div>
          <div className="social-links">
            <a
              href="https://www.instagram.com/myself.fm/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {"Instagram "}
              <span>{"@myself.fm"}</span>
            </a>
            <a
              href="https://www.youtube.com/@FaikXcreator"
              target="_blank"
              rel="noopener noreferrer"
            >
              {"YouTube "}
              <span>{"FaikX"}</span>
            </a>
          </div>
        </div>
      </section>
      {"\n  "}
      <section id="faq" className="faq section" aria-labelledby="faq-title">
        <div className="shell faq-layout">
          <div className="reveal">
            <span className="overline">{"BEFORE WE SAY HELLO"}</span>
            <h2 id="faq-title">
              {"A little clarity."}
              <br />
              <em>{"Before the first call."}</em>
            </h2>
            <p>{"Something else on your mind?"}</p>
            <a className="contact-link" href="mailto:faik@manglo.shop">
              {"faik@manglo.shop"}
            </a>
          </div>
          <div className="faq-items reveal">
            <details>
              <summary>
                {"Is Manglo a good fit for my business?"}
                <svg className="icon">
                  <use href="#i-plus" />
                </svg>
              </summary>
              <p>
                {
                  "We focus on UK trades and service businesses that want a distinctive, clear website. If you have a different project in mind, share it with us and we’ll discuss the fit."
                }
              </p>
            </details>
            <details>
              <summary>
                {"What’s included, and what does it cost?"}
                <svg className="icon">
                  <use href="#i-plus" />
                </svg>
              </summary>
              <p>
                {
                  "Your written proposal will define pages, features, content, revisions, fees, hosting, and any ongoing care. We agree the scope, timeline, applicable taxes, and terms before work begins."
                }
              </p>
            </details>
            <details>
              <summary>
                {"Can you work with my existing website?"}
                <svg className="icon">
                  <use href="#i-plus" />
                </svg>
              </summary>
              <p>
                {
                  "Yes. Tell us what’s working, what isn’t, and share your current site. We’ll discuss whether a focused refresh or a new build makes sense."
                }
              </p>
            </details>
            <details>
              <summary>
                {"What happens when I book a demo?"}
                <svg className="icon">
                  <use href="#i-plus" />
                </svg>
              </summary>
              <p>
                {
                  "Share your email, project details, and preferred time. We’ll contact you to discuss your website and confirm a suitable meeting time. Submitting a request doesn’t reserve a calendar slot."
                }
              </p>
            </details>
            <details>
              <summary>
                {"Are these real client projects?"}
                <svg className="icon">
                  <use href="#i-plus" />
                </svg>
              </summary>
              <p>
                {
                  "ClipKaro AI and Zyvello Academy are real products owned by our founder. The trade design concepts are fictional examples. We show them separately so you can explore the work with context."
                }
              </p>
            </details>
          </div>
        </div>
      </section>
      {"\n  "}
      <section id="book-demo" className="closing shell">
        <div className="closing-inner reveal">
          <div className="closing-orbit" aria-hidden="true"></div>
          <span className="overline overline-light">
            {"SOMETHING GOOD STARTS WITH HELLO."}
          </span>
          <h2>
            {"Your next chapter."}
            <br />
            <em>{"Let’s make it remarkable."}</em>
          </h2>
          <p>
            {"Tell us what you’re building. We’ll bring a fresh perspective."}
          </p>
          <button className="button button-white" data-book>
            {"Book your website demo "}
            <svg className="icon">
              <use href="#i-plus" />
            </svg>
          </button>
          <span className="closing-note">
            {"A conversation. A direction. No payment details."}
          </span>
        </div>
      </section>
      {"\n  \n  "}
      <footer className="footer shell">
        <div className="footer-main">
          <a
            className="brand brand-dark"
            href="#"
            aria-label="Manglo Studio home"
          >
            <img src="assets/manglo-mark.svg" width={43} height={43} alt="" />
            <span>
              {"manglo"}
              <span className="brand-sub">{"STUDIO"}</span>
            </span>
          </a>
          <p>
            {"Considered design."}
            <br />
            {"Meaningful digital experiences."}
          </p>
          <div className="footer-contact">
            <span>{"LET’S MAKE SOMETHING GOOD."}</span>
            <a href="mailto:faik@manglo.shop">{"faik@manglo.shop"}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{"© 2026 Manglo Studio · Founded by Faik Hameed Mulla"}</span>
          <div>
            <a
              href="https://clipkaro.pro/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {"ClipKaro AI"}
            </a>
            <a
              href="https://zyvello.pro/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {"Zyvello Academy"}
            </a>
            <a href="privacy.html">{"Privacy"}</a>
          </div>
        </div>
      </footer>
      {"\n  "}
    </>
  );
}
