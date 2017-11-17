import React, { Component, PropTypes } from 'react';
import style from '../css/form.less';

class FormItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input:{
        content:{
          onChange:this._inputChange.bind(this),
          value:''
        }
      },
      textarea:{
        content:{
          onChange:this._textareaChange.bind(this),
          value:''
        }
      },
      button:{
        content:{
          value:''
        }
      }
    }
  }

  componentDidMount() {
    let _t = this;
    _t._initData(_t.props.data);
  }

  _inputChange(e){
    let _t = this;
    _t.state.input.content.value = e.target.value;
    if(_t.state.input.onchange){
      _t.state.input.onchange(e.target.value);
    }
    _t.setState(_t.state);
  } 

  _textareaChange(e){
    let _t = this;
    _t.state.textarea.content.value = e.target.value;
    if(_t.state.textarea.onchange){
      _t.state.textarea.onchange(e.target.value);
    }
    _t.setState(_t.state);
  } 

  _initData(obj){
    let _t = this;
    switch(_t.props.type){
      case "input":
        _t.state.input = {
          label:obj.label,
          type:obj.type,
          name:obj.name,
          onchange:obj.onChange,
          content:{
            className:obj.className,
            onChange:_t._inputChange.bind(_t),
            value:obj.value,
            placeholder:obj.placeholder
          } 
        };
        ;break;
      case "textarea":
        _t.state.textarea = {
          label:obj.label,
          name:obj.name,
          onchange:obj.onChange,
          content:{
            className:obj.className,
            onChange:_t._textareaChange.bind(_t),
            value:obj.value,
            placeholder:obj.placeholder
          }
        } 
      ;break;
      case "button":
        _t.state.button = {
          name:obj.name,
          content:{
            className:obj.className,
            onClick:obj.onClick,
          }
        } 
      ;break;
    }
    _t.setState(_t.state);
  }

  _initHtml(obj){
    let t =this;
    let dom;
    switch(obj){
      case "input":
        dom = <div className={style.form_input}><div><label htmlFor={t.state.input.name}>{t.state.input.label}</label></div><div className={style.input_value}><input name={t.state.input.name} id={t.state.input.name} type="text" {...t.state.input.content}/></div></div>;
        ;break;
      case "textarea":
        dom = <div className={style.form_textarea}><div><label htmlFor={t.state.textarea.name}>{t.state.textarea.label}</label></div><div className={style.textarea_value}><textarea name={t.state.textarea.name} id={t.state.textarea.name} {...t.state.textarea.content}></textarea></div></div>;
      ;break;
      case "button":
         dom = <button name={t.state.button.name} type="button" {...t.state.button.content}>{t.props.children}</button>
      ;break;
    }
    return dom;
  }

  render() {
    let t = this;
    let dom = t._initHtml(t.props.type);
    return (
      <div>
        {dom}
      </div> 
          
    )
  }
}

export default FormItem;