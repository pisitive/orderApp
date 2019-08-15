import React, { Component } from 'react'
import { Table, Form, Button, Row, Col, Popconfirm} from 'antd'

import NewPizza from './NewPizza'
import style from './manage.scss'


class Manage extends Component {
    state = {
        pizzaTypes: []
    }

    getData() {  //请求数据函数
        fetch('https://www.easy-mock.com/mock/5d3557e2729b2a3c2fdc2648/orderApp/pizzaTypes')   
            .then(response => response.json())  ///解析json数据
            .then(data => {
                var storage = window.localStorage
                const newPizza = JSON.parse(storage['newPizza'])
                var k = data.pizzaTypes.length + 1
                var obj = {}
                var pizzaList = []
                for (let item in newPizza) {
                    if (item === 'name') {
                        obj = {
                            key:  k + '',
                            name: newPizza[item]
                        }
                        pizzaList.push(obj)
                    }
                }
                pizzaList = [...pizzaList, ...data.pizzaTypes]
                this.setState({pizzaTypes: pizzaList})  ////赋值到本地数据
            })
            .catch(e => console.log('错误:', e))   ///请求出错
    }

    componentDidMount() {//网络请求都是放在此生命周期函数中
        this.getData()
    }

    onDelete(index) {
        let {pizzaTypes} = this.state
        pizzaTypes.splice(index, 1)
        this.setState({pizzaTypes})
    }

    renderMenuTable() {
        const columns = [
            {
                key: 'name',
                title: '品种',
                dataIndex: 'name',
                render: (text, record) => {
                    return (
                        <span>{text}</span>
                    )
                }
            },
            {
                key: 'action',
                title: '删除',
                render: (text, record) => {
                    return (
                        <Popconfirm title="Delete?" onConfirm={() => this.onDelete(record.id)}>
                            <Button className={style.delete}>x</Button>
                        </Popconfirm>
                    )
                }
            }
        ]
        const {pizzaTypes} = this.state
        return (
            <Table 
                dataSource={pizzaTypes} 
                columns={columns} 
                className="menus-table" 
                pagination={false}
                locale={{
                    emptyText: '菜单没有任何商品'
                }}
             />
        )
    }

    renderNewPizza() {
        return <NewPizza />
    }

    render() {
        return (
            <Row className={style.manage}>
                <Col sm={24} md={16} className={style.left}>
                    {this.renderNewPizza()}
                </Col>
                <Col sm={24} md={8} className={style.right}>
                    <h3>菜单</h3>
                    {this.renderMenuTable()}
                </Col>
            </Row>
        )
    }
}

export default Form.create()(Manage)