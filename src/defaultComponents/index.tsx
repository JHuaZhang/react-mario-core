import { ComponentRegistryConfig } from '@/types';

export const defaultComponents: ComponentRegistryConfig[] = [
  {
    name: 'input',
    label:'输入框',
    component: 'input',
    defaultValue: '',
    defaultProps: {
      placeholder: '请输入',
      allowClear: true,
      style: {
        width: '320px',
      },
    },
  },
  {
    name: 'select',
    label:'select单选',
    component: 'select',
    defaultValue: '',
    defaultProps: {
      placeholder: '请输入',
      allowClear: true,
      style: {
        width: '320px',
      },
    },
  },
];
