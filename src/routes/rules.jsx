import {
  Box,
  Paper
} from "@material-ui/core";
import BackButton from "../components/back-button";

// content from https://prowritingaid.com/what-is-wordle
function Rules() {

  return (
    <Box display="flex" justifyContent="left" p={2}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          m: 2,
          backgroundColor: "background.default",
          color: "text.primary",
          textAlign: "left",
        }}
      >
        <BackButton />
        
        <h3 style={{ textAlign: "center" }}>How to Play Wordle Online</h3>

        <p>The rules of Wordle are elegantly simple.</p>

        <p>
          Your objective is to guess a secret five-letter word in as few guesses
          as possible.
        </p>

        <p>To submit a guess, type any five-letter word and press enter.</p>

        <p>
          All of your guesses must be real words, according to a dictionary of
          five-letter words that Wordle allows as guesses. You can’t make up a
          non-existent word, like AEIOU, just to guess those letters.
        </p>

        <p>
          As soon as you’ve submitted your guess, the game will color-code each
          letter in your guess to tell you how close it was to the letters in
          the hidden word.
        </p>

        <ul>
          <li>
            A gray or black square means that this letter does not appear in the
            secret word at all
          </li>
          <li>
            A yellow square means that this letter appears in the secret word,
            but it’s in the wrong spot within the word
          </li>
          <li>
            A green square means that this letter appears in the secret word,
            and it’s in exactly the right place
          </li>
        </ul>

        <p>
          Getting a green square or yellow square will get you closer to
          guessing the real secret word, since it means you’ve guessed a correct
          letter.
        </p>

        <p>
          For example, let’s say you guess “WRITE” and get two green squares on
          the W and the R, and gray squares for the I, T, and E. Your next guess
          might be WRONG, WRACK, or WRUNG, since these words start with WR and
          don’t contain the letters I, T, or E.
        </p>

        <p>
          Alternatively, let’s say you guess “WRITE” and get two green squares
          on the T and the E, and gray squares for the W, R, and I. In that
          case, your next guess might be BASTE, ELATE, or LATTE, since these
          words end with TE and don’t contain the letters W, R, or I.
        </p>

        <p>
          Remember that the same letter can appear multiple times in the secret
          word, and there’s no special color coding for letters that appear
          repeatedly. For example, if the secret word is BELLE and you guess a
          word with one L and one E, Wordle won’t tell you that both those
          letters actually appear twice.
        </p>

        <p>
          You get a maximum of six tries to guess the secret word. The game will
          give you a different winning statement depending on how many guesses
          it took:{" "}
        </p>

        <ul>
          <li>1 attempt: “Genius”</li>
          <li>2 attempts: “Magnificent”</li>
          <li>3 attempts: “Impressive”</li>
          <li>4 attempts: “Splendid”</li>
          <li>5 attempts: “Great”</li>
          <li>6 attempts: “Phew”</li>
        </ul>

        <p>
          Once you’ve found the secret word, Wordle has a “Share” option that
          lets you copy your results in the form of colored emoji cubes, so you
          can share them with anyone you want. Many players send their results
          to their Wordle-loving friends or post them on social media.
        </p>
      </Paper>
    </Box>
  );
}

export default Rules;
