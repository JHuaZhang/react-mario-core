import React, { createContext, useContext, ReactNode, useRef } from 'react';
import type { ComponentConfig, ComponentRegistryConfig } from '@/types';
import { initializeDefaultComponents } from '@/lib/initialize';

class ComponentRegistry {
  private components: Map<string, ComponentConfig>;

  constructor() {
    this.components = new Map();
  }

  register(name: string, config: ComponentRegistryConfig): void {
    if (this.components.has(name)) {
      console.warn(`[XForm Registry] 组件 ${name} 已存在，将被覆盖`);
    }
    this.components.set(name, {
      name: name,
      label: config.label,
      component: config.component,
      defaultValue: config.defaultValue,
      defaultProps: config.defaultProps || {},
      hasIntrinsicWidth: config.hasIntrinsicWidth || false,
    });
  }

  registerBatch(configs: ComponentRegistryConfig[]): void {
    configs.forEach((config) => {
      this.register(config.name, config);
    });
  }

  getComponent(name: string): ComponentConfig | undefined {
    return this.components.get(name);
  }

  getAllComponentNames(): string[] {
    return Array.from(this.components.keys());
  }

  getAllComponents() {
    return this.components;
  }

  hasComponent(name: string): boolean {
    return this.components.has(name);
  }

  unregister(name: string): void {
    this.components.delete(name);
  }

  clear(): void {
    this.components.clear();
  }
}

// 创建全局注册器实例
export const globalRegistry = new ComponentRegistry();

export const ComponentRegistryContext = createContext<ComponentRegistry>(globalRegistry);

export interface ComponentProviderProps {
  children: ReactNode;
  registry?: ComponentRegistry;
  components?: ComponentRegistryConfig[];
}

export const ComponentProvider: React.FC<ComponentProviderProps> = ({
  children,
  registry = globalRegistry,
  components = [],
}) => {
  // 使用useRef来标记是否已经注册过，避免重复注册
  const hasRegistered = useRef(false);
  // 只在首次渲染时注册组件
  if (!hasRegistered.current && components.length > 0) {
    registry.registerBatch(components);
    hasRegistered.current = true;
  }
  if (!hasRegistered.current && components.length === 0) {
    initializeDefaultComponents();
  }

  return (
    <ComponentRegistryContext.Provider value={registry}>
      {children}
    </ComponentRegistryContext.Provider>
  );
};

export const useComponentRegistry = () => {
  const registry = useContext(ComponentRegistryContext);
  return registry;
};

export const useComponent = (name: string): ComponentConfig | null => {
  const registry = useComponentRegistry();
  const config = registry.getComponent(name);
  if (!config) {
    console.warn(`组件 "${name}" 未注册`);
    return null;
  }
  return config;
};

export { ComponentRegistry };
export default ComponentRegistry;
