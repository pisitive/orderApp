import React, { Component } from 'react'
import {Form, Input, Button} from 'antd'

import Logo from '../../assets/icon.png'
import style from './register.less'
import {email_reg, pwd_reg} from '../../utils/Regexp'

class Register extends Component {
    //自定义校验方法
    validatorForm = (rule, value, callback) => {
        if (value && rule.pattern && !value.match(rule.pattern)) {
          callback(rule.message)
        } else {
          callback()
        }
    }

    // 自定义校验两次密码是否一致
    validatorPwd = (rule, value, callback) => {
        const {form} = this.props
        if (value !== form.getFieldValue('pwd')) {
            callback(rule.message)
        } else {
            callback()
        }
    }

    handleSubmit = e => {
        const {form} = this.props
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                const {email, pwd} = values
                var storage = window.localStorage
                storage['email'] = email
                storage['pwd'] = pwd
                this.props.history.push('/login')
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        }

        return (
            <div>
                <img src={Logo} alt="my logo" className={style.logo} />
                <Form {...formItemLayout} className={style.form}>
                    <Form.Item label="邮箱">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    message: '邮箱不能为空，请输入邮箱!',
                                },
                                {
                                    pattern: email_reg,
                                    validator: this.validatorForm,
                                    message: '请输入正确的邮箱格式， 如：1911797649@qq.com!',
                                }
                            ],
                        })(<Input className={style.Input} />)}
                    </Form.Item>
                    <Form.Item label="密码">
                        {getFieldDecorator('pwd', {
                            rules: [
                                    {
                                        required: true,
                                        message: '密码不能为空，请输入密码！'
                                    },
                                    {
                                        pattern: pwd_reg,
                                        validator: this.validatorForm,
                                        message:
                                        '请输入正确的密码格式：6-16位字母、数字或特殊字符 _-.'
                                    }
                            ],
                        })(<Input maxLength={16} type="password"
                            placeholder="请输入6-16位字母、数字或特殊字符的密码" 
                            className={style.Input}  />)}
                    </Form.Item>
                    <Form.Item label="确认密码">
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: '请确认密码!',
                                },
                                {
                                    pattern: pwd_reg,
                                    validator: this.validatorForm,
                                    message:
                                    '请输入正确的密码格式：6-16位字母、数字或特殊字符 _-.'
                                },
                                {
                                    validator: this.validatorPwd,
                                    message: '两次输入的密码不一致！'
                                }
                            ],
                        })(<Input maxLength={16} type="password"
                            placeholder="请输入确认密码" className={style.Input} />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" 
                            className={style.btn} onClick={this.handleSubmit}>
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(Register)
