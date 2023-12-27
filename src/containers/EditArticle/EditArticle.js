import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useGetArticleQuery, useUpdateArticleMutation} from "../../services/ArticlesService";
import ArticleForm from "../../components/Forms/ArticleForm";
import {fieldArticleConfig} from "../../utils/inputRuleUtils";
import {articlesPath} from "../../routes/routePaths";
import GoBackButton from "../../components/UI/GoBackButton";

const EditArticle = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState(null);

    const [updateArticle, {isLoading: isUpdateLoading}] = useUpdateArticleMutation();

    const { articles } = useSelector(state => state.articles)

    const articleFromCache = articles?.find(article => article.slug === slug);

    const { data: articleData, isLoading: isArticleLoading } = useGetArticleQuery(slug, {
        skip: !!articleFromCache,
    });

    const finalArticleData = articleFromCache ?? articleData?.article;

    useEffect(() => {
        if (finalArticleData) {
            const { title, description, body, tagList } = finalArticleData;

            setInitialValues({
                title,
                description,
                body,
                tags: tagList.map(tag => ({ tag }))
            });
        }
    }, [finalArticleData]);

    const submitHandler = async article => {
        try {
            await updateArticle({slug, article}).unwrap();
            navigate(articlesPath);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
        }
    };

    return (
        <>
            <GoBackButton disabled={isArticleLoading || isUpdateLoading}/>
            <ArticleForm
                mode='update'
                fieldConfig={fieldArticleConfig}
                initialValues={initialValues}
                isLoading={isArticleLoading || isUpdateLoading}
                submitHandler={submitHandler}
            />
        </>
    );
};

export default EditArticle;