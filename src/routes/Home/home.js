import React, { Component } from 'react'

import style from './home.less'

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className={style.imgContainer}>
                    <div className={style.tips}>
                        <span className={style.tips1}>
                            欢迎大家来到我的点餐系统
                        </span>
                        <span className={style.tips2}>
                            这里有大家喜欢的pizza和小吃
                        </span>
                        <span className={style.tips3}>
                            this is the home component
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
