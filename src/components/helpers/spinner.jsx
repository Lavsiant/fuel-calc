import React from 'react';
import Loader from 'react-loader-spinner'


export default class Spinner extends React.Component {

    constructor(props) {
        super(props);
        this.selectRef = React.createRef();
        this.state = {
            isShowOptions: false,
            selectedItem: '',
        }


    }



    render() {
        return (
            <div>
                {this.props.isLoading ?
                    <div style={{ position: 'absolute', width: '100%', top: 0, height: '100%', backgroundColor: 'rgba(0,0,0,0.35)', zIndex: 150 }}>

                    </div>
                    : null}

                {this.props.isLoading ?
                    <div style={{ position: 'absolute', top: '40%', left: '36%', zIndex: 150 }}>
                        <Loader type="Oval"
                            color="#00BFFF"
                            height={100}
                            width={100} />
                    </div>
                    : null}
            </div>
        )
    }
}
