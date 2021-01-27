import React from 'react';
import '../../public/styles/dropdown.css';
import Arrow from '../../public/img/arrow.svg';
import PropTypes from 'prop-types';


export default class Dropdown extends React.Component {

    constructor(props) {
        super(props);
        this.selectRef = React.createRef();
        this.state = {
            isShowOptions: false,
            selectedItem: '',
        }


    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.selectRef && !this.selectRef.current.contains(event.target)) {
            this.setState({
                isShowOptions: this.state.false,
            })
        }
    }

    toggleShow = () => {
        if (!this.props.disabled) {
            this.setState({
                isShowOptions: !this.state.isShowOptions,
            })
        }
    }

    selectItem = (item) => {
        this.setState({
            selectedItem: item,
            isShowOptions: false,
        })
        this.props.onChange(item);
    }


    render() {
        return (
            <div ref={this.selectRef} className={`custom-select`}>
                <div style={this.props.style} className={`custom-select-header ${this.props.className ? this.props.className : ''}  ${this.props.disabled ? 'disabled' : ''}`} onClick={this.toggleShow}>

                    <span className="selected-header-text" style={this.props.textStyle} > {this.props.displayFunc ? this.props.displayFunc(this.props.value) : this.props.value}</span>
                    <img alt="a" draggable="false" className={`arrow-svg ${this.state.isShowOptions ? 'arrow-svg-reversed' : ''}`} src={Arrow} />

                </div>
                <div className={`select-items ${this.state.isShowOptions ? '' : 'hide'} ${this.props.dropTop ? 'to-top' : 'to-bottom'}`}>
                    {this.props.items.map((item, i) =>
                        <div key={i} onClick={() => this.selectItem(item)}>
                            {this.props.displayFunc ? this.props.displayFunc(item) : item}
                        </div>)}
                </div>
            </div>
        )
    }
}

Dropdown.propTypes = {
    items: PropTypes.array,
    onChange: PropTypes.func,
    style: PropTypes.any,
    className: PropTypes.string,
    dropTop: PropTypes.bool,
    value: PropTypes.any,
    displayFunc: PropTypes.func,
    textStyle: PropTypes.string,
    disabled: PropTypes.bool
}