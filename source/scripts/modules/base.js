export default class Module {

    /**
     * Constructor for the Module superclass
     * @param {Node} node Element that is the dom.
     */
  constructor(node) {
        /**
         * The node the component is attached to.
         * @type {Element}
         * @protected
         */
    this.node = node;
  }

    /**
     * Loads the module.
     * @protected
     */
  load() {
    throw Error('unimplemented abstract method');
  }

    /**
     * Registers components on subcomponents
     * @param  {?Element} node A node on which to search for components to
     *                         register
     */
    // registerComponents(node) {
    //       // if no node is specified, fall back to the node the component is attached
    //       // to.
    //   let targetNode = node || this.node;

    //   let componentNodes = targetNode.querySelectorAll('[data-module]');

    //   for (var i = 0; i < componentNodes.length; ++i) {
    //     let node = componentNodes[i];
    //     let name = dataset.get(node, 'module');
    //     this[name] =
    //               new this.scene.components[name](node, this.scene, this.data);
    //   }
    // }
}

