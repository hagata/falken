import {Demo} from '../modules/demo';
import {Search} from '../modules/search';
import {Splash} from '../modules/splash';

const modules = {
  Search: Search,
  Splash: Splash,
  Demo: Demo
};

const appModules = {};

/**
 * Loads modules from dom elements with data-module attributes.
 * @export
 */
export function loadModules() {
  const moduleNodes = document.querySelectorAll('[data-module]');

  for (const node of moduleNodes) {
    const moduleName = node.dataset.module;
    appModules[moduleName] = new modules[moduleName](node);
  }
}
