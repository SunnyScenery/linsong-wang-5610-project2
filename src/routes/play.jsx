import InputRecord from "../components/record";
import InputForm from "../components/input";
import {
    Box
} from "@material-ui/core";
import Answer from "../components/answer";
import BackButton from "../components/back-button";
import { useContext } from "react";
import { RecordContext } from "../store/records";
import { InputContext } from "../store/input";

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

    const timesOfRetry = 5;
    const lengthOfWord = 5;
    const answer = "apple";
    let blank = {};
    blank.word = " ".repeat(lengthOfWord);
    blank.colormap = "0".repeat(lengthOfWord);

    const freqMap = countCharacterFrequency(answer);

    const [records, setRecords] = useContext(RecordContext);
    const [inputValue, setInputValue] = useContext(InputContext);

    // a set of help functions
    const buildColormap = (word) => {
        let colormap = "00000"; // length of word
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

        return colormap;
    }

    const buildRecords = (word) => {
        let record = {}
        record.word = word.toLowerCase();
        record.colormap = buildColormap(word.toLowerCase());

        const newRecords = [record];
        for (let i = 0; i < records.length; i++) {
            newRecords.push(records[i]);
        }
        setRecords(newRecords);
    }

    const buildRecordsUI = () => {
        let recordsUI = [];
        records.forEach((record) => {
            recordsUI.push(
                <InputRecord key={record.word} word={record.word} colormap={records.colormap} />
            )
        })

        // for (let i = 0; i < records.length; i++) {
        //     recordsUI.push(
        //         <InputRecord word={records[i].word} colormap={records[i].colormap} />
        //     )
        // }
        console.log("length is ", recordsUI.length);
        for (let i = recordsUI.length; i < timesOfRetry; i++) {
            recordsUI.push(
                <InputRecord key={blank.word+i} word={blank.word} colormap={blank.colormap} />
            )
        }
        return recordsUI;
    }

    const validInputCheck = (word) => {
        if (word.length!== lengthOfWord) {
            return false;
        }
        return true;
    }

    let hint = (<Answer text="Please enter your answer" />);
    const handleSubmit = () => {
        if (validInputCheck(inputValue)) {
            buildRecords(inputValue);
            // judge, correct or retry or end.
            if (inputValue === answer) {
                hint = (<Answer text={`Correct! Answer is: ${answer}`} />);
            } else {
                if (records.length === timesOfRetry) {
                    hint = (<Answer text={`You are out of tries! Answer is: ${answer}`} />);
                } else {
                    hint = (<Answer text="Wrong! Please try again." />);
                }
            }
        } else {
            // hint invalid input.
            hint = (<Answer text="Invalid Input." />);
        }

        setInputValue("");
    }

    return (
        
        <Box>
            <BackButton />
            <InputRecord word="abcde" colormap="00000" />
            {buildRecordsUI()}
            {hint}
            <InputForm callback={handleSubmit}/>
        </Box>
    )
}

export default Play;