"use client";
import { useState, useEffect } from "react";

export function ScrollToTop() {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;
  
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{position:'fixed',bottom:'24px',right:'24px',zIndex:999,width:'44px',height:'44px',borderRadius:'50%',background:'#1A5CFF',color:'white',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 12px rgba(26,92,255,0.4)'}}
      aria-label="Scroll to top"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
    </button>
  );
}
