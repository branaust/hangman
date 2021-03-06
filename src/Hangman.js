import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from './words';
import img0 from "./img/0.jpg";
import img1 from "./img/1.jpg";
import img2 from "./img/2.jpg";
import img3 from "./img/3.jpg";
import img4 from "./img/4.jpg";
import img5 from "./img/5.jpg";
import img6 from "./img/6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);

  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */


  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        key={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  resetGame = () => {
    this.setState(st => ({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    }))
  }


  /** render: render game */
  render() {
    let playing = this.state.nWrong < this.props.maxWrong
    let lost = this.state.nWrong === this.props.maxWrong
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={`You have gotten ${this.state.nWrong} wrong`} />
        <p className='Hangman-wrong'>Number Wrong: {this.state.nWrong}</p>
        <p className='Hangman-word'>
          {playing ? this.guessedWord() : this.state.answer}
        </p>
        <p className='Hangman-btns'>
          {playing && this.generateButtons()}
        </p>
        <h2>
          {lost && 'LAHOOOOO SAHERRRRRR'}
        </h2>
        {lost &&
          <div className='Restart'>
            <button onClick={this.resetGame} >
              Restart
          </button>
          </div>
        }
      </div>
    );
  }
}

export default Hangman;
