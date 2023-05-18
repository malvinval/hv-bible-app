import { useState, useEffect } from "react";
import axios from "axios";
import '../index.css';
import { Link } from "react-router-dom";

const HVBible = () => {
    const allBibleBooks = ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"];
    const [bibleBook, setBibleBook] = useState("Genesis");
    const [bibleChapter, setBibleChapter] = useState(1);
    const [bibleVerseFrom, setBibleVerseFrom] = useState(1);
    const [bibleVerseTo, setBibleVerseTo] = useState(31);
    const [bibleContents, setBibleContents] = useState("1 The Revelation of Jesus Christ which God gave him so that his servants might have knowledge of the things which will quickly take place: and he sent and made it clear by his angel to his servant John; 2 Who gave witness of the word of God, and of the witness of Jesus Christ, even of all the things which he saw. 3 A blessing be on the reader, and on those who give ear to the prophet's words, and keep the things which he has put in the book: for the time is near. 4 John to the seven churches which are in Asia: Grace to you and peace, from him who is and was and is to come; and from the seven Spirits which are before his high seat; 5 And from Jesus Christ, the true witness, the first to come back from the dead, and the ruler of the kings of the earth. To him who had love for us and has made us clean from our sins by his blood; 6 And has made us to be a kingdom and priests to his God and Father; to him let glory and power be given for ever and ever. So be it. 7 See, he comes with the clouds, and every eye will see him, and those by whom he was wounded; and all the tribes of the earth will be sorrowing because of him. Yes, so be it. 8 I am the First and the Last, says the Lord God who is and was and is to come, the Ruler of all. 9 I, John, your brother, who have a part with you in the trouble and the kingdom and the quiet strength of Jesus, was in the island which is named Patmos, for the word of God and the witness of Jesus. 10 I was in the Spirit on the Lord's day, and a great voice at my back, as of a horn, came to my ears,");
    const [isBibleSearchActivated, setIsBibleSearchActivated] = useState(false);
    const [isContributeModalTrigerred, setIsContributeModalTrigerred] = useState(false);

    const formatNumberWithRegex = (text) => {
      return text.replace(/\d+/g, (match) => `<strong><u>${match}</u></strong>`)
    };

    useEffect(() => {
      document.title = "HV Bible by MalvinVal";
    }, []);
  
    useEffect(() => {
      axios.get('https://ajith-holy-bible.p.rapidapi.com/GetVerses', {
        headers: {
          'X-RapidAPI-Key': 'd883ae7305mshce31ebfdba1f1c4p1bbdf2jsndda4caeb4e9b',
          'X-RapidAPI-Host': 'ajith-holy-bible.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        params: {
          Book: bibleBook,
          chapter: bibleChapter,
          VerseFrom: bibleVerseFrom,
          VerseTo: bibleVerseTo
        },
      })
      .then(response => {
        setBibleContents(formatNumberWithRegex(response.data.Output))
        console.log(response.data.Output)
      })
      .catch(error => {
        console.error(error);
      })
    }, [bibleBook, bibleChapter, bibleVerseFrom, bibleVerseTo]);

    const element = (
      <>
        <div className="fixed navbar font-poppins bg-white shadow-md text-black z-50">
          <div className="navbar-start lg:justify-center p-0 z-50">
              <div className="dropdown">
                  <label tabIndex={0} className="btn btn-ghost lg:hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                  </label>
                  <ul tabIndex={0} className="bg-white menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52">
                      <li onClick={() => {setIsBibleSearchActivated(true)}}><p className="bg-transparent z-50">Search in bible</p></li>
                      <li onClick={() => {setIsContributeModalTrigerred(true)}}><p className="bg-transparent z-50">Contribute</p></li>
                  </ul>
              </div>
              <h1 className="normal-case font-semibold text-lg md:block z-50">HV Bible</h1>
          </div>

          <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                  <li onClick={() => {setIsBibleSearchActivated(true)}}><p className="bg-transparent z-50">Search in bible</p></li>
                  <li onClick={() => {setIsContributeModalTrigerred(true)}}><p className="bg-transparent z-50">Contribute</p></li>
              </ul>
          </div>
      </div>

      <div className="px-7 py-24 lg:p-32 leading-8 text-justify">
        <h1 className="font-poppins text-lg font-bold mb-5">{bibleBook} {bibleChapter} : {bibleVerseFrom} - {bibleVerseTo}</h1>
        <p className="font-poppins" dangerouslySetInnerHTML={{__html: bibleContents}}></p>
      </div>

      {
        isBibleSearchActivated ? 
          <div className="fixed inset-0 flex items-center justify-center z-50 font-poppins">
          <div className="modal-box">

            <div className="mt-5">
              <div className="mt-3">
                <label className="text-lg">Books : </label>
                <select className="ml-3 rounded-lg py-3 px-5" id="difficulty-dropdown" onChange={(e) => setBibleBook(e.target.value)}>
                    <option value={bibleBook}>{bibleBook}</option>
                    {allBibleBooks.map((b) => {
                      return <option value={b}>{b}</option>
                    })}
                </select>
              </div>

              <div className="mt-3">
                <label className="text-lg">Chapter : </label>
                <input onChange={(e) => setBibleChapter(e.target.value)} type="number" className="w-32 ml-3 rounded-lg py-3 px-5 bg-gray-100" placeholder={bibleChapter}></input>
              </div>

              <div className="mt-3">
                <label className="text-lg">Verse from : </label>
                <input onChange={(e) => setBibleVerseFrom(e.target.value)} type="number" className="w-32 ml-3 rounded-lg py-3 px-5 bg-gray-100" placeholder={bibleVerseFrom}></input>
              </div>

              <div className="mt-3">
                <label className="text-lg">Verse to : </label>
                <input onChange={(e) => setBibleVerseTo(e.target.value)} type="number" className="w-32 ml-3 rounded-lg py-3 px-5 bg-gray-100" placeholder={bibleVerseTo}></input>
              </div>
            </div>

            <div className="modal-action">
              <label htmlFor="my-modal" className="btn" onClick={() => {setIsBibleSearchActivated(false)}}>OK</label>
            </div>
          </div>
        </div>
        :
        ""
      }

      {
        isContributeModalTrigerred ? 
        <div className="fixed inset-0 flex items-center justify-center z-50 font-poppins">
          <div className="modal-box">
            <div className="mt-5">
              <h3 className="font-bold text-lg">Thanks for using HV Bible!</h3>
              <p className="mt-6 text-justify leading-8">HV Bible is a free and open source online bible application developed by Malvin Valerian Gultom.</p>
              <p className="mt-6 leading-8">Visit the project's repository at <a href="https://github.com/malvinval/hv-bible-app" className="underline text-blue-500">https://github.com/malvinval/hv-bible-app</a> and feel free to contribute to the development of the application.</p>
            </div>
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn" onClick={() => {setIsContributeModalTrigerred(false)}}>OK</label>
            </div>
          </div>
        </div>
        :
        ""
      }
      </>
    )

    return element;
}

export default HVBible;