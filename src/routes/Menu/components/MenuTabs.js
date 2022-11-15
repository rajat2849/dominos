import React from "react";

import { saveLocalStorage } from "../../../components/Helpers";
import menu_promo from "../../../../public/newimages/menu_promo.png";
import menu_deals from "../../../../public/newimages/menu_deals.png";
import menu_pizza from "../../../../public/newimages/menu_pizza.png";
import menu_sides from "../../../../public/newimages/menu_sides.png";
import menu_beverages from "../../../../public/newimages/menu_beverages.png";

class MenuTabs extends React.Component {
    constructor(props) {
        super(props);
        this.handleTabsClick = this.handleTabsClick.bind(this);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    handleTabsClick(id) {
        this.props.handleTabsClick(id);
        saveLocalStorage('previousLocation', id);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }
    render() {
        const {activeTab} = this.props;
        const id = this.props.sideName;
        let width = ((this.state.width - 300)/5) - 2;
        let height = this.state.height;
        
        return(
            <div className="tab_menu">
                <div onClick={() => this.handleTabsClick('Promo')} className={(activeTab === 'Promo') ? "tab_menu_li menu_active" : "tab_menu_li"} style={{marginLeft:"0px"}}>
                    <span className="tab_menu_img">
                        <img 
                          src={menu_promo}
                          className="mx-auto img-fluid"
                        />
                    </span><br/>
                    <span className="tab_menu_text">Promo</span>
                </div>
                <div onClick={() => this.handleTabsClick('PacketHemat')} className={(activeTab === 'PacketHemat') ? "tab_menu_li menu_active" : "tab_menu_li"} style={{marginLeft:width}}>
                    <span className="tab_menu_img">
                        <img 
                          src={menu_deals}
                          className="mx-auto img-fluid"
                        />
                    </span><br/>
                    <span className="tab_menu_text">Value Deals</span>
                </div>
                <div onClick={() => this.handleTabsClick('Pizza')} className={(activeTab === 'Pizza') ? "tab_menu_li menu_active" : "tab_menu_li"} style={{marginLeft:width}}>
                    <span className="tab_menu_img">
                        <img 
                          src={menu_pizza}
                          className="mx-auto img-fluid"
                        />
                    </span><br/>
                    <span className="tab_menu_text">Pizza</span>
                </div>
                <div onClick={() => this.handleTabsClick('Sides')} className={(activeTab === 'Sides' || activeTab === 'Pasta' || activeTab === 'Desserts') ? "tab_menu_li menu_active" : "tab_menu_li"} style={{marginLeft:width}}>
                    <span className="tab_menu_img">
                        <img 
                          src={menu_sides}
                          className="mx-auto img-fluid"
                        />
                    </span><br/>
                    <span className="tab_menu_text">Sides</span>
                </div>
                <div onClick={() => this.handleTabsClick('Beverages')} className={(activeTab === 'Beverages') ? "tab_menu_li menu_active" : "tab_menu_li"} style={{marginLeft:width}}>
                    <span className="tab_menu_img">
                        <img 
                          src={menu_beverages}
                          className="mx-auto img-fluid"
                        />
                    </span><br/>
                    <span className="tab_menu_text">Bevrages</span>
                </div>
            </div>
        );
    }
}

export default MenuTabs;