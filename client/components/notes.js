import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Notes.module.css";
import { v4 as uuid } from "uuid";

export default function Notes() {
  const [showInput, setShowInput] = useState(false);
  const [notesArray, setNotesArray] = useState([]);
  const [noteObject, setNoteObject] = useState({
    id: uuid(),
    title: "Add a note!",
    note: "Click the plus button to add a note. All your notes will show up here",
  });

  const openInput = () => {
    setShowInput(!showInput);
  };

  const getNotes = () => {
    let notes;
    if (localStorage.getItem("notes") === null) {
      notesArray.push(noteObject);
      localStorage.setItem("notes", JSON.stringify(notesArray));
      notes = JSON.parse(localStorage.getItem("notes"));
    } else {
      notes = JSON.parse(localStorage.getItem("notes"));
    }
    setNotesArray(notes);
  };

  useEffect(() => {
    getNotes();
    console.log("uE hook");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNoteObject({
      ...noteObject,
      id: uuid(),
    });
    notesArray.push(noteObject);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    setNoteObject({
      id: uuid(),
      title: "",
      note: "",
    });
    document.getElementById("createinput").value = "";
    document.getElementById("createtext").value = "";
  };

  const handleChange = (e) => {
    setNoteObject({
      ...noteObject,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (id) => {
    let updatedNotes;
    updatedNotes = notesArray.filter((n) => n.id !== id);
    setNotesArray(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    getNotes();
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        Notes
        <div className={styles.plus}>
          <button className={styles.plusButton} onClick={openInput}>
            {!showInput ? (
              <Image src="/plus.svg" width={25} height={25} />
            ) : (
              <div className={styles.minus}></div>
            )}
          </button>
        </div>
      </div>
      <div className={styles.notesContainer}>
        {showInput && (
          <div className={styles.create}>
            <form>
              <input
                id="createinput"
                className={styles.input}
                placeholder="Title"
                onChange={handleChange}
                name="title"
                onKeyPress={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
              />
              <textarea
                id="createtext"
                rows="3"
                name="note"
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Note"
              />
            </form>
            <div className={styles.buttonContainer}>
              <button className={styles.cancel} onClick={openInput}>
                Cancel
              </button>
              <button className={styles.save} onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        )}
        <div className={styles.submittedNotes}>
          {notesArray.map((n) => (
            <div className={styles.note} key={n.id}>
              <div className={styles.noteTitleContainer}>
                <div className={styles.noteTitle}>{n.title}</div>
                <div
                  className={styles.delete}
                  onClick={() => handleDelete(n.id)}
                >
                  <Image src="/delete.svg" width={15} height={15} />
                </div>
              </div>
              <div className={styles.noteBody}>{n.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
