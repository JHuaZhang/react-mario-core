import { ComponentRegistryConfig } from '@/types';

export const defaultComponents: ComponentRegistryConfig[] = [
  {
    name: 'input',
    label: '输入框',
    component: 'input',
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
    label: 'select单选',
    component: 'select',
    defaultProps: {
      placeholder: '请选择',
      style: {
        width: '320px',
      },
    },
  },
  {
    name: 'multiSelect',
    label: 'select多选',
    component: 'multiSelect',
    defaultProps: {
      placeholder: '请输入',
      allowClear: true,
      style: {
        width: '320px',
      },
    },
  },
  {
    name: 'radio',
    label: 'radio单选',
    component: 'radio',
  },
  {
    name: 'checkbox',
    label: 'checkbox复选',
    component: 'checkbox',
  },
  {
    name: 'datePicker',
    label: '日期选择',
    component: 'datePicker',
    defaultProps: {
      style: {
        width: '320px',
      },
    },
  },
  {
    name: 'dateRangePicker',
    label: '日期范围',
    component: 'dateRangePicker',
    defaultProps: {
      style: {
        width: '320px',
      },
    },
  },
  {
    name: 'timePicker',
    label: '时间选择',
    component: 'timePicker',
    defaultProps: {
      style: {
        width: '320px',
      },
    },
  },
  {
    name: 'timeRangePicker',
    label: '时间范围',
    component: 'timeRangePicker',
    defaultProps: {
      style: {
        width: '320px',
      },
    },
  },
  {
    name: 'textArea',
    label: '多行输入',
    component: 'textArea',
    defaultProps: {
      placeholder: '请输入',
      allowClear: true,
      style: {
        width: '320px',
      },
    },
  },
  {
    name: 'inputNumber',
    label: '数字输入',
    component: 'inputNumber',
    defaultProps: {
      style: {
        width: '320px',
      },
    },
  },
  {
    name: 'slider',
    label: '滑动条',
    component: 'slider',
  },
  {
    name: 'switch',
    label: '开关',
    component: 'switch',
  },
  { name: 'rate', label: '评分器', component: 'rate' },
  { name: 'colorPicker', label: '颜色选择', component: 'colorPicker' },
];
