"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDownToLine, ArrowRight, CheckCircle2, CircleHelp, Crop, FileImage,
  FileOutput, Image, Layers2, LoaderCircle, RotateCcw, ShieldCheck,
  SlidersHorizontal, Sparkles, TrendingUp, Percent, WandSparkles,
} from "lucide-react";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import {
  calculateFromMessage, detectTool, fileSize, isImageTool, parseImageOptions,
  processImage, toolOptions,
} from "@/src/chat-engine";
import type { ToolId } from "@/src/chat-engine";

type ImageOutput = { url: string; name: string; width: number; height: number;
  bytes: number; originalBytes: number; format: string };
type Message = { id: number; role: "user" | "assistant"; text: string;
  title?: string; fileName?: string; output?: ImageOutput; error?: boolean; tool?: ToolId };

const icons = {
  "image-compressor": Layers2, "image-resizer": SlidersHorizontal,
  "image-converter": FileOutput, "image-cropper": Crop,
  "target-size-compressor": FileImage, "profit-calculator": TrendingUp,
  "discount-calculator": Percent,
};
const IMAGE_IDS = new Set(["image-compressor", "image-resizer", "image-converter", "image-cropper", "target-size-compressor"]);

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

function ToolButton({ id, active, onClick, compact = false }: { id: ToolId; active: boolean;
  onClick: () => void; compact?: boolean }) {
  const item = toolOptions.find(tool => tool.id === id)!;
  const Icon = icons[id];
  return <button type="button" onClick={onClick} aria-pressed={active}
    className={`mchat-tool-button ${active ? "is-active" : ""} ${compact ? "is-compact" : ""}`}>
    <span className="mchat-tool-icon"><Icon size={18} strokeWidth={1.7} /></span>
    <span className="mchat-tool-title"><b>{item.title}</b>{!compact && <small>{item.subtitle}</small>}</span>
    <ArrowRight className="mchat-tool-arrow" size={15} aria-hidden="true" />
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
          urls.current.push(url);
          const saved = Math.round((1 - output.outputBytes / output.originalBytes) * 100);
          const change = saved > 0 ? `${saved}% smaller` : saved < 0 ? `${Math.abs(saved)}% larger` : "Similar size";
          const description = `${fileSize(output.originalBytes)} → ${fileSize(output.outputBytes)} · ${change}\n${output.width} × ${output.height} px · ${output.format} format\nYour image was processed in this browser. Check the preview and keep your original.`;
          reply({ title: "Your image is ready", tool, text: description,
            output: { url, name: output.filename, width: output.width, height: output.height,
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

  return <div className="mchat-shell" aria-label="Manglo tool assistant">
    <aside className="mchat-rail" aria-label="Available assistant tools">
      <div className="mchat-rail-head"><span className="mchat-rail-symbol"><WandSparkles size={23} /></span><div><small>THE TOOLKIT / 07</small><strong>Your workbench.</strong></div></div>
      <p className="mchat-rail-summary">One focused place to work with your images and selling numbers.</p>
      <div className="mchat-rail-group"><span>IMAGE STUDIO <small>05</small></span>
        {toolOptions.filter(item => IMAGE_IDS.has(item.id)).map(item => <ToolButton key={item.id} id={item.id} active={selected === item.id} onClick={() => chooseTool(item.id)} />)}
      </div>
      <div className="mchat-rail-group"><span>SELLER MATH <small>02</small></span>
        {toolOptions.filter(item => !IMAGE_IDS.has(item.id)).map(item => <ToolButton key={item.id} id={item.id} active={selected === item.id} onClick={() => chooseTool(item.id)} />)}
      </div>
      <div className="mchat-rail-bottom"><ShieldCheck size={17} /><span>No sign-up. Images are processed privately on your device.</span></div>
    </aside>

    <section className="mchat-main" aria-label="Tool assistant conversation">
      <header className="mchat-topbar"><div className="mchat-identity"><span className="mchat-avatar"><Sparkles size={18} /></span><div><strong>Manglo Assistant</strong><span><i /> Ready for your next task</span></div></div>
        <button type="button" onClick={reset} className="mchat-new" title="Clear this conversation and its files"><RotateCcw size={15} /> New chat</button>
      </header>
      <div className="mchat-thread" aria-live="polite" aria-relevant="additions text">
        {!messages.length && <div className="mchat-welcome"><span className="mchat-welcome-orb"><Sparkles size={27} /></span>
          <span className="mchat-overline">A SMARTER WAY TO GET IT DONE</span>
          <h3>What can I help you <em>make today?</em></h3>
          <p>Describe a task in your own words. Attach an image for photo tools, or type numbers for seller calculations.</p>
          <div className="mchat-starters"><button type="button" onClick={() => chooseTool("image-compressor")}><Image size={17} /> Compress a product image <ArrowRight size={15} /></button>
            <button type="button" onClick={() => chooseTool("target-size-compressor")}><FileImage size={17} /> Make a file under 200 KB <ArrowRight size={15} /></button>
            <button type="button" onClick={() => chooseTool("profit-calculator")}><TrendingUp size={17} /> Check my profit margin <ArrowRight size={15} /></button>
            <button type="button" onClick={() => chooseTool("discount-calculator")}><Percent size={17} /> Calculate a sale price <ArrowRight size={15} /></button>
          </div>
        </div>}
        <AnimatePresence initial={false}>
          {messages.map(message => <motion.article key={message.id} className={`mchat-message mchat-message-${message.role}`}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25 }}>
            <span className="mchat-message-avatar">{message.role === "user" ? "You" : <Sparkles size={14} />}</span>
            <div className="mchat-bubble">
              {message.role === "assistant" && <span className="mchat-message-role">MANGLO ASSISTANT {message.error ? "/ NEEDS INPUT" : "/ RESPONSE"}</span>}
              {message.title && <h4>{message.title}</h4>}
              {message.role === "assistant" ? <StreamingText text={message.text} /> : <p className="mchat-user-copy">{message.text}</p>}
              {message.fileName && <div className="mchat-user-file"><FileImage size={16} /> {message.fileName}</div>}
              {message.output && <div className="mchat-result"><div className="mchat-result-image"><img src={message.output.url} alt={`Processed ${message.output.name}`} /></div>
                <div className="mchat-result-info"><span><CheckCircle2 size={15} /> EXPORT READY</span><strong>{message.output.name}</strong><small>{fileSize(message.output.bytes)} · {message.output.width} × {message.output.height} px</small>
                  <a className="mchat-download" href={message.output.url} download={message.output.name}><ArrowDownToLine size={18} /> Download image <ArrowRight size={17} /></a>
                </div></div>}
              {message.tool && !isImageTool(message.tool) && !message.error && <button type="button" className="mchat-copy" onClick={() => copyText(message.text)}>Copy calculation</button>}
            </div>
          </motion.article>)}
        </AnimatePresence>
        {stage && <div className="mchat-processing" role="status"><span className="mchat-processing-avatar"><Sparkles size={14} /></span><div><span className="mchat-processing-label"><LoaderCircle size={16} className="mchat-spin" /> {stage === "thinking" ? "Thinking through your request" : "Processing with Manglo tools"}<span className="mchat-dots">···</span></span><small>{stage === "thinking" ? "Identifying the right action" : "Running locally in your browser"}</small></div></div>}
        <div ref={threadEnd} />
      </div>
      <div className="mchat-compose-area">
        {selected && <div className="mchat-selected"><span>ACTIVE TOOL</span><strong>{toolOptions.find(item => item.id === selected)?.title}</strong><button type="button" onClick={() => { setSelected(null); setDraft(""); }} aria-label="Clear selected tool">×</button></div>}
        <PromptInputBox key={session} value={draft} onValueChange={setDraft} onSend={send} isLoading={busy} onCancel={cancel}
          placeholder={selected ? `Describe what you'd like to do with ${toolOptions.find(item => item.id === selected)?.title.toLowerCase()}…` : undefined} />
        <div className="mchat-compose-meta"><span><ShieldCheck size={13} /> Private browser processing · No upload to Manglo</span><span>Enter to send · Shift+Enter for new line</span></div>
        {notice && <p className="mchat-notice" role="status">{notice}</p>}
      </div>
    </section>
    <aside className="mchat-context" aria-label="Assistant information"><div className="mchat-context-head"><span>YOUR WORKSPACE</span><span className="mchat-context-live">● LIVE</span></div>
      <div className="mchat-context-feature"><span className="mchat-context-glyph"><WandSparkles size={26} /></span><h4>Less clicking.<br />More creating.</h4><p>Upload once, ask naturally, download the result. No complicated sequence of pages.</p></div>
      <div className="mchat-context-stats"><div><strong>07</strong><span>Built-in tools</span></div><div><strong>0</strong><span>Accounts required</span></div></div>
      <div className="mchat-context-note"><CircleHelp size={18} /><p>This focused assistant interprets tool commands, not open-ended questions. It does not use a hosted AI model. Image processing stays on your device; output time depends on file size.</p></div>
      <a href="/playbook/" className="mchat-context-link">Read practical field guides <ArrowRight size={16} /></a>
    </aside>
  </div>;
}
