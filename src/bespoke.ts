export class BespokeElement extends HTMLElement {
   static get tag() { return 'be-spoke'; }
   
   constructor() {
      super();
   }
   
   connectedCallback() {
      let template = this.querySelector('template');
      if (template) {
         this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
         console.info('Bespoke Ready');
      }
   }

   static get observedAttributes() {
      return ['pattern','tweed', 'stitch'];
   }

   attributeChangedCallback(attr, oldVal, newVal) {
      this[attr] = newVal;
   }

   _tweed = '#1d1d1d';
   get tweed() { return this._tweed; }
   set tweed(val) {
      if (this._tweed === val) return;
      this._tweed = val;
      this.setAttribute('tweed', this._tweed);
      this.style.setProperty('--tweedColor',this._tweed);
   }

   _stitch = 'rgba(250, 0, 0, 0.5);';
   get stitch() { return this._stitch; }
   set stitch(val) {
      if (this._stitch === val) return;
      this._stitch = val;
      this.setAttribute('stitch', this._stitch);
      this.style.setProperty('--stitchColor',this._stitch);
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

window.customElements.define(BespokeElement.tag, BespokeElement);