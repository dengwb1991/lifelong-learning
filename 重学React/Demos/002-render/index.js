import { OwlReact, Component } from './OwlReact.js'

class MyComponent extends Component {
  render () {
    return <div>
      <span id="1">Hello </span>
      <span>World! </span>
    </div>
  }
}

let A = <MyComponent name='a'/>

OwlReact.render(A, document.body)
