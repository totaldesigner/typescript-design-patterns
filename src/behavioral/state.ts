module State {
  interface IMusicPlayerState {
    start();
    stop();
    pauze();
  }

  class StoppedState implements IMusicPlayerState {
    constructor(private player: MusicPlayer) {
    }

    public start() {
      console.log("Start playing.");
      this.player._state = new StartedState(this.player);
    }
    public stop() {
      console.log("Already stopped!");
    }

    public pauze() {
      console.log("I'm not started!");
    }
  }

  class StartedState implements IMusicPlayerState {
    constructor(private player: MusicPlayer) {
    }

    public start() {
      console.log("Already started!");
    }
    public stop() {
      console.log("Stopped playing.");
      this.player._state = new StoppedState(this.player);
    }
    public pauze() {
      console.log("Pauzed playing.");
      this.player._state = new PauzedState(this.player);
    }
  }

  class PauzedState implements IMusicPlayerState {
    constructor(private player: MusicPlayer) {
    }

    public start() {
      console.log("Continue playing.");
      this.player._state = new StartedState(this.player);
    }
    public stop() {
      console.log("Stop playing!");
      this.player._state = new StoppedState(this.player);
    }
    public pauze() {
      console.log("Already pauzed.");
    }
  }

  export class MusicPlayer {
    public _state: IMusicPlayerState;
    constructor() {
      this._state = new StoppedState(this);
    }

    public start() {
      this._state.start();
    }
    public stop() {
      this._state.stop();
    }
    public pauze() {
      this._state.pauze();
    }
  }
}

window.addEventListener("load", function () {
  var musicPlayer = new State.MusicPlayer();
  musicPlayer.stop();
  musicPlayer.start();
  musicPlayer.start();
  musicPlayer.pauze();
  musicPlayer.start();
  musicPlayer.stop();
});