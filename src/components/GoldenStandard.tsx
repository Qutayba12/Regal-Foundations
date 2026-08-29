"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import GoldenThreadPillars from "./GoldenThreadPillars";
import { goldenThread } from "@/lib/site";

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  f=f*f*(3.0-2.0*f);
  float a=hash(i), b=hash(i+vec2(1.0,0.0)), c=hash(i+vec2(0.0,1.0)), d=hash(i+vec2(1.0,1.0));
  return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
}
float fbm(vec2 p){
  float v=0.0, amp=0.5;
  for(int i=0;i<6;i++){ v+=amp*noise(p); p*=2.02; amp*=0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = (uv - 0.5) * vec2(u_res.x/u_res.y, 1.0) * 3.0;
  float t = u_time * 0.05;

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p + 3.0*q + vec2(1.7, 9.2) + t*0.6), fbm(p + 3.0*q + vec2(8.3, 2.8) - t*0.6));
  float f = fbm(p + 3.0*r + t);

  // cursor heat
  float md = distance(uv, u_mouse);
  f += smoothstep(0.4, 0.0, md) * 0.55;
  f = clamp(f, 0.0, 1.0);

  vec3 c1 = vec3(0.05, 0.035, 0.02);
  vec3 c2 = vec3(0.61, 0.48, 0.18);
  vec3 c3 = vec3(0.89, 0.78, 0.49);
  vec3 c4 = vec3(1.0, 0.96, 0.82);
  vec3 col = mix(c1, c2, smoothstep(0.12, 0.5, f));
  col = mix(col, c3, smoothstep(0.5, 0.76, f));
  col = mix(col, c4, smoothstep(0.83, 0.99, f));

  float streak = pow(fbm(p*vec2(7.0,1.2) + vec2(0.0, t*2.2)), 4.0) * 0.5;
  col += streak * vec3(1.0, 0.92, 0.72);

  float vig = smoothstep(1.25, 0.35, length(uv-0.5)*1.7);
  col = mix(vec3(0.043,0.043,0.051), col, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

function useMoltenGold(reduce: boolean) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
    if (!gl) {
      canvas.classList.add("gs-fallback");
      return;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      canvas.classList.add("gs-fallback");
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const mouse = { x: 0.5, y: 0.5 };
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(r.width * dpr));
      canvas.height = Math.max(1, Math.floor(r.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = 1 - (e.clientY - r.top) / r.height;
    };
    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.touches[0].clientX - r.left) / r.width;
      mouse.y = 1 - (e.touches[0].clientY - r.top) / r.height;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("touchmove", onTouch, { passive: true });

    let raf = 0;
    let inView = true;
    const start = performance.now();
    const loop = (now: number) => {
      raf = 0;
      if (!inView) return;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(
      (es) => {
        inView = es[0].isIntersecting;
        if (inView && !raf) raf = requestAnimationFrame(loop);
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);
    raf = requestAnimationFrame(loop);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("touchmove", onTouch);
    };
  }, [reduce]);

  return canvasRef;
}

const points = [
  "Premium, hand-picked materials on every project",
  "Fully insured, guaranteed workmanship",
  "Built to outlast — value that only grows",
];

export default function GoldenStandard() {
  const reduce = useReducedMotion();
  const canvasRef = useMoltenGold(!!reduce);

  return (
    <section className="border-t border-ink-line py-24">
      <div className="container-x">
        {/* Heading + the golden-thread meaning */}
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading center eyebrow="Assured Quality" title="The Golden" highlight="Standard" />
        </div>
        <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-silver sm:text-lg">
          {goldenThread.intro}
        </p>
      </div>

      <div className="container-x mt-14 grid items-center gap-12 lg:grid-cols-2">
        {/* Value / proof */}
        <div>
          <h3 className="font-display text-2xl uppercase tracking-wide text-cream sm:text-3xl">
            Worth its weight <span className="text-gold-gradient">in gold</span>
          </h3>
          <p className="mt-4 text-silver">
            We don&apos;t cut corners — we set the benchmark, so what you invest today only grows in value.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((t, i) => (
              <Reveal key={t} delay={i * 0.07}>
                <li className="flex items-start gap-3 text-silver">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                  </span>
                  {t}
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2}>
            <Link href="/contact" className="btn-gold mt-9 inline-flex">
              Build to the Standard
            </Link>
          </Reveal>
        </div>

        {/* Molten gold panel */}
        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] border border-gold/30 shadow-card">
            <canvas ref={canvasRef} className="molten-canvas absolute inset-0 h-full w-full" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(11,11,13,0.6),transparent_58%)]" />
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="text-center">
                <img
                  src="/logo-emblem.png?v=3"
                  alt="Regal Foundations emblem"
                  className="mx-auto w-32 animate-float-slow drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] sm:w-40"
                  draggable={false}
                />
                <p className="mt-3 text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-cream/90">
                  The Golden Standard
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* The three pillars, linked by the golden thread */}
      <div className="container-x">
        <GoldenThreadPillars />
      </div>
    </section>
  );
}
