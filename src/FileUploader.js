import React, { Component } from 'react';


//External Sources: https://medium.com/ecmastack/uploading-files-with-react-js-and-node-js-e7e6b707f4ef
export class FileUploader extends Component {

    handleFileUpload() {
        console.log('File upload button click, todo: handling')
    }

    render() {
        return (
            <input type="file" onChange={this.handleFileUpload} />
        )
    }
}
