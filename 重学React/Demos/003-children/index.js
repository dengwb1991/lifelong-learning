import { OwlReact, Component } from './OwlReact.js'

class MyComponent extends Component {
  render () {
    return <div>
      <span id="1">Hello </span>
      <span>World! </span>
      {this.children}
    </div>
  }
}

let A = <MyComponent name='a'>
  <div>{true}</div>
</MyComponent>

OwlReact.render(A, document.body)
