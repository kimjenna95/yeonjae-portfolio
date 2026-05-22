import { useEffect, RefObject } from 'react'

/**
 * useHorizontalGallery
 *
 * Wires a "tall outer container + sticky inner track" horizontal gallery.
 *
 * The outer div height = 100vh + (trackScrollWidth − viewportWidth), giving
 * the browser vertical scroll room. As the user scrolls through it, the track
 * is translated left proportionally — creating the illusion of horizontal
 * movement driven by vertical scroll.
 *
 * On mobile (< 768 px) the transform is cleared and the outer height reset
 * so the images fall back to a normal vertical stack.
 *
 * Options:
 *   progressRef — a <div> whose inline width % is updated each frame
 *                 to reflect scroll progress (0 → 100 %)
 *   cueRef      — an element (e.g. "Scroll →" label) that fades to 0 opacity
 *                 the first time the user scrolls into the gallery
 *
 * Why image load listeners instead of ResizeObserver:
 *   The track sits inside overflow:hidden, so its rendered width is always
 *   capped at the viewport — ResizeObserver never fires when image loads
 *   expand scrollWidth. Individual img "load" events are the reliable trigger.
 *
 * Usage:
 *   const outerRef    = useRef<HTMLDivElement>(null)
 *   const trackRef    = useRef<HTMLDivElement>(null)
 *   const progressRef = useRef<HTMLDivElement>(null)
 *   const cueRef      = useRef<HTMLElement>(null)
 *
 *   useHorizontalGallery(outerRef, trackRef, { progressRef, cueRef })
 *
 *   <div ref={outerRef} className="hz-outer">
 *     <div className="hz-sticky">
 *       <div ref={trackRef} className="hz-track">
 *         <img className="hz-img" src="…" />
 *       </div>
 *       <div style={{ position:'absolute', bottom:0, left:0, right:0, height:1, background:'rgba(0,0,0,0.08)' }}>
 *         <div ref={progressRef} style={{ height:'100%', background:'rgba(0,0,0,0.28)', width:'0%' }} />
 *       </div>
 *     </div>
 *   </div>
 */
export interface HorizontalGalleryOptions {
  progressRef?: RefObject<HTMLDivElement>
  cueRef?: RefObject<HTMLElement>
  /** Span/element whose textContent is set to "current / total" each frame */
  counterRef?: RefObject<HTMLElement>
  /** Total image count — required for counterRef to display correctly */
  imageCount?: number
}

export function useHorizontalGallery(
  outerRef: RefObject<HTMLDivElement>,
  trackRef: RefObject<HTMLDivElement>,
  options?: HorizontalGalleryOptions,
) {
  // ── Set outer height so the scroll range covers the full track ────
  useEffect(() => {
    const outer = outerRef.current
    const track = trackRef.current
    if (!outer || !track) return

    const update = () => {
      if (window.innerWidth < 768) {
        outer.style.height = 'auto'
        return
      }
      requestAnimationFrame(() => {
        const dist = Math.max(0, track.scrollWidth - window.innerWidth)
        outer.style.height = `${window.innerHeight + dist}px`
      })
    }

    update()

    // Re-measure each time an image inside the track finishes loading.
    // ResizeObserver only sees the clipped rendered width (capped by the
    // overflow:hidden parent) and never fires on scrollWidth changes —
    // individual load events are the correct trigger.
    const imgs = Array.from(track.querySelectorAll('img'))
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', update)
    })

    window.addEventListener('load', update)     // final safety net
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('load', update)
      window.removeEventListener('resize', update)
      imgs.forEach((img) => img.removeEventListener('load', update))
    }
  }, [outerRef, trackRef])

  // ── Map vertical scroll progress → translateX + progress bar ─────
  useEffect(() => {
    const outer = outerRef.current
    const track = trackRef.current
    if (!outer || !track) return

    const { progressRef, cueRef, counterRef, imageCount } = options ?? {}
    let raf = 0
    let interacted = false

    const onScroll = () => {
      if (window.innerWidth < 768) {
        track.style.transform = 'none'
        return
      }
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        // getBoundingClientRect + scrollY gives the accurate document-top
        // position regardless of offsetParent chain
        const sectionTop = outer.getBoundingClientRect().top + window.scrollY
        const range = outer.offsetHeight - window.innerHeight
        if (range <= 0) return

        const p = Math.max(0, Math.min(1, (window.scrollY - sectionTop) / range))
        const maxX = track.scrollWidth - window.innerWidth
        track.style.transform = `translateX(${-(p * maxX).toFixed(2)}px)`

        // Progress bar
        if (progressRef?.current) {
          progressRef.current.style.width = `${(p * 100).toFixed(2)}%`
        }

        // Page counter: "12 / 32" — direct DOM write, no React re-render
        if (counterRef?.current && imageCount) {
          const current = Math.max(1, Math.round(p * imageCount))
          counterRef.current.textContent = `${current} / ${imageCount}`
        }

        // Fade the scroll cue on first meaningful movement
        if (!interacted && p > 0.015 && cueRef?.current) {
          interacted = true
          cueRef.current.style.opacity = '0'
          cueRef.current.style.pointerEvents = 'none'
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outerRef, trackRef])
}
