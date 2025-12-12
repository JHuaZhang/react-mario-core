import { initializeDefaultComponents } from './lib/initialize';

export * from './types';

export {
  ComponentRegistry,
  globalRegistry,
  ComponentProvider,
  useComponentRegistry,
  useComponent,
} from './registry';

export { default as FormRenderer } from './formRenderer';

export const registerDefaultComponents = initializeDefaultComponents;
