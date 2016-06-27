import React from 'react';

const ChannelTypeIndicator = React.createClass({
  render() {
    let lock = <svg xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 82.5 82.5" version="1.1"
                   width={this.props.size} 
                   height={this.props.size}>
     <path d="m16.092 78.992c-2.09-0.419-5.507-4.107-5.975-6.45-0.2229-1.113-0.4051-8.452-0.4051-16.309 0-11.639 0.18528-14.747 1.0006-16.785 1.0742-2.6846 3.5897-4.6049 6.9682-5.3194l2.0312-0.42958 0.0074-6.6691c0.01146-10.303 1.662-14.953 7.0787-19.946 7.7945-7.1848 23.033-7.1848 30.828 0 5.4168 4.993 7.0673 9.6438 7.0787 19.946l0.0074 6.6691 2.0312 0.42958c3.5062 0.7415 5.9337 2.6463 7.0296 5.516 0.86652 2.269 0.99058 5.0194 0.82343 18.256-0.29094 23.041 2.4526 21.183-31.447 21.294-14.094 0.04625-26.27-0.04519-27.057-0.20313zm39.241-50.974c-0.0041-6.8233-0.69504-9.7175-2.9634-12.413-4.8097-5.716-15.506-5.716-20.316 0-2.2684 2.6958-2.9593 5.59-2.9634 12.413l-0.0035 5.7812h13.125 13.125l-0.0035-5.7812z"/>
    </svg>;
    
    if (this.props.channel.private) {
      return <div className={"lock " + this.props.extraClass}>
               {lock}
             </div>
    }
    else if (this.props.channel.type == "group") {
      return <span className={"hash-indicator " + this.props.extraClass}>#</span>;
    } 
    else if (this.props.channel.usernames.length == 2) {
      return <span className={"at-sign-indicator " + this.props.extraClass}>@</span>
    }
    else {
      return null;
    }
  }
});

export default ChannelTypeIndicator;
