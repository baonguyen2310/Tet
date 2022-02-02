import React from 'react';
import { Modal, TextareaAutosize, Button, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { modalState$ } from '../../redux/selectors';
import useStyles from './styles';
import { createPost, hideModal } from '../../redux/actions';
import FileBase64 from 'react-file-base64';

export default function CreatePostModal(){
    const { isShow } = useSelector(modalState$);
    console.log({isShow});

    const classes = useStyles();

    const [data, setData] = React.useState({
        title: "",
        content:"",
        attachment:""
    });

    const dispatch = useDispatch();
    const onClose = React.useCallback(() => {
        dispatch(hideModal());
        setData({
            title: "",
            content:"",
            attachment:""
        })
    }, [dispatch]);

    const onSubmit = React.useCallback(() => {
        dispatch(createPost.createPostRequest(data))
    }, [data, dispatch]);

    const body = (
        <div className={classes.paper} id="simple-modal-title">
            <h2>Create New Post</h2>
            <form noValidate autoComplete='off' className={classes.form}>
                <TextField 
                    className={classes.title} 
                    required 
                    label='Title' 
                    value={data.title}
                    onChange={(e) => setData({...data, title: e.target.value})}
                />
                <TextareaAutosize 
                    rowsMin={10}
                    rowsMax={15}
                    placeholder='Content...'
                    value={data.content}
                    onChange={(e) => setData({...data, content: e.target.value})}
                />
                <FileBase64 
                    accept="image/*"
                    multiple={false}
                    type="file"
                    value={data.attachment}
                    onDone={({ base64 }) => setData({ ...data, attachment: base64 })}
                />

                <Button 
                    variant='contained' 
                    color='primary' 
                    component='span' 
                    fullWidth
                    onClick={onSubmit}
                    >
                    Create
                </Button>
            </form>
        </div>
    );
    return (
        <div>
            <Modal open={isShow} onClose={onClose}>
                {body}
            </Modal>
        </div>   
    )
}