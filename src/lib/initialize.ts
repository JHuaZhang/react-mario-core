import { globalRegistry } from '@/registry';
import { defaultComponents } from '@/defaultComponents';

export const initializeDefaultComponents = () => {
  if (globalRegistry.getAllComponentNames().length === 0) {
    globalRegistry.registerBatch(defaultComponents);
    console.log('[XForm] 默认组件已初始化');
  }
};
