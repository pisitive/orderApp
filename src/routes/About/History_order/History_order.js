import React, { Component } from 'react'
import { Table, Button, Popconfirm } from 'antd'

export default class History_order extends Component {
    state = {
        historyOrders: []
    }

    componentDidMount() {
        var storage = window.localStorage
        const historyOrders = JSON.parse(storage['shopCart'])
        this.setState({historyOrders})
    }

    render() {
        const {historyOrders} = this.state

        const columns = [
            {
                key: 'name',
                title: '名称',
                dataIndex: 'name',
                render: (text, record) => {
                    return <span>{text}</span>
                }
            },
            {
                key: 'count',
                title: '数量',
                dataIndex: 'count',
                render: (text, record) => {
                    return <span>{text}</span>
                }
            },
            {
                key: 'price',
                title: '价格',
                dataIndex: 'price',
                render: (text, record) => {
                    return <span>{record.count * record.price}</span>
                }
            },
            {
                key: 'action',
                title: '删除',
                render: (text, record) => {
                    return (
                        <Popconfirm title="Delete?" onConfirm={() => this.onDelete(record.id)}>
                            <Button>x</Button>
                        </Popconfirm>
                    )
                }
            },
        ]

        return (
            <Table 
                dataSource={historyOrders} 
                columns={columns} 
                className="menus-table" 
                pagination={false} />
        )
    }
}
