import { useEffect, useState } from 'react';

/** Returns the id of the section currently under the header line. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // bottom of page: final section is active
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);
  return active;
}
