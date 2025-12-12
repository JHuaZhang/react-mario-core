import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, FormItem } from 'react-antd-xform';
import type { FormItemProps } from 'react-antd-xform';
import { Button } from 'antd';
import type { FormRendererProps } from '@/types';
import { useComponentRegistry } from '@/registry';

const FormRenderer: React.FC<FormRendererProps> = observer(
  ({
    config = [],
    model,
    onSubmit,
    onError,
    onReset,
    layout = { inlineError: true },
    showButtons = true,
    submitText = '提交',
    resetText = '重置',
    submitButtonProps = {},
    resetButtonProps = {},
    wrapperClassName,
    wrapperStyle,
    ...formProps
  }) => {
    const handleSubmit = (values: any) => {
      console.log('[XForm Renderer] 表单提交:', values);
      onSubmit?.(values);
    };
    const registry = useComponentRegistry();
    const formValues = model?.values as Record<string, any>;

    const renderFormItems = useMemo(() => {
      return config
        .filter((item) => {
          if (item.visible === false) return false;
          if (typeof item.visible === 'function') {
            return item.visible(formValues || {});
          }
          return true;
        })
        .map((item, index) => {
          const {
            name,
            component: componentName,
            componentProps = {},
            disabled,
            style,
            className,
            ...restItemProps
          } = item;
          const componentConfig = registry.getComponent(componentName);
          if (!componentConfig) {
            console.error(`组件 "${componentName}" 未注册，无法渲染表单项 "${name}"`);
            return null;
          }
          const Component = componentConfig.component;
          const mergedProps = {
            ...componentConfig.defaultProps,
            ...componentProps,
          };

          const isDisabled = disabled;

          if (isDisabled) {
            mergedProps.disabled = true;
          }
          const formItemProps: FormItemProps = {
            ...restItemProps,
            name,
            component: Component,
            componentProps: mergedProps,
            style,
            className,
          };
          // 处理required和requiredMessage
          if (item.required && item.requiredMessage) {
            formItemProps.required = item.required;
            formItemProps.requiredMessage = item.requiredMessage;
          }
          return <FormItem key={`${name}-${index}`} {...formItemProps} />;
        })
        .filter(Boolean);
    }, [config, formValues, registry]);

    return (
      <div className={wrapperClassName} style={wrapperStyle}>
        <Form
          model={model}
          layout={layout}
          onSubmit={handleSubmit}
          onError={onError}
          onReset={onReset}
          {...formProps}
        >
          {renderFormItems}
          {showButtons && (
            <Form.ItemView>
              <div style={{ marginTop: 24 }}>
                <Form.Submit ButtonComponent={Button} type="primary" {...submitButtonProps}>
                  {submitText}
                </Form.Submit>
                {/* <Form.Reset
                  ButtonComponent={Button}
                  style={{ marginLeft: 12 }}
                  {...resetButtonProps}
                >
                  {resetText}
                </Form.Reset> */}
              </div>
            </Form.ItemView>
          )}
        </Form>
      </div>
    );
  }
);

export default FormRenderer;
