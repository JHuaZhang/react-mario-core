import { observer } from 'mobx-react-lite';
import { FormModel } from 'react-antd-xform';
import { Card, Space, message, ConfigProvider, Typography } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { ComponentProvider, FormRenderer } from '../index';

const { Title } = Typography;

// 示例配置
const DEMO_CONFIG = [
  {
    name: 'username',
    component: 'input',
    label: '用户名',
    help: '请输入用户名，至少3个字符',
    required: true,
    requiredMessage: '用户名不能为空',
    componentProps: {
      placeholder: '请输入用户名',
    },
    rules: [
      { required: true, message: '用户名不能为空' },
      { min: 3, message: '至少3个字符' },
    ],
  },
  {
    name: 'projectType',
    component: 'select',
    label: '项目类型',
    componentProps: {
      placeholder: '请选择项目类型',
      options: [
        { label: 'Web应用', value: 'web' },
        { label: '移动应用', value: 'mobile' },
        { label: '桌面应用', value: 'desktop' },
      ],
    },
  },
];

const model = new FormModel({});

const App = observer(() => {
  const handleSubmit = (values: any) => {
    message.success('表单提交成功');
    console.log('提交的值:', values);
  };

  const handleError = (errors: any, model: FormModel<any>) => {
    console.error('表单提交失败:', errors);
    message.error('表单校验失败，请检查输入');
  };

  const handleReset = (model: FormModel<any>) => {
    console.log('表单已重置');
    message.info('表单已重置');
  };

  return (
    <ConfigProvider locale={zhCN}>
      <ComponentProvider components={[]}>
        <div
          style={{
            padding: 24,
            background: '#f5f5f5',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Title level={2} style={{ marginBottom: 24 }}>
            低代码表单示例
          </Title>
          <Space direction="vertical" size="large" style={{ width: '100%', maxWidth: 800 }}>
            <Card title="基础表单示例">
              <div style={{ maxWidth: 600, margin: '0 auto' }}>
                <FormRenderer
                  config={DEMO_CONFIG}
                  model={model}
                  onSubmit={handleSubmit}
                  onError={handleError}
                  onReset={handleReset}
                  showButtons={true}
                  submitText="提交表单"
                  resetText="重置表单"
                  submitButtonProps={{ size: 'large' }}
                  resetButtonProps={{ size: 'large' }}
                  wrapperStyle={{
                    padding: 24,
                    background: 'white',
                    borderRadius: 8,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </div>
            </Card>
            <Card title="表单数据">
              <div>
                <Title level={4}>当前表单值：</Title>
                <pre
                  style={{
                    background: '#f0f0f0',
                    padding: 16,
                    borderRadius: 4,
                    overflow: 'auto',
                  }}
                >
                  {JSON.stringify(model.values, null, 2)}
                </pre>
              </div>
            </Card>
          </Space>
        </div>
      </ComponentProvider>
    </ConfigProvider>
  );
});

export default App;
