import InputRecord from "../components/record";
import InputForm from "../components/input";
import {
    Box
} from "@material-ui/core";
import Answer from "../components/answer";
import BackButton from "../components/back-button";
import { useContext, useState } from "react";
import { RecordContext } from "../store/records";
import { InputContext } from "../store/input";
import { useLocation } from "react-router-dom";

const countCharacterFrequency = (str) => {
    const frequencyMap = {};
  
    // Initialize the frequency map with the alphabet set to 0
    for (let charCode = 'a'.charCodeAt(0); charCode <= 'z'.charCodeAt(0); charCode++) {
      frequencyMap[String.fromCharCode(charCode)] = 0;
    }
  
    // Loop over the input string to count the frequency of each character
    for (const char of str.toLowerCase()) {
      if (Object.prototype.hasOwnProperty.call(frequencyMap, char)) {
        frequencyMap[char]++;
      }
    }
  
    return frequencyMap;
}

// remember to use lower case.
function Play() {

    const [hint, setHint] = useState((<Answer text="Please enter your answer" />));
    const location = useLocation();
    // console.log(location);
    const { selectedValue } = location.state;

    let timesOfRetry, lengthOfWord;

    if ( selectedValue === "normal" ) {
        timesOfRetry = 6;
        lengthOfWord = 6;
    } else if ( selectedValue === "hard" ) {
        timesOfRetry = 6;
        lengthOfWord = 7;
    }

    const answer = "banana";
    let blank = {};
    blank.word = " ".repeat(lengthOfWord);
    blank.colormap = "0".repeat(lengthOfWord);

    const freqMap = countCharacterFrequency(answer);

    const [records, setRecords] = useContext(RecordContext);
    const [inputValue, setInputValue] = useContext(InputContext);

    // a set of help functions
    const buildColormap = (word) => {
        let colormap = "00000".split(''); // length of word
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

        return colormap.join('');
    }

    const buildRecords = (word) => {
        let record = {}
        record.word = word.toLowerCase();
        record.colormap = buildColormap(word.toLowerCase());

        const newRecords = [];
        for (let i = 0; i < records.length; i++) {
            newRecords.push(records[i]);
        }
        newRecords.push(record);

        setRecords(newRecords);
    }

    const buildRecordsUI = () => {
        let recordsUI = [];
        records.forEach((record) => {
            recordsUI.push(
                <InputRecord key={record.word} word={record.word} colormap={record.colormap} />
            )
        })
        console.log("length is ", recordsUI.length);
        for (let i = recordsUI.length; i < timesOfRetry; i++) {
            recordsUI.push(
                <InputRecord key={blank.word+i} word={blank.word} colormap={blank.colormap} />
            )
        }
        return recordsUI;
    }

    const validInputCheck = (word) => {
        if (word.length !== lengthOfWord) {
            return false;
        }
        return true;
    }
    

    const handleSubmit = () => {
        if (validInputCheck(inputValue)) {
            buildRecords(inputValue);
            // judge, correct or retry or end.
            console.log("input value is ", inputValue);
            if (inputValue === answer) {
                console.log("in correct");
                setHint((<Answer text={`Correct! Answer is: ${answer}`} />));
            } else {
                if (records.length === timesOfRetry) {
                    setHint((<Answer text={`You are out of tries! Answer is: ${answer}`} />));
                } else {
                    setHint((<Answer text="Wrong! Please try again." />));
                }
            }
        } else {
            // hint invalid input.
            setHint((<Answer text="Invalid Input." />));
        }

        setInputValue("");
    }

    return (
        
        <Box>
            <BackButton />
            {buildRecordsUI()}
            {hint}
            <InputForm callback={handleSubmit}/>
        </Box>
    )
}

export default Play;