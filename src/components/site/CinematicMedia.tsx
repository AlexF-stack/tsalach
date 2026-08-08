"use client";

import { SoftImage } from "@/shared/ui/SoftImage";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type Props = {
  videoSrc?: string;
  videoSrcs?: string[];
  posterSrc?: string;
  images: string[];
  className?: string;
  overlayClassName?: string;
  overlayStyle?: CSSProperties;
  kenBurns?: boolean;
  cycleMs?: number;
  videoCycleMs?: number;
};

/**
 * Full-bleed cinematic media: muted looping video playlist with image fallback.
 */
export function CinematicMedia({
  videoSrc,
  videoSrcs,
  posterSrc,
  images,
  className = "",
  overlayClassName = "",
  overlayStyle,
  kenBurns = true,
  cycleMs = 7000,
  videoCycleMs = 16000,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const clips = useMemo(
    () =>
      (videoSrcs?.length ? videoSrcs : videoSrc ? [videoSrc] : []).filter(
        Boolean,
      ) as string[],
    [videoSrc, videoSrcs],
  );

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeRef = useRef(0);
  const advancingRef = useRef(false);
  const [activeClip, setActiveClip] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);

  const playlist = clips.length > 1;
  const showVideo = clips.length > 0 && playing && !reduced;

  const goTo = useCallback(
    (next: number) => {
      if (!clips.length || advancingRef.current) return;
      const target = ((next % clips.length) + clips.length) % clips.length;
      if (target === activeRef.current) return;

      advancingRef.current = true;
      const prev = videoRefs.current[activeRef.current];
      if (prev) {
        try {
          prev.pause();
          prev.currentTime = 0;
        } catch {
          /* ignore */
        }
      }

      activeRef.current = target;
      setActiveClip(target);
      window.setTimeout(() => {
        advancingRef.current = false;
      }, 600);
    },
    [clips.length],
  );

  useEffect(() => {
    if (reduced || clips.length === 0) return;

    const el = videoRefs.current[activeClip];
    if (!el) return;

    let cancelled = false;

    const start = async () => {
      try {
        el.defaultMuted = true;
        el.muted = true;
        el.playsInline = true;
        await el.play();
        if (!cancelled) setPlaying(true);
      } catch {
        window.setTimeout(() => {
          if (cancelled) return;
          el.muted = true;
          void el
            .play()
            .then(() => {
              if (!cancelled) setPlaying(true);
            })
            .catch(() => {
              if (!cancelled) {
                if (playlist) goTo(activeClip + 1);
                else setPlaying(false);
              }
            });
        }, 280);
      }
    };

    void start();
    return () => {
      cancelled = true;
    };
  }, [reduced, activeClip, clips.length, playlist, goTo]);

  // Preload next clip while current plays
  useEffect(() => {
    if (reduced || !playlist || !playing) return;
    const next = (activeClip + 1) % clips.length;
    const el = videoRefs.current[next];
    if (!el) return;
    try {
      el.preload = "auto";
      if (el.readyState < 2) el.load();
    } catch {
      /* ignore */
    }
  }, [reduced, playlist, playing, activeClip, clips.length]);

  useEffect(() => {
    if (reduced || !playlist || !playing) return;

    const el = videoRefs.current[activeClip];
    if (!el) return;

    const advance = () => goTo(activeClip + 1);

    el.loop = false;
    el.addEventListener("ended", advance);

    const nearEnd = window.setInterval(() => {
      if (!el.duration || !Number.isFinite(el.duration)) return;
      if (el.currentTime > 1 && el.duration - el.currentTime < 0.4) {
        advance();
      }
    }, 350);

    const hardFallback = window.setTimeout(advance, videoCycleMs);

    return () => {
      el.removeEventListener("ended", advance);
      window.clearInterval(nearEnd);
      window.clearTimeout(hardFallback);
    };
  }, [reduced, playlist, playing, activeClip, goTo, videoCycleMs]);

  useEffect(() => {
    if (showVideo || images.length < 2 || reduced) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      cycleMs,
    );
    return () => window.clearInterval(id);
  }, [showVideo, images.length, cycleMs, reduced]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {posterSrc ? (
        <SoftImage
          src={posterSrc}
          alt=""
          fill
          priority
          quality={68}
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${
            showVideo ? "opacity-0" : "opacity-100"
          }`}
          wrapperClassName="absolute inset-0"
        />
      ) : null}

      {!reduced &&
        clips.map((src, i) => (
          <video
            key={src}
            ref={(node) => {
              videoRefs.current[i] = node;
            }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
              showVideo && i === activeClip ? "opacity-100" : "opacity-0"
            } ${kenBurns && showVideo && i === activeClip ? "media-kenburns" : ""}`}
            src={src}
            muted
            playsInline
            loop={!playlist}
            autoPlay={i === 0}
            preload="auto"
            aria-hidden
            onPlaying={() => {
              if (i === activeClip) setPlaying(true);
            }}
            onLoadedData={() => {
              const el = videoRefs.current[i];
              if (!el || i !== activeClip) return;
              el.muted = true;
              void el.play().catch(() => undefined);
            }}
            onError={() => {
              if (i === activeClip) {
                if (playlist) goTo(i + 1);
                else setPlaying(false);
              }
            }}
          />
        ))}

      {!showVideo &&
        !posterSrc &&
        images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <SoftImage
              src={src}
              alt=""
              fill
              priority={i === 0}
              quality={68}
              sizes="100vw"
              className={`object-cover ${
                kenBurns && i === index && !reduced ? "media-kenburns" : ""
              }`}
              wrapperClassName="absolute inset-0"
            />
          </div>
        ))}

      <div
        className={`absolute inset-0 ${overlayClassName}`}
        style={
          overlayStyle ?? {
            background: "var(--hero-overlay)",
          }
        }
        aria-hidden
      />
      <div className="media-vignette absolute inset-0" aria-hidden />
      <div className="media-grain absolute inset-0" aria-hidden />
    </div>
  );
}
