import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import { Pause, Play, Plus, X } from "lucide-react";
import type { EliasBook } from "@/components/ui/elias-author-hero";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StudioContent } from "./StudioContent";
import { RequestFields } from "./RequestFields";

const Elias = lazy(() => import("@/components/ui/elias-author-hero"));
const OriginalDemo = lazy(() => import("@/components/ui/elias-author-demo"));
const playbooks: EliasBook[] = [
  {
    label: "Studio playbooks",
    title: "Your Next Website",
    coverLines: ["Your", "next", "great", "website."],
    topics: ["Design", "Clarity"],
    art: "days",
    colors: { cover: "#d9e6ff", type: "#10223e", spine: "#7b9ee2" },
    chapter: "Design direction",
    chapterTitle: "First impressions matter.",
    text: "Start with what makes your business different. Bring that into the layout, the language, and the path people take from discovering your work to making an enquiry.",
  },
  {
    label: "Founder’s product",
    title: "ClipKaro AI",
    coverLines: ["One", "recording.", "More", "possibility."],
    topics: ["Creators", "Software"],
    art: "lamp",
    colors: { cover: "#d3e3d2", type: "#183b2d", spine: "#8fb59a" },
    chapter: "Creator workflow",
    chapterTitle: "Make the moment.",
    text: "ClipKaro AI helps creators turn recordings into short-form content, refine their edits in Creator Studio, and publish through Post Karo. Explore the live product in the selected work below.",
  },
  {
    label: "Founder’s product",
    title: "Zyvello Academy",
    coverLines: ["Learn.", "Build.", "Put it", "to work."],
    topics: ["Education", "Technology"],
    art: "path",
    colors: { cover: "#e2daf0", type: "#32283d", spine: "#b4a6d8" },
    chapter: "Practical education",
    chapterTitle: "Learning by doing.",
    text: "Zyvello Academy brings together Faik’s practical approach to teaching technology. Courses, ebooks, and resources are part of its learning direction. Explore the real academy below.",
  },
];

function MangloApp() {
  const [open, setOpen] = useState(location.hash === "#book-demo");
  const [activeSection, setActiveSection] = useState(location.hash || "#top");
  const demoOpener = useRef<HTMLElement | null>(null);
  const [paused, setPaused] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const requestId = useRef(crypto.randomUUID());
  const lastPayload = useRef("");
  const capture = new URLSearchParams(location.search).has("capture");
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const openDemo = (opener: HTMLElement) => {
    demoOpener.current = opener;
    setStatus("");
    setSuccess(false);
    setOpen(true);
  };

  const setDemoOpen = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen && location.hash === "#book-demo") {
      history.replaceState(history.state, "", location.pathname + location.search);
      setActiveSection("#top");
    }
  };

  useEffect(() => {
    const onNavigation = () => {
      const hash = location.hash || "#top";
      setActiveSection(hash);
      setOpen(hash === "#book-demo");
    };
    addEventListener("hashchange", onNavigation);
    addEventListener("popstate", onNavigation);
    return () => {
      removeEventListener("hashchange", onNavigation);
      removeEventListener("popstate", onNavigation);
    };
  }, []);

  useEffect(() => {
    if (status)
      document
        .querySelector("#form-status")
        ?.scrollIntoView({
          block: "nearest",
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        });
  }, [status]);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    if (!reduced.matches) {
      document
        .querySelectorAll(".reveal")
        .forEach((element) => observer.observe(element));
      document.documentElement.classList.add("motion-ready");
    }
    const onPreference = () => {
      if (reduced.matches)
        document.documentElement.classList.remove("motion-ready");
    };
    reduced.addEventListener("change", onPreference);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", onPreference);
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target instanceof Element ? event.target : null;
    const opener = target?.closest<HTMLElement>('[data-book], a[href="#book-demo"]');
    if (opener) {
      event.preventDefault();
      openDemo(opener);
    }
  };

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const fields = Object.fromEntries(new FormData(form));
    const payload = { ...fields, consent: new FormData(form).has("consent") };
    const serialised = JSON.stringify(payload);
    if (lastPayload.current && lastPayload.current !== serialised)
      requestId.current = crypto.randomUUID();
    lastPayload.current = serialised;
    setSending(true);
    setSuccess(false);
    setStatus("");
    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, request_id: requestId.current }),
      });
      let result: { error?: string; reference?: string };
      try {
        result = await response.json();
      } catch {
        throw new Error(
          "Please email faik@manglo.shop with your message and availability. We couldn’t confirm delivery from this form.",
        );
      }
      if (!response.ok)
        throw new Error(
          result.error || "Please try again later, or email faik@manglo.shop.",
        );
      setSuccess(true);
      setStatus(
        `Your request has been sent. We’ll contact you at ${fields.email} to agree a time. Reference: ${result.reference}.`,
      );
      form.reset();
      requestId.current = crypto.randomUUID();
      lastPayload.current = "";
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Please email faik@manglo.shop with your availability.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="manglo-app" onClick={handleClick}>
      <a className="skip-link" href="#work">
        Skip to selected work
      </a>
      <Suspense fallback={<div className="hero-loading">Manglo Studio</div>}>
        <Elias
          className="manglo-elias"
          brand={{ name: "Manglo", href: "#top" }}
          name={{ first: "Manglo", last: "Studio" }}
          navLinks={{
            left: [
              { label: "Home", href: "#top", active: activeSection === "#top" },
              { label: "Work", href: "#work", active: activeSection === "#work" },
            ],
            right: [
              { label: "Expertise", href: "#expertise", active: activeSection === "#expertise" },
              { label: "Meet Faik", href: "#founder", active: activeSection === "#founder" },
            ],
          }}
          navCta={{ label: "Book a demo", href: "#book-demo" }}
          navStatus={{ label: "Founder-led", detail: "India / UK" }}
          intro={{
            roles: ["Design", "Technology", "Purpose"],
            headline: [
              "Distinctive websites.",
              "A personal approach.",
              "A better first impression.",
            ],
            description:
              "A founder-led studio for service businesses ready to look as good online as they are in real life.",
          }}
          portrait={{
            src: "/assets/faik-cutout.webp",
            alt: "Faik Hameed Mulla, founder of Manglo Studio, wearing a black blazer and sunglasses",
            width: 1000,
            height: 1162,
          }}
          books={playbooks}
          bookCard={{
            href: "#work",
            open: "Open studio playbook:",
            close: "Close and show next studio playbook:",
            folio: "M",
          }}
          letter={{
            eyebrow: "A note from the studio",
            greeting: "Dear next chapter,",
            stamp: "Studio thought",
            postmark: "Manglo",
            seal: "M",
            sealing: "A thought for your project",
            messages: [
              "A website should feel unmistakably like the business behind it.",
              "Thoughtful design makes the first impression. A clear next step starts the conversation.",
              "Let’s build something you’re proud to put your name on.",
            ],
            counter: "Thought",
          }}
          socialLinks={[
            {
              label: "Instagram",
              href: "https://www.instagram.com/myself.fm/",
            },
            { label: "YouTube", href: "https://www.youtube.com/@FaikXcreator" },
            { label: "Zyvello", href: "https://zyvello.pro/" },
          ]}
          reducedMotion={capture || paused ? true : undefined}
          motion={{
            bookCycle: 7,
            letter: { perCharacter: 0.04 },
            cursor: { readLabel: "Read" },
          }}
          splash={{ openAt: 0.8, openDuration: 0.65, fontTimeout: 0.6 }}
        />
      </Suspense>
      <div className="experience-controls shell">
        <span>Interactive studio playbooks · illustrative design notes.</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}{" "}
          {paused ? "Resume motion" : "Pause motion"}
        </Button>
        <Button variant="outline" size="sm" onClick={(event) => openDemo(event.currentTarget)}>
          Book a demo <Plus size={14} />
        </Button>
      </div>
      <StudioContent />
      <Dialog open={open} onOpenChange={setDemoOpen}>
        <DialogContent
          className="request-dialog"
          showCloseButton={false}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            const opener = demoOpener.current || document.querySelector<HTMLElement>('.ea-nav-cta a');
            opener?.focus({ preventScroll: true });
          }}
        >
          <div className="request-dialog-tools">
            <DialogClose aria-label="Close demo form">
              <X size={18} aria-hidden="true" />
            </DialogClose>
          </div>
          <DialogHeader>
            <div className="dialog-brand">
              <img
                src="/assets/manglo-mark.svg"
                width="33"
                height="33"
                alt=""
              />
              MANGLO STUDIO
            </div>
            <span className="overline">YOUR NEXT CHAPTER STARTS HERE</span>
            <DialogTitle className="request-title">
              Let’s make an
              <br />
              <em>introduction.</em>
            </DialogTitle>
            <DialogDescription>
              Tell us a little about your business and when you’re free.
            </DialogDescription>
          </DialogHeader>
          <RequestFields
            onSubmit={submitRequest}
            sending={sending}
            status={status}
            success={success}
            today={today}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function App() {
  if (new URLSearchParams(location.search).get("demo") === "elias")
    return (
      <Suspense fallback={<p className="p-8">Loading component demo…</p>}>
        <OriginalDemo />
      </Suspense>
    );
  return <MangloApp />;
}
