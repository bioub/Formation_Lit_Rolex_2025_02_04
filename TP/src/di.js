import { DependencyInjector } from './lib/dependencies/DependencyInjector.js';
import { Router } from './lib/router/Router.js';
import { routes } from './routes.js';
import { SettingsStore } from './services/SettingsStore.js';

export const di = new DependencyInjector();

di.provide('router', new Router({
  routes: routes,
  useHistory: true,
}));

di.provide('settings', new SettingsStore())