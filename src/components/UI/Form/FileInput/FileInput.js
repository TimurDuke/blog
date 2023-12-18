import {useEffect, useRef, useState} from "react";
import {Button, Grid} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PropTypes from "prop-types";
import {Input} from "../FormStyles";

const FileInput = ({field, name, placeholder, error, initialFileName, isLoading}) => {
    const inputRef = useRef();

    const [filename, setFilename] = useState(initialFileName || '');

    useEffect(() => {
        field.ref.current = inputRef.current;
    }, [field.ref]);

    const onFileChange = e => {
        const file = e.target.files[0];

        if (file) {
            setFilename(file.name);
            field.onChange(file)
        } else {
            setFilename('');
            field.onChange(null);
        }
    };

    const activateInput = () => {
        inputRef.current.click();
    };

    return (
        <>
            <input
                type="file"
                name={name}
                style={{display: 'none'}}
                onChange={onFileChange}
                ref={inputRef}
            />
            <Grid container direction="row" spacing={2} alignItems="center">
                <Grid item xs>
                    <Input
                        fullWidth
                        placeholder={placeholder}
                        onClick={activateInput}
                        disabled
                        value={filename}
                        error={Boolean(error)}
                        helperText={error}
                        hiddenLabel
                        FormHelperTextProps={{
                            sx: {margin: '4px 0 0'}
                        }}
                        size='small'
                    />
                </Grid>
                <Grid item sx={{paddingBottom: error ? '36px' : '12px'}}>
                    <Button disabled={isLoading} variant="contained" onClick={activateInput}>
                        <PhotoCamera/>
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default FileInput;

FileInput.propTypes = {
    field: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    initialFileName : PropTypes.string,
    error: PropTypes.string,
};
