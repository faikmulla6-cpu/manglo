import type { FormEventHandler } from "react";
interface Props {
  onSubmit: FormEventHandler<HTMLFormElement>;
  sending: boolean;
  status: string;
  success: boolean;
  today: string;
}
export function RequestFields({
  onSubmit,
  sending,
  status,
  success,
  today,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      id="demo-form"
      className="demo-form"
      action="/api/demo"
      method="post"
    >
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">
            {"Your name "}
            <span>{"*"}</span>
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Alex Taylor"
            required
            minLength={2}
            maxLength={100}
          />
        </div>
        <div className="field">
          <label htmlFor="email">
            {"Email address "}
            <span>{"*"}</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alex@yourbusiness.co.uk"
            required
            maxLength={254}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="company">
          {"Business name "}
          <span className="optional">{"optional"}</span>
        </label>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          placeholder="Your business or project"
          maxLength={160}
        />
      </div>
      <div className="field">
        <label htmlFor="message">
          {"What would you like to build? "}
          <span>{"*"}</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Your business, your current website, and what you’d love to improve…"
          required
          minLength={10}
          maxLength={4000}
        ></textarea>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="date">
            {"Preferred date "}
            <span>{"*"}</span>
          </label>
          <input min={today} id="date" name="date" type="date" required />
        </div>
        <div className="field">
          <label htmlFor="time">
            {"Preferred time "}
            <span>{"*"}</span>
          </label>
          <input id="time" name="time" type="time" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="timezone">
          {"Your timezone "}
          <span>{"*"}</span>
        </label>
        <select id="timezone" name="timezone" required>
          <option value="Europe/London">{"United Kingdom — London"}</option>
          <option value="Asia/Kolkata">{"India — Kolkata"}</option>
          <option value="Europe/Dublin">{"Ireland — Dublin"}</option>
          <option value="Europe/Paris">{"Central Europe — Paris"}</option>
          <option value="America/New_York">{"US Eastern — New York"}</option>
          <option value="America/Los_Angeles">
            {"US Pacific — Los Angeles"}
          </option>
          <option value="Asia/Dubai">{"UAE — Dubai"}</option>
          <option value="Australia/Sydney">{"Australia — Sydney"}</option>
        </select>
        <small>{"We’ll confirm a suitable meeting time by email."}</small>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">{"Leave this field empty"}</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="consent">
        <input id="consent" name="consent" type="checkbox" required />
        <span>
          {"I agree that Manglo Studio may contact me about this request. "}
          <a href="privacy.html" target="_blank" rel="noopener">
            {"Privacy notice"}
          </a>
          {"."}
        </span>
      </label>
      <button
        className="button button-blue form-submit"
        type="submit"
        disabled={sending}
      >
        {sending ? "Sending your request…" : "Send demo request "}
        <svg className="icon">
          <use href="#i-plus" />
        </svg>
      </button>
      <p
        id="form-status"
        className={
          success
            ? "form-status success"
            : status
              ? "form-status error"
              : "form-status"
        }
        role="status"
        aria-live="polite"
      >
        {status}
      </p>
      <p className="form-footer">
        <svg className="icon">
          <use href="#i-mail" />
        </svg>
        {" For Faik & the Manglo Studio team. No payment details needed."}
      </p>
      <noscript>
        <p>
          {"Email "}
          <a href="mailto:faik@manglo.shop">{"faik@manglo.shop"}</a>
          {" with your message and availability."}
        </p>
      </noscript>
    </form>
  );
}
