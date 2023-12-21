import React from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import EditProfileForm from "../../components/UI/Form/EditProfileForm";
import {fieldEditProfileConfig} from "../../utils/inputRuleUtils";
import {useUploadImageMutation} from "../../services/imgBbService";
import {useEditUserMutation} from "../../services/UserService";
import {articlesPath} from "../../routes/routePaths";

const getUsersModifiedFields = (currentData, user) => {
    const originalData = {
        username: user.username,
        email: user.email,
        image: user.image,
        password: '',
    };

    const modifiedFields = {};

    Object.keys(currentData).forEach(key => {
        if (currentData[key] !== originalData[key]) {
            modifiedFields[key] = currentData[key];
        }
    });

    if (Object.keys(modifiedFields).length === 0) return null;

    return modifiedFields;
};

const EditProfile = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);

    const [uploadImage, {isLoading: isImgLoading}] = useUploadImageMutation();
    const [editUser, { isLoading: isEditLoading }] = useEditUserMutation();


    const submitHandler = async userData => {
        const modifiedData = getUsersModifiedFields(userData, user);

        if (modifiedData) {
            if (!!modifiedData.image) {
                // Img url creation
                const { data } = await uploadImage(modifiedData.image).unwrap();

                modifiedData.image = data['display_url'];

                await editUser({user: modifiedData}).unwrap();
                navigate(articlesPath);
            } else {
                await editUser({user: modifiedData}).unwrap();
                navigate(articlesPath);
            }
        }
    };

    return (
        <>
            <EditProfileForm
                submitHandler={submitHandler}
                fieldConfig={fieldEditProfileConfig}
                isLoading={isImgLoading || isEditLoading}
            />
        </>
    );
};

export default EditProfile;