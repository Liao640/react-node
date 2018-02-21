import React, {Component} from 'react'
import styles from '../static/css/main.css'
require('../static/js/jquery.min.js')
// import imgUrl from '../static/img/4.jpg'

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "title": 111,
      arr: [{
          name: "龙楼",
          url: '1.jpg'
        },
        {
          name: "小伍",
          url: '2.jpg'
        },
        {
          name: "李田",
          url: '3.jpg'
        }],
      name: '',
      url: '',
      activeUrl: ''
    },
    this.nameInput = this.nameInput.bind(this)
    this.urlInput = this.urlInput.bind(this)
    // this.changeImg = this.changeImg.bind(this)
    this.submit = this.submit.bind(this)
  }
  render() {
    var list = this.state.arr.map((item,index) => {
      return <li key={index} onClick={this.changeImg.bind(this, item)}>
        {item.name}
        <span className="red_cercle" onClick={this.cancel.bind(this, item)}></span>
      </li>
    })
    return (
      <div className="out_container">
        <div className="title">相册</div>
        <div className="show_list">
          <ul className="name_show">{list}</ul>
          <div className="img_show">
            <img src={this.state.activeUrl} alt=""/>
          </div>
        </div>
        <div class="input_msg">
          <p className="name">
            <span>姓名：</span>
            <input type="text" placeholder="输入姓名" onChange={this.nameInput} value={this.state.name}/>
          </p>
          <p className="url">
            <span>链接：</span>
            <input type="text" placeholder="输入链接" onChange={this.urlInput} value={this.state.url}/>
          </p>
          <button onClick={this.submit}>提交</button>
        </div>
      </div>
    )
  }
  getData() {
    var _this = this
    var url = 'http://localhost:3000/getData'
    $.ajax({
      type: 'GET',
      url: url,
      data: {},
      dataType: 'json',
      success: function(json) {
        var data = json.data
        console.log('data', data)
        _this.setState({
          arr: data
        })
        // _this.state.arr = data
        console.log('data', data)
      }
    })
  }
  changeImg(item) {
    this.setState({ activeUrl: item.url})
    console.log('activeImg', this.state.activeUrl)
  }
  cancel(item) {
    var id = item.id
    var _this = this
    var url = 'http://localhost:3000/cancel?id=' + id
    $.ajax({
      type: 'GET',
      url: url,
      data: {},
      dataType: 'json',
      success: function(json) {
        console.log(_this.state.arr)
        _this.getData()
      }
    })
  }
  nameInput(event) {
    this.setState({ name: event.target.value })
  }
  urlInput(event) {
    this.setState({ url: event.target.value })
  }
  submit(){
    var obj = {
      name: this.state.name,
      url: this.state.url
    }
    console.log(obj, obj)
    var _this = this
    var url = 'http://localhost:3000/add'
    $.ajax({
      type: 'POST',
      url: url,
      data: obj,
      dataType: 'json',
      success: function(json) {
        console.log(_this.state.arr)
        _this.getData()
        _this.setState({
          name: '',
          url: ''
        })
      }
    })
    // var rows = this.state.arr
    // rows.push(obj)
  }
  componentDidMount() {
    console.log('componentDidMount')
    this.getData()
  }
}
