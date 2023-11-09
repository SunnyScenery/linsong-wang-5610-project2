import InputRecord from "../components/record";
import InputForm from "../components/input";
import { Box } from "@material-ui/core";
import Answer from "../components/answer";
import BackButton from "../components/back-button";
import { useContext, useState, useEffect } from "react";
import { RecordContext } from "../store/records";
import { InputContext } from "../store/input";
import { useLocation } from "react-router-dom";
import axios from "axios";

const generateAnswer = (difficulty) => {
  const noramlAnswers = [
    "common",
    "belong",
    "desire",
    "escape",
    "anyone",
    "driver",
    "eleven",
    "banana",
    "attack",
    "camera",
  ];
  const hardAnswers = [
    "iceberg",
    "vaccine",
    "painful",
    "observe",
    "machine",
    "factory",
    "cabbage",
    "quantum",
    "quarter",
    "painter",
  ];

  if (difficulty === "normal") {
    return noramlAnswers[Math.floor(Math.random() * noramlAnswers.length)];
  } else if (difficulty === "hard") {
    return hardAnswers[Math.floor(Math.random() * hardAnswers.length)];
  }
};

const countCharacterFrequency = (str) => {
  const frequencyMap = {};

  // Initialize the frequency map with the alphabet set to 0
  for (
    let charCode = "a".charCodeAt(0);
    charCode <= "z".charCodeAt(0);
    charCode++
  ) {
    frequencyMap[String.fromCharCode(charCode)] = 0;
  }

  // Loop over the input string to count the frequency of each character
  for (const char of str.toLowerCase()) {
    if (Object.prototype.hasOwnProperty.call(frequencyMap, char)) {
      frequencyMap[char]++;
    }
  }

  return frequencyMap;
};

// remember to use lower case.
function Play() {
  const [hint, setHint] = useState(<Answer text="Please enter your answer" />);
  const location = useLocation();
  // console.log(location);
  const { selectedValue } = location.state || {
    selectedValue: localStorage.getItem("difficulty"),
  };
  const [difficulty, setDifficulty] = useState(
    localStorage.getItem("difficulty") || selectedValue
  );
  // const [difficulty, setDifficulty] = useState(selectedValue);

  // useEffect(() => {localStorage.setItem("difficulty", difficulty)});
  console.log(difficulty);
  localStorage.setItem("difficulty", difficulty);

  const [answer, setAnswer] = useState(localStorage.getItem("answer") || "");
  if (answer === "") {
    setAnswer(generateAnswer(difficulty));
  }
  localStorage.setItem("answer", answer);
  console.log("answer", answer);

  let timesOfRetry, lengthOfWord;

  if (difficulty === "normal") {
    timesOfRetry = 6;
    lengthOfWord = 6;
  } else if (difficulty === "hard") {
    timesOfRetry = 5;
    lengthOfWord = 7;
  }

  let blank = {};
  blank.word = " ".repeat(lengthOfWord);
  blank.colormap = "0".repeat(lengthOfWord);

  const freqMap = countCharacterFrequency(answer);

  const [records, setRecords] = useContext(RecordContext);
  const [inputValue, setInputValue] = useContext(InputContext);

  // a set of help functions
  const buildColormap = (word) => {
    let colormap = "00000".split(""); // length of word
    for (let i = 0; i < word.length; i++) {
      if (word[i] === answer[i]) {
        colormap[i] = "2";
        freqMap[word[i]]--;
      }
    }

    for (let i = 0; i < word.length; i++) {
      if (colormap[i] === "0") {
        if (freqMap[word[i]] > 0) {
          colormap[i] = "1";
          freqMap[word[i]]--;
        }
      }
    }

    return colormap.join("");
  };

  const buildRecords = (word) => {
    let record = {};
    record.word = word.toLowerCase();
    record.colormap = buildColormap(word.toLowerCase());

    // const parsedRecords = JSON.parse(records);
    const newRecords = [...records, record];

    setRecords(newRecords);
  };

  const buildRecordsUI = () => {
    let recordsUI = [];
    records.forEach((record) => {
      recordsUI.push(
        <InputRecord
          key={record.word + Math.random().toString()}
          word={record.word}
          colormap={record.colormap}
        />
      );
    });
    console.log("length is ", recordsUI.length);
    for (let i = recordsUI.length; i < timesOfRetry; i++) {
      recordsUI.push(
        <InputRecord
          key={blank.word + i}
          word={blank.word}
          colormap={blank.colormap}
        />
      );
    }
    return recordsUI;
  };

  const validInputCheck = async (word) => {
    let isValid = false;
    if (word.length !== lengthOfWord) {
      return isValid;
    }
    try {
      // Replace with your actual API endpoint
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      // If the status code is 200, the word is valid.
      isValid = response.status === 200;

      // Based on the boolean, you can have different statements here
      if (isValid) {
        console.log(`${word} is a valid word.`);
      } else {
        console.log(`${word} is not a valid word.`);
      }
    } catch (error) {
      // If the request fails, it could either be a network error,
      // or the word is not valid (404 not found in case of this specific API)
      if (error.response && error.response.status !== 200) {
        isValid = false;
        console.log(`${word} is not a valid word.`);
      } else {
        // Handle other errors like network errors, etc.
        console.error("An error occurred:", error);
      }
    }

    // Return the boolean if you want to use it outside of this function
    return isValid;
  };

  const handleSubmit = async () => {
    const lowerCase = inputValue.toLowerCase();
    let isValid = (await validInputCheck(lowerCase)).valueOf();
    console.log("isValid", isValid);
    if (isValid) {
      console.log("coming in, ", isValid);
      buildRecords(lowerCase);
      // judge, correct or retry or end.
      console.log("input value is ", inputValue);
      if (lowerCase === answer) {
        console.log("in correct");
        setHint(<Answer text={`Correct! Answer is: ${answer}`} />);
      } else {
        if (records.length === timesOfRetry) {
          setHint(
            <Answer text={`You are out of tries! Answer is: ${answer}`} />
          );
        } else {
          setHint(<Answer text="Wrong! Please try again." />);
        }
      }
    } else {
      // hint invalid input.
      setHint(<Answer text="Invalid Input." />);
    }

    setInputValue("");
  };

  return (
    <Box>
      <BackButton />
      {buildRecordsUI()}
      {hint}
      <InputForm callback={handleSubmit} />
    </Box>
  );
}

export default Play;
