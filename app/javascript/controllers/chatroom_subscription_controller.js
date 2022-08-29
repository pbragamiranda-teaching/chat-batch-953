import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  // where messages will be added
  static targets = ["messages"]
  // identify which chatroom we are subscribed too
  static values = { chatroomId: Number }

  connect() {
    // console.log(`Subscribe to the chatroom with the id ${this.chatroomIdValue}.`)
    // create a consumer of the channel #subscribe
    this.channel = createConsumer().subscriptions.create(
      { channel: "ChatroomChannel", id: this.chatroomIdValue},
      { received: data => this.#insertMessageAndScroll(data) })
  }

  disconnect() {
    // console.log("Unsubscribed from the chatroom")
    this.channel.unsubscribe()
  }

  resetForm(event) {
    // event.target = where the event happened
    // console.log(event.target)
    event.target.reset()
  }

  #insertMessageAndScroll(data) {
    // insert the message into the dom
    this.messagesTarget.insertAdjacentHTML("beforeend", data)
    // scroll to the latest message
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
  }
}
