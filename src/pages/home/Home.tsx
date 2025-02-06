import React, { useState } from 'react';
import { Layout, Input, Button, List, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { TextArea } = Input;
const { Title } = Typography;

const AIPromptPage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, inputText]);
      setInputText('');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: 'white', textAlign: 'center' }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>
          AI Prompt Page
        </Title>
      </Header>
      <Content style={{ padding: '24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <List
            dataSource={messages}
            renderItem={(message, index) => (
              <List.Item key={index}>
                <div style={{ padding: '8px', background: '#f0f0f0', borderRadius: '4px', width: '100%' }}>
                  {message}
                </div>
              </List.Item>
            )}
          />
          <div style={{ marginTop: '16px' }}>
            <TextArea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your prompt here..."
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSend}
              style={{ marginTop: '8px', width: '100%' }}
            >
              Send
            </Button>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default AIPromptPage;