import React from 'react';
import type {
  FormModel,
  FormItemProps,
  DefaultOptionType,
  FormProps,
  FormLayoutParams,
} from 'react-antd-xform';

export interface FormItemConfig extends Partial<Omit<FormItemProps, 'component'>> {
  name: string;
  component: string;
  label?: React.ReactNode;
  help?: React.ReactNode;
  componentProps?: Record<string, any>;
  required?: boolean;
  requiredMessage?: string;
  defaultValue?: any;
  writeDefaultValueToModel?: boolean | 'force';
  options?: DefaultOptionType[];
  rules?: Array<{
    required?: boolean;
    message?: string;
    validator?: (rule: any, value: any) => Promise<void>;
    pattern?: RegExp;
    min?: number;
    max?: number;
    len?: number;
  }>;
  visible?: boolean | ((values: Record<string, any>) => boolean);
  disabled?: boolean;

  // 布局
  style?: React.CSSProperties;
  className?: string;

  // 值处理
  valuePropName?: string;
  getValueFromEvent?: (...args: any[]) => any;
  getValueProps?: (value: any) => any;

  // 校验
  validator?: (value: any) => boolean | string;

  // 其他透传属性
  [key: string]: any;
}

export interface FormRendererProps extends Partial<FormProps> {
  config: FormItemConfig[];
  model?: FormModel;
  onSubmit?: (values: any) => void;
  onError?: (errors: any, model: FormModel<any>) => void;
  onReset?: (model: FormModel<any>) => void;

  // 布局配置
  layout?: FormLayoutParams;

  // 按钮配置
  showButtons?: boolean;
  submitText?: string;
  resetText?: string;

  // 自定义按钮属性
  submitButtonProps?: Record<string, any>;
  resetButtonProps?: Record<string, any>;

  // 容器样式
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
}

export interface ComponentConfig {
  label?: React.ReactNode | string;
  component: string;
  defaultValue?: any;
  defaultProps?: Record<string, any>;
  hasIntrinsicWidth?: boolean;
  validator?: (value: any) => boolean | string;
  transformer?: (value: any) => any;
  id?: string;
  name: string;
}

export type ComponentRegistryConfig = FormItemConfig;
