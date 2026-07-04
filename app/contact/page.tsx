"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, Github, Linkedin, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ANIMATION_EASE, SOCIAL_LINKS, SITE_COORDINATES } from "@/lib/constants";

/**
 * Contact Page
 *
 * Architecture:
 * - Client component — form state and fetch require browser environment
 * - Controlled form with React useState — no form library needed at this scale
 * - Submissions go to /api/contact which uses Resend for delivery
 * - Four UI states: idle → submitting → success → (auto-reset to idle)
 * - Success state auto-resets to idle after 4 seconds
 *
 * Auto-reset rationale:
 * A portfolio contact form is a single-action surface. The success state
 * exists to confirm receipt — not to persist indefinitely. Auto-resetting
 * after 4 seconds communicates that the system completed its cycle cleanly,
 * like a well-engineered machine ready for the next operation.
 *
 * Memory safety:
 * The reset timer is cleaned up on component unmount via useEffect's
 * cleanup function — prevents setState calls on unmounted components
 * if the user navigates away before the 4-second timer fires.
 *
 * Accessibility:
 * - Each input has an associated <label> with htmlFor
 * - Required fields marked with aria-required
 * - Success and error states use aria-live="polite" for screen readers
 * - Loading state communicated via aria-label on submit button
 */

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  organization: "",
  subject: "",
  message: "",
};

// How long the success state shows before auto-resetting (ms)
const SUCCESS_RESET_DELAY = 4000;

// ─── Shared Input Class ───────────────────────────────────────────────────────

const inputClassName = cn(
  "w-full px-4 py-3",
  "bg-[var(--color-surface)] border border-[var(--color-border)]",
  "font-mono text-sm text-[var(--color-foreground)]",
  "placeholder:text-[var(--color-muted-foreground)]",
  "focus:outline-none focus:border-[var(--color-accent)]",
  "transition-colors duration-200",
  "rounded-none"
);

// ─── FormField wrapper ────────────────────────────────────────────────────────

function FormField({
  label,
  id,
  required = false,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex items-center gap-2">
        <span className="technical-label">{label}</span>
        {required && (
          <span
            className="font-mono text-[0.5rem] text-[var(--color-accent)]"
            aria-label="required"
          >
            REQ
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  /**
   * Auto-reset after success
   *
   * When formState transitions to "success", a 4-second timer starts.
   * On completion, state resets to "idle" — form is ready for new input.
   * The cleanup function cancels the timer if the component unmounts
   * before the delay completes — prevents memory leaks and React warnings.
   */
  useEffect(() => {
    if (formState !== "success") return;

    const timer = setTimeout(() => {
      setFormState("idle");
      setErrorMessage("");
    }, SUCCESS_RESET_DELAY);

    return () => clearTimeout(timer);
  }, [formState]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Clear error state when user starts correcting input
    if (formState === "error") {
      setFormState("idle");
      setErrorMessage("");
    }
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setFormState("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (!form.email.includes("@")) {
      setFormState("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setFormState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to send message.");
      }

      // Clear form fields immediately on success
      setForm(INITIAL_FORM);
      setFormState("success");
      // Auto-reset back to idle is handled by the useEffect above
    } catch (err) {
      setFormState("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
    }
  };

  const isDisabled = formState === "submitting" || formState === "success";

  return (
    <div className="flex flex-col">

      {/* ── Hero Statement ────────────────────────────────────────────── */}
      <section
        aria-label="Contact introduction"
        className={cn(
          "relative border-b border-[var(--color-border)]",
          "engineering-grid overflow-hidden"
        )}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-[var(--color-background)]"
        />

        <div className="site-container relative z-10 py-20 lg:py-28">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: ANIMATION_EASE.engineering }}
            className="flex flex-col gap-6 max-w-3xl"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.625rem] text-[var(--color-accent)] tracking-widest">
                04
              </span>
              <div className="w-4 h-px bg-[var(--color-accent)]" aria-hidden="true" />
              <span className="technical-label">Contact</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-medium tracking-tight text-[var(--color-foreground)] leading-[1.1]">
              Start a conversation.{" "}
              <span className="text-[var(--color-accent)]">Build something.</span>
            </h1>

            <p className="text-lg text-[var(--color-muted)] leading-relaxed max-w-xl">
              Whether you are an engineering firm, a construction company,
              a software team, or an individual with a problem worth solving —
              I want to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────────────────── */}
      <div className="site-container py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 lg:gap-24">

          {/* ── Contact Form ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: ANIMATION_EASE.engineering, delay: 0.1 }}
          >
            <div className="flex flex-col gap-6">

              {/* Form header */}
              <div className="flex flex-col gap-2">
                <span className="technical-label">Send a Message</span>
                <div className="h-px w-full bg-[var(--color-border)]" aria-hidden="true" />
              </div>

              {/* ── Status Messages ─────────────────────────────────────── */}
              <AnimatePresence mode="wait">

                {/* Success */}
                {formState === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    transition={{ duration: 0.35, ease: ANIMATION_EASE.engineering }}
                    className={cn(
                      "flex items-start gap-3 p-4 overflow-hidden",
                      "border border-emerald-400/30 bg-emerald-400/5"
                    )}
                    role="alert"
                    aria-live="polite"
                  >
                    <CheckCircle
                      size={15}
                      className="text-emerald-400 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="font-mono text-xs text-emerald-400 tracking-wide">
                        Message sent successfully.
                      </p>
                      <p className="font-mono text-[0.625rem] text-[var(--color-muted-foreground)]">
                        I will respond within 24–48 hours. This form resets in 4 seconds.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Error */}
                {formState === "error" && errorMessage && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    transition={{ duration: 0.35, ease: ANIMATION_EASE.engineering }}
                    className={cn(
                      "flex items-start gap-3 p-4 overflow-hidden",
                      "border border-red-400/30 bg-red-400/5"
                    )}
                    role="alert"
                    aria-live="polite"
                  >
                    <AlertCircle
                      size={15}
                      className="text-red-400 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <p className="font-mono text-xs text-red-400 tracking-wide">
                      {errorMessage}
                    </p>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* ── Form Fields ─────────────────────────────────────────── */}
              <div className="flex flex-col gap-5">

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField label="Full Name" id="name" required>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      aria-required="true"
                      disabled={isDisabled}
                      className={inputClassName}
                      autoComplete="name"
                    />
                  </FormField>

                  <FormField label="Email Address" id="email" required>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      aria-required="true"
                      disabled={isDisabled}
                      className={inputClassName}
                      autoComplete="email"
                    />
                  </FormField>
                </div>

                {/* Organisation */}
                <FormField label="Organisation" id="organization">
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    value={form.organization}
                    onChange={handleChange}
                    placeholder="Company or institution (optional)"
                    disabled={isDisabled}
                    className={inputClassName}
                    autoComplete="organization"
                  />
                </FormField>

                {/* Subject */}
                <FormField label="Subject" id="subject" required>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    aria-required="true"
                    disabled={isDisabled}
                    className={inputClassName}
                  />
                </FormField>

                {/* Message */}
                <FormField label="Message" id="message" required>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your project, opportunity, or question."
                    aria-required="true"
                    disabled={isDisabled}
                    rows={7}
                    className={cn(inputClassName, "resize-none leading-relaxed")}
                  />
                </FormField>
              </div>

              {/* ── Submit Button ───────────────────────────────────────── */}
              <button
                onClick={handleSubmit}
                disabled={isDisabled}
                aria-label={
                  formState === "submitting" ? "Sending message..." :
                  formState === "success"    ? "Message sent — resetting shortly" :
                                               "Send message"
                }
                className={cn(
                  "group flex items-center justify-center gap-2",
                  "w-full sm:w-auto sm:px-8 py-3",
                  "font-mono text-xs tracking-widest uppercase",
                  "transition-all duration-300",
                  formState === "success"
                    ? "bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 cursor-default"
                    : formState === "submitting"
                    ? "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)] cursor-wait"
                    : "bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)]"
                )}
              >
                {formState === "submitting" ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-3 h-3 border border-current border-t-transparent rounded-full"
                      aria-hidden="true"
                    />
                    Sending...
                  </>
                ) : formState === "success" ? (
                  <>
                    <CheckCircle size={12} aria-hidden="true" />
                    Sent — Resetting
                  </>
                ) : (
                  <>
                    Send Message
                    <Send
                      size={12}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </>
                )}
              </button>

            </div>
          </motion.div>

          {/* ── Sidebar ────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: ANIMATION_EASE.engineering, delay: 0.2 }}
            className="flex flex-col gap-10"
          >
            {/* Direct contact */}
            <div className="flex flex-col gap-4">
              <span className="technical-label">Direct Contact</span>
              <div className="flex flex-col gap-3">
                {[
                  {
                    Icon: Mail,
                    label: "Email",
                    value: "chiderahillary80@gmail.com",
                    href: "mailto:chiderahillary80@gmail.com",
                  },
                  {
                    Icon: Linkedin,
                    label: "LinkedIn",
                    value: "chiderahillary",
                    href: SOCIAL_LINKS.linkedin,
                  },
                  {
                    Icon: Github,
                    label: "GitHub",
                    value: "SwissHilson",
                    href: SOCIAL_LINKS.github,
                  },
                ].map(({ Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={cn(
                      "flex items-center gap-3 group",
                      "text-[var(--color-muted)]",
                      "hover:text-[var(--color-foreground)]",
                      "transition-colors duration-200"
                    )}
                  >
                    <Icon
                      size={14}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="text-[var(--color-muted-foreground)] group-hover:text-[var(--color-accent)] transition-colors duration-200 flex-shrink-0"
                    />
                    <div className="flex flex-col">
                      <span className="technical-label">{label}</span>
                      <span className="font-mono text-xs">{value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Open to */}
            <div className="flex flex-col gap-4">
              <span className="technical-label">Open To</span>
              <div className="flex flex-col gap-2">
                {[
                  "SIWES / Industrial Training",
                  "Engineering Internships",
                  "Software Development Roles",
                  "Research Collaboration",
                  "Freelance Engineering Projects",
                  "Technical Partnerships",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span
                      className="w-1 h-1 flex-shrink-0 bg-[var(--color-accent)]"
                      aria-hidden="true"
                    />
                    <span className="font-mono text-xs text-[var(--color-muted)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className={cn(
              "flex flex-col gap-3 p-5",
              "border border-[var(--color-border)] bg-[var(--color-surface)]"
            )}>
              <span className="technical-label">Location</span>
              <p className="font-mono text-xs text-[var(--color-muted)] leading-relaxed">
                {SITE_COORDINATES.institution}<br />
                {SITE_COORDINATES.location}<br />
                <span className="text-[var(--color-muted-foreground)]">
                  {SITE_COORDINATES.lat} / {SITE_COORDINATES.lng}
                </span>
              </p>
              <p className="technical-label">
                Response time — 24 to 48 hours
              </p>
            </div>

          </motion.div>
        </div>
      </div>

    </div>
  );
}
