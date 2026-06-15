import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  CheckCircle2,
  Cpu,
  Database,
  FileJson,
  FlaskConical,
  GitBranch,
  Layers3,
  Rocket,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  UploadCloud,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import copyrightIllustration from "./assets/copyright.svg";
import harmfulKnowledgeIllustration from "./assets/harmful_knowledge.svg";
import heroIllustration from "./assets/llm-unlearning-hero.png";
import brandLogo from "./assets/logo.png";
import memorizationIllustration from "./assets/memorization.svg";
import outdatedKnowledgeIllustration from "./assets/outdated_knowledge.svg";
import privateDataIllustration from "./assets/private_data.svg";

type WorkflowStep = {
  title: string;
  kicker: string;
  detail: string;
  items: string[];
  icon: LucideIcon;
};

type Feature = {
  title: string;
  text: string;
  icon: LucideIcon;
};

type FooterGroup = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

type SocialLink = {
  label: string;
  href: string;
  icon: ReactNode;
};

const workflowSteps: WorkflowStep[] = [
  {
    title: "Select a model",
    kicker: "Hugging Face or local checkpoints",
    detail:
      "Start from a familiar model source and choose the unlearning mode that matches the experiment.",
    items: ["Full model unlearning", "LoRA fine-tuning", "Adapter-based unlearning"],
    icon: BrainCircuit,
  },
  {
    title: "Upload forget data",
    kicker: "CSV, JSON, JSONL, Parquet",
    detail:
      "Provide examples that represent the knowledge the model should remove from its behavior.",
    items: ["Automatic QA validation", "Schema checks", "Dataset processing"],
    icon: UploadCloud,
  },
  {
    title: "Balance with retain data",
    kicker: "Optional utility preservation",
    detail:
      "Retain datasets help avoid collateral damage while targeted knowledge is unlearned.",
    items: ["Capability retention", "Reduced regressions", "Forget + retain runs"],
    icon: ShieldCheck,
  },
  {
    title: "Configure unlearning",
    kicker: "Validated before launch",
    detail:
      "Set the hyperparameters and GPU target through a simple, reproducible configuration flow.",
    items: ["Learning rate", "Batch size", "Context length", "LoRA settings"],
    icon: SlidersHorizontal,
  },
  {
    title: "Launch unlearning",
    kicker: "No manual scripting",
    detail:
      "The platform loads the model, prepares data, runs the workflow, and saves the resulting checkpoint.",
    items: ["Workflow selection", "GPU execution", "Checkpoint export"],
    icon: Rocket,
  },
];

const features: Feature[] = [
  {
    title: "Hugging Face support",
    text: "Bring compatible models or local checkpoints into one repeatable experiment surface.",
    icon: BrainCircuit,
  },
  {
    title: "LoRA and adapters",
    text: "Run efficient unlearning workflows without committing to full-model rebuilds.",
    icon: Layers3,
  },
  {
    title: "Forget-only or retain-aware",
    text: "Compare direct forgetting with utility-preserving retain data in the same platform.",
    icon: ShieldCheck,
  },
  {
    title: "Dataset processing",
    text: "Validate simple QA datasets and convert supported file formats into unlearning-ready inputs.",
    icon: FileJson,
  },
  {
    title: "GPU validation",
    text: "Select compute targets with automatic checks before the unlearning job starts.",
    icon: Cpu,
  },
  {
    title: "Evaluation ready",
    text: "Extend the pipeline with benchmarks, loss functions, and model comparison reports.",
    icon: FlaskConical,
  },
];

const architecture = [
  { name: "Model Management", icon: BrainCircuit },
  { name: "Dataset Processing", icon: Database },
  { name: "Unlearning Configuration", icon: Settings2 },
  { name: "Experiment Orchestration", icon: GitBranch },
  { name: "Unlearning Algorithms", icon: FlaskConical },
];

const roles = [
  {
    name: "Enterprise AI Teams",
    text: "Operationalize controlled unlearning across model governance workflows.",
  },
  {
    name: "ML Engineers",
    text: "Build production-ready workflows for machine unlearning.",
  },
  {
    name: "Compliance Teams",
    text: "Track privacy, copyright, and risk controls with reproducible unlearning runs.",
  },
  {
    name: "Organizations",
    text: "Remove unwanted information without rebuilding models from scratch.",
  },
];

const roadmap = [
  "Real-time unlearning monitoring",
  "Experiment dashboard",
  "Evaluation benchmarks",
  "Model comparison reports",
  "Job queue management",
  "Multi-GPU support",
  "Automated utility and forgetting metrics",
];

const footerGroups: FooterGroup[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "#why" },
      { label: "Privacy Policy", href: "#compliance" },
      { label: "Terms of Service", href: "#compliance" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Introduction", href: "#top" },
      { label: "ForgetLLM", href: "#enterprise" },
      { label: "Documentation", href: "#workflow" },
    ],
  },
];

const socialLinks: SocialLink[] = [
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.5 4.5l15 15M19.5 4.5l-15 15" />
      </svg>
    ),
  },
  {
    label: "Reddit",
    href: "https://www.reddit.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="13.2" r="5.8" />
        <path d="M12 7.4l1.5-3.2 3.5.8" />
        <circle cx="18.3" cy="9.7" r="1.7" />
        <circle cx="5.7" cy="9.7" r="1.7" />
        <circle cx="9.7" cy="12.6" r="0.7" />
        <circle cx="14.3" cy="12.6" r="0.7" />
        <path d="M9.4 15.5c1.4 1 3.8 1 5.2 0" />
      </svg>
    ),
  },
  {
    label: "Hugging Face",
    href: "https://huggingface.co",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="6.7" />
        <circle cx="9.3" cy="10.4" r="0.8" />
        <circle cx="14.7" cy="10.4" r="0.8" />
        <path d="M8.7 14.3c1.6 1.4 5 1.4 6.6 0" />
        <path d="M5.1 13.5c-1.2.5-2 1.5-2 2.8 0 1.4 1.1 2.3 2.5 2.2" />
        <path d="M18.9 13.5c1.2.5 2 1.5 2 2.8 0 1.4-1.1 2.3-2.5 2.2" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "https://discord.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.3 8.2c3.1-1.4 6.3-1.4 9.4 0 1.3 2.4 1.8 5.1 1.4 8-2.1 1.6-4.1 2.3-6.1 2.3s-4-.7-6.1-2.3c-.4-2.9.1-5.6 1.4-8Z" />
        <circle cx="9.7" cy="12.7" r="0.8" />
        <circle cx="14.3" cy="12.7" r="0.8" />
        <path d="M9.1 15.5c1.7.8 4.1.8 5.8 0" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.2 9h3.2v9.6H5.2z" />
        <path d="M6.8 5.1a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Z" />
        <path d="M10.4 9h3.1v1.3c.6-.9 1.6-1.5 3.1-1.5 2.2 0 3.8 1.4 3.8 4.4v5.4h-3.2v-5c0-1.4-.6-2.1-1.7-2.1s-1.9.8-1.9 2.1v5h-3.2z" />
      </svg>
    ),
  },
];

const complianceTopics = [
  {
    title: "Privacy & Data Removal",
    text:
      "Support GDPR-aligned removal investigations and data subject workflows with controlled unlearning runs.",
    icon: ShieldCheck,
  },
  {
    title: "Copyright & Data Governance",
    text:
      "Assess selective removal when licenses, ownership, or policy requirements change across enterprise data assets.",
    icon: Database,
  },
  {
    title: "Responsible AI Development",
    text:
      "Map unlearning evidence to the AI Act, ISO/IEC 42001, and NIST AI RMF governance practices.",
    icon: FlaskConical,
  },
];

const responsibleAIPoints = [
  "Operationalize targeted knowledge removal",
  "Evaluate utility-forgetting trade-offs",
  "Maintain reproducible governance evidence",
  "Align with AI Act, ISO/IEC 42001, and NIST AI RMF",
];

const heroTitle = "Forget what doesn't matter. Keep what does.";

const whyReasons = [
  {
    title: "Sensitive or private data",
    text: "Remove information that should not remain embedded in model behavior.",
    image: privateDataIllustration,
    alt: "Minimal illustration representing private data removal",
  },
  {
    title: "Copyrighted content",
    text: "Study selective removal when ownership, licenses, or usage policies change.",
    image: copyrightIllustration,
    alt: "Minimal illustration representing copyrighted content governance",
  },
  {
    title: "Outdated knowledge",
    text: "Update models when facts, policies, or domain assumptions become stale.",
    image: outdatedKnowledgeIllustration,
    alt: "Minimal illustration representing outdated model knowledge",
  },
  {
    title: "Harmful or incorrect information",
    text: "Evaluate interventions for unsafe, false, or unwanted model responses.",
    image: harmfulKnowledgeIllustration,
    alt: "Minimal illustration representing harmful knowledge removal",
  },
  {
    title: "Dataset-specific memorization",
    text: "Reduce memorized artifacts while preserving useful general capabilities.",
    image: memorizationIllustration,
    alt: "Minimal illustration representing dataset memorization",
  },
];

function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const activeWorkflow = workflowSteps[activeStep];
  const ActiveIcon = activeWorkflow.icon;
  const [typedTitle, setTypedTitle] = useState("");

  const stats = useMemo(
    () => [
      { value: "3", label: "unlearning modes" },
      { value: "4", label: "dataset formats" },
      { value: "0", label: "manual scripts required" },
    ],
    [],
  );

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .from(".nav", {
          opacity: 0,
          duration: 0.35,
        })
        .from("[data-hero]", {
          y: 30,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
        }, "-=0.2")
        .from(".typing-caret", {
          opacity: 0,
          duration: 0.35,
        }, "-=0.55")
        .from(".hero-art", {
          y: 34,
          scale: 0.97,
          opacity: 0,
          duration: 0.85,
        }, "-=0.45")
        .from(".data-stream-line", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.75,
          stagger: 0.08,
        }, "-=0.35")
        .from(".flow-dot", {
          scale: 0,
          opacity: 0,
          duration: 0.45,
          stagger: 0.07,
        }, "-=0.35");

      gsap.to(".hero-art img", {
        scale: 1.025,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".orbit-node", {
        y: -12,
        duration: 2.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });

      gsap.to(".flow-dot", {
        x: (index: number) => (index % 2 === 0 ? 34 : -28),
        y: (index: number) => (index % 3 === 0 ? -18 : 18),
        opacity: 0.25,
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.15,
      });

      gsap.to(".scan-line", {
        xPercent: 145,
        duration: 2.9,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".workflow-meter-fill", {
        scaleX: 1,
        duration: 2.8,
        ease: "power1.inOut",
        transformOrigin: "left center",
        repeat: -1,
        yoyo: true,
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
          },
          y: 32,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
        });

        const staggerItems = element.querySelectorAll("[data-stagger]");
        if (staggerItems.length > 0) {
          gsap.from(staggerItems, {
            scrollTrigger: {
              trigger: element,
              start: "top 78%",
            },
            y: 26,
            opacity: 0,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.07,
          });
        }
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedTitle(heroTitle);
      return;
    }

    const typeState = { count: 0 };
    const tween = gsap.to(typeState, {
      count: heroTitle.length,
      delay: 0.45,
      duration: 2.3,
      ease: "none",
      snap: { count: 1 },
      onUpdate: () => {
        setTypedTitle(heroTitle.slice(0, typeState.count));
      },
      onComplete: () => setTypedTitle(heroTitle),
    });

    return () => {
      tween.kill();
    };
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".workflow-panel-content",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.42, ease: "power3.out", stagger: 0.06 },
      );
      gsap.fromTo(
        ".panel-icon",
        { rotate: -8, scale: 0.9 },
        { rotate: 0, scale: 1, duration: 0.42, ease: "back.out(1.7)" },
      );
    }, rootRef);

    return () => context.revert();
  }, [activeStep]);

  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site-shell" ref={rootRef}>
      <header className="nav">
        <div className="nav-inner">
          <a className="brand" href="#top" aria-label="ForgetLLM home">
            <span className="brand-mark" aria-hidden="true">
              <img src={brandLogo} alt="" />
            </span>
            <span>ForgetLLM</span>
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#why">Why</a>
            <a href="#workflow">Workflow</a>
            <a href="#compliance">Compliance</a>
            <a href="#enterprise">Enterprise</a>
            <a href="#roadmap">Roadmap</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow" data-hero>
              Open-source platform for controlled LLM unlearning
            </p>
            <h1 className="hero-title" data-hero aria-label={heroTitle}>
              <span className="typing-text" aria-hidden="true">
                {typedTitle || "\u00a0"}
              </span>
              <span className="typing-caret" aria-hidden="true" />
            </h1>
            <p className="hero-text" data-hero>
              Guide large language models to selectively remove unwanted knowledge while
              preserving useful capabilities, without building complex unlearning pipelines from
              scratch.
            </p>
            <div className="hero-actions" data-hero>
              <button className="primary-button" onClick={() => scrollTo("#workflow")}>
                <span>Explore workflow</span>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <button className="secondary-button" onClick={() => scrollTo("#architecture")}>
                View architecture
              </button>
            </div>
            <dl className="stats" data-hero>
              {stats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <dt>{stat.value}</dt>
                  <dd>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero-visual" aria-label="Selective unlearning platform illustration">
            <div className="hero-art">
              <div className="motion-layer" aria-hidden="true">
                <span className="data-stream-line line-one" />
                <span className="data-stream-line line-two" />
                <span className="data-stream-line line-three" />
                <span className="flow-dot dot-one" />
                <span className="flow-dot dot-two" />
                <span className="flow-dot dot-three" />
                <span className="flow-dot dot-four" />
                <span className="scan-line" />
              </div>
              <img
                src={heroIllustration}
                alt="Minimal illustration of data cards flowing through a model core into a retained checkpoint"
              />
              <div className="signal-card signal-card-left orbit-node">
                <span>Forget set</span>
                <strong>Private QA pairs</strong>
              </div>
              <div className="signal-card signal-card-right orbit-node">
                <span>Retain set</span>
                <strong>Utility checks</strong>
              </div>
              <div className="checkpoint-tag orbit-node">
                <Check size={16} aria-hidden="true" />
                Checkpoint saved
              </div>
            </div>
          </div>
        </section>

        <section className="section why-section" id="why" data-reveal>
          <div className="section-heading">
            <p className="eyebrow">Why LLM Unlearning?</p>
            <h2>Targeted removal without rebuilding the model from zero.</h2>
          </div>
          <div className="why-grid">
            {whyReasons.map((item) => (
              <article className="problem-card" key={item.title} data-stagger>
                <div className="problem-media">
                  <img src={item.image} alt={item.alt} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <p className="wide-copy">
            Rebuilding an entire model is expensive and often unnecessary. ForgetLLM provides a
            streamlined path for targeted LLM unlearning so teams can remove specific knowledge
            while maintaining overall model performance.
          </p>
        </section>

        <section className="section workflow-section" id="workflow" data-reveal>
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">How it works</p>
              <h2>Upload. Configure. Forget.</h2>
            </div>
            <p>
              Each step creates a reproducible unlearning configuration that can be reviewed,
              relaunched, and extended for enterprise workflows.
            </p>
          </div>

          <div className="workflow-layout">
            <div className="workflow-tabs" role="tablist" aria-label="Unlearning workflow">
              {workflowSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <button
                    className={index === activeStep ? "workflow-tab active" : "workflow-tab"}
                    key={step.title}
                    onClick={() => setActiveStep(index)}
                    role="tab"
                    aria-selected={index === activeStep}
                  >
                    <StepIcon size={20} aria-hidden="true" />
                    <span>{step.title}</span>
                  </button>
                );
              })}
            </div>

            <article className="workflow-panel" role="tabpanel">
              <div className="workflow-meter" aria-hidden="true">
                <span className="workflow-meter-fill" />
              </div>
              <div className="panel-topline workflow-panel-content">
                <div className="panel-icon">
                  <ActiveIcon size={28} aria-hidden="true" />
                </div>
                <p>{activeWorkflow.kicker}</p>
              </div>
              <h3 className="workflow-panel-content">{activeWorkflow.title}</h3>
              <p className="workflow-panel-content">{activeWorkflow.detail}</p>
              <ul className="pill-list workflow-panel-content">
                {activeWorkflow.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section compliance-section" id="compliance" data-reveal>
          <div className="section-heading compliance-heading">
            <div>
              <p className="eyebrow">Compliance & Responsible AI</p>
              <h2>Develop Adaptable AI systems</h2>
            </div>
          </div>

          <div className="compliance-grid">
            {complianceTopics.map((topic) => {
              const TopicIcon = topic.icon;
              return (
                <article className="compliance-card" key={topic.title} data-stagger>
                  <TopicIcon size={24} aria-hidden="true" />
                  <h3>{topic.title}</h3>
                  <p>{topic.text}</p>
                </article>
              );
            })}
          </div>

          <div className="responsible-panel" data-stagger>
            <div>
              <p className="eyebrow">Responsible AI development</p>
              <h3>ForgetLLM helps enterprise teams</h3>
            </div>
            <ul>
              {responsibleAIPoints.map((point) => (
                <li key={point}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="enterprise" data-reveal>
          <div className="section-heading">
            <p className="eyebrow">Built for enterprise</p>
            <h2>Operationalize unlearning without giving up control.</h2>
          </div>
          <div className="feature-grid">
            {features.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <article className="feature-card" key={feature.title}>
                  <FeatureIcon size={24} aria-hidden="true" />
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section architecture-section" id="architecture" data-reveal>
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Enterprise-oriented architecture</p>
              <h2>Modular by design, extensible by default.</h2>
            </div>
            <p>
              The platform separates model management, data processing, configuration, orchestration,
              and algorithms so policies, evaluations, and workflows can be updated cleanly.
            </p>
          </div>
          <div className="architecture-flow" aria-label="Platform architecture layers">
            {architecture.map((item) => {
              const ArchitectureIcon = item.icon;
              return (
                <article className="architecture-node" key={item.name}>
                  <ArchitectureIcon size={24} aria-hidden="true" />
                  <span>{item.name}</span>
                </article>
              );
            })}
          </div>
          <div className="simplicity-band">
            <h3>Designed for enterprise simplicity</h3>
            <ol>
              <li>Upload datasets</li>
              <li>Configure unlearning</li>
              <li>Review generated configuration</li>
              <li>Launch unlearning runs</li>
            </ol>
          </div>
        </section>

        <section className="section" data-reveal>
          <div className="section-heading">
            <p className="eyebrow">Ideal for</p>
            <h2>A shared platform for governance teams, engineers, and organizations.</h2>
          </div>
          <div className="role-grid">
            {roles.map((role) => (
              <article className="role-card" key={role.name}>
                <h3>{role.name}</h3>
                <p>{role.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section roadmap-section" id="roadmap" data-reveal>
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Future roadmap</p>
              <h2>From experiments to deployment workflows.</h2>
            </div>
            <p>
              Upcoming work focuses on visibility, comparison, queueing, and automatic evaluation
              of forgetting and utility.
            </p>
          </div>
          <div className="roadmap-list">
            {roadmap.map((item) => (
              <article className="roadmap-item" key={item}>
                <Check size={18} aria-hidden="true" />
                <span>{item}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta" data-reveal>
          <p className="eyebrow">Enterprise governance. Practical deployment.</p>
          <h2>A unified platform for developing, testing, and deploying LLM unlearning workflows.</h2>
          <button className="primary-button" onClick={() => scrollTo("#workflow")}>
            <span>Upload. Configure. Forget.</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-grid">
            {footerGroups.map((group) => (
              <section className="footer-column" key={group.title} aria-labelledby={`${group.title}-footer`}>
                <h2 id={`${group.title}-footer`}>{group.title}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <section className="footer-column" aria-labelledby="community-footer">
              <h2 id="community-footer">Community</h2>
              <div className="social-links">
                {socialLinks.map((link) => (
                  <a
                    href={link.href}
                    key={link.label}
                    aria-label={link.label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </section>
          </div>

          <div className="footer-bottom">
            <p>@2026 ForgetLLM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
