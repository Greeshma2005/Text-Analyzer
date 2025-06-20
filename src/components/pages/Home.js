import React, { useState } from "react";

export default function Home(props) {
  document.title = "Text Analyzer - Home";

  const [text, setText] = useState("");

  const countSentences = (text) => {
    return text.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0).length;
  };

  const countVowels = (text) => {
    return (text.match(/[aeiouAEIOU]/g) || []).length;
  };

  const countConsonants = (text) => {
    return (text.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length;
  };

  const getBasicSummary = (text) => {
    if (!text || text.trim().length === 0) return "Nothing to summarize.";

    const sentences = text.match(/[^.?!]+[.?!]+/g) || [text];
    if (sentences.length === 1) return sentences[0].trim();

    const words = text.toLowerCase().match(/\w+/g) || [];
    const freqMap = new Map();

    for (const word of words) {
      if (word.length > 3) {
        freqMap.set(word, (freqMap.get(word) || 0) + 1);
      }
    }

    const scored = sentences.map((sentence) => {
      const sentenceWords = sentence.toLowerCase().match(/\w+/g) || [];
      const score = sentenceWords.reduce((acc, word) => {
        return acc + (freqMap.get(word) || 0);
      }, 0);
      return {
        sentence: sentence.trim(),
        score: score / (sentenceWords.length || 1),
      };
    });

    scored.sort((a, b) => b.score - a.score);

    const summaryLength = Math.min(3, Math.ceil(sentences.length * 0.3));
    const summarySentences = scored.slice(0, summaryLength).map((obj) => obj.sentence);

    return summarySentences.join(" ");
  };

  function handleOnChange(event) {
    setText(event.target.value);
  }

  function handleUppercase() {
    let purifyText = text.split(/[ ]+/).join(" ");
    let newText = purifyText.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase.", "Success!");
  }

  function handleLowercase() {
    let purifyText = text.split(/[ ]+/).join(" ");
    let newText = purifyText.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase.", "Success!");
  }

  function handleTitleCase() {
    const array = text.toLowerCase().split(" ");
    for (let i = 0; i < array.length; i++) {
      array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
    }
    let newText = array.join(" ");
    let purifyText = newText.split(/[ ]+/).join(" ");
    setText(purifyText);
    props.showAlert("Converted to title case.", "Success!");
  }

  function handleSentenceCase() {
  const paragraphs = text.split(/\n+/); 

  const sentenceCasedParagraphs = paragraphs.map(paragraph => {
    const parts = paragraph
      .trim()
      .toLowerCase()
      .split(/([.?!]\s*)/g); 
    for (let i = 0; i < parts.length; i += 2) {
      if (parts[i]) {
        parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
      }
    }

    return parts.join("").trim(); 
  });

  const result = sentenceCasedParagraphs.join("\n"); 
  setText(result);
  props.showAlert("Converted to sentence case.", "Success!");
}


  function handleReverse() {
    let newText = text.split("").reverse().join("");
    setText(newText);
    props.showAlert("Reversed successfully.", "Success!");
  }

  function clearFormData() {
    setText("");
    props.showAlert("Data cleared successfully.", "Success!");
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Copied to clipboard.", "Success!");
  };

  const RemoveExtraSpace = () => {
    let purifyTextArr = text.split(/[ ]+/);
    let newText = purifyTextArr.join(" ");
    setText(newText);
    props.showAlert("Extra space removed.", "Success!");
  };

  function slowReadTime() {
    const countWords = text.trim().split(/\s+/).length;
    const countMinutes = countWords / 125;
    return countMinutes < 1
      ? Math.round(countMinutes * 60) + " sec"
      : Math.round(countMinutes) + " min";
  }

  function avgReadTime() {
    const countWords = text.trim().split(/\s+/).length;
    const countMinutes = countWords / 300;
    return countMinutes < 1
      ? Math.round(countMinutes * 60) + " sec"
      : Math.round(countMinutes) + " min";
  }

  function fastReadTime() {
    const countWords = text.trim().split(/\s+/).length;
    const countMinutes = countWords / 450;
    return countMinutes < 1
      ? Math.round(countMinutes * 60) + " sec"
      : Math.round(countMinutes) + " min";
  }

  return (
    <div className="pt-6 pb-8 lg:py-10 container">
      <div className="py-2 flex items-center gap-x-6 md:gap-x-4 text-gray-500">
        <div className="md:text-xl font-semibold">Reading Time :</div>
        {text.length < 1 ? "" : (
          <>
            <div className="text-sm sm:text-base hidden md:block">
              {slowReadTime()} <span className="text-xs">(slow)</span>
            </div>
            <div className="text-sm sm:text-base">
              {avgReadTime()} <span className="text-xs">(avg)</span>
            </div>
            <div className="text-sm sm:text-base hidden md:block">
              {fastReadTime()} <span className="text-xs">(fast)</span>
            </div>
          </>
        )}
      </div>

      <form>
        <div className="mb-4 w-full bg-[#0B1120] dark:bg-white rounded-lg border border-gray-700 dark:border-gray-200">
          <div className="py-3 px-5 bg-[#0B1120] dark:bg-white rounded-t-lg">
            <textarea
              value={text}
              onChange={handleOnChange}
              id="content"
              rows=""
              className="px-0 w-full h-44 md:h-64 text-sm md:text-base text-white dark:text-gray-700 bg-[#0B1120] dark:bg-white focus:ring-0 border-none placeholder:text-white dark:placeholder:text-gray-400"
              placeholder="Write your content..."
              autoFocus={true}
            ></textarea>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-y-3 lg:gap-y-0 p-3 md:py-4 border-t border-[#1a2233] dark:border-[#e5e7eb]">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button disabled={!text} onClick={handleTitleCase} type="button"
                className="py-1 px-2 text-xs md:py-2 md:px-4 md:text-sm font-medium text-blue-500 bg-transparent rounded-l-lg border border-blue-500 hover:bg-blue-500 hover:text-white">
                Title Case
              </button>
              <button disabled={!text} onClick={handleUppercase} type="button"
                className="py-1 px-2 text-xs md:py-2 md:px-4 md:text-sm font-medium text-blue-500 bg-transparent border-t border-b border-blue-500 hover:bg-blue-500 hover:text-white">
                UPPERCASE
              </button>
              <button disabled={!text} onClick={handleLowercase} type="button"
                className="py-1 px-2 text-xs md:py-2 md:px-4 md:text-sm font-medium text-blue-500 bg-transparent border-t border-b border-l border-blue-500 hover:bg-blue-500 hover:text-white">
                lowercase
              </button>
              <button disabled={!text} onClick={handleSentenceCase} type="button"
                className="py-1 px-2 text-xs md:py-2 md:px-4 md:text-sm font-medium text-blue-500 bg-transparent border-t border-b border-l border-blue-500 hover:bg-blue-500 hover:text-white">
                Sentence Case
              </button>
              <button disabled={!text} onClick={RemoveExtraSpace} type="button"
                className="py-1 px-2 text-xs md:py-2 md:px-4 md:text-sm font-medium text-blue-500 bg-transparent border-t border-b border-l border-blue-500 hover:bg-blue-500 hover:text-white">
                RemoveExtraSpace
              </button>

              <button disabled={!text} onClick={handleReverse} type="button"
                className="py-1 px-2 text-xs md:py-2 md:px-4 md:text-sm font-medium text-blue-500 bg-transparent rounded-r-md border border-blue-500 hover:bg-blue-500 hover:text-white">
                Reverse
              </button>
            </div>

            <div className="flex items-center gap-x-2 md:gap-x-4">
              <button disabled={!text} onClick={clearFormData} title="Clear" type="button"
                className="inline-flex items-center gap-x-2 text-xs md:text-sm py-1 px-2 md:py-2 md:px-4 text-pink-500 border border-pink-500 rounded hover:bg-pink-500 hover:text-white">
                Clear
              </button>
              <button disabled={!text} onClick={handleCopyToClipboard} title="Copy to Clipboard" type="button"
                className="inline-flex items-center gap-x-2 text-xs md:text-sm py-1 px-2 md:py-2 md:px-4 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white">
                <span className="font-medium">Copy</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="mt-4 text-gray-500 text-sm md:text-base space-y-1">
        <p>
          <span className="font-bold">
            {text.trim().split(/\s+/).filter((word) => word.length !== 0).length}
          </span>{" "}words,{" "}
          <span className="font-bold">{text.length}</span>{" "}characters
        </p>
        <p>
          <span className="font-bold">{countSentences(text)}</span>{" "}sentences,{" "}
          <span className="font-bold">{countVowels(text)}</span>{" "}vowels,{" "}
          <span className="font-bold">{countConsonants(text)}</span>{" "}consonants
        </p>
        {text.length > 0 && (
          <div>
            <p className="mt-2 font-semibold">Summary:</p>
            <div className="relative">
              <p className="italic text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 p-2 rounded pr-12">
                {getBasicSummary(text)}
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(getBasicSummary(text));
                  props.showAlert("Summary copied to clipboard.", "Success!");
                }}
                className="absolute top-2 right-2 text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
