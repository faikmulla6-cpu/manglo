"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDownToLine, ArrowRight, ArrowUpRight, Check, CheckCircle2, Crop,
  FileImage, FileOutput, Image, Layers2, LoaderCircle, RotateCcw,
  ShieldCheck, SlidersHorizontal, Sparkles, TrendingUp, Percent, WandSparkles,
} from "lucide-react";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import {
  calculateFromMessage, detectTool, fileSize, isImageTool, parseImageOptions,
  processImage, toolOptions,
} from "@/src/chat-engine";
import type { ToolId } from "@/src/chat-engine";

type ImageOutput = { url: string; originalUrl: string; name: string; width: number; height: number;
  bytes: number; originalBytes: number; format: string };
type Message = { id: number; role: "user" | "assistant"; text: string;
  title?: string; fileName?: string; output?: ImageOutput; error?: boolean; tool?: ToolId };

const icons = {
  "image-compressor": Layers2, "image-resizer": SlidersHorizontal,
  "image-converter": FileOutput, "image-cropper": Crop,
  "target-size-compressor": FileImage, "profit-calculator": TrendingUp,
  "discount-calculator": Percent,
};
const shortNames: Record<ToolId, string> = {
  "image-compressor": "Compress", "image-resizer": "Resize",
  "image-converter": "Convert", "image-cropper": "Crop",
  "target-size-compressor": "File limit", "profit-calculator": "Profit",
  "discount-calculator": "Discount",
};

function StreamingText({ text }: { text: string }) {
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(reduceMotion ? text.length : 0);
  useEffect(() => {
    if (reduceMotion) { setShown(text.length); return; }
    setShown(0);
    const timer = window.setInterval(() => setShown(index => {
      const next = Math.min(index + 9, text.length);
      if (next === text.length) window.clearInterval(timer);
      return next;
    }), 20);
    return () => window.clearInterval(timer);
  }, [text, reduceMotion]);
  return <p className="mchat-response-copy">{text.slice(0, shown)}{shown < text.length && <span className="mchat-caret" aria-hidden="true" />}</p>;
}

function ToolButton({ id, active, onClick }: { id: ToolId; active: boolean; onClick: () => void }) {
  const item = toolOptions.find(tool => tool.id === id)!;
  const Icon = icons[id];
  return <button type="button" onClick={onClick} aria-pressed={active}
    title={`${item.title} — ${item.subtitle}`}
    className={`mchat-tool-button ${active ? "is-active" : ""}`}>
    <Icon className="mchat-tool-icon" size={17} strokeWidth={1.7} />
    <span>{shortNames[id]}</span>
    {active && <Check className="mchat-tool-check" size={12} aria-hidden="true" />}
  </button>;
}

export function ToolChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [selected, setSelected] = useState<ToolId | null>(null);
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState<"thinking" | "processing" | null>(null);
  const [session, setSession] = useState(0);
  const [notice, setNotice] = useState("");
  const reduceMotion = useReducedMotion();
  const counter = useRef(0);
  const operation = useRef(0);
  const pendingFile = useRef<File | null>(null);
  const urls = useRef<string[]>([]);
  const threadEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length || stage) threadEnd.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "end" });
  }, [messages, stage, reduceMotion]);
  useEffect(() => () => { urls.current.forEach(URL.revokeObjectURL); }, []);

  const chooseTool = (id: ToolId) => {
    if (busy) return;
    setSelected(id);
    setDraft(toolOptions.find(tool => tool.id === id)!.prompt);
    setNotice("");
    document.getElementById("manglo-chat-prompt")?.focus();
  };

  const reply = (message: Omit<Message, "id" | "role">) => {
    setMessages(previous => [...previous, { ...message, id: ++counter.current, role: "assistant" }]);
  };

  const cancel = () => {
    ++operation.current;
    setBusy(false); setStage(null);
    reply({ title: "Stopped", text: "That action was stopped. Your previous results are still available." });
  };

  const send = async (input: string, newFile?: File) => {
    if (busy) return;
    const file = newFile ?? pendingFile.current ?? undefined;
    if (newFile) pendingFile.current = newFile;
    const text = input.trim() || (file ? "Compress this image" : "");
    if (!text) return;
    const tool = detectTool(text, selected);
    setMessages(previous => [...previous, { id: ++counter.current, role: "user", text,
      fileName: newFile?.name }]);
    setDraft(""); setNotice("");
    const run = ++operation.current;
    setBusy(true); setStage("thinking");
    // Let the browser paint the short, visible progress state before processing.
    await new Promise<void>(resolve => window.setTimeout(resolve, 250));
    if (operation.current !== run) return;
    setStage("processing");
    try {
      if (!tool) {
        reply({ title: "Seven tools. One simple chat.", text: "I can compress, resize, convert, crop, compress to a target KB size, calculate profit, or calculate discounts. Pick a tool on the left or describe one of those tasks. Image files stay in your browser." });
      } else if (isImageTool(tool)) {
        if (!file) {
          reply({ title: "Ready for your image", tool,
            text: "Attach a JPG, PNG or WebP using Upload image, then send your request. You can also drag or paste a photo into the box. Maximum 20 MB and 40 megapixels." });
        } else {
          const options = parseImageOptions(tool, text);
          const output = await processImage(file, options);
          if (operation.current !== run) return;
          const url = URL.createObjectURL(output.blob);
          const originalUrl = URL.createObjectURL(file);
          urls.current.push(url, originalUrl);
          const saved = Math.round((1 - output.outputBytes / output.originalBytes) * 100);
          const change = saved > 0 ? `${saved}% smaller` : saved < 0 ? `${Math.abs(saved)}% larger` : "Similar size";
          const description = `${fileSize(output.originalBytes)} → ${fileSize(output.outputBytes)} · ${change}\n${output.width} × ${output.height} px · ${output.format} format\nYour image was processed in this browser. Check the preview and keep your original.`;
          reply({ title: "Your image is ready", tool, text: description,
            output: { url, originalUrl, name: output.filename, width: output.width, height: output.height,
              bytes: output.outputBytes, originalBytes: output.originalBytes, format: output.format } });
          pendingFile.current = null;
        }
      } else {
        const calculated = calculateFromMessage(tool, text);
        reply({ title: calculated.title, tool, text: calculated.body });
      }
    } catch (error) {
      if (operation.current === run) reply({ title: "One detail needed", tool: tool ?? undefined,
        text: error instanceof Error ? error.message : "Something went wrong. Try again with a smaller image.", error: true });
    } finally {
      if (operation.current === run) { setBusy(false); setStage(null); }
    }
  };

  const reset = () => {
    ++operation.current;
    urls.current.forEach(URL.revokeObjectURL); urls.current = [];
    pendingFile.current = null;
    setMessages([]); setDraft(""); setSelected(null); setBusy(false); setStage(null);
    setNotice(""); setSession(value => value + 1);
  };

  const copyText = async (text: string) => {
    try { await navigator.clipboard.writeText(text); setNotice("Estimate copied to clipboard."); }
    catch { setNotice("Clipboard is unavailable. Select the result text to copy it."); }
  };

  return <section className="mchat-shell" aria-label="Manglo Studio">
    <div className="mchat-ambient" aria-hidden="true" />
    <header className="mchat-topbar">
      <div className="mchat-identity"><span className="mchat-avatar"><WandSparkles size={21} strokeWidth={1.6} /></span>
        <div><strong>Manglo <span>Studio</span></strong><small>YOUR CREATIVE WORKSPACE</small></div>
      </div>
      <div className="mchat-top-actions"><span className="mchat-status"><i /> READY WHEN YOU ARE</span>
        <button type="button" onClick={reset} className="mchat-new" title="Clear this conversation and its files"><RotateCcw size={15} /> <span>New session</span></button>
      </div>
    </header>

    <div className="mchat-thread" aria-label="Tool assistant conversation" aria-live="polite" aria-relevant="additions text">
      {!messages.length && <div className="mchat-welcome">
        <div className="mchat-welcome-art" aria-hidden="true">
          <motion.span className="mchat-orbit mchat-orbit-one" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 38, repeat: Infinity, ease: "linear" }} />
          <motion.span className="mchat-orbit mchat-orbit-two" animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 44, repeat: Infinity, ease: "linear" }} />
          <span className="mchat-orb-core"><Sparkles size={36} strokeWidth={1.1} /></span>
          <i className="mchat-orb-flare" />
        </div>
        <div className="mchat-welcome-copy"><span className="mchat-overline"><span /> YOUR WORK, IN FLOW</span>
          <h3>The little things,<br /><em>beautifully done.</em></h3>
          <p>One place for better images and smarter prices. Tell Manglo what you need, or start with an idea below.</p>
        </div>
        <div className="mchat-starters" aria-label="Suggested tasks">
          <button type="button" onClick={() => chooseTool("image-compressor")}><Image size={17} /> Compress a photo <ArrowUpRight size={15} /></button>
          <button type="button" onClick={() => chooseTool("target-size-compressor")}><FileImage size={17} /> Under 200 KB <ArrowUpRight size={15} /></button>
          <button type="button" onClick={() => chooseTool("profit-calculator")}><TrendingUp size={17} /> Calculate profit <ArrowUpRight size={15} /></button>
          <button type="button" onClick={() => chooseTool("discount-calculator")}><Percent size={17} /> Plan a discount <ArrowUpRight size={15} /></button>
        </div>
      </div>}

      <div className="mchat-messages">
        <AnimatePresence initial={false}>
          {messages.map(message => <motion.article key={message.id} className={`mchat-message mchat-message-${message.role}${message.error ? " is-error" : ""}`}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .32, ease: "easeOut" }}>
            <span className="mchat-message-avatar">{message.role === "user" ? "YOU" : <Sparkles size={16} />}</span>
            <div className="mchat-bubble">
              {message.role === "assistant" && <span className="mchat-message-role">MANGLO STUDIO <span>/ {message.error ? "NEEDS A DETAIL" : "RESULT"}</span></span>}
              {message.title && <h4>{message.title}</h4>}
              {message.role === "assistant" ? <StreamingText text={message.text} /> : <p className="mchat-user-copy">{message.text}</p>}
              {message.fileName && <div className="mchat-user-file"><FileImage size={15} /> {message.fileName}</div>}
              {message.output && <div className="mchat-result">
                <div className="mchat-result-top"><span><CheckCircle2 size={15} /> EXPORT READY</span><span>{message.output.width} × {message.output.height} PX</span></div>
                <div className="mchat-comparison">
                  <div><img src={message.output.originalUrl} alt="Original image before processing" /><span>BEFORE · {fileSize(message.output.originalBytes)}</span></div>
                  <div><img src={message.output.url} alt={`Processed ${message.output.name}`} /><span>AFTER · {fileSize(message.output.bytes)}</span></div>
                </div>
                <div className="mchat-result-bottom"><div><strong>{message.output.name}</strong><small>{message.output.format} · Ready to save</small></div>
                  <a className="mchat-download" href={message.output.url} download={message.output.name}><ArrowDownToLine size={17} /> Download <ArrowRight size={17} /></a>
                </div>
              </div>}
              {message.tool && !isImageTool(message.tool) && !message.error && <button type="button" className="mchat-copy" onClick={() => copyText(message.text)}>Copy calculation <ArrowUpRight size={13}/></button>}
            </div>
          </motion.article>)}
        </AnimatePresence>
        {stage && <div className="mchat-processing" role="status"><span className="mchat-processing-avatar"><Sparkles size={17} /></span><div><span className="mchat-processing-label"><LoaderCircle size={17} className="mchat-spin" /> {stage === "thinking" ? "Thinking through your request" : "Working on your result"}<span className="mchat-dots">···</span></span><small>{stage === "thinking" ? "Finding the best tool for the job" : "Processing privately in your browser"}</small></div></div>}
        <div ref={threadEnd} />
      </div>
    </div>

    <div className="mchat-compose-area">
      <div className="mchat-compose-intro"><span><i /> ASK MANGLO</span><span>TYPE AN INSTRUCTION OR ATTACH AN IMAGE</span></div>
      {selected && <div className="mchat-selected"><span>SELECTED ACTION</span><strong>{toolOptions.find(item => item.id === selected)?.title}</strong><button type="button" onClick={() => { setSelected(null); setDraft(""); }} aria-label="Clear selected tool">×</button></div>}
      <PromptInputBox key={session} value={draft} onValueChange={setDraft} onSend={send} isLoading={busy} onCancel={cancel}
        placeholder={selected ? toolOptions.find(item => item.id === selected)?.prompt : "Ask Manglo to compress, resize, convert, crop or calculate…"} />
      {notice && <p className="mchat-notice" role="status">{notice}</p>}
    </div>

    <nav className="mchat-dock" aria-label="Choose one of seven Manglo tools">
      <div className="mchat-dock-heading"><span>YOUR SEVEN TOOLS</span><span>CHOOSE ONE OR JUST ASK NATURALLY <ArrowRight size={14}/></span></div>
      <div className="mchat-tool-list">
        {toolOptions.map(item => <ToolButton key={item.id} id={item.id} active={selected === item.id} onClick={() => chooseTool(item.id)} />)}
      </div>
    </nav>
    <footer className="mchat-footer"><span><ShieldCheck size={15} /> Images stay on your device. No account required.</span>
      <span>Focused tool assistant · No hosted AI model <a href="/playbook/">Explore the Playbook <ArrowUpRight size={13} /></a></span></footer>
  </section>;
}
