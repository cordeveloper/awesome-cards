import {Component,h, Prop, Method, State} from '@stencil/core';
import { isMobileDevice } from './detect-mobile';


@Component({
  tag: 'awesome-cards',
  styleUrl: 'awesome-cards.css',
})
export class AwesomeCards {

  grid: HTMLElement;
  @Prop({reflect: true, mutable: true}) columns: string;
  @Prop({reflect: true, mutable: true}) rows: string;
  @Prop({reflect: true, mutable: true}) gap: string;

  @State() isMobile: boolean;

  render() {
    return (
      <host>
        {this.buildVersion()}
      </host>
    )
  }

  @Method() setGridColumns() {
    this.grid.style.gridTemplateColumns = this.columns;
  }

  @Method() setGridGap() {
    this.grid.style.gridGap = this.gap;
  }

  buildVersion() {

    //DESKTOP
    if(!this.isMobile) {
      return (  
      <section class="awesome-cards__grid" ref={ el => this.grid = el as HTMLElement } >
        <slot></slot>
      </section>
    )
    //MOBILE
    } else {
      return (
       <section class="awesome-cards__snap">
           <slot></slot>
       </section>
      )
    }
   
  }

  componentWillLoad() {
    this.isMobile = isMobileDevice();
  }

  componentDidLoad() {
    if(this.columns)  {
      this.setGridColumns();
      this.setGridGap();
    }
  }
}