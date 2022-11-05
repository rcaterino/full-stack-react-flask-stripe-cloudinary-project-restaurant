import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Container, FormGroup } from "react-bootstrap";

export const SubirImages= (props) => {
    const { store, actions } = useContext(Context);
const [image, setImage] = useState ("");
const [Loading, setLoading] = useState (false);

const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "imagen");
    setLoading(true);
    const res = await fetch(
        "https://api.cloudinary.com/v1_1/dbxoycnov/image/upload",
        
        {
            method:"POST",
            body: data,
        }
    )

    const file = await res.json();
    // console.log(res)
    setImage(file.secure_url)
    console.log(file.secure_url)
    actions.setUrlImge(file.secure_url);
    setLoading(false)

}
    return(
        <div>
        <Container>
            <h1>
                Subiendo Imagenes
            </h1>
            <FormGroup>
                <input type="file"
                name="file"
                placeholder="subir imagen"
                onChange={uploadImage}/>
            </FormGroup>
        </Container>
        
        </div>
    )
}