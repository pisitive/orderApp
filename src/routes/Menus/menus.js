import React, { Component } from 'react'
import { Table, Button, Icon, Row, Col } from 'antd'

// import style from './menus.less'
import style from './menus.scss'

export default class Menus extends Component {
    state = {
        menuList: [],
        shopList: [],
    }

    getData() {  //请求数据函数
        fetch('https://www.easy-mock.com/mock/5d3557e2729b2a3c2fdc2648/orderApp/menuData')   
            .then(response => response.json())  ///解析json数据
            .then(data => {
                let {menuList} = this.state
                const arr = data.menuList
                for (const key in arr) {
                    let item = arr[key]
                    menuList.push({
                        key: item.name,
                        size: item.name,
                    })
                    item.options.forEach((ele, index) => {
                        menuList.push({
                            ...ele,
                            name: item.name,
                            key: key + '-' + index,
                        })
                    })
                }
                this.setState({menuList})  ////赋值到本地数据
 
            })
            .catch(e => console.log('错误:', e))   ///请求出错
    }

    componentDidMount() {//网络请求都是放在此生命周期函数中
        this.getData()
    }

    //点击提交按钮 
    handleSubmit = () => {
        const {shopList} = this.state
        var storage = window.localStorage
        storage['shopCart'] = JSON.stringify(shopList)
        this.setState({shopList: []})
    }

    renderMenusTable() {
        const {menuList} = this.state

        const handleAddMenus = record => {
            let {shopList} = this.state
            //判断是否重复
            const index = shopList.findIndex(item => item.key === record.key)
            index >= 0 ? shopList.splice(index, 1, {
                ...shopList[index],
                count: shopList[index].count + 1
            }) : (shopList = [
                ...shopList,
                {
                    ...record,
                    count: 1,
                }
            ])
            this.setState({shopList})
        }

        const columns = [
            {
                key: 'size',
                title: '尺寸',
                dataIndex: 'size',
                render: (text, record) => {
                    if (record.price) {
                        return <span>{text}</span>
                    }
                    return {
                        children: <strong>{text}</strong>,
                        props: {
                            colSpan: 2
                        }
                    }
                }
            },
            {
                key: 'price',
                title: '价格',
                dataIndex: 'price',
                render: (text, record) => {
                    return <span>{text}</span>
                }
            },
            {
                key: 'action',
                title: '加入',
                render: (text, record) => {
                    const obj = {
                        children: (
                            <Button className={style['add-btn']} 
                                onClick={() => handleAddMenus(record)}>
                                <Icon type="plus" />
                            </Button>
                        ),
                        props: []
                    }
                    if (!record.price) {
                        obj.props.colSpan = 0
                    }
                    return obj
                }
            },
        ]
        return (
            <Table 
                dataSource={menuList} 
                columns={columns} 
                className="menus-table" 
                pagination={false} />
        )
    }

    renderCartTable() {
        const {shopList} = this.state
        const columns = [
            {
                key: 'count',
                title: '数量',
                dataIndex: 'count',
                render: (text, record) => {
                    return (
                        <span>
                            <Button className={style['cart-btn']} onClick={() => handleDecrease(record)}>-</Button>
                            <span>{record.count}</span>
                            <Button className={style['cart-btn']} onClick={() => handleIncrease(record)}>+</Button>
                        </span>
                    )
                }
            },
            {
                key: 'name',
                title: '菜单',
                dataIndex: 'name',
                render: (text, record) => {
                    return (
                        <span>{text}</span>
                    )
                }
            },
            {
                key: 'price',
                title: '价格',
                dataIndex: 'price',
                render: (text, record) => {
                    return (
                        <span>{text}</span>
                    )
                }
            }
        ]

        //减少商品
        const handleDecrease = record => {
            let {shopList} = this.state
            //当前点击商品在购物车中的下标
            const index = shopList.findIndex(item => item.key === record.key)
            //点击的对象
            const cur = shopList[index]
            //判断<1则删除，否则-1
            if (cur.count <= 1) {
                shopList.splice(index, 1)
            } else {
                shopList.splice(index, 1, {
                    ...cur,
                    count: cur.count - 1
                })
            }
            //更新状态
            this.setState({shopList})
        }

        //增加商品
        const handleIncrease = record => {
            let {shopList} = this.state
            //当前点击商品在购物车中的下标
            const index = shopList.findIndex(item => item.key === record.key)
            //点击的对象
            const cur = shopList[index]
            shopList.splice(index, 1, {
                ...cur,
                count: cur.count + 1
            })
            //更新状态
            this.setState({shopList})
        }

        return (
            <Table 
                dataSource={shopList} 
                columns={columns} 
                className="menus-table cart" 
                pagination={false}
                locale={{
                    emptyText: '购物车没有任何商品'
                }}
             />
        )
    }

    render() {
        let {shopList} = this.state
        const totalPrice = shopList.reduce((total, item) => (total += item.price * item.count), 0)
        return (
            <Row>
                <Col sm={24} md={16}>{this.renderMenusTable()}</Col>
                <Col sm={24} md={8}>
                    {this.renderCartTable()}
                    <p className={style['total-price']}>总价：{totalPrice}</p>
                    <Button type="primary" className={style['submit-btn']} onClick={this.handleSubmit}>提交</Button>
                </Col>
            </Row>
        )
    }
}
