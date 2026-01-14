import type { Observer } from "./observer";

export abstract class Observable<T> {

  private subscribers: Set<Observer<T>> = new Set(); 

  subscribe(observer: Observer<T>): void {
    this.subscribers.add(observer);
  }

  unsubscribe(observer: Observer<T>) : boolean {
    return this.subscribers.delete(observer);
  }

  clear() {
    this.subscribers.clear()
  }

  async notify(state: T){
      this.subscribers.forEach(subscriptor => subscriptor.update(state));
  }

}