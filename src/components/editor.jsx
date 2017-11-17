import React, { Component, PropTypes } from 'react';

class Editor extends Component {

  componentDidMount() {
    var um = UM.getEditor('myEditor');
  } 

  render() {
    let t = this;
    return (
      <div>
        <script type="text/plain" id="myEditor" style={{width:"1000px",height:"500px"}}>

        </script>
      </div>
    )
  }
}

export default Editor;