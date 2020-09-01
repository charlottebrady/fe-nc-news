import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://charlottes-nc-news.herokuapp.com/api",
});

export const getAllTopics = () => {
  return axiosInstance.get("/topics").then((res) => {
    return res.data.topics;
  });
};

export const getArticles = (sort_by, topic) => {
  return axiosInstance
    .get("/articles", { params: { sort_by, topic } })
    .then((res) => {
      return res.data.articles;
    });
};

export const getSingleArticle = (article_id) => {
  return axiosInstance.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

export const getArticleComments = (article_id) => {
  return axiosInstance.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};
