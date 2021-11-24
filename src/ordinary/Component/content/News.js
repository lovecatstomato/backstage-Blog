import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Newsmana from './Newsmana';
import NewsUpdate from './NewsUpdate';

function News(){
    return (
        <Switch>
            <Route path="/about/newsmana/all" component={Newsmana} />{/* 新闻管理 */}
            {/* 修改新闻 */}
            <Route path="/about/newsmana/update/:id" component={NewsUpdate} />
        </Switch>
    );
}

export default News;