import "./AdminFilter.scss";
import React from "react";
import propTypes from "prop-types";
import {
  Card,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  theme,
} from "antd";
const { Option } = Select;

const AdminFilter = (props) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };
  const getFields = () => {
    const children = [];
    props.formData.forEach((item, index) => {
      children.push(
        <Col span={8} key={index}>
          {item.type === "input" ? (
            <Form.Item
              name={item.name}
              label={item.label}
              rules={item.rules}
            >
              <Input placeholder={item.placeholder} />
            </Form.Item>
          ) : item.type === "select" ? (
            <Form.Item
              name={item.name}
              label={item.label}
              rules={item.rules}
              initialValue={item.activeValue}
            >
              <Select>
                {item.children.map((item, index) => {
                  return (
                    <Option value={item.value} key={index}>
                      {item.label}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          ) : null}
        </Col>
      );
    });
    return children;
  };
  const onFinish = (values) => {
    props.requestData(values);
  };
  return (
    <div className="AdminFilter">
      <Card>
        <Form
          form={form}
          name="advanced_search"
          style={formStyle}
          onFinish={onFinish}
        >
          <Row gutter={24}>{getFields()}</Row>
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Space size="small">
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                onClick={() => {
                  form.resetFields();
                  props.requestData(form.getFieldsValue());
                }}
              >
                重置
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

AdminFilter.propTypes = {
  // 表单数据
  formData: propTypes.array,
  // 请求数据方法
  requestData: propTypes.func,
};

export default AdminFilter;
