export class ReadyToWearElement extends HTMLElement {
    static get tag() { return 'ready-to-wear'; }
    static get html() {
       return `
       <style>
          :host {display:block; width: 100%; }
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
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
       <g>
 
       </g>
       </svg>`;
    }
    constructor() {
       super();
       this.attachShadow({ mode: "open" });
       this.shadowRoot.innerHTML = ReadyToWearElement.html;
       console.info('Ready To Wear Ready');
    }

    connectedCallback() {
        let patterns = this.querySelector('template');
        if (patterns) {
            let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            defs.appendChild(patterns.content.cloneNode(true));
            this.shadowRoot.querySelector('svg').appendChild(defs);
        }
    }
 
    static get observedAttributes() {
       return ['chest', 'left-arm', 'right-arm', 
          'sleeve-color', 
          'stitch-color', 'stitch-width', 'stitch-array',
          'transform', 'pattern'
       ];
    }
 
    attributeChangedCallback(attr, oldVal, newVal) {
       this[this.camelCase(attr)] = newVal;
    }
 
    camelCase(str: String, to:boolean=true) {
       return to ? str.replaceAll(/-([a-z])/g, (m,g) => g.toUpperCase()) : str.replaceAll(/([a-z][A-Z])/g, (m,g) => `${g[0]}-${g[1].toLowerCase()}`)
    }
 
    _chest = ''; //'m 64.40781,108.867 14.353419,-0.12566 c 0,0 1.472143,29.07487 20.97807,29.07487 19.505911,0 21.714131,-28.70684 21.714131,-28.70684 l 13.77528,-0.24238 c 0,0 -7.89001,36.08723 7.16603,50.18847 l 1.50891,115.67024 H 55.574942 l 1.10411,-114.82732 c 0,0 14.353411,-6.74137 7.728758,-51.03138 z';
    get chest() { return this._chest; }
    set chest(val) {
       if (this._chest === val) return;
       this._chest = val;
       this.setAttribute('chest', this._chest);
       let group = this.shadowRoot.querySelector('g');
       let chest = group.querySelector('.chest');
       if (chest) {
          chest.setAttribute('d', this._chest);
       } else {
          let chestPath = document.createElementNS('http://www.w3.org/2000/svg','path');
          chestPath.setAttributeNS(null, 'class', "chest");
          chestPath.setAttributeNS(null, 'd', this._chest);
          group.appendChild(chestPath);
       }
    }
 
    _leftArm = ''; //'m 64.407812,108.867 c 0,0 6.929528,38.12731 -7.166033,50.18846 L 27.636629,184.38771 1.3887633,161.49713 c 0,0 40.5688367,-52.26209 63.0190487,-52.63013 z';
    get leftArm() { return this._leftArm; }
    set leftArm(val) {
       if (this._leftArm === val) return;
       this._leftArm = val;
       let group = this.shadowRoot.querySelector('g');
       let leftArm = group.querySelector('.left_arm');
       if (leftArm) {
          leftArm.setAttribute('d', this._leftArm);
       } else {
          let armPath = document.createElementNS('http://www.w3.org/2000/svg','path');
          armPath.setAttributeNS(null,'class',"sleeve left_arm");
          armPath.setAttributeNS(null,'d', this._leftArm);
          group.appendChild(armPath);
       }
       this.setAttribute('left-arm', this._leftArm);
    }
 
    _rightArm = '';  //'m 135.22871,108.86699 c 0,0 -6.92953,38.12732 7.16603,50.18847 l 29.60516,25.33225 26.24787,-22.89058 c 0,0 -40.56884,-52.2621 -63.01906,-52.63014 z';
    get rightArm() { return this._rightArm; }
    set rightArm(val) {
       if (this._rightArm === val) return;
       this._rightArm = val;
       let group = this.shadowRoot.querySelector('g');
       let rightArm = group.querySelector('.right_arm');
       if (rightArm) {
          rightArm.setAttribute('d', this._rightArm);
       } else {
          let armPath = document.createElementNS('http://www.w3.org/2000/svg','path');
          armPath.setAttributeNS(null, 'class', "sleeve right_arm");
          armPath.setAttributeNS(null, 'd', this._rightArm);
          group.appendChild(armPath);
       }
       this.setAttribute('right-arm', this._rightArm);
    }
 
    _transform = ''; //translate(0,-97)
    get transform() { return this._transform; }
    set transform(val) {
       if (this._transform === val) return;
       this._transform = val;
       let group = this.shadowRoot.querySelector('g');
       group.setAttribute('transform', this._transform);
       this.setAttribute('transform',this._transform);
    }

    _pattern = ''; //'url(#bespoke-pattern)';
    get pattern() { return this._pattern; }
    set pattern(val) {
        if (this._pattern === val) return;
        this._pattern = val;
        this.style.setProperty('--chestColor', this._pattern);
        this.style.setProperty('--sleeveColor', this._pattern);
        this.setAttribute('pattern', this._pattern);
   }
 }

window.customElements.define(ReadyToWearElement.tag, ReadyToWearElement);
