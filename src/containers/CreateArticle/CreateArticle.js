import React from 'react';
import {useNavigate} from "react-router-dom";
import ArticleForm from "../../components/UI/Form/ArticleForm";
import {fieldArticleConfig} from "../../utils/inputRuleUtils";
import {useCreateArticleMutation} from "../../services/ArticlesService";
import {articlesPath} from "../../routes/routePaths";

const CreateArticle = () => {
    const navigate = useNavigate();

    const [createArticle, {isLoading}] = useCreateArticleMutation();

    const submitHandler = async article => {
        try {
            await createArticle({article}).unwrap();
            navigate(articlesPath);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
        }
    };

    return (
        <>
            <ArticleForm
                fieldConfig={fieldArticleConfig}
                submitHandler={submitHandler}
                isLoading={isLoading}
            />
        </>
    );
};

export default CreateArticle;