import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState({
        title: '',
        details: '',
    });
    useEffect(() => {
        axios
            .get(`http://localhost:5000/noteDetails/${id}`)
            .then((res) => {
                setNote(res.data.content);
            })
            .catch((err) => console.log(err));
    }, [id]);
    const changeHandler = (event) => {
        const {name, value} = event.target;
        setNote({ ...note, [name]: value });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        axios
            .patch(`http://localhost:5000/updateNote/${id}`, note)
            .then(() => {
                navigate(`/`);
                Swal.fire('Your note has been updated successfully!')
            })
            .catch((err) => console.error(err));
    }
  return (
    <div>
            <h1 className="headline">
                Edit <span>Note</span>
            </h1>
            <form className="note-form">
                <input
                    type="text"
                    name="title"
                    value={note.title}
                    onChange={changeHandler}
                    placeholder="Title of Note ..."
                />
                <textarea
                    name="details"
                    rows="5"
                    defaultValue={note.details}
                    onChange={changeHandler}
                    placeholder="Descride Your Note ..."
                ></textarea>
                <button onClick={submitHandler}>Save Changes</button>
            </form>
        </div>
  )
}
