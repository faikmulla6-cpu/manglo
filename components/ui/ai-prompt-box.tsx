"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, ClipboardEvent, DragEvent, FormEvent, KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp, ImagePlus, LoaderCircle, Paperclip, Sparkles, Square, X } from "lucide-react";

/** Manglo's task-focused adaptation of the supplied AI prompt box.
 * Only supported local actions are visible; there are no fake search/voice controls.
 */
type PromptInputBoxProps = {
  value: string;
  onValueChange: (text: string) => void;
  onSend: (text: string, file?: File) => void;
  isLoading?: boolean;
  onCancel?: () => void;
  placeholder?: string;
};

export function PromptInputBox({ value, onValueChange, onSend, isLoading = false, onCancel, placeholder }: PromptInputBoxProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = textarea.current;
    if (!element) return;
    element.style.height = "auto";
    const naturalHeight = element.scrollHeight;
    element.style.height = `${Math.min(naturalHeight, 180)}px`;
    element.style.overflowY = naturalHeight > 180 ? "auto" : "hidden";
  }, [value]);

  useEffect(() => {
    if (!file) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!showPreview) return;
    const dismiss = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setShowPreview(false);
    };
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [showPreview]);

  const chooseFile = (candidate?: File) => {
    if (!candidate) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(candidate.type)) {
      setError("Choose a JPG, PNG or WebP image."); return;
    }
    if (candidate.size > 20 * 1024 * 1024) {
      setError("Choose an image under 20 MB."); return;
    }
    setError(""); setFile(candidate);
  };

  const send = () => {
    if (isLoading || (!value.trim() && !file)) return;
    onSend(value.trim(), file ?? undefined);
    onValueChange("");
    setFile(null);
    setError("");
  };
  const onSubmit = (event: FormEvent) => { event.preventDefault(); send(); };
  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault(); send();
    }
  };
  const onDrop = (event: DragEvent) => {
    event.preventDefault(); setDragging(false);
    if (!isLoading) chooseFile(event.dataTransfer.files[0]);
  };
  const onDragOver = (event: DragEvent) => { event.preventDefault(); if (!isLoading) setDragging(true); };
  const onPaste = (event: ClipboardEvent<HTMLTextAreaElement>) => {
    const image = [...event.clipboardData.items].find(item => item.type.startsWith("image/"));
    if (image && !isLoading) { event.preventDefault(); chooseFile(image.getAsFile() ?? undefined); }
  };
  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    chooseFile(event.target.files?.[0]); event.target.value = "";
  };

  return <>
    <form className={`mchat-composer ${dragging ? "is-dragging" : ""} ${isLoading ? "is-working" : ""}`}
      onSubmit={onSubmit} onDragOver={onDragOver} onDragLeave={() => setDragging(false)} onDrop={onDrop}>
      <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" className="mchat-visually-hidden"
        aria-label="Upload an image" onChange={onChangeFile} disabled={isLoading} />
      <AnimatePresence initial={false}>
        {file && preview && <motion.div className="mchat-file-attachment" key={preview}
          initial={reducedMotion ? false : { opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .92 }}>
          <button type="button" className="mchat-file-thumb" onClick={() => setShowPreview(true)} aria-label={`Preview ${file.name}`}>
            <img src={preview} alt="Selected image preview" />
          </button>
          <span className="mchat-file-label"><b>{file.name}</b><small>{(file.size / 1024 / 1024).toFixed(2)} MB · ready</small></span>
          <button type="button" className="mchat-remove-file" aria-label="Remove attached image" onClick={() => setFile(null)}><X size={16} /></button>
        </motion.div>}
      </AnimatePresence>
      <label htmlFor="manglo-chat-prompt" className="mchat-visually-hidden">Tell Manglo what you want to do</label>
      <textarea id="manglo-chat-prompt" ref={textarea} value={value} onChange={e => onValueChange(e.target.value)}
        onKeyDown={onKeyDown} onPaste={onPaste} rows={1} disabled={isLoading} maxLength={1800}
        placeholder={placeholder || "Ask Manglo to compress, resize, convert, crop or calculate…"} />
      <div className="mchat-composer-foot">
        <div className="mchat-composer-left">
          <button type="button" className="mchat-upload-button" onClick={() => fileInput.current?.click()}
            title="Upload a JPG, PNG or WebP image" aria-label="Upload an image" disabled={isLoading}>
            <Paperclip size={18} /><span>Upload image</span>
          </button>
          <span className="mchat-composer-divider" aria-hidden="true" />
          <span className="mchat-local-label"><Sparkles size={14} /> 7 focused tools</span>
        </div>
        {isLoading && onCancel ? <button type="button" className="mchat-send-button" onClick={onCancel} aria-label="Stop processing" title="Stop processing"><Square size={16} /></button>
        : <button type="submit" className="mchat-send-button" disabled={!file && !value.trim()} aria-label={isLoading ? "Processing" : "Send message"}
            title="Send message"><ArrowUp size={19} /></button>}
      </div>
      {error && <p role="alert" className="mchat-input-error"><ImagePlus size={15} />{error}</p>}
      {dragging && <div className="mchat-drop-indicator" aria-hidden="true"><ImagePlus size={25} /> Drop your image here</div>}
    </form>

    <AnimatePresence>
      {showPreview && preview && <motion.div className="mchat-preview-modal" role="dialog" aria-modal="true" aria-label="Image preview"
        initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPreview(false)}>
        <button type="button" aria-label="Close image preview" className="mchat-preview-close" onClick={() => setShowPreview(false)}><X size={22} /></button>
        <img src={preview} alt={file?.name || "Selected image"} onClick={event => event.stopPropagation()} />
      </motion.div>}
    </AnimatePresence>
  </>;
}
