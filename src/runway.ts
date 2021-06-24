export class RunwayElement extends HTMLElement {
    static get tag() { return 'run-way'; }
    static get html() {
       return `
       <style>
          :root {
             --chestColor: url(#runway-chest);
             --sleeveColor: url(#runway-sleeve);
          }
          :host {
             display: block;
             width: 100%;
          }
          .chest {
             fill: var(--chestColor);
             stroke: var(--stitchColor);
             stroke-width: var(--stitchWidth);
             stroke-dasharray: var(--stitchArray);
         }
         .right_arm, .left_arm {
             fill: var(--sleeveColor);
             stroke: var(--stitchColor);
             stroke-width: var(--stitchWidth);
             stroke-dasharray: var(--stitchArray);
         }
       </style>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <defs>
          <style>
             .scales { fill: var(--scaleFill); stroke: var(--scaleStroke); stroke-width: var(--scaleWidth); }
             .feathers { fill: var(--featherFill); stroke: var(--featherStroke); }
          </style>
          <pattern id="runway-chest" width="10" height="15" patternUnits="userSpaceOnUse">
             <ellipse class="scales" cx="5" cy="5" rx="5" ry="10" />
          </pattern>
          <pattern id="runway-sleeve" width="5" height="5" patternUnits="userSpaceOnUse">
             <rect class="feathers" width="5" height="5"></rect>
          </pattern>
    </defs>
    <g transform="matrix(1.4509699,0,0,1.4509699,44.896312,-226.96141)">
       <path class="sleeve left_arm" transform="translate(0,103)" d="m 64.407812,108.867 c 0,0 6.929528,38.12731 -7.166033,50.18846 0,0 -16.62566,25.80167 -29.60515,25.33225 -30.4479356,-1.1012 -56.59962,40.95277 -56.59962,40.95277 0,0 19.113286,-174.715724 93.370803,-116.47348 z" />
       <path class="sleeve right_arm" transform="translate(0,103)" d="m 135.22871,108.86699 c 0,0 -6.92953,38.12732 7.16603,50.18847 0,0 29.21143,39.7391 48.96749,48.35772 l 51.88987,22.63705 c 0,0 -60.90402,-58.03086 -35.8514,-115.17025 9.07862,-20.70629 -68.82454,-46.542892 -72.17199,-6.01299 z" />
       <path class="chest" transform="translate(0,103)" d="m 64.40781,108.867 14.353419,-0.12566 c 0,0 1.472143,7.61932 20.97807,7.61932 19.505911,0 21.714131,-7.25129 21.714131,-7.25129 l 13.77528,-0.24238 c 0,0 -7.89001,36.08723 7.16603,50.18847 0,0 78.79359,115.67024 1.50891,115.67024 H 55.574942 c -91.654766,0 1.10411,-114.82732 1.10411,-114.82732 0,0 14.353411,-6.74137 7.728758,-51.03138 z" />
    </g></svg>`
    }
 
    constructor() {
       super();
       this.attachShadow({ mode: "open" });
       this.shadowRoot.innerHTML = RunwayElement.html;
       console.info('Runway Ready');
    }
 }
 
window.customElements.define(RunwayElement.tag, RunwayElement);
