import React from 'react';

const ShowMentions = React.createClass({
  getInitialState() {
    return {open: false};
  },
  
  toggleStarredItems() {
    this.setState({open: !this.state.open});
  },
  
  render() {
    let open = this.state.open ? "open" : "";
    let at_symbol = <svg xmlns="http://www.w3.org/2000/svg" 
                         viewBox="0 0 75 75" version="1.1"
                         width="20" 
                         height="20">
     <path d="m30.172 70.346c-16.872-3.842-28.484-20.732-25.912-37.69 2.7618-18.205 20.089-31.125 38.084-28.396 6.8163 1.0338 13.963 4.6463 18.84 9.5228 11.006 11.006 13.446 30.639 4.5521 36.63-4.3328 2.9184-10.752 2.4307-14.801-1.1245l-2.174-1.9088-1.9219 1.6172c-2.633 2.217-8.053 3.724-11.393 3.169-7.685-1.277-12.544-6.956-12.548-14.665-0.003-6.0173 2.7214-10.521 8.0398-13.292 3.5623-1.8556 9.7133-1.8355 13.281 0.04336 1.4609 0.76932 2.6562 1.1319 2.6562 0.80569 0-0.88353 1.8408-2.5573 2.8125-2.5573 0.46652 0 1.2902 0.44196 1.8304 0.98214 0.799 0.799 0.982 2.61 0.982 9.719 0 9.5778 0.53892 11.615 3.42 12.928 5.496 2.503 9.705-1.309 9.705-8.79 0-12.286-9-23.891-20.94-27.001-24.193-6.3012-44.212 20.261-31.269 41.488 7.3823 12.108 21.794 16.88 35.01 11.593 4.7448-1.8982 6.1207-1.6547 6.4561 1.1429 0.16277 1.3575-0.23458 1.8424-2.4259 2.9603-6.3499 3.2395-15.414 4.3881-22.284 2.8237zm12.796-25.234c2.6299-1.8726 4.1205-5.2843 3.7489-8.5806-0.59224-5.2543-5.0099-8.8315-10.186-8.2481-12.043 1.3574-10.407 19.38 1.6703 18.4 1.623-0.13161 3.7118-0.8202 4.7667-1.5714z"/>
    </svg>;
      
    return <div className={"show-mentions header-icon " + open}
                onClick={this.toggleStarredItems}>
      {at_symbol}
    </div>
  }
});

export default ShowMentions;
