import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useGetArticleQuery, useUpdateArticleMutation} from "../../services/ArticlesService";
import ArticleForm from "../../components/Forms/ArticleForm";
import {fieldArticleConfig} from "../../utils/inputRuleUtils";
import GoBackButton from "../../components/UI/GoBackButton";

const EditArticle = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState(null);

    const [updateArticle, {isLoading: isUpdateLoading}] = useUpdateArticleMutation();

    const { data: articleData, isFetching: isArticleLoading } = useGetArticleQuery(slug,
        {
            skip: false,
            refetchOnMountOrArgChange: true,
        });

    useEffect(() => {
        if (articleData?.article) {
            const { title, description, body, tagList } = articleData.article;

            const tags = !!tagList.map(tag => ({ tag })).length ? tagList.map(tag => ({ tag })) : [{tag: ''}];

            setInitialValues({
                title,
                description,
                body,
                tags
            });
        }
    }, [articleData]);

    const submitHandler = async article => {
        try {
            const response = await updateArticle({slug, article}).unwrap();

            if (response?.article?.slug) {
                navigate(`/articles/${response.article.slug}`, { state: { updatedArticle: response.article } });
            }
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