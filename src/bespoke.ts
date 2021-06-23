export class RunwayElement extends HTMLElement {
   
}

export class BespokeElement extends HTMLElement {
   static get tag() { return 'be-spoke'; }
   
   constructor() {
      super();
      console.info('Bespoke Ready');
   }
   
   connectedCallback() {

   }

   attributeChangedCallback(attr, oldVal, newVal) {
      this[attr] = newVal;
   }

   _pattern = '';
   get pattern() { return this._pattern; }
   set pattern(val) {
      if (this._pattern === val) return;
      this._pattern = val;
      this.setAttribute('pattern', this._pattern);
   }
}

export class ReadyToWearElement extends BespokeElement {
   static get tag() { return 'ready-to-wear'; }
   
   constructor() {
      super();
      console.info('Ready To Wear Ready');
   }

   set pattern(val) {
      if (this._pattern === val) return;
      this._pattern = val;
      this.setAttribute('pattern', this._pattern);
      this.setAttribute('cut', 'standard');
   }
}

window.customElements.define(BespokeElement.tag, BespokeElement);
window.customElements.define(ReadyToWearElement.tag, ReadyToWearElement);
