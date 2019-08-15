import React, { Component } from 'react'
import { Form, Input, Button} from 'antd';

import Logo from '../../assets/icon.png'
import style from './login.less'

class Login extends Component {
    handleSubmit = e => {
        const {form} = this.props
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                const {email, pwd} = values
                var storage = window.localStorage
                const emailTest = storage['email']
                const pwdTest = storage['pwd']
                if (email === emailTest && pwd === pwdTest) {
                    this.props.history.push('/home')
                } else {
                    alert("您输入的邮箱或密码有误，请重新输入！")
                }
            }
        })
    }

    render() {
        const { getFieldDecorator} = this.props.form
        return (
            <div>
                <img src={Logo} alt="my logo" className={style.logo} />
                <Form className="account-form">
                    <Form.Item label="邮箱" className={style.email}>
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    message: '邮箱不能为空, 请输入邮箱'
                                },
                                {
                                    message: '请输入正确的邮箱格式,如: 1911797649@qq.com'
                                }
                            ]
                        })(<Input type="email"
                        placeholder="请输入邮箱,如: 1911797649@qq.com" />)}
                    </Form.Item>
                    <Form.Item label="密码" className={style.psw}>
                        {getFieldDecorator('pwd', {
                            rules: [
                                {
                                required: true,
                                message: '密码不能为空，请输入密码！'
                                },
                                {
                                    message: '请输入正确的密码格式：6-16位字母、数字或特殊字符 _-.'
                                }
                            ]
                        })(
                        <Input
                            maxLength={16}
                            type="password"
                            placeholder="请输入6-16位字母、数字或特殊字符的密码"
                        />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button className={style.btn} type="primary"  onClick={this.handleSubmit}>
                        登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(Login)
