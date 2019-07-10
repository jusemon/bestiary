import React, { Component, UIEvent, MouseEvent, createRef, RefObject } from 'react';
import './scrollbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

export class Scrollbar extends Component<{}, { scroll: RefObject<HTMLDivElement>, container: RefObject<HTMLDivElement> }> {
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
    scroll.style.top = `0px`;
  }

  onScroll(e: UIEvent<HTMLDivElement>) {
    const element = e.currentTarget;
    const scroll = this.state.scroll.current;
    const availableSpace = scroll.parentElement.clientHeight - scroll.clientHeight;
    const progress = (element.scrollTop / element.scrollHeight) * 100;
    scroll.style.top = `${progress * availableSpace / 100}px`;
  }

  onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (this.pressed) {
      const element = this.state.container.current;
      element.scroll({ behavior: 'auto', top: element.scrollTop + e.movementY * 125 })
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
            <FontAwesomeIcon className='bar-icon' icon={faCaretUp}></FontAwesomeIcon>
          </button>
          <div className='bar-control'>
            <div ref={this.state.scroll} onMouseDown={e => this.onMouseSwitch(e, true)} className='bar-scroll'></div>
          </div>
          <button className='bar-button'>
            <FontAwesomeIcon className='bar-icon' icon={faCaretDown}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    );
  }
}
