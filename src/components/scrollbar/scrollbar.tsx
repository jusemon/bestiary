import React, { Component, UIEvent, MouseEvent, createRef, RefObject, ReactNode } from 'react';
import './scrollbar.scss';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'

export class Scrollbar extends Component<{children: ReactNode}, { scroll: RefObject<HTMLDivElement>, container: RefObject<HTMLDivElement> }> {
  pressed: boolean = false;
  constructor(props: any) {
    super(props);
    this.state = { scroll: createRef(), container: createRef() };
    this.onScroll = this.onScroll.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseSwitch = this.onMouseSwitch.bind(this);
  }

  componentDidUpdate() {
    const scroll = this.state.scroll.current;
    if (scroll) {
      scroll.style.top = `0px`;
    }
  }

  onScroll(e: UIEvent<HTMLDivElement>) {
    const element = e.currentTarget;
    const scroll = this.state.scroll.current;
    if (scroll && scroll.parentElement) {
      const availableSpace = scroll.parentElement.clientHeight - scroll.clientHeight;
      const progress = (element.scrollTop / element.scrollHeight) * 100;
      scroll.style.top = `${progress * availableSpace / 100}px`;
    }
  }

  onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const element = this.state.container.current;
    if (this.pressed && element) {
      element.scroll({ behavior: 'auto', top: element.scrollTop + e.movementY * 135 })
    }
  }

  onMouseSwitch(e: MouseEvent<HTMLDivElement>, isPressed: boolean) {
    this.pressed = isPressed;
  }

  render() {
    return (
      <div className='scrollbar' onMouseLeave={e => this.onMouseSwitch(e, false)} onMouseUp={e => this.onMouseSwitch(e, false)} onMouseMove={this.onMouseMove}>
        <div ref={this.state.container} className='scrollbar-container' onScroll={this.onScroll}>
          {this.props.children}
        </div>
        <div className='bar'>
          <button className='bar-button'>
            <FaCaretUp className='bar-icon'></FaCaretUp>
          </button>
          <div className='bar-control'>
            <div ref={this.state.scroll} onMouseDown={e => this.onMouseSwitch(e, true)} className='bar-scroll'></div>
          </div>
          <button className='bar-button'>
            <FaCaretDown className='bar-icon'></FaCaretDown>
          </button>
        </div>
      </div>
    );
  }
}
