import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
  MDBValidationItem,
  MDBTextArea,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const initialArticleState = {
  title: "",
  description: "",
  tags: [],
};

const AddEditArticle = () => {
  const [articleData, setArticleData] = useState(initialArticleState);
  const { title, description, tags } = articleData;

  const {error, loading} = useSelector((state) => ({...state.article}));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const onInputChange = (e) => {
    const { name, value } = e.target; // e.target.name ve e.target.value yerine name ve value olarak kullanabilmek için destructuring yapıyoruz.
    setArticleData({ ...articleData, [name]: value });
  };

  const addTagHandler = (tag) => {
    setArticleData({ ...articleData, tags: [...articleData.tags, tag] }); // halihazırda var olan articleData'nın tüm verilerini alıyoruz ve articleData'nın sahip olduğu tags'leri ekleyip, ardından parametre olarak gelen tag'ı da ekliyoruz.
  };

  const deleteTagHandler = (deletedTag) => {
    setArticleData({
      ...articleData,
      tags: articleData.tags.filter((t) => t !== deletedTag),
    }); // halihazırda var olan articleData'nın tüm verilerini alıyoruz ve articleData'nın sahip olduğu tags'leri filtreliyoruz. Filtreleme işleminde parametre olarak gelen tag'i siliyoruz. "deletedTag" koşulunu sağlamayan tag'lar kalıyor.
  };

  const clearFormHandler = () => {
    setArticleData(initialArticleState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
  };


  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className='container'
    >
      <MDBCard alignment='center'>
        <MDBCardBody>
          <h5>Yazı Ekle</h5>
          <MDBValidation
            onSubmit={submitHandler}
            noValidate
            className='row g-3'
          >
            <MDBValidationItem
              className='col-md-12'
              feedback='Lütfen başlık giriniz.'
              invalid='true'
            >
              <MDBInput
                label='Başlık'
                type='text'
                value={title}
                name='title'
                onChange={onInputChange}
                className='form-control'
                required
                invalid='true'
                validation='Lütfen başlık giriniz'
              />
            </MDBValidationItem>

            <MDBValidationItem
              className='col-md-12'
              feedback='Lütfen description giriniz.'
              invalid='true'
            >
              <MDBTextArea
                label='Description'
                style={{ rows: "4" }}
                type='textarea'
                value={description}
                name='description'
                id='description'
                onChange={onInputChange}
                className='form-control'
                required
                invalid='true'
                rows={4}
                validation='Lütfen description giriniz.'
              />
            </MDBValidationItem>

            <MDBValidationItem
              className='col-md-12'
              feedback='Lütfen etiket giriniz.'
              invalid='true'
            >
              <ChipInput
                name='tags'
                variant='outlined'
                placeholder='Etiket(ler)'
                fullWidth
                value={tags}
                onAdd={(tag) => addTagHandler(tag)}
                onDelete={(tag) => deleteTagHandler(tag)}
              />
            </MDBValidationItem>

            <MDBValidationItem
              className='d-flex justify-content-start'
              feedback='Lütfen etiket giriniz.'
              invalid='true'
            >
              <FileBase
                type='file'
                multiple={false}
                onDone={({ base64 }) =>
                  setArticleData({ ...articleData, imageFile: base64 })
                }
              />
            </MDBValidationItem>

            <MDBValidationItem className='col-12'>
              <MDBBtn style={{ width: "100%" }}>YAZIYI Ekle</MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className='mt-2'
                color='danger'
                onClick={clearFormHandler}
              >
                Temizle
              </MDBBtn>
            </MDBValidationItem>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditArticle;
