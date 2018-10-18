import * as React from 'react'
import * as ReactDOM from 'react-dom'
import io from 'socket.io-client'
export const socket = io('http://localhost:8080')

export class Chat extends React.Component {
  public state: any = {
    message: '',
    messageList: [],
    hash: Math.floor(Math.random()*100)
  }

  constructor(props: any) {
    super(props)
  }

  public recieveMessage = (message: string) => {
    const { messageList } = this.state
    messageList.push(message)
    this.setState({ messageList })
  }

  public handleInput = (e: any) => {
    const { name, value } = e.target
    this.setState({[name]: value})
  }

  public postMessage = (e: any) => {
    const { message, hash } = this.state
    socket.emit('message', `[${hash}] ${message}`)
    this.setState({message: ''})
  }

  public componentDidMount() {
    socket.on('message', this.recieveMessage)
  }
  public render() {
    const { hash, message, messageList } = this.state
    return (
      <>
        <p>ID: {hash} で参加してます。</p>
        <input type="text" name="message" value={message} onChange={this.handleInput} />
        <button onClick={this.postMessage}>送信</button>
        {messageList.map((message, index) => <div key={index}>{message}</div>)}
      </>
    )
  }
}

ReactDOM.render(
  <Chat />,
  document.getElementById('root') as HTMLElement
)
