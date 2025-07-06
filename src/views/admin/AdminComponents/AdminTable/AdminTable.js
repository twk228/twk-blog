import "./AdminTable.scss";
import { Card, Table, Pagination, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import propTypes from "prop-types";

import { createStyles } from 'antd-style';
const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

const AdminTable = (props) => {
  const { styles } = useStyle();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const refresh = () => {
    props.requestData({ page, pageSize });
  };
  return (
    <div className="AdminTable">
      <Card>
        <div className="admin-table-header">
          <div className="left">{props.children}</div>
          <div className="right">
            <Button
              shape="circle"
              icon={<ReloadOutlined />}
              onClick={refresh}
            />
          </div>
        </div>
        <Table
          bordered
          className={styles.customTable}
          pagination={false}
          columns={props.columnData}
          dataSource={props.tableData}
          rowKey="_id"
          scroll={{
            x: 'max-content',
          }}
        />
        <div className="pagination">
          <Pagination
            current={page}
            pageSize={pageSize}
            showSizeChanger={true}
            total={props.totalPage}
            pageSizeOptions={["2", "5", "10", "20"]}
            onChange={(page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
              props.requestData({ page, pageSize });
            }}
          />
        </div>
      </Card>
    </div>
  );
};

AdminTable.propTypes = {
  // 表头数据
  columnData: propTypes.array,
  // 表格数据
  tableData: propTypes.array,
  // 子组件
  children: propTypes.element,
  // 总页数
  totalPage: propTypes.number,
  // 请求数据方法
  requestData: propTypes.func,
};

export default AdminTable;
