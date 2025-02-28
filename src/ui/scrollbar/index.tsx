import {
  useState,
  useRef,
  useCallback,
  ReactNode,
  UIEvent,
  MouseEvent,
} from 'react';
import './index.css';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

interface ScrollbarProps {
  children: ReactNode;
}

export function Scrollbar({ children }: ScrollbarProps) {
  const [isPressed, setIsPressed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scroll = scrollRef.current;

    if (scroll && scroll.parentElement) {
      const availableSpace =
        scroll.parentElement.clientHeight - scroll.clientHeight;
      const progress = (element.scrollTop / element.scrollHeight) * 100;
      scroll.style.top = `${(progress * availableSpace) / 100}px`;
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (isPressed && containerRef.current) {
        containerRef.current.scroll({
          behavior: 'auto',
          top: containerRef.current.scrollTop + e.movementY * 135,
        });
      }
    },
    [isPressed]
  );

  const handleMouseDown = useCallback(() => {
    setIsPressed(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handleScrollUp = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scroll({
        behavior: 'smooth',
        top: containerRef.current.scrollTop - 100,
      });
    }
  }, []);

  const handleScrollDown = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scroll({
        behavior: 'smooth',
        top: containerRef.current.scrollTop + 100,
      });
    }
  }, []);

  return (
    <div
      className='scrollbar'
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div
        ref={containerRef}
        className='scrollbar-container'
        onScroll={handleScroll}
      >
        {children}
      </div>
      <div className='bar'>
        <button className='bar-button' onClick={handleScrollUp}>
          <FaCaretUp className='bar-icon' />
        </button>
        <div className='bar-control'>
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            className='bar-scroll'
          />
        </div>
        <button className='bar-button' onClick={handleScrollDown}>
          <FaCaretDown className='bar-icon' />
        </button>
      </div>
    </div>
  );
}
