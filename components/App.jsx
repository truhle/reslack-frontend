import React from 'react';
import DocumentTitle from 'react-document-title';

const App = React.createClass({
  render() {
    return <DocumentTitle title="Reslack">
      <div>
        {this.props.children}
      </div>
    </DocumentTitle>
  }
});

export default App;
