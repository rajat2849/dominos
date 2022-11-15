import React from 'react';
import _ from 'lodash';

const categories = (props) => {
    const scroll = (scrollOffset) => {
      document.querySelector('.pizza_category').scrollLeft += scrollOffset;
    };
    if(props.activeCategory === 'Pasta' || props.activeCategory === 'Desserts'){
        var index_val = '';
        var scroll_val = '';
        var current_val = '';
        setTimeout(function() {
            {_.map(props.list, (category, index) => {
                if((category.category_name === props.activeCategory)){
                    index_val = index;
                }
            })}
            scroll_val = document.querySelector('.pizza_category').scrollLeft;
            current_val = 100*(index_val);
            if(current_val > scroll_val){
                scroll(current_val);
            }else{
                scroll(-current_val);
            }
        },1500)
    }
    return(
        <div className='pizza_category'>
            {_.map(props.list, (category, index) => {
                return(
                    <div key={index} className={(category.category_name === props.activeCategory) ? 'category_li active_pizza_cat' : 'category_li'}>
                        <span onClick={() => props.handleCategory(category.category_name)}>{category.category_name}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default categories;