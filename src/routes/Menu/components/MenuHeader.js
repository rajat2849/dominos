import React from "react";

import AddressHeader from './AddressHeader';
import MenuTabs from './MenuTabs';

class MenuHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <AddressHeader
                    {...this.props}
                    activeTab={this.props.activeTab}
                    isActive={this.props.isActive}
                    location={this.props.location}
                />
                <MenuTabs
                    sideName={this.props.sideName}
                    activeTab={this.props.activeTab}
                    handleTabsClick={this.props.handleTabsClick}
                />
            </div>
        );
    }
}

export default MenuHeader;