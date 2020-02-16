import { Subject, Observable, Unsubscribable, PartialObserver } from "rxjs";
import { debounceTime, share } from "rxjs/operators";
import produce, { Draft } from "immer";

const FRAME_TIME = 16;

export class Store<T> {
  protected storeState: T = {} as T;
  protected readonly emmiter$: Subject<T>;
  protected listener$: Observable<T>;

  get state(): T {
    return this.storeState;
  }

  constructor() {
    this.emmiter$ = new Subject<T>();
    this.listener$ = this.emmiter$.pipe(share());
  }

  protected triggerChange(nextState: T) {
    if (this.storeState !== nextState) {
      this.storeState = nextState;
      this.emmiter$.next(this.storeState);
    }
  }

  produce(callback: (draft: Draft<T>) => void) {
    this.triggerChange(produce<T>(this.storeState, callback));
  }

  subscribe<S = any>(observer?: PartialObserver<S>): Unsubscribable {
    return this.listener$.subscribe(observer);
  }
}

export class DebouncedStore<T> extends Store<T> {
  constructor() {
    super();
    this.listener$ = this.emmiter$.pipe(
      share(),
      debounceTime(FRAME_TIME)
    );
  }
}
